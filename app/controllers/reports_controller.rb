class ReportsController < ApplicationController

  def roles
    if params[:job_function].present?
      employee_titles = Employee.where(job_function: params[:job_function]).group(:title).count.sort_by { |k, v| v }.reverse.to_h
    else
      employee_titles = Employee.all.group(:title).count.sort_by { |k, v| v }.reverse.to_h
    end
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
    if params[:job_function_group].present?
      employee_job_functions = Employee.where(job_function_group: params[:job_function_group]).group(:job_function).count.sort_by { |k, v| v }.reverse.to_h
    else
      employee_job_functions = Employee.all.group(:job_function).count.sort_by { |k, v| v }.reverse.to_h
    end
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

  def management_ratios
    subquery = Employee.group(:manager_id).select('COUNT(*) AS team_size')
    all_team_sizes = Employee.from(subquery, :A).group(:team_size).order(team_size: :desc).count
    agg_team_sizes = {"> 15" => 0, "11-15" => 0, "5-10" => 0, "3-4" => 0, "1-2" => 0}
    all_team_sizes.keys.each do |key|
      if key > 15
        agg_team_sizes["> 15"] += all_team_sizes[key]
      elsif key > 10
        agg_team_sizes["11-15"] += all_team_sizes[key]
      elsif key > 4
        agg_team_sizes["5-10"] += all_team_sizes[key]
      elsif key > 2
        agg_team_sizes["3-4"] += all_team_sizes[key]
      else
        agg_team_sizes["1-2"] += all_team_sizes[key]
      end
    end
    @team_sizes = agg_team_sizes.keys
    @counts = agg_team_sizes.values
    @percentages = build_percentages(agg_team_sizes)
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

  def squad_health
    squad_healths = Squad.all.group(:squad_health).count.sort_by { |k, v| v }.reverse.to_h
    @healths = squad_healths.keys
    @counts = squad_healths.values
    @percentages = build_percentages(squad_healths)
  end

  def squad_health_details
    squad_health_details = Squad.all.group(:squad_health_details).count.sort_by { |k, v| v }.reverse.to_h
    @details = squad_health_details.keys
    @counts = squad_health_details.values
    @percentages = build_percentages(squad_health_details)
  end

  def employee_allocations
    employee_allocations = SquadsEmployee.all.group(:allocation).count.sort_by { |k, v| v }.reverse.to_h
    @allocations = employee_allocations.keys.map { |k| (1/k).round(0) }
    @counts = employee_allocations.values
    @percentages = build_percentages(employee_allocations)
  end

  def employee_tenure
    tenure_ranges = Employee.select(
      "CASE
        WHEN start_date >= CURDATE() - INTERVAL 1 YEAR THEN '00 to 01 year'
        WHEN start_date >= CURDATE() - INTERVAL 3 YEAR AND start_date < CURDATE() - INTERVAL 1 YEAR THEN '01 to 03 years'
        WHEN start_date >= CURDATE() - INTERVAL 5 YEAR AND start_date < CURDATE() - INTERVAL 3 YEAR THEN '03 to 05 years'
        WHEN start_date >= CURDATE() - INTERVAL 10 YEAR AND start_date < CURDATE() - INTERVAL 5 YEAR THEN '05 to 10 years'
        WHEN start_date >= CURDATE() - INTERVAL 15 YEAR AND start_date < CURDATE() - INTERVAL 10 YEAR THEN '10 to 15 years'
        WHEN start_date >= CURDATE() - INTERVAL 20 YEAR AND start_date < CURDATE() - INTERVAL 15 YEAR THEN '15 to 20 years'
        WHEN start_date >= CURDATE() - INTERVAL 25 YEAR AND start_date < CURDATE() - INTERVAL 20 YEAR THEN '20 to 25 years'
        ELSE '25+ years'
      END AS tenure_range, COUNT(*) AS count"
    ).where.not(start_date: nil)
    .group("tenure_range")
    .order("tenure_range")
    tenure_ranges = tenure_ranges.map { |tr| [tr.tenure_range, tr.count] }.to_h
    @tenure_ranges = tenure_ranges.keys
    @counts = tenure_ranges.values
    @percentages = build_percentages(tenure_ranges)
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
