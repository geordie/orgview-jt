class SquadsEmployee < ApplicationRecord
  belongs_to :squad
  belongs_to :employee

  # Validations
  validates :allocation, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 1 }
end
