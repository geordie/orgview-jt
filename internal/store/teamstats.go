package store

import (
	"context"
	"database/sql"
	"strings"
)

// ResetTeamStats zeroes a version's team counts before a rebuild.
func (s *Store) ResetTeamStats(ctx context.Context, versionID int64) error {
	_, err := s.DB.ExecContext(ctx, `UPDATE teams SET children = 0, descendents = 0, member_count = 0, manager_count = 0,
		team_health = 'green' WHERE teams.data_version_id = ?`, versionID)
	return err
}

type teamStat struct {
	id                                                               int64
	parentID                                                         sql.NullInt64
	children, descendents, memberCount, orgMemberCount, managerCount int
	health                                                           string
	details                                                          []string
}

// BuildTeamStats recomputes every team's member, manager, sub-team and
// descendant counts and its health for a version.
func (s *Store) BuildTeamStats(ctx context.Context, versionID int64) error {
	rows, err := s.DB.QueryContext(ctx, `SELECT id, parent_id FROM teams WHERE data_version_id = ?`, versionID)
	if err != nil {
		return err
	}
	var teams []*teamStat
	byID := map[int64]*teamStat{}
	for rows.Next() {
		t := &teamStat{}
		if err := rows.Scan(&t.id, &t.parentID); err != nil {
			rows.Close()
			return err
		}
		teams = append(teams, t)
		byID[t.id] = t
	}
	rows.Close()
	if err := rows.Err(); err != nil {
		return err
	}

	counts := func(q string) (map[int64]int, error) {
		rows, err := s.DB.QueryContext(ctx, q, versionID, versionID)
		if err != nil {
			return nil, err
		}
		defer rows.Close()
		out := map[int64]int{}
		for rows.Next() {
			var id int64
			var n int
			if err := rows.Scan(&id, &n); err != nil {
				return nil, err
			}
			out[id] = n
		}
		return out, rows.Err()
	}
	members, err := counts(`SELECT team_id, COUNT(*) FROM teams_employees WHERE data_version_id = ? AND ? IS NOT NULL GROUP BY team_id`)
	if err != nil {
		return err
	}
	managers, err := counts(`SELECT teams_employees.team_id, COUNT(*) FROM teams_employees
		INNER JOIN employees ON employees.id = teams_employees.employee_id
		WHERE teams_employees.data_version_id = ? AND employees.is_manager = 1 AND employees.data_version_id = ?
		GROUP BY teams_employees.team_id`)
	if err != nil {
		return err
	}
	children, err := counts(`SELECT parent_id, COUNT(*) FROM teams WHERE data_version_id = ? AND ? IS NOT NULL AND parent_id IS NOT NULL GROUP BY parent_id`)
	if err != nil {
		return err
	}

	for _, t := range teams {
		t.memberCount = members[t.id]
		t.orgMemberCount = t.memberCount
		t.managerCount = managers[t.id]
		t.children = children[t.id]
	}
	// Children in load order, as the Rails version walks them.
	kids := map[int64][]*teamStat{}
	for _, t := range teams {
		if t.parentID.Valid {
			kids[t.parentID.Int64] = append(kids[t.parentID.Int64], t)
		}
	}
	var walk func(t *teamStat, seen map[int64]bool)
	walk = func(t *teamStat, seen map[int64]bool) {
		t.descendents = 0
		seen[t.id] = true
		for _, c := range kids[t.id] {
			if seen[c.id] {
				continue
			}
			t.descendents++
			walk(c, seen)
			t.descendents += c.descendents
			t.orgMemberCount += c.orgMemberCount
		}
	}
	for _, t := range teams {
		if !t.parentID.Valid {
			walk(t, map[int64]bool{})
		}
	}
	for _, t := range teams {
		t.health, t.details = teamHealth(t.memberCount, t.managerCount, t.children)
	}
	if len(teams) == 0 {
		return nil
	}
	return s.Tx(ctx, func(tx *sql.Tx) error {
		stmt, err := tx.PrepareContext(ctx, `UPDATE teams SET children = ?, descendents = ?, member_count = ?, manager_count = ?,
			org_member_count = ?, team_health = ?, team_health_details = ? WHERE id = ? AND data_version_id = ?`)
		if err != nil {
			return err
		}
		defer stmt.Close()
		for _, t := range teams {
			if _, err := stmt.ExecContext(ctx, t.children, t.descendents, t.memberCount, t.managerCount, t.orgMemberCount,
				t.health, strings.Join(t.details, " | "), t.id, versionID); err != nil {
				return err
			}
		}
		return nil
	})
}

// teamHealth rates a team green, amber or red by its size, number of
// managers and number of sub-teams, with the reasons.
func teamHealth(members, managers, children int) (string, []string) {
	health := "green"
	details := []string{}
	worsen := func(to string) {
		if health == "green" || (health == "amber" && to == "red") {
			health = to
		}
	}
	switch {
	case members > 15:
		worsen("red")
		details = append(details, "Large Team Size (red)")
	case members >= 13 && members <= 15:
		worsen("amber")
		details = append(details, "Large Team Size (amber)")
	case members >= 3 && members <= 4:
		worsen("amber")
		details = append(details, "Small Team Size (amber)")
	case members >= 1 && members <= 2:
		worsen("red")
		details = append(details, "Small Team Size (red)")
	}
	switch {
	case managers > 3:
		worsen("red")
		details = append(details, "Multiple Managers (red)")
	case managers == 3:
		worsen("amber")
		details = append(details, "Multiple Managers (amber)")
	}
	switch {
	case children > 12:
		worsen("red")
		details = append(details, "Many Sub-Teams (red)")
	case children >= 10 && children <= 12:
		worsen("amber")
		details = append(details, "Many Sub-Teams (amber)")
	case children >= 1 && children <= 2:
		worsen("amber")
		details = append(details, "Few Sub-Teams (amber)")
	}
	return health, details
}
