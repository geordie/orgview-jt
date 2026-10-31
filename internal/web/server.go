// Package web serves the OrgView pages and JSON endpoints.
package web

import (
	"context"
	"crypto/sha256"
	"embed"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"errors"
	"io/fs"
	"log/slog"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"github.com/a-h/templ"

	"github.com/geordie/orgview-jt/internal/store"
	"github.com/geordie/orgview-jt/internal/web/views"
)

//go:embed static
var staticFS embed.FS

// Server holds what the handlers share.
type Server struct {
	st     *store.Store
	log    *slog.Logger
	static fs.FS
	hashes map[string]string
}

// New returns a server backed by st.
func New(st *store.Store, log *slog.Logger) *Server {
	sub, err := fs.Sub(staticFS, "static")
	if err != nil {
		panic(err)
	}
	s := &Server{st: st, log: log, static: sub, hashes: map[string]string{}}
	_ = fs.WalkDir(sub, ".", func(p string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return err
		}
		b, err := fs.ReadFile(sub, p)
		if err != nil {
			return err
		}
		h := sha256.Sum256(b)
		s.hashes[p] = hex.EncodeToString(h[:])[:12]
		return nil
	})
	return s
}

// asset is the URL of a static file, with its content hash so browsers
// fetch it again when it changes.
func (s *Server) asset(name string) string {
	if h, ok := s.hashes[name]; ok {
		return "/static/" + name + "?v=" + h
	}
	return "/static/" + name
}

// Handler returns the app's routes wrapped in its middleware.
func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /up", func(w http.ResponseWriter, r *http.Request) {
		if err := s.st.DB.PingContext(r.Context()); err != nil {
			http.Error(w, "database unavailable", http.StatusServiceUnavailable)
			return
		}
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		_, _ = w.Write([]byte(`<!DOCTYPE html><html><body style="background-color: green"></body></html>`))
	})
	static := http.StripPrefix("/static/", http.FileServerFS(s.static))
	mux.Handle("GET /static/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Query().Get("v") != "" {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		}
		static.ServeHTTP(w, r)
	}))
	mux.Handle("GET /favicon.ico", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFileFS(w, r, s.static, "favicon.ico")
	}))
	mux.Handle("GET /robots.txt", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFileFS(w, r, s.static, "robots.txt")
	}))
	// The stylesheet's jQuery UI theme refers to its images at /images/.
	mux.Handle("GET /images/", http.FileServerFS(s.static))

	mux.HandleFunc("GET /{$}", s.home)

	// Employees
	mux.HandleFunc("GET /employees", s.employeesIndex)
	mux.HandleFunc("GET /employees/new", s.employeeNew)
	mux.HandleFunc("POST /employees", s.employeeCreate)
	mux.HandleFunc("GET /employees/{id}", s.employeeShow)
	mux.HandleFunc("GET /employees/{id}/edit", s.employeeEdit)
	mux.HandleFunc("PATCH /employees/{id}", s.employeeUpdate)
	mux.HandleFunc("PUT /employees/{id}", s.employeeUpdate)
	mux.HandleFunc("DELETE /employees/{id}", s.employeeDestroy)
	mux.HandleFunc("GET /employees/treeview", s.employeesTree)
	mux.HandleFunc("DELETE /employees/destroy_all", s.employeesDestroyAll)
	mux.HandleFunc("GET /employees/{id}/direct_reports", s.directReports)
	mux.HandleFunc("GET /employees/{id}/direct_reports.json", s.directReports)
	mux.HandleFunc("POST /employees/import_csv", s.importEmployees)
	mux.HandleFunc("POST /employees/import_csv_contractors", s.importContractors)
	mux.HandleFunc("POST /employees/populate_job_families", s.populateJobFamilies)

	// Teams
	mux.HandleFunc("GET /teams", s.teamsIndex)
	mux.HandleFunc("GET /teams/new", s.teamNew)
	mux.HandleFunc("POST /teams", s.teamCreate)
	mux.HandleFunc("GET /teams/{id}", s.teamShow)
	mux.HandleFunc("GET /teams/{id}/edit", s.teamEdit)
	mux.HandleFunc("PATCH /teams/{id}", s.teamUpdate)
	mux.HandleFunc("PUT /teams/{id}", s.teamUpdate)
	mux.HandleFunc("DELETE /teams/{id}", s.teamDestroy)
	mux.HandleFunc("POST /teams/build_all_teams_stats", s.buildTeamStats)
	mux.HandleFunc("GET /teams/treeview", s.teamsTree)
	mux.HandleFunc("GET /teams/{id}/sub_teams", s.subTeams)
	mux.HandleFunc("GET /teams/{id}/sub_teams.json", s.subTeams)
	mux.HandleFunc("GET /teams/{id}/team_members", s.teamMembers)
	mux.HandleFunc("GET /teams/{id}/team_members.json", s.teamMembers)
	mux.HandleFunc("GET /teams/{id}/move_candidates", s.moveCandidates)
	mux.HandleFunc("GET /teams/{id}/move_candidates.json", s.moveCandidates)
	mux.HandleFunc("PATCH /teams/{id}/move", s.moveTeam)

	// Reports
	for name, h := range map[string]http.HandlerFunc{
		"roles":                   s.reportRoles,
		"title_density":           s.reportTitleDensity,
		"job_code_density":        s.reportJobCodeDensity,
		"seniority":               s.reportSeniority,
		"tenure":                  s.reportTenure,
		"job_code":                s.reportJobCode,
		"employee_country":        s.reportCountry,
		"personnel_area":          s.reportPersonnelArea,
		"company":                 s.reportCompany,
		"job_family":              s.reportJobFamily,
		"individual_contributors": s.reportICs,
		"management_ratios":       s.reportManagementRatios,
		"team_depth":              s.reportTeamDepth,
		"team_size":               s.reportTeamSize,
		"team_health":             s.reportTeamHealth,
		"team_health_details":     s.reportTeamHealthDetails,
		"team_children":           s.reportTeamChildren,
		"team_members_managers":   s.reportTeamManagers,
	} {
		mux.HandleFunc("GET /reports/"+name, h)
	}

	// Data versions
	mux.HandleFunc("GET /data_versions", s.versionsIndex)
	mux.HandleFunc("GET /data_versions/new", s.versionNew)
	mux.HandleFunc("POST /data_versions", s.versionCreate)
	mux.HandleFunc("GET /data_versions/{id}", s.versionShow)
	mux.HandleFunc("GET /data_versions/{id}/edit", s.versionEdit)
	mux.HandleFunc("PATCH /data_versions/{id}", s.versionUpdate)
	mux.HandleFunc("PUT /data_versions/{id}", s.versionUpdate)
	mux.HandleFunc("DELETE /data_versions/{id}", s.versionDestroy)
	mux.HandleFunc("PATCH /data_versions/{id}/activate", s.versionActivate)
	mux.HandleFunc("PATCH /data_versions/{id}/archive", s.versionArchive)

	var h http.Handler = mux
	h = methodOverride(h)
	h = http.NewCrossOriginProtection().Handler(h)
	h = s.recoverer(h)
	h = s.logRequests(h)
	return h
}

// methodOverride turns a POST with a _method form field into that method,
// as Rails does for forms and rails-ujs data-method links.
func methodOverride(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost && strings.HasPrefix(r.Header.Get("Content-Type"), "application/x-www-form-urlencoded") {
			switch m := strings.ToUpper(r.PostFormValue("_method")); m {
			case http.MethodPatch, http.MethodPut, http.MethodDelete:
				r.Method = m
			}
		}
		next.ServeHTTP(w, r)
	})
}

type statusWriter struct {
	http.ResponseWriter
	status int
}

func (w *statusWriter) WriteHeader(code int) {
	w.status = code
	w.ResponseWriter.WriteHeader(code)
}

func (s *Server) logRequests(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		sw := &statusWriter{ResponseWriter: w, status: http.StatusOK}
		next.ServeHTTP(sw, r)
		if strings.HasPrefix(r.URL.Path, "/static/") {
			return
		}
		s.log.Info("request", "method", r.Method, "path", r.URL.RequestURI(), "status", sw.status,
			"duration", time.Since(start).Round(time.Microsecond))
	})
}

func (s *Server) recoverer(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if v := recover(); v != nil {
				if v == http.ErrAbortHandler {
					panic(v)
				}
				s.log.Error("panic", "method", r.Method, "path", r.URL.Path, "panic", v)
				http.Error(w, "We're sorry, but something went wrong.", http.StatusInternalServerError)
			}
		}()
		next.ServeHTTP(w, r)
	})
}

// fail answers with a 404 for missing records and a 500 for anything else.
func (s *Server) fail(w http.ResponseWriter, r *http.Request, err error) {
	if errors.Is(err, store.ErrNotFound) {
		s.notFound(w, r)
		return
	}
	s.log.Error("request failed", "method", r.Method, "path", r.URL.Path, "err", err)
	if wantsJSON(r) {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Internal Server Error"})
		return
	}
	http.Error(w, "We're sorry, but something went wrong.", http.StatusInternalServerError)
}

func (s *Server) notFound(w http.ResponseWriter, r *http.Request) {
	if wantsJSON(r) {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Not Found"})
		return
	}
	http.Error(w, "The page you were looking for doesn't exist.", http.StatusNotFound)
}

// pathID is the {id} wildcard as a number, accepting a ".json" suffix.
// ok is false (and a 404 sent) when it is not a number.
func (s *Server) pathID(w http.ResponseWriter, r *http.Request) (int64, bool) {
	raw := strings.TrimSuffix(r.PathValue("id"), ".json")
	id, err := strconv.ParseInt(raw, 10, 64)
	if err != nil || id < 0 {
		s.notFound(w, r)
		return 0, false
	}
	return id, true
}

// wantsJSON reports whether the request asked for JSON, by a .json path or
// the Accept header.
func wantsJSON(r *http.Request) bool {
	if strings.HasSuffix(r.URL.Path, ".json") {
		return true
	}
	accept := r.Header.Get("Accept")
	return strings.Contains(accept, "application/json") && !strings.Contains(accept, "text/html")
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func (s *Server) render(w http.ResponseWriter, r *http.Request, status int, c templ.Component) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(status)
	if err := c.Render(r.Context(), w); err != nil {
		s.log.Error("render failed", "path", r.URL.Path, "err", err)
	}
}

// flash is the one-request message shown after a redirect.
type flash struct {
	Notice string `json:"notice,omitempty"`
	Alert  string `json:"alert,omitempty"`
}

const flashCookie = "orgview_flash"

// redirect sends the browser to target with an optional flash message.
func (s *Server) redirect(w http.ResponseWriter, r *http.Request, target string, f flash) {
	if f.Notice != "" || f.Alert != "" {
		b, _ := json.Marshal(f)
		http.SetCookie(w, &http.Cookie{Name: flashCookie, Value: base64.RawURLEncoding.EncodeToString(b), Path: "/",
			HttpOnly: true, SameSite: http.SameSiteLaxMode})
	}
	http.Redirect(w, r, target, http.StatusFound)
}

// redirectBack returns to the referring page on this host, else to "/".
func (s *Server) redirectBack(w http.ResponseWriter, r *http.Request, f flash) {
	target := "/"
	if ref, err := url.Parse(r.Referer()); err == nil && ref.Host == r.Host && ref.Path != "" {
		target = ref.RequestURI()
	}
	s.redirect(w, r, target, f)
}

func takeFlash(w http.ResponseWriter, r *http.Request) flash {
	var f flash
	c, err := r.Cookie(flashCookie)
	if err != nil {
		return f
	}
	http.SetCookie(w, &http.Cookie{Name: flashCookie, Value: "", Path: "/", MaxAge: -1})
	if b, err := base64.RawURLEncoding.DecodeString(c.Value); err == nil {
		_ = json.Unmarshal(b, &f)
	}
	return f
}

// page loads what the layout needs: the navbar's versions and the flash.
func (s *Server) page(w http.ResponseWriter, r *http.Request) (views.Page, error) {
	p := views.Page{Asset: s.asset}
	active, ok, err := s.st.ActiveVersion(r.Context())
	if err != nil {
		return p, err
	}
	p.Versions, err = s.st.RecentVersions(r.Context(), 10)
	if err != nil {
		return p, err
	}
	if ok {
		p.Current = &active
	} else if len(p.Versions) > 0 {
		p.Current = &p.Versions[0]
	}
	f := takeFlash(w, r)
	p.Notice, p.Alert = f.Notice, f.Alert
	return p, nil
}

// currentVersionID is the version the navbar shows (active, else most
// recent), or 0 when there are none. Reports and filters use it.
func (s *Server) currentVersionID(ctx context.Context) (int64, *store.DataVersion, error) {
	active, ok, err := s.st.ActiveVersion(ctx)
	if err != nil {
		return 0, nil, err
	}
	if ok {
		return active.ID, &active, nil
	}
	recent, err := s.st.RecentVersions(ctx, 1)
	if err != nil || len(recent) == 0 {
		return 0, nil, err
	}
	return recent[0].ID, &recent[0], nil
}

// baseURL is the scheme and host the request came in on.
func baseURL(r *http.Request) string {
	scheme := "http"
	if r.TLS != nil || r.Header.Get("X-Forwarded-Proto") == "https" {
		scheme = "https"
	}
	return scheme + "://" + r.Host
}

// present is Rails' present? for a request parameter.
func present(s string) bool { return strings.TrimSpace(s) != "" }

// pageParam is the ?page number, 1 when missing or invalid.
func pageParam(r *http.Request) int {
	n, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil || n < 1 {
		return 1
	}
	return n
}

// withParams is the request's path with its query merged with set; a nil
// value drops the key.
func withParams(r *http.Request, set map[string]*string) string {
	q := map[string]string{}
	for k, v := range r.URL.Query() {
		if len(v) > 0 {
			q[k] = v[0]
		}
	}
	for k, v := range set {
		if v == nil {
			delete(q, k)
		} else {
			q[k] = *v
		}
	}
	return r.URL.Path + views.Query(q)
}

// pagerFor builds the pagination for a list.
func pagerFor(r *http.Request, page, perPage, total int) views.Pager {
	return views.Pager{Page: page, PerPage: perPage, Total: total, URL: func(n int) string {
		v := strconv.Itoa(n)
		return withParams(r, map[string]*string{"page": &v})
	}}
}

// formFields reads a Rails-style nested form (model[field]=value) or a JSON
// body ({"model": {"field": value}}) into field -> value, keeping only the
// fields that were sent.
func formFields(r *http.Request, model string) (map[string]string, error) {
	out := map[string]string{}
	if strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		var body map[string]json.RawMessage
		if err := json.NewDecoder(http.MaxBytesReader(nil, r.Body, 1<<20)).Decode(&body); err != nil {
			return nil, err
		}
		var fields map[string]any
		if raw, ok := body[model]; ok {
			if err := json.Unmarshal(raw, &fields); err != nil {
				return nil, err
			}
		}
		for k, v := range fields {
			switch t := v.(type) {
			case nil:
				out[k] = ""
			case string:
				out[k] = t
			case bool:
				out[k] = strconv.FormatBool(t)
			case float64:
				out[k] = strconv.FormatFloat(t, 'f', -1, 64)
			default:
				b, _ := json.Marshal(t)
				out[k] = string(b)
			}
		}
		return out, nil
	}
	if err := r.ParseForm(); err != nil {
		return nil, err
	}
	prefix := model + "["
	for k, v := range r.PostForm {
		if strings.HasPrefix(k, prefix) && strings.HasSuffix(k, "]") && len(v) > 0 {
			out[k[len(prefix):len(k)-1]] = v[len(v)-1]
		}
	}
	return out, nil
}

func field(f map[string]string, name string) *string {
	if v, ok := f[name]; ok {
		return &v
	}
	return nil
}

// errorsJSON turns full validation messages into Rails' errors JSON:
// {"attribute": ["message"]}.
func errorsJSON(errs store.ValidationErrors, attrs ...string) map[string][]string {
	out := map[string][]string{}
	for _, m := range errs {
		key, msg := "base", m
		for _, a := range attrs {
			label := strings.ReplaceAll(a, "_", " ")
			label = strings.ToUpper(label[:1]) + label[1:]
			if strings.HasPrefix(m, label+" ") {
				key, msg = a, strings.TrimPrefix(m, label+" ")
				break
			}
		}
		out[key] = append(out[key], msg)
	}
	return out
}
