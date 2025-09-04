class DataVersion < ApplicationRecord
  has_many :employees, dependent: :destroy
  has_many :roles, dependent: :destroy
  has_many :squads, dependent: :destroy
  has_many :squads_employees, dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :snapshot_date, presence: true
  validates :status, inclusion: { in: %w[draft active archived] }

  scope :active, -> { where(is_active: true) }
  scope :by_status, ->(status) { where(status: status) }
  scope :recent, -> { order(snapshot_date: :desc) }

  before_save :ensure_single_active_version

  def activate!
    transaction do
      # Deactivate all other versions
      DataVersion.where.not(id: id).update_all(is_active: false)
      # Activate this version
      update!(is_active: true, status: 'active')
    end
  end

  def archive!
    update!(status: 'archived', is_active: false)
  end

  def employee_count
    employees.count
  end

  def squad_count
    squads.count
  end

  private

  def ensure_single_active_version
    if is_active_changed? && is_active?
      DataVersion.where.not(id: id).update_all(is_active: false)
    end
  end
end
