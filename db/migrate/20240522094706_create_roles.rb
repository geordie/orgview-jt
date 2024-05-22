class CreateRoles < ActiveRecord::Migration[7.1]
  def change
    create_table :roles do |t|
      t.string :job_function, null: false
      t.string :role, null: false
      t.integer :seniority, null: false
      t.boolean :is_manager, default: false, null: false
      t.timestamps
    end
  end
end
