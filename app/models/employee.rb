class Employee < ApplicationRecord
  validates :title,         presence: true
  validates :job_code,      presence: true
  validates :seniority,     presence: true, numericality: { only_integer: true }
  validates :employee_type, inclusion: { in: %w[FTE FTC] }, allow_nil: true

  belongs_to :manager,        class_name: 'Employee', primary_key: 'person_id', foreign_key: 'manager_id', optional: true
  has_many   :direct_reports, class_name: 'Employee', primary_key: 'person_id', foreign_key: 'manager_id'
  belongs_to :data_version, optional: true

  has_many :teams_employees
  has_many :teams, through: :teams_employees

  # Falls back to person_id for employees imported without a name
  def display_name
    name.presence || person_id
  end

  scope :for_version, ->(version) { where(data_version_id: version.id) }
  scope :current,     -> { joins(:data_version).where(data_versions: { is_active: true }) }
end
