package store

import (
	"context"
	"database/sql"
	"errors"
	"strconv"
	"strings"
)

func collectTeams(rows *sql.Rows) ([]Team, error) {
	defer rows.Close()
	var out []Team
	for rows.Next() {
		t, err := scanTeam(rows)
		if err != nil {
			return nil, err
		}
		out = append(out, t)
	}
	return out, rows.Err()
}

// TeamSortColumns are the columns the team list can be sorted by.
var TeamSortColumns = []string{"name", "member_count", "manager_count", "children", "descendents", "org_member_count", "team_health"}

// TeamFilter narrows the team list.
type TeamFilter struct {
	Depth, ParentID, Search string
	Sort, Direction         string
}

// ListTeams returns a page of a version's teams and the total matching.
func (s *Store) ListTeams(ctx context.Context, versionID int64, f TeamFilter, page, perPage int) ([]Team, int, error) {
	where := ` WHERE teams.data_version_id = ?`
	args := []any{versionID}
	if f.Depth != "" {
		where += ` AND teams.depth = ?`
		args = append(args, f.Depth)
	}
	if f.ParentID != "" {
		where += ` AND teams.parent_id = ?`
		args = append(args, f.ParentID)
	}
	if f.Search != "" {
		where += ` AND (name LIKE ?)`
		args = append(args, "%"+f.Search+"%")
	}
	var total int
	if err := s.DB.QueryRowContext(ctx, `SELECT COUNT(*) FROM teams`+where, args...).Scan(&total); err != nil {
		return nil, 0, err
	}
	sort := "name"
	for _, c := range TeamSortColumns {
		if c == f.Sort {
			sort = c
		}
	}
	dir := "asc"
	if strings.EqualFold(f.Direction, "desc") {
		dir = "desc"
	}
	rows, err := s.DB.QueryContext(ctx, `SELECT `+teamCols+` FROM teams`+where+` ORDER BY `+sort+` `+dir+` LIMIT ? OFFSET ?`,
		append(args, perPage, (page-1)*perPage)...)
	if err != nil {
		return nil, 0, err
	}
	list, err := collectTeams(rows)
	return list, total, err
}

// FindTeam returns a team in a version.
func (s *Store) FindTeam(ctx context.Context, versionID, id int64) (Team, error) {
	t, err := scanTeam(s.DB.QueryRowContext(ctx, `SELECT `+teamCols+` FROM teams WHERE data_version_id = ? AND id = ?`, versionID, id))
	if errors.Is(err, sql.ErrNoRows) {
		return t, ErrNotFound
	}
	return t, err
}

// FindAnyTeam returns a team in any version.
func (s *Store) FindAnyTeam(ctx context.Context, id int64) (Team, error) {
	t, err := scanTeam(s.DB.QueryRowContext(ctx, `SELECT `+teamCols+` FROM teams WHERE id = ?`, id))
	if errors.Is(err, sql.ErrNoRows) {
		return t, ErrNotFound
	}
	return t, err
}

// Parent returns t's parent team.
func (s *Store) Parent(ctx context.Context, t Team) (Team, bool, error) {
	if !t.ParentID.Valid {
		return Team{}, false, nil
	}
	p, err := s.FindAnyTeam(ctx, t.ParentID.Int64)
	if errors.Is(err, ErrNotFound) {
		return p, false, nil
	}
	return p, err == nil, err
}

// SubTeams returns a team's children in a version, largest org first.
func (s *Store) SubTeams(ctx context.Context, versionID, parentID int64, orderBySize bool) ([]Team, error) {
	q := `SELECT ` + teamCols + ` FROM teams WHERE parent_id = ? AND data_version_id = ?`
	if orderBySize {
		q += ` ORDER BY org_member_count desc`
	}
	rows, err := s.DB.QueryContext(ctx, q, parentID, versionID)
	if err != nil {
		return nil, err
	}
	return collectTeams(rows)
}

// ChildTeams returns a team's children in any version.
func (s *Store) ChildTeams(ctx context.Context, parentID int64) ([]Team, error) {
	rows, err := s.DB.QueryContext(ctx, `SELECT `+teamCols+` FROM teams WHERE parent_id = ?`, parentID)
	if err != nil {
		return nil, err
	}
	return collectTeams(rows)
}

// RootTeams returns a version's top-level teams.
func (s *Store) RootTeams(ctx context.Context, versionID int64) ([]Team, error) {
	rows, err := s.DB.QueryContext(ctx, `SELECT `+teamCols+` FROM teams WHERE parent_id IS NULL AND data_version_id = ?`, versionID)
	if err != nil {
		return nil, err
	}
	return collectTeams(rows)
}

// MemberSortColumns are the columns a team's member list can be sorted by.
var MemberSortColumns = []string{"employees.person_id", "employees.title", "employees.job_code", "employees.seniority",
	"employees.manager_id", "employees.country"}

// TeamMembers returns a team's memberships in a version with their employees.
// sort must be one of MemberSortColumns (else person id); dir asc or desc.
func (s *Store) TeamMembers(ctx context.Context, versionID, teamID int64, sort, dir string) ([]TeamMember, error) {
	order := ""
	if sort != "" {
		col := "employees.person_id"
		for _, c := range MemberSortColumns {
			if c == sort {
				col = c
			}
		}
		d := "asc"
		if strings.EqualFold(dir, "desc") {
			d = "desc"
		}
		order = ` ORDER BY ` + col + ` ` + d
	}
	rows, err := s.DB.QueryContext(ctx, `SELECT teams_employees.id, teams_employees.team_id, teams_employees.employee_id,
		teams_employees.allocation, teams_employees.data_version_id, teams_employees.created_at, teams_employees.updated_at, `+employeeCols+`
		FROM teams_employees LEFT OUTER JOIN employees ON employees.id = teams_employees.employee_id
		WHERE teams_employees.team_id = ? AND teams_employees.data_version_id = ?`+order, teamID, versionID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []TeamMember
	for rows.Next() {
		var m TeamMember
		var created, updated, ecreated, eupdated sql.NullString
		e := &m.Employee
		if err := rows.Scan(&m.ID, &m.TeamID, &m.EmployeeID, &m.Allocation, &m.DataVersionID, &created, &updated,
			&e.ID, &e.PersonID, &e.Title, &e.JobCode, &e.JobLevel, &e.Seniority, &e.ManagerID, &e.IsManager,
			&e.Country, &e.PersonnelArea, &e.Company, &e.DataVersionID, &ecreated, &eupdated, &e.Name, &e.JobFamily,
			&e.EmployeeType, &e.StartDate); err != nil {
			return nil, err
		}
		m.CreatedAt, m.UpdatedAt = parseTime(created), parseTime(updated)
		e.CreatedAt, e.UpdatedAt = parseTime(ecreated), parseTime(eupdated)
		e.StartDate = dateOnly(e.StartDate)
		out = append(out, m)
	}
	return out, rows.Err()
}

// MembershipCount counts a team's memberships in every version.
func (s *Store) MembershipCount(ctx context.Context, teamID int64) (int, error) {
	var n int
	err := s.DB.QueryRowContext(ctx, `SELECT COUNT(*) FROM teams_employees WHERE team_id = ?`, teamID).Scan(&n)
	return n, err
}

// DescendantIDs returns the ids of every team below t, breadth first.
func (s *Store) DescendantIDs(ctx context.Context, t Team) ([]int64, error) {
	var ids []int64
	queue := []int64{t.ID}
	for len(queue) > 0 {
		args := []any{t.DataVersionID}
		for _, id := range queue {
			args = append(args, id)
		}
		rows, err := s.DB.QueryContext(ctx, `SELECT id FROM teams WHERE data_version_id IS ? AND parent_id IN (`+placeholders(len(queue))+`)`, args...)
		if err != nil {
			return nil, err
		}
		var batch []int64
		for rows.Next() {
			var id int64
			if err := rows.Scan(&id); err != nil {
				rows.Close()
				return nil, err
			}
			batch = append(batch, id)
		}
		rows.Close()
		ids = append(ids, batch...)
		queue = batch
	}
	return ids, nil
}

// SubtreeIDs returns the ids of the version's teams at path or below it,
// matched by full path as the Rails reports do.
func (s *Store) SubtreeIDs(ctx context.Context, versionID int64, path string) ([]int64, error) {
	rows, err := s.DB.QueryContext(ctx, `SELECT teams.id FROM teams WHERE ((full_path = ? OR full_path LIKE ?) AND data_version_id = ?)`,
		path, path+" > %", versionID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	ids := []int64{}
	for rows.Next() {
		var id int64
		if err := rows.Scan(&id); err != nil {
			return nil, err
		}
		ids = append(ids, id)
	}
	return ids, rows.Err()
}

// MoveCandidates returns the teams t can be moved under: every team in its
// version except t and its descendants, by full path.
func (s *Store) MoveCandidates(ctx context.Context, versionID int64, t Team) ([]Team, error) {
	excluded, err := s.DescendantIDs(ctx, t)
	if err != nil {
		return nil, err
	}
	excluded = append([]int64{t.ID}, excluded...)
	args := []any{versionID}
	for _, id := range excluded {
		args = append(args, id)
	}
	rows, err := s.DB.QueryContext(ctx, `SELECT `+teamCols+` FROM teams WHERE data_version_id = ? AND id NOT IN (`+
		placeholders(len(excluded))+`) ORDER BY full_path ASC`, args...)
	if err != nil {
		return nil, err
	}
	return collectTeams(rows)
}

// ErrMoveIntoSelf is returned when a team would move under itself or a
// descendant.
var ErrMoveIntoSelf = errors.New("Cannot move a team to itself or its own descendant")

// MoveTeam puts t under newParent (nil for a root team), rewriting the
// full paths and depths of t and everything below it, then rebuilds the
// version's team stats.
func (s *Store) MoveTeam(ctx context.Context, versionID int64, t Team, newParent *Team) error {
	newDepth := int64(1)
	newPath := t.Name
	if newParent != nil {
		desc, err := s.DescendantIDs(ctx, t)
		if err != nil {
			return err
		}
		for _, id := range desc {
			if id == newParent.ID {
				return ErrMoveIntoSelf
			}
		}
		if newParent.ID == t.ID {
			return ErrMoveIntoSelf
		}
		newDepth = newParent.Depth.Int64 + 1
		newPath = newParent.FullPath + PathSeparator + t.Name
	}
	oldPath := t.FullPath
	delta := newDepth - t.Depth.Int64
	err := s.Tx(ctx, func(tx *sql.Tx) error {
		if _, err := tx.ExecContext(ctx, `UPDATE teams SET full_path = REPLACE(full_path, ?, ?), depth = depth + ?
			WHERE teams.data_version_id = ? AND (full_path LIKE ? ESCAPE '!')`,
			oldPath+" >", newPath+" >", delta, versionID, likeEscape(oldPath)+" > %"); err != nil {
			return err
		}
		var parent any
		if newParent != nil {
			parent = newParent.ID
		}
		_, err := tx.ExecContext(ctx, `UPDATE teams SET parent_id = ?, full_path = ?, depth = ?, updated_at = ? WHERE id = ?`,
			parent, newPath, newDepth, s.timestamp(), t.ID)
		return err
	})
	if err != nil {
		return err
	}
	return s.BuildTeamStats(ctx, versionID)
}

// likeEscape escapes LIKE wildcards with '!', as Rails' sanitize_sql_like.
func likeEscape(s string) string {
	r := strings.NewReplacer("!", "!!", "%", "!%", "_", "!_")
	return r.Replace(s)
}

// TeamFields are the editable team fields, as submitted; nil leaves a field.
type TeamFields struct {
	Name, FullPath, ParentID, Depth, PrettyName *string
}

func (f TeamFields) apply(t *Team) {
	if f.Name != nil {
		t.Name = *f.Name
	}
	if f.FullPath != nil {
		t.FullPath = *f.FullPath
	}
	if f.PrettyName != nil {
		t.PrettyName = sql.NullString{String: *f.PrettyName, Valid: true}
	}
	parseInt := func(v *string) sql.NullInt64 {
		if n, err := strconv.ParseInt(strings.TrimSpace(*v), 10, 64); err == nil {
			return sql.NullInt64{Int64: n, Valid: true}
		}
		return sql.NullInt64{}
	}
	if f.ParentID != nil {
		t.ParentID = parseInt(f.ParentID)
	}
	if f.Depth != nil {
		t.Depth = parseInt(f.Depth)
	}
}

func validateTeam(t Team) error {
	var errs ValidationErrors
	if strings.TrimSpace(t.Name) == "" {
		errs = append(errs, "Name can't be blank")
	}
	if strings.TrimSpace(t.FullPath) == "" {
		errs = append(errs, "Full path can't be blank")
	}
	if len(errs) > 0 {
		return errs
	}
	return nil
}

// CreateTeam validates and inserts a team in a version.
func (s *Store) CreateTeam(ctx context.Context, versionID int64, f TeamFields) (Team, error) {
	t := Team{TeamHealth: "green", TeamHealthDetails: "(green)", Depth: sql.NullInt64{Valid: true}}
	f.apply(&t)
	t.DataVersionID = sql.NullInt64{Int64: versionID, Valid: true}
	if err := validateTeam(t); err != nil {
		return t, err
	}
	now := s.Now().UTC()
	t.CreatedAt, t.UpdatedAt = now, now
	res, err := s.DB.ExecContext(ctx, `INSERT INTO teams (name, parent_id, full_path, depth, data_version_id, created_at, updated_at, pretty_name)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, t.Name, t.ParentID, t.FullPath, t.Depth, t.DataVersionID,
		now.Format(TimeLayout), now.Format(TimeLayout), t.PrettyName)
	if err != nil {
		return t, err
	}
	t.ID, err = res.LastInsertId()
	return t, err
}

// UpdateTeam validates and saves changes to a team.
func (s *Store) UpdateTeam(ctx context.Context, t Team, f TeamFields) (Team, error) {
	f.apply(&t)
	if err := validateTeam(t); err != nil {
		return t, err
	}
	t.UpdatedAt = s.Now().UTC()
	_, err := s.DB.ExecContext(ctx, `UPDATE teams SET name = ?, parent_id = ?, full_path = ?, depth = ?, pretty_name = ?, updated_at = ? WHERE id = ?`,
		t.Name, t.ParentID, t.FullPath, t.Depth, t.PrettyName, t.UpdatedAt.Format(TimeLayout), t.ID)
	return t, err
}

// DeleteTeam deletes a team and its memberships.
func (s *Store) DeleteTeam(ctx context.Context, id int64) error {
	return s.Tx(ctx, func(tx *sql.Tx) error {
		if _, err := tx.ExecContext(ctx, `DELETE FROM teams_employees WHERE team_id = ?`, id); err != nil {
			return err
		}
		_, err := tx.ExecContext(ctx, `DELETE FROM teams WHERE id = ?`, id)
		return err
	})
}
