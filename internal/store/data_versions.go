package store

import (
	"context"
	"database/sql"
	"errors"
	"strings"
	"time"
)

// ActiveVersion returns the active data version, or ok=false if none.
func (s *Store) ActiveVersion(ctx context.Context) (DataVersion, bool, error) {
	v, err := scanDataVersion(s.DB.QueryRowContext(ctx, `SELECT `+dataVersionCols+` FROM data_versions WHERE is_active = 1 ORDER BY id LIMIT 1`))
	if errors.Is(err, sql.ErrNoRows) {
		return v, false, nil
	}
	return v, err == nil, err
}

// RecentVersions returns versions newest snapshot first; limit 0 means all.
func (s *Store) RecentVersions(ctx context.Context, limit int) ([]DataVersion, error) {
	q := `SELECT ` + dataVersionCols + ` FROM data_versions ORDER BY snapshot_date DESC`
	args := []any{}
	if limit > 0 {
		q += ` LIMIT ?`
		args = append(args, limit)
	}
	rows, err := s.DB.QueryContext(ctx, q, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []DataVersion
	for rows.Next() {
		v, err := scanDataVersion(rows)
		if err != nil {
			return nil, err
		}
		out = append(out, v)
	}
	return out, rows.Err()
}

// FindVersion returns the version with id.
func (s *Store) FindVersion(ctx context.Context, id int64) (DataVersion, error) {
	v, err := scanDataVersion(s.DB.QueryRowContext(ctx, `SELECT `+dataVersionCols+` FROM data_versions WHERE id = ?`, id))
	if errors.Is(err, sql.ErrNoRows) {
		return v, ErrNotFound
	}
	return v, err
}

// VersionCounts returns how many employees and teams a version has.
func (s *Store) VersionCounts(ctx context.Context, id int64) (employees, teams int64, err error) {
	if err = s.DB.QueryRowContext(ctx, `SELECT COUNT(*) FROM employees WHERE data_version_id = ?`, id).Scan(&employees); err != nil {
		return
	}
	err = s.DB.QueryRowContext(ctx, `SELECT COUNT(*) FROM teams WHERE data_version_id = ?`, id).Scan(&teams)
	return
}

// ValidationErrors holds full messages, in the order Rails reports them.
type ValidationErrors []string

func (v ValidationErrors) Error() string { return strings.Join(v, ", ") }

// VersionStatuses are the allowed DataVersion.Status values.
var VersionStatuses = []string{"draft", "active", "archived"}

func (s *Store) validateVersion(ctx context.Context, tx queryer, v DataVersion) error {
	var errs ValidationErrors
	if strings.TrimSpace(v.Name) == "" {
		errs = append(errs, "Name can't be blank")
	} else {
		var n int
		if err := tx.QueryRowContext(ctx, `SELECT COUNT(*) FROM data_versions WHERE name = ? AND id != ?`, v.Name, v.ID).Scan(&n); err != nil {
			return err
		}
		if n > 0 {
			errs = append(errs, "Name has already been taken")
		}
	}
	if v.SnapshotDate.IsZero() {
		errs = append(errs, "Snapshot date can't be blank")
	}
	ok := false
	for _, st := range VersionStatuses {
		ok = ok || st == v.Status
	}
	if !ok {
		errs = append(errs, "Status is not included in the list")
	}
	if len(errs) > 0 {
		return errs
	}
	return nil
}

// saveVersion validates and writes v, applying the same rules as the Rails
// model's callbacks: making a version active (by flag or by status) makes
// every other version inactive, and setting status "active" also moves the
// others back to draft. old is the stored version, or nil for a new one.
func (s *Store) saveVersion(ctx context.Context, tx *sql.Tx, old *DataVersion, v *DataVersion) error {
	if err := s.validateVersion(ctx, tx, *v); err != nil {
		return err
	}
	oldActive, oldStatus := false, "draft"
	if old != nil {
		oldActive, oldStatus = old.IsActive, old.Status
	}
	if v.IsActive != oldActive && v.IsActive {
		if _, err := tx.ExecContext(ctx, `UPDATE data_versions SET is_active = 0 WHERE id != ?`, v.ID); err != nil {
			return err
		}
	}
	if v.Status != oldStatus {
		if v.Status == "active" {
			v.IsActive = true
			if _, err := tx.ExecContext(ctx, `UPDATE data_versions SET is_active = 0, status = 'draft' WHERE id != ?`, v.ID); err != nil {
				return err
			}
		} else {
			v.IsActive = false
		}
	}
	now := s.Now().UTC()
	v.UpdatedAt = now
	if old == nil {
		v.CreatedAt = now
		res, err := tx.ExecContext(ctx, `INSERT INTO data_versions (name, description, snapshot_date, is_active, status, metadata, created_at, updated_at)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, v.Name, v.Description, v.SnapshotDate.UTC().Format(TimeLayout), v.IsActive, v.Status, v.Metadata,
			now.Format(TimeLayout), now.Format(TimeLayout))
		if err != nil {
			return err
		}
		v.ID, err = res.LastInsertId()
		return err
	}
	_, err := tx.ExecContext(ctx, `UPDATE data_versions SET name = ?, description = ?, snapshot_date = ?, is_active = ?, status = ?, updated_at = ? WHERE id = ?`,
		v.Name, v.Description, v.SnapshotDate.UTC().Format(TimeLayout), v.IsActive, v.Status, now.Format(TimeLayout), v.ID)
	return err
}

// CreateVersion creates a version snapshotted now. Returns ValidationErrors
// when invalid.
func (s *Store) CreateVersion(ctx context.Context, name string, description sql.NullString, status string) (DataVersion, error) {
	v := DataVersion{Name: name, Description: description, Status: status, SnapshotDate: s.Now().UTC()}
	err := s.Tx(ctx, func(tx *sql.Tx) error { return s.saveVersion(ctx, tx, nil, &v) })
	return v, err
}

// VersionUpdate is the editable fields of a version; nil leaves a field as is.
type VersionUpdate struct {
	Name         *string
	Description  *sql.NullString
	Status       *string
	SnapshotDate *time.Time
}

// UpdateVersion applies u to the version with id.
func (s *Store) UpdateVersion(ctx context.Context, id int64, u VersionUpdate) (DataVersion, error) {
	var v DataVersion
	err := s.Tx(ctx, func(tx *sql.Tx) error {
		old, err := scanDataVersion(tx.QueryRowContext(ctx, `SELECT `+dataVersionCols+` FROM data_versions WHERE id = ?`, id))
		if err != nil {
			return err
		}
		v = old
		if u.Name != nil {
			v.Name = *u.Name
		}
		if u.Description != nil {
			v.Description = *u.Description
		}
		if u.Status != nil {
			v.Status = *u.Status
		}
		if u.SnapshotDate != nil {
			v.SnapshotDate = *u.SnapshotDate
		}
		return s.saveVersion(ctx, tx, &old, &v)
	})
	return v, err
}

// ActivateVersion makes id the only active version.
func (s *Store) ActivateVersion(ctx context.Context, id int64) (DataVersion, error) {
	var v DataVersion
	err := s.Tx(ctx, func(tx *sql.Tx) error {
		old, err := scanDataVersion(tx.QueryRowContext(ctx, `SELECT `+dataVersionCols+` FROM data_versions WHERE id = ?`, id))
		if err != nil {
			return err
		}
		if _, err := tx.ExecContext(ctx, `UPDATE data_versions SET is_active = 0 WHERE id != ?`, id); err != nil {
			return err
		}
		v = old
		v.IsActive, v.Status = true, "active"
		return s.saveVersion(ctx, tx, &old, &v)
	})
	return v, err
}

// ArchiveVersion archives id and makes it inactive.
func (s *Store) ArchiveVersion(ctx context.Context, id int64) (DataVersion, error) {
	var v DataVersion
	err := s.Tx(ctx, func(tx *sql.Tx) error {
		old, err := scanDataVersion(tx.QueryRowContext(ctx, `SELECT `+dataVersionCols+` FROM data_versions WHERE id = ?`, id))
		if err != nil {
			return err
		}
		v = old
		v.IsActive, v.Status = false, "archived"
		return s.saveVersion(ctx, tx, &old, &v)
	})
	return v, err
}

// DeleteVersion deletes a version and all of its employees, teams and team
// memberships.
func (s *Store) DeleteVersion(ctx context.Context, id int64) error {
	return s.Tx(ctx, func(tx *sql.Tx) error {
		for _, q := range []string{
			`DELETE FROM teams_employees WHERE data_version_id = ?`,
			`DELETE FROM teams WHERE data_version_id = ?`,
			`DELETE FROM employees WHERE data_version_id = ?`,
			`DELETE FROM data_versions WHERE id = ?`,
		} {
			if _, err := tx.ExecContext(ctx, q, id); err != nil {
				return err
			}
		}
		return nil
	})
}
