class AddNameJobFamilyIsManagerToEmp < ActiveRecord::Migration[7.1]
  def change
    add_column :emp, :name, :string
    add_column :emp, :job_family, :string
    add_column :emp, :is_manager, :boolean
  end
end
