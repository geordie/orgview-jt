class ReportsController < ApplicationController
  before_action :set_current_data_version

  def roles
    # Get the data with optional squad filtering
    base_employee_query = Employee.current.all

    # If squad_id is provided, filter to employees in that squad and its descendants
    if params[:squad_id].present?
      parent_squad = Squad.where(data_version_id: @current_data_version.id).find_by(id: params[:squad_id])

      # If squad not found, continue without filtering (gracefully handle non-existent squad)
      if parent_squad
        # Find all squads that are children of the specified squad (using full_path hierarchy)
      descendant_squads = Squad.where(
        "(full_path = :path OR full_path LIKE :like_path) AND data_version_id = :data_version_id",
        path: parent_squad.full_path,
        like_path: "#{parent_squad.full_path} > %",
        data_version_id: @current_data_version.id
      )

      # Filter employees to only those in the descendant squads
      base_employee_query = base_employee_query
        .joins(:squads_employees)
        .where(squads_employees: { squad_id: descendant_squads.pluck(:id) })
      end
    end

    if params[:job_function].present?
      employee_titles = base_employee_query
        .where(job_function: params[:job_function])
        .distinct(:person_id)
        .group(:title)
        .count
        .sort_by { |k, v| v }.reverse.to_h
    else
      employee_titles = base_employee_query
        .distinct(:person_id)
        .group(:title)
        .count
        .sort_by { |k, v| v }.reverse.to_h
    end

    # Setup report metadata
    squad_subtitle = ""
    if params[:squad_id].present?
      parent_squad = Squad.where(data_version_id: @current_data_version.id).find_by(id: params[:squad_id])
      squad_subtitle = " - #{parent_squad.full_path}" if parent_squad
    end

    @report_title = "Roles Report"
    @report_subtitle = [
      (params[:job_function].present? ? "Filtered by Job Function: #{params[:job_function]}" : nil),
      squad_subtitle.present? ? squad_subtitle : nil
    ].compact.join("")

    # Create table data using the new model
    @table = TableColumns.new

    # Add columns with linking to title_density report
    link_params = [LinkParams.new(name: 'title', value_col: 'Role')]

    # If a squad_id parameter is present, pass it along to the title_density report
    if params[:squad_id].present?
      link_params << LinkParams.new(name: 'squad_id', value: params[:squad_id])
    end

    @table.add_column(
      label: "Role",
      values: employee_titles.keys,
      type: "string",
      link_info: LinkInfo.new(
        controller: 'reports',
        action: 'title_density',
        link_params: link_params
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
    squad_id = params[:squad_id]

    @report_title = "Title Density Report"
    @report_subtitle = title ? "#{title} (Depth: #{max_depth})" : "All Titles (Depth: #{max_depth})"
    @back_link = nil

    # Build data with optional squad filtering
    base_squad_query = Squad.where(data_version_id: @current_data_version.id)

    # If squad_id is provided, filter to that squad and its descendants
    if squad_id.present?
      parent_squad = Squad.where(data_version_id: @current_data_version.id).find(squad_id)
      squad_title = title ? "#{title} - #{parent_squad.full_path}" : "All Titles - #{parent_squad.full_path}"
      @report_subtitle = "#{squad_title} (Depth: #{max_depth})"

      # Add back link to the parent squad or general report
      if parent_squad.parent
        # When going back to parent, use the current max_depth (same level)
        back_params = { controller: 'reports', action: 'title_density', squad_id: parent_squad.parent.id, max_depth: max_depth }
        back_params[:title] = title if title.present?

        @back_link = {
          text: "← Back to #{parent_squad.parent.full_path}",
          url: url_for(back_params)
        }
      else
        # When going back to all teams, use max_depth - 1 or default to 1
        back_max_depth = [max_depth.to_i - 1, 1].max
        back_params = { controller: 'reports', action: 'title_density', max_depth: back_max_depth }
        back_params[:title] = title if title.present?

        @back_link = {
          text: "← Back to All Teams",
          url: url_for(back_params)
        }
      end

      # Find all squads that are children of the specified squad (using full_path hierarchy)
      base_squad_query = base_squad_query.where(
        "full_path = ? OR full_path LIKE ?",
        parent_squad.full_path,
        "#{parent_squad.full_path} > %"
      )
    end

    # Get all squads with the specified max depth
    squads = base_squad_query
      .where(!max_depth.nil? ? { depth: max_depth } : {})
      .order('squads.org_members DESC')

    # Initialize squads hash with zero counts
    squads_hash = squads.map { |squad| [squad.full_path, [0, squad.org_members || 0]] }.to_h

    # Get all squads with the specified title, applying the same squad filter
    squad_employee_query = Squad.joins(squads_employees: :employee)
      .where(squads: { data_version_id: @current_data_version.id })
      .where(employees: { data_version_id: @current_data_version.id })
      .where(!title.nil? ? {employees: { title: title }} : {} )

    # Apply the same squad filtering to the employee query
    if squad_id.present?
      squad_employee_query = squad_employee_query.where(
        "squads.full_path = ? OR squads.full_path LIKE ?",
        parent_squad.full_path,
        "#{parent_squad.full_path} > %"
      )
    end

    squad_employee_roles = squad_employee_query
      .group(:full_path)
      .select('squads.full_path, COUNT(DISTINCT employees.id) AS employee_count')
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

    # Create a mapping of team names to squad IDs for linking
    squad_id_lookup = squads.map { |squad| [squad.full_path, squad.id] }.to_h

    # Build table
    @table = TableColumns.new

    # Build link parameters for drilling down into specific squads
    link_params = [LinkParams.new(name: 'squad_id', value_col: 'Team', lookup: squad_id_lookup)]

    # If we have a title parameter, pass it along
    if title.present?
      link_params << LinkParams.new(name: 'title', value: title)
    end

    # Add incremented max_depth for drill down
    next_max_depth = max_depth.to_i + 1
    link_params << LinkParams.new(name: 'max_depth', value: next_max_depth)

    @table.add_column(
      label: "Team",
      type: "string",
      values: teams,
      link_info: LinkInfo.new(
        controller: 'reports',
        action: 'title_density',
        link_params: link_params
      )
    )
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

  def job_function_density
    job_function = params[:job_function]
    max_depth = params[:max_depth] || 1
    squad_id = params[:squad_id]

    @report_title = "Job Function Density Report"
    @report_subtitle = job_function ? "#{job_function} (Depth: #{max_depth})" : "All Job Functions (Depth: #{max_depth})"
    @back_link = nil

    # Build data with optional squad filtering - filter by current data version
    base_squad_query = Squad.where(data_version_id: @current_data_version.id)

    # If squad_id is provided, filter to that squad and its descendants
    if squad_id.present?
      parent_squad = Squad.where(data_version_id: @current_data_version.id).find(squad_id)
      squad_title = job_function ? "#{job_function} - #{parent_squad.full_path}" : "All Job Functions - #{parent_squad.full_path}"
      @report_subtitle = "#{squad_title} (Depth: #{max_depth})"

      # Add back link to the parent squad or general report
      if parent_squad.parent
        # When going back to parent, use the current max_depth (same level)
        back_params = { controller: 'reports', action: 'job_function_density', squad_id: parent_squad.parent.id, max_depth: max_depth }
        back_params[:job_function] = job_function if job_function.present?

        @back_link = {
          text: "← Back to #{parent_squad.parent.full_path}",
          url: url_for(back_params)
        }
      else
        # When going back to all teams, use max_depth - 1 or default to 1
        back_max_depth = [max_depth.to_i - 1, 1].max
        back_params = { controller: 'reports', action: 'job_function_density', max_depth: back_max_depth }
        back_params[:job_function] = job_function if job_function.present?

        @back_link = {
          text: "← Back to All Teams",
          url: url_for(back_params)
        }
      end

      # Find all squads that are children of the specified squad (using full_path hierarchy)
      base_squad_query = base_squad_query.where(
        "full_path = ? OR full_path LIKE ?",
        parent_squad.full_path,
        "#{parent_squad.full_path} > %"
      )
    end

    # Get all squads with the specified max depth
    squads = base_squad_query
      .where(!max_depth.nil? ? { depth: max_depth } : {})
      .order('squads.org_members DESC')

    # Initialize squads hash with zero counts
    squads_hash = squads.map { |squad| [squad.full_path, [0, squad.org_members || 0]] }.to_h

    # Get all squads with the specified job_function, applying the same squad filter - filter by current data version
    squad_employee_query = Squad.joins(squads_employees: :employee)
      .where(squads: { data_version_id: @current_data_version.id })
      .where(employees: { data_version_id: @current_data_version.id })
      .where(!job_function.nil? ? {employees: { job_function: job_function }} : {} )

    # Apply the same squad filtering to the employee query
    if squad_id.present?
      squad_employee_query = squad_employee_query.where(
        "squads.full_path = ? OR squads.full_path LIKE ?",
        parent_squad.full_path,
        "#{parent_squad.full_path} > %"
      )
    end

    squad_employee_roles = squad_employee_query
      .group(:full_path)
      .select('squads.full_path, COUNT(DISTINCT employees.id) AS employee_count')
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

    # Create a mapping of team names to squad IDs for linking
    squad_id_lookup = squads.map { |squad| [squad.full_path, squad.id] }.to_h

    # Build table
    @table = TableColumns.new

    # Build link parameters for drilling down into specific squads
    link_params = [LinkParams.new(name: 'squad_id', value_col: 'Team', lookup: squad_id_lookup)]

    # If we have a job_function parameter, pass it along
    if job_function.present?
      link_params << LinkParams.new(name: 'job_function', value: job_function)
    end

    # Add incremented max_depth for drill down
    next_max_depth = max_depth.to_i + 1
    link_params << LinkParams.new(name: 'max_depth', value: next_max_depth)

    @table.add_column(
      label: "Team",
      type: "string",
      values: teams,
      link_info: LinkInfo.new(
        controller: 'reports',
        action: 'job_function_density',
        link_params: link_params
      )
    )
    @table.add_column(label: "# of Employees", type: "numeric", values: counts)
    @table.add_column(label: "Org Size", type: "numeric", values: org_sizes)
    @table.add_column(label: "% of Org Size", type: "percentage", values: proportions)

    # Build chart
    @chart_data = ChartData.new(
      labels: teams,
      data: counts,
      percentages: percentages,
      chart_id: 'jobFunctionDensityChart',
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
    # Get the data with optional squad filtering
    base_employee_query = Employee.current.all

    # If squad_id is provided, filter to employees in that squad and its descendants
    if params[:squad_id].present?
      parent_squad = Squad.where(data_version_id: @current_data_version.id).find(params[:squad_id])

      # Find all squads that are children of the specified squad (using full_path hierarchy)
      descendant_squads = Squad.where(
        "(full_path = :path OR full_path LIKE :like_path) AND data_version_id = :data_version_id",
        path: parent_squad.full_path,
        like_path: "#{parent_squad.full_path} > %",
        data_version_id: @current_data_version.id
      )

      # Filter employees to only those in the descendant squads
      base_employee_query = base_employee_query
        .joins(:squads_employees)
        .where(squads_employees: { squad_id: descendant_squads.pluck(:id) })
    end

    if params[:job_function_group].present?
      employee_job_functions = base_employee_query
        .where(job_function_group: params[:job_function_group])
        .distinct(:person_id)
        .group(:job_function)
        .count
        .sort_by { |k, v| v }.reverse.to_h
    else
      employee_job_functions = base_employee_query
        .distinct(:person_id)
        .group(:job_function)
        .count
        .sort_by { |k, v| v }.reverse.to_h
    end

    # Setup report metadata
    squad_subtitle = ""
    if params[:squad_id].present?
      parent_squad = Squad.where(data_version_id: @current_data_version.id).find(params[:squad_id])
      squad_subtitle = " - #{parent_squad.full_path}"
    end

    @report_title = "Job Functions Report"
    @report_subtitle = [
      (params[:job_function_group].present? ? "Filtered by Job Function Group: #{params[:job_function_group]}" : nil),
      squad_subtitle.present? ? squad_subtitle : nil
    ].compact.join("")

    # Create table data using the new model
    @table = TableColumns.new

    # Add columns with linking to job_function_density report
    link_params = [LinkParams.new(name: 'job_function', value_col: 'Job Function')]

    # If a squad_id parameter is present, pass it along to the job_function_density report
    if params[:squad_id].present?
      link_params << LinkParams.new(name: 'squad_id', value: params[:squad_id])
    end

    @table.add_column(
      label: "Job Function",
      values: employee_job_functions.keys,
      type: "string",
      link_info: LinkInfo.new(
        controller: 'reports',
        action: 'job_function_density',
        link_params: link_params
      )
    )

    @table.add_column(
      label: "Count",
      values: employee_job_functions.values,
      type: "numeric"
    )

    percentages = build_percentages(employee_job_functions)
    @table.add_column(
      label: "Percentage",
      values: percentages,
      type: "percentage"
    )

    # Create chart data
    @chart_data = ChartData.new(
      labels: employee_job_functions.keys,
      data: employee_job_functions.values,
      percentages: percentages,
      chart_id: "jobFunctionsChart",
      label_x_axis: "# of Employees"
    )

    # Render the generic view
    render 'report'
  end

  def job_function_group
    # Get the data with optional squad filtering
    base_employee_query = Employee.where(data_version_id: @current_data_version.id)

    # If squad_id is provided, filter to employees in that squad and its descendants
    if params[:squad_id].present?
      parent_squad = Squad.find(params[:squad_id])

      # Find all squads that are children of the specified squad (using full_path hierarchy)
      descendant_squads = Squad.where(
        "(full_path = :path OR full_path LIKE :like_path) AND data_version_id = :data_version_id",
        path: parent_squad.full_path,
        like_path: "#{parent_squad.full_path} > %",
        data_version_id: @current_data_version.id
      )

      # Filter employees to only those in the descendant squads
      base_employee_query = base_employee_query
        .joins(:squads_employees)
        .where(squads_employees: { squad_id: descendant_squads.pluck(:id), data_version_id: @current_data_version.id })
    end

    employee_job_function_groups = base_employee_query
      .distinct(:person_id)
      .group(:job_function_group)
      .count
      .sort_by { |k, v| v }.reverse.to_h

    # Setup report metadata
    squad_subtitle = ""
    if params[:squad_id].present?
      parent_squad = Squad.find(params[:squad_id])
      squad_subtitle = " - #{parent_squad.full_path}"
    end

    @report_title = "Job Function Group Report"
    @report_subtitle = squad_subtitle

    # Create table data using the new model
    @table = TableColumns.new

    # Add columns with linking to job_function report
    link_params = [LinkParams.new(name: 'job_function_group', value_col: 'Job Function Group')]

    # If a squad_id parameter is present, pass it along to the job_function report
    if params[:squad_id].present?
      link_params << LinkParams.new(name: 'squad_id', value: params[:squad_id])
    end

    @table.add_column(
      label: "Job Function Group",
      values: employee_job_function_groups.keys,
      type: "string",
      link_info: LinkInfo.new(
        controller: 'reports',
        action: 'job_function',
        link_params: link_params
      )
    )

    @table.add_column(
      label: "Count",
      values: employee_job_function_groups.values,
      type: "numeric"
    )

    percentages = build_percentages(employee_job_function_groups)
    @table.add_column(
      label: "Percentage",
      values: percentages,
      type: "percentage"
    )

    # Create chart data
    @chart_data = ChartData.new(
      labels: employee_job_function_groups.keys,
      data: employee_job_function_groups.values,
      percentages: percentages,
      chart_id: "jobFunctionGroupChart",
      label_x_axis: "# of Employees"
    )

    # Render the generic view
    render 'report'
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
    # Get team sizes for current version employees only
    base_employee_query = Employee.where(data_version_id: @current_data_version.id)

    # If squad_id is provided, filter to employees in that squad and its descendants
    if params[:squad_id].present?
      parent_squad = Squad.find(params[:squad_id])

      # Find all squads that are children of the specified squad (using full_path hierarchy)
      descendant_squads = Squad.where(
        "(full_path = :path OR full_path LIKE :like_path) AND data_version_id = :data_version_id",
        path: parent_squad.full_path,
        like_path: "#{parent_squad.full_path} > %",
        data_version_id: @current_data_version.id
      )

      # Filter employees to only those in the descendant squads
      base_employee_query = base_employee_query
        .joins(:squads_employees)
        .where(squads_employees: { squad_id: descendant_squads.pluck(:id), data_version_id: @current_data_version.id })
    end

    subquery = base_employee_query.group(:manager_id).select('COUNT(*) AS team_size')
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

    # Setup report metadata
    squad_subtitle = ""
    if params[:squad_id].present?
      parent_squad = Squad.find(params[:squad_id])
      squad_subtitle = " - #{parent_squad.full_path}"
    end

    @report_title = "Management Ratios Report"
    @report_subtitle = squad_subtitle

    # Create table data using the new model
    @table = TableColumns.new

    @table.add_column(
      label: "Manager Team Size",
      values: agg_team_sizes.keys,
      type: "string"
    )

    @table.add_column(
      label: "Count",
      values: agg_team_sizes.values,
      type: "numeric"
    )

    percentages = build_percentages(agg_team_sizes)
    @table.add_column(
      label: "Percentage",
      values: percentages,
      type: "percentage"
    )

    # Create chart data
    @chart_data = ChartData.new(
      labels: agg_team_sizes.keys,
      data: agg_team_sizes.values,
      percentages: percentages,
      chart_id: "managementRatiosChart",
      label_x_axis: "# of Managers"
    )

    # Render the generic view
    render 'report'
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
