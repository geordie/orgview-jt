class CreateSquadsEmployees < ActiveRecord::Migration[7.1]
  def change
    create_table :squads_employees do |t|
      t.references :squad, null: false, foreign_key: true
      t.references :employee, null: false, foreign_key: true
      t.float :allocation

      t.timestamps
    end
  end
end
