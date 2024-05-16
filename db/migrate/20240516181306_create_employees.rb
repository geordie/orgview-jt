class CreateEmployees < ActiveRecord::Migration[7.1]
  def change
    create_table :employees do |t|
      t.string :name, null: false
      t.string :title
      t.string :job_function
      t.integer :seniority
      t.integer :manager_id
      t.date :start_date
      t.timestamps
    end
  end
end
