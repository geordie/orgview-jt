module EmployeeGenerator
  extend ActiveSupport::Concern

  def create_samples
    ActiveRecord::Base.transaction do
      ceo = create_sr_leader(nil,"CEO")
      cto = create_sr_leader(ceo, "CTO")
      cpo = create_sr_leader(ceo, "CPO")

      create_direct_reports(cto, ["Software Development Management", "Software Development"],2)
      create_direct_reports(cpo, ["Product Management"],1)

    end

    redirect_to employees_path, notice: 'Sample employees created successfully.'
  end

  private

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

  def create_direct_reports(manager, arr_job_functions, depth)
    if depth == 0
      return
    end

    rand(2..12).times do |j|
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