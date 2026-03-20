class TeamsEmployee < ApplicationRecord
  belongs_to :team
  belongs_to :employee
  belongs_to :data_version, optional: true
end
