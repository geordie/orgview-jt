class CreateDefaultDataVersion < ActiveRecord::Migration[7.1]
  def up
    DataVersion.create!(
      name:          'initial',
      description:   'Initial data version',
      snapshot_date: Time.current,
      is_active:     true,
      status:        'active'
    )
  end

  def down
    DataVersion.find_by(name: 'initial')&.destroy
  end
end
