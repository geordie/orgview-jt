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

ActiveRecord::Schema[7.1].define(version: 2026_10_27_000001) do
  create_table "data_versions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "snapshot_date", null: false
    t.boolean "is_active", default: false, null: false
    t.string "status", default: "draft", null: false
    t.json "metadata"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["is_active"], name: "index_data_versions_on_is_active"
    t.index ["name"], name: "index_data_versions_on_name", unique: true
    t.index ["snapshot_date"], name: "index_data_versions_on_snapshot_date"
    t.index ["status"], name: "index_data_versions_on_status"
  end

  create_table "emp", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "person_id", null: false
    t.string "business_title"
    t.string "job_code"
    t.string "job_level"
    t.string "country"
    t.string "personnel_area"
    t.string "company"
    t.string "org_unit"
    t.string "leader_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "job_family"
    t.boolean "is_manager"
    t.date "start_date"
    t.index ["person_id"], name: "index_emp_on_person_id"
  end

  create_table "employees", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "person_id", limit: 32, default: "", null: false
    t.string "title"
    t.string "job_code"
    t.string "job_level"
    t.integer "seniority"
    t.string "manager_id", limit: 32
    t.boolean "is_manager"
    t.string "country"
    t.string "personnel_area"
    t.string "company"
    t.bigint "data_version_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "job_family"
    t.string "employee_type"
    t.date "start_date"
    t.index ["data_version_id", "manager_id"], name: "index_employees_on_data_version_id_and_manager_id"
    t.index ["data_version_id", "person_id"], name: "index_employees_on_data_version_id_and_person_id"
    t.index ["data_version_id"], name: "index_employees_on_data_version_id"
    t.index ["manager_id"], name: "employees_manager_id_IDX"
    t.check_constraint "`employee_type` in (_utf8mb4'FTE',_utf8mb4'FTC')", name: "chk_employees_employee_type"
  end

  create_table "teams", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.integer "parent_id"
    t.string "full_path", limit: 2048, null: false
    t.integer "depth", default: 0
    t.integer "children", default: 0, null: false
    t.integer "descendents", default: 0, null: false
    t.integer "member_count", default: 0, null: false
    t.integer "org_member_count", default: 0, null: false
    t.integer "manager_count", default: 0, null: false
    t.string "team_health", default: "green", null: false
    t.string "team_health_details", default: "(green)", null: false
    t.bigint "data_version_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "pretty_name"
    t.index ["data_version_id", "parent_id"], name: "index_teams_on_data_version_id_and_parent_id"
    t.index ["data_version_id"], name: "index_teams_on_data_version_id"
    t.index ["name", "parent_id", "depth"], name: "index_teams_on_name_and_parent_id_and_depth", unique: true
  end

  create_table "teams_employees", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "team_id", null: false
    t.bigint "employee_id", null: false
    t.float "allocation"
    t.bigint "data_version_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["data_version_id", "employee_id"], name: "index_teams_employees_on_data_version_id_and_employee_id"
    t.index ["data_version_id", "team_id"], name: "index_teams_employees_on_data_version_id_and_team_id"
    t.index ["data_version_id"], name: "index_teams_employees_on_data_version_id"
    t.index ["employee_id"], name: "index_teams_employees_on_employee_id"
    t.index ["team_id"], name: "index_teams_employees_on_team_id"
  end

  add_foreign_key "employees", "data_versions"
  add_foreign_key "teams", "data_versions"
  add_foreign_key "teams_employees", "data_versions"
  add_foreign_key "teams_employees", "employees"
  add_foreign_key "teams_employees", "teams"
end
