package store

import (
	"context"
	"database/sql"
)

// Group is one row of a GROUP BY count. Key is nil, an int64 or a string.
type Group struct {
	Key   any
	Count int
}

// GroupCounts runs a query returning (key, count) rows, in the order the
// database returns them.
func (s *Store) GroupCounts(ctx context.Context, query string, args ...any) ([]Group, error) {
	rows, err := s.DB.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []Group
	for rows.Next() {
		var g Group
		if err := rows.Scan(&g.Key, &g.Count); err != nil {
			return nil, err
		}
		if b, ok := g.Key.([]byte); ok {
			g.Key = string(b)
		}
		out = append(out, g)
	}
	return out, rows.Err()
}

// StringPairs runs a query returning (string, string) rows into a map; NULL
// keys become "".
func (s *Store) StringPairs(ctx context.Context, query string, args ...any) (map[string]sql.NullString, error) {
	rows, err := s.DB.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := map[string]sql.NullString{}
	for rows.Next() {
		var k, v sql.NullString
		if err := rows.Scan(&k, &v); err != nil {
			return nil, err
		}
		out[k.String] = v
	}
	return out, rows.Err()
}

// Count runs a COUNT query.
func (s *Store) Count(ctx context.Context, query string, args ...any) (int, error) {
	var n int
	err := s.DB.QueryRowContext(ctx, query, args...).Scan(&n)
	return n, err
}

// StartDates returns the start dates ("" when unknown) of the distinct
// employees a query selects as (id, start_date).
func (s *Store) StartDates(ctx context.Context, query string, args ...any) ([]string, error) {
	rows, err := s.DB.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []string
	for rows.Next() {
		var id int64
		var d sql.NullString
		if err := rows.Scan(&id, &d); err != nil {
			return nil, err
		}
		out = append(out, d.String)
	}
	return out, rows.Err()
}

// Teams runs a query selecting teamCols.
func (s *Store) Teams(ctx context.Context, where string, args ...any) ([]Team, error) {
	rows, err := s.DB.QueryContext(ctx, `SELECT `+teamCols+` FROM teams `+where, args...)
	if err != nil {
		return nil, err
	}
	return collectTeams(rows)
}
