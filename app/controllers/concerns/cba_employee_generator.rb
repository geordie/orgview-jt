module CbaEmployeeGenerator
  extend ActiveSupport::Concern

  def build_cba_list
    # Get the current active data version
    current_version = DataVersion.active.first

    ActiveRecord::Base.transaction do

      unless current_version
        redirect_to root_path, alert: 'No active data version found. Please create and activate a version first.'
        return
      end

      # Delete data for the current active version
      SquadsEmployee.where(data_version_id: current_version.id).delete_all
      Squad.where(data_version_id: current_version.id).delete_all
      Employee.where(data_version_id: current_version.id).delete_all

      batch = []
      batch_size = 5000
      added_person_ids = {}

      emp_with_roles = Emp.import_filter.joins("LEFT JOIN roles ON roles.role = #{Emp.table_name}.workday_job_profile \
        AND roles.seniority = #{Emp.table_name}.seniority \
        AND roles.is_manager = case when #{Emp.table_name}.is_manager = 'Yes' then 1 else 0 end")
        .select("#{Emp.table_name}.*, roles.role AS role_name, roles.job_function, roles.job_function_group, roles.seniority AS role_seniority, roles.is_manager AS role_is_manager")

      # Build hash of all unique person_ids for manager lookup
      all_person_ids = {}
      Emp.distinct.pluck(:person_id).each do |person_id|
        all_person_ids[person_id] = true
      end

      emp_with_roles.each_with_index do |emp, i|
        first_name = emp['first_name'].nil? ? "" : emp['first_name']
        surname = emp['surname'].nil? ? "" : emp['surname']
        fullname = (first_name + " " + surname).strip

        # Ensure person_id is unique
        added_person_ids[emp['person_id']] ||= 0
        added_person_ids[emp['person_id']] += 1
        next if added_person_ids[emp['person_id']] > 1

        # Process manager_id - only do lookup logic when it's a number
        processed_manager_id = emp['manager_id']
        if emp['manager_id'].present? && emp['manager_id'].is_a?(Integer)
          # Manager ID is numeric, try to find corresponding person_id by padding with zeros
          manager_id = emp['manager_id'].to_s

          # Pad to 8 characters with leading zeros
          padded_id = manager_id.rjust(8, '0')
          if all_person_ids[padded_id]
            processed_manager_id = padded_id
          end
        end

        batch << {
          person_id: emp['person_id'],
          name: fullname,
          title: emp['role_name'],
          job_function: emp['job_function'],
          job_function_group: emp['job_function_group'],
          seniority: emp['role_seniority'],
          manager_id: processed_manager_id,
          is_manager: emp['role_is_manager'],
          country: emp['country'],
          worker_type: emp['worker_type'],
          data_version_id: current_version.id,
        }
        if batch.size >= batch_size
          Employee.insert_all!(batch)
          batch.clear
        end
      end
      Employee.insert_all!(batch) if batch.any?
    end

    redirect_to root_path, notice: "CBA employees created successfully for version '#{current_version.name}'."
  end
end
