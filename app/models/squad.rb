class Squad < ApplicationRecord
  # Associations
  belongs_to :parent, class_name: 'Squad', optional: true
  has_many :sub_teams, class_name: 'Squad', foreign_key: 'parent_id'
  has_many :squads_employees
  has_many :employees, through: :squads_employees

  # Validations
  validates :name, presence: true
  validates :full_path, presence: true
end