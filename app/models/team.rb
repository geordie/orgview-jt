class Team < ApplicationRecord
  belongs_to :parent,    class_name: 'Team', optional: true
  has_many   :sub_teams, class_name: 'Team', foreign_key: 'parent_id'
  has_many   :teams_employees
  has_many   :employees, through: :teams_employees
  belongs_to :data_version, optional: true

  validates :name,      presence: true
  validates :full_path, presence: true

  # Separator between segments in full_path, e.g. "Engineering > Frontend".
  PATH_SEPARATOR = ' > '
  # Escape character for LIKE patterns. '!' is used instead of the default
  # backslash so the same SQL works on MySQL and SQLite (SQLite has no default
  # LIKE escape, and a backslash literal is spelled differently in each).
  LIKE_ESCAPE = '!'

  scope :for_version, ->(version) { where(data_version_id: version.id) }

  # Teams at ancestor_path or anywhere beneath it. Matches whole path segments,
  # so "Eng" does not include "Engineering", and LIKE wildcards in team names
  # are escaped.
  scope :in_subtree, ->(ancestor_path) {
    where(
      "teams.full_path = :path OR teams.full_path LIKE :prefix ESCAPE '#{LIKE_ESCAPE}'",
      path: ancestor_path,
      prefix: "#{sanitize_sql_like(ancestor_path + PATH_SEPARATOR, LIKE_ESCAPE)}%"
    )
  }

  # Ruby counterpart of in_subtree for paths already loaded into memory.
  def self.path_within?(path, ancestor_path)
    path == ancestor_path || path.start_with?(ancestor_path + PATH_SEPARATOR)
  end
end
