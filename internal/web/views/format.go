package views

import (
	"database/sql"
	"strconv"
	"time"
)

// Time layouts matching the strftime formats of the Rails views. Times
// show in UTC, the Rails default zone.
const (
	longTime  = "January 02, 2006 at 03:04 PM" // %B %d, %Y at %I:%M %p
	shortTime = "01/02/2006 03:04 PM"          // %m/%d/%Y %I:%M %p
	date4     = "01/02/2006"                   // %m/%d/%Y
	date2     = "01/02/06"                     // %m/%d/%y
)

func fmtTime(t time.Time, layout string) string { return t.UTC().Format(layout) }

// delimit is number_with_delimiter.
func delimit(n int64) string {
	s := strconv.FormatInt(n, 10)
	neg := s[0] == '-'
	if neg {
		s = s[1:]
	}
	out := make([]byte, 0, len(s)+len(s)/3)
	for i := range s {
		if i > 0 && (len(s)-i)%3 == 0 {
			out = append(out, ',')
		}
		out = append(out, s[i])
	}
	if neg {
		return "-" + string(out)
	}
	return string(out)
}

// truncate is Rails' truncate(s, length: n): at most n characters,
// ending in "..." when cut.
func truncate(s string, n int) string {
	r := []rune(s)
	if len(r) <= n {
		return s
	}
	return string(r[:n-3]) + "..."
}

// pluralize is Rails' pluralize for regular nouns.
func pluralize(n int, word string) string {
	if n == 1 {
		return "1 " + word
	}
	return strconv.Itoa(n) + " " + word + "s"
}

// str is a nullable string's text, "" when NULL.
func str(s sql.NullString) string { return s.String }

// presence is the string when present, else "".
func presence(s sql.NullString) string {
	if presentStr(s) {
		return s.String
	}
	return ""
}

func presentStr(s sql.NullString) bool {
	if !s.Valid {
		return false
	}
	for _, r := range s.String {
		switch r {
		case ' ', '\t', '\n', '\r', '\f', '\v':
		default:
			return true
		}
	}
	return false
}

// num is a nullable integer's text, "" when NULL.
func num(n sql.NullInt64) string {
	if !n.Valid {
		return ""
	}
	return strconv.FormatInt(n.Int64, 10)
}

func itoa(n int64) string { return strconv.FormatInt(n, 10) }

// positive is n's text when above zero, else "".
func positive(n int64) string {
	if n > 0 {
		return itoa(n)
	}
	return ""
}
