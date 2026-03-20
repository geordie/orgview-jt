class CreateEmp < ActiveRecord::Migration[7.1]
  def change
    create_table :emp do |t|
      t.string :person_id,      null: false
      t.string :business_title
      t.string :job_code
      t.string :job_level
      t.string :country
      t.string :personnel_area
      t.string :company
      t.string :org_unit
      t.string :leader_id
      t.timestamps
    end

    add_index :emp, :person_id
  end
end
