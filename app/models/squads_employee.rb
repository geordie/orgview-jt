class SquadsEmployee < ApplicationRecord
  belongs_to :squad
  belongs_to :employee
  belongs_to :data_version, optional: true

  # Validations
  validates :allocation, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 1 }
end
