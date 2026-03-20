class CreateTeamsEmployees < ActiveRecord::Migration[7.1]
  def change
    create_table :teams_employees do |t|
      t.bigint :team_id,         null: false
      t.bigint :employee_id,     null: false
      t.float  :allocation
      t.bigint :data_version_id
      t.timestamps
    end

    add_index :teams_employees, :team_id
    add_index :teams_employees, :employee_id
    add_index :teams_employees, :data_version_id
    add_index :teams_employees, [:data_version_id, :team_id]
    add_index :teams_employees, [:data_version_id, :employee_id]

    add_foreign_key :teams_employees, :teams
    add_foreign_key :teams_employees, :employees
    add_foreign_key :teams_employees, :data_versions
  end
end
