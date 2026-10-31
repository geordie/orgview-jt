package views

import (
	"encoding/json"
	"net/url"
	"sort"
	"strings"
)

// Column types.
const (
	ColString     = "string"
	ColNumeric    = "numeric"
	ColPercentage = "percentage"
	ColAction     = "action"
)

// LinkParam fills one query parameter of a cell link: a fixed Value, or the
// value of column ValueCol in the same row, mapped through Lookup when it
// has the value.
type LinkParam struct {
	Name     string
	Value    *Value
	ValueCol string
	Lookup   map[string]Value
}

// Fixed is a LinkParam with a fixed value.
func Fixed(name string, v Value) LinkParam { return LinkParam{Name: name, Value: &v} }

// FromCol is a LinkParam taking its value from a column.
func FromCol(name, col string) LinkParam { return LinkParam{Name: name, ValueCol: col} }

// LinkInfo makes a column's cells links to Path, which may contain ":id"
// to be filled by an "id" parameter.
type LinkInfo struct {
	Path   string
	Params []LinkParam
}

// Column is one report table column.
type Column struct {
	Label  string
	Type   string
	Values []Value
	Link   *LinkInfo
}

// Display is the text of the cell at row.
func (c Column) Display(row int) string {
	if row >= len(c.Values) {
		return "invalid index"
	}
	if c.Type == ColPercentage {
		return c.Values[row].Round(1).String() + "%"
	}
	return c.Values[row].String()
}

// Summary is the column's text in the totals row.
func (c Column) Summary() string {
	switch c.Type {
	case ColNumeric:
		return Sum(c.Values).String()
	case ColPercentage:
		s := Sum(c.Values)
		if s.Kind == Float {
			s = I(int64(RubyRound(s.F, 0)))
		}
		return s.String() + "%"
	}
	return ""
}

// Table is a report table.
type Table struct {
	Columns []Column
}

// Add appends a column.
func (t *Table) Add(c Column) { t.Columns = append(t.Columns, c) }

// Rows is the length of the longest column.
func (t Table) Rows() int {
	n := 0
	for _, c := range t.Columns {
		n = max(n, len(c.Values))
	}
	return n
}

// CellLink is the link of column c at row, or "" when the cell is not a
// link (no link info, or a parameter has no value).
func (t Table) CellLink(c Column, row int) string {
	if c.Link == nil {
		return ""
	}
	params := map[string]string{}
	for _, p := range c.Link.Params {
		if p.Value != nil {
			if p.Value.IsNil() {
				return ""
			}
			params[p.Name] = p.Value.String()
			continue
		}
		var col *Column
		for i := range t.Columns {
			if t.Columns[i].Label == p.ValueCol {
				col = &t.Columns[i]
				break
			}
		}
		if col == nil {
			continue
		}
		var v Value
		if row < len(col.Values) {
			v = col.Values[row]
		}
		if m, ok := p.Lookup[v.String()]; ok && !v.IsNil() && !m.IsNil() {
			v = m
		}
		if v.IsNil() {
			return ""
		}
		params[p.Name] = v.String()
	}
	if len(params) == 0 {
		return ""
	}
	path := c.Link.Path
	if id, ok := params["id"]; ok && strings.Contains(path, ":id") {
		path = strings.Replace(path, ":id", url.PathEscape(id), 1)
		delete(params, "id")
	}
	return path + Query(params)
}

// Query renders params as a query string with sorted keys, as Rails' to_query
// does, or "" when there are none.
func Query(params map[string]string) string {
	if len(params) == 0 {
		return ""
	}
	keys := make([]string, 0, len(params))
	for k := range params {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	var b strings.Builder
	for i, k := range keys {
		if i > 0 {
			b.WriteByte('&')
		}
		b.WriteString(url.QueryEscape(k))
		b.WriteByte('=')
		b.WriteString(url.QueryEscape(params[k]))
	}
	return "?" + b.String()
}

// Chart is the data for a horizontal bar chart.
type Chart struct {
	ID          string
	Labels      []Value
	Data        []Value
	Percentages []Value
	XLabel      string
}

// Link is a link's text and URL.
type Link struct {
	Text, URL string
}

// Report is a page made of a table and an optional chart.
type Report struct {
	Title    string
	Subtitle string
	Back     *Link
	Table    Table
	Chart    *Chart
}

// CountReport is a page with a count table and a chart, used by the older
// reports.
type CountReport struct {
	Title       string
	Subtitle    string
	LabelHeader string
	Labels      []Value
	Counts      []Value
	Percentages []Value
	XLabel      string
}

func jsonValues(v []Value) string {
	if v == nil {
		v = []Value{}
	}
	b, _ := json.Marshal(v)
	return string(b)
}

// chartScript is the module script that draws a chart, with the data lines
// laid out as in the Rails views.
func chartScript(id string, labels, data, percentages []Value, xlabel string) string {
	idJS, _ := json.Marshal(id)
	xl, _ := json.Marshal(xlabel)
	r := strings.NewReplacer("{{ID}}", string(idJS), "{{LABELS}}", jsonValues(labels), "{{DATA}}", jsonValues(data),
		"{{PERCENTAGES}}", jsonValues(percentages), "{{XLABEL}}", "'"+strings.Trim(string(xl), `"`)+"'")
	return r.Replace(chartTemplate)
}

const chartTemplate = `
import { Chart, LinearScale, CategoryScale, BarController, BarElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(LinearScale, CategoryScale, BarController, BarElement, Title, Tooltip, Legend);

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById({{ID}}).getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
        labels: {{LABELS}},
        datasets: [{
            label: {{XLABEL}},
            data: {{DATA}},
            percentages: {{PERCENTAGES}},
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }],
        indexAxis: 'y',
    },
    options: {
        indexAxis: 'y',
        scales: {
            x: {
                type: 'linear',
                beginAtZero: true
            },
            y: {
                type: 'category',
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
            }
        }
    },
    plugins: [{
        afterDatasetsDraw: function(chart, options) {
            var ctx = chart.ctx;
            chart.data.datasets.forEach(function(dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                    meta.data.forEach(function(element, index) {
                        ctx.fillStyle = 'rgb(200, 200, 200)';
                        var fontSize = 12;
                        ctx.font = fontSize + 'px Helvetica';
                        var dataString = dataset.data[index].toString();
                        dataString += " (" + dataset.percentages[index].toFixed(0) + "%)";
                        ctx.textAlign = 'left';
                        ctx.textBaseline = 'middle';
                        var padding = 5;
                        var position = element.tooltipPosition();
                        ctx.fillText(dataString, position.x + padding, position.y );
                    });
                }
            });
        }
    }]
  });
});
`
