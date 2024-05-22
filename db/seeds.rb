# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


require 'csv'

CSV.foreach(Rails.root.join('data/roles.csv'), headers: true) do |row|
  if !Role.exists?(job_function: row['Job Function'], role: row['Role'])
		Role.create!(
			job_function: row['Job Function'],
			role: row['Role'],
			seniority: row['Seniority'].to_i, # assuming your CSV has a 'Seniority' column
			is_manager: row['IsManager'] == "1" # assuming your CSV has a 'IsManager' column
		)
	end
end