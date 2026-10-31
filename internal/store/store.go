// Package store is OrgView's database layer: one SQLite file, shared with the
// Rails app during the migration. The schema is the one Rails creates, so
// either app can open a database the other made.
package store

import (
	"context"
	"database/sql"
	_ "embed"
	"errors"
	"fmt"
	"net/url"
	"path/filepath"
	"strings"
	"time"

	_ "modernc.org/sqlite"
)

//go:embed schema.sql
var schemaSQL string

// railsMigrations are the Rails migration versions that schema.sql already
// contains. They are recorded in schema_migrations so Rails, while it still
// exists, sees a database the Go app created as fully migrated.
var railsMigrations = []string{
	"20260319000001", "20260319000002", "20260319000003", "20260319000004",
	"20260319000005", "20260319000006", "20260320225035", "20260322181146",
	"20260322204450", "20260413234512", "20261027000000", "20261027000001",
	"20261031000000",
}

// TimeLayout is how timestamps are stored: UTC, microseconds, as Rails does.
const TimeLayout = "2006-01-02 15:04:05.000000"

// DateLayout is how dates are stored.
const DateLayout = "2006-01-02"

// Store wraps the database.
type Store struct {
	DB *sql.DB
	// Now is the clock; tests replace it.
	Now func() time.Time
}

// Open opens (creating if needed) the SQLite database at path.
func Open(path string) (*Store, error) {
	q := url.Values{}
	q.Add("_pragma", "foreign_keys(1)")
	q.Add("_pragma", "journal_mode(WAL)")
	q.Add("_pragma", "busy_timeout(5000)")
	q.Add("_pragma", "synchronous(NORMAL)")
	db, err := sql.Open("sqlite", "file:"+filepath.ToSlash(path)+"?"+q.Encode())
	if err != nil {
		return nil, err
	}
	// One connection: SQLite has a single writer, and this keeps every
	// request's reads consistent with its writes.
	db.SetMaxOpenConns(1)
	s := &Store{DB: db, Now: time.Now}
	if err := s.init(context.Background()); err != nil {
		db.Close()
		return nil, err
	}
	return s, nil
}

// Close closes the database.
func (s *Store) Close() error { return s.DB.Close() }

// init creates the schema in an empty database, with the "initial" data
// version that the Rails migrations create.
func (s *Store) init(ctx context.Context) error {
	var n int
	if err := s.DB.QueryRowContext(ctx, `SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='data_versions'`).Scan(&n); err != nil {
		return err
	}
	if n > 0 {
		// An existing database must have every migration the Go app expects,
		// or columns it reads may be missing.
		latest := railsMigrations[len(railsMigrations)-1]
		var found int
		if err := s.DB.QueryRowContext(ctx, `SELECT COUNT(*) FROM schema_migrations WHERE version = ?`, latest).Scan(&found); err != nil {
			return fmt.Errorf("checking schema version: %w", err)
		}
		if found == 0 {
			return fmt.Errorf("database schema is older than migration %s; migrate it with the Rails app (rake db:migrate) first", latest)
		}
		return nil
	}
	return s.Tx(ctx, func(tx *sql.Tx) error {
		for _, stmt := range splitSQL(schemaSQL) {
			if _, err := tx.ExecContext(ctx, stmt); err != nil {
				return fmt.Errorf("schema: %w", err)
			}
		}
		for _, v := range railsMigrations {
			if _, err := tx.ExecContext(ctx, `INSERT INTO schema_migrations (version) VALUES (?)`, v); err != nil {
				return err
			}
		}
		now := s.timestamp()
		if _, err := tx.ExecContext(ctx, `INSERT INTO ar_internal_metadata (key, value, created_at, updated_at) VALUES ('environment', 'development', ?, ?)`, now, now); err != nil {
			return err
		}
		_, err := tx.ExecContext(ctx, `INSERT INTO data_versions (name, description, snapshot_date, is_active, status, created_at, updated_at)
			VALUES ('initial', 'Initial data version', ?, 1, 'active', ?, ?)`, now, now, now)
		return err
	})
}

func splitSQL(s string) []string {
	var out []string
	for _, stmt := range strings.Split(s, ";\n") {
		stmt = strings.TrimSpace(strings.TrimSuffix(strings.TrimSpace(stmt), ";"))
		if stmt != "" {
			out = append(out, stmt)
		}
	}
	return out
}

// Tx runs fn in a transaction.
func (s *Store) Tx(ctx context.Context, fn func(*sql.Tx) error) error {
	tx, err := s.DB.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	if err := fn(tx); err != nil {
		tx.Rollback()
		return err
	}
	return tx.Commit()
}

func (s *Store) timestamp() string { return s.Now().UTC().Format(TimeLayout) }

// ErrNotFound is returned when a record does not exist.
var ErrNotFound = errors.New("not found")

func parseTime(s sql.NullString) time.Time {
	if !s.Valid {
		return time.Time{}
	}
	for _, layout := range []string{"2006-01-02 15:04:05.999999999", time.RFC3339Nano, "2006-01-02T15:04:05.999999999", DateLayout} {
		if t, err := time.Parse(layout, s.String); err == nil {
			return t
		}
	}
	return time.Time{}
}

// queryer is satisfied by *sql.DB and *sql.Tx.
type queryer interface {
	QueryContext(ctx context.Context, query string, args ...any) (*sql.Rows, error)
	QueryRowContext(ctx context.Context, query string, args ...any) *sql.Row
	ExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)
}
