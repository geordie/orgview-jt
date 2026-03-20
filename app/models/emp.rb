class Emp < ApplicationRecord
  self.table_name = 'emp'

  # Scope to filter records for import — customise as needed
  scope :import_filter, -> { all }
end
