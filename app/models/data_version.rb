class DataVersion < ApplicationRecord
  has_many :teams_employees, dependent: :delete_all
  has_many :teams,           dependent: :delete_all
  has_many :employees,       dependent: :delete_all

  validates :name,          presence: true, uniqueness: true
  validates :snapshot_date, presence: true
  validates :status,        inclusion: { in: %w[draft active archived] }

  scope :active,    -> { where(is_active: true) }
  scope :by_status, ->(status) { where(status: status) }
  scope :recent,    -> { order(snapshot_date: :desc) }

  before_save :ensure_single_active_version
  before_save :sync_status_and_active_flag

  def activate!
    transaction do
      DataVersion.where.not(id: id).update_all(is_active: false)
      update!(is_active: true, status: 'active')
    end
  end

  def archive!
    update!(status: 'archived', is_active: false)
  end

  def active?
    is_active
  end

  def employee_count
    employees.count
  end

  def team_count
    teams.count
  end

  private

  def ensure_single_active_version
    if is_active_changed? && is_active?
      DataVersion.where.not(id: id).update_all(is_active: false)
    end
  end

  def sync_status_and_active_flag
    if status_changed? && status == 'active'
      self.is_active = true
      DataVersion.where.not(id: id).update_all(is_active: false, status: 'draft')
    elsif status_changed? && status != 'active'
      self.is_active = false
    end
  end
end
