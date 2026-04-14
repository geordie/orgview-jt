module TeamGenerator
  extend ActiveSupport::Concern

  def build_all_teams_stats
    current_version = DataVersion.active.first
    return redirect_to root_path, alert: 'No active data version found.' unless current_version

    Team.where(data_version_id: current_version.id).update_all(
      children: 0, descendents: 0, member_count: 0, manager_count: 0, team_health: 'green'
    )

    build_teams_stats(current_version)

    redirect_to root_path, notice: 'Team stats generated successfully.'
  end

  private

  def build_teams_stats(current_version)
    team_hierarchy = Team.where(data_version_id: current_version.id)
      .pluck(:id, :parent_id, :full_path)
      .map { |id, parent_id, path| { id: id, parent_id: parent_id, full_path: path, children: 0, descendents: 0, member_count: 0, org_member_count: 0 } }

    team_map = {}
    team_hierarchy.each { |t| team_map[t[:id]] = t }

    member_counts  = TeamsEmployee.where(data_version_id: current_version.id).group(:team_id).count
    manager_counts = TeamsEmployee.where(data_version_id: current_version.id)
      .joins(:employee)
      .where(employees: { is_manager: true, data_version_id: current_version.id })
      .group(:team_id).count
    children_count = Team.where(data_version_id: current_version.id).where.not(parent_id: nil).group(:parent_id).count

    team_hierarchy.each do |team|
      team[:member_count]     = member_counts[team[:id]] || 0
      team[:org_member_count] = team[:member_count]
      team[:manager_count]    = manager_counts[team[:id]] || 0
      team[:children]         = children_count[team[:id]] || 0
    end

    root_teams = team_hierarchy.select { |t| t[:parent_id].nil? }
    root_teams.each { |root| calculate_descendents_recursive(root, team_map) }

    team_updates = team_hierarchy.map do |team|
      health, health_details = get_team_health(team)
      team.merge(team_health: health, team_health_details: health_details.join(' | '))
    end

    return unless team_updates.any?

    ids = team_updates.map { |u| u[:id] }

    case_children       = team_updates.map { |u| "WHEN #{u[:id]} THEN #{u[:children]}" }.join(' ')
    case_descendents    = team_updates.map { |u| "WHEN #{u[:id]} THEN #{u[:descendents]}" }.join(' ')
    case_members        = team_updates.map { |u| "WHEN #{u[:id]} THEN #{u[:member_count]}" }.join(' ')
    case_managers       = team_updates.map { |u| "WHEN #{u[:id]} THEN #{u[:manager_count]}" }.join(' ')
    case_org_members    = team_updates.map { |u| "WHEN #{u[:id]} THEN #{u[:org_member_count]}" }.join(' ')
    case_health         = team_updates.map { |u| "WHEN #{u[:id]} THEN '#{u[:team_health]}'" }.join(' ')
    case_health_details = team_updates.map { |u| "WHEN #{u[:id]} THEN '#{u[:team_health_details].gsub("'", "''")}'" }.join(' ')

    Team.where(id: ids, data_version_id: current_version.id).update_all(
      "children = CASE id #{case_children} END, " \
      "descendents = CASE id #{case_descendents} END, " \
      "member_count = CASE id #{case_members} END, " \
      "manager_count = CASE id #{case_managers} END, " \
      "org_member_count = CASE id #{case_org_members} END, " \
      "team_health = CASE id #{case_health} END, " \
      "team_health_details = CASE id #{case_health_details} END"
    )
  end

  def calculate_descendents_recursive(team, team_map)
    team[:descendents] = 0
    children = team_map.values.select { |t| t[:parent_id] == team[:id] }
    children.each do |child|
      team[:descendents]     += 1
      calculate_descendents_recursive(child, team_map)
      team[:descendents]     += child[:descendents]
      team[:org_member_count] += child[:org_member_count]
    end
  end

  def get_team_health(team)
    health         = 'green'
    health_details = []

    members  = team[:member_count]
    managers = team[:manager_count]
    children = team[:children]

    if members > 15
      health = increment_health(health, 'red')
      health_details << 'Large Team Size (red)'
    elsif members.between?(13, 15)
      health = increment_health(health, 'amber')
      health_details << 'Large Team Size (amber)'
    elsif members.between?(3, 4)
      health = increment_health(health, 'amber')
      health_details << 'Small Team Size (amber)'
    elsif members.between?(1, 2)
      health = increment_health(health, 'red')
      health_details << 'Small Team Size (red)'
    end

    if managers > 3
      health = increment_health(health, 'red')
      health_details << 'Multiple Managers (red)'
    elsif managers == 3
      health = increment_health(health, 'amber')
      health_details << 'Multiple Managers (amber)'
    end

    if children > 12
      health = increment_health(health, 'red')
      health_details << 'Many Sub-Teams (red)'
    elsif children.between?(10, 12)
      health = increment_health(health, 'amber')
      health_details << 'Many Sub-Teams (amber)'
    elsif children.between?(1, 2)
      health = increment_health(health, 'amber')
      health_details << 'Few Sub-Teams (amber)'
    end

    [health, health_details]
  end

  def increment_health(current, updated)
    return updated if current == 'green'
    return updated if current == 'amber' && updated == 'red'
    current
  end
end
