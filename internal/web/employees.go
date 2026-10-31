package web

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/geordie/orgview-jt/internal/store"
	"github.com/geordie/orgview-jt/internal/web/views"
)

func itoa(n int64) string { return strconv.FormatInt(n, 10) }

// directReportsRange maps a management ratios bucket to its range of
// direct reports.
func directReportsRange(bucket string) [2]int {
	switch bucket {
	case "> 15":
		return [2]int{16, 9999}
	case "11-15":
		return [2]int{11, 15}
	case "5-10":
		return [2]int{5, 10}
	case "3-4":
		return [2]int{3, 4}
	case "1-2":
		return [2]int{1, 2}
	}
	return [2]int{0, 0}
}

const employeesPerPage = 20

func (s *Server) employeesIndex(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	q := r.URL.Query()
	var f store.EmployeeFilter
	if present(q.Get("title")) {
		f.Title = q.Get("title")
	}
	if present(q.Get("job_code")) {
		f.JobCode = q.Get("job_code")
	}
	if present(q.Get("job_family")) {
		f.JobFamily = q.Get("job_family")
	}
	bucket := q.Get("direct_reports_bucket")
	if present(bucket) {
		rng := directReportsRange(bucket)
		f.DirectReports = &rng
	} else {
		bucket = ""
	}
	if present(q.Get("team_id")) {
		versionID, _, err := s.currentVersionID(ctx)
		if err != nil {
			s.fail(w, r, err)
			return
		}
		if id, err := strconv.ParseInt(q.Get("team_id"), 10, 64); err == nil {
			team, err := s.st.FindTeam(ctx, versionID, id)
			switch {
			case err == nil:
				if f.TeamIDs, err = s.st.SubtreeIDs(ctx, versionID, team.FullPath); err != nil {
					s.fail(w, r, err)
					return
				}
			case !errors.Is(err, store.ErrNotFound):
				s.fail(w, r, err)
				return
			}
		}
	}
	page := pageParam(r)
	list, total, err := s.st.CurrentEmployees(ctx, f, page, employeesPerPage)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	if wantsJSON(r) {
		out := make([]any, len(list))
		for i, e := range list {
			out[i] = employeeSummary(r, e)
		}
		writeJSON(w, http.StatusOK, out)
		return
	}
	rows, err := s.employeeRows(r, list)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.render(w, r, http.StatusOK, views.EmployeesIndex(p, views.EmployeesData{
		Bucket: bucket, Pager: pagerFor(r, page, employeesPerPage, total), Rows: rows}))
}

// employeeRows adds each employee's manager, first team and number of
// direct reports, loading them in a few queries for the whole page.
func (s *Server) employeeRows(r *http.Request, list []store.Employee) ([]views.EmployeeRow, error) {
	ctx := r.Context()
	ids := make([]int64, len(list))
	byVersion := map[sql.NullInt64][]string{}
	for i, e := range list {
		ids[i] = e.ID
		if e.ManagerID.Valid {
			byVersion[e.DataVersionID] = append(byVersion[e.DataVersionID], e.ManagerID.String)
		}
	}
	teams, err := s.st.EmployeeTeamsByID(ctx, ids)
	if err != nil {
		return nil, err
	}
	managers := map[sql.NullInt64]map[string]store.Employee{}
	for v, pids := range byVersion {
		if managers[v], err = s.st.EmployeesByPersonID(ctx, v, pids); err != nil {
			return nil, err
		}
	}
	counts := map[sql.NullInt64]map[string]int{}
	rows := make([]views.EmployeeRow, len(list))
	for i, e := range list {
		row := views.EmployeeRow{Employee: e}
		if e.ManagerID.Valid {
			if m, ok := managers[e.DataVersionID][strings.ToLower(e.ManagerID.String)]; ok {
				row.Manager = &m
			}
		}
		if ts := teams[e.ID]; len(ts) > 0 {
			row.Team = &ts[0]
		}
		if _, ok := counts[e.DataVersionID]; !ok {
			if counts[e.DataVersionID], err = s.st.DirectReportCounts(ctx, e.DataVersionID); err != nil {
				return nil, err
			}
		}
		row.DirectReports = counts[e.DataVersionID][strings.ToLower(e.PersonID)]
		rows[i] = row
	}
	return rows, nil
}

// employeeSummary is the short JSON the Rails jbuilder views rendered.
func employeeSummary(r *http.Request, e store.Employee) map[string]any {
	return map[string]any{
		"id":         e.ID,
		"created_at": e.CreatedAt.UTC().Format("2006-01-02T15:04:05.000Z"),
		"updated_at": e.UpdatedAt.UTC().Format("2006-01-02T15:04:05.000Z"),
		"url":        baseURL(r) + "/employees/" + itoa(e.ID) + ".json",
	}
}

func (s *Server) loadEmployee(w http.ResponseWriter, r *http.Request) (store.Employee, bool) {
	id, ok := s.pathID(w, r)
	if !ok {
		return store.Employee{}, false
	}
	e, err := s.st.FindEmployee(r.Context(), id)
	if err != nil {
		s.fail(w, r, err)
		return e, false
	}
	return e, true
}

func (s *Server) employeeShow(w http.ResponseWriter, r *http.Request) {
	e, ok := s.loadEmployee(w, r)
	if !ok {
		return
	}
	if wantsJSON(r) {
		writeJSON(w, http.StatusOK, employeeSummary(r, e))
		return
	}
	ctx := r.Context()
	d := views.EmployeeData{Employee: e}
	m, ok, err := s.st.Manager(ctx, e)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	if ok {
		d.Manager = &m
	}
	if d.DirectReports, err = s.st.DirectReports(ctx, e); err != nil {
		s.fail(w, r, err)
		return
	}
	if d.Teams, err = s.st.EmployeeTeams(ctx, e.ID); err != nil {
		s.fail(w, r, err)
		return
	}
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.render(w, r, http.StatusOK, views.EmployeeShow(p, d))
}

func employeeForm(e store.Employee) views.EmployeeForm {
	f := views.EmployeeForm{ID: e.ID, PersonID: e.PersonID, Title: e.Title.String, JobCode: e.JobCode.String,
		JobLevel: e.JobLevel.String, Country: e.Country.String, PersonnelArea: e.PersonnelArea.String,
		Company: e.Company.String, ManagerID: e.ManagerID.String}
	if e.Seniority.Valid {
		f.Seniority = itoa(e.Seniority.Int64)
	}
	if e.IsManager.Valid {
		f.IsManager = strconv.FormatBool(e.IsManager.Bool)
	}
	return f
}

func (s *Server) employeeNew(w http.ResponseWriter, r *http.Request) {
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.render(w, r, http.StatusOK, views.EmployeeFormPage(p, views.EmployeeForm{}))
}

func (s *Server) employeeEdit(w http.ResponseWriter, r *http.Request) {
	e, ok := s.loadEmployee(w, r)
	if !ok {
		return
	}
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.render(w, r, http.StatusOK, views.EmployeeFormPage(p, employeeForm(e)))
}

func employeeFields(f map[string]string) store.EmployeeFields {
	return store.EmployeeFields{
		PersonID: field(f, "person_id"), Title: field(f, "title"), JobCode: field(f, "job_code"),
		JobLevel: field(f, "job_level"), Seniority: field(f, "seniority"), ManagerID: field(f, "manager_id"),
		IsManager: field(f, "is_manager"), Country: field(f, "country"), PersonnelArea: field(f, "personnel_area"),
		Company: field(f, "company"), DataVersionID: field(f, "data_version_id"), Name: field(f, "name"),
	}
}

var employeeAttrs = []string{"title", "job_code", "seniority", "employee_type", "person_id", "name"}

func (s *Server) employeeCreate(w http.ResponseWriter, r *http.Request) {
	f, err := formFields(r, "employee")
	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	e, err := s.st.CreateEmployee(r.Context(), employeeFields(f))
	if s.employeeSaveFailed(w, r, e, err) {
		return
	}
	if wantsJSON(r) {
		w.Header().Set("Location", baseURL(r)+"/employees/"+itoa(e.ID))
		writeJSON(w, http.StatusCreated, employeeSummary(r, e))
		return
	}
	s.redirect(w, r, "/employees/"+itoa(e.ID), flash{Notice: "Employee was successfully created."})
}

func (s *Server) employeeUpdate(w http.ResponseWriter, r *http.Request) {
	id, ok := s.pathID(w, r)
	if !ok {
		return
	}
	f, err := formFields(r, "employee")
	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	e, err := s.st.UpdateEmployee(r.Context(), id, employeeFields(f))
	if s.employeeSaveFailed(w, r, e, err) {
		return
	}
	if wantsJSON(r) {
		writeJSON(w, http.StatusOK, e)
		return
	}
	s.redirect(w, r, "/employees/"+itoa(e.ID), flash{Notice: "Employee was successfully updated."})
}

// employeeSaveFailed answers a failed save, re-showing the form with its
// errors, and reports whether it did.
func (s *Server) employeeSaveFailed(w http.ResponseWriter, r *http.Request, e store.Employee, err error) bool {
	var verrs store.ValidationErrors
	switch {
	case err == nil:
		return false
	case errors.As(err, &verrs):
		if wantsJSON(r) {
			writeJSON(w, http.StatusUnprocessableEntity, errorsJSON(verrs, employeeAttrs...))
			return true
		}
		p, perr := s.page(w, r)
		if perr != nil {
			s.fail(w, r, perr)
			return true
		}
		form := employeeForm(e)
		form.Errors = verrs
		s.render(w, r, http.StatusUnprocessableEntity, views.EmployeeFormPage(p, form))
	default:
		s.fail(w, r, err)
	}
	return true
}

func (s *Server) employeeDestroy(w http.ResponseWriter, r *http.Request) {
	id, ok := s.pathID(w, r)
	if !ok {
		return
	}
	if err := s.st.DeleteEmployee(r.Context(), id); err != nil {
		s.fail(w, r, err)
		return
	}
	if wantsJSON(r) {
		w.WriteHeader(http.StatusNoContent)
		return
	}
	s.redirect(w, r, "/employees", flash{Notice: "Employee was successfully deleted."})
}

func (s *Server) employeesDestroyAll(w http.ResponseWriter, r *http.Request) {
	_, v, err := s.currentVersionID(r.Context())
	if err != nil {
		s.fail(w, r, err)
		return
	}
	if v == nil {
		s.redirect(w, r, "/employees", flash{Alert: "No data version selected, so no employees were deleted."})
		return
	}
	n, err := s.st.DeleteVersionEmployees(r.Context(), v.ID)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.redirect(w, r, "/employees", flash{Notice: fmt.Sprintf("Deleted %d employees from %s.", n, v.Name)})
}

// treeNode is one employee in the reporting-line chart.
type treeNode struct {
	ID      int64       `json:"id"`
	Title   string      `json:"title"`
	Details treeDetails `json:"details"`
}

type treeDetails struct {
	Title   *string `json:"title"`
	Team    string  `json:"team"`
	Directs int     `json:"directs"`
	OrgSize int     `json:"orgSize"`
}

func teamNames(ts []store.Team) []string {
	names := make([]string, len(ts))
	for i, t := range ts {
		names[i] = t.Name
	}
	return names
}

func (s *Server) employeesTree(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	versionID, _, err := s.currentVersionID(ctx)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	sizes, err := s.st.OrgSizes(ctx, versionID)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	roots, err := s.st.TreeRoots(ctx, versionID)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	ids := make([]int64, len(roots))
	for i, e := range roots {
		ids[i] = e.ID
	}
	teams, err := s.st.EmployeeTeamsByID(ctx, ids)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	counts := map[sql.NullInt64]map[string]int{}
	nodes := make([]treeNode, len(roots))
	for i, e := range roots {
		if _, ok := counts[e.DataVersionID]; !ok {
			if counts[e.DataVersionID], err = s.st.DirectReportCounts(ctx, e.DataVersionID); err != nil {
				s.fail(w, r, err)
				return
			}
		}
		var title *string
		if e.Title.Valid {
			title = &e.Title.String
		}
		nodes[i] = treeNode{ID: e.ID, Title: e.DisplayName(), Details: treeDetails{
			Title: title, Team: strings.Join(teamNames(teams[e.ID]), ", "),
			Directs: counts[e.DataVersionID][strings.ToLower(e.PersonID)], OrgSize: sizes[strings.ToLower(e.PersonID)],
		}}
	}
	b, err := json.Marshal(nodes)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.render(w, r, http.StatusOK, views.EmployeeTree(p, string(b)))
}

// hierarchyNode is one direct report as the chart loads it.
type hierarchyNode struct {
	Employee      store.Employee  `json:"employee"`
	DirectsCount  int             `json:"directs_count"`
	OrgSize       int             `json:"org_size"`
	TeamNames     []string        `json:"team_names"`
	DirectReports []hierarchyNode `json:"direct_reports"`
}

func (s *Server) directReports(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	m, ok := s.loadEmployee(w, r)
	if !ok {
		return
	}
	reports, err := s.st.DirectReports(ctx, m)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	var sizes map[string]int
	if m.DataVersionID.Valid {
		if sizes, err = s.st.OrgSizes(ctx, m.DataVersionID.Int64); err != nil {
			s.fail(w, r, err)
			return
		}
	}
	counts, err := s.st.DirectReportCounts(ctx, m.DataVersionID)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	ids := make([]int64, len(reports))
	for i, e := range reports {
		ids[i] = e.ID
	}
	teams, err := s.st.EmployeeTeamsByID(ctx, ids)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	nodes := make([]hierarchyNode, len(reports))
	for i, e := range reports {
		pid := strings.ToLower(e.PersonID)
		nodes[i] = hierarchyNode{Employee: e, DirectsCount: counts[pid], OrgSize: sizes[pid],
			TeamNames: teamNames(teams[e.ID]), DirectReports: []hierarchyNode{}}
	}
	if wantsJSON(r) {
		writeJSON(w, http.StatusOK, nodes)
		return
	}
	entries := make([]views.StructureEntry, len(nodes))
	for i, n := range nodes {
		entries[i] = views.StructureEntry{Employee: n.Employee, DirectsCount: n.DirectsCount}
	}
	s.render(w, r, http.StatusOK, views.EmployeeStructure(entries))
}

// csvUpload reads the uploaded csv_file, checking it as the Rails app did.
// It returns the flash alert to show when the file is unusable.
func csvUpload(r *http.Request) (io.ReadCloser, string) {
	const maxSize = 58 << 20
	if err := r.ParseMultipartForm(32 << 20); err != nil {
		return nil, "No file selected."
	}
	file, hdr, err := r.FormFile("csv_file")
	if err != nil {
		return nil, "No file selected."
	}
	switch strings.ToLower(strings.TrimSpace(strings.Split(hdr.Header.Get("Content-Type"), ";")[0])) {
	case "text/csv", "application/csv", "application/vnd.ms-excel":
	default:
		file.Close()
		return nil, "Please upload a valid CSV file."
	}
	if hdr.Size == 0 {
		file.Close()
		return nil, "The uploaded file is empty."
	}
	if hdr.Size > maxSize {
		file.Close()
		return nil, "The uploaded file is too large. Please upload a file smaller than 58MB."
	}
	return file, ""
}

func (s *Server) importEmployees(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, 64<<20)
	file, alert := csvUpload(r)
	if alert != "" {
		s.redirect(w, r, "/", flash{Alert: alert})
		return
	}
	defer file.Close()
	n, err := s.st.ImportEmployees(r.Context(), file)
	if s.importFailed(w, r, err) {
		return
	}
	s.redirect(w, r, "/", flash{Notice: fmt.Sprintf("Imported %d employees successfully.", n)})
}

func (s *Server) importContractors(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, 64<<20)
	file, alert := csvUpload(r)
	if alert != "" {
		s.redirect(w, r, "/", flash{Alert: alert})
		return
	}
	defer file.Close()
	n, err := s.st.ImportContractors(r.Context(), file)
	if s.importFailed(w, r, err) {
		return
	}
	s.redirect(w, r, "/", flash{Notice: fmt.Sprintf("Imported %d contractors successfully.", n)})
}

func (s *Server) importFailed(w http.ResponseWriter, r *http.Request, err error) bool {
	var ierr store.ImportError
	switch {
	case err == nil:
		return false
	case errors.As(err, &ierr):
		s.redirect(w, r, "/", flash{Alert: ierr.Error()})
	default:
		s.log.Error("import failed", "err", err)
		s.redirect(w, r, "/", flash{Alert: "The import failed: " + err.Error()})
	}
	return true
}

func (s *Server) populateJobFamilies(w http.ResponseWriter, r *http.Request) {
	v, ok, err := s.st.ActiveVersion(r.Context())
	if err != nil {
		s.fail(w, r, err)
		return
	}
	if !ok {
		s.redirect(w, r, "/", flash{Alert: "No active data version found."})
		return
	}
	n, err := s.st.PopulateJobFamilies(r.Context(), v.ID)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.redirect(w, r, "/", flash{Notice: fmt.Sprintf("Job families populated: %d employee(s) updated.", n)})
}
