package store

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/csv"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"regexp"
	"strconv"
	"strings"
	"time"
)

// ImportError is a problem with an uploaded file, shown to the user.
type ImportError string

func (e ImportError) Error() string { return string(e) }

// EmployeeCSVHeaders are the Rippling export columns the import needs.
var EmployeeCSVHeaders = []string{
	"Employee - ID", "Employee", "Start date", "Current entity information - legal entity name",
	"Work location - Country", "Rippling profile number", "Title", "Department", "Level name",
	"Job family name", "Manager - ID", "Is a manager",
}

// ContractorCSVHeaders are the contractor file columns the import needs.
var ContractorCSVHeaders = []string{"Person", "Team", "Role", "Leader Level 4", "FTC Count", "Vendor", "Team_ID"}

// csvTable is a parsed CSV with headers. Missing and empty cells are NULL,
// as Ruby's CSV reads them.
type csvTable struct {
	headers []string
	rows    [][]string
}

func readCSV(r io.Reader) (*csvTable, error) {
	cr := csv.NewReader(r)
	cr.FieldsPerRecord = -1
	all, err := cr.ReadAll()
	if err != nil {
		return nil, ImportError("The uploaded file is not a valid CSV file.")
	}
	t := &csvTable{}
	if len(all) == 0 {
		return t, nil
	}
	t.headers = all[0]
	if len(t.headers) > 0 {
		t.headers[0] = strings.TrimPrefix(t.headers[0], "\ufeff")
	}
	t.rows = all[1:]
	return t, nil
}

func (t *csvTable) missing(want []string) []string {
	var out []string
	for _, h := range want {
		found := false
		for _, have := range t.headers {
			found = found || have == h
		}
		if !found {
			out = append(out, h)
		}
	}
	return out
}

// get returns the cell under header in row; ok is false when it is missing
// or empty.
func (t *csvTable) get(row []string, header string) (string, bool) {
	for i, h := range t.headers {
		if h == header {
			if i < len(row) && row[i] != "" {
				return row[i], true
			}
			return "", false
		}
	}
	return "", false
}

func (t *csvTable) null(row []string, header string) sql.NullString {
	v, ok := t.get(row, header)
	return sql.NullString{String: v, Valid: ok}
}

// rubyStrip trims what Ruby's String#strip does.
func rubyStrip(s string) string { return strings.Trim(s, " \t\n\v\f\r\x00") }

var jobLevelRe = regexp.MustCompile(`(?i)\(([MP])(\d+)\)`)

// ParseJobLevel reads "(P22) Sr" or "(M25) Dir": M means manager, P an
// individual contributor, and the digits are the seniority. Unrecognised
// levels give (unknown, 0).
func ParseJobLevel(level sql.NullString) (isManager sql.NullBool, seniority int) {
	if !Present(level) {
		return sql.NullBool{}, 0
	}
	m := jobLevelRe.FindStringSubmatch(level.String)
	if m == nil {
		return sql.NullBool{}, 0
	}
	n, _ := strconv.Atoi(m[2])
	return sql.NullBool{Bool: strings.EqualFold(m[1], "M"), Valid: true}, n
}

func parseBoolean(v sql.NullString) sql.NullBool {
	switch strings.ToLower(rubyStrip(v.String)) {
	case "true", "yes", "y", "1":
		return sql.NullBool{Bool: true, Valid: true}
	case "false", "no", "n", "0":
		return sql.NullBool{Bool: false, Valid: true}
	}
	return sql.NullBool{}
}

var dateLayouts = []string{"2006-01-02", "2006/01/02", "20060102", "Jan 2, 2006", "January 2, 2006", "2 Jan 2006", "2 January 2006", "02/01/2006", "2/1/2006", "2006-01-02T15:04:05Z07:00"}

// parseDate returns a stored date, or NULL for blank or unparseable values
// rather than failing the import.
func parseDate(v sql.NullString) sql.NullString {
	s := strings.TrimSpace(v.String)
	if s == "" {
		return sql.NullString{}
	}
	for _, l := range dateLayouts {
		if t, err := time.Parse(l, s); err == nil {
			return sql.NullString{String: t.Format(DateLayout), Valid: true}
		}
	}
	return sql.NullString{}
}

// ImportEmployees replaces the active version's employees, teams and team
// memberships with those in a Rippling export: one team per department,
// with each employee on their department's team. Returns how many
// employees the version now has.
func (s *Store) ImportEmployees(ctx context.Context, r io.Reader) (int, error) {
	t, err := readCSV(r)
	if err != nil {
		return 0, err
	}
	if missing := t.missing(EmployeeCSVHeaders); len(missing) > 0 {
		return 0, ImportError("CSV is missing required headers: " + strings.Join(missing, ", "))
	}
	v, ok, err := s.ActiveVersion(ctx)
	if err != nil {
		return 0, err
	}
	if !ok {
		return 0, ImportError("No active data version. Please create and activate a version first.")
	}

	var count int
	err = s.Tx(ctx, func(tx *sql.Tx) error {
		for _, q := range []string{
			`DELETE FROM teams_employees WHERE data_version_id = ?`,
			`DELETE FROM teams WHERE data_version_id = ?`,
			`DELETE FROM employees WHERE data_version_id = ?`,
		} {
			if _, err := tx.ExecContext(ctx, q, v.ID); err != nil {
				return err
			}
		}
		if _, err := tx.ExecContext(ctx, `DELETE FROM emp`); err != nil {
			return err
		}

		// Stage 1: raw rows into emp, first row per employee id.
		empStmt, err := tx.PrepareContext(ctx, `INSERT INTO emp (person_id, name, start_date, business_title, job_code, job_level,
			job_family, country, company, org_unit, leader_id, is_manager, created_at, updated_at)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
		if err != nil {
			return err
		}
		defer empStmt.Close()
		seen := map[string]bool{}
		for _, row := range t.rows {
			raw, _ := t.get(row, "Employee - ID")
			pid := rubyStrip(raw)
			if strings.TrimSpace(pid) == "" || seen[pid] {
				continue
			}
			seen[pid] = true
			leader := t.null(row, "Manager - ID")
			if leader.Valid {
				leader.String = rubyStrip(leader.String)
			}
			now := s.timestamp()
			if _, err := empStmt.ExecContext(ctx, pid, t.null(row, "Employee"), parseDate(t.null(row, "Start date")),
				t.null(row, "Title"), t.null(row, "Rippling profile number"), t.null(row, "Level name"),
				t.null(row, "Job family name"), t.null(row, "Work location - Country"),
				t.null(row, "Current entity information - legal entity name"), t.null(row, "Department"), leader,
				parseBoolean(t.null(row, "Is a manager")), now, now); err != nil {
				return err
			}
		}

		// Stage 2: employees from emp.
		leaders := map[string]bool{}
		lrows, err := tx.QueryContext(ctx, `SELECT leader_id FROM emp WHERE NOT ((leader_id IS NULL OR leader_id = ''))`)
		if err != nil {
			return err
		}
		for lrows.Next() {
			var l string
			if err := lrows.Scan(&l); err != nil {
				lrows.Close()
				return err
			}
			leaders[l] = true
		}
		lrows.Close()

		type empRow struct {
			pid                                                                     string
			name, start, title, code, level, family, country, company, leader, unit sql.NullString
			isMgr                                                                   sql.NullBool
		}
		erows, err := tx.QueryContext(ctx, `SELECT person_id, name, start_date, business_title, job_code, job_level, job_family,
			country, company, leader_id, org_unit, is_manager FROM emp`)
		if err != nil {
			return err
		}
		var emps []empRow
		for erows.Next() {
			var e empRow
			if err := erows.Scan(&e.pid, &e.name, &e.start, &e.title, &e.code, &e.level, &e.family, &e.country, &e.company,
				&e.leader, &e.unit, &e.isMgr); err != nil {
				erows.Close()
				return err
			}
			emps = append(emps, e)
		}
		erows.Close()

		insEmp, err := tx.PrepareContext(ctx, `INSERT INTO employees (person_id, name, start_date, title, job_code, job_level,
			job_family, seniority, manager_id, is_manager, country, company, data_version_id, created_at, updated_at)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
		if err != nil {
			return err
		}
		defer insEmp.Close()
		employeeIDs := map[string]int64{}
		for _, e := range emps {
			isMgr, seniority := ParseJobLevel(e.level)
			// Prefer the explicit "Is a manager" column, then the level
			// prefix, then whether anyone reports to them.
			if e.isMgr.Valid {
				isMgr = e.isMgr
			}
			if !isMgr.Valid {
				isMgr = sql.NullBool{Bool: leaders[e.pid], Valid: true}
			}
			mgr := e.leader
			if !Present(mgr) {
				mgr = sql.NullString{}
			}
			start := e.start
			if start.Valid && len(start.String) > 10 {
				start.String = start.String[:10]
			}
			now := s.timestamp()
			res, err := insEmp.ExecContext(ctx, e.pid, e.name, start, e.title, e.code, e.level, e.family, seniority, mgr,
				isMgr.Bool, e.country, e.company, v.ID, now, now)
			if err != nil {
				return err
			}
			id, _ := res.LastInsertId()
			if _, dup := employeeIDs[e.pid]; !dup {
				employeeIDs[e.pid] = id
			}
		}

		// Stage 3: one top-level team per department.
		drows, err := tx.QueryContext(ctx, `SELECT DISTINCT emp.org_unit FROM emp WHERE NOT ((emp.org_unit IS NULL OR emp.org_unit = ''))`)
		if err != nil {
			return err
		}
		var depts []string
		seenDept := map[string]bool{}
		for drows.Next() {
			var d string
			if err := drows.Scan(&d); err != nil {
				drows.Close()
				return err
			}
			d = rubyStrip(d)
			if !seenDept[d] {
				seenDept[d] = true
				depts = append(depts, d)
			}
		}
		drows.Close()
		teamIDs := map[string]int64{}
		now := s.timestamp()
		for _, d := range depts {
			res, err := tx.ExecContext(ctx, `INSERT INTO teams (name, full_path, depth, data_version_id, created_at, updated_at)
				VALUES (?, ?, 1, ?, ?, ?)`, d, d, v.ID, now, now)
			if err != nil {
				return err
			}
			id, _ := res.LastInsertId()
			teamIDs[d] = id
		}
		insTE, err := tx.PrepareContext(ctx, `INSERT INTO teams_employees (employee_id, team_id, allocation, data_version_id, created_at, updated_at)
			VALUES (?, ?, 1.0, ?, ?, ?)`)
		if err != nil {
			return err
		}
		defer insTE.Close()
		for _, e := range emps {
			if !Present(e.unit) {
				continue
			}
			empID, ok1 := employeeIDs[e.pid]
			teamID, ok2 := teamIDs[rubyStrip(e.unit.String)]
			if !ok1 || !ok2 {
				continue
			}
			if _, err := insTE.ExecContext(ctx, empID, teamID, v.ID, now, now); err != nil {
				return err
			}
		}
		return tx.QueryRowContext(ctx, `SELECT COUNT(*) FROM employees WHERE data_version_id = ?`, v.ID).Scan(&count)
	})
	return count, err
}

// ImportContractors adds the contractors in a file to the active version:
// each gets a generated id, the most common job code, level and seniority
// of employees with the same title, a manager from their team, and a place
// on that team. Returns how many were added.
func (s *Store) ImportContractors(ctx context.Context, r io.Reader) (int, error) {
	t, err := readCSV(r)
	if err != nil {
		return 0, err
	}
	if missing := t.missing(ContractorCSVHeaders); len(missing) > 0 {
		return 0, ImportError("CSV is missing required headers: " + strings.Join(missing, ", "))
	}
	v, ok, err := s.ActiveVersion(ctx)
	if err != nil {
		return 0, err
	}
	if !ok {
		return 0, ImportError("No active data version. Please create and activate a version first.")
	}

	type jobAttrs struct {
		code, level sql.NullString
		seniority   int64
	}
	attrs := map[string]jobAttrs{}
	managers := map[int64]sql.NullString{}
	type contractor struct {
		pid, title string
		team       int64
		job        jobAttrs
		manager    sql.NullString
	}
	var list []contractor
	for _, row := range t.rows {
		role, _ := t.get(row, "Role")
		title := rubyStrip(role)
		tid, _ := t.get(row, "Team_ID")
		teamID := rubyToI(rubyStrip(tid))
		if strings.TrimSpace(title) == "" || teamID == 0 {
			continue
		}
		job, ok := attrs[title]
		if !ok {
			var sen sql.NullInt64
			err := s.DB.QueryRowContext(ctx, `SELECT employees.job_code, employees.job_level, employees.seniority FROM employees
				WHERE employees.data_version_id = ? AND employees.title = ?
				GROUP BY employees.job_code, employees.job_level, employees.seniority ORDER BY COUNT(*) DESC LIMIT 1`, v.ID, title).
				Scan(&job.code, &job.level, &sen)
			if err != nil && !errors.Is(err, sql.ErrNoRows) {
				return 0, err
			}
			job.seniority = sen.Int64
			attrs[title] = job
		}
		mgr, ok := managers[teamID]
		if !ok || !mgr.Valid {
			err := s.DB.QueryRowContext(ctx, `SELECT employees.person_id FROM employees
				INNER JOIN teams_employees ON teams_employees.employee_id = employees.id
				WHERE employees.data_version_id = ? AND employees.is_manager = 1 AND teams_employees.team_id = ?
				AND teams_employees.data_version_id = ? LIMIT 1`, v.ID, teamID, v.ID).Scan(&mgr)
			if err != nil && !errors.Is(err, sql.ErrNoRows) {
				return 0, err
			}
			managers[teamID] = mgr
		}
		b := make([]byte, 14)
		if _, err := rand.Read(b); err != nil {
			return 0, err
		}
		list = append(list, contractor{pid: "FTC_" + hex.EncodeToString(b), title: title, team: teamID, job: job, manager: mgr})
	}
	if len(list) == 0 {
		return 0, ImportError("No valid contractor rows found in the CSV.")
	}
	err = s.Tx(ctx, func(tx *sql.Tx) error {
		now := s.timestamp()
		ids := make([]int64, len(list))
		for i, c := range list {
			res, err := tx.ExecContext(ctx, `INSERT INTO employees (person_id, title, job_code, job_level, seniority, manager_id,
				is_manager, employee_type, data_version_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 0, 'FTC', ?, ?, ?)`,
				c.pid, c.title, c.job.code, c.job.level, c.job.seniority, c.manager, v.ID, now, now)
			if err != nil {
				return err
			}
			ids[i], _ = res.LastInsertId()
		}
		for i, c := range list {
			if _, err := tx.ExecContext(ctx, `INSERT INTO teams_employees (employee_id, team_id, allocation, data_version_id, created_at, updated_at)
				VALUES (?, ?, 1.0, ?, ?, ?)`, ids[i], c.team, v.ID, now, now); err != nil {
				if strings.Contains(err.Error(), "FOREIGN KEY") {
					return ImportError(fmt.Sprintf("Team_ID %d does not match any team.", c.team))
				}
				return err
			}
		}
		return nil
	})
	return len(list), err
}

// rubyToI converts like Ruby's String#to_i: leading digits, else 0.
func rubyToI(s string) int64 {
	end := 0
	if end < len(s) && (s[end] == '-' || s[end] == '+') {
		end++
	}
	for end < len(s) && s[end] >= '0' && s[end] <= '9' {
		end++
	}
	n, _ := strconv.ParseInt(strings.TrimPrefix(s[:end], "+"), 10, 64)
	return n
}

// jobFamilyRules assign job families from titles, in order; a later rule
// overwrites an earlier one.
var jobFamilyRules = []struct{ where, family string }{
	{"LOWER(title) LIKE 'software engineer%'", "Software Engineering"},
	{"LOWER(title) LIKE 'infrastructure engineer%'", "Infrastructure Engineering"},
	{"LOWER(title) LIKE 'infrastructure administrator%'", "Infrastructure Administration"},
	{"LOWER(title) LIKE 'network engineer%'", "Network Engineering"},
	{"LOWER(title) LIKE 'software administrator%' OR LOWER(title) LIKE 'system administrator%'", "Software & System Administration"},
	{"(LOWER(title) LIKE '%mgr%' AND LOWER(title) LIKE '%engineering%') OR LOWER(title) LIKE '%infrastructure collaboration%'", "Engineering Management"},
	{"((LOWER(title) LIKE '%mgr%' OR LOWER(title) LIKE '%sup%' OR LOWER(title) LIKE '%manager%') AND (LOWER(title) LIKE '%it operations%' OR LOWER(title) LIKE '%it ops%')) OR LOWER(title) LIKE 'mgr, enterprise av%' OR LOWER(title) LIKE 'it manager%'", "IT Operations Management"},
	{"LOWER(title) LIKE '%analyst%'", "Business Analysis"},
	{"LOWER(title) LIKE '%business systems engineer%'", "Business Systems Engineering"},
	{"LOWER(title) LIKE '%av tech%' OR LOWER(title) LIKE '%audio%' OR LOWER(title) = 'erp business manager'", "IT Operations"},
	{"LOWER(title) LIKE '%technical product%'", "Product Management"},
	{"LOWER(title) LIKE '%technical architect%'", "Architecture"},
	{"LOWER(title) LIKE '%dir%'", "Directors"},
	{"LOWER(title) LIKE '%engineering development program engineer%'", "Software Engineering"},
}

// PopulateJobFamilies sets job families from titles for the active
// version's employees and returns how many updates were made.
func (s *Store) PopulateJobFamilies(ctx context.Context, versionID int64) (int64, error) {
	var total int64
	err := s.Tx(ctx, func(tx *sql.Tx) error {
		for _, r := range jobFamilyRules {
			res, err := tx.ExecContext(ctx, `UPDATE employees SET job_family = ? WHERE employees.data_version_id = ? AND (`+r.where+`)`, r.family, versionID)
			if err != nil {
				return err
			}
			n, _ := res.RowsAffected()
			total += n
		}
		return nil
	})
	return total, err
}
