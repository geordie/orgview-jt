package web

import (
	"cmp"
	"context"
	"errors"
	"net/http"
	"slices"
	"strconv"
	"strings"
	"time"

	"github.com/geordie/orgview-jt/internal/store"
	"github.com/geordie/orgview-jt/internal/web/views"
)

// The reports mirror the Rails ReportsController action by action, down to
// the SQL, so the two apps show the same rows in the same order.

const employeesLabel = "# of Employees"
const teamsLabel = "# of Teams"

// group is one row of a GROUP BY count with its key as a report value.
type group struct {
	Key   views.Value
	Count int
}

func toGroups(gs []store.Group) []group {
	out := make([]group, len(gs))
	for i, g := range gs {
		out[i] = group{Key: views.FromAny(g.Key), Count: g.Count}
	}
	return out
}

// byCountDesc orders groups as Ruby's sort_by { |_, v| v }.reverse did,
// ties included: by count, descending.
func byCountDesc(gs []group) []group {
	rubySortBy(gs, func(g group) int64 { return int64(g.Count) })
	slices.Reverse(gs)
	return gs
}

// byKeyDesc orders groups as sort_by { |k, _| k }.reverse: by key,
// descending. Integer keys sort as Ruby does; any other keys (where Ruby
// used another algorithm, or failed on nil) sort stably, nil last.
func byKeyDesc(gs []group) []group {
	ints := true
	for _, g := range gs {
		ints = ints && g.Key.Kind == views.Int
	}
	if ints {
		rubySortBy(gs, func(g group) int64 { return g.Key.I })
	} else {
		slices.SortStableFunc(gs, func(a, b group) int { return compareValues(a.Key, b.Key) })
	}
	slices.Reverse(gs)
	return gs
}

func compareValues(a, b views.Value) int {
	if a.IsNil() || b.IsNil() {
		switch {
		case a.IsNil() && b.IsNil():
			return 0
		case a.IsNil():
			return -1
		}
		return 1
	}
	if a.Kind == views.Str || b.Kind == views.Str {
		return strings.Compare(a.String(), b.String())
	}
	return cmp.Compare(a.Number(), b.Number())
}

func keys(gs []group) []views.Value {
	out := make([]views.Value, len(gs))
	for i, g := range gs {
		out[i] = g.Key
	}
	return out
}

func counts(gs []group) []views.Value {
	out := make([]views.Value, len(gs))
	for i, g := range gs {
		out[i] = views.I(int64(g.Count))
	}
	return out
}

// percentages is each count's share of the total, rounded to two places,
// or integer 0 for every row when the total is 0.
func percentages(cs []int) []views.Value {
	sum := 0
	for _, c := range cs {
		sum += c
	}
	out := make([]views.Value, len(cs))
	for i, c := range cs {
		if sum > 0 {
			out[i] = views.F(views.RubyRound(float64(c)/float64(sum)*100, 2))
		} else {
			out[i] = views.I(0)
		}
	}
	return out
}

func groupPercentages(gs []group) []views.Value {
	cs := make([]int, len(gs))
	for i, g := range gs {
		cs[i] = g.Count
	}
	return percentages(cs)
}

// reportCtx is what every report needs: the version the navbar shows and
// the request's parameters.
type reportCtx struct {
	ctx       context.Context
	r         *http.Request
	versionID int64
}

func (s *Server) reportContext(w http.ResponseWriter, r *http.Request) (reportCtx, bool) {
	id, _, err := s.currentVersionID(r.Context())
	if err != nil {
		s.fail(w, r, err)
		return reportCtx{}, false
	}
	return reportCtx{ctx: r.Context(), r: r, versionID: id}, true
}

func (rc reportCtx) param(name string) string { return rc.r.URL.Query().Get(name) }

// filterTeam is the team_id parameter's team in the report version, if the
// parameter is present and names one.
func (s *Server) filterTeam(rc reportCtx) (*store.Team, error) {
	if !present(rc.param("team_id")) {
		return nil, nil
	}
	id, err := strconv.ParseInt(rc.param("team_id"), 10, 64)
	if err != nil {
		return nil, nil
	}
	t, err := s.st.FindTeam(rc.ctx, rc.versionID, id)
	if errors.Is(err, store.ErrNotFound) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &t, nil
}

// employeeFilter is the active version's employees, narrowed to the
// team_id parameter's team and every team below it.
func (s *Server) employeeFilter(rc reportCtx) (store.EmployeeFilter, error) {
	var f store.EmployeeFilter
	t, err := s.filterTeam(rc)
	if err != nil || t == nil {
		return f, err
	}
	f.TeamIDs, err = s.st.SubtreeIDs(rc.ctx, rc.versionID, t.FullPath)
	return f, err
}

// teamSubtitle is " - <full path>" for the team_id parameter's team.
func (s *Server) teamSubtitle(rc reportCtx) (string, error) {
	t, err := s.filterTeam(rc)
	if err != nil || t == nil {
		return "", err
	}
	return " - " + t.FullPath, nil
}

// employeeGroups counts filtered employees grouped by a column.
func (s *Server) employeeGroups(rc reportCtx, f store.EmployeeFilter, countExpr, col, extraWhere string, extraArgs ...any) ([]group, error) {
	joins, where, args := f.SQL()
	gs, err := s.st.GroupCounts(rc.ctx, `SELECT employees.`+col+`, `+countExpr+` FROM employees`+joins+where+extraWhere+
		` GROUP BY employees.`+col, append(args, extraArgs...)...)
	if err != nil {
		return nil, err
	}
	return toGroups(gs), nil
}

func (s *Server) renderReport(w http.ResponseWriter, r *http.Request, rep views.Report) {
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.render(w, r, http.StatusOK, views.ReportPage(p, rep))
}

func (s *Server) renderCountReport(w http.ResponseWriter, r *http.Request, rep views.CountReport) {
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.render(w, r, http.StatusOK, views.CountReportPage(p, rep))
}

// simpleReport is a label, count and percentage table with a chart.
func simpleReport(title, subtitle string, gs []group, labelCol, chartID, xlabel string) views.Report {
	pct := groupPercentages(gs)
	rep := views.Report{Title: title, Subtitle: subtitle}
	rep.Table.Add(views.Column{Label: labelCol, Type: views.ColString, Values: keys(gs)})
	rep.Table.Add(views.Column{Label: "Count", Type: views.ColNumeric, Values: counts(gs)})
	rep.Table.Add(views.Column{Label: "Percentage", Type: views.ColPercentage, Values: pct})
	rep.Chart = &views.Chart{ID: chartID, Labels: keys(gs), Data: counts(gs), Percentages: pct, XLabel: xlabel}
	return rep
}

func countReport(title, subtitle, header string, gs []group, xlabel string) views.CountReport {
	return views.CountReport{Title: title, Subtitle: subtitle, LabelHeader: header, Labels: keys(gs), Counts: counts(gs),
		Percentages: groupPercentages(gs), XLabel: xlabel}
}

// teamIDParam is the team_id link parameter when the request has one.
func teamIDParam(rc reportCtx) []views.LinkParam {
	if present(rc.param("team_id")) {
		return []views.LinkParam{views.Fixed("team_id", views.S(rc.param("team_id")))}
	}
	return nil
}

func (s *Server) reportRoles(w http.ResponseWriter, r *http.Request) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	f, err := s.employeeFilter(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	jobCode, jobFamily := rc.param("job_code"), rc.param("job_family")
	if present(jobCode) {
		f.JobCode = jobCode
	}
	if present(jobFamily) {
		f.JobFamily = jobFamily
	}
	gs, err := s.employeeGroups(rc, f, "COUNT(DISTINCT employees.id)", "title", "")
	if err != nil {
		s.fail(w, r, err)
		return
	}
	gs = byCountDesc(gs)
	joins, where, args := f.SQL()
	families, err := s.st.StringPairs(rc.ctx, `SELECT title, MAX(job_family) FROM employees`+joins+where+` GROUP BY employees.title`, args...)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	sub, err := s.teamSubtitle(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	var parts []string
	if present(jobFamily) {
		parts = append(parts, "Job Family: "+jobFamily)
	}
	if present(jobCode) {
		parts = append(parts, "Filtered by Job Code: "+jobCode)
	}
	if present(sub) {
		parts = append(parts, sub)
	}

	rep := views.Report{Title: "Roles Report", Subtitle: strings.Join(parts, " ")}
	roleLinks := append([]views.LinkParam{views.FromCol("title", "Role")}, teamIDParam(rc)...)
	rep.Table.Add(views.Column{Label: "Role", Type: views.ColString, Values: keys(gs),
		Link: &views.LinkInfo{Path: "/reports/title_density", Params: roleLinks}})
	fam := make([]views.Value, len(gs))
	for i, g := range gs {
		if v, ok := families[g.Key.String()]; ok && v.Valid && !g.Key.IsNil() {
			fam[i] = views.S(v.String)
		}
	}
	rep.Table.Add(views.Column{Label: "Job Family", Type: views.ColString, Values: fam})
	countLinks := append([]views.LinkParam{views.FromCol("title", "Role")}, teamIDParam(rc)...)
	if present(jobCode) {
		countLinks = append(countLinks, views.Fixed("job_code", views.S(jobCode)))
	}
	rep.Table.Add(views.Column{Label: "Count", Type: views.ColNumeric, Values: counts(gs),
		Link: &views.LinkInfo{Path: "/employees", Params: countLinks}})
	pct := groupPercentages(gs)
	rep.Table.Add(views.Column{Label: "Percentage", Type: views.ColPercentage, Values: pct})
	rep.Chart = &views.Chart{ID: "rolesChart", Labels: keys(gs), Data: counts(gs), Percentages: pct, XLabel: employeesLabel}
	s.renderReport(w, r, rep)
}

// rubyInt reads an integer parameter as Ruby's to_i does: leading digits,
// else 0.
func rubyInt(s string) int64 {
	s = strings.TrimLeft(s, " \t\n\v\f\r")
	end := 0
	if end < len(s) && (s[end] == '-' || s[end] == '+') {
		end++
	}
	for end < len(s) && s[end] >= '0' && s[end] <= '9' {
		end++
	}
	n, _ := strconv.ParseInt(strings.ReplaceAll(s[:end], "+", ""), 10, 64)
	return n
}

// depthArg is max_depth as a query argument: its integer value, or NULL
// when it is not a number, as Rails casts it for the integer column.
func depthArg(maxDepth string) any {
	if n, err := strconv.ParseInt(strings.TrimSpace(maxDepth), 10, 64); err == nil {
		return n
	}
	if f, err := strconv.ParseFloat(strings.TrimSpace(maxDepth), 64); err == nil {
		return int64(f)
	}
	return nil
}

func likeEscape(s string) string {
	return strings.NewReplacer("!", "!!", "%", "!%", "_", "!_").Replace(s)
}

// densityData is what the title and job code density reports share: the
// teams at one depth (under a team, if given) and how many matching
// employees are in each team's subtree.
type densityData struct {
	teams    []store.Team
	paths    []string // distinct full paths, in team order
	counts   map[string]int
	orgSizes map[string]int64
	maxDepth string
	parent   *store.Team
	back     *views.Link
}

// density loads a density report's teams. filterCol and filterVal narrow
// the employees counted (e.g. title = "Engineer"); filterVal nil counts all.
func (s *Server) density(rc reportCtx, action, filterCol string, filterVal *string) (densityData, error) {
	d := densityData{counts: map[string]int{}, orgSizes: map[string]int64{}, maxDepth: "1"}
	q := rc.r.URL.Query()
	if q.Has("max_depth") {
		d.maxDepth = q.Get("max_depth")
	}
	subtree := ""
	var subtreeArgs []any
	if present(q.Get("team_id")) {
		id, err := strconv.ParseInt(q.Get("team_id"), 10, 64)
		if err != nil {
			return d, store.ErrNotFound
		}
		t, err := s.st.FindTeam(rc.ctx, rc.versionID, id)
		if err != nil {
			return d, err
		}
		d.parent = &t
		subtree = ` AND (teams.full_path = ? OR teams.full_path LIKE ? ESCAPE '!')`
		subtreeArgs = []any{t.FullPath, likeEscape(t.FullPath+store.PathSeparator) + "%"}
		back, err := s.backLink(rc, t, action, d.maxDepth, filterCol, filterVal)
		if err != nil {
			return d, err
		}
		d.back = &back
	}
	teams, err := s.st.Teams(rc.ctx, `WHERE teams.data_version_id = ?`+subtree+` AND teams.depth = ? ORDER BY teams.org_member_count DESC`,
		append(append([]any{rc.versionID}, subtreeArgs...), depthArg(d.maxDepth))...)
	if err != nil {
		return d, err
	}
	d.teams = teams
	for _, t := range teams {
		if _, ok := d.orgSizes[t.FullPath]; !ok {
			d.paths = append(d.paths, t.FullPath)
		}
		d.orgSizes[t.FullPath] = t.OrgMemberCount
		d.counts[t.FullPath] = 0
	}
	where := ` WHERE teams.data_version_id = ? AND employees.data_version_id = ?`
	args := []any{rc.versionID, rc.versionID}
	if filterVal != nil && present(*filterVal) {
		where += ` AND employees.` + filterCol + ` = ?`
		args = append(args, *filterVal)
	}
	where += subtree
	args = append(args, subtreeArgs...)
	rows, err := s.st.GroupCounts(rc.ctx, `SELECT teams.full_path, COUNT(DISTINCT employees.id) AS employee_count FROM teams
		INNER JOIN teams_employees ON teams_employees.team_id = teams.id
		INNER JOIN employees ON employees.id = teams_employees.employee_id`+where+` GROUP BY teams.full_path`, args...)
	if err != nil {
		return d, err
	}
	for _, row := range rows {
		path, _ := row.Key.(string)
		for _, key := range d.paths {
			if path == key || strings.HasPrefix(path, key+store.PathSeparator) {
				d.counts[key] += row.Count
			}
		}
	}
	return d, nil
}

// backLink goes up one level from a density report drilled into team t.
func (s *Server) backLink(rc reportCtx, t store.Team, action, maxDepth, filterCol string, filterVal *string) (views.Link, error) {
	params := map[string]string{}
	if filterVal != nil {
		params[filterCol] = *filterVal
	}
	parent, ok, err := s.st.Parent(rc.ctx, t)
	if err != nil {
		return views.Link{}, err
	}
	base := baseURL(rc.r) + "/reports/" + action
	if ok {
		params["team_id"] = itoa(parent.ID)
		params["max_depth"] = maxDepth
		return views.Link{Text: "← Back to " + parent.FullPath, URL: base + views.Query(params)}, nil
	}
	params["max_depth"] = itoa(max(rubyInt(maxDepth)-1, 1))
	return views.Link{Text: "← Back to All Teams", URL: base + views.Query(params)}, nil
}

func (d densityData) values() (cnts []int, cntVals, orgSizes, proportions []views.Value) {
	for _, p := range d.paths {
		c := d.counts[p]
		cnts = append(cnts, c)
		cntVals = append(cntVals, views.I(int64(c)))
		if size := d.orgSizes[p]; size > 0 {
			proportions = append(proportions, views.F(float64(c)/float64(size)*100))
		} else {
			proportions = append(proportions, views.I(0))
		}
	}
	for _, t := range d.teams {
		orgSizes = append(orgSizes, views.I(t.OrgMemberCount))
	}
	return
}

func optionalParam(r *http.Request, name string) *string {
	q := r.URL.Query()
	if !q.Has(name) {
		return nil
	}
	v := q.Get(name)
	return &v
}

func (s *Server) reportTitleDensity(w http.ResponseWriter, r *http.Request) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	title := optionalParam(r, "title")
	d, err := s.density(rc, "title_density", "title", title)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	label := "All Titles"
	if title != nil {
		label = *title
	}
	rep := views.Report{Title: "Title Density Report", Subtitle: label + " (Depth: " + d.maxDepth + ")", Back: d.back}
	if d.parent != nil {
		rep.Subtitle = label + " - " + d.parent.FullPath + " (Depth: " + d.maxDepth + ")"
	}

	display := map[string]string{}
	idByName := map[string]views.Value{}
	for _, t := range d.teams {
		display[t.FullPath] = t.DisplayName()
		idByName[t.DisplayName()] = views.I(t.ID)
	}
	names := make([]views.Value, len(d.paths))
	for i, p := range d.paths {
		names[i] = views.S(display[p])
	}
	cnts, cntVals, orgSizes, proportions := d.values()

	links := []views.LinkParam{{Name: "team_id", ValueCol: "Team", Lookup: idByName}}
	if title != nil && present(*title) {
		links = append(links, views.Fixed("title", views.S(*title)))
	}
	links = append(links, views.Fixed("max_depth", views.I(rubyInt(d.maxDepth)+1)))
	rep.Table.Add(views.Column{Label: "Team", Type: views.ColString, Values: names,
		Link: &views.LinkInfo{Path: "/reports/title_density", Params: links}})
	rep.Table.Add(views.Column{Label: employeesLabel, Type: views.ColNumeric, Values: cntVals})
	rep.Table.Add(views.Column{Label: "Org Size", Type: views.ColNumeric, Values: orgSizes})
	rep.Table.Add(views.Column{Label: "% of Org Size", Type: views.ColPercentage, Values: proportions})
	rep.Chart = &views.Chart{ID: "titleDensityChart", Labels: names, Data: cntVals, Percentages: percentages(cnts), XLabel: employeesLabel}
	s.renderReport(w, r, rep)
}

func (s *Server) reportJobCodeDensity(w http.ResponseWriter, r *http.Request) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	jobCode := optionalParam(r, "job_code")
	d, err := s.density(rc, "job_code_density", "job_code", jobCode)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	label := "All Job Codes"
	if jobCode != nil {
		label = *jobCode
	}
	rep := views.Report{Title: "Job Code Density Report", Subtitle: label + " (Depth: " + d.maxDepth + ")", Back: d.back}
	if d.parent != nil {
		rep.Subtitle = label + " - " + d.parent.FullPath + " (Depth: " + d.maxDepth + ")"
	}

	idByPath := map[string]views.Value{}
	for _, t := range d.teams {
		idByPath[t.FullPath] = views.I(t.ID)
	}
	paths := make([]views.Value, len(d.paths))
	for i, p := range d.paths {
		paths[i] = views.S(p)
	}
	cnts, cntVals, orgSizes, proportions := d.values()
	pct := percentages(cnts)

	links := []views.LinkParam{{Name: "team_id", ValueCol: "Team", Lookup: idByPath}}
	if jobCode != nil && present(*jobCode) {
		links = append(links, views.Fixed("job_code", views.S(*jobCode)))
	}
	links = append(links, views.Fixed("max_depth", views.I(rubyInt(d.maxDepth)+1)))
	actions := make([]views.Value, len(d.teams))
	for i := range actions {
		actions[i] = views.S("View Team")
	}
	rep.Table.Add(views.Column{Label: "Team", Type: views.ColString, Values: paths,
		Link: &views.LinkInfo{Path: "/reports/job_code_density", Params: links}})
	rep.Table.Add(views.Column{Label: employeesLabel, Type: views.ColNumeric, Values: cntVals})
	rep.Table.Add(views.Column{Label: "% of Total", Type: views.ColPercentage, Values: pct})
	rep.Table.Add(views.Column{Label: "Org Size", Type: views.ColNumeric, Values: orgSizes})
	rep.Table.Add(views.Column{Label: "% of Org Size", Type: views.ColPercentage, Values: proportions})
	rep.Table.Add(views.Column{Label: "Actions", Type: views.ColAction, Values: actions,
		Link: &views.LinkInfo{Path: "/teams/:id", Params: []views.LinkParam{{Name: "id", ValueCol: "Team", Lookup: idByPath}}}})
	rep.Chart = &views.Chart{ID: "jobCodeDensityChart", Labels: paths, Data: cntVals, Percentages: pct, XLabel: employeesLabel}
	s.renderReport(w, r, rep)
}

func (s *Server) reportSeniority(w http.ResponseWriter, r *http.Request) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	f, err := s.employeeFilter(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	extra := ""
	var args []any
	if present(rc.param("country")) {
		extra += ` AND employees.country = ?`
		args = append(args, rc.param("country"))
	}
	if present(rc.param("personnel_area")) {
		extra += ` AND employees.personnel_area = ?`
		args = append(args, rc.param("personnel_area"))
	}
	gs, err := s.employeeGroups(rc, f, "COUNT(*)", "seniority", extra, args...)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	sub, err := s.teamSubtitle(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.renderCountReport(w, r, countReport("Seniority Report", "Distribution of employees by job level"+sub, "Seniority",
		byKeyDesc(gs), employeesLabel))
}

// Tenure is counted in whole years up to this fixed date, not today.
var tenureAsOf = time.Date(2026, 10, 26, 0, 0, 0, 0, time.UTC)

var tenureBuckets = []string{"< 1 year", "1 - 2 years", "3 - 5 years", "5 - 10 years", "10 - 20 years", "> 20 years"}

func completedYears(start, asOf time.Time) int {
	years := asOf.Year() - start.Year()
	if asOf.Month() < start.Month() || (asOf.Month() == start.Month() && asOf.Day() < start.Day()) {
		years--
	}
	return years
}

func tenureBucket(years int) string {
	switch {
	case years < 1:
		return "< 1 year"
	case years < 3:
		return "1 - 2 years"
	case years < 5:
		return "3 - 5 years"
	case years < 10:
		return "5 - 10 years"
	case years < 20:
		return "10 - 20 years"
	}
	return "> 20 years"
}

func (s *Server) reportTenure(w http.ResponseWriter, r *http.Request) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	f, err := s.employeeFilter(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	joins, where, args := f.SQL()
	dates, err := s.st.StartDates(rc.ctx, `SELECT DISTINCT employees.id, employees.start_date FROM employees`+joins+where, args...)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	tally := map[string]int{}
	unknown := 0
	for _, d := range dates {
		start, err := time.Parse(store.DateLayout, firstN(d, 10))
		if d == "" || err != nil {
			unknown++
			continue
		}
		tally[tenureBucket(completedYears(start, tenureAsOf))]++
	}
	var gs []group
	for _, b := range tenureBuckets {
		gs = append(gs, group{Key: views.S(b), Count: tally[b]})
	}
	if unknown > 0 {
		gs = append(gs, group{Key: views.S("Unknown"), Count: unknown})
	}
	sub, err := s.teamSubtitle(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.renderReport(w, r, simpleReport("Tenure Report",
		"Distribution of employees by years of service as of "+tenureAsOf.Format("Jan 2, 2006")+sub,
		gs, "Years of Service", "tenureChart", employeesLabel))
}

func firstN(s string, n int) string {
	if len(s) > n {
		return s[:n]
	}
	return s
}

func (s *Server) reportJobCode(w http.ResponseWriter, r *http.Request) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	f, err := s.employeeFilter(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	gs, err := s.employeeGroups(rc, f, "COUNT(DISTINCT employees.id)", "job_code", "")
	if err != nil {
		s.fail(w, r, err)
		return
	}
	gs = byCountDesc(gs)
	sub, err := s.teamSubtitle(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	rep := views.Report{Title: "Job Code Report", Subtitle: sub}
	rep.Table.Add(views.Column{Label: "Job Code", Type: views.ColString, Values: keys(gs), Link: &views.LinkInfo{
		Path: "/reports/job_code_density", Params: append([]views.LinkParam{views.FromCol("job_code", "Job Code")}, teamIDParam(rc)...)}})
	rep.Table.Add(views.Column{Label: "Count", Type: views.ColNumeric, Values: counts(gs), Link: &views.LinkInfo{
		Path: "/reports/roles", Params: append([]views.LinkParam{views.FromCol("job_code", "Job Code")}, teamIDParam(rc)...)}})
	pct := groupPercentages(gs)
	rep.Table.Add(views.Column{Label: "Percentage", Type: views.ColPercentage, Values: pct})
	rep.Chart = &views.Chart{ID: "jobCodeChart", Labels: keys(gs), Data: counts(gs), Percentages: pct, XLabel: employeesLabel}
	s.renderReport(w, r, rep)
}

// allEmployeesReport counts the active version's employees by a column.
func (s *Server) allEmployeesReport(w http.ResponseWriter, r *http.Request, col, title, subtitle, label, chartID string) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	gs, err := s.employeeGroups(rc, store.EmployeeFilter{}, "COUNT(*)", col, "")
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.renderReport(w, r, simpleReport(title, subtitle, byCountDesc(gs), label, chartID, employeesLabel))
}

func (s *Server) reportCountry(w http.ResponseWriter, r *http.Request) {
	s.allEmployeesReport(w, r, "country", "Employee Countries Report", "Distribution of employees by country", "Country", "employeeCountryChart")
}

func (s *Server) reportPersonnelArea(w http.ResponseWriter, r *http.Request) {
	s.allEmployeesReport(w, r, "personnel_area", "Personnel Area Report", "Distribution of employees by personnel area", "Personnel Area", "personnelAreaChart")
}

func (s *Server) reportCompany(w http.ResponseWriter, r *http.Request) {
	s.allEmployeesReport(w, r, "company", "Company / Subsidiary Report", "Distribution of employees by company", "Company", "companyChart")
}

func (s *Server) reportJobFamily(w http.ResponseWriter, r *http.Request) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	f, err := s.employeeFilter(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	raw, err := s.employeeGroups(rc, f, "COUNT(*)", "job_family", "")
	if err != nil {
		s.fail(w, r, err)
		return
	}
	// Blank families become "Unassigned"; when several do, the last count
	// wins in the first one's place, as Ruby's transform_keys does.
	var gs []group
	pos := map[string]int{}
	for _, g := range byCountDesc(raw) {
		k := g.Key.String()
		if strings.TrimSpace(k) == "" {
			k = "Unassigned"
		}
		if i, ok := pos[k]; ok {
			gs[i].Count = g.Count
			continue
		}
		pos[k] = len(gs)
		gs = append(gs, group{Key: views.S(k), Count: g.Count})
	}
	sub, err := s.teamSubtitle(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	rep := views.Report{Title: "Employee Job Family Report", Subtitle: "Distribution of employees by job family" + sub}
	rep.Table.Add(views.Column{Label: "Job Family", Type: views.ColString, Values: keys(gs), Link: &views.LinkInfo{
		Path: "/reports/roles", Params: append([]views.LinkParam{views.FromCol("job_family", "Job Family")}, teamIDParam(rc)...)}})
	rep.Table.Add(views.Column{Label: "Count", Type: views.ColNumeric, Values: counts(gs), Link: &views.LinkInfo{
		Path: "/employees", Params: append([]views.LinkParam{views.FromCol("job_family", "Job Family")}, teamIDParam(rc)...)}})
	pct := groupPercentages(gs)
	rep.Table.Add(views.Column{Label: "Percentage", Type: views.ColPercentage, Values: pct})
	rep.Chart = &views.Chart{ID: "jobFamilyChart", Labels: keys(gs), Data: counts(gs), Percentages: pct, XLabel: employeesLabel}
	s.renderReport(w, r, rep)
}

func (s *Server) reportICs(w http.ResponseWriter, r *http.Request) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	f, err := s.employeeFilter(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	joins, where, args := f.SQL()
	managers, err := s.st.Count(rc.ctx, `SELECT COUNT(*) FROM employees`+joins+where+` AND employees.is_manager = 1`, args...)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	ics, err := s.st.Count(rc.ctx, `SELECT COUNT(*) FROM employees`+joins+where+` AND employees.is_manager != 1`, args...)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	sub, err := s.teamSubtitle(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	gs := []group{{Key: views.S("Managers"), Count: managers}, {Key: views.S("Individual Contributors"), Count: ics}}
	s.renderReport(w, r, simpleReport("Managers vs Individual Contributors", sub, gs, "Type", "icManagerChart", employeesLabel))
}

func (s *Server) reportManagementRatios(w http.ResponseWriter, r *http.Request) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	joins := ""
	where := ` WHERE employees.data_version_id = ?`
	args := []any{rc.versionID}
	subtitle := ""
	if present(rc.param("team_id")) {
		id, err := strconv.ParseInt(rc.param("team_id"), 10, 64)
		if err != nil {
			s.notFound(w, r)
			return
		}
		parent, err := s.st.FindAnyTeam(rc.ctx, id)
		if err != nil {
			s.fail(w, r, err)
			return
		}
		ids, err := s.st.SubtreeIDs(rc.ctx, rc.versionID, parent.FullPath)
		if err != nil {
			s.fail(w, r, err)
			return
		}
		joins = ` INNER JOIN teams_employees ON teams_employees.employee_id = employees.id`
		where += ` AND teams_employees.team_id IN (` + placeholders(len(ids)) + `) AND teams_employees.data_version_id = ?`
		for _, id := range ids {
			args = append(args, id)
		}
		args = append(args, rc.versionID)
		subtitle = " - " + parent.FullPath
	}
	sizes, err := s.st.GroupCounts(rc.ctx, `SELECT team_size, COUNT(*) AS count_all FROM (SELECT COUNT(*) AS team_size FROM employees`+
		joins+` INNER JOIN employees AS mgr ON mgr.person_id = employees.manager_id AND mgr.data_version_id = employees.data_version_id`+
		where+` GROUP BY employees.manager_id) A GROUP BY team_size ORDER BY team_size DESC`, args...)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	buckets := []string{"> 15", "11-15", "5-10", "3-4", "1-2"}
	agg := map[string]int{}
	for _, g := range sizes {
		size, _ := g.Key.(int64)
		managers := g.Count
		b := "1-2"
		switch {
		case size > 15:
			b = "> 15"
		case size > 10:
			b = "11-15"
		case size > 4:
			b = "5-10"
		case size > 2:
			b = "3-4"
		}
		agg[b] += managers
	}
	gs := make([]group, len(buckets))
	for i, b := range buckets {
		gs[i] = group{Key: views.S(b), Count: agg[b]}
	}
	pct := groupPercentages(gs)
	rep := views.Report{Title: "Management Ratios Report", Subtitle: subtitle}
	rep.Table.Add(views.Column{Label: "Manager Team Size", Type: views.ColString, Values: keys(gs)})
	rep.Table.Add(views.Column{Label: "Count", Type: views.ColNumeric, Values: counts(gs), Link: &views.LinkInfo{
		Path: "/employees", Params: []views.LinkParam{views.FromCol("direct_reports_bucket", "Manager Team Size")}}})
	rep.Table.Add(views.Column{Label: "Percentage", Type: views.ColPercentage, Values: pct})
	rep.Chart = &views.Chart{ID: "managementRatiosChart", Labels: keys(gs), Data: counts(gs), Percentages: pct, XLabel: "# of Managers"}
	s.renderReport(w, r, rep)
}

func placeholders(n int) string {
	if n == 0 {
		return "NULL"
	}
	return strings.TrimSuffix(strings.Repeat("?, ", n), ", ")
}

// teamGroups counts a version's teams (under the team_id team when
// subtree is set) grouped by a column.
func (s *Server) teamGroups(rc reportCtx, col string, subtree bool) ([]group, error) {
	where := ` WHERE teams.data_version_id = ?`
	args := []any{rc.versionID}
	if subtree {
		t, err := s.filterTeam(rc)
		if err != nil {
			return nil, err
		}
		if t != nil {
			where += ` AND (full_path = ? OR full_path LIKE ?)`
			args = append(args, t.FullPath, t.FullPath+store.PathSeparator+"%")
		}
	}
	gs, err := s.st.GroupCounts(rc.ctx, `SELECT teams.`+col+`, COUNT(*) FROM teams`+where+` GROUP BY teams.`+col, args...)
	if err != nil {
		return nil, err
	}
	return toGroups(gs), nil
}

func (s *Server) reportTeamDepth(w http.ResponseWriter, r *http.Request) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	gs, err := s.teamGroups(rc, "depth", false)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	gs = byKeyDesc(gs)
	pct := groupPercentages(gs)
	rep := views.Report{Title: "Team Depth Report"}
	rep.Table.Add(views.Column{Label: "Team Depth", Type: views.ColString, Values: keys(gs)})
	rep.Table.Add(views.Column{Label: teamsLabel, Type: views.ColNumeric, Values: counts(gs)})
	rep.Table.Add(views.Column{Label: "% of Total", Type: views.ColPercentage, Values: pct})
	rep.Chart = &views.Chart{ID: "teamDepthChart", Labels: keys(gs), Data: counts(gs), Percentages: pct, XLabel: teamsLabel}
	s.renderReport(w, r, rep)
}

func (s *Server) reportTeamSize(w http.ResponseWriter, r *http.Request) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	gs, err := s.teamGroups(rc, "member_count", true)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	sub, err := s.teamSubtitle(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.renderReport(w, r, simpleReport("Team Size Report", "Distribution of teams by member count"+sub, byKeyDesc(gs),
		"Team Size", "teamSizeChart", teamsLabel))
}

// teamCountReport is one of the older team reports: a count table by a
// column, ordered by count or by key.
func (s *Server) teamCountReport(w http.ResponseWriter, r *http.Request, col, title, header string, byKey bool) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	gs, err := s.teamGroups(rc, col, false)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	if byKey {
		gs = byKeyDesc(gs)
	} else {
		gs = byCountDesc(gs)
	}
	s.renderCountReport(w, r, countReport(title, "", header, gs, teamsLabel))
}

func (s *Server) reportTeamHealth(w http.ResponseWriter, r *http.Request) {
	s.teamCountReport(w, r, "team_health", "Team Health Report", "Team Health", false)
}

func (s *Server) reportTeamHealthDetails(w http.ResponseWriter, r *http.Request) {
	s.teamCountReport(w, r, "team_health_details", "Team Health Details Report", "Team Health Details", false)
}

func (s *Server) reportTeamChildren(w http.ResponseWriter, r *http.Request) {
	s.teamCountReport(w, r, "children", "Team Children Report", "Team Children", true)
}

func (s *Server) reportTeamManagers(w http.ResponseWriter, r *http.Request) {
	s.teamCountReport(w, r, "manager_count", "Team Members Managers Report", "Team Members Managers", true)
}
