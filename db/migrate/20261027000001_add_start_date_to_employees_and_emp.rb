class AddStartDateToEmployeesAndEmp < ActiveRecord::Migration[7.1]
  def change
    add_column :employees, :start_date, :date
    add_column :emp, :start_date, :date
  end
end
