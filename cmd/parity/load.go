package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/cookiejar"
	"net/textproto"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

// client talks to either app the way a browser would: it keeps the session
// cookie and sends Rails' CSRF token (the Go app ignores it).
type client struct {
	base  string
	http  *http.Client
	token string
}

func newClient(base string) (*client, error) {
	jar, _ := cookiejar.New(nil)
	c := &client{base: strings.TrimRight(base, "/"), http: &http.Client{
		Jar: jar,
		CheckRedirect: func(*http.Request, []*http.Request) error {
			return http.ErrUseLastResponse
		},
	}}
	return c, c.refreshToken()
}

var csrfMeta = regexp.MustCompile(`<meta name="csrf-token" content="([^"]*)"`)

func (c *client) refreshToken() error {
	resp, err := c.http.Get(c.base + "/")
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	if m := csrfMeta.FindSubmatch(body); m != nil {
		c.token = string(m[1])
	}
	return nil
}

func (c *client) do(req *http.Request, want ...int) error {
	req.Header.Set("X-CSRF-Token", c.token)
	resp, err := c.http.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	for _, w := range want {
		if resp.StatusCode == w {
			return nil
		}
	}
	return fmt.Errorf("%s %s: status %d: %.300s", req.Method, req.URL.Path, resp.StatusCode, body)
}

func (c *client) form(method, path string, values url.Values) error {
	values.Set("authenticity_token", c.token)
	if method != http.MethodPost {
		values.Set("_method", strings.ToLower(method))
	}
	req, _ := http.NewRequest(http.MethodPost, c.base+path, strings.NewReader(values.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	return c.do(req, http.StatusFound, http.StatusSeeOther)
}

func (c *client) json(method, path string, body any) error {
	b, _ := json.Marshal(body)
	req, _ := http.NewRequest(method, c.base+path, bytes.NewReader(b))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	return c.do(req, http.StatusOK)
}

func (c *client) upload(path, file string) error {
	data, err := os.ReadFile(file)
	if err != nil {
		return err
	}
	var buf bytes.Buffer
	mw := multipart.NewWriter(&buf)
	_ = mw.WriteField("authenticity_token", c.token)
	h := textproto.MIMEHeader{}
	h.Set("Content-Disposition", fmt.Sprintf(`form-data; name="csv_file"; filename=%q`, filepath.Base(file)))
	h.Set("Content-Type", "text/csv")
	part, _ := mw.CreatePart(h)
	part.Write(data)
	mw.Close()
	req, _ := http.NewRequest(http.MethodPost, c.base+path, &buf)
	req.Header.Set("Content-Type", mw.FormDataContentType())
	return c.do(req, http.StatusFound, http.StatusSeeOther)
}

// load runs the same sequence of user actions against a freshly created
// database, so the resulting data can be compared between the two apps.
func load(base, dir string) error {
	c, err := newClient(base)
	if err != nil {
		return err
	}
	steps := []struct {
		name string
		run  func() error
	}{
		{"import employees", func() error { return c.upload("/employees/import_csv", filepath.Join(dir, "employees.csv")) }},
		{"import contractors", func() error {
			return c.upload("/employees/import_csv_contractors", filepath.Join(dir, "contractors.csv"))
		}},
		// Build a hierarchy: teams 3 and 4 under 2, 5 under 3, 7 under 6.
		{"move 3 under 2", func() error { return c.json("PATCH", "/teams/3/move", map[string]any{"parent_id": "2"}) }},
		{"move 4 under 2", func() error { return c.json("PATCH", "/teams/4/move", map[string]any{"parent_id": "2"}) }},
		{"move 5 under 3", func() error { return c.json("PATCH", "/teams/5/move", map[string]any{"parent_id": "3"}) }},
		{"move 7 under 6", func() error { return c.json("PATCH", "/teams/7/move", map[string]any{"parent_id": "6"}) }},
		{"move 7 to root and back", func() error {
			if err := c.json("PATCH", "/teams/7/move", map[string]any{}); err != nil {
				return err
			}
			return c.json("PATCH", "/teams/7/move", map[string]any{"parent_id": "6"})
		}},
		{"team stats", func() error { return c.form("POST", "/teams/build_all_teams_stats", url.Values{}) }},
		{"job families", func() error { return c.form("POST", "/employees/populate_job_families", url.Values{}) }},
		{"pretty name", func() error {
			return c.json("PATCH", "/teams/2", map[string]any{"team": map[string]any{"pretty_name": "Platform Group"}})
		}},
		{"rename employee", func() error {
			return c.json("PATCH", "/employees/5", map[string]any{"employee": map[string]any{"name": "Renamed Person"}})
		}},
		{"edit employee", func() error {
			return c.form("PATCH", "/employees/7", url.Values{"employee[title]": {"Staff Engineer"}, "employee[seniority]": {"24"}, "employee[is_manager]": {"false"}})
		}},
		{"create team", func() error {
			return c.form("POST", "/teams", url.Values{"team[name]": {"Skunkworks"}, "team[full_path]": {"Engineering > Skunkworks"}, "team[parent_id]": {"2"}, "team[depth]": {"2"}})
		}},
		{"second version", func() error {
			return c.form("POST", "/data_versions", url.Values{"data_version[name]": {"second"}, "data_version[description]": {"A draft"}, "data_version[status]": {"draft"}})
		}},
		{"third version, archived", func() error {
			if err := c.form("POST", "/data_versions", url.Values{"data_version[name]": {"third"}, "data_version[status]": {"draft"}}); err != nil {
				return err
			}
			return c.form("PATCH", "/data_versions/3/archive", url.Values{})
		}},
		{"edit version", func() error {
			return c.form("PATCH", "/data_versions/2", url.Values{"data_version[description]": {"Edited draft"}})
		}},
	}
	for _, s := range steps {
		if err := s.run(); err != nil {
			return fmt.Errorf("%s: %w", s.name, err)
		}
		fmt.Println("ok:", s.name)
	}
	return nil
}
