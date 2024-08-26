# The generated migration should look like this:
class AddChildrenAndDescendentsToSquads < ActiveRecord::Migration[7.1]
  def change
	add_column :squads, :children, :integer, default: 0, null: false
	add_column :squads, :descendents, :integer, default: 0, null: false
	add_column :squads, :squad_members, :integer, default: 0, null: false
	add_column :squads, :squad_members_managers, :integer, default: 0, null: false
	add_column :squads, :squad_health, :string, default: "green", null: false
  end
end