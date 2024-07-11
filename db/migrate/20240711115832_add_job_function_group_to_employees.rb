# The generated migration should look like this:
class AddJobFunctionGroupToEmployees < ActiveRecord::Migration[6.0]
  def change
    add_column :employees, :job_function_group, :string
  end
end