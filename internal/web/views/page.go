package views

import (
	"github.com/geordie/orgview-jt/internal/store"
)

// Page is what the layout needs on every page.
type Page struct {
	// Current is the version shown in the navbar: the active one, else the
	// most recent.
	Current *store.DataVersion
	// Versions are the ten most recent versions, for the navbar switcher.
	Versions []store.DataVersion
	Notice   string
	Alert    string
	// Asset returns the URL of a static file, with a cache-busting hash.
	Asset func(name string) string
}

func (p Page) asset(name string) string {
	if p.Asset == nil {
		return "/static/" + name
	}
	return p.Asset(name)
}

func (p Page) importMap() string {
	return `{
  "imports": {
    "application": "` + p.asset("js/application.js") + `",
    "primitives": "` + p.asset("js/primitives.js") + `",
    "bootstrap": "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
    "chart.js": "` + p.asset("js/chartjs.js") + `",
    "@rails/ujs": "` + p.asset("js/rails-ujs.js") + `",
    "data_version_switcher": "` + p.asset("js/data_version_switcher.js") + `"
  }
}`
}

// statusBadge is the Bootstrap colour for a version status.
func statusBadge(status string) string {
	switch status {
	case "active":
		return "badge bg-success"
	case "draft":
		return "badge bg-warning"
	}
	return "badge bg-secondary"
}

// capitalize is Ruby's String#capitalize for ASCII.
func capitalize(s string) string {
	if s == "" {
		return s
	}
	b := []byte(s)
	for i := range b {
		if b[i] >= 'A' && b[i] <= 'Z' {
			b[i] += 'a' - 'A'
		}
	}
	if b[0] >= 'a' && b[0] <= 'z' {
		b[0] -= 'a' - 'A'
	}
	return string(b)
}
