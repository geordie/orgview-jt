class RenameEmpOldColumns < ActiveRecord::Migration[7.1]
  def up
    # Rename columns in emp_old table to match emp table column names
    rename_column :emp_old, "Person ID", :person_id
    rename_column :emp_old, "First Name", :first_name
    rename_column :emp_old, "Surname", :surname
    rename_column :emp_old, "Worker Type", :worker_type
    rename_column :emp_old, "Worker Sub-Type", :worker_sub_type
    rename_column :emp_old, "Country", :country
    rename_column :emp_old, "FTE", :fte
    rename_column :emp_old, "Management Level", :management_level
    rename_column :emp_old, "PACE Role", :pace_role
    rename_column :emp_old, "Workday Position ID", :workday_position_id
    rename_column :emp_old, "Position Title", :position_title
    rename_column :emp_old, "Workday Job Family Group", :workday_job_family_group
    rename_column :emp_old, "Workday Job Family", :workday_job_family
    rename_column :emp_old, "Workday Job Profile", :workday_job_profile
    rename_column :emp_old, "Workday Job Profile ID", :workday_job_profile_id
    rename_column :emp_old, "Is Manager", :is_manager
    rename_column :emp_old, "Company", :company
    rename_column :emp_old, "Manager ID", :manager_id
    rename_column :emp_old, "Manager Name", :manager_name
    rename_column :emp_old, "Manager Position ID", :manager_position_id
    rename_column :emp_old, "Supply Team - name", :supply_team_name
    rename_column :emp_old, "Supply Team - type", :supply_team_type
    rename_column :emp_old, "Supply Team - Layer in the org", :supply_team_layer_in_the_org
    rename_column :emp_old, "Chapter Area", :chapter_area
    rename_column :emp_old, "Chapter", :chapter
    rename_column :emp_old, "PACE Supervisory Org Business Unit", :pace_supervisory_org_business_unit
    rename_column :emp_old, "PACE Supervisory Org 2", :pace_supervisory_org_2
    rename_column :emp_old, "PACE Supervisory Org 3", :pace_supervisory_org_3
    rename_column :emp_old, "PACE Supervisory Org 4", :pace_supervisory_org_4
    rename_column :emp_old, "PACE Supervisory Org 5", :pace_supervisory_org_5
    rename_column :emp_old, "PACE Supervisory Org 6", :pace_supervisory_org_6
    rename_column :emp_old, "PACE Supervisory Org 7", :pace_supervisory_org_7
    rename_column :emp_old, "Demand team - type", :demand_team_type
    rename_column :emp_old, "Demand team - name", :demand_team_name
    rename_column :emp_old, "Demand team - pattern", :demand_team_pattern
    rename_column :emp_old, "Demand team - layer in the org", :demand_team_layer_in_the_org
    rename_column :emp_old, "Demand team - Business Unit", :demand_team_business_unit
    rename_column :emp_old, "Demand team - Domain L1", :demand_team_domain_l1
    rename_column :emp_old, "Demand team - Domain L2", :demand_team_domain_l2
    rename_column :emp_old, "Demand team - Domain L3", :demand_team_domain_l3
    rename_column :emp_old, "Demand team - Crew/COE", :demand_team_crew_coe
    rename_column :emp_old, "Demand team - Squad/COE Team", :demand_team_squad_coe_team
    rename_column :emp_old, "Allocated FTE", :allocated_fte
    rename_column :emp_old, "Cost Center ID", :cost_center_id
    rename_column :emp_old, "Cost Center Business Unit", :cost_center_business_unit
    rename_column :emp_old, "Extended Leave", :extended_leave
    rename_column :emp_old, "Workday Supervisory Org Business Unit", :workday_supervisory_org_business_unit
    rename_column :emp_old, "Workday Supervisory Org 2", :workday_supervisory_org_2
    rename_column :emp_old, "Workday Supervisory Org 3", :workday_supervisory_org_3
    rename_column :emp_old, "Workday Supervisory Org 4", :workday_supervisory_org_4
    rename_column :emp_old, "Workday Supervisory Org 5", :workday_supervisory_org_5
    rename_column :emp_old, "Workday Supervisory Org 6", :workday_supervisory_org_6
    rename_column :emp_old, "Workday Supervisory Org 7", :workday_supervisory_org_7
    rename_column :emp_old, "Workday Supervisory Org 8", :workday_supervisory_org_8
    rename_column :emp_old, "Is allocated to a Supply Structure?", :is_allocated_to_a_supply_structure
    rename_column :emp_old, "Is allocated to a Demand structure?", :is_allocated_to_a_demand_structure
    rename_column :emp_old, "ETP Role Type", :etp_role_type
    rename_column :emp_old, "ETP Initiative", :etp_initiative

    # Note: emp_old has "Tenure" while emp has additional columns not in emp_old
    # The following columns exist in emp but not in emp_old:
    # - date_person_was_added_to_teamform
    # - demand_allocation_start_date
    # - demand_allocation_last_updated
    # - demand_team_id
    # - supply_team_id
    # - seniority (emp_old has "Tenure" which might map to this)

    # You may want to add these columns to emp_old or handle the mapping separately
    # For now, we'll rename "Tenure" to match the pattern, though it might need special handling
    rename_column :emp_old, "Tenure", :tenure

    # Add seniority column to match emp table structure
    add_column :emp_old, :seniority, :integer, default: 0, null: false
  end

  def down
    # Reverse the column renames
    rename_column :emp_old, :person_id, "Person ID"
    rename_column :emp_old, :first_name, "First Name"
    rename_column :emp_old, :surname, "Surname"
    rename_column :emp_old, :worker_type, "Worker Type"
    rename_column :emp_old, :worker_sub_type, "Worker Sub-Type"
    rename_column :emp_old, :country, "Country"
    rename_column :emp_old, :fte, "FTE"
    rename_column :emp_old, :management_level, "Management Level"
    rename_column :emp_old, :pace_role, "PACE Role"
    rename_column :emp_old, :workday_position_id, "Workday Position ID"
    rename_column :emp_old, :position_title, "Position Title"
    rename_column :emp_old, :workday_job_family_group, "Workday Job Family Group"
    rename_column :emp_old, :workday_job_family, "Workday Job Family"
    rename_column :emp_old, :workday_job_profile, "Workday Job Profile"
    rename_column :emp_old, :workday_job_profile_id, "Workday Job Profile ID"
    rename_column :emp_old, :is_manager, "Is Manager"
    rename_column :emp_old, :company, "Company"
    rename_column :emp_old, :manager_id, "Manager ID"
    rename_column :emp_old, :manager_name, "Manager Name"
    rename_column :emp_old, :manager_position_id, "Manager Position ID"
    rename_column :emp_old, :supply_team_name, "Supply Team - name"
    rename_column :emp_old, :supply_team_type, "Supply Team - type"
    rename_column :emp_old, :supply_team_layer_in_the_org, "Supply Team - Layer in the org"
    rename_column :emp_old, :chapter_area, "Chapter Area"
    rename_column :emp_old, :chapter, "Chapter"
    rename_column :emp_old, :pace_supervisory_org_business_unit, "PACE Supervisory Org Business Unit"
    rename_column :emp_old, :pace_supervisory_org_2, "PACE Supervisory Org 2"
    rename_column :emp_old, :pace_supervisory_org_3, "PACE Supervisory Org 3"
    rename_column :emp_old, :pace_supervisory_org_4, "PACE Supervisory Org 4"
    rename_column :emp_old, :pace_supervisory_org_5, "PACE Supervisory Org 5"
    rename_column :emp_old, :pace_supervisory_org_6, "PACE Supervisory Org 6"
    rename_column :emp_old, :pace_supervisory_org_7, "PACE Supervisory Org 7"
    rename_column :emp_old, :demand_team_type, "Demand team - type"
    rename_column :emp_old, :demand_team_name, "Demand team - name"
    rename_column :emp_old, :demand_team_pattern, "Demand team - pattern"
    rename_column :emp_old, :demand_team_layer_in_the_org, "Demand team - layer in the org"
    rename_column :emp_old, :demand_team_business_unit, "Demand team - Business Unit"
    rename_column :emp_old, :demand_team_domain_l1, "Demand team - Domain L1"
    rename_column :emp_old, :demand_team_domain_l2, "Demand team - Domain L2"
    rename_column :emp_old, :demand_team_domain_l3, "Demand team - Domain L3"
    rename_column :emp_old, :demand_team_crew_coe, "Demand team - Crew/COE"
    rename_column :emp_old, :demand_team_squad_coe_team, "Demand team - Squad/COE Team"
    rename_column :emp_old, :allocated_fte, "Allocated FTE"
    rename_column :emp_old, :cost_center_id, "Cost Center ID"
    rename_column :emp_old, :cost_center_business_unit, "Cost Center Business Unit"
    rename_column :emp_old, :extended_leave, "Extended Leave"
    rename_column :emp_old, :workday_supervisory_org_business_unit, "Workday Supervisory Org Business Unit"
    rename_column :emp_old, :workday_supervisory_org_2, "Workday Supervisory Org 2"
    rename_column :emp_old, :workday_supervisory_org_3, "Workday Supervisory Org 3"
    rename_column :emp_old, :workday_supervisory_org_4, "Workday Supervisory Org 4"
    rename_column :emp_old, :workday_supervisory_org_5, "Workday Supervisory Org 5"
    rename_column :emp_old, :workday_supervisory_org_6, "Workday Supervisory Org 6"
    rename_column :emp_old, :workday_supervisory_org_7, "Workday Supervisory Org 7"
    rename_column :emp_old, :workday_supervisory_org_8, "Workday Supervisory Org 8"
    rename_column :emp_old, :is_allocated_to_a_supply_structure, "Is allocated to a Supply Structure?"
    rename_column :emp_old, :is_allocated_to_a_demand_structure, "Is allocated to a Demand structure?"
    rename_column :emp_old, :etp_role_type, "ETP Role Type"
    rename_column :emp_old, :etp_initiative, "ETP Initiative"
    rename_column :emp_old, :tenure, "Tenure"

    # Remove seniority column added in up method
    remove_column :emp_old, :seniority, :integer
  end
end
