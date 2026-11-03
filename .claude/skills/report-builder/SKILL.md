---
name: report-builder
description: How to add or change a report in the Go app (/reports/*) - the parts of a report, the shared helpers that keep each one small, and the routing, templ view, nav, and test steps. Use whenever asked to build a new report or change an existing one.
---

# Building a report in OrgView

Every report in the Go app is one handler function. It runs a query, turns the
rows into a `views.Report` (a table plus an optional bar chart), and hands that
to one shared templ page. A report never gets its own template, its own route
plumbing or its own store method unless the shared ones cannot express it. Keep
new reports that small: if a report needs more than about 40 lines, look for a
helper below before writing new code.

## Where the pieces live

| Piece | File | What you add |
|---|---|---|
| Handler | `internal/web/reports.go` | `func (s *Server) reportFoo(w, r)` |
| Route | `internal/web/server.go`, the `// Reports` map in `Handler()` | `"foo": s.reportFoo,` (served at `GET /reports/foo`) |
| Nav link | `internal/web/views/layout.templ`, the Reports dropdown | `<li><a class="dropdown-item" href="/reports/foo">Foo</a></li>` |
| Generated view | `internal/web/views/layout_templ.go` | regenerate with `make generate` and commit it |
| Page + table + chart | `internal/web/views/report.go`, `reports.templ` | nothing, normally |
| Query helpers | `internal/store/reports.go`, `EmployeeFilter` in `internal/store/employees.go` | nothing, normally |
| Tests | `internal/web/web_test.go` | the URL in `TestEveryPageLoads`, plus one focused test |
| Write-up (optional) | `docs/YYYY-MM-DD-<topic>.md` | only for reports with rules a reader must know, like tenure buckets |

Routes use snake_case (`/reports/employee_country`), handlers `reportCamelCase`,
chart IDs `camelCaseChart`. All reports are `GET` and read query parameters
only.

## Anatomy of a handler

Every handler has the same five steps, in this order:

1. **Context.** `rc, ok := s.reportContext(w, r); if !ok { return }`. `rc`
   carries the request, its context, and `rc.versionID` (the data version the
   navbar shows: the active one, else the most recent). `rc.param("name")`
   reads a query parameter.
2. **Filter.** For employee reports, `f, err := s.employeeFilter(rc)` gives a
   `store.EmployeeFilter` already narrowed to the `team_id` parameter's team and
   every team below it. Set more fields on it (`f.JobCode`, `f.JobFamily`,
   `f.Title`) for other standard filters; check them with `present(...)`.
3. **Query.** Use the narrowest shared helper (see "Data layer"). They return
   `[]group` (a `views.Value` key and an int count).
4. **Order.** `byCountDesc(gs)` (largest first, the default), `byKeyDesc(gs)`
   (numeric keys like depth or size), or a fixed bucket list (see "Buckets").
5. **Build and render.** Either `simpleReport(...)` for the standard three
   columns, or build a `views.Report` by hand, then `s.renderReport(w, r, rep)`.

Every error goes to `s.fail(w, r, err)` and returns. `fail` answers 404 for
`store.ErrNotFound` and 500 (logged) for anything else, so never write your own
`http.Error` in a report.

### The smallest report

When the report is "count employees by one column", it is one line on top of
`allEmployeesReport` (no team filter) or a few lines with `employeeGroups` +
`simpleReport` (with the team filter):

```go
func (s *Server) reportCountry(w http.ResponseWriter, r *http.Request) {
	s.allEmployeesReport(w, r, "country", "Employee Countries Report", "Distribution of employees by country", "Country", "employeeCountryChart")
}
```

```go
func (s *Server) reportFoo(w http.ResponseWriter, r *http.Request) {
	rc, ok := s.reportContext(w, r)
	if !ok {
		return
	}
	f, err := s.employeeFilter(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	gs, err := s.employeeGroups(rc, f, "COUNT(DISTINCT employees.id)", "foo", "")
	if err != nil {
		s.fail(w, r, err)
		return
	}
	sub, err := s.teamSubtitle(rc)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.renderReport(w, r, simpleReport("Foo Report", "Distribution of employees by foo"+sub,
		byCountDesc(gs), "Foo", "fooChart", employeesLabel))
}
```

Team reports do the same with `s.teamGroups(rc, "<teams column>", subtree)`
(`subtree` true honours `team_id`) and `teamsLabel`.

### A hand-built report

Build the table yourself when you need links, extra columns or other headers.
Columns are added left to right, and every column holds one `Values` slice of
the same length:

```go
pct := groupPercentages(gs)
rep := views.Report{Title: "Job Code Report", Subtitle: sub}
rep.Table.Add(views.Column{Label: "Job Code", Type: views.ColString, Values: keys(gs), Link: &views.LinkInfo{
	Path: "/reports/job_code_density", Params: append([]views.LinkParam{views.FromCol("job_code", "Job Code")}, teamIDParam(rc)...)}})
rep.Table.Add(views.Column{Label: "Count", Type: views.ColNumeric, Values: counts(gs), Link: &views.LinkInfo{
	Path: "/reports/roles", Params: append([]views.LinkParam{views.FromCol("job_code", "Job Code")}, teamIDParam(rc)...)}})
rep.Table.Add(views.Column{Label: "Percentage", Type: views.ColPercentage, Values: pct})
rep.Chart = &views.Chart{ID: "jobCodeChart", Labels: keys(gs), Data: counts(gs), Percentages: pct, XLabel: employeesLabel}
s.renderReport(w, r, rep)
```

`reportJobCode`, `reportJobFamily` and `reportManagementRatios` are good models.
`reportRoles` shows a second lookup query joined onto the groups (job family per
title), and `reportTitleDensity` / `reportJobCodeDensity` show drill-down with a
Back link.

## Shared patterns

### Page shape: `views.Report`

`views.Report{Title, Subtitle, Back, Table, Chart}` renders through
`views.ReportPage` (in `reports.templ`) as: optional Back button, title with
"N results" (the table's row count), grey subtitle, the table, a Totals row,
then the chart if `Chart` is set.

`views.CountReport` / `renderCountReport` / `countReport` is the older fixed
Label/Count/Percentage page kept for the reports ported as-is (seniority, team
health and friends). **Do not use it for new reports**; use `views.Report`.

### Columns

| Type | Cell text | Totals row |
|---|---|---|
| `views.ColString` | the value | blank |
| `views.ColNumeric` | the value | sum of the column |
| `views.ColPercentage` | value rounded to 1 place + `%` | sum, rounded to a whole number, + `%` |
| `views.ColAction` | a `btn-primary` button to the link, or "N/A" | blank |

The first column's Totals cell always says "Totals". Because numeric columns are
summed, put non-additive numbers (IDs, depths, averages, sizes used as labels)
in a `ColString` column. A percentage column that is a rate within each row
(say "% with direct reports") must not be summed either: check whether
`views.Column` has a `Total` override (the Managers by Title report adds one)
and set it to the overall rate, or add that override if it is missing.

When one row needs two counts (all people per title, and those who are
managers), run `employeeGroups` twice with different `extraWhere` and join the
results on the key in Go, as Managers by Title (`reportManagersByTitle`) does.

Values are `views.Value`: `views.S("x")`, `views.I(n)`, `views.F(x)`,
`views.NilValue()`, and `views.FromAny(dbValue)` for a scanned key. Helpers turn
`[]group` into columns: `keys(gs)`, `counts(gs)`, `groupPercentages(gs)`, and
`percentages([]int)` for counts you built yourself. Percentages are each
count's share of the total, rounded to two places, or 0 everywhere when the
total is 0.

### Labels and wording

- Count headers and chart legends use the shared constants `employeesLabel`
  (`"# of Employees"`) and `teamsLabel` (`"# of Teams"`); a different unit gets
  its own literal, like `"# of Managers"`.
- Title is "<Thing> Report". Subtitle is a short "Distribution of employees by
  <thing>" sentence plus `teamSubtitle(rc)`, which is `" - <team full path>"`
  when `team_id` names a team and `""` otherwise. Filters shown in the subtitle
  are joined with spaces (see `reportRoles`).

### Team filter and version scoping

Every report is scoped to one data version; a query that forgets the version
mixes snapshots.

- `EmployeeFilter.SQL()` returns `joins, where, args` selecting the **active**
  version's employees (it joins `data_versions` and requires `is_active = 1`),
  plus any filters set on it. Always build employee SQL as
  `FROM employees` + `joins` + `where` + `" AND ..."` with the filter's args
  first.
- Team queries filter on `teams.data_version_id = ?` with `rc.versionID`.
- `team_id` narrows to that team's subtree (`SubtreeIDs`, or `full_path = ? OR
  full_path LIKE ?` for team rows). An unknown or non-numeric `team_id` is
  ignored by `filterTeam`, so the report shows everything, not an error. Only
  the density drill-downs and management ratios, which look the team up
  themselves, turn a bad `team_id` into a 404. New reports should use
  `filterTeam` and ignore it.
- Pass the filter on in links with `teamIDParam(rc)`, so clicking through keeps
  the same team.

### Links from cells

`Column.Link = &views.LinkInfo{Path, Params}` makes each cell a link.

- `views.FromCol("param", "Column Label")` takes the value from another column
  in the same row (by label). Add `Lookup: map[string]views.Value{...}` to map
  that value to something else, like a team name to its ID.
- `views.Fixed("param", value)` adds the same value on every row.
- A path containing `:id` (like `/teams/:id`) takes the `id` param into the path.
- A row whose param value is nil gets plain text instead of a link.
- Query strings come out with sorted keys (`views.Query`).

Common targets: another report (`/reports/roles?job_code=...`), or the employee
list, which accepts `title`, `job_code`, `job_family`, `team_id`,
`direct_reports_bucket` (`1+`, `1-2`, `3-4`, `5-10`, `11-15`, `> 15`) and `q`. If a
report needs to link to a list filter that does not exist yet, add the field to
`EmployeeFilter` and parse it in `employeesIndex` rather than inventing a new
list page.

### Buckets

When rows are bands (tenure years, team sizes), keep the bands in a package
`var` slice in display order, tally into a map in Go, then emit one `group` per
band in that order, keeping zero rows, and add an "Unknown" row only when there
are unknowns. See `tenureBuckets` / `reportTenure` and `reportManagementRatios`.
Put any fixed "as of" date or threshold in a named package variable with a
comment, and show it in the subtitle.

### Chart

`views.Chart{ID, Labels, Data, Percentages, XLabel}` is a horizontal Chart.js
bar chart with "count (pct%)" drawn on each bar. Usually Labels/Data/Percentages
are the same slices as the table's key, count and percentage columns. The ID
must be unique on the page. Set `Chart` to nil for reports where a bar per row
makes no sense, such as a list of people.

## Data layer

Reach for these, in order, before adding a store method:

| Helper | Returns | For |
|---|---|---|
| `s.employeeGroups(rc, f, countExpr, col, extraWhere, extraArgs...)` | `[]group` | employees grouped by one column; `countExpr` is `COUNT(*)` or `COUNT(DISTINCT employees.id)` (use DISTINCT when the filter joins teams) |
| `s.teamGroups(rc, col, subtree)` | `[]group` | teams grouped by one column |
| `s.st.GroupCounts(ctx, sql, args...)` | `[]store.Group` (wrap with `toGroups`) | any other `SELECT key, count` query, including subqueries |
| `s.st.Count(ctx, sql, args...)` | `int` | single counts (see `reportICs`) |
| `s.st.StringPairs(ctx, sql, args...)` | `map[string]sql.NullString` | a second per-key value to join onto the groups (see `reportRoles`) |
| `s.st.StartDates`, `s.st.Teams(ctx, where, args...)` | rows | Go-side computation over dates or team rows |

`extraWhere` starts with `" AND ..."`, uses `?` placeholders, and its args go in
`extraArgs` (see `reportSeniority`). Never paste request values into SQL; only
column names chosen in code are concatenated. Use `placeholders(n)` for `IN`
lists and `likeEscape` (with `ESCAPE '!'`) for `LIKE` on user text.

Add a new store method in `internal/store/reports.go` only when a report needs
rows of a shape none of these give (for example, a list of employees with
several columns). Keep it generic (query in, rows out) like the existing ones,
and keep the report's SQL in the handler.

## The Rails history

The existing reports were ported from the Rails `ReportsController` and match
it row for row, which is why some helpers mimic Ruby (`byCountDesc` reproduces
Ruby's unstable sort, `views.Value` prints `0` vs `0.0` like Ruby, `rubyInt`,
the transform_keys quirk in `reportJobFamily`). New reports have no Rails
counterpart: use the same helpers for consistency, but don't add new Ruby
emulation, and don't add new reports to the `cmd/parity` crawler, which compares
against Rails.

## Steps

1. Read the closest existing report and copy its shape.
2. Write the handler in `internal/web/reports.go`, next to related reports
   (employee reports first, team reports at the end).
3. Register it in the `// Reports` map in `server.go`.
4. Add the nav link in `layout.templ`: employee reports above the divider, team
   reports below it, near related ones. If the report filters by team, consider
   a button on the team page (`teams.templ`, next to "Roles Report for ...").
5. `make generate` and commit the regenerated `*_templ.go` files. CI fails if
   they are stale.
6. Tests in `internal/web/web_test.go`:
   - add `/reports/foo` (and a `?team_id=1` variant if it filters) to
     `TestEveryPageLoads`;
   - add `TestFoo` that loads the page with `newApp(t)` and checks real numbers:
     `a.get("/reports/foo").rows()` gives each table row's cell text, the last
     row being Totals; `wantContains` / `wantLacks` check text and link hrefs
     (HTML-escaped, so `&amp;`). Use `storetest.Exec(t, a.st, "UPDATE ...")` to
     set up the data the report needs.
   - The fixtures (`internal/store/storetest/storetest.go`) are an active
     version 1 with 14 employees, an archived version 2 with 2 more (Germany,
     Frankfurt), and four version 1 teams: Engineering (id 1) > Frontend (2)
     and Backend (3), plus Leadership (4), with only five employees placed on
     teams (`teams_employees`). Write down in a comment which fixture rows produce each
     expected number, as `TestManagementRatios` does.
7. `make vet` (vet + gofmt) and `make test`. No trailing whitespace.
8. To see it: `make dev`, then open http://localhost:3000/reports/foo.
