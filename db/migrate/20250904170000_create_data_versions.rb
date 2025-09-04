class CreateDataVersions < ActiveRecord::Migration[7.1]
  def change
    create_table :data_versions do |t|
      t.string :name, null: false, limit: 255
      t.text :description
      t.datetime :snapshot_date, null: false
      t.boolean :is_active, default: false, null: false
      t.string :status, default: 'draft', null: false # draft, active, archived
      t.json :metadata # Store additional version info like source, import stats, etc.
      t.timestamps
    end

    add_index :data_versions, :name, unique: true
    add_index :data_versions, :is_active
    add_index :data_versions, :status
    add_index :data_versions, :snapshot_date
  end
end
