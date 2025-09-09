class Emp < ApplicationRecord
	self.table_name = "emp"

	# Scope to filter employees for import - can be customized as needed
	scope :import_filter, -> { all }

	# Example filter
	#scope :import_filter, -> { where("person_id NOT LIKE 'REQ%'") }
end
