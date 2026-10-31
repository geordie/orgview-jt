# One-time copy of the old MySQL database into the SQLite database.
#
#   docker compose --profile mysql up -d mysql
#   docker compose run --rm app bin/rails runner script/copy_mysql_to_sqlite.rb
#
# Reads from MYSQL_URL (default: the old compose service) and writes to the
# app's configured SQLite database, which must already be migrated. It:
#
#   1. reports text values that MySQL treated as equal but SQLite will not
#      (case or accent variants), so you can check reports before relying on them;
#   2. copies every table, keeping ids, inside one transaction;
#   3. checks row counts and id sums per table and per data version, and rolls
#      back if anything differs.
#
# The SQLite database is expected to be empty apart from the "initial" data
# version the migrations create. Set FORCE=1 to replace whatever is there.

MYSQL_URL = ENV.fetch('MYSQL_URL', 'mysql2://root:root@mysql:3308/dev')
BATCH     = 5000

# Parents before children, so foreign keys hold at every step.
TABLES = %w[data_versions emp employees teams teams_employees].freeze
VERSIONED = %w[employees teams teams_employees].freeze

class MysqlSource < ActiveRecord::Base
  self.abstract_class = true
end
MysqlSource.establish_connection(MYSQL_URL)

def source_model(table)
  Class.new(MysqlSource) do
    self.table_name = table
    self.inheritance_column = nil
  end
end

def target_model(table)
  Class.new(ApplicationRecord) do
    self.table_name = table
    self.inheritance_column = nil
  end
end

def say(msg) = puts(msg)

def stats(model)
  per_version = model.column_names.include?('data_version_id') ? model.group(:data_version_id).count.transform_keys(&:to_i) : nil
  { count: model.count, id_sum: model.sum(:id).to_i, per_version: per_version }
end

source = TABLES.to_h { |t| [t, source_model(t)] }
target = TABLES.to_h { |t| [t, target_model(t)] }

# --- Preflight ---------------------------------------------------------------

abort 'The target database is not SQLite.' unless ApplicationRecord.connection.adapter_name.match?(/sqlite/i)

leftovers = TABLES.reject { |t| t == 'data_versions' }.select { |t| target[t].exists? }
leftovers << 'data_versions' if target['data_versions'].where.not(name: 'initial').exists?
if leftovers.any? && ENV['FORCE'] != '1'
  abort "SQLite already has data in: #{leftovers.join(', ')}. Re-run with FORCE=1 to replace it."
end

# --- 1. Values MySQL treated as equal ---------------------------------------

say '== Text values that differ only by case or accents in MySQL'
collisions = 0
TABLES.each do |table|
  conn = source[table].connection
  source[table].columns.select { |c| %i[string text].include?(c.type) }.each do |col|
    q = conn.quote_column_name(col.name)
    rows = conn.select_rows(<<~SQL)
      SELECT GROUP_CONCAT(DISTINCT CAST(#{q} AS BINARY) SEPARATOR ' | ')
      FROM #{conn.quote_table_name(table)}
      WHERE #{q} IS NOT NULL
      GROUP BY #{q}
      HAVING COUNT(DISTINCT CAST(#{q} AS BINARY)) > 1
    SQL
    rows.each do |(variants)|
      values = variants.to_s.force_encoding('UTF-8').split(' | ')
      still_equal = values.map { |v| v.downcase(:ascii) }.uniq.size == 1
      collisions += 1
      say "  #{table}.#{col.name}: #{values.join(' / ')}#{still_equal ? '' : '   <- not all of these will match in SQLite'}"
    end
  end
end
say(collisions.zero? ? '  none found' : "  #{collisions} group(s). Case-only ASCII variants still match (NOCASE); the rest will not.")

# --- 2. Copy -----------------------------------------------------------------

expected = TABLES.to_h { |t| [t, stats(source[t])] }

ApplicationRecord.transaction do
  TABLES.reverse_each { |t| target[t].delete_all }

  TABLES.each do |table|
    columns = target[table].column_names & source[table].column_names
    copied  = 0
    last_id = 0
    loop do
      batch = source[table].where('id > ?', last_id).order(:id).limit(BATCH).to_a
      break if batch.empty?

      target[table].insert_all!(batch.map { |r| r.attributes.slice(*columns) }, record_timestamps: false)
      copied += batch.size
      last_id = batch.last.id
    end
    say "== Copied #{copied} rows into #{table}"
  end

  # --- 3. Verify -------------------------------------------------------------

  mismatches = TABLES.filter_map do |table|
    actual = stats(target[table])
    next if actual == expected[table]

    "#{table}: MySQL #{expected[table].inspect}, SQLite #{actual.inspect}"
  end

  if mismatches.any?
    say '== Verification FAILED, nothing was saved:'
    mismatches.each { |m| say "  #{m}" }
    raise ActiveRecord::Rollback
  end

  say '== Verified: row counts and id sums match for every table and data version'
  VERSIONED.each do |table|
    expected[table][:per_version].each { |v, n| say "  #{table} version #{v}: #{n}" }
  end
end
