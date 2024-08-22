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

  private

  def build_squad_path(squad_path)
    squad_path.reject(&:blank?).join(" > ")
  end

end