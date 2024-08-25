class ReportsController < ApplicationController
  def roles
    employee_titles = Employee.all.group(:title).count.sort_by { |k, v| v }.reverse.to_h
    @titles = employee_titles.keys
    @counts = employee_titles.values

    # sum the counts
    sum = 0
    employee_titles.each do |title, count|
      sum += count
    end

    # build an array of percentages
    @percentages = []
    employee_titles.each do |title, count|
      @percentages << (count.to_f / sum * 100).round(2)
    end

  end

  def seniority

    employee_seniority = Employee.all.group(:seniority).count.sort_by { |k, v| k }.reverse.to_h
    @seniorities = employee_seniority.keys
    @counts = employee_seniority.values

    # sum the counts
    sum = 0
    employee_seniority.each do |seniority, count|
      sum += count
    end

    # build an array of percentages
    @percentages = []
    employee_seniority.each do |seniority, count|
      @percentages << (count.to_f / sum * 100).round(2)
    end
  end

  def job_function

    employee_job_functions = Employee.all.group(:job_function).count.sort_by { |k, v| v }.reverse.to_h
    @job_functions = employee_job_functions.keys
    @counts = employee_job_functions.values

    # sum the counts
    sum = 0
    employee_job_functions.each do |job_function, count|
      sum += count
    end

    # build an array of percentages
    @percentages = []
    employee_job_functions.each do |job_function, count|
      @percentages << (count.to_f / sum * 100).round(2)
    end
  end

  def job_function_group

    employee_job_function_groups = Employee.all.group(:job_function_group).count.sort_by { |k, v| v }.reverse.to_h
    @job_function_groups = employee_job_function_groups.keys
    @counts = employee_job_function_groups.values

    # sum the counts
    sum = 0
    employee_job_function_groups.each do |job_function_group, count|
      sum += count
    end

    # build an array of percentages
    @percentages = []
    employee_job_function_groups.each do |job_function_group, count|
      @percentages << (count.to_f / sum * 100).round(2)
    end
  end

  def squad_size
    squad_sizes = Squad.all.group(:squad_members).count.sort_by { |k, v| k }.reverse.to_h
    @sizes = squad_sizes.keys
    @counts = squad_sizes.values

    # sum the counts
    sum = 0
    squad_sizes.each do |size, count|
      sum += count
    end

    # build an array of percentages
    @percentages = []
    squad_sizes.each do |size, count|
      @percentages << (count.to_f / sum * 100).round(2)
    end
  end
end
