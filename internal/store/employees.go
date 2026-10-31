package store

import (
	"context"
	"database/sql"
	"errors"
	"strconv"
	"strings"
)

// EmployeeFilter narrows the employee list. Empty strings mean no filter.
type EmployeeFilter struct {
	Title, JobCode, JobFamily string
	// DirectReports keeps managers whose number of direct reports in the
	// active version is within [Min, Max]; nil means no filter.
	DirectReports *[2]int
	// TeamIDs keeps employees on any of these teams; nil means no filter.
	TeamIDs []int64
}

// SQL is the joins, WHERE clause and arguments that select the filtered
// employees of the active version.
func (f EmployeeFilter) SQL() (joins, where string, args []any) {
	joins = ` INNER JOIN data_versions ON data_versions.id = employees.data_version_id`
	where = ` WHERE data_versions.is_active = 1`
	if f.Title != "" {
		where += ` AND employees.title = ?`
		args = append(args, f.Title)
	}
	if f.JobCode != "" {
		where += ` AND employees.job_code = ?`
		args = append(args, f.JobCode)
	}
	if f.JobFamily != "" {
		where += ` AND employees.job_family = ?`
		args = append(args, f.JobFamily)
	}
	if f.DirectReports != nil {
		where += ` AND employees.person_id IN (SELECT e2.manager_id FROM employees e2
			INNER JOIN data_versions dv2 ON dv2.id = e2.data_version_id WHERE dv2.is_active = 1
			GROUP BY e2.manager_id HAVING COUNT(*) >= ? AND COUNT(*) <= ?)`
		args = append(args, f.DirectReports[0], f.DirectReports[1])
	}
	if f.TeamIDs != nil {
		joins += ` INNER JOIN teams_employees ON teams_employees.employee_id = employees.id`
		where += ` AND teams_employees.team_id IN (` + placeholders(len(f.TeamIDs)) + `)`
		for _, id := range f.TeamIDs {
			args = append(args, id)
		}
	}
	return
}

// CurrentEmployees returns one page of employees in the active version and
// the total number matching.
func (s *Store) CurrentEmployees(ctx context.Context, f EmployeeFilter, page, perPage int) ([]Employee, int, error) {
	joins, where, args := f.SQL()
	var total int
	if err := s.DB.QueryRowContext(ctx, `SELECT COUNT(DISTINCT employees.id) FROM employees`+joins+where, args...).Scan(&total); err != nil {
		return nil, 0, err
	}
	rows, err := s.DB.QueryContext(ctx, `SELECT DISTINCT `+employeeCols+` FROM employees`+joins+where+` LIMIT ? OFFSET ?`,
		append(args, perPage, (page-1)*perPage)...)
	if err != nil {
		return nil, 0, err
	}
	list, err := collectEmployees(rows)
	return list, total, err
}

func collectEmployees(rows *sql.Rows) ([]Employee, error) {
	defer rows.Close()
	var out []Employee
	for rows.Next() {
		e, err := scanEmployee(rows)
		if err != nil {
			return nil, err
		}
		out = append(out, e)
	}
	return out, rows.Err()
}

// FindEmployee returns the employee with id, in any version.
func (s *Store) FindEmployee(ctx context.Context, id int64) (Employee, error) {
	e, err := scanEmployee(s.DB.QueryRowContext(ctx, `SELECT `+employeeCols+` FROM employees WHERE id = ?`, id))
	if errors.Is(err, sql.ErrNoRows) {
		return e, ErrNotFound
	}
	return e, err
}

// Manager returns e's manager in the same data version.
func (s *Store) Manager(ctx context.Context, e Employee) (Employee, bool, error) {
	if !e.ManagerID.Valid {
		return Employee{}, false, nil
	}
	m, err := scanEmployee(s.DB.QueryRowContext(ctx, `SELECT `+employeeCols+` FROM employees
		WHERE person_id = ? AND data_version_id IS ? ORDER BY id LIMIT 1`, e.ManagerID.String, e.DataVersionID))
	if errors.Is(err, sql.ErrNoRows) {
		return m, false, nil
	}
	return m, err == nil, err
}

// DirectReports returns the employees whose manager is e, in e's version.
func (s *Store) DirectReports(ctx context.Context, e Employee) ([]Employee, error) {
	rows, err := s.DB.QueryContext(ctx, `SELECT `+employeeCols+` FROM employees
		WHERE manager_id = ? AND data_version_id IS ? ORDER BY id`, e.PersonID, e.DataVersionID)
	if err != nil {
		return nil, err
	}
	return collectEmployees(rows)
}

// DirectReportCounts maps person id to number of direct reports in a version.
func (s *Store) DirectReportCounts(ctx context.Context, versionID sql.NullInt64) (map[string]int, error) {
	rows, err := s.DB.QueryContext(ctx, `SELECT manager_id, COUNT(*) FROM employees
		WHERE data_version_id IS ? AND manager_id IS NOT NULL GROUP BY manager_id`, versionID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := map[string]int{}
	for rows.Next() {
		var id string
		var n int
		if err := rows.Scan(&id, &n); err != nil {
			return nil, err
		}
		out[strings.ToLower(id)] = n
	}
	return out, rows.Err()
}

// EmployeeTeams returns the teams e belongs to, in membership order.
func (s *Store) EmployeeTeams(ctx context.Context, employeeID int64) ([]Team, error) {
	rows, err := s.DB.QueryContext(ctx, `SELECT `+teamCols+` FROM teams
		INNER JOIN teams_employees ON teams_employees.team_id = teams.id
		WHERE teams_employees.employee_id = ? ORDER BY teams_employees.id`, employeeID)
	if err != nil {
		return nil, err
	}
	return collectTeams(rows)
}

// EmployeeTeamsByID maps employee id to its teams, for a set of employees.
func (s *Store) EmployeeTeamsByID(ctx context.Context, ids []int64) (map[int64][]Team, error) {
	out := map[int64][]Team{}
	if len(ids) == 0 {
		return out, nil
	}
	args := make([]any, len(ids))
	for i, id := range ids {
		args[i] = id
	}
	rows, err := s.DB.QueryContext(ctx, `SELECT teams_employees.employee_id, `+teamCols+` FROM teams
		INNER JOIN teams_employees ON teams_employees.team_id = teams.id
		WHERE teams_employees.employee_id IN (`+placeholders(len(ids))+`) ORDER BY teams_employees.id`, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var empID int64
		var t Team
		var created, updated sql.NullString
		if err := rows.Scan(&empID, &t.ID, &t.Name, &t.ParentID, &t.FullPath, &t.Depth, &t.Children, &t.Descendents,
			&t.MemberCount, &t.OrgMemberCount, &t.ManagerCount, &t.TeamHealth, &t.TeamHealthDetails, &t.DataVersionID,
			&created, &updated, &t.PrettyName); err != nil {
			return nil, err
		}
		t.CreatedAt, t.UpdatedAt = parseTime(created), parseTime(updated)
		out[empID] = append(out[empID], t)
	}
	return out, rows.Err()
}

// EmployeesByPersonID maps lower-cased person id to the employee, within a
// version, for a set of person ids.
func (s *Store) EmployeesByPersonID(ctx context.Context, versionID sql.NullInt64, personIDs []string) (map[string]Employee, error) {
	out := map[string]Employee{}
	if len(personIDs) == 0 {
		return out, nil
	}
	args := []any{versionID}
	for _, p := range personIDs {
		args = append(args, p)
	}
	rows, err := s.DB.QueryContext(ctx, `SELECT `+employeeCols+` FROM employees WHERE data_version_id IS ? AND person_id IN (`+
		placeholders(len(personIDs))+`) ORDER BY id DESC`, args...)
	if err != nil {
		return nil, err
	}
	list, err := collectEmployees(rows)
	for _, e := range list {
		out[strings.ToLower(e.PersonID)] = e // lowest id wins: rows come highest first
	}
	return out, err
}

// TreeRoots returns the active version's employees with no manager in that
// version: the tops of the reporting tree.
func (s *Store) TreeRoots(ctx context.Context, versionID int64) ([]Employee, error) {
	rows, err := s.DB.QueryContext(ctx, `SELECT `+employeeCols+` FROM employees
		INNER JOIN data_versions ON data_versions.id = employees.data_version_id
		WHERE data_versions.is_active = 1 AND (manager_id IS NULL OR manager_id NOT IN
			(SELECT person_id FROM employees WHERE data_version_id = ?))`, versionID)
	if err != nil {
		return nil, err
	}
	return collectEmployees(rows)
}

// OrgSizes maps lower-cased person id to the number of people below them,
// directly or indirectly, in a version. Reporting loops are counted once.
func (s *Store) OrgSizes(ctx context.Context, versionID int64) (map[string]int, error) {
	rows, err := s.DB.QueryContext(ctx, `SELECT person_id, manager_id FROM employees WHERE data_version_id = ? ORDER BY id`, versionID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	reports := map[string][]string{}
	var people []string
	for rows.Next() {
		var pid string
		var mgr sql.NullString
		if err := rows.Scan(&pid, &mgr); err != nil {
			return nil, err
		}
		pid = strings.ToLower(pid)
		people = append(people, pid)
		if Present(mgr) {
			m := strings.ToLower(mgr.String)
			reports[m] = append(reports[m], pid)
		}
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	sizes := map[string]int{}
	var sizeOf func(pid string, path []string) int
	sizeOf = func(pid string, path []string) int {
		if n, ok := sizes[pid]; ok {
			return n
		}
		n := 0
		for _, r := range reports[pid] {
			inPath := false
			for _, p := range path {
				inPath = inPath || p == r
			}
			if !inPath {
				n += 1 + sizeOf(r, append(append([]string{}, path...), pid))
			}
		}
		sizes[pid] = n
		return n
	}
	for _, p := range people {
		sizeOf(p, nil)
	}
	return sizes, nil
}

// EmployeeFields are the editable employee fields, as submitted. A nil field
// is left unchanged.
type EmployeeFields struct {
	PersonID, Title, JobCode, JobLevel, Seniority, ManagerID, IsManager *string
	Country, PersonnelArea, Company, DataVersionID, Name                *string
}

func (f EmployeeFields) apply(e *Employee) (badSeniority bool) {
	set := func(dst *sql.NullString, v *string) {
		if v != nil {
			*dst = sql.NullString{String: *v, Valid: true}
		}
	}
	if f.PersonID != nil {
		e.PersonID = *f.PersonID
	}
	set(&e.Title, f.Title)
	set(&e.JobCode, f.JobCode)
	set(&e.JobLevel, f.JobLevel)
	set(&e.Country, f.Country)
	set(&e.PersonnelArea, f.PersonnelArea)
	set(&e.Company, f.Company)
	set(&e.Name, f.Name)
	if f.ManagerID != nil {
		e.ManagerID = sql.NullString{String: *f.ManagerID, Valid: true}
		if *f.ManagerID == "" {
			// The form submits "" for an empty manager; store it as given,
			// as the Rails form did.
			e.ManagerID = sql.NullString{String: "", Valid: true}
		}
	}
	if f.Seniority != nil {
		v := strings.TrimSpace(*f.Seniority)
		if v == "" {
			e.Seniority = sql.NullInt64{}
		} else if n, err := strconv.ParseInt(v, 10, 64); err == nil {
			e.Seniority = sql.NullInt64{Int64: n, Valid: true}
		} else {
			e.Seniority = sql.NullInt64{}
			badSeniority = true
		}
	}
	if f.IsManager != nil {
		switch strings.ToLower(strings.TrimSpace(*f.IsManager)) {
		case "true", "1", "t", "on", "yes":
			e.IsManager = sql.NullBool{Bool: true, Valid: true}
		case "":
			e.IsManager = sql.NullBool{}
		default:
			e.IsManager = sql.NullBool{Bool: false, Valid: true}
		}
	}
	if f.DataVersionID != nil {
		if n, err := strconv.ParseInt(strings.TrimSpace(*f.DataVersionID), 10, 64); err == nil {
			e.DataVersionID = sql.NullInt64{Int64: n, Valid: true}
		} else {
			e.DataVersionID = sql.NullInt64{}
		}
	}
	return badSeniority
}

func validateEmployee(e Employee, badSeniority bool) error {
	var errs ValidationErrors
	if !Present(e.Title) {
		errs = append(errs, "Title can't be blank")
	}
	if !Present(e.JobCode) {
		errs = append(errs, "Job code can't be blank")
	}
	if !e.Seniority.Valid {
		if !badSeniority {
			errs = append(errs, "Seniority can't be blank")
		}
		errs = append(errs, "Seniority is not a number")
	}
	if e.EmployeeType.Valid && e.EmployeeType.String != "FTE" && e.EmployeeType.String != "FTC" {
		errs = append(errs, "Employee type is not included in the list")
	}
	if len(errs) > 0 {
		return errs
	}
	return nil
}

// CreateEmployee validates and inserts a new employee.
func (s *Store) CreateEmployee(ctx context.Context, f EmployeeFields) (Employee, error) {
	var e Employee
	bad := f.apply(&e)
	if err := validateEmployee(e, bad); err != nil {
		return e, err
	}
	now := s.Now().UTC()
	e.CreatedAt, e.UpdatedAt = now, now
	res, err := s.DB.ExecContext(ctx, `INSERT INTO employees (person_id, title, job_code, job_level, seniority, manager_id, is_manager,
		country, personnel_area, company, data_version_id, created_at, updated_at, name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		e.PersonID, e.Title, e.JobCode, e.JobLevel, e.Seniority, e.ManagerID, e.IsManager, e.Country, e.PersonnelArea, e.Company,
		e.DataVersionID, now.Format(TimeLayout), now.Format(TimeLayout), e.Name)
	if err != nil {
		return e, err
	}
	e.ID, err = res.LastInsertId()
	return e, err
}

// UpdateEmployee validates and saves changes to the employee with id.
func (s *Store) UpdateEmployee(ctx context.Context, id int64, f EmployeeFields) (Employee, error) {
	e, err := s.FindEmployee(ctx, id)
	if err != nil {
		return e, err
	}
	bad := f.apply(&e)
	if err := validateEmployee(e, bad); err != nil {
		return e, err
	}
	e.UpdatedAt = s.Now().UTC()
	_, err = s.DB.ExecContext(ctx, `UPDATE employees SET person_id = ?, title = ?, job_code = ?, job_level = ?, seniority = ?,
		manager_id = ?, is_manager = ?, country = ?, personnel_area = ?, company = ?, data_version_id = ?, name = ?, updated_at = ?
		WHERE id = ?`, e.PersonID, e.Title, e.JobCode, e.JobLevel, e.Seniority, e.ManagerID, e.IsManager, e.Country,
		e.PersonnelArea, e.Company, e.DataVersionID, e.Name, e.UpdatedAt.Format(TimeLayout), id)
	return e, err
}

// DeleteEmployee deletes an employee and their team memberships.
func (s *Store) DeleteEmployee(ctx context.Context, id int64) error {
	return s.Tx(ctx, func(tx *sql.Tx) error {
		if _, err := tx.ExecContext(ctx, `DELETE FROM teams_employees WHERE employee_id = ?`, id); err != nil {
			return err
		}
		res, err := tx.ExecContext(ctx, `DELETE FROM employees WHERE id = ?`, id)
		if err != nil {
			return err
		}
		if n, _ := res.RowsAffected(); n == 0 {
			return ErrNotFound
		}
		return nil
	})
}

// DeleteVersionEmployees deletes every employee of a version, with their
// team memberships, and returns how many employees were deleted.
func (s *Store) DeleteVersionEmployees(ctx context.Context, versionID int64) (int64, error) {
	var n int64
	err := s.Tx(ctx, func(tx *sql.Tx) error {
		if _, err := tx.ExecContext(ctx, `DELETE FROM teams_employees WHERE employee_id IN (SELECT id FROM employees WHERE data_version_id = ?)`, versionID); err != nil {
			return err
		}
		res, err := tx.ExecContext(ctx, `DELETE FROM employees WHERE data_version_id = ?`, versionID)
		if err != nil {
			return err
		}
		n, err = res.RowsAffected()
		return err
	})
	return n, err
}

func placeholders(n int) string {
	if n == 0 {
		return "NULL"
	}
	return strings.TrimSuffix(strings.Repeat("?, ", n), ", ")
}
