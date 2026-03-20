class CreateDataVersions < ActiveRecord::Migration[7.1]
  def change
    create_table :data_versions do |t|
      t.string   :name,          null: false
      t.text     :description
      t.datetime :snapshot_date, null: false
      t.boolean  :is_active,     null: false, default: false
      t.string   :status,        null: false, default: 'draft'
      t.json     :metadata
      t.timestamps
    end

    add_index :data_versions, :name,          unique: true
    add_index :data_versions, :snapshot_date
    add_index :data_versions, :is_active
    add_index :data_versions, :status
  end
end
