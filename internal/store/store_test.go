package store_test

import (
	"context"
	"database/sql"
	"errors"
	"os"
	"path/filepath"
	"slices"
	"strings"
	"testing"

	"github.com/geordie/orgview-jt/internal/store"
	"github.com/geordie/orgview-jt/internal/store/storetest"
)

var ctx = context.Background()

func TestOpenCreatesSchemaRailsCanUse(t *testing.T) {
	st := storetest.Open(t)
	v, ok, err := st.ActiveVersion(ctx)
	if err != nil || !ok {
		t.Fatalf("active version: %v %v", ok, err)
	}
	if v.Name != "initial" || v.Status != "active" {
		t.Errorf("initial version = %+v", v)
	}
	var n int
	if err := st.DB.QueryRow(`SELECT COUNT(*) FROM schema_migrations WHERE version = '20261031000000'`).Scan(&n); err != nil || n != 1 {
		t.Errorf("latest Rails migration not recorded: %d %v", n, err)
	}
}

func TestOpenRefusesOutdatedSchema(t *testing.T) {
	path := filepath.Join(t.TempDir(), "old.sqlite3")
	st, err := store.Open(path)
	if err != nil {
		t.Fatal(err)
	}
	storetest.Exec(t, st, `DELETE FROM schema_migrations WHERE version = '20261031000000'`)
	st.Close()
	if _, err := store.Open(path); err == nil || !strings.Contains(err.Error(), "rake db:migrate") {
		t.Fatalf("want an outdated-schema error, got %v", err)
	}
}

// Text columns compare without regard to case, as MySQL's collation did.
func TestCollationIgnoresCase(t *testing.T) {
	st := storetest.OpenWithFixtures(t)
	for _, pid := range []string{"C1", "C2"} {
		title := "Collation Engineer"
		if pid == "C2" {
			title = "collation engineer"
		}
		storetest.Exec(t, st, `INSERT INTO employees (person_id, title, job_code, seniority, data_version_id, created_at, updated_at)
			VALUES (?, ?, 'J1', 1, 1, '2026-01-01', '2026-01-01')`, pid, title)
	}
	n, err := st.Count(ctx, `SELECT COUNT(*) FROM employees WHERE title = 'COLLATION ENGINEER'`)
	if err != nil || n != 2 {
		t.Errorf("equality: %d %v", n, err)
	}
	gs, err := st.GroupCounts(ctx, `SELECT title, COUNT(*) FROM employees WHERE title LIKE 'collation%' GROUP BY title`)
	if err != nil || len(gs) != 1 || gs[0].Count != 2 {
		t.Errorf("grouping: %+v %v", gs, err)
	}
	storetest.Exec(t, st, `INSERT INTO employees (person_id, title, job_code, seniority, manager_id, data_version_id, created_at, updated_at)
		VALUES ('C3', 'Report', 'J1', 1, 'c1', 1, '2026-01-01', '2026-01-01')`)
	mgr, err := st.EmployeesByPersonID(ctx, sql.NullInt64{Int64: 1, Valid: true}, []string{"C1"})
	if err != nil {
		t.Fatal(err)
	}
	reports, err := st.DirectReports(ctx, mgr["c1"])
	if err != nil || len(reports) != 1 || reports[0].PersonID != "C3" {
		t.Errorf("manager match: %+v %v", reports, err)
	}
}

func TestSubtreeMatchesWholeSegments(t *testing.T) {
	st := storetest.OpenWithFixtures(t)
	storetest.Exec(t, st, `INSERT INTO teams (name, full_path, depth, data_version_id, created_at, updated_at) VALUES
		('Eng', 'Eng', 1, 1, '2026-01-01', '2026-01-01')`)
	ids, err := st.SubtreeIDs(ctx, 1, "Eng")
	if err != nil {
		t.Fatal(err)
	}
	if len(ids) != 1 {
		t.Errorf("Eng subtree = %v, want only Eng itself", ids)
	}
	ids, err = st.SubtreeIDs(ctx, 1, "Engineering")
	if err != nil {
		t.Fatal(err)
	}
	slices.Sort(ids)
	if !slices.Equal(ids, []int64{1, 2, 3}) {
		t.Errorf("Engineering subtree = %v", ids)
	}
}

func TestMoveTeamRewritesPathsAndRefusesLoops(t *testing.T) {
	st := storetest.OpenWithFixtures(t)
	eng, _ := st.FindTeam(ctx, 1, 1)
	front, _ := st.FindTeam(ctx, 1, 2)
	lead, _ := st.FindTeam(ctx, 1, 4)

	if err := st.MoveTeam(ctx, 1, eng, &front); !errors.Is(err, store.ErrMoveIntoSelf) {
		t.Errorf("move under descendant: %v", err)
	}
	if err := st.MoveTeam(ctx, 1, eng, &eng); !errors.Is(err, store.ErrMoveIntoSelf) {
		t.Errorf("move under itself: %v", err)
	}
	if err := st.MoveTeam(ctx, 1, eng, &lead); err != nil {
		t.Fatal(err)
	}
	for id, want := range map[int64]string{1: "Leadership > Engineering", 2: "Leadership > Engineering > Frontend", 3: "Leadership > Engineering > Backend"} {
		got, _ := st.FindTeam(ctx, 1, id)
		if got.FullPath != want {
			t.Errorf("team %d path = %q, want %q", id, got.FullPath, want)
		}
	}
	front, _ = st.FindTeam(ctx, 1, 2)
	if front.Depth.Int64 != 3 {
		t.Errorf("frontend depth = %d", front.Depth.Int64)
	}
	lead, _ = st.FindTeam(ctx, 1, 4)
	if lead.Children != 1 || lead.Descendents != 3 {
		t.Errorf("stats not rebuilt: children %d descendents %d", lead.Children, lead.Descendents)
	}

	// Back to the root.
	eng, _ = st.FindTeam(ctx, 1, 1)
	if err := st.MoveTeam(ctx, 1, eng, nil); err != nil {
		t.Fatal(err)
	}
	eng, _ = st.FindTeam(ctx, 1, 1)
	if eng.FullPath != "Engineering" || eng.ParentID.Valid || eng.Depth.Int64 != 1 {
		t.Errorf("root move: %+v", eng)
	}
}

func TestMoveTeamEscapesWildcards(t *testing.T) {
	st := storetest.Open(t)
	storetest.Exec(t, st, `INSERT INTO teams (id, name, full_path, depth, parent_id, data_version_id, created_at, updated_at) VALUES
		(1, 'R_D', 'R_D', 1, NULL, 1, 'x', 'x'), (2, 'Labs', 'R_D > Labs', 2, 1, 1, 'x', 'x'),
		(3, 'RxD', 'RxD', 1, NULL, 1, 'x', 'x'), (4, 'Ops', 'RxD > Ops', 2, 3, 1, 'x', 'x'),
		(5, 'New', 'New', 1, NULL, 1, 'x', 'x')`)
	rd, _ := st.FindTeam(ctx, 1, 1)
	newTeam, _ := st.FindTeam(ctx, 1, 5)
	if err := st.MoveTeam(ctx, 1, rd, &newTeam); err != nil {
		t.Fatal(err)
	}
	ops, _ := st.FindTeam(ctx, 1, 4)
	if ops.FullPath != "RxD > Ops" {
		t.Errorf("RxD > Ops was rewritten to %q", ops.FullPath)
	}
	labs, _ := st.FindTeam(ctx, 1, 2)
	if labs.FullPath != "New > R_D > Labs" {
		t.Errorf("labs = %q", labs.FullPath)
	}
}

func TestBuildTeamStats(t *testing.T) {
	st := storetest.OpenWithFixtures(t)
	if err := st.ResetTeamStats(ctx, 1); err != nil {
		t.Fatal(err)
	}
	if err := st.BuildTeamStats(ctx, 1); err != nil {
		t.Fatal(err)
	}
	eng, _ := st.FindTeam(ctx, 1, 1)
	// Engineering: CTO and manager (both managers), one engineer below.
	if eng.MemberCount != 2 || eng.ManagerCount != 2 || eng.OrgMemberCount != 3 || eng.Children != 2 || eng.Descendents != 2 {
		t.Errorf("engineering stats = %+v", eng)
	}
	if eng.TeamHealth != "red" || eng.TeamHealthDetails != "Small Team Size (red) | Few Sub-Teams (amber)" {
		t.Errorf("health = %s (%s)", eng.TeamHealth, eng.TeamHealthDetails)
	}
}

func TestOrgSizesCountIndirectReportsAndSurviveLoops(t *testing.T) {
	st := storetest.OpenWithFixtures(t)
	sizes, err := st.OrgSizes(ctx, 1)
	if err != nil {
		t.Fatal(err)
	}
	// EMP2183 > EMP2184 > EMP2185 > three developers.
	if sizes["emp2183"] != 5 || sizes["emp2185"] != 3 || sizes["emp2186"] != 0 {
		t.Errorf("sizes = %v", sizes)
	}
	// A reporting loop must not recurse forever.
	storetest.Exec(t, st, `UPDATE employees SET manager_id = 'EMP2186' WHERE person_id = 'EMP2183'`)
	if _, err := st.OrgSizes(ctx, 1); err != nil {
		t.Fatal(err)
	}
}

func TestDeleteVersionEmployeesLeavesOtherVersions(t *testing.T) {
	st := storetest.OpenWithFixtures(t)
	n, err := st.DeleteVersionEmployees(ctx, 1)
	if err != nil {
		t.Fatal(err)
	}
	if n != 14 {
		t.Errorf("deleted %d, want 14", n)
	}
	left, _ := st.Count(ctx, `SELECT COUNT(*) FROM employees WHERE data_version_id = 2`)
	members, _ := st.Count(ctx, `SELECT COUNT(*) FROM teams_employees`)
	teams, _ := st.Count(ctx, `SELECT COUNT(*) FROM teams`)
	if left != 2 || members != 0 || teams != 4 {
		t.Errorf("left %d employees, %d memberships, %d teams", left, members, teams)
	}
}

func TestVersionActivationKeepsOneActive(t *testing.T) {
	st := storetest.OpenWithFixtures(t)
	if _, err := st.ActivateVersion(ctx, 2); err != nil {
		t.Fatal(err)
	}
	v1, _ := st.FindVersion(ctx, 1)
	v2, _ := st.FindVersion(ctx, 2)
	if v1.IsActive || !v2.IsActive || v2.Status != "active" {
		t.Errorf("after activate: v1 %+v v2 %+v", v1, v2)
	}
	// Setting status "active" on another version moves the rest to draft.
	active := "active"
	if _, err := st.UpdateVersion(ctx, 1, store.VersionUpdate{Status: &active}); err != nil {
		t.Fatal(err)
	}
	v1, _ = st.FindVersion(ctx, 1)
	v2, _ = st.FindVersion(ctx, 2)
	if !v1.IsActive || v2.IsActive || v2.Status != "draft" {
		t.Errorf("after status change: v1 %+v v2 %+v", v1, v2)
	}
	if _, err := st.ArchiveVersion(ctx, 1); err != nil {
		t.Fatal(err)
	}
	if _, ok, _ := st.ActiveVersion(ctx); ok {
		t.Error("archiving the active version should leave none active")
	}
}

func TestVersionValidation(t *testing.T) {
	st := storetest.OpenWithFixtures(t)
	_, err := st.CreateVersion(ctx, "", sql.NullString{}, "bogus")
	var verrs store.ValidationErrors
	if !errors.As(err, &verrs) {
		t.Fatalf("want validation errors, got %v", err)
	}
	want := store.ValidationErrors{"Name can't be blank", "Status is not included in the list"}
	if !slices.Equal(verrs, want) {
		t.Errorf("errors = %q", verrs)
	}
	_, err = st.CreateVersion(ctx, "test data version", sql.NullString{}, "draft")
	if !errors.As(err, &verrs) || verrs[0] != "Name has already been taken" {
		t.Errorf("duplicate name (any case): %v", err)
	}
}

func TestEmployeeValidation(t *testing.T) {
	st := storetest.OpenWithFixtures(t)
	blank, bad := "", "abc"
	_, err := st.UpdateEmployee(ctx, 3, store.EmployeeFields{Title: &blank, Seniority: &bad})
	var verrs store.ValidationErrors
	if !errors.As(err, &verrs) {
		t.Fatalf("want validation errors, got %v", err)
	}
	if !slices.Equal(verrs, store.ValidationErrors{"Title can't be blank", "Seniority is not a number"}) {
		t.Errorf("errors = %q", verrs)
	}
}

func TestImportEmployees(t *testing.T) {
	st := storetest.OpenWithFixtures(t)
	f, err := os.Open("../web/testdata/rippling_employees.csv")
	if err != nil {
		t.Fatal(err)
	}
	defer f.Close()
	n, err := st.ImportEmployees(ctx, f)
	if err != nil {
		t.Fatal(err)
	}
	if n != 2 {
		t.Errorf("imported %d, want 2 (the version's old employees are replaced)", n)
	}
	people, err := st.EmployeesByPersonID(ctx, sql.NullInt64{Int64: 1, Valid: true}, []string{"100", "101"})
	if err != nil {
		t.Fatal(err)
	}
	alice, bob := people["100"], people["101"]
	if alice.Name.String != "Alice Boss" || !alice.IsManager.Bool {
		t.Errorf("alice = %+v", alice)
	}
	if bob.Country.String != "Canada" || bob.Company.String != "Acme Inc" || bob.Title.String != "Software Engineer" ||
		bob.JobFamily.String != "Software Engineering" || bob.ManagerID.String != "100" || bob.Seniority.Int64 != 22 ||
		bob.IsManager.Bool || bob.StartDate.String != "2021-02-02" {
		t.Errorf("bob = %+v", bob)
	}
	teams, err := st.Teams(ctx, `WHERE data_version_id = 1`)
	if err != nil {
		t.Fatal(err)
	}
	if len(teams) != 1 || teams[0].Name != "Engineering" || teams[0].FullPath != "Engineering" || teams[0].Depth.Int64 != 1 {
		t.Fatalf("teams = %+v", teams)
	}
	members, _ := st.TeamMembers(ctx, 1, teams[0].ID, "employees.person_id", "asc")
	if len(members) != 2 || members[0].Employee.PersonID != "100" || members[1].Employee.PersonID != "101" {
		t.Errorf("members = %+v", members)
	}
	// The other version is untouched.
	if n, _ := st.Count(ctx, `SELECT COUNT(*) FROM employees WHERE data_version_id = 2`); n != 2 {
		t.Errorf("version 2 has %d employees", n)
	}
}

func TestImportEmployeesRejectsMissingHeaders(t *testing.T) {
	st := storetest.Open(t)
	_, err := st.ImportEmployees(ctx, strings.NewReader("Employee - ID,Title\n1,CEO\n"))
	var ierr store.ImportError
	if !errors.As(err, &ierr) || !strings.HasPrefix(ierr.Error(), "CSV is missing required headers: Employee, Start date") {
		t.Errorf("err = %v", err)
	}
}

func TestImportContractors(t *testing.T) {
	st := storetest.OpenWithFixtures(t)
	csv := "Person,Team,Role,Leader Level 4,FTC Count,Vendor,Team_ID\n" +
		"Casey Contractor,Engineering,CTO,x,1,Acme,1\n"
	n, err := st.ImportContractors(ctx, strings.NewReader(csv))
	if err != nil {
		t.Fatal(err)
	}
	if n != 1 {
		t.Fatalf("imported %d", n)
	}
	rows, err := st.DB.Query(`SELECT person_id, title, job_code, employee_type, manager_id FROM employees WHERE employee_type = 'FTC'`)
	if err != nil {
		t.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		var pid, title, code, typ string
		var mgr sql.NullString
		if err := rows.Scan(&pid, &title, &code, &typ, &mgr); err != nil {
			t.Fatal(err)
		}
		// The job code comes from employees with the same title; the
		// manager is a manager on the contractor's team.
		if !strings.HasPrefix(pid, "FTC_") || len(pid) != 32 || title != "CTO" || code != "EXEC02" || !mgr.Valid {
			t.Errorf("contractor = %s %s %s %s %v", pid, title, code, typ, mgr)
		}
	}

	_, err = st.ImportContractors(ctx, strings.NewReader("Person,Team,Role,Leader Level 4,FTC Count,Vendor,Team_ID\nX,Y,Z,x,1,Acme,999\n"))
	var ierr store.ImportError
	if !errors.As(err, &ierr) || !strings.Contains(ierr.Error(), "999") {
		t.Errorf("unknown team: %v", err)
	}
}

func TestPopulateJobFamilies(t *testing.T) {
	cases := map[string]string{
		"Software Engineer II":            "Software Engineering",
		"SOFTWARE ENGINEER II":            "Software Engineering",
		"Infrastructure Administrator II": "Infrastructure Administration",
		"Software Administrator":          "Software & System Administration",
		"System Administrator":            "Software & System Administration",
		"Dir, Software Engineering":       "Directors",
		"Mgr, Platform Engineering":       "Engineering Management",
		"Senior Business Analyst":         "Business Analysis",
		"Network Engineer II":             "Network Engineering",
		"Infrastructure Engineer III":     "Infrastructure Engineering",
	}
	for title, want := range cases {
		t.Run(title, func(t *testing.T) {
			st := storetest.OpenWithFixtures(t)
			storetest.Exec(t, st, `UPDATE employees SET title = ? WHERE id = 3`, title)
			if _, err := st.PopulateJobFamilies(ctx, 1); err != nil {
				t.Fatal(err)
			}
			e, _ := st.FindEmployee(ctx, 3)
			if e.JobFamily.String != want {
				t.Errorf("job family = %q, want %q", e.JobFamily.String, want)
			}
			ceo, _ := st.FindEmployee(ctx, 1)
			if ceo.JobFamily.Valid {
				t.Errorf("CEO got job family %q", ceo.JobFamily.String)
			}
		})
	}
}
