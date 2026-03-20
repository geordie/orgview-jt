class AddPrettyNameToTeams < ActiveRecord::Migration[7.1]
  def change
    add_column :teams, :pretty_name, :string
  end
end
