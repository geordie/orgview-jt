module CbaEmployeeGenerator
  extend ActiveSupport::Concern

  def build_cba_list
    ActiveRecord::Base.transaction do
      Employee.destroy_all
      # 2024-09-06 The original data I received included open reqs
      # The updated data does not.
      # For the updated data import to work, I had to remove "where(['`Vacancy Status` != ?', "Vacant" ])"
      Emp.all.each do |emp|
        
        # Get the role based on job title
        title = emp['Workday Job Profile']
        role = Role.where(['role = ?', title]).first

        # Build the employee name
        first_name = emp['First Name'].nil? ? "" : emp['First Name']
        surname = emp['Surname'].nil? ? "" : emp['Surname']
        fullname = (first_name + " " + surname).strip

        # Build a start date
        tenure = emp['Tenure']
        start_date = get_start_date_from_tenure(tenure)

        if Employee.exists?(emp['Person ID'].to_i)
          next
        end
        
        Employee.create!(
          id: emp['Person ID'].to_i,
          name: fullname,
          title: role[:role],
          job_function: role[:job_function],
          job_function_group: role[:job_function_group],
          seniority: role[:seniority],
          manager_id: emp['Manager ID'].to_i,
          is_manager: role[:is_manager],
          start_date: start_date,
          country: emp['Country'],
          worker_type: emp['Worker Type'],
        )
      end

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