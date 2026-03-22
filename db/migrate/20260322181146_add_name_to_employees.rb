class AddNameToEmployees < ActiveRecord::Migration[7.1]
  def change
    add_column :employees, :name, :string
  end
end
