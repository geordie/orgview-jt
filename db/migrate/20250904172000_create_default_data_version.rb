class CreateDefaultDataVersion < ActiveRecord::Migration[7.1]
  def up
    # Create a default "current" version for existing data
    default_version = DataVersion.create!(
      name: 'current',
      description: 'Current active dataset (migrated from unversioned data)',
      snapshot_date: Time.current,
      is_active: true,
      status: 'active'
    )

    # Update all existing records to use the default version
    Employee.update_all(data_version_id: default_version.id)
    Role.update_all(data_version_id: default_version.id)
    Squad.update_all(data_version_id: default_version.id)
    SquadsEmployee.update_all(data_version_id: default_version.id)
  end

  def down
    # Remove version references from all records
    Employee.update_all(data_version_id: nil)
    Role.update_all(data_version_id: nil)
    Squad.update_all(data_version_id: nil)
    SquadsEmployee.update_all(data_version_id: nil)

    # Delete the default version
    DataVersion.where(name: 'current').destroy_all
  end
end
