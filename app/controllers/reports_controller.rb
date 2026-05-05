class ReportsController < ApplicationController
  before_action :set_current_data_version

  def roles
    base_query = employee_base_query

    filtered_query  = filtered_by_job_family(filtered_by_job_code(base_query))
    employee_titles = filtered_query.distinct(:person_id).group(:title).count
      .sort_by { |_, v| v }.reverse.to_h

    title_job_families = filtered_query.group(:title)
      .pluck('title, MAX(job_family)').to_h

    squad_subtitle = team_subtitle
    @report_title  = 'Roles Report'
    @report_subtitle = [
      (params[:job_family].present? ? "Job Family: #{params[:job_family]}" : nil),
      (params[:job_code].present?   ? "Filtered by Job Code: #{params[:job_code]}" : nil),
      squad_subtitle.presence
    ].compact.join(' ')

    @table = TableColumns.new

    link_params = [LinkParams.new(name: 'title', value_col: 'Role')]
    link_params << LinkParams.new(name: 'team_id', value: params[:team_id]) if params[:team_id].present?

    @table.add_column(
      label: 'Role', values: employee_titles.keys, type: 'string',
      link_info: LinkInfo.new(controller: 'reports', action: 'title_density', link_params: link_params)
    )
    @table.add_column(
      label: 'Job Family', values: employee_titles.keys.map { |t| title_job_families[t] }, type: 'string'
    )
    @table.add_column(
      label: 'Count', values: employee_titles.values, type: 'numeric',
      link_info: LinkInfo.new(
        controller: 'employees', action: 'index',
        link_params: [
          LinkParams.new(name: 'title', value_col: 'Role'),
          (params[:team_id].present?   ? LinkParams.new(name: 'team_id',  value: params[:team_id])  : nil),
          (params[:job_code].present?  ? LinkParams.new(name: 'job_code', value: params[:job_code]) : nil)
        ].compact
      )
    )

    percentages = build_percentages(employee_titles)
    @table.add_column(label: 'Percentage', values: percentages, type: 'percentage')

    @chart_data = ChartData.new(
      labels: employee_titles.keys, data: employee_titles.values, percentages: percentages,
      chart_id: 'rolesChart', label_x_axis: '# of Employees'
    )

    render 'report'
  end

  def title_density
    title     = params[:title]
    max_depth = params[:max_depth] || 1
    team_id   = params[:team_id]

    @report_title    = 'Title Density Report'
    @report_subtitle = title ? "#{title} (Depth: #{max_depth})" : "All Titles (Depth: #{max_depth})"
    @back_link       = nil

    base_team_query = Team.where(data_version_id: @current_data_version.id)

    if team_id.present?
      parent_team = base_team_query.find(team_id)
      squad_title = title ? "#{title} - #{parent_team.full_path}" : "All Titles - #{parent_team.full_path}"
      @report_subtitle = "#{squad_title} (Depth: #{max_depth})"
      @back_link = build_back_link(parent_team, :title_density, max_depth, title: title)
      base_team_query = base_team_query.where('full_path = ? OR full_path LIKE ?', parent_team.full_path, "#{parent_team.full_path} > %")
    end

    teams            = base_team_query.where(depth: max_depth).order('teams.org_member_count DESC')
    teams_hash       = teams.map { |t| [t.full_path, [0, t.org_member_count || 0]] }.to_h
    team_display_map = teams.map { |t| [t.full_path, t.pretty_name.presence || t.name] }.to_h
    team_id_map      = teams.map { |t| [t.pretty_name.presence || t.name, t.id] }.to_h

    team_emp_query = Team.joins(teams_employees: :employee)
      .where(teams: { data_version_id: @current_data_version.id })
      .where(employees: { data_version_id: @current_data_version.id })
      .then { |q| title.present? ? q.where(employees: { title: title }) : q }

    if team_id.present?
      team_emp_query = team_emp_query.where('teams.full_path = ? OR teams.full_path LIKE ?', parent_team.full_path, "#{parent_team.full_path} > %")
    end

    team_emp_query.group(:full_path)
      .select('teams.full_path, COUNT(DISTINCT employees.id) AS employee_count')
      .each do |row|
        teams_hash.each_key { |key| teams_hash[key][0] += row.employee_count if row.full_path.starts_with?(key) }
      end

    counts      = teams_hash.values.map { |v| v[0] }
    org_sizes   = teams.map { |t| t.org_member_count || 0 }
    proportions = teams_hash.values.map { |v| v[1] > 0 ? (v[0].to_f / v[1]) * 100 : 0 }
    percentages = build_percentages(teams_hash.map { |k, v| [k, v[0]] }.to_h)

    link_params = [LinkParams.new(name: 'team_id', value_col: 'Team', lookup: team_id_map)]
    link_params << LinkParams.new(name: 'title', value: title) if title.present?
    link_params << LinkParams.new(name: 'max_depth', value: max_depth.to_i + 1)

    team_display_names = teams_hash.keys.map { |k| team_display_map[k] }

    @table = TableColumns.new
    @table.add_column(
      label: 'Team', type: 'string', values: team_display_names,
      link_info: LinkInfo.new(controller: 'reports', action: 'title_density', link_params: link_params)
    )
    @table.add_column(label: '# of Employees', type: 'numeric',     values: counts)
    @table.add_column(label: 'Org Size',        type: 'numeric',     values: org_sizes)
    @table.add_column(label: '% of Org Size',   type: 'percentage',  values: proportions)

    @chart_data = ChartData.new(labels: team_display_names, data: counts, percentages: percentages, chart_id: 'titleDensityChart', label_x_axis: '# of Employees')

    respond_to { |f| f.html { render 'report' } }
  end

  def job_code_density
    job_code  = params[:job_code]
    max_depth = params[:max_depth] || 1
    team_id   = params[:team_id]

    @report_title    = 'Job Code Density Report'
    @report_subtitle = job_code ? "#{job_code} (Depth: #{max_depth})" : "All Job Codes (Depth: #{max_depth})"
    @back_link       = nil

    base_team_query = Team.where(data_version_id: @current_data_version.id)

    if team_id.present?
      parent_team = base_team_query.find(team_id)
      squad_title = job_code ? "#{job_code} - #{parent_team.full_path}" : "All Job Codes - #{parent_team.full_path}"
      @report_subtitle = "#{squad_title} (Depth: #{max_depth})"
      @back_link = build_back_link(parent_team, :job_code_density, max_depth, job_code: job_code)
      base_team_query = base_team_query.where('full_path = ? OR full_path LIKE ?', parent_team.full_path, "#{parent_team.full_path} > %")
    end

    teams       = base_team_query.where(depth: max_depth).order('teams.org_member_count DESC')
    teams_hash  = teams.map { |t| [t.full_path, [0, t.org_member_count || 0]] }.to_h
    team_id_map = teams.map { |t| [t.full_path, t.id] }.to_h

    team_emp_query = Team.joins(teams_employees: :employee)
      .where(teams: { data_version_id: @current_data_version.id })
      .where(employees: { data_version_id: @current_data_version.id })
      .then { |q| job_code.present? ? q.where(employees: { job_code: job_code }) : q }

    if team_id.present?
      team_emp_query = team_emp_query.where('teams.full_path = ? OR teams.full_path LIKE ?', parent_team.full_path, "#{parent_team.full_path} > %")
    end

    team_emp_query.group(:full_path)
      .select('teams.full_path, COUNT(DISTINCT employees.id) AS employee_count')
      .each do |row|
        teams_hash.each_key { |key| teams_hash[key][0] += row.employee_count if row.full_path.starts_with?(key) }
      end

    counts      = teams_hash.values.map { |v| v[0] }
    org_sizes   = teams.map { |t| t.org_member_count || 0 }
    proportions = teams_hash.values.map { |v| v[1] > 0 ? (v[0].to_f / v[1]) * 100 : 0 }
    percentages = build_percentages(teams_hash.map { |k, v| [k, v[0]] }.to_h)

    link_params = [LinkParams.new(name: 'team_id', value_col: 'Team', lookup: team_id_map)]
    link_params << LinkParams.new(name: 'job_code', value: job_code) if job_code.present?
    link_params << LinkParams.new(name: 'max_depth', value: max_depth.to_i + 1)

    action_link_params = [LinkParams.new(name: 'id', value_col: 'Team', lookup: team_id_map)]

    @table = TableColumns.new
    @table.add_column(
      label: 'Team', type: 'string', values: teams_hash.keys,
      link_info: LinkInfo.new(controller: 'reports', action: 'job_code_density', link_params: link_params)
    )
    @table.add_column(label: '# of Employees', type: 'numeric',    values: counts)
    @table.add_column(label: '% of Total',      type: 'percentage', values: percentages)
    @table.add_column(label: 'Org Size',         type: 'numeric',   values: org_sizes)
    @table.add_column(label: '% of Org Size',    type: 'percentage', values: proportions)
    @table.add_column(
      label: 'Actions', type: 'action', values: teams.map { 'View Team' },
      link_info: LinkInfo.new(controller: 'teams', action: 'show', link_params: action_link_params)
    )

    @chart_data = ChartData.new(labels: teams_hash.keys, data: counts, percentages: percentages, chart_id: 'jobCodeDensityChart', label_x_axis: '# of Employees')

    respond_to { |f| f.html { render 'report' } }
  end

  def seniority
    @report_title    = 'Seniority Report'
    @report_subtitle = 'Distribution of employees by job level'

    data = Employee.current
      .then { |q| params[:country].present?        ? q.where(country: params[:country])               : q }
      .then { |q| params[:personnel_area].present? ? q.where(personnel_area: params[:personnel_area]) : q }
      .group(:seniority).count.sort_by { |k, _| k }.reverse.to_h

    @seniorities = data.keys
    @counts      = data.values
    @percentages = build_percentages(data)
  end

  def job_code
    base_query = employee_base_query

    employee_job_codes = base_query.distinct(:person_id).group(:job_code).count
      .sort_by { |_, v| v }.reverse.to_h

    @report_title    = 'Job Code Report'
    @report_subtitle = team_subtitle

    @table = TableColumns.new

    link_params = [LinkParams.new(name: 'job_code', value_col: 'Job Code')]
    link_params << LinkParams.new(name: 'team_id', value: params[:team_id]) if params[:team_id].present?

    @table.add_column(
      label: 'Job Code', values: employee_job_codes.keys, type: 'string',
      link_info: LinkInfo.new(controller: 'reports', action: 'job_code_density', link_params: link_params)
    )
    @table.add_column(
      label: 'Count', values: employee_job_codes.values, type: 'numeric',
      link_info: LinkInfo.new(
        controller: 'reports', action: 'roles',
        link_params: [
          LinkParams.new(name: 'job_code', value_col: 'Job Code'),
          params[:team_id].present? ? LinkParams.new(name: 'team_id', value: params[:team_id]) : nil
        ].compact
      )
    )

    percentages = build_percentages(employee_job_codes)
    @table.add_column(label: 'Percentage', values: percentages, type: 'percentage')

    @chart_data = ChartData.new(
      labels: employee_job_codes.keys, data: employee_job_codes.values, percentages: percentages,
      chart_id: 'jobCodeChart', label_x_axis: '# of Employees'
    )

    render 'report'
  end

  def employee_country
    data = Employee.current.group(:country).count.sort_by { |_, v| v }.reverse.to_h

    @report_title    = 'Employee Countries Report'
    @report_subtitle = 'Distribution of employees by country'
    build_simple_count_report(data, 'Country', 'employeeCountryChart', '# of Employees')
    render 'report'
  end

  def personnel_area
    data = Employee.current.group(:personnel_area).count.sort_by { |_, v| v }.reverse.to_h

    @report_title    = 'Personnel Area Report'
    @report_subtitle = 'Distribution of employees by personnel area'
    build_simple_count_report(data, 'Personnel Area', 'personnelAreaChart', '# of Employees')
    render 'report'
  end

  def company
    data = Employee.current.group(:company).count.sort_by { |_, v| v }.reverse.to_h

    @report_title    = 'Company / Subsidiary Report'
    @report_subtitle = 'Distribution of employees by company'
    build_simple_count_report(data, 'Company', 'companyChart', '# of Employees')
    render 'report'
  end

  def job_family
    raw = Employee.current
      .group(:job_family).count.sort_by { |_, v| v }.reverse.to_h

    data = raw.transform_keys { |k| k.presence || 'Unassigned' }

    @report_title    = 'Employee Job Family Report'
    @report_subtitle = 'Distribution of employees by job family'

    @table = TableColumns.new
    @table.add_column(
      label: 'Job Family', values: data.keys, type: 'string',
      link_info: LinkInfo.new(
        controller: 'reports', action: 'roles',
        link_params: [LinkParams.new(name: 'job_family', value_col: 'Job Family')]
      )
    )
    @table.add_column(
      label: 'Count', values: data.values, type: 'numeric',
      link_info: LinkInfo.new(
        controller: 'employees', action: 'index',
        link_params: [LinkParams.new(name: 'job_family', value_col: 'Job Family')]
      )
    )
    percentages = build_percentages(data)
    @table.add_column(label: 'Percentage', values: percentages, type: 'percentage')

    @chart_data = ChartData.new(
      labels: data.keys, data: data.values, percentages: percentages,
      chart_id: 'jobFamilyChart', label_x_axis: '# of Employees'
    )

    render 'report'
  end

  def individual_contributors
    base_query = employee_base_query

    managers = base_query.where(is_manager: true).count
    ics      = base_query.where.not(is_manager: true).count

    data = {
      'Managers'                 => managers,
      'Individual Contributors'  => ics
    }

    @report_title    = 'Managers vs Individual Contributors'
    @report_subtitle = team_subtitle

    build_simple_count_report(data, 'Type', 'icManagerChart', '# of Employees')
    render 'report'
  end

  def management_ratios
    base_query = Employee.where(data_version_id: @current_data_version.id)

    if params[:team_id].present?
      parent_team      = Team.find(params[:team_id])
      descendant_teams = Team.where(
        "(full_path = :path OR full_path LIKE :like_path) AND data_version_id = :data_version_id",
        path: parent_team.full_path, like_path: "#{parent_team.full_path} > %",
        data_version_id: @current_data_version.id
      )
      base_query = base_query.joins(:teams_employees)
        .where(teams_employees: { team_id: descendant_teams.pluck(:id), data_version_id: @current_data_version.id })
    end

    subquery       = base_query
      .joins("INNER JOIN employees AS mgr ON mgr.person_id = employees.manager_id AND mgr.data_version_id = employees.data_version_id")
      .group(:manager_id).select('COUNT(*) AS team_size')
    all_team_sizes = Employee.from(subquery, :A).group(:team_size).order(team_size: :desc).count

    agg = { '> 15' => 0, '11-15' => 0, '5-10' => 0, '3-4' => 0, '1-2' => 0 }
    all_team_sizes.each do |size, count|
      bucket = size > 15 ? '> 15' : size > 10 ? '11-15' : size > 4 ? '5-10' : size > 2 ? '3-4' : '1-2'
      agg[bucket] += count
    end

    @report_title    = 'Management Ratios Report'
    @report_subtitle = params[:team_id].present? ? " - #{Team.find(params[:team_id]).full_path}" : ''

    percentages = build_percentages(agg)
    @table = TableColumns.new
    @table.add_column(label: 'Manager Team Size', values: agg.keys,   type: 'string')
    @table.add_column(label: 'Count',             values: agg.values, type: 'numeric',
      link_info: LinkInfo.new(controller: 'employees', action: 'index',
        link_params: [LinkParams.new(name: 'direct_reports_bucket', value_col: 'Manager Team Size')]))
    @table.add_column(label: 'Percentage',        values: percentages, type: 'percentage')

    @chart_data = ChartData.new(labels: agg.keys, data: agg.values, percentages: percentages, chart_id: 'managementRatiosChart', label_x_axis: '# of Managers')

    render 'report'
  end

  def team_depth
    data = Team.where(data_version_id: @current_data_version.id)
      .group(:depth).count.sort_by { |k, _| k }.reverse.to_h

    @report_title    = 'Team Depth Report'
    @report_subtitle = ''
    percentages      = build_percentages(data)

    @table = TableColumns.new
    @table.add_column(label: 'Team Depth',    type: 'string',     values: data.keys)
    @table.add_column(label: '# of Teams',    type: 'numeric',    values: data.values)
    @table.add_column(label: '% of Total',    type: 'percentage', values: percentages)

    @chart_data = ChartData.new(labels: data.keys, data: data.values, percentages: percentages, chart_id: 'teamDepthChart', label_x_axis: '# of Teams')

    respond_to { |f| f.html { render 'report' } }
  end

  def team_size
    data = Team.where(data_version_id: @current_data_version.id)
      .group(:member_count).count.sort_by { |k, _| k }.reverse.to_h

    @report_title    = 'Team Size Report'
    @report_subtitle = 'Distribution of teams by member count'
    build_simple_count_report(data, 'Team Size', 'teamSizeChart', '# of Teams')
    render 'report'
  end

  def team_health
    data = Team.where(data_version_id: @current_data_version.id)
      .group(:team_health).count.sort_by { |_, v| v }.reverse.to_h

    @healths     = data.keys
    @counts      = data.values
    @percentages = build_percentages(data)
  end

  def team_health_details
    data = Team.where(data_version_id: @current_data_version.id)
      .group(:team_health_details).count.sort_by { |_, v| v }.reverse.to_h

    @details     = data.keys
    @counts      = data.values
    @percentages = build_percentages(data)
  end

  def team_children
    data = Team.where(data_version_id: @current_data_version.id)
      .group(:children).count.sort_by { |k, _| k }.reverse.to_h

    @children    = data.keys
    @counts      = data.values
    @percentages = build_percentages(data)
  end

  def team_members_managers
    data = Team.where(data_version_id: @current_data_version.id)
      .group(:manager_count).count.sort_by { |k, _| k }.reverse.to_h

    @managers    = data.keys
    @counts      = data.values
    @percentages = build_percentages(data)
  end

  private

  def employee_base_query
    query = Employee.current

    if params[:team_id].present?
      parent_team      = Team.where(data_version_id: @current_data_version.id).find_by(id: params[:team_id])
      if parent_team
        descendant_teams = Team.where(
          "(full_path = :path OR full_path LIKE :like_path) AND data_version_id = :data_version_id",
          path: parent_team.full_path, like_path: "#{parent_team.full_path} > %",
          data_version_id: @current_data_version.id
        )
        query = query.joins(:teams_employees).where(teams_employees: { team_id: descendant_teams.pluck(:id) })
      end
    end

    query
  end

  def filtered_by_job_code(query)
    params[:job_code].present? ? query.where(job_code: params[:job_code]) : query
  end

  def filtered_by_job_family(query)
    params[:job_family].present? ? query.where(job_family: params[:job_family]) : query
  end

  def team_subtitle
    return '' unless params[:team_id].present?

    team = Team.where(data_version_id: @current_data_version.id).find_by(id: params[:team_id])
    team ? " - #{team.full_path}" : ''
  end

  def build_back_link(parent_team, action, max_depth, extra_params = {})
    if parent_team.parent
      back_params = { controller: 'reports', action: action, team_id: parent_team.parent.id, max_depth: max_depth }.merge(extra_params)
      { text: "← Back to #{parent_team.parent.full_path}", url: url_for(back_params) }
    else
      back_max_depth = [max_depth.to_i - 1, 1].max
      back_params    = { controller: 'reports', action: action, max_depth: back_max_depth }.merge(extra_params)
      { text: '← Back to All Teams', url: url_for(back_params) }
    end
  end

  def build_simple_count_report(data_hash, label_col, chart_id, x_axis_label = '# of Items')
    @table = TableColumns.new
    @table.add_column(label: label_col,   values: data_hash.keys,   type: 'string')
    @table.add_column(label: 'Count',     values: data_hash.values, type: 'numeric')
    percentages = build_percentages(data_hash)
    @table.add_column(label: 'Percentage', values: percentages,     type: 'percentage')
    @chart_data = ChartData.new(labels: data_hash.keys, data: data_hash.values, percentages: percentages, chart_id: chart_id, label_x_axis: x_axis_label)
  end

  def build_percentages(data)
    sum = data.values.sum
    data.values.map { |v| sum > 0 ? (v.to_f / sum * 100).round(2) : 0 }
  end
end
