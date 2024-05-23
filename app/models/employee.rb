class Employee < ApplicationRecord
  validates :name, presence: true
  validates :title, presence: true
  validates :job_function, presence: true
  validates :seniority, presence: true, numericality: { only_integer: true }
  validates :start_date, presence: true


  belongs_to :manager, class_name: 'Employee', optional: true
  has_many :direct_reports, class_name: 'Employee', foreign_key: 'manager_id'

  # Other model logic and methods can be added here
  def get_direct_reports
    self.direct_reports
  end
end