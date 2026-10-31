package web

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"

	"github.com/geordie/orgview-jt/internal/store"
	"github.com/geordie/orgview-jt/internal/web/views"
)

const teamsPerPage = 50

const noActiveVersion = "No active data version found."

// activeVersion is the active version. Without one it sends the browser
// home with an alert, as every Rails team action did, and returns false.
func (s *Server) activeVersion(w http.ResponseWriter, r *http.Request) (store.DataVersion, bool) {
	v, ok, err := s.st.ActiveVersion(r.Context())
	if err != nil {
		s.fail(w, r, err)
		return v, false
	}
	if !ok {
		s.redirect(w, r, "/", flash{Alert: noActiveVersion})
		return v, false
	}
	return v, true
}

// loadTeam finds the team named by the path in the active version.
func (s *Server) loadTeam(w http.ResponseWriter, r *http.Request) (store.DataVersion, store.Team, bool) {
	v, ok := s.activeVersion(w, r)
	if !ok {
		return v, store.Team{}, false
	}
	id, ok := s.pathID(w, r)
	if !ok {
		return v, store.Team{}, false
	}
	t, err := s.st.FindTeam(r.Context(), v.ID, id)
	if err != nil {
		s.fail(w, r, err)
		return v, t, false
	}
	return v, t, true
}

// flipDirection is the sort direction a column header links to: desc when
// the list is ascending, else asc.
func flipDirection(r *http.Request) string {
	if r.URL.Query().Get("direction") == "asc" {
		return "desc"
	}
	return "asc"
}

func (s *Server) teamsIndex(w http.ResponseWriter, r *http.Request) {
	v, ok := s.activeVersion(w, r)
	if !ok {
		return
	}
	q := r.URL.Query()
	var f store.TeamFilter
	if present(q.Get("depth")) {
		f.Depth = q.Get("depth")
	}
	if present(q.Get("parent_id")) {
		f.ParentID = q.Get("parent_id")
	}
	if present(q.Get("search")) {
		f.Search = q.Get("search")
	}
	f.Sort, f.Direction = q.Get("sort"), q.Get("direction")
	page := pageParam(r)
	teams, total, err := s.st.ListTeams(r.Context(), v.ID, f, page, teamsPerPage)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	dir := flipDirection(r)
	sortURL := func(col string) string {
		params := map[string]string{"direction": dir, "sort": col}
		for _, k := range []string{"depth", "parent_id"} {
			if q.Has(k) {
				params[k] = q.Get(k)
			}
		}
		return "/teams" + views.Query(params)
	}
	s.render(w, r, http.StatusOK, views.TeamsIndex(p, views.TeamsData{
		Pager: pagerFor(r, page, teamsPerPage, total), Search: q.Get("search"), Teams: teams, SortURL: sortURL}))
}

func (s *Server) teamShow(w http.ResponseWriter, r *http.Request) {
	v, t, ok := s.loadTeam(w, r)
	if !ok {
		return
	}
	if wantsJSON(r) {
		writeJSON(w, http.StatusOK, t)
		return
	}
	ctx := r.Context()
	q := r.URL.Query()
	sort := "employees.person_id"
	for _, c := range store.MemberSortColumns {
		if c == q.Get("sort") {
			sort = c
		}
	}
	d := views.TeamData{Team: t}
	var err error
	if d.Members, err = s.st.TeamMembers(ctx, v.ID, t.ID, sort, q.Get("direction")); err != nil {
		s.fail(w, r, err)
		return
	}
	if d.SubTeams, err = s.st.SubTeams(ctx, v.ID, t.ID, true); err != nil {
		s.fail(w, r, err)
		return
	}
	if d.MemberCount, err = s.st.MembershipCount(ctx, t.ID); err != nil {
		s.fail(w, r, err)
		return
	}
	parent, ok, err := s.st.Parent(ctx, t)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	if ok {
		d.Parent = &parent
	}
	dir := flipDirection(r)
	d.SortURL = func(col string) string {
		return "/teams/" + itoa(t.ID) + views.Query(map[string]string{"sort": col, "direction": dir})
	}
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.render(w, r, http.StatusOK, views.TeamShow(p, d))
}

func teamForm(t store.Team) views.TeamForm {
	f := views.TeamForm{ID: t.ID, Name: t.Name, FullPath: t.FullPath}
	if t.ParentID.Valid {
		f.ParentID = itoa(t.ParentID.Int64)
	}
	if t.Depth.Valid {
		f.Depth = itoa(t.Depth.Int64)
	}
	return f
}

func (s *Server) teamNew(w http.ResponseWriter, r *http.Request) {
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	// A new team's depth starts at the column default, 0.
	s.render(w, r, http.StatusOK, views.TeamFormPage(p, views.TeamForm{Depth: "0"}))
}

func (s *Server) teamEdit(w http.ResponseWriter, r *http.Request) {
	_, t, ok := s.loadTeam(w, r)
	if !ok {
		return
	}
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.render(w, r, http.StatusOK, views.TeamFormPage(p, teamForm(t)))
}

func teamFields(f map[string]string) store.TeamFields {
	return store.TeamFields{Name: field(f, "name"), FullPath: field(f, "full_path"), ParentID: field(f, "parent_id"),
		Depth: field(f, "depth"), PrettyName: field(f, "pretty_name")}
}

func (s *Server) teamCreate(w http.ResponseWriter, r *http.Request) {
	v, ok := s.activeVersion(w, r)
	if !ok {
		return
	}
	f, err := formFields(r, "team")
	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	t, err := s.st.CreateTeam(r.Context(), v.ID, teamFields(f))
	if s.teamSaveFailed(w, r, t, err) {
		return
	}
	if wantsJSON(r) {
		w.Header().Set("Location", baseURL(r)+"/teams/"+itoa(t.ID))
		writeJSON(w, http.StatusCreated, t)
		return
	}
	s.redirect(w, r, "/teams/"+itoa(t.ID), flash{Notice: "Team was successfully created."})
}

func (s *Server) teamUpdate(w http.ResponseWriter, r *http.Request) {
	_, t, ok := s.loadTeam(w, r)
	if !ok {
		return
	}
	f, err := formFields(r, "team")
	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	t, err = s.st.UpdateTeam(r.Context(), t, teamFields(f))
	if s.teamSaveFailed(w, r, t, err) {
		return
	}
	if wantsJSON(r) {
		writeJSON(w, http.StatusOK, t)
		return
	}
	s.redirect(w, r, "/teams/"+itoa(t.ID), flash{Notice: "Team was successfully updated."})
}

func (s *Server) teamSaveFailed(w http.ResponseWriter, r *http.Request, t store.Team, err error) bool {
	var verrs store.ValidationErrors
	switch {
	case err == nil:
		return false
	case errors.As(err, &verrs):
		if wantsJSON(r) {
			writeJSON(w, http.StatusUnprocessableEntity, errorsJSON(verrs, "name", "full_path"))
			return true
		}
		p, perr := s.page(w, r)
		if perr != nil {
			s.fail(w, r, perr)
			return true
		}
		form := teamForm(t)
		form.Errors = verrs
		s.render(w, r, http.StatusUnprocessableEntity, views.TeamFormPage(p, form))
	default:
		s.fail(w, r, err)
	}
	return true
}

func (s *Server) teamDestroy(w http.ResponseWriter, r *http.Request) {
	_, t, ok := s.loadTeam(w, r)
	if !ok {
		return
	}
	if err := s.st.DeleteTeam(r.Context(), t.ID); err != nil {
		s.fail(w, r, err)
		return
	}
	if wantsJSON(r) {
		w.WriteHeader(http.StatusNoContent)
		return
	}
	s.redirect(w, r, "/teams", flash{Notice: "Team was successfully deleted."})
}

func (s *Server) buildTeamStats(w http.ResponseWriter, r *http.Request) {
	v, ok := s.activeVersion(w, r)
	if !ok {
		return
	}
	if err := s.st.ResetTeamStats(r.Context(), v.ID); err != nil {
		s.fail(w, r, err)
		return
	}
	if err := s.st.BuildTeamStats(r.Context(), v.ID); err != nil {
		s.fail(w, r, err)
		return
	}
	s.redirect(w, r, "/", flash{Notice: "Team stats generated successfully."})
}

// treeTeam is a root team in the team chart: its attributes plus how many
// sub-teams it has.
type treeTeam struct {
	store.Team
	SubTeamCount int
}

func (t treeTeam) MarshalJSON() ([]byte, error) {
	b, err := json.Marshal(t.Team)
	if err != nil {
		return nil, err
	}
	return append(b[:len(b)-1], []byte(`,"sub_team_count":`+strconv.Itoa(t.SubTeamCount)+`}`)...), nil
}

func (s *Server) teamsTree(w http.ResponseWriter, r *http.Request) {
	v, ok := s.activeVersion(w, r)
	if !ok {
		return
	}
	roots, err := s.st.RootTeams(r.Context(), v.ID)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	nodes := make([]treeTeam, len(roots))
	for i, t := range roots {
		kids, err := s.st.ChildTeams(r.Context(), t.ID)
		if err != nil {
			s.fail(w, r, err)
			return
		}
		nodes[i] = treeTeam{Team: t, SubTeamCount: len(kids)}
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
	s.render(w, r, http.StatusOK, views.TeamTree(p, string(b)))
}

type subTeamNode struct {
	SubTeam      store.Team   `json:"sub_team"`
	SubTeamCount int          `json:"sub_team_count"`
	SubTeams     []store.Team `json:"sub_teams"`
}

func (s *Server) subTeams(w http.ResponseWriter, r *http.Request) {
	v, t, ok := s.loadTeam(w, r)
	if !ok {
		return
	}
	subs, err := s.st.SubTeams(r.Context(), v.ID, t.ID, false)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	nodes := make([]subTeamNode, len(subs))
	for i, st := range subs {
		kids, err := s.st.ChildTeams(r.Context(), st.ID)
		if err != nil {
			s.fail(w, r, err)
			return
		}
		if kids == nil {
			kids = []store.Team{}
		}
		nodes[i] = subTeamNode{SubTeam: st, SubTeamCount: len(kids), SubTeams: kids}
	}
	if wantsJSON(r) {
		writeJSON(w, http.StatusOK, nodes)
		return
	}
	entries := make([]views.SubTeam, len(nodes))
	for i, n := range nodes {
		entries[i] = views.SubTeam{Team: n.SubTeam, Count: n.SubTeamCount}
	}
	s.render(w, r, http.StatusOK, views.SubTeamsPartial(entries))
}

func (s *Server) teamMembers(w http.ResponseWriter, r *http.Request) {
	v, t, ok := s.loadTeam(w, r)
	if !ok {
		return
	}
	members, err := s.st.TeamMembers(r.Context(), v.ID, t.ID, "", "")
	if err != nil {
		s.fail(w, r, err)
		return
	}
	if wantsJSON(r) {
		if members == nil {
			members = []store.TeamMember{}
		}
		writeJSON(w, http.StatusOK, members)
		return
	}
	s.render(w, r, http.StatusOK, views.TeamMembersPartial(members))
}

type moveCandidate struct {
	ID       int64  `json:"id"`
	Name     string `json:"name"`
	FullPath string `json:"full_path"`
	Depth    *int64 `json:"depth"`
}

func (s *Server) moveCandidates(w http.ResponseWriter, r *http.Request) {
	v, t, ok := s.loadTeam(w, r)
	if !ok {
		return
	}
	list, err := s.st.MoveCandidates(r.Context(), v.ID, t)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	out := make([]moveCandidate, len(list))
	for i, c := range list {
		out[i] = moveCandidate{ID: c.ID, Name: c.DisplayName(), FullPath: c.FullPath}
		if c.Depth.Valid {
			d := c.Depth.Int64
			out[i].Depth = &d
		}
	}
	writeJSON(w, http.StatusOK, out)
}

func (s *Server) moveTeam(w http.ResponseWriter, r *http.Request) {
	v, t, ok := s.loadTeam(w, r)
	if !ok {
		return
	}
	var parentID string
	if strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		var body map[string]any
		if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<20)).Decode(&body); err != nil {
			writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
			return
		}
		switch p := body["parent_id"].(type) {
		case string:
			parentID = p
		case float64:
			parentID = strconv.FormatFloat(p, 'f', -1, 64)
		}
	} else {
		parentID = r.FormValue("parent_id")
	}
	var newParent *store.Team
	if present(parentID) {
		id, err := strconv.ParseInt(strings.TrimSpace(parentID), 10, 64)
		if err != nil {
			s.notFound(w, r)
			return
		}
		p, err := s.st.FindTeam(r.Context(), v.ID, id)
		if err != nil {
			s.fail(w, r, err)
			return
		}
		newParent = &p
	}
	err := s.st.MoveTeam(r.Context(), v.ID, t, newParent)
	if errors.Is(err, store.ErrMoveIntoSelf) {
		writeJSON(w, http.StatusUnprocessableEntity, map[string]string{"error": err.Error()})
		return
	}
	if err != nil {
		s.fail(w, r, err)
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"redirect_url": baseURL(r) + "/teams/" + itoa(t.ID)})
}
