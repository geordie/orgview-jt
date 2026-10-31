package store

import (
	"database/sql"
	"encoding/json"
	"time"
)

// DataVersion is one snapshot of the org. Exactly one is active at a time.
type DataVersion struct {
	ID           int64
	Name         string
	Description  sql.NullString
	SnapshotDate time.Time
	IsActive     bool
	Status       string
	Metadata     sql.NullString
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

const dataVersionCols = `data_versions.id, data_versions.name, data_versions.description, data_versions.snapshot_date,
	data_versions.is_active, data_versions.status, data_versions.metadata, data_versions.created_at, data_versions.updated_at`

func scanDataVersion(row interface{ Scan(...any) error }) (DataVersion, error) {
	var v DataVersion
	var snap, created, updated sql.NullString
	err := row.Scan(&v.ID, &v.Name, &v.Description, &snap, &v.IsActive, &v.Status, &v.Metadata, &created, &updated)
	v.SnapshotDate, v.CreatedAt, v.UpdatedAt = parseTime(snap), parseTime(created), parseTime(updated)
	return v, err
}

// Employee is a person in one data version. ManagerID holds the manager's
// PersonID, not their row id.
type Employee struct {
	ID            int64
	PersonID      string
	Title         sql.NullString
	JobCode       sql.NullString
	JobLevel      sql.NullString
	Seniority     sql.NullInt64
	ManagerID     sql.NullString
	IsManager     sql.NullBool
	Country       sql.NullString
	PersonnelArea sql.NullString
	Company       sql.NullString
	DataVersionID sql.NullInt64
	CreatedAt     time.Time
	UpdatedAt     time.Time
	Name          sql.NullString
	JobFamily     sql.NullString
	EmployeeType  sql.NullString
	StartDate     sql.NullString
}

// DisplayName falls back to PersonID for employees imported without a name.
func (e Employee) DisplayName() string {
	if Present(e.Name) {
		return e.Name.String
	}
	return e.PersonID
}

const employeeCols = `employees.id, employees.person_id, employees.title, employees.job_code, employees.job_level,
	employees.seniority, employees.manager_id, employees.is_manager, employees.country, employees.personnel_area,
	employees.company, employees.data_version_id, employees.created_at, employees.updated_at, employees.name,
	employees.job_family, employees.employee_type, employees.start_date`

func scanEmployee(row interface{ Scan(...any) error }) (Employee, error) {
	var e Employee
	var created, updated sql.NullString
	err := row.Scan(&e.ID, &e.PersonID, &e.Title, &e.JobCode, &e.JobLevel, &e.Seniority, &e.ManagerID, &e.IsManager,
		&e.Country, &e.PersonnelArea, &e.Company, &e.DataVersionID, &created, &updated, &e.Name, &e.JobFamily,
		&e.EmployeeType, &e.StartDate)
	e.CreatedAt, e.UpdatedAt = parseTime(created), parseTime(updated)
	e.StartDate = dateOnly(e.StartDate)
	return e, err
}

// dateOnly trims a date column to YYYY-MM-DD. The driver returns DATE
// columns as times, which scan into strings with a time part.
func dateOnly(d sql.NullString) sql.NullString {
	if d.Valid && len(d.String) > 10 {
		d.String = d.String[:10]
	}
	return d
}

// MarshalJSON matches the attribute JSON Rails renders for an employee.
func (e Employee) MarshalJSON() ([]byte, error) {
	return json.Marshal(orderedJSON{
		{"id", e.ID},
		{"person_id", e.PersonID},
		{"title", nullStr(e.Title)},
		{"job_code", nullStr(e.JobCode)},
		{"job_level", nullStr(e.JobLevel)},
		{"seniority", nullInt(e.Seniority)},
		{"manager_id", nullStr(e.ManagerID)},
		{"is_manager", nullBool(e.IsManager)},
		{"country", nullStr(e.Country)},
		{"personnel_area", nullStr(e.PersonnelArea)},
		{"company", nullStr(e.Company)},
		{"data_version_id", nullInt(e.DataVersionID)},
		{"created_at", jsonTime(e.CreatedAt)},
		{"updated_at", jsonTime(e.UpdatedAt)},
		{"name", nullStr(e.Name)},
		{"job_family", nullStr(e.JobFamily)},
		{"employee_type", nullStr(e.EmployeeType)},
		{"start_date", nullStr(e.StartDate)},
	})
}

// Team is a node in the team tree of one data version. FullPath is the
// names from the root down, joined by PathSeparator.
type Team struct {
	ID                int64
	Name              string
	ParentID          sql.NullInt64
	FullPath          string
	Depth             sql.NullInt64
	Children          int64
	Descendents       int64
	MemberCount       int64
	OrgMemberCount    int64
	ManagerCount      int64
	TeamHealth        string
	TeamHealthDetails string
	DataVersionID     sql.NullInt64
	CreatedAt         time.Time
	UpdatedAt         time.Time
	PrettyName        sql.NullString
}

// DisplayName is the pretty name when set, else the name.
func (t Team) DisplayName() string {
	if Present(t.PrettyName) {
		return t.PrettyName.String
	}
	return t.Name
}

// PathSeparator separates segments of Team.FullPath.
const PathSeparator = " > "

const teamCols = `teams.id, teams.name, teams.parent_id, teams.full_path, teams.depth, teams.children, teams.descendents,
	teams.member_count, teams.org_member_count, teams.manager_count, teams.team_health, teams.team_health_details,
	teams.data_version_id, teams.created_at, teams.updated_at, teams.pretty_name`

func scanTeam(row interface{ Scan(...any) error }) (Team, error) {
	var t Team
	var created, updated sql.NullString
	err := row.Scan(&t.ID, &t.Name, &t.ParentID, &t.FullPath, &t.Depth, &t.Children, &t.Descendents, &t.MemberCount,
		&t.OrgMemberCount, &t.ManagerCount, &t.TeamHealth, &t.TeamHealthDetails, &t.DataVersionID, &created, &updated,
		&t.PrettyName)
	t.CreatedAt, t.UpdatedAt = parseTime(created), parseTime(updated)
	return t, err
}

// MarshalJSON matches the attribute JSON Rails renders for a team.
func (t Team) MarshalJSON() ([]byte, error) {
	return json.Marshal(orderedJSON{
		{"id", t.ID},
		{"name", t.Name},
		{"parent_id", nullInt(t.ParentID)},
		{"full_path", t.FullPath},
		{"depth", nullInt(t.Depth)},
		{"children", t.Children},
		{"descendents", t.Descendents},
		{"member_count", t.MemberCount},
		{"org_member_count", t.OrgMemberCount},
		{"manager_count", t.ManagerCount},
		{"team_health", t.TeamHealth},
		{"team_health_details", t.TeamHealthDetails},
		{"data_version_id", nullInt(t.DataVersionID)},
		{"created_at", jsonTime(t.CreatedAt)},
		{"updated_at", jsonTime(t.UpdatedAt)},
		{"pretty_name", nullStr(t.PrettyName)},
	})
}

// TeamMember is a teams_employees row with its employee.
type TeamMember struct {
	ID            int64
	TeamID        int64
	EmployeeID    int64
	Allocation    sql.NullFloat64
	DataVersionID sql.NullInt64
	CreatedAt     time.Time
	UpdatedAt     time.Time
	Employee      Employee
}

// MarshalJSON matches Rails' to_json(include: :employee).
func (m TeamMember) MarshalJSON() ([]byte, error) {
	var alloc any
	if m.Allocation.Valid {
		alloc = m.Allocation.Float64
	}
	return json.Marshal(orderedJSON{
		{"id", m.ID},
		{"team_id", m.TeamID},
		{"employee_id", m.EmployeeID},
		{"allocation", alloc},
		{"data_version_id", nullInt(m.DataVersionID)},
		{"created_at", jsonTime(m.CreatedAt)},
		{"updated_at", jsonTime(m.UpdatedAt)},
		{"employee", m.Employee},
	})
}

// Present reports whether s is set and not blank, like Rails' present?.
func Present(s sql.NullString) bool {
	if !s.Valid {
		return false
	}
	for _, r := range s.String {
		if r != ' ' && r != '\t' && r != '\n' && r != '\r' && r != '\f' && r != '\v' {
			return true
		}
	}
	return false
}

func nullStr(s sql.NullString) any {
	if s.Valid {
		return s.String
	}
	return nil
}

func nullInt(n sql.NullInt64) any {
	if n.Valid {
		return n.Int64
	}
	return nil
}

func nullBool(b sql.NullBool) any {
	if b.Valid {
		return b.Bool
	}
	return nil
}

func jsonTime(t time.Time) string { return t.UTC().Format("2006-01-02T15:04:05.000Z") }

// orderedJSON marshals as an object with keys in the given order.
type orderedJSON []struct {
	k string
	v any
}

func (o orderedJSON) MarshalJSON() ([]byte, error) {
	buf := []byte{'{'}
	for i, kv := range o {
		if i > 0 {
			buf = append(buf, ',')
		}
		k, _ := json.Marshal(kv.k)
		v, err := json.Marshal(kv.v)
		if err != nil {
			return nil, err
		}
		buf = append(buf, k...)
		buf = append(buf, ':')
		buf = append(buf, v...)
	}
	return append(buf, '}'), nil
}
