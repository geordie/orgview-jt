class CreateEmployees < ActiveRecord::Migration[7.1]
  def change
    create_table :employees do |t|
      t.string  :person_id,      limit: 32, null: false, default: ''
      t.string  :title
      t.string  :job_code
      t.string  :job_level
      t.integer :seniority
      t.string  :manager_id,     limit: 32
      t.boolean :is_manager
      t.string  :country
      t.string  :personnel_area
      t.string  :company
      t.bigint  :data_version_id
      t.timestamps
    end

    add_index :employees, :data_version_id
    add_index :employees, [:data_version_id, :person_id]
    add_index :employees, [:data_version_id, :manager_id]
    add_index :employees, :manager_id, name: 'employees_manager_id_IDX'

    add_foreign_key :employees, :data_versions
  end
end
