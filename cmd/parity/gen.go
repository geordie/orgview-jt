package main

import (
	"encoding/csv"
	"fmt"
	"math/rand/v2"
	"os"
	"path/filepath"
	"strconv"
)

// gen writes a deterministic Rippling-style export (employees.csv) and a
// contractor file (contractors.csv) with the awkward cases the importers
// handle: blank and invalid dates, missing levels, "Is a manager" blank,
// titles differing only by case, accents and duplicate employee ids.
func gen(dir string) error {
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return err
	}
	r := rand.New(rand.NewPCG(42, 7))

	depts := []string{"Engineering", "Infrastructure", "IT Operations", "Product", "Finance", "People", "Sales", "Marketing", "Data & Analytics", "Security"}
	titles := map[string][]string{
		"Engineering":      {"Software Engineer", "software engineer", "Senior Software Engineer", "Software Engineer II", "Engineering Development Program Engineer", "Technical Architect"},
		"Infrastructure":   {"Infrastructure Engineer", "Infrastructure Administrator", "Network Engineer", "System Administrator"},
		"IT Operations":    {"IT Ops Analyst", "AV Technician", "Audio Visual Specialist", "IT Operations Supervisor"},
		"Product":          {"Technical Product Manager", "Product Designer", "Business Systems Engineer"},
		"Finance":          {"Financial Analyst", "ERP Business Manager", "Accountant"},
		"People":           {"HR Partner", "Recruiter", "Recruiter"},
		"Sales":            {"Account Executive", "Sales Engineer", "Account Exécutive"},
		"Marketing":        {"Marketing Manager", "Content Writer"},
		"Data & Analytics": {"Data Analyst", "Data Engineer", "Analytics Engineer"},
		"Security":         {"Security Engineer", "Security Analyst"},
	}
	managerTitles := map[string]string{
		"Engineering": "Mgr, Engineering", "Infrastructure": "Infrastructure Collaboration Lead", "IT Operations": "IT Manager",
		"Product": "Director of Product", "Finance": "Finance Director", "People": "People Manager", "Sales": "Sales Director",
		"Marketing": "Marketing Director", "Data & Analytics": "Mgr, Data", "Security": "Security Manager",
	}
	countries := []string{"Canada", "United States", "United Kingdom", "Canada", "Germany", "canada"}
	entities := []string{"Acme Inc", "Acme Canada Ltd", "Acme GmbH"}
	families := []string{"", "Software Engineering", "Operations", "Business", ""}

	f, err := os.Create(filepath.Join(dir, "employees.csv"))
	if err != nil {
		return err
	}
	defer f.Close()
	w := csv.NewWriter(f)
	header := []string{"Employee - ID", "Employee", "Start date", "Current entity information - legal entity name",
		"Work location - Country", "Rippling profile number", "Title", "Department", "Level name", "Job family name",
		"Manager - ID", "Manager", "Is a manager"}
	if err := w.Write(header); err != nil {
		return err
	}

	id := 1000
	next := func() string { id++; return strconv.Itoa(id) }
	date := func() string {
		switch r.IntN(20) {
		case 0:
			return ""
		case 1:
			return "n/a"
		}
		return fmt.Sprintf("%04d-%02d-%02d", 1998+r.IntN(28), 1+r.IntN(12), 1+r.IntN(28))
	}
	row := func(pid, name, title, dept, level, family, manager, isMgr string) error {
		return w.Write([]string{pid, name, date(), entities[r.IntN(len(entities))], countries[r.IntN(len(countries))],
			"RP" + pid, title, dept, level, family, manager, "", isMgr})
	}

	ceo := next()
	if err := row(ceo, "Casey Chief", "Chief Executive Officer", "Executive", "(M30) Exec", "Leadership", "", "TRUE"); err != nil {
		return err
	}
	people := 0
	for di, dept := range depts {
		head := next()
		if err := row(head, fmt.Sprintf("Head %d", di), managerTitles[dept], dept, "(M25) Dir", "Engineering Management", ceo, "TRUE"); err != nil {
			return err
		}
		subMgrs := []string{head}
		for m := 0; m < 1+r.IntN(3); m++ {
			mid := next()
			isMgr := "TRUE"
			if m == 2 {
				isMgr = "" // falls back to the level prefix
			}
			if err := row(mid, fmt.Sprintf("Manager %d-%d", di, m), managerTitles[dept], dept, "(M2"+strconv.Itoa(m)+") Mgr", families[r.IntN(len(families))], head, isMgr); err != nil {
				return err
			}
			subMgrs = append(subMgrs, mid)
		}
		for i := 0; i < 8+r.IntN(25); i++ {
			pid := next()
			level := fmt.Sprintf("(P%d) Lvl", 18+r.IntN(8))
			if r.IntN(15) == 0 {
				level = ""
			}
			isMgr := "FALSE"
			if r.IntN(10) == 0 {
				isMgr = ""
			}
			name := fmt.Sprintf("Person %d", pid2int(pid))
			if r.IntN(12) == 0 {
				name = ""
			}
			t := titles[dept][r.IntN(len(titles[dept]))]
			if err := row(pid, name, t, dept, level, families[r.IntN(len(families))], subMgrs[r.IntN(len(subMgrs))], isMgr); err != nil {
				return err
			}
			people++
		}
	}
	// A manager outside the export, a duplicate id (skipped) and a blank id.
	if err := row(next(), "Orphan Report", "Software Engineer", "Engineering", "(P20) Lvl", "", "9999", "FALSE"); err != nil {
		return err
	}
	if err := row(ceo, "Duplicate Casey", "Duplicate", "Executive", "", "", "", ""); err != nil {
		return err
	}
	if err := row("", "No Id", "Nobody", "Executive", "", "", "", ""); err != nil {
		return err
	}
	w.Flush()
	if err := w.Error(); err != nil {
		return err
	}

	cf, err := os.Create(filepath.Join(dir, "contractors.csv"))
	if err != nil {
		return err
	}
	defer cf.Close()
	cw := csv.NewWriter(cf)
	if err := cw.Write([]string{"Person", "Team", "Role", "Leader Level 4", "FTC Count", "Vendor", "Team_ID"}); err != nil {
		return err
	}
	for i := 0; i < 25; i++ {
		team := 1 + r.IntN(len(depts))
		role := titles[depts[team-1]][r.IntN(len(titles[depts[team-1]]))]
		if i%9 == 0 {
			role = "Contract Specialist" // no matching employee title
		}
		if err := cw.Write([]string{fmt.Sprintf("Contractor %d", i), depts[team-1], role, "", "1", "Vendor Co", strconv.Itoa(team)}); err != nil {
			return err
		}
	}
	// Rows the importer skips: no role, no team id.
	if err := cw.Write([]string{"Skipped", "", "", "", "1", "", "3"}); err != nil {
		return err
	}
	if err := cw.Write([]string{"Skipped", "", "Data Analyst", "", "1", "", ""}); err != nil {
		return err
	}
	cw.Flush()
	fmt.Printf("wrote %d people in %d departments to %s\n", people, len(depts), dir)
	return cw.Error()
}

func pid2int(s string) int { n, _ := strconv.Atoi(s); return n }
