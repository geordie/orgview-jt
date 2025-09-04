class Employee < ApplicationRecord
  validates :name, presence: true
  validates :title, presence: true
  validates :job_function, presence: true
  validates :seniority, presence: true, numericality: { only_integer: true }
  validates :start_date, presence: true

  belongs_to :manager, class_name: 'Employee', optional: true
  has_many :direct_reports, class_name: 'Employee', foreign_key: 'manager_id'
  belongs_to :data_version, optional: true
  
  # Associations
  has_many :squads_employees
  has_many :squads, through: :squads_employees

  # Scopes for version management
  scope :for_version, ->(version) { where(data_version: version) }
  scope :current, -> { joins(:data_version).where(data_versions: { is_active: true }) }

  # Other model logic and methods can be added here
  def get_direct_reports
    self.direct_reports
  end
end