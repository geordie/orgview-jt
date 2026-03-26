class AddJobFamilyToEmployees < ActiveRecord::Migration[7.1]
  def change
    add_column :employees, :job_family, :string
  end
end
