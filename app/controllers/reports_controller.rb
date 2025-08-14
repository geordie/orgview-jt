class ReportsController < ApplicationController

  def roles
    # Get the data
    if params[:job_function].present?
      employee_titles = Employee.where(job_function: params[:job_function]).group(:title).count.sort_by { |k, v| v }.reverse.to_h
    else
      employee_titles = Employee.all.group(:title).count.sort_by { |k, v| v }.reverse.to_h
    end

    # Setup report metadata
    @report_title = "Roles Report"
    @report_subtitle = params[:job_function].present? ? "Filtered by Job Function: #{params[:job_function]}" : nil

    # Create table data using the new model
    @table = TableColumns.new
    
    # Add columns with linking to title_density report
    @table.add_column(
      label: "Role", 
      values: employee_titles.keys, 
      type: "string",
      link_info: LinkInfo.new(
        controller: 'reports',
        action: 'title_density',
        link_params: [LinkParams.new(name: 'title', value_col: 'Role')]
      )
    )
    
    @table.add_column(
      label: "Count", 
      values: employee_titles.values, 
      type: "numeric"
    )
    
    percentages = build_percentages(employee_titles)
    @table.add_column(
      label: "Percentage", 
      values: percentages, 
      type: "percentage"
    )

    # Create chart data
    @chart_data = ChartData.new(
      labels: employee_titles.keys,
      data: employee_titles.values,
      percentages: percentages,
      chart_id: "rolesChart",
      label_x_axis: "# of Employees"
    )

    # Render the generic view
    render 'report'
  end

  def title_density
    title = params[:title]
    max_depth = params[:max_depth] || 1

    @report_title = "Title Density Report"
    @report_subtitle = title

    # Build data
    # Get all squads with the specified max depth
    squads = Squad
      .where(!max_depth.nil? ? { depth: max_depth } : {})
      .order('squads.org_members DESC')

    # Initialize squads hash with zero counts
    squads_hash = squads.map { |squad| [squad.full_path, [0, squad.org_members || 0]] }.to_h

    # Get all squads with the specified title
    squad_employee_roles = Squad.joins(squads_employees: :employee)
      .where(!title.nil? ? {employees: { title: title }} : {} )
      .group(:full_path)
      .select('squads.full_path, COUNT(employees.id) AS employee_count')
      .order('squads.full_path')

    squad_employee_roles.each do |squad|
      squads_hash.each_key do |key|
        squads_hash[key][0] += squad.employee_count if squad.full_path.starts_with?(key)
      end
    end

    teams = squads_hash.keys
    counts = squads_hash.values.map{ |v| v[0] }
    org_sizes = squads.map { |squad| squad.org_members || 0 }
    proportions = squads_hash.values.map { |v| v[1] > 0 ? (v[0].to_f / v[1]) * 100 : 0 }
    percentages = build_percentages(squads_hash.map{|k, v| [k, v[0]] }.to_h)

    # Build table
    @table = TableColumns.new
    @table.add_column(label: "Team", type: "string", values: teams)
    @table.add_column(label: "# of Employees", type: "numeric", values: counts)
    @table.add_column(label: "Org Size", type: "numeric", values: org_sizes)
    @table.add_column(label: "% of Org Size", type: "percentage", values: proportions)

    # Build chart
    @chart_data = ChartData.new(
      labels: teams,
      data: counts,
      percentages: percentages,
      chart_id: 'titleDensityChart',
      label_x_axis: '# of Employees'
    )

    # Render the report
    respond_to do |format|
      format.html { render 'report' }
    end
  end

  def seniority
    employee_seniority = Employee.all
      .where(params[:country].present? ? "country = ?" : "1=1", params[:country])
      .where(params[:worker_type].present? ? "worker_type = ?" : "1=1", params[:worker_type])
      .group(:seniority).count.sort_by { |k, v| k }.reverse.to_h
    @seniorities = employee_seniority.keys
    @counts = employee_seniority.values
    @percentages = build_percentages(employee_seniority)
  end

  def team_geos
    squad_percentages = Squad.joins(:employees)
      .select('squads.full_path AS full_path, COUNT(CASE WHEN employees.country = \'Australia\' THEN 1 END) * 100.0 / COUNT(employees.id) AS percentage_australian_employees')
      .where(params[:descendents].present? ? "descendents = ?" : "1=1", params[:descendents])
      .group('squads.full_path')
      .order('percentage_australian_employees DESC')

    team_makeup_counts = Hash.new(0)

    squad_percentages.each do |squad|
      percentage = squad.percentage_australian_employees.to_f
      team_makeup = case
        when percentage >= 90
          'Aus team (>= 90%)'
        when percentage >= 75
          'Mostly Aus team (>= 75%)'
        when percentage <= 10
          'India team (>= 90%)'
        when percentage <= 25
          'Mostly India team (>= 75%)'
        else
          'Distributed team'
        end
      team_makeup_counts[team_makeup] += 1
    end
    @team_geos = team_makeup_counts.keys
    @counts = team_makeup_counts.values
    @percentages = build_percentages(team_makeup_counts)
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
    @ratios = build_ratios(employee_job_functions)
  end

  def job_function_group
    employee_job_function_groups = Employee.all.group(:job_function_group).count.sort_by { |k, v| v }.reverse.to_h
    @job_function_groups = employee_job_function_groups.keys
    @counts = employee_job_function_groups.values
    @percentages = build_percentages(employee_job_function_groups)
  end

  def employee_country
    employee_countries = Employee.all.group(:country).count.sort_by { |k, v| v }.reverse.to_h
    @countries = employee_countries.keys
    @counts = employee_countries.values
    @percentages = build_percentages(employee_countries)
  end

  def employee_worker_type
    employee_worker_types = Employee.all.group(:worker_type).count.sort_by { |k, v| v }.reverse.to_h
    @worker_types = employee_worker_types.keys
    @counts = employee_worker_types.values
    @percentages = build_percentages(employee_worker_types)
  end

  def employee_country_worker_type
    employee_country_worker_types = Employee.all.group(:country, :worker_type).count.sort_by { |k, v| k[0] }.reverse.to_h
    employee_country_worker_types = employee_country_worker_types.map { |k,v| [k[0] + ", " + k[1],v] }.reverse.to_h
    @country_worker_types = employee_country_worker_types.keys
    @counts = employee_country_worker_types.values
    @percentages = build_percentages(employee_country_worker_types)
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
    employee_allocations = SquadsEmployee.all.group(:allocation).count.sort_by { |k, v| k }.reverse.to_h
    employee_allocations = employee_allocations.map { |k, v| [(1/k).round(0), v/(1/k).round(0)] }.to_h
    @allocations = employee_allocations.keys
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
    .where(params[:country].present? ? "country = ?" : "1=1", params[:country])
    .where(params[:worker_type].present? ? "worker_type = ?" : "1=1", params[:worker_type])
    #.where("country = 'India'")
    .group("tenure_range")
    .order("tenure_range")
    tenure_ranges = tenure_ranges.map { |tr| [tr.tenure_range, tr.count] }.to_h
    @tenure_ranges = tenure_ranges.keys
    @counts = tenure_ranges.values
    @percentages = build_percentages(tenure_ranges)
  end

  def employee_country_tenure
    employee_country_tenure_ranges = Employee.select(
      "CASE
        WHEN start_date >= CURDATE() - INTERVAL 1 YEAR THEN '00 to 01 year'
        WHEN start_date >= CURDATE() - INTERVAL 3 YEAR AND start_date < CURDATE() - INTERVAL 1 YEAR THEN '01 to 03 years'
        WHEN start_date >= CURDATE() - INTERVAL 5 YEAR AND start_date < CURDATE() - INTERVAL 3 YEAR THEN '03 to 05 years'
        WHEN start_date >= CURDATE() - INTERVAL 10 YEAR AND start_date < CURDATE() - INTERVAL 5 YEAR THEN '05 to 10 years'
        WHEN start_date >= CURDATE() - INTERVAL 15 YEAR AND start_date < CURDATE() - INTERVAL 10 YEAR THEN '10 to 15 years'
        WHEN start_date >= CURDATE() - INTERVAL 20 YEAR AND start_date < CURDATE() - INTERVAL 15 YEAR THEN '15 to 20 years'
        WHEN start_date >= CURDATE() - INTERVAL 25 YEAR AND start_date < CURDATE() - INTERVAL 20 YEAR THEN '20 to 25 years'
        ELSE '25+ years'
      END AS tenure_range, country, COUNT(*) AS count"
    ).where.not(start_date: nil).group("country").group("tenure_range").order("country").order("tenure_range")
    employee_country_tenure_ranges = employee_country_tenure_ranges.map { |tr| [tr.tenure_range.to_s + ", " + tr.country.to_s, tr.count] }.to_h
    p employee_country_tenure_ranges.to_json
    @country_tenure_ranges = employee_country_tenure_ranges.keys
    @counts = employee_country_tenure_ranges.values
    @percentages = build_percentages(employee_country_tenure_ranges)
  end

  def retail_tech_org_sizes
    org_sizes = Squad.where(depth: 2)
      .where('full_path LIKE ?', 'Retail Tech%')
      .order(org_members: :desc)
      .pluck(:name, :org_members)
      .to_h
    @org_sizes = org_sizes.keys
    @counts = org_sizes.values
    @percentages = build_percentages(org_sizes)
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

  def build_ratios(data)
    max = data.values.max

    ratios = []
    data.each do |key, value|
      ratios << (max / value.to_f ).round(0)
    end

    ratios
  end
end
