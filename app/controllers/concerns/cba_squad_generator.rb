module CbaSquadGenerator
  extend ActiveSupport::Concern

  def build_cba_squads_list
    ActiveRecord::Base.transaction do
      SquadsEmployee.destroy_all
      Squad.destroy_all
      # Remove where(['`Vacancy Status` != ?', "Vacant" ])
      Emp.all.each do |emp|
        if !emp['Demand team - type'].nil? && !emp['Demand team - type'].empty?
          build_employee_squad(emp)
        else
          build_employee_pace(emp)
        end
      end
    end

    redirect_to squads_path, notice: 'CBA squads created successfully.'
  end

  def build_squads_stats
    # Get root squads
    Squad.update_all(children: 0, descendents: 0, squad_members: 0, squad_members_managers: 0, squad_health: "green")
    @squads = Squad.where("parent_id IS NULL")

    @squads.each do |squad|
      build_squad_stats(squad)
    end

    redirect_to squads_path, notice: 'CBA squad stats generated successfully.'
  end

  private

  def build_employee_squad(emp)
    employee_id = emp['Person ID'].to_i
    employee = Employee.find(employee_id)

    # org_name = emp['Workday Supervisory Org 2'].strip
    org_name = "Retail Tech Squads"

    squad_parent = nil
    squad_array = []
    squad_array.push( org_name )

    # Create top level org if it doesn't already exist
    squad = Squad.find_or_create_by(name: org_name, full_path: org_name, parent_id: squad_parent, depth: 1)
    squad_parent = squad.id

    # Build sub-squads
    (1..4).each do |i|
      #lvl = emp["PACE Supervisory Org #{i}"].strip
      lvl = emp["Demand team - Domain L#{i}"].strip

      # If we've found nil or empty, either we've found the crew the person belongs to or we've reached the end of the org path
      # or they may be on a squad - check for `Demand team - type` = 'squad';
      if lvl.nil? || lvl.empty? || i == 7

        if ['Squad','COE','Crew','COE Team'].include?(emp['Demand team - type'])
          lvl = emp['Demand team - Crew/COE'].strip
          squad_array.push( lvl )
          squad_path = build_squad_path(squad_array)
          squad = Squad.find_or_create_by(name: lvl, full_path: squad_path, parent_id: squad_parent, depth: i+2)
          squad_parent = squad.id
        end
        if ['Squad','COE Team',].include?(emp['Demand team - type'])
          lvl = emp['Demand team - Squad/COE Team'].strip
          squad_array.push( lvl )
          squad_path = build_squad_path(squad_array)
          squad = Squad.find_or_create_by(name: lvl, full_path: squad_path, parent_id: squad_parent, depth: i+3)
        end

        if squad.id.nil?
          raise "Squad ID is nil: \n" + emp.to_json + "\n" + squad.to_json + "\n" + squad.errors.full_messages.to_json
        else
          SquadsEmployee.create(squad: squad, employee: employee, allocation: 1)
          employee_squads = SquadsEmployee.where(employee_id: employee_id)

          if employee_squads.count > 1
            employee_squads.each do |es|
              es.update(allocation: (1.0 / employee_squads.count).round(3))
            end
          end
        end

        break
      end
      squad_array.push( lvl )
      squad_path = build_squad_path(squad_array)
      squad = Squad.find_or_create_by(name: lvl, full_path: squad_path, parent_id: squad_parent, depth: i+1)
      squad_parent = squad.id
    end
  end

  def build_employee_pace(emp)
    employee_id = emp['Person ID'].to_i
    employee = Employee.find(employee_id)

    org_name = emp['PACE Supervisory Org Business Unit'].strip
    if org_name.nil? or org_name.empty?
      return
    end

    squad_parent = nil
    squad_array = []
    squad_array.push( org_name )

    # Create top level org if it doesn't already exist
    squad = Squad.find_or_create_by(name: org_name, full_path: org_name, parent_id: squad_parent, depth: 1)
    squad_parent = squad.id

    # Build sub-squads
    (2..7).each do |i|
      lvl = emp["PACE Supervisory Org #{i}"].strip

      # If we've found nil or empty, this is the squad the employee belongs to
      if lvl.nil? || lvl.empty? || i == 7
        SquadsEmployee.create(squad: squad, employee: employee, allocation: 1)
        employee_squads = SquadsEmployee.where(employee_id: employee_id)

        if employee_squads.count > 1
          employee_squads.each do |es|
            es.update(allocation: (1.0 / employee_squads.count).round(3))
          end
        end
        break
      end
      squad_array.push( lvl )
      squad_path = build_squad_path(squad_array)
      squad = Squad.find_or_create_by(name: lvl, full_path: squad_path, parent_id: squad_parent, depth: i+1)
      squad_parent = squad.id
    end
  end

  def build_squad_stats(parent_squad)

    # Get the number of squad members
    parent_squad.squad_members = SquadsEmployee.where(squad_id: parent_squad.id).count
    parent_squad.org_members = parent_squad.squad_members

    managers = Array.new
    parent_squad.employees.each do |employee|
      manager_id = employee.manager_id
      if !managers.include?(manager_id)
        managers.push(manager_id)
      end
    end
    parent_squad.squad_members_managers = managers.count

    # Calculate children and descendents
    child_squads = Squad.where(parent_id: parent_squad.id)
    child_squads.each do |child_squad|
      parent_squad.children += 1
      parent_squad.descendents += 1
      build_squad_stats(child_squad)
      parent_squad.descendents += child_squad.descendents
      parent_squad.org_members += child_squad.org_members
    end

    squad_health, squad_health_details = get_squad_health(parent_squad)
    parent_squad.squad_health = squad_health
    parent_squad.squad_health_details = squad_health_details.join(" | ")

    parent_squad.save
  end

  def build_squad_path(squad_path)
    squad_path.reject(&:blank?).join(" > ")
  end

  def get_squad_health(squad)
    squad_health = "green"
    squad_health_details = Array.new

    if squad.squad_members.between?(13,15)
      squad_health = increment_health(squad_health, "amber")
      squad_health_details.push("Large Team Size (amber)")
    elsif squad.squad_members.between?(3,4)
      squad_health = increment_health(squad_health, "amber")
      squad_health_details.push("Small Team Size (amber)")
    elsif squad.squad_members.between?(1,2)
      squad_health = increment_health(squad_health, "red")
      squad_health_details.push("Small Team Size (red)")
    elsif squad.squad_members > 15
      squad_health = increment_health(squad_health, "red")
      squad_health_details.push("Large Team Size (red)")
    end

    if squad.squad_members_managers.between?(3,3)
      squad_health = increment_health(squad_health, "amber")
      squad_health_details.push("Multiple Managers (amber)")
    elsif squad.squad_members_managers > 3
      squad_health = increment_health(squad_health, "red")
      squad_health_details.push("Multiple Managers (red)")
    end

    if squad.children.between?(10,12)
      squad_health = increment_health(squad_health, "amber")
      squad_health_details.push("Many Sub-Teams (amber)")
    elsif squad.children.between?(1,2)
      squad_health = increment_health(squad_health, "amber")
      squad_health_details.push("Few Sub-Teams (amber)")
    elsif squad.children > 12
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