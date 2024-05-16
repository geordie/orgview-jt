module EmployeeGenerator
  extend ActiveSupport::Concern

  JOB_FUNCTIONS = {
    "Software Development" => ["Software Developer", "Senior Software Developer", "Software Architect"],
    "Software Development Management" => ["Software Development Manager", "Senior Software Development Manager"],
    "Data" => ["Data Analyst", "Data Scientist", "Data Engineer", "Data Manager"],
    "Security" => ["Security Analyst", "Security Engineer", "Security Manager"],
    "Operations" => ["Operations Analyst", "Operations Manager"],
    "Product Management" => ["Product Manager", "Senior Product Manager", "Director of Product Management"],
    "Project Management" => ["Project Manager", "Senior Project Manager", "Director of Project Management"],
    "Senior Leadership" => ["CTO", "CIO", "CISO", "COO", "VP, Engineering, VP, Product", "CPO"]
  }

  def create_samples
    ActiveRecord::Base.transaction do
      4.times do |i|
        create_manager(nil, i)
      end
    end
    redirect_to employees_path, notice: 'Sample employees created successfully.'
  end

  private

  def create_manager(parent_id, level)
    return if level >= 4
    manager = Employee.create!(
      name: Faker::Name.name,
      title: JOB_FUNCTIONS.values.flatten.sample,
      job_function: JOB_FUNCTIONS.keys.sample,
      seniority: rand(1..8),
      manager_id: parent_id,
      start_date: Faker::Date.between(from: 2.years.ago, to: Date.today)
    )
    rand(2..15).times do
      create_employee(manager.id)
      create_manager(manager.id, level + 1)
    end
  end

  def create_employee(manager_id)
    Employee.create!(
      name: Faker::Name.name,
      title: JOB_FUNCTIONS.values.flatten.sample,
      job_function: JOB_FUNCTIONS.keys.sample,
      seniority: rand(1..8),
      manager_id: manager_id,
      start_date: Faker::Date.between(from: 2.years.ago, to: Date.today)
    )
  end
end