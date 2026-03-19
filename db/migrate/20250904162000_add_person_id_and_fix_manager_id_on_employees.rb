class AddPersonIdAndFixManagerIdOnEmployees < ActiveRecord::Migration[7.1]
  def up
    unless column_exists?(:employees, :person_id)
      add_column :employees, :person_id, :string, limit: 32, null: false, default: ""
      add_index :employees, :person_id, type: :fulltext, name: "employees_person_id_IDX"
    end

    manager_col = connection.columns(:employees).find { |c| c.name == "manager_id" }
    if manager_col && manager_col.type == :integer
      change_column :employees, :manager_id, :string, limit: 32
      add_index :employees, :manager_id, name: "employees_manager_id_IDX"
    end
  end

  def down
    remove_index :employees, name: "employees_person_id_IDX" if index_exists?(:employees, :person_id, name: "employees_person_id_IDX")
    remove_column :employees, :person_id if column_exists?(:employees, :person_id)

    remove_index :employees, name: "employees_manager_id_IDX" if index_exists?(:employees, :manager_id, name: "employees_manager_id_IDX")
    change_column :employees, :manager_id, :integer if column_exists?(:employees, :manager_id)
  end
end
