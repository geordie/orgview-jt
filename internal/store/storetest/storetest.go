// Package storetest opens throwaway databases loaded with the same
// fixtures the Rails tests used.
package storetest

import (
	"path/filepath"
	"testing"
	"time"

	"github.com/geordie/orgview-jt/internal/store"
)

// Now is the fixed clock of test stores.
var Now = time.Date(2026, 10, 31, 12, 0, 0, 0, time.UTC)

// Open returns an empty store in a temporary directory: just the schema and
// the "initial" data version.
func Open(t testing.TB) *store.Store {
	t.Helper()
	st, err := store.Open(filepath.Join(t.TempDir(), "test.sqlite3"))
	if err != nil {
		t.Fatal(err)
	}
	st.Now = func() time.Time { return Now }
	t.Cleanup(func() { st.Close() })
	return st
}

// Exec runs statements, failing the test on error.
func Exec(t testing.TB, st *store.Store, query string, args ...any) {
	t.Helper()
	if _, err := st.DB.Exec(query, args...); err != nil {
		t.Fatalf("%s: %v", query, err)
	}
}

// OpenWithFixtures returns a store holding the Rails test fixtures: an
// active version 1 and an archived version 2, sixteen employees and four
// teams (Engineering > Frontend, Engineering > Backend, Leadership).
func OpenWithFixtures(t testing.TB) *store.Store {
	t.Helper()
	st := Open(t)
	ts := Now.Format(store.TimeLayout)
	week := Now.AddDate(0, 0, -7).Format(store.TimeLayout)
	twoWeeks := Now.AddDate(0, 0, -14).Format(store.TimeLayout)
	Exec(t, st, `DELETE FROM data_versions`)
	Exec(t, st, `INSERT INTO data_versions (id, name, description, snapshot_date, is_active, status, created_at, updated_at) VALUES
		(1, 'Test Data Version', 'Test data version for running tests', ?, 1, 'active', ?, ?),
		(2, 'Inactive Test Version', 'Inactive test data version', ?, 0, 'archived', ?, ?)`,
		week, week, week, twoWeeks, twoWeeks, twoWeeks)
	type emp struct {
		id                      int64
		pid, title, code, level string
		seniority               int
		manager                 any
		isManager               bool
		country, area, company  string
		version                 int
	}
	emps := []emp{
		{1, "EMP001", "CEO", "EXEC01", "(M30) Exec", 30, nil, true, "USA", "Chicago", "JT", 1},
		{2, "EMP002", "CTO", "EXEC02", "(M28) Exec", 28, "EMP001", true, "USA", "Chicago", "JT", 1},
		{3, "EMP003", "Senior Software Engineer", "ENGR03", "(P22) Sr", 22, "EMP002", false, "Canada", "Toronto", "JT", 1},
		{4, "EMP004", "Engineering Manager", "MGMT01", "(M24) Mgr", 24, "EMP002", true, "USA", "Chicago", "JT", 1},
		{5, "EMP005", "UX Designer", "DSGN01", "(P18) Mid", 18, "EMP001", false, "UK", "London", "JT UK", 1},
		{2182, "EMP2182", "CTO", "EXEC02", "(M28) Exec", 28, "EMP001", true, "USA", "Chicago", "JT", 1},
		{2183, "EMP2183", "VP, Product Management", "PROD01", "(M26) VP", 26, "EMP2182", true, "USA", "Chicago", "JT", 1},
		{2184, "EMP2184", "Principal Software Engineer", "ENGR05", "(P25) Principal", 25, "EMP2183", false, "Canada", "Toronto", "JT", 1},
		{2185, "EMP2185", "Director, Software Development", "MGMT03", "(M25) Dir", 25, "EMP2184", true, "USA", "Chicago", "JT", 1},
		{2186, "EMP2186", "Staff Software Developer", "ENGR04", "(P23) Staff", 23, "EMP2185", false, "Canada", "Toronto", "JT", 1},
		{2187, "EMP2187", "Software Developer", "ENGR02", "(P20) Mid", 20, "EMP2185", false, "USA", "Chicago", "JT", 1},
		{2188, "EMP2188", "Principal Software Developer", "ENGR05", "(P25) Principal", 25, "EMP2185", false, "USA", "Chicago", "JT", 1},
		{1001, "TEST001", "Test Engineer", "TEST01", "(P20) Mid", 20, "EMP001", false, "USA", "Chicago", "JT", 1},
		{1002, "TEST002", "Test Designer", "TEST02", "(P18) Mid", 18, "EMP001", false, "Canada", "Toronto", "JT", 1},
		{1003, "TEST003", "Test Analyst", "TEST03", "(P19) Mid", 19, "EMP001", false, "UK", "London", "JT UK", 2},
		{1004, "TEST004", "Test Manager", "TEST04", "(M24) Mgr", 24, "EMP001", true, "Germany", "Frankfurt", "JT DE", 2},
	}
	for _, e := range emps {
		Exec(t, st, `INSERT INTO employees (id, person_id, title, job_code, job_level, seniority, manager_id, is_manager, country,
			personnel_area, company, data_version_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			e.id, e.pid, e.title, e.code, e.level, e.seniority, e.manager, e.isManager, e.country, e.area, e.company, e.version, ts, ts)
	}
	Exec(t, st, `INSERT INTO teams (id, name, full_path, depth, member_count, org_member_count, manager_count, children, descendents,
		team_health, team_health_details, parent_id, data_version_id, created_at, updated_at) VALUES
		(1, 'Engineering', 'Engineering', 1, 3, 5, 1, 2, 2, 'green', '', NULL, 1, ?, ?),
		(2, 'Frontend', 'Engineering > Frontend', 2, 2, 2, 0, 0, 0, 'amber', 'No manager', 1, 1, ?, ?),
		(3, 'Backend', 'Engineering > Backend', 2, 1, 1, 0, 0, 0, 'red', 'No manager, team too small', 1, 1, ?, ?),
		(4, 'Leadership', 'Leadership', 1, 2, 2, 2, 0, 0, 'green', '', NULL, 1, ?, ?)`, ts, ts, ts, ts, ts, ts, ts, ts)
	Exec(t, st, `INSERT INTO teams_employees (id, team_id, employee_id, allocation, data_version_id, created_at, updated_at) VALUES
		(1, 4, 1, 1.0, 1, ?, ?), (2, 1, 2, 1.0, 1, ?, ?), (3, 2, 3, 1.0, 1, ?, ?), (4, 1, 4, 1.0, 1, ?, ?), (5, 4, 5, 1.0, 1, ?, ?)`,
		ts, ts, ts, ts, ts, ts, ts, ts, ts, ts)
	return st
}
