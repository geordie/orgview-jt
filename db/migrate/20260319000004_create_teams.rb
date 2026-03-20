class CreateTeams < ActiveRecord::Migration[7.1]
  def change
    create_table :teams do |t|
      t.string  :name,                null: false
      t.integer :parent_id
      t.string  :full_path,           limit: 2048, null: false
      t.integer :depth,               default: 0
      t.integer :children,            null: false, default: 0
      t.integer :descendents,         null: false, default: 0
      t.integer :member_count,        null: false, default: 0
      t.integer :org_member_count,    null: false, default: 0
      t.integer :manager_count,       null: false, default: 0
      t.string  :team_health,         null: false, default: 'green'
      t.string  :team_health_details, null: false, default: '(green)'
      t.bigint  :data_version_id
      t.timestamps
    end

    add_index :teams, :data_version_id
    add_index :teams, [:data_version_id, :parent_id]
    add_index :teams, [:name, :parent_id, :depth], unique: true

    add_foreign_key :teams, :data_versions
  end
end
