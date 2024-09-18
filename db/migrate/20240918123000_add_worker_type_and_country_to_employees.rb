class AddWorkerTypeAndCountryToEmployees < ActiveRecord::Migration[6.0]
  def change
    add_column :employees, :worker_type, :string
    add_column :employees, :country, :string
  end
end