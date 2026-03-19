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

ActiveRecord::Schema[7.1].define(version: 2025_09_04_172000) do
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

  create_table "employees", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
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
    t.string "person_id", limit: 32, default: "", null: false
    t.bigint "data_version_id"
    t.index ["data_version_id", "manager_id"], name: "index_employees_on_data_version_id_and_manager_id"
    t.index ["data_version_id", "person_id"], name: "index_employees_on_data_version_id_and_person_id"
    t.index ["data_version_id"], name: "index_employees_on_data_version_id"
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
    t.bigint "data_version_id"
    t.index ["data_version_id", "job_function"], name: "index_roles_on_data_version_id_and_job_function"
    t.index ["data_version_id"], name: "index_roles_on_data_version_id"
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
    t.bigint "data_version_id"
    t.index ["data_version_id", "parent_id"], name: "index_squads_on_data_version_id_and_parent_id"
    t.index ["data_version_id"], name: "index_squads_on_data_version_id"
    t.index ["name", "parent_id", "depth"], name: "index_squads_on_name_and_parent_id_and_depth", unique: true
  end

  create_table "squads_employees", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "squad_id", null: false
    t.bigint "employee_id", null: false
    t.float "allocation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "data_version_id"
    t.index ["data_version_id", "employee_id"], name: "index_squads_employees_on_data_version_id_and_employee_id"
    t.index ["data_version_id", "squad_id"], name: "index_squads_employees_on_data_version_id_and_squad_id"
    t.index ["data_version_id"], name: "index_squads_employees_on_data_version_id"
    t.index ["employee_id"], name: "index_squads_employees_on_employee_id"
    t.index ["squad_id"], name: "index_squads_employees_on_squad_id"
  end

  add_foreign_key "employees", "data_versions"
  add_foreign_key "roles", "data_versions"
  add_foreign_key "squads", "data_versions"
  add_foreign_key "squads_employees", "data_versions"
  add_foreign_key "squads_employees", "employees"
  add_foreign_key "squads_employees", "squads"
end
