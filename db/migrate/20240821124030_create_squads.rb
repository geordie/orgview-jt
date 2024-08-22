class CreateSquads < ActiveRecord::Migration[7.1]
  def change
    create_table :squads do |t|
      t.string :name, null: false
      t.integer :parent_id
      t.string :full_path, null: false, limit: 2048
      t.integer :depth, default: 0 # Add the depth field with a default value of 0
      t.timestamps
    end
  end
end