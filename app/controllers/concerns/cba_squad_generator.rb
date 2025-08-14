module CbaSquadGenerator
  extend ActiveSupport::Concern

  def build_cba_squads_list
    batch = []
    batch_size = 1000
    # Build a hash map of person_id => employee.id for fast lookup
    employee_id_map = Employee.pluck(:person_id, :id).to_h
    # Build a hash map for squads: [name, full_path, parent_id, depth] => squad
    squad_map = {}

    SquadsEmployee.delete_all
    Squad.delete_all

    # Build the demand team list
    create_demand_teams()
    create_supply_teams()

    update_teams_parent_ids()

    all_squads = Squad.pluck(:full_path, :id).to_h

    build_employee_teams(all_squads, employee_id_map)

    redirect_to root_path, notice: 'CBA squads created successfully.'
  end

  def build_all_squads_stats
    # Get root squads
    Squad.update_all(children: 0, descendents: 0, squad_members: 0, squad_members_managers: 0, squad_health: "green")

    build_squads_stats

    redirect_to root_path, notice: 'CBA squad stats generated successfully.'
  end

  private

  def build_employee_teams( squad_ids, employee_id_map)

    batch_size = 1000

    demand_employees_to_insert = []
    supply_employees_to_insert = []

    Emp.all.each do |emp|
      if emp['demand_team_type'].nil? || emp['demand_team_type'].empty?
        supply_employees_to_insert <<
          build_supply_employee_squad(emp, squad_ids, employee_id_map, supply_employees_to_insert)
      else
        demand_employees_to_insert <<
          build_demand_employee_squad(emp, squad_ids, employee_id_map, demand_employees_to_insert)
      end

      if supply_employees_to_insert.size >= batch_size
        SquadsEmployee.insert_all!(supply_employees_to_insert)
        supply_employees_to_insert.clear
      end

      if demand_employees_to_insert.size >= batch_size
        SquadsEmployee.insert_all!(demand_employees_to_insert)
        demand_employees_to_insert.clear
      end
    end

    # Insert any remaining records
    SquadsEmployee.insert_all!(supply_employees_to_insert) if supply_employees_to_insert.any?
    supply_employees_to_insert.clear

    SquadsEmployee.insert_all!(demand_employees_to_insert) if demand_employees_to_insert.any?
    demand_employees_to_insert.clear
  end

  def build_supply_employee_squad(emp, squad_ids, employee_id_map, squad_employees_to_insert)

    employee_id = employee_id_map[emp['person_id']]

    hierarchy = [
        'supply-teams',
        emp['pace_supervisory_org_business_unit']&.strip,
        emp['pace_supervisory_org_2']&.strip,
        emp['pace_supervisory_org_3']&.strip,
        emp['pace_supervisory_org_4']&.strip,
        emp['pace_supervisory_org_5']&.strip,
        emp['pace_supervisory_org_6']&.strip,
        emp['pace_supervisory_org_7']&.strip,
        emp['supply_team_name']&.strip
       ].compact

    key = hierarchy.reject(&:blank?).join(" > ")

    squad_id = squad_ids[key]

    if !squad_id
      raise "Squad with key '#{key}' does not exist in the squad_ids map for employee #{emp['id']}"
    end

    return { squad_id: squad_id, employee_id: employee_id, allocation: 1 }
  end

  def build_demand_employee_squad(emp, squad_ids, employee_id_map, squad_employees_to_insert)

    employee_id = employee_id_map[emp['person_id']]

    hierarchy = [
        'demand-teams',
        emp['demand_team_business_unit']&.strip,
        emp['demand_team_domain_l1']&.strip,
        emp['demand_team_domain_l2']&.strip,
        emp['demand_team_domain_l3']&.strip,
        emp['demand_team_name']&.strip].compact

    key = hierarchy.reject(&:blank?).join(" > ")

    squad_id = squad_ids[key]

    if !squad_id
      raise "Squad with key '#{key}' does not exist in the squad_ids map for employee #{emp['id']}"
    end

    return { squad_id: squad_id, employee_id: employee_id, allocation: 1 }
  end

  # Helper method to build a list of all teams
  def create_demand_teams
    batchsize = 500
    team_list = {}

    # Fetch distinct team hierarchy from the database
    # Emp.distinct.pluck(:master_domain_name, :domain_name, :sub_domain_name, :team_name)
    demand_teams = Emp.where.not(demand_team_type: nil).distinct.pluck(
      :demand_team_name,
      :demand_team_business_unit,
      :demand_team_domain_l1,
      :demand_team_domain_l2,
      :demand_team_domain_l3,
      :demand_team_id,
    )

    demand_teams.each do |demand_team_name, demand_team_business_unit,
      demand_team_domain_l1, demand_team_domain_l2, demand_team_domain_l3,
      demand_team_id |

      # Build the full hierarchy path
      hierarchy = [
        "demand-teams",
        demand_team_business_unit&.strip,
        demand_team_domain_l1&.strip,
        demand_team_domain_l2&.strip,
        demand_team_domain_l3&.strip,
        demand_team_name&.strip].compact

      # Add each level of the hierarchy to the team_list
      hierarchy.each_with_index do |_, index|
        key = hierarchy[0..index].reject(&:blank?).join(" > ")
        next if team_list.key?(key) # Skip if already added

        depth = index + 1
        name = hierarchy[index]

        team_list[key] = { full_path: key, name: name, depth: depth, parent_id: nil }
      end
    end

    # Insert teams into the squads table in batches
    team_list.values.each_slice(batchsize) do |batch|
      Squad.insert_all!(batch)
    end
  end

  def create_supply_teams
    batchsize = 500
    team_list = {}
    # Fetch distinct team hierarchy from the database
    supply_teams = Emp.where(demand_team_type: nil).distinct.pluck(
      :pace_supervisory_org_business_unit,
      :pace_supervisory_org_2,
      :pace_supervisory_org_3,
      :pace_supervisory_org_4,
      :pace_supervisory_org_5,
      :pace_supervisory_org_6,
      :pace_supervisory_org_7,
      :supply_team_name)

    supply_teams.each do |pace_supervisory_org_business_unit,
      pace_supervisory_org_2, pace_supervisory_org_3, pace_supervisory_org_4,
      pace_supervisory_org_5, pace_supervisory_org_6, pace_supervisory_org_7,
      supply_team_name|

      # Build the full hierarchy path
      hierarchy = [
        "supply-teams",
        pace_supervisory_org_business_unit&.strip,
        pace_supervisory_org_2&.strip,
        pace_supervisory_org_3&.strip,
        pace_supervisory_org_4&.strip,
        pace_supervisory_org_5&.strip,
        pace_supervisory_org_6&.strip,
        pace_supervisory_org_7&.strip,
        supply_team_name&.strip
      ].compact

      # Add each level of the hierarchy to the team_list
      hierarchy.each_with_index do |_, index|
        key = hierarchy[0..index].reject(&:blank?).join(" > ")
        next if team_list.key?(key) # Skip if already added

        depth = index + 1
        name = hierarchy[index]

        team_list[key] = { full_path: key, name: name, depth: depth, parent_id: nil}
      end
    end

    # Insert teams into the squads table in batches
    team_list.values.each_slice(batchsize) do |batch|
      Squad.insert_all!(batch)
    end
  end

  def update_teams_parent_ids
    # Get all squads and their IDs, normalized
    squad_ids = Squad.pluck(:full_path, :id).map { |full_path, id| [full_path.strip, id] }.to_h
    squad_updates = {}

    # For each squad, find its parent and update the parent_id in memory
    squad_ids.each do |key, id|
      parent_path = key.split(" > ")[0...-1].join(" > ")
      parent_id = squad_ids[parent_path]

      if parent_path.length > 0 && parent_id.nil?
        raise "Parent squad with key '#{parent_path}' does not exist in the squad_ids map for squad #{key}"
      end

      if key.include?("AI Powered Engineering (WWA)")
        # raise "AIPE squad found in #{key}, parent_path: #{parent_path}, parent_id: #{parent_id}"
      end

      squad_updates[id] = { id: id, parent_id: parent_id }
    end

    # squad_updates.keys.each do |squad_id|
    #   Squad.where(id: squad_id).update_all(parent_id: squad_updates[squad_id][:parent_id])
    # end
    # Do a bulk update of parent IDs
    if squad_updates.any?
      ids = squad_updates.values.map { |u| u[:id] }
      case_sql = squad_updates.values.map { |u| "WHEN #{u[:id]} THEN #{u[:parent_id].nil? ? 'NULL' : u[:parent_id]}" }.join(" ")
      Squad.where(id: ids).update_all("parent_id = CASE id #{case_sql} END")
    end
  end

  def build_employee_pace(emp, batch, batch_size, employee_id_map, squad_map)
    employee_id = emp['person_id']
    employee_db_id = employee_id_map[employee_id]
    return unless employee_db_id

    org_name = emp['pace_supervisory_org_business_unit'].strip
    return if org_name.nil? || org_name.empty?

    squad_parent = nil
    squad_array = []
    squad_array.push( org_name )

    key = [org_name, org_name, squad_parent, 1]
    squad = squad_map[key]
    unless squad
      squad = Squad.create!(name: org_name, full_path: org_name, parent_id: squad_parent, depth: 1)
      squad_map[key] = squad
    end
    squad_parent = squad.id

    # Build sub-squads
    (2..7).each do |i|
      lvl = emp["pace_supervisory_org_#{i}"]

      # If we've found nil or empty, this is the squad the employee belongs to
      if lvl.nil? || lvl.empty? || i == 7
        batch << { squad_id: squad.id, employee_id: employee_db_id, allocation: 1 }
        employee_squads = batch.select { |b| b[:employee_id] == employee_db_id }

        if employee_squads.count > 1
          allocation = (1.0 / employee_squads.count).round(3)
          employee_squads.each { |es| es[:allocation] = allocation }
        end
        break
      end
      lvl = lvl.strip
      squad_array.push( lvl )
      squad_path = build_squad_path(squad_array)
      key = [lvl, squad_path, squad_parent, i]
      squad = squad_map[key]
      unless squad
        squad = Squad.create!(name: lvl, full_path: squad_path, parent_id: squad_parent, depth: i)
        squad_map[key] = squad
      end
      squad_parent = squad.id
    end
  end

  def build_squads_stats
    # Reset all squad stats
    Squad.update_all(children: 0, descendents: 0, squad_members: 0, squad_members_managers: 0, squad_health: "green")

    # Get only the data you need without loading full objects
    squad_hierarchy = Squad.pluck(:id, :parent_id, :full_path).map { |id, parent_id, path| 
      { id: id, parent_id: parent_id, full_path: path, children: 0, descendents: 0, squad_members: 0, org_members: 0 }
    }

    # Build lookup hash efficiently
    squad_map = {}
    squad_hierarchy.each { |squad| squad_map[squad[:id]] = squad }

    # Get aggregated data
    squad_employees_count = SquadsEmployee.group(:squad_id).count
    squad_manager_counts = SquadsEmployee.joins(:employee).where(employees: { is_manager: true }).group(:squad_id).count
    squad_children = Squad.where.not(parent_id: nil).group(:parent_id).count

    # Calculate stats
    squad_hierarchy.each do |squad|
      squad[:squad_members] = squad_employees_count[squad[:id]] || 0
      squad[:org_members] = squad[:squad_members]
      squad[:squad_members_managers] = squad_manager_counts[squad[:id]] || 0
      squad[:children] = squad_children[squad[:id]] || 0
    end

    # Calculate descendents and org_members in a single pass (bottom-up)
    root_squads = squad_hierarchy.select { |s| s[:parent_id].nil? }

    root_squads.each do |root_squad|
      calculate_descendents_recursive(root_squad, squad_map)
    end

    # Calculate health for all squads and batch update
    squad_updates = []
    squad_hierarchy.each do |squad|
      squad_health, squad_health_details = get_squad_health(squad)
      squad_updates << {
        id: squad[:id],
        children: squad[:children],
        descendents: squad[:descendents],
        squad_members: squad[:squad_members],
        squad_members_managers: squad[:squad_members_managers],
        org_members: squad[:org_members],
        squad_health: squad_health,
        squad_health_details: squad_health_details.join(" | ")
      }
    end

    # Batch update all squads
    if squad_updates.any?
      ids = squad_updates.map { |u| u[:id] }
      case_sql_children = squad_updates.map { |u| "WHEN #{u[:id]} THEN #{u[:children]}" }.join(" ")
      case_sql_descendents = squad_updates.map { |u| "WHEN #{u[:id]} THEN #{u[:descendents]}" }.join(" ")
      case_sql_squad_members = squad_updates.map { |u| "WHEN #{u[:id]} THEN #{u[:squad_members]}" }.join(" ")
      case_sql_squad_members_managers = squad_updates.map { |u| "WHEN #{u[:id]} THEN #{u[:squad_members_managers]}" }.join(" ")
      case_sql_org_members = squad_updates.map { |u| "WHEN #{u[:id]} THEN #{u[:org_members]}" }.join(" ")
      case_sql_squad_health = squad_updates.map { |u| "WHEN #{u[:id]} THEN '#{u[:squad_health]}'" }.join(" ")
      case_sql_squad_health_details = squad_updates.map { |u| "WHEN #{u[:id]} THEN '#{u[:squad_health_details].gsub("'", "''")}'" }.join(" ")

      Squad.where(id: ids).update_all(
        "children = CASE id #{case_sql_children} END, " +
        "descendents = CASE id #{case_sql_descendents} END, " +
        "squad_members = CASE id #{case_sql_squad_members} END, " +
        "squad_members_managers = CASE id #{case_sql_squad_members_managers} END, " +
        "org_members = CASE id #{case_sql_org_members} END, " +
        "squad_health = CASE id #{case_sql_squad_health} END, " +
        "squad_health_details = CASE id #{case_sql_squad_health_details} END"
      )
    end

  end

private

  def calculate_descendents_recursive(squad, squad_map)
    squad[:descendents] = 0

    # Get all children
    children = squad_map.values.select { |s| s[:parent_id] == squad[:id] }

    children.each do |child|
      squad[:descendents] += 1
      calculate_descendents_recursive(child, squad_map)
      squad[:descendents] += child[:descendents]
      squad[:org_members] += child[:org_members]
    end
  end

  def build_squad_path(squad_path)
    squad_path.reject(&:blank?).join(" > ")
  end

  def get_squad_health(squad)
    squad_health = "green"
    squad_health_details = Array.new

    squad_members = squad[:squad_members]
    squad_member_managers = squad[:squad_members_managers]
    squad_children = squad[:children]

    if squad_members.between?(13,15)
      squad_health = increment_health(squad_health, "amber")
      squad_health_details.push("Large Team Size (amber)")
    elsif squad_members.between?(3,4)
      squad_health = increment_health(squad_health, "amber")
      squad_health_details.push("Small Team Size (amber)")
    elsif squad_members.between?(1,2)
      squad_health = increment_health(squad_health, "red")
      squad_health_details.push("Small Team Size (red)")
    elsif squad_members > 15
      squad_health = increment_health(squad_health, "red")
      squad_health_details.push("Large Team Size (red)")
    end

    if squad_member_managers.between?(3,3)
      squad_health = increment_health(squad_health, "amber")
      squad_health_details.push("Multiple Managers (amber)")
    elsif squad_member_managers > 3
      squad_health = increment_health(squad_health, "red")
      squad_health_details.push("Multiple Managers (red)")
    end

    if squad_children.between?(10,12)
      squad_health = increment_health(squad_health, "amber")
      squad_health_details.push("Many Sub-Teams (amber)")
    elsif squad_children.between?(1,2)
      squad_health = increment_health(squad_health, "amber")
      squad_health_details.push("Few Sub-Teams (amber)")
    elsif squad_children > 12
      squad_health = increment_health(squad_health, "red")
      squad_health_details.push("Many Sub-Teams (red)")
    end

    [squad_health, squad_health_details]
  end

  def increment_health(current_health, updated_health)
    if current_health == "green"
      current_health = updated_health
    elsif current_health == "amber" && updated_health == "red"
      current_health = updated_health
    end
    current_health
  end

end