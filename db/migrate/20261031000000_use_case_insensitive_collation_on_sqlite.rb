# MySQL compared text with utf8mb4_0900_ai_ci, so "Engineer" and "engineer"
# were equal in =, GROUP BY, DISTINCT, joins and unique indexes. SQLite compares
# case-sensitively by default. NOCASE restores case-insensitive comparison for
# ASCII letters; accent-insensitive comparison has no SQLite equivalent.
#
# Runs only on SQLite. On MySQL it does nothing.
class UseCaseInsensitiveCollationOnSqlite < ActiveRecord::Migration[7.1]
  TABLES = %w[data_versions emp employees teams teams_employees].freeze

  def up
    return unless sqlite?

    each_text_column do |table, column|
      change_column table, column.name, column.type,
        limit: column.limit, null: column.null, default: column.default, collation: 'NOCASE'
    end
  end

  def down
    return unless sqlite?

    each_text_column do |table, column|
      change_column table, column.name, column.type,
        limit: column.limit, null: column.null, default: column.default, collation: nil
    end
  end

  private

  def sqlite?
    connection.adapter_name.match?(/sqlite/i)
  end

  def each_text_column
    TABLES.each do |table|
      connection.columns(table).select { |c| %i[string text].include?(c.type) }.each do |column|
        yield table, column
      end
    end
  end
end
