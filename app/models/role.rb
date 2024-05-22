class Role < ApplicationRecord
  validates :job_function, presence: true
  validates :role, presence: true
  validates :seniority, presence: true, numericality: { only_integer: true }
  validates :is_manager, inclusion: { in: [true, false] }
end