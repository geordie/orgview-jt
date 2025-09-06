class AddDataVersionToTables < ActiveRecord::Migration[7.1]
  def change
    # Add data_version_id to employees table
    add_reference :employees, :data_version, null: true, foreign_key: true, index: true

    # Add data_version_id to roles table
    add_reference :roles, :data_version, null: true, foreign_key: true, index: true

    # Add data_version_id to squads table
    add_reference :squads, :data_version, null: true, foreign_key: true, index: true

    # Add data_version_id to squads_employees table
    add_reference :squads_employees, :data_version, null: true, foreign_key: true, index: true

    # Create composite indexes for efficient version-based queries
    add_index :employees, [:data_version_id, :person_id]
    add_index :employees, [:data_version_id, :manager_id]
    add_index :roles, [:data_version_id, :job_function]
    add_index :squads, [:data_version_id, :parent_id]
    # Note: Skipping full_path index due to MySQL key length limits (full_path is limit: 2048)
    add_index :squads_employees, [:data_version_id, :squad_id]
    add_index :squads_employees, [:data_version_id, :employee_id]
  end
end
