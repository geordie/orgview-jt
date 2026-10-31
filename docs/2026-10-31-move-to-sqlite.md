# Move from MySQL to SQLite
**Date:** 2026-10-31

The app now uses SQLite (`storage/development.sqlite3`, on the
`orgview-jt-app-storage` named volume) instead of a MySQL container. This is
phase 1 of the plan to move to Go + SQLite: the Rails app keeps working while the
database changes underneath it, so a later Go port can read the same file.

## One-time data copy

Your existing data lives in the `orgview-jt-mysql-data` volume. Team hierarchy,
pretty names, contractor imports and older data versions cannot be recreated
from the Rippling CSV, so copy it rather than re-importing.

```sh
# 1. Start the old MySQL container (it no longer starts by default).
docker compose --profile mysql up -d mysql

# 2. Back it up to a file outside Docker before anything else.
docker compose exec mysql mysqldump -uroot -proot -P3308 --single-transaction dev > orgview-mysql-backup.sql

# 3. Build the Rails image and create the SQLite database.
docker compose --profile rails build rails
docker compose --profile rails run --rm rails bin/rails db:migrate

# 4. Copy every table into SQLite. Runs in one transaction and rolls back if
#    row counts or id sums differ for any table or data version.
docker compose --profile rails run --rm rails bin/rails runner script/copy_mysql_to_sqlite.rb

# 5. Start the app (the Go app, see docs/2026-10-31-go-app.md) and stop MySQL.
docker compose up -d --build app
docker compose --profile mysql stop mysql
```

Step 4 first prints any text values that MySQL treated as equal but that
differ in case or accents (for example `Software Engineer` / `software engineer`).
Text columns use `COLLATE NOCASE`, so ASCII case differences still match in
SQLite. Lines marked "not all of these will match" contain accent or non-ASCII
case differences, which SQLite counts separately; reports grouping by that
column may show an extra row.

If step 4 says SQLite already has data, the app was started and data was added
before the copy. Re-run with `FORCE=1` to replace it with the MySQL data.

## Cleanup, once you are happy with the copy

- Remove the `mysql` service and `orgview-jt-mysql-data` volume from
  `docker-compose.yml`, then `docker volume rm orgview-jt-mysql-data`.
- Remove the `mysql2` gem, `default-libmysqlclient-dev` from `Dockerfile.rails` and
  `script/copy_mysql_to_sqlite.rb`. Once the Go app is verified, the whole Rails
  app goes (see docs/2026-10-31-go-app.md).

## What changed

- `Gemfile`: adds `sqlite3`; keeps `mysql2` only for the copy script.
- `config/database.yml`: SQLite files in `storage/`.
- `db/migrate/20261031000000_use_case_insensitive_collation_on_sqlite.rb`:
  `COLLATE NOCASE` on every text column, matching MySQL's case-insensitive
  comparisons (no-op on MySQL).
- `docker-compose.yml`: `mysql` moved behind the `mysql` profile; the app no
  longer waits for it.
- CI no longer starts a MySQL service.

Keep the SQLite file on a named volume (or a local disk), never on a macOS bind
mount: SQLite's locking is not reliable over Docker Desktop's file sharing.
