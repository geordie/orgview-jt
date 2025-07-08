module CbaEmployeeGenerator
  extend ActiveSupport::Concern

  def build_cba_list
    ActiveRecord::Base.transaction do
      SquadsEmployee.delete_all
      Squad.delete_all
      Employee.delete_all

      batch = []
      batch_size = 5000

      emp_with_roles = Emp.joins("LEFT JOIN roles ON roles.role = emp.workday_job_profile \
        AND roles.seniority = emp.seniority \
        AND roles.is_manager = case when emp.is_manager = 'Yes' then 1 else 0 end")
        .select('emp.*, roles.role AS role_name, roles.job_function, roles.job_function_group, roles.seniority AS role_seniority, roles.is_manager AS role_is_manager')

      emp_with_roles.each_with_index do |emp, i|
        first_name = emp['first_name'].nil? ? "" : emp['first_name']
        surname = emp['surname'].nil? ? "" : emp['surname']
        fullname = (first_name + " " + surname).strip

        if i % 1000 == 5
          p "Processing record #{i + 1} with Person ID: #{emp['person_id']}"
        end

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

    redirect_to employees_path, notice: 'CBA employees created successfully.'
  end

  private

  def get_start_date_from_tenure(tenure)
    case tenure.strip
    when "0 to 1"
      start_date = Faker::Date.between(from: 1.years.ago, to: Date.today)
    when "1 to 3"
      start_date = Faker::Date.between(from: 3.years.ago, to: 1.years.ago)
    when "3 to 5"
      start_date = Faker::Date.between(from: 5.years.ago, to: 3.years.ago)
    when "5 to 10"
      start_date = Faker::Date.between(from: 10.years.ago, to: 5.years.ago)
    when "10 to 15"
      start_date = Faker::Date.between(from: 15.years.ago, to: 10.years.ago)
    when "15 to 20"
      start_date = Faker::Date.between(from: 20.years.ago, to: 15.years.ago)
    when "20 to 25"
      start_date = Faker::Date.between(from: 25.years.ago, to: 20.years.ago)
    when "25+"
      start_date = Faker::Date.between(from: 30.years.ago, to: 25.years.ago)
    else
      start_date = Date.today
    end
    return start_date
  end
end