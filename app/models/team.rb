class Team < ApplicationRecord
  belongs_to :parent,    class_name: 'Team', optional: true
  has_many   :sub_teams, class_name: 'Team', foreign_key: 'parent_id'
  has_many   :teams_employees
  has_many   :employees, through: :teams_employees
  belongs_to :data_version, optional: true

  validates :name,      presence: true
  validates :full_path, presence: true

  scope :for_version, ->(version) { where(data_version_id: version.id) }
end
