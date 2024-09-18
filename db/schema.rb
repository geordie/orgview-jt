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

  create_table "emp_2024_09_09_no_tenure", id: false, charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
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
  end

  create_table "emp_old", id: false, charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.text "Person ID"
    t.text "First Name"
    t.text "Surname"
    t.text "Worker Type"
    t.text "Worker Sub-Type"
    t.text "Country"
    t.integer "FTE"
    t.text "PACE Role"
    t.text "Workday Job Family Group"
    t.text "Workday Job Family"
    t.text "Workday Job Profile"
    t.text "Manager"
    t.text "Workday Job Profile ID"
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
    t.text "Demand team - Business Unit"
    t.text "Demand team - Domain L1"
    t.text "Demand team - Domain L2"
    t.text "Demand team - Domain L3"
    t.text "Demand team - Crew/COE"
    t.text "[Demand team = Crew/COE] v2"
    t.text "Demand team - Squad/COE Team"
    t.integer "Cost Center ID"
    t.text "Cost Center Business Unit"
    t.integer "Allocated FTE"
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
    t.text "Role Group2"
    t.text "Retail Tech CC"
    t.text "Role Group"
    t.text "Vacancy Status"
    t.text "Role Vacancy"
    t.text "Exemption"
    t.text "Management Level"
    t.text "Tenure"
  end

  create_table "employees", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "title"
    t.string "job_function"
    t.integer "seniority"
    t.integer "manager_id"
    t.boolean "is_manager"
    t.date "start_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "job_function_group"
    t.string "worker_type"
    t.string "country"
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
    t.string "name", null: false
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
