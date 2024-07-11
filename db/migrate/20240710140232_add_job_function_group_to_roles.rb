# The generated migration should look like this:
class AddJobFunctionGroupToRoles < ActiveRecord::Migration[6.0]
  def change
    add_column :roles, :job_function_group, :string
  end
end