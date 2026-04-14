class AddEmployeeTypeToEmployees < ActiveRecord::Migration[7.1]
  def change
    add_column :employees, :employee_type, :string
    add_check_constraint :employees, "employee_type IN ('FTE', 'FTC')", name: "chk_employees_employee_type"
  end
end
