class ReportsController < ApplicationController

  def roles
    employee_titles = Employee.all.group(:title).count.sort_by { |k, v| v }.reverse.to_h
    @titles = employee_titles.keys
    @counts = employee_titles.values
    @percentages = build_percentages(employee_titles)
  end

  def seniority
    employee_seniority = Employee.all.group(:seniority).count.sort_by { |k, v| k }.reverse.to_h
    @seniorities = employee_seniority.keys
    @counts = employee_seniority.values
    @percentages = build_percentages(employee_seniority)
  end

  def job_function
    employee_job_functions = Employee.all.group(:job_function).count.sort_by { |k, v| v }.reverse.to_h
    @job_functions = employee_job_functions.keys
    @counts = employee_job_functions.values
    @percentages = build_percentages(employee_job_functions)
  end

  def job_function_group
    employee_job_function_groups = Employee.all.group(:job_function_group).count.sort_by { |k, v| v }.reverse.to_h
    @job_function_groups = employee_job_function_groups.keys
    @counts = employee_job_function_groups.values
    @percentages = build_percentages(employee_job_function_groups)
  end

  def squad_size
    squad_sizes = Squad.all.group(:squad_members).count.sort_by { |k, v| k }.reverse.to_h
    @sizes = squad_sizes.keys
    @counts = squad_sizes.values
    @percentages = build_percentages(squad_sizes)
  end

  def squad_depth
    squad_depths = Squad.all.group(:depth).count.sort_by { |k, v| k }.reverse.to_h
    @depths = squad_depths.keys
    @counts = squad_depths.values
    @percentages = build_percentages(squad_depths)
  end

  def squad_children
    squad_children = Squad.all.group(:children).count.sort_by { |k, v| k }.reverse.to_h
    @children = squad_children.keys
    @counts = squad_children.values
    @percentages = build_percentages(squad_children)
  end

  def squad_members_managers
    squad_members_managers = Squad.all.group(:squad_members_managers).count.sort_by { |k, v| k }.reverse.to_h
    @managers = squad_members_managers.keys
    @counts = squad_members_managers.values
    @percentages = build_percentages(squad_members_managers)
  end

  private

  def build_percentages(data)
    sum = 0
    data.each do |key, value|
      sum += value
    end

    percentages = []
    data.each do |key, value|
      percentages << (value.to_f / sum * 100).round(2)
    end

    percentages
  end
end
