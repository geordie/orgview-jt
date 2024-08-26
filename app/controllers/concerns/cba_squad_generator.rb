module CbaSquadGenerator
  extend ActiveSupport::Concern

  def build_cba_squads_list
    ActiveRecord::Base.transaction do
      SquadsEmployee.destroy_all
      Squad.destroy_all
      Emp.where(['`Vacancy Status` != ?', "Vacant" ]).each do |emp|

        employee_id = emp['Person ID'].to_i
        employee = Employee.find(employee_id)

        org_name = emp['PACE Supervisory Org Business Unit'].strip
        if org_name.nil? or org_name.empty?
          break
        end

        squad_parent = nil
        squad_array = []
        squad_array.push( org_name )

        # Create top level org if it doesn't already exist
        squad = Squad.find_or_create_by(name: org_name, full_path: org_name, parent_id: squad_parent, depth: 1)
        squad_parent = squad.id

        # Build sub-squads
        (2..7).each do |i|
          lvl = emp["PACE Supervisory Org #{i}"]

          # If we've found nil, this is squad the employee belongs to
          if lvl.nil? || lvl.empty?
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

          squad = Squad.find_or_create_by(name: lvl, full_path: squad_path, parent_id: squad_parent, depth: i)
          squad_parent = squad.id
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

  def build_squad_stats(parent_squad)
    # Get the number of squad members
    parent_squad.squad_members = SquadsEmployee.where(squad_id: parent_squad.id).count

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
    end

    squad_health = get_squad_health(parent_squad)
    parent_squad.squad_health = squad_health

    parent_squad.save
  end

  def build_squad_path(squad_path)
    squad_path.reject(&:blank?).join(" > ")
  end

  def get_squad_health(squad)
    squad_health = "green"

    if squad.children.between?(9,10) or squad.children.between?(1,2)
      squad_health = increment_health(squad_health, "amber")
    elsif squad.children > 10
      squad_health = increment_health(squad_health, "red")
    end

    if squad.squad_members.between?(11,15) or squad.squad_members.between?(3,4)
      squad_health = increment_health(squad_health, "amber")
    elsif squad.squad_members.between?(1,2) or squad.squad_members > 15
      squad_health = increment_health(squad_health, "red")
    end

    if squad.squad_members_managers.between?(2,3)
      squad_health = increment_health(squad_health, "amber")
    elsif squad.squad_members_managers > 3
      squad_health = increment_health(squad_health, "red")
    end

    p "*"*50 + squad.children.to_s + "," + squad.squad_members.to_s + "," + squad.squad_members_managers.to_s + "," + squad_health
    squad_health
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