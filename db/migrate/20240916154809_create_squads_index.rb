class CreateSquadsIndex < ActiveRecord::Migration[7.1]
  def change
    # add_index :squads_employees, [:squad_id, :employee_id], unique: true
    add_index :squads, [:name, :parent_id, :depth], unique: true
  end
end
