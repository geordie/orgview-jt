module CbaEmployeeGenerator
  extend ActiveSupport::Concern

  def build_cba_list
    ActiveRecord::Base.transaction do
      SquadsEmployee.delete_all
      Squad.delete_all
      Employee.delete_all

      batch = []
      batch_size = 5000
      person_ids = {}

      emp_with_roles = Emp.joins("LEFT JOIN roles ON roles.role = #{Emp.table_name}.workday_job_profile \
        AND roles.seniority = #{Emp.table_name}.seniority \
        AND roles.is_manager = case when #{Emp.table_name}.is_manager = 'Yes' then 1 else 0 end")
        .select("#{Emp.table_name}.*, roles.role AS role_name, roles.job_function, roles.job_function_group, roles.seniority AS role_seniority, roles.is_manager AS role_is_manager")

      emp_with_roles.each_with_index do |emp, i|
        first_name = emp['first_name'].nil? ? "" : emp['first_name']
        surname = emp['surname'].nil? ? "" : emp['surname']
        fullname = (first_name + " " + surname).strip

        if i % 1000 == 5
          p "Processing record #{i + 1} with Person ID: #{emp['person_id']}"
        end

        # Ensure person_id is unique
        person_ids[emp['person_id']] ||= 0
        person_ids[emp['person_id']] += 1
        next if person_ids[emp['person_id']] > 1

        batch << {
          person_id: emp['person_id'],
          name: fullname,
          title: emp['role_name'],
          job_function: emp['job_function'],
          job_function_group: emp['job_function_group'],
          seniority: emp['role_seniority'],
          manager_id: emp['manager_id'],
          is_manager: emp['role_is_manager'],
          country: emp['country'],
          worker_type: emp['worker_type'],
        }
        if batch.size >= batch_size
          Employee.insert_all!(batch)
          batch.clear
        end
      end
      Employee.insert_all!(batch) if batch.any?
    end

    redirect_to root_path, notice: 'CBA employees created successfully.'
  end
end