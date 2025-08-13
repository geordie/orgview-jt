# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_09_18_123000) do
  create_table "emp", id: false, charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "person_id", limit: 32
    t.string "first_name", limit: 128
    t.string "surname", limit: 128
    t.string "worker_type", limit: 50
    t.string "worker_sub_type", limit: 50
    t.string "city", limit: 50
    t.string "state", limit: 50
    t.string "country", limit: 50
    t.integer "fte"
    t.string "management_level", limit: 50
    t.string "pace_role", limit: 512
    t.integer "workday_position_id"
    t.string "position_title", limit: 256
    t.string "workday_job_family_group", limit: 50
    t.string "workday_job_family", limit: 50
    t.string "workday_job_profile", limit: 128
    t.string "workday_job_profile_id", limit: 50
    t.string "is_manager", limit: 50
    t.string "company", limit: 128
    t.integer "manager_id"
    t.string "manager_name", limit: 128
    t.integer "manager_position_id"
    t.string "supply_team_name", limit: 128, collation: "utf8mb4_0900_as_cs"
    t.string "supply_team_type", limit: 50
    t.integer "supply_team_layer_in_the_org"
    t.string "chapter_area", limit: 256
    t.string "chapter", limit: 256
    t.string "pace_supervisory_org_business_unit", limit: 128
    t.string "pace_supervisory_org_2", limit: 128
    t.string "pace_supervisory_org_3", limit: 128
    t.string "pace_supervisory_org_4", limit: 128
    t.string "pace_supervisory_org_5", limit: 128
    t.string "pace_supervisory_org_6", limit: 128
    t.string "pace_supervisory_org_7", limit: 128
    t.string "demand_team_type", limit: 50
    t.string "demand_team_name", limit: 128, collation: "utf8mb4_0900_as_cs"
    t.string "demand_team_pattern", limit: 50
    t.integer "demand_team_layer_in_the_org"
    t.string "demand_team_business_unit", limit: 128
    t.string "demand_team_domain_l1", limit: 128
    t.string "demand_team_domain_l2", limit: 128
    t.string "demand_team_domain_l3", limit: 128
    t.string "demand_team_crew_coe", limit: 128
    t.string "demand_team_squad_coe_team", limit: 128
    t.float "allocated_fte", limit: 53
    t.integer "cost_center_id"
    t.string "cost_center_business_unit", limit: 128
    t.string "extended_leave", limit: 50
    t.string "workday_supervisory_org_business_unit", limit: 128
    t.string "workday_supervisory_org_2", limit: 128
    t.string "workday_supervisory_org_3", limit: 128
    t.string "workday_supervisory_org_4", limit: 128
    t.string "workday_supervisory_org_5", limit: 128
    t.string "workday_supervisory_org_6", limit: 128
    t.string "workday_supervisory_org_7", limit: 128
    t.string "workday_supervisory_org_8", limit: 128
    t.string "is_allocated_to_a_supply_structure", limit: 50
    t.string "is_allocated_to_a_demand_structure", limit: 128
    t.string "etp_role_type", limit: 50
    t.string "etp_initiative", limit: 50
    t.string "date_person_was_added_to_teamform", limit: 50
    t.string "demand_allocation_start_date", limit: 50
    t.string "demand_allocation_last_updated", limit: 50
    t.string "demand_team_id", limit: 50
    t.string "supply_team_id", limit: 50
    t.integer "seniority", default: 0, null: false
  end

  create_table "emp_old", id: false, charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.text "Person ID"
    t.text "First Name"
    t.text "Surname"
    t.text "Worker Type"
    t.text "Worker Sub-Type"
    t.text "Country"
    t.integer "FTE"
    t.text "Management Level"
    t.text "PACE Role"
    t.integer "Workday Position ID"
    t.text "Position Title"
    t.text "Workday Job Family Group"
    t.text "Workday Job Family"
    t.text "Workday Job Profile"
    t.text "Workday Job Profile ID"
    t.text "Is Manager"
    t.text "Company"
    t.text "Manager ID"
    t.text "Manager Name"
    t.integer "Manager Position ID"
    t.text "Supply Team - name"
    t.text "Supply Team - type"
    t.integer "Supply Team - Layer in the org"
    t.text "Chapter Area"
    t.text "Chapter"
    t.text "PACE Supervisory Org Business Unit"
    t.text "PACE Supervisory Org 2"
    t.text "PACE Supervisory Org 3"
    t.text "PACE Supervisory Org 4"
    t.text "PACE Supervisory Org 5"
    t.text "PACE Supervisory Org 6"
    t.text "PACE Supervisory Org 7"
    t.text "Demand team - type"
    t.text "Demand team - name"
    t.text "Demand team - pattern"
    t.text "Demand team - layer in the org"
    t.text "Demand team - Business Unit"
    t.text "Demand team - Domain L1"
    t.text "Demand team - Domain L2"
    t.text "Demand team - Domain L3"
    t.text "Demand team - Crew/COE"
    t.text "Demand team - Squad/COE Team"
    t.text "Allocated FTE"
    t.text "Cost Center ID"
    t.text "Cost Center Business Unit"
    t.text "Extended Leave"
    t.text "Workday Supervisory Org Business Unit"
    t.text "Workday Supervisory Org 2"
    t.text "Workday Supervisory Org 3"
    t.text "Workday Supervisory Org 4"
    t.text "Workday Supervisory Org 5"
    t.text "Workday Supervisory Org 6"
    t.text "Workday Supervisory Org 7"
    t.text "Workday Supervisory Org 8"
    t.text "Is allocated to a Supply Structure?"
    t.text "Is allocated to a Demand structure?"
    t.text "ETP Role Type"
    t.text "ETP Initiative"
    t.text "Tenure"
  end

  create_table "employees", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "person_id", limit: 32, null: false
    t.string "name", null: false
    t.string "title"
    t.string "job_function"
    t.integer "seniority"
    t.string "manager_id", limit: 32
    t.boolean "is_manager"
    t.date "start_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "job_function_group"
    t.string "worker_type"
    t.string "country"
    t.index ["manager_id"], name: "employees_manager_id_IDX"
    t.index ["person_id"], name: "employees_person_id_IDX", type: :fulltext
  end

  create_table "roles", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "job_function", null: false
    t.string "role", null: false
    t.integer "seniority", null: false
    t.boolean "is_manager", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "job_function_group"
  end

  create_table "squads", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false, collation: "utf8mb4_0900_as_cs"
    t.integer "parent_id"
    t.string "full_path", limit: 2048, null: false
    t.integer "depth", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "children", default: 0, null: false
    t.integer "descendents", default: 0, null: false
    t.integer "squad_members", default: 0, null: false
    t.integer "org_members", default: 0, null: false
    t.integer "squad_members_managers", default: 0, null: false
    t.string "squad_health", default: "green", null: false
    t.string "squad_health_details", default: "(green)", null: false
    t.string "team_id", limit: 32
    t.index ["name", "parent_id", "depth"], name: "index_squads_on_name_and_parent_id_and_depth", unique: true
  end

  create_table "squads_employees", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "squad_id", null: false
    t.bigint "employee_id", null: false
    t.float "allocation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_squads_employees_on_employee_id"
    t.index ["squad_id"], name: "index_squads_employees_on_squad_id"
  end

  add_foreign_key "squads_employees", "employees"
  add_foreign_key "squads_employees", "squads"
end
