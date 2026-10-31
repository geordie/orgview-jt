package main

import (
	"bufio"
	"bytes"
	"crypto/sha1"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"sort"
	"strings"

	"golang.org/x/net/html"
)

// startPaths are crawled first; links found on them are followed.
var startPaths = []string{
	"/", "/employees", "/employees/treeview", "/teams", "/teams/treeview", "/data_versions", "/data_versions/new",
	"/teams/new", "/employees/new",
	"/reports/roles", "/reports/title_density", "/reports/job_code_density", "/reports/seniority", "/reports/tenure",
	"/reports/job_code", "/reports/employee_country", "/reports/personnel_area", "/reports/company",
	"/reports/job_family", "/reports/individual_contributors", "/reports/management_ratios", "/reports/team_depth",
	"/reports/team_size", "/reports/team_health", "/reports/team_health_details", "/reports/team_children",
	"/reports/team_members_managers",
	"/teams?sort=member_count&direction=desc", "/teams?search=eng", "/teams?depth=2",
	"/employees?page=2", "/employees?direct_reports_bucket=1-2", "/employees?team_id=2",
	"/reports/roles?team_id=2", "/reports/seniority?team_id=2", "/reports/tenure?team_id=2",
	"/reports/team_size?team_id=2", "/reports/management_ratios?team_id=2", "/reports/job_family?team_id=3",
	"/reports/individual_contributors?team_id=2",
}

const (
	maxPages = 900
	// maxPerRoute caps pages per route (ids and query dropped) so the crawl
	// covers every kind of page instead of every filter of one report.
	maxPerRoute = 40
)

var idSegment = regexp.MustCompile(`/\d+`)

func route(p string) string {
	p, _, _ = strings.Cut(p, "?")
	return idSegment.ReplaceAllString(p, "/:id")
}

var (
	employeePath = regexp.MustCompile(`^/employees/(\d+)$`)
	teamPath     = regexp.MustCompile(`^/teams/(\d+)$`)
)

func crawl(base, out, list string) error {
	base = strings.TrimRight(base, "/")
	if err := os.MkdirAll(out, 0o755); err != nil {
		return err
	}
	c := &http.Client{CheckRedirect: func(*http.Request, []*http.Request) error { return http.ErrUseLastResponse }}

	var queue []string
	discover := list == ""
	if discover {
		queue = append(queue, startPaths...)
	} else {
		f, err := os.Open(list)
		if err != nil {
			return err
		}
		sc := bufio.NewScanner(f)
		for sc.Scan() {
			if p := strings.TrimSpace(sc.Text()); p != "" {
				queue = append(queue, p)
			}
		}
		f.Close()
	}
	seen := map[string]bool{}
	perRoute := map[string]int{}
	var done []string
	for len(queue) > 0 && len(done) < maxPages {
		p := queue[0]
		queue = queue[1:]
		if seen[p] {
			continue
		}
		seen[p] = true
		if discover {
			if perRoute[route(p)] >= maxPerRoute {
				continue
			}
			perRoute[route(p)]++
		}
		resp, err := c.Get(base + p)
		if err != nil {
			return err
		}
		body, _ := io.ReadAll(resp.Body)
		resp.Body.Close()

		var page bytes.Buffer
		fmt.Fprintf(&page, "status: %d\n", resp.StatusCode)
		if loc := resp.Header.Get("Location"); loc != "" {
			fmt.Fprintf(&page, "location: %s\n", strings.TrimPrefix(loc, base))
		}
		var links []string
		if strings.Contains(resp.Header.Get("Content-Type"), "json") {
			page.WriteString(normalizeJSON(body))
		} else {
			var text string
			text, links = normalizeHTML(body)
			page.WriteString(text)
		}
		if err := os.WriteFile(filepath.Join(out, fileFor(p)), []byte(volatile(page.String())), 0o644); err != nil {
			return err
		}
		done = append(done, p)

		if !discover {
			continue
		}
		for _, l := range links {
			u, err := url.Parse(l)
			if err != nil || u.Host != "" || !strings.HasPrefix(u.Path, "/") || u.Path == "/up" {
				continue
			}
			l = u.Path
			if u.RawQuery != "" {
				l += "?" + u.RawQuery
			}
			if seen[l] {
				continue
			}
			queue = append(queue, l)
			if m := employeePath.FindStringSubmatch(u.Path); m != nil {
				queue = append(queue, "/employees/"+m[1]+"/edit", "/employees/"+m[1]+"/direct_reports.json")
			}
			if m := teamPath.FindStringSubmatch(u.Path); m != nil {
				queue = append(queue, "/teams/"+m[1]+"/edit", "/teams/"+m[1]+"/sub_teams.json", "/teams/"+m[1]+"/team_members.json",
					"/teams/"+m[1]+"/move_candidates.json", "/teams/"+m[1]+"/sub_teams", "/teams/"+m[1]+"/team_members")
			}
		}
	}
	sort.Strings(done)
	fmt.Printf("crawled %d pages from %s\n", len(done), base)
	return os.WriteFile(filepath.Join(out, "urls.txt"), []byte(strings.Join(done, "\n")+"\n"), 0o644)
}

func fileFor(p string) string {
	safe := regexp.MustCompile(`[^A-Za-z0-9_.-]+`).ReplaceAllString(strings.TrimPrefix(p, "/"), "_")
	if len(safe) > 80 {
		h := sha1.Sum([]byte(p))
		safe = safe[:60] + "_" + hex.EncodeToString(h[:6])
	}
	if safe == "" {
		safe = "index"
	}
	return safe + ".txt"
}

var volatilePatterns = []struct {
	re   *regexp.Regexp
	repl string
}{
	{regexp.MustCompile(`FTC_[0-9a-f]{28}`), "FTC_x"},
	// Absolute links name the server's own address, which differs per app.
	{regexp.MustCompile(`https?://(localhost|127\.0\.0\.1):\d+`), ""},
	{regexp.MustCompile(`[A-Z][a-z]+ \d{2}, \d{4} at \d{2}:\d{2} [AP]M`), "<time>"},
	{regexp.MustCompile(`\d{2}/\d{2}/\d{4} \d{2}:\d{2} [AP]M`), "<time>"},
	{regexp.MustCompile(`\d{2}/\d{2}/\d{2,4}`), "<date>"},
	{regexp.MustCompile(`\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?`), "<time>"},
}

// volatile masks values that differ between two separately loaded databases
// (timestamps, random contractor ids) but say nothing about the app.
func volatile(s string) string {
	for _, p := range volatilePatterns {
		s = p.re.ReplaceAllString(s, p.repl)
	}
	return s
}

func normalizeJSON(body []byte) string {
	var v any
	if err := json.Unmarshal(body, &v); err != nil {
		return "invalid json: " + string(body)
	}
	v = dropTimestamps(v)
	b, _ := json.MarshalIndent(v, "", " ")
	return string(b) + "\n"
}

func dropTimestamps(v any) any {
	switch t := v.(type) {
	case map[string]any:
		delete(t, "created_at")
		delete(t, "updated_at")
		delete(t, "url")
		for k, x := range t {
			t[k] = dropTimestamps(x)
		}
	case []any:
		for i, x := range t {
			t[i] = dropTimestamps(x)
		}
	}
	return v
}

var ws = regexp.MustCompile(`\s+`)

// chartLine keeps the data lines of an inline chart script.
var chartLine = regexp.MustCompile(`^\s*(labels|data|percentages|label):`)

// normalizeHTML renders the body as one line per text run, link or form
// control, ignoring markup layout, assets and CSRF tokens. It also returns
// the hrefs found.
func normalizeHTML(body []byte) (string, []string) {
	doc, err := html.Parse(bytes.NewReader(body))
	if err != nil {
		return "unparseable html\n", nil
	}
	var b strings.Builder
	var links []string
	attr := func(n *html.Node, k string) (string, bool) {
		for _, a := range n.Attr {
			if a.Key == k {
				return a.Val, true
			}
		}
		return "", false
	}
	var walk func(n *html.Node)
	walk = func(n *html.Node) {
		if n.Type == html.ElementNode {
			switch n.Data {
			case "head", "style":
				return
			case "script":
				if t, _ := attr(n, "type"); t == "importmap" {
					return
				}
				if n.FirstChild != nil {
					for _, line := range strings.Split(n.FirstChild.Data, "\n") {
						if chartLine.MatchString(line) {
							fmt.Fprintf(&b, "[chart] %s\n", strings.TrimSpace(line))
						}
					}
				}
				return
			case "a":
				href, _ := attr(n, "href")
				extra := ""
				if m, ok := attr(n, "data-method"); ok {
					extra += " method=" + m
				}
				if m, ok := attr(n, "data-confirm"); ok {
					extra += " confirm=" + m
				}
				fmt.Fprintf(&b, "[a %s%s]\n", href, extra)
				if _, ok := attr(n, "data-method"); !ok {
					links = append(links, href)
				}
			case "form":
				action, _ := attr(n, "action")
				method, _ := attr(n, "method")
				fmt.Fprintf(&b, "[form %s %s]\n", strings.ToLower(method), action)
			case "input", "textarea", "select", "button":
				name, _ := attr(n, "name")
				if name == "authenticity_token" {
					return
				}
				typ, _ := attr(n, "type")
				val, _ := attr(n, "value")
				if n.Data == "button" && typ == "" {
					typ = "submit"
				}
				line := fmt.Sprintf("[%s %s %s %q", n.Data, typ, name, val)
				if _, ok := attr(n, "disabled"); ok {
					line += " disabled"
				}
				if c, ok := attr(n, "data-confirm"); ok {
					line += " confirm=" + c
				}
				b.WriteString(line + "]\n")
			case "option":
				val, _ := attr(n, "value")
				_, sel := attr(n, "selected")
				fmt.Fprintf(&b, "[option %q selected=%v]\n", val, sel)
			}
		}
		if n.Type == html.TextNode {
			if t := strings.TrimSpace(ws.ReplaceAllString(n.Data, " ")); t != "" {
				b.WriteString(t + "\n")
			}
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			walk(c)
		}
	}
	walk(doc)
	return b.String(), links
}

// diff compares every page of crawl a with the same page of crawl b and
// prints a unified diff for each difference.
func diff(a, b string) (bool, error) {
	data, err := os.ReadFile(filepath.Join(a, "urls.txt"))
	if err != nil {
		return false, err
	}
	same, differ := 0, 0
	for _, p := range strings.Fields(string(data)) {
		fa, fb := filepath.Join(a, fileFor(p)), filepath.Join(b, fileFor(p))
		ba, _ := os.ReadFile(fa)
		bb, err := os.ReadFile(fb)
		if err != nil {
			fmt.Printf("=== %s: missing from %s\n", p, b)
			differ++
			continue
		}
		if bytes.Equal(ba, bb) {
			same++
			continue
		}
		differ++
		fmt.Printf("=== %s\n", p)
		cmd := exec.Command("diff", "-u", fa, fb)
		cmd.Stdout = os.Stdout
		_ = cmd.Run()
	}
	fmt.Printf("%d pages match, %d differ\n", same, differ)
	return differ == 0, nil
}
