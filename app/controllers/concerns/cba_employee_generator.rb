module CbaEmployeeGenerator
  extend ActiveSupport::Concern

  def build_cba_list
    ActiveRecord::Base.transaction do
      Employee.destroy_all
      Emp.where(['`Vacancy Status` != ?', "Vacant" ]).each do |emp|
        
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
          seniority: role[:seniority],
          manager_id: emp['Manager'].to_i,
          is_manager: role[:is_manager],
          start_date: start_date,
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

  def create_sr_leader(manager, role)
    if Employee.where( ['title = ?', role ]).exists?
      return Employee.where( ['title = ?', role ]).first
    end

    role = Role.where( ['role = ?', role ]).first
    sr_leader = Employee.create!(
      name: Faker::Name.name,
      title: role[:role],
      job_function: role[:job_function],
      seniority: role[:seniority],
      manager_id: manager&.id,
      is_manager: role[:is_manager],
      start_date: Faker::Date.between(from: 15.years.ago, to: Date.today)
    )
    return sr_leader
  end

  def create_direct_reports(manager, arr_job_functions, depth, min = 2, max = 12)
    if depth == 0
      return
    end

    rand(min..max).times do |j|
      direct_report = nil
      if depth == 1
        direct_report = create_direct_report_ic(manager, arr_job_functions)
      else
        direct_report = create_direct_report(manager, arr_job_functions)
      end

      if direct_report&.is_manager && depth > 1
        create_direct_reports(direct_report, arr_job_functions, depth - 1)
      end
    end
  end

  def create_direct_report(manager, arr_job_functions)
    if manager.nil?
      return nil
    end

    role = Role.where( ['job_function IN (?) ' +
        'AND ((seniority <= ? AND seniority >=? AND is_manager = 0) ' +
          'OR (seniority < ? AND seniority >=? AND is_manager = 1))',
      arr_job_functions,
      manager.seniority,
      manager.seniority - 2,
      manager.seniority,
      manager.seniority - 2]).order("RAND()").first

    direct_report = Employee.create!(
      name: Faker::Name.name,
      title: role[:role],
      job_function: role[:job_function],
      seniority: role[:seniority],
      manager_id: manager.id,
      is_manager: role[:is_manager],
      start_date: Faker::Date.between(from: 2.years.ago, to: Date.today)
    )

    return direct_report
  end

  def create_direct_report_ic(manager, arr_job_functions)
    role = Role.where( ['job_function IN (?) ' +
        'AND ((seniority <= ? AND is_manager = 0)) ',
      arr_job_functions,
      manager.seniority]).order("RAND()").first

    if role.nil?
      return nil
    end

    direct_report = Employee.create!(
      name: Faker::Name.name,
      title: role[:role],
      job_function: role[:job_function],
      seniority: role[:seniority],
      manager_id: manager.id,
      is_manager: role[:is_manager],
      start_date: Faker::Date.between(from: 2.years.ago, to: Date.today)
    )

    return direct_report
  end
end