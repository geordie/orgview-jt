package web

import (
	"bytes"
	"context"
	"encoding/json"
	"html"
	"io"
	"log/slog"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"net/textproto"
	"net/url"
	"os"
	"regexp"
	"slices"
	"strings"
	"testing"

	"github.com/geordie/orgview-jt/internal/store"
	"github.com/geordie/orgview-jt/internal/store/storetest"
)

// app is a test server over a fixture database.
type app struct {
	t   *testing.T
	st  *store.Store
	h   http.Handler
	jar []*http.Cookie
}

func newApp(t *testing.T) *app {
	st := storetest.OpenWithFixtures(t)
	return &app{t: t, st: st, h: New(st, slog.New(slog.NewTextHandler(io.Discard, nil))).Handler()}
}

type response struct {
	*httptest.ResponseRecorder
	body string
}

func (a *app) do(req *http.Request) response {
	a.t.Helper()
	for _, c := range a.jar {
		req.AddCookie(c)
	}
	rec := httptest.NewRecorder()
	a.h.ServeHTTP(rec, req)
	for _, c := range rec.Result().Cookies() {
		a.jar = slices.DeleteFunc(a.jar, func(old *http.Cookie) bool { return old.Name == c.Name })
		if c.MaxAge >= 0 && c.Value != "" {
			a.jar = append(a.jar, c)
		}
	}
	return response{rec, rec.Body.String()}
}

func (a *app) get(path string) response {
	return a.do(httptest.NewRequest(http.MethodGet, path, nil))
}

func (a *app) getJSON(path string, v any) response {
	a.t.Helper()
	req := httptest.NewRequest(http.MethodGet, path, nil)
	req.Header.Set("Accept", "application/json")
	res := a.do(req)
	if res.Code != http.StatusOK {
		a.t.Fatalf("GET %s = %d: %s", path, res.Code, res.body)
	}
	if err := json.Unmarshal([]byte(res.body), v); err != nil {
		a.t.Fatalf("GET %s: %v\n%s", path, err, res.body)
	}
	return res
}

// form submits a form the way a browser does, with Rails' _method field
// for verbs other than POST.
func (a *app) form(method, path string, values url.Values) response {
	if values == nil {
		values = url.Values{}
	}
	if method != http.MethodPost {
		values.Set("_method", strings.ToLower(method))
	}
	req := httptest.NewRequest(http.MethodPost, path, strings.NewReader(values.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	return a.do(req)
}

func (a *app) sendJSON(method, path string, body any) response {
	b, _ := json.Marshal(body)
	req := httptest.NewRequest(method, path, bytes.NewReader(b))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	return a.do(req)
}

func (a *app) upload(path, file, contentType string) response {
	a.t.Helper()
	data, err := os.ReadFile(file)
	if err != nil {
		a.t.Fatal(err)
	}
	var buf bytes.Buffer
	mw := multipart.NewWriter(&buf)
	h := textproto.MIMEHeader{}
	h.Set("Content-Disposition", `form-data; name="csv_file"; filename="upload.csv"`)
	h.Set("Content-Type", contentType)
	part, _ := mw.CreatePart(h)
	part.Write(data)
	mw.Close()
	req := httptest.NewRequest(http.MethodPost, path, &buf)
	req.Header.Set("Content-Type", mw.FormDataContentType())
	return a.do(req)
}

func (r response) wantStatus(t *testing.T, code int) response {
	t.Helper()
	if r.Code != code {
		t.Fatalf("status = %d, want %d\n%s", r.Code, code, r.body)
	}
	return r
}

func (r response) wantRedirect(t *testing.T, location string) response {
	t.Helper()
	r.wantStatus(t, http.StatusFound)
	if got := r.Header().Get("Location"); got != location {
		t.Fatalf("Location = %q, want %q", got, location)
	}
	return r
}

func (r response) wantContains(t *testing.T, subs ...string) response {
	t.Helper()
	for _, s := range subs {
		if !strings.Contains(r.body, s) {
			t.Errorf("body lacks %q", s)
		}
	}
	return r
}

func (r response) wantLacks(t *testing.T, subs ...string) response {
	t.Helper()
	for _, s := range subs {
		if strings.Contains(r.body, s) {
			t.Errorf("body contains %q", s)
		}
	}
	return r
}

var tags = regexp.MustCompile(`<[^>]*>`)

// rows returns the text of each table row's cells.
func (r response) rows() [][]string {
	var out [][]string
	for _, tr := range regexp.MustCompile(`(?s)<tr[^>]*>(.*?)</tr>`).FindAllStringSubmatch(r.body, -1) {
		var cells []string
		for _, td := range regexp.MustCompile(`(?s)<td[^>]*>(.*?)</td>`).FindAllStringSubmatch(tr[1], -1) {
			cells = append(cells, html.UnescapeString(strings.Join(strings.Fields(tags.ReplaceAllString(td[1], " ")), " ")))
		}
		if len(cells) > 0 {
			out = append(out, cells)
		}
	}
	return out
}

func (a *app) count(query string, args ...any) int {
	a.t.Helper()
	n, err := a.st.Count(context.Background(), query, args...)
	if err != nil {
		a.t.Fatal(err)
	}
	return n
}

func TestEveryPageLoads(t *testing.T) {
	a := newApp(t)
	for _, p := range []string{
		"/", "/up", "/employees", "/employees?page=2", "/employees/new", "/employees/2183", "/employees/2183/edit",
		"/employees/treeview", "/employees/1/direct_reports", "/employees/1/direct_reports.json", "/employees/2183.json",
		"/teams", "/teams?sort=member_count&direction=desc&depth=2", "/teams/new", "/teams/1", "/teams/1/edit",
		"/teams/treeview", "/teams/1/sub_teams", "/teams/1/team_members", "/teams/1/move_candidates.json",
		"/data_versions", "/data_versions/new", "/data_versions/1", "/data_versions/1/edit",
		"/reports/roles", "/reports/title_density", "/reports/job_code", "/reports/job_code_density",
		"/reports/seniority", "/reports/tenure", "/reports/employee_country", "/reports/personnel_area",
		"/reports/company", "/reports/job_family", "/reports/individual_contributors", "/reports/management_ratios",
		"/reports/team_size", "/reports/team_depth", "/reports/team_health", "/reports/team_health_details",
		"/reports/team_children", "/reports/team_members_managers",
		"/reports/roles?team_id=999999", "/reports/roles?job_code=ENGR03", "/reports/job_code_density?max_depth=2",
		"/reports/title_density?team_id=2&max_depth=3&title=CTO", "/reports/management_ratios?team_id=1",
		"/static/js/application.js", "/images/ui-bg_glass_65_ffffff_1x400.png", "/robots.txt",
	} {
		t.Run(p, func(t *testing.T) { a.get(p).wantStatus(t, http.StatusOK) })
	}
}

func TestNotFound(t *testing.T) {
	a := newApp(t)
	for _, p := range []string{"/employees/99999", "/employees/abc", "/teams/99999", "/data_versions/99", "/nope",
		"/reports/title_density?team_id=99999"} {
		a.get(p).wantStatus(t, http.StatusNotFound)
	}
}

func TestEmployeeCRUD(t *testing.T) {
	a := newApp(t)
	before := a.count(`SELECT COUNT(*) FROM employees`)
	a.form(http.MethodPost, "/employees", url.Values{
		"employee[person_id]": {"EMP999"}, "employee[title]": {"VP, Product Management"}, "employee[job_code]": {"PROD01"},
		"employee[seniority]": {"26"}, "employee[is_manager]": {"true"}, "employee[data_version_id]": {"1"},
	}).wantRedirect(t, "/employees/2189")
	if got := a.count(`SELECT COUNT(*) FROM employees`); got != before+1 {
		t.Fatalf("employees %d -> %d", before, got)
	}
	a.get("/employees/2189").wantContains(t, "Employee was successfully created.", "EMP999")

	a.form(http.MethodPatch, "/employees/2183", url.Values{"employee[title]": {"VP, Product"}}).wantRedirect(t, "/employees/2183")
	a.get("/employees/2183").wantContains(t, "Employee was successfully updated.", "VP, Product")

	a.form(http.MethodPatch, "/employees/2183", url.Values{"employee[title]": {""}}).
		wantStatus(t, http.StatusUnprocessableEntity).wantContains(t, "Title can&#39;t be blank")

	a.form(http.MethodDelete, "/employees/2183", nil).wantRedirect(t, "/employees")
	if got := a.count(`SELECT COUNT(*) FROM employees`); got != before {
		t.Fatalf("after delete %d, want %d", got, before)
	}
}

func TestEmployeeInlineRename(t *testing.T) {
	a := newApp(t)
	res := a.sendJSON(http.MethodPatch, "/employees/3", map[string]any{"employee": map[string]any{"name": "Ada"}})
	res.wantStatus(t, http.StatusOK)
	var e map[string]any
	json.Unmarshal([]byte(res.body), &e)
	if e["name"] != "Ada" || e["person_id"] != "EMP003" {
		t.Errorf("response = %v", e)
	}
	res = a.sendJSON(http.MethodPatch, "/employees/3", map[string]any{"employee": map[string]any{"title": ""}})
	res.wantStatus(t, http.StatusUnprocessableEntity).wantContains(t, `"title":["can't be blank"]`)
}

func TestEmployeeIndexShowsOnlyActiveVersion(t *testing.T) {
	a := newApp(t)
	res := a.get("/employees").wantStatus(t, http.StatusOK)
	res.wantContains(t, "EMP001", "TEST001").wantLacks(t, "TEST003", "TEST004")
	// 14 employees, 20 a page: no pagination.
	res.wantLacks(t, `class="pagination"`)
}

func TestEmployeeIndexFilters(t *testing.T) {
	a := newApp(t)
	// Managers with 3-4 direct reports: EMP001 has 5 in version 1, EMP2185 has 3.
	res := a.get("/employees?direct_reports_bucket=3-4")
	res.wantContains(t, "managers with 3-4 direct reports", "EMP2185").wantLacks(t, "EMP001<")
	// Team filter includes sub-teams: Engineering covers CTO, manager and the engineer on Frontend.
	res = a.get("/employees?team_id=1")
	res.wantContains(t, "EMP002", "EMP003", "EMP004").wantLacks(t, "EMP005")
}

func TestPagination(t *testing.T) {
	a := newApp(t)
	for i := 0; i < 30; i++ {
		storetest.Exec(t, a.st, `INSERT INTO employees (person_id, title, job_code, seniority, data_version_id, created_at, updated_at)
			VALUES (?, 'Filler', 'F1', 1, 1, 'x', 'x')`, "F"+strings.Repeat("0", 3)+string(rune('A'+i)))
	}
	res := a.get("/employees?title=Filler&page=2")
	res.wantContains(t, `href="/employees?page=1&amp;title=Filler"`, `<li class="page-item active"><a class="page-link" rel="" href="/employees?page=2&amp;title=Filler">2</a>`)
}

func TestEmployeeTreeviewAndDirectReports(t *testing.T) {
	a := newApp(t)
	storetest.Exec(t, a.st, `UPDATE employees SET name = 'Ada Lovelace' WHERE id = 1`)
	a.get("/employees/treeview").wantContains(t, `"title":"Ada Lovelace"`, `"orgSize":13`)

	var rows []struct {
		Employee struct {
			PersonID string `json:"person_id"`
		} `json:"employee"`
		DirectsCount int `json:"directs_count"`
		OrgSize      int `json:"org_size"`
	}
	a.getJSON("/employees/1/direct_reports.json", &rows)
	sizes := map[string]int{}
	for _, r := range rows {
		sizes[r.Employee.PersonID] = r.OrgSize
	}
	// EMP2182 > EMP2183 > EMP2184 > EMP2185 > three developers.
	if sizes["EMP2182"] != 6 || sizes["EMP002"] != 2 || sizes["EMP005"] != 0 || len(rows) != 5 {
		t.Errorf("org sizes = %v (%d rows)", sizes, len(rows))
	}
}

func TestDestroyAllDeletesOnlyActiveVersion(t *testing.T) {
	a := newApp(t)
	a.form(http.MethodDelete, "/employees/destroy_all", nil).wantRedirect(t, "/employees")
	a.get("/employees").wantContains(t, "Deleted 14 employees from Test Data Version.")
	if n := a.count(`SELECT COUNT(*) FROM employees WHERE data_version_id = 2`); n != 2 {
		t.Errorf("version 2 has %d employees", n)
	}
	if n := a.count(`SELECT COUNT(*) FROM teams`); n != 4 {
		t.Errorf("teams = %d", n)
	}
}

func TestImportCSV(t *testing.T) {
	a := newApp(t)
	a.upload("/employees/import_csv", "testdata/rippling_employees.csv", "text/csv").wantRedirect(t, "/")
	a.get("/").wantContains(t, "Imported 2 employees successfully.")
	a.upload("/employees/import_csv", "testdata/rippling_employees.csv", "image/png").wantRedirect(t, "/")
	a.get("/").wantContains(t, "Please upload a valid CSV file.")
}

func TestPopulateJobFamilies(t *testing.T) {
	a := newApp(t)
	storetest.Exec(t, a.st, `UPDATE employees SET title = 'Software Engineer II' WHERE id = 3`)
	a.form(http.MethodPost, "/employees/populate_job_families", nil).wantRedirect(t, "/")
	a.get("/").wantContains(t, "Job families populated: ")
}

func TestTeamMoves(t *testing.T) {
	a := newApp(t)
	res := a.sendJSON(http.MethodPatch, "/teams/3/move", map[string]any{"parent_id": 4})
	res.wantStatus(t, http.StatusOK).wantContains(t, `"redirect_url":"http://example.com/teams/3"`)
	backend, _ := a.st.FindTeam(context.Background(), 1, 3)
	if backend.FullPath != "Leadership > Backend" || backend.Depth.Int64 != 2 || backend.ParentID.Int64 != 4 {
		t.Errorf("backend = %+v", backend)
	}

	a.sendJSON(http.MethodPatch, "/teams/2/move", map[string]any{}).wantStatus(t, http.StatusOK)
	front, _ := a.st.FindTeam(context.Background(), 1, 2)
	if front.FullPath != "Frontend" || front.ParentID.Valid || front.Depth.Int64 != 1 {
		t.Errorf("frontend = %+v", front)
	}

	a.sendJSON(http.MethodPatch, "/teams/4/move", map[string]any{"parent_id": "3"}).
		wantStatus(t, http.StatusUnprocessableEntity).wantContains(t, "descendant")
	a.sendJSON(http.MethodPatch, "/teams/1/move", map[string]any{"parent_id": 1}).wantStatus(t, http.StatusUnprocessableEntity)
}

func TestMoveCandidates(t *testing.T) {
	a := newApp(t)
	var list []struct {
		ID       int64  `json:"id"`
		FullPath string `json:"full_path"`
	}
	a.getJSON("/teams/1/move_candidates.json", &list)
	if len(list) != 1 || list[0].ID != 4 {
		t.Errorf("candidates for Engineering = %+v", list)
	}
	a.getJSON("/teams/3/move_candidates.json", &list)
	var paths []string
	for _, c := range list {
		paths = append(paths, c.FullPath)
	}
	if !slices.IsSorted(paths) || len(paths) != 3 {
		t.Errorf("paths = %v", paths)
	}
}

func TestTeamMembersAndSubTeams(t *testing.T) {
	a := newApp(t)
	a.get("/teams/1/team_members").wantContains(t, `href="/employees/2"`, `href="/employees/4"`)
	var members []struct {
		EmployeeID int64          `json:"employee_id"`
		Employee   map[string]any `json:"employee"`
	}
	a.getJSON("/teams/1/team_members.json", &members)
	if len(members) != 2 || members[0].EmployeeID != 2 || members[1].EmployeeID != 4 || members[0].Employee["person_id"] != "EMP002" {
		t.Errorf("members = %+v", members)
	}
	a.get("/teams/1/sub_teams").wantContains(t, `href="/teams/2"`, `href="/teams/3"`)
	var subs []struct {
		SubTeam struct{ ID int64 } `json:"sub_team"`
	}
	a.getJSON("/teams/1/sub_teams.json", &subs)
	if len(subs) != 2 {
		t.Errorf("sub teams = %+v", subs)
	}
}

func TestTeamCRUD(t *testing.T) {
	a := newApp(t)
	a.form(http.MethodPost, "/teams", url.Values{"team[name]": {"Skunkworks"}, "team[full_path]": {"Skunkworks"}, "team[depth]": {"1"}}).
		wantRedirect(t, "/teams/5")
	a.get("/teams/5").wantContains(t, "Team Overview: Skunkworks")
	a.form(http.MethodPost, "/teams", url.Values{"team[name]": {""}, "team[full_path]": {""}}).
		wantStatus(t, http.StatusUnprocessableEntity).wantContains(t, "Name can&#39;t be blank", "Full path can&#39;t be blank")
	a.sendJSON(http.MethodPatch, "/teams/5", map[string]any{"team": map[string]any{"pretty_name": "Labs"}}).
		wantStatus(t, http.StatusOK).wantContains(t, `"pretty_name":"Labs"`)
	a.form(http.MethodDelete, "/teams/1", nil).wantRedirect(t, "/teams")
	if n := a.count(`SELECT COUNT(*) FROM teams_employees WHERE team_id = 1`); n != 0 {
		t.Errorf("memberships left: %d", n)
	}
}

func TestTeamsNeedActiveVersion(t *testing.T) {
	a := newApp(t)
	storetest.Exec(t, a.st, `UPDATE data_versions SET is_active = 0`)
	a.get("/teams").wantRedirect(t, "/")
	a.get("/").wantContains(t, "No active data version found.")
}

func TestTeamsIndexSortsAndSearches(t *testing.T) {
	a := newApp(t)
	res := a.get("/teams?sort=member_count&direction=desc")
	var names []string
	for _, row := range res.rows() {
		names = append(names, row[0])
	}
	// Frontend and Leadership tie on two members, so only the ends are fixed.
	if len(names) != 4 || names[0] != "Engineering" || names[3] != "Backend" {
		t.Errorf("order = %v", names)
	}
	res.wantContains(t, `href="/teams?direction=asc&amp;sort=name"`)
	res = a.get("/teams?search=end")
	if len(res.rows()) != 2 {
		t.Errorf("search rows = %v", res.rows())
	}
	// An unknown direction falls back to ascending instead of reaching SQL.
	a.get("/teams?sort=name&direction=desc;DROP").wantStatus(t, http.StatusOK)
}

func TestVersions(t *testing.T) {
	a := newApp(t)
	a.form(http.MethodPost, "/data_versions", url.Values{"data_version[name]": {"nov"}, "data_version[description]": {"November"}}).
		wantRedirect(t, "/data_versions")
	a.get("/data_versions").wantContains(t, "Data version was successfully created.", "nov", "November")
	a.form(http.MethodPost, "/data_versions", url.Values{"data_version[name]": {"nov"}}).
		wantStatus(t, http.StatusUnprocessableEntity).wantContains(t, "1 error prohibited", "Name has already been taken")

	a.form(http.MethodPatch, "/data_versions/3", url.Values{"data_version[snapshot_date]": {"2026-11-01T09:30"}}).
		wantRedirect(t, "/data_versions/3")
	a.get("/data_versions/3").wantContains(t, "November 01, 2026 at 09:30 AM")

	req := httptest.NewRequest(http.MethodPost, "/data_versions/3/activate", strings.NewReader("_method=patch"))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Referer", "http://example.com/employees?page=2")
	a.do(req).wantRedirect(t, "/employees?page=2")
	a.get("/employees").wantContains(t, "nov is now the active version.")

	a.form(http.MethodDelete, "/data_versions/3", nil).wantRedirect(t, "/data_versions")
	a.get("/data_versions").wantContains(t, "Cannot delete the active version.")
	a.form(http.MethodDelete, "/data_versions/2", nil).wantRedirect(t, "/data_versions")
	if n := a.count(`SELECT COUNT(*) FROM employees WHERE data_version_id = 2`); n != 0 {
		t.Errorf("version 2 employees left: %d", n)
	}
	a.form(http.MethodPatch, "/data_versions/1/archive", nil).wantRedirect(t, "/data_versions")
}

func TestCrossOriginWritesAreRefused(t *testing.T) {
	a := newApp(t)
	req := httptest.NewRequest(http.MethodPost, "/employees/3", strings.NewReader("_method=delete"))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Origin", "https://evil.example")
	a.do(req).wantStatus(t, http.StatusForbidden)
	req = httptest.NewRequest(http.MethodPost, "/employees/3", strings.NewReader("_method=delete"))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Sec-Fetch-Site", "same-origin")
	a.do(req).wantRedirect(t, "/employees")
}

func TestReportsFilterByActiveVersionAndTeam(t *testing.T) {
	a := newApp(t)
	a.get("/reports/employee_country").wantContains(t, "USA", "Canada").wantLacks(t, "Germany")

	res := a.get("/reports/seniority?team_id=1").wantContains(t, " - Engineering")
	total := res.rows()[len(res.rows())-1]
	if total[0] != "Total" || total[1] != "3" {
		t.Errorf("total row = %v", total)
	}

	res = a.get("/reports/team_size?team_id=1").wantContains(t, " - Engineering").wantLacks(t, "Leadership")

	storetest.Exec(t, a.st, `UPDATE employees SET job_family = 'Software Engineering' WHERE id IN (3, 4)`)
	a.get("/reports/job_family").wantContains(t, "Software Engineering", "Unassigned")
	a.get("/reports/roles").wantContains(t, "Job Family", "Software Engineering")

	a.get("/reports/individual_contributors").wantContains(t, "Managers", "Individual Contributors")
}

func TestTitleDensityMatchesWholePathSegments(t *testing.T) {
	a := newApp(t)
	storetest.Exec(t, a.st, `INSERT INTO teams (name, full_path, depth, org_member_count, data_version_id, created_at, updated_at)
		VALUES ('Eng', 'Eng', 1, 0, 1, 'x', 'x')`)
	counts := map[string]string{}
	for _, row := range a.get("/reports/title_density").rows() {
		counts[row[0]] = row[1]
	}
	if counts["Eng"] != "0" || counts["Engineering"] == "0" || counts["Engineering"] == "" {
		t.Errorf("counts = %v", counts)
	}
}

func TestTitleDensityDrillDown(t *testing.T) {
	a := newApp(t)
	res := a.get("/reports/title_density?max_depth=2&team_id=1&title=CTO")
	res.wantContains(t, "CTO - Engineering (Depth: 2)", `href="http://example.com/reports/title_density?max_depth=1&amp;title=CTO"`,
		"← Back to All Teams", `href="/reports/title_density?max_depth=3&amp;team_id=2&amp;title=CTO"`)
	res = a.get("/reports/job_code_density?max_depth=3&team_id=2")
	res.wantContains(t, "← Back to Engineering", `href="http://example.com/reports/job_code_density?max_depth=3&amp;team_id=1"`)
}

func TestTenureBuckets(t *testing.T) {
	a := newApp(t)
	starts := []string{"2026-04-26", "2025-10-25", "2023-10-25", "2023-10-24", "2019-10-26", "2011-10-26", "2001-10-26", "2023-10-27"}
	ids := []int64{1, 2, 3, 4, 5, 1001, 1002, 2182}
	for i, d := range starts {
		storetest.Exec(t, a.st, `UPDATE employees SET start_date = ? WHERE id = ?`, d, ids[i])
	}
	res := a.get("/reports/tenure").wantContains(t, "as of Oct 26, 2026")
	got := map[string]string{}
	var order []string
	for _, row := range res.rows() {
		got[row[0]] = row[1]
		order = append(order, row[0])
	}
	want := map[string]string{"< 1 year": "1", "1 - 2 years": "2", "3 - 5 years": "2", "5 - 10 years": "1",
		"10 - 20 years": "1", "> 20 years": "1", "Unknown": "6", "Totals": "14"}
	for k, v := range want {
		if got[k] != v {
			t.Errorf("%s = %q, want %q", k, got[k], v)
		}
	}
	if !slices.Equal(order, []string{"< 1 year", "1 - 2 years", "3 - 5 years", "5 - 10 years", "10 - 20 years", "> 20 years", "Unknown", "Totals"}) {
		t.Errorf("order = %v", order)
	}
}

func TestManagementRatios(t *testing.T) {
	a := newApp(t)
	got := map[string]string{}
	for _, row := range a.get("/reports/management_ratios").rows() {
		got[row[0]] = row[1]
	}
	// Managers by number of direct reports in version 1: EMP001 has 5,
	// EMP2185 has 3, EMP002 has 2 and EMP2182, EMP2183, EMP2184 have 1.
	want := map[string]string{"5-10": "1", "3-4": "1", "1-2": "4", "11-15": "0", "> 15": "0", "Totals": "6"}
	for k, v := range want {
		if got[k] != v {
			t.Errorf("%s = %q, want %q", k, got[k], v)
		}
	}
}

func TestChartData(t *testing.T) {
	a := newApp(t)
	// Ruby printed floats with a ".0" and integer zeros without one.
	res := a.get("/reports/team_depth")
	res.wantContains(t, "labels: [2,1]", "data: [2,2]", "percentages: [50.0,50.0]", "label: '# of Teams'")
	res = a.get("/reports/title_density?title=Nobody")
	res.wantContains(t, "percentages: [0,0]")
}
