package web

import (
	"context"
	"database/sql"
	"errors"
	"net/http"
	"time"

	"github.com/geordie/orgview-jt/internal/store"
	"github.com/geordie/orgview-jt/internal/web/views"
)

func (s *Server) versionRow(ctx context.Context, v store.DataVersion) (views.VersionRow, error) {
	e, t, err := s.st.VersionCounts(ctx, v.ID)
	return views.VersionRow{DataVersion: v, Employees: e, Teams: t}, err
}

func (s *Server) versionRows(ctx context.Context, limit int) ([]views.VersionRow, error) {
	list, err := s.st.RecentVersions(ctx, limit)
	if err != nil {
		return nil, err
	}
	rows := make([]views.VersionRow, 0, len(list))
	for _, v := range list {
		row, err := s.versionRow(ctx, v)
		if err != nil {
			return nil, err
		}
		rows = append(rows, row)
	}
	return rows, nil
}

func (s *Server) home(w http.ResponseWriter, r *http.Request) {
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	var d views.HomeData
	if d.Versions, err = s.versionRows(r.Context(), 10); err != nil {
		s.fail(w, r, err)
		return
	}
	active, ok, err := s.st.ActiveVersion(r.Context())
	if err != nil {
		s.fail(w, r, err)
		return
	}
	if ok {
		row, err := s.versionRow(r.Context(), active)
		if err != nil {
			s.fail(w, r, err)
			return
		}
		d.Active = &row
	}
	s.render(w, r, http.StatusOK, views.Home(p, d))
}

func (s *Server) versionsIndex(w http.ResponseWriter, r *http.Request) {
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	rows, err := s.versionRows(r.Context(), 0)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	active, ok, err := s.st.ActiveVersion(r.Context())
	if err != nil {
		s.fail(w, r, err)
		return
	}
	var a *store.DataVersion
	if ok {
		a = &active
	}
	s.render(w, r, http.StatusOK, views.VersionsIndex(p, a, rows))
}

// loadVersion finds the version named by the path, answering 404 if none.
func (s *Server) loadVersion(w http.ResponseWriter, r *http.Request) (views.VersionRow, bool) {
	id, ok := s.pathID(w, r)
	if !ok {
		return views.VersionRow{}, false
	}
	v, err := s.st.FindVersion(r.Context(), id)
	if err != nil {
		s.fail(w, r, err)
		return views.VersionRow{}, false
	}
	row, err := s.versionRow(r.Context(), v)
	if err != nil {
		s.fail(w, r, err)
		return row, false
	}
	return row, true
}

func (s *Server) versionShow(w http.ResponseWriter, r *http.Request) {
	v, ok := s.loadVersion(w, r)
	if !ok {
		return
	}
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.render(w, r, http.StatusOK, views.VersionShow(p, v))
}

func (s *Server) versionNew(w http.ResponseWriter, r *http.Request) {
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.render(w, r, http.StatusOK, views.VersionNew(p, views.VersionForm{Status: "draft"}))
}

func (s *Server) versionCreate(w http.ResponseWriter, r *http.Request) {
	f, err := formFields(r, "data_version")
	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	status := "draft"
	if v, ok := f["status"]; ok {
		status = v
	}
	var desc sql.NullString
	if v, ok := f["description"]; ok {
		desc = sql.NullString{String: v, Valid: true}
	}
	_, err = s.st.CreateVersion(r.Context(), f["name"], desc, status)
	var verrs store.ValidationErrors
	if errors.As(err, &verrs) {
		p, perr := s.page(w, r)
		if perr != nil {
			s.fail(w, r, perr)
			return
		}
		s.render(w, r, http.StatusUnprocessableEntity, views.VersionNew(p, views.VersionForm{
			Name: f["name"], Description: f["description"], Status: status, Errors: verrs}))
		return
	}
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.redirect(w, r, "/data_versions", flash{Notice: "Data version was successfully created."})
}

// datetimeLocal is the value of a datetime-local input.
const datetimeLocal = "2006-01-02T15:04"

func versionForm(v store.DataVersion) views.VersionForm {
	f := views.VersionForm{Name: v.Name, Description: v.Description.String, Status: v.Status}
	if !v.SnapshotDate.IsZero() {
		f.SnapshotDate = v.SnapshotDate.UTC().Format(datetimeLocal)
	}
	return f
}

func (s *Server) versionEdit(w http.ResponseWriter, r *http.Request) {
	v, ok := s.loadVersion(w, r)
	if !ok {
		return
	}
	p, err := s.page(w, r)
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.render(w, r, http.StatusOK, views.VersionEdit(p, v, versionForm(v.DataVersion)))
}

// parseSnapshot reads a submitted snapshot date. Blank gives the zero time,
// which fails validation as Rails' presence check did.
func parseSnapshot(v string) time.Time {
	for _, layout := range []string{datetimeLocal, "2006-01-02T15:04:05", "2006-01-02 15:04:05", "2006-01-02 15:04", "2006-01-02"} {
		if t, err := time.ParseInLocation(layout, v, time.UTC); err == nil {
			return t
		}
	}
	return time.Time{}
}

func (s *Server) versionUpdate(w http.ResponseWriter, r *http.Request) {
	v, ok := s.loadVersion(w, r)
	if !ok {
		return
	}
	f, err := formFields(r, "data_version")
	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	var u store.VersionUpdate
	u.Name, u.Status = field(f, "name"), field(f, "status")
	if d, ok := f["description"]; ok {
		u.Description = &sql.NullString{String: d, Valid: true}
	}
	if d, ok := f["snapshot_date"]; ok {
		t := parseSnapshot(d)
		u.SnapshotDate = &t
	}
	updated, err := s.st.UpdateVersion(r.Context(), v.ID, u)
	var verrs store.ValidationErrors
	if errors.As(err, &verrs) {
		p, perr := s.page(w, r)
		if perr != nil {
			s.fail(w, r, perr)
			return
		}
		form := versionForm(updated)
		form.Errors = verrs
		if d, ok := f["snapshot_date"]; ok {
			form.SnapshotDate = d
		}
		s.render(w, r, http.StatusUnprocessableEntity, views.VersionEdit(p, v, form))
		return
	}
	if err != nil {
		s.fail(w, r, err)
		return
	}
	s.redirect(w, r, "/data_versions/"+itoa(v.ID), flash{Notice: "Data version was successfully updated."})
}

func (s *Server) versionActivate(w http.ResponseWriter, r *http.Request) {
	v, ok := s.loadVersion(w, r)
	if !ok {
		return
	}
	if _, err := s.st.ActivateVersion(r.Context(), v.ID); err != nil {
		s.fail(w, r, err)
		return
	}
	s.redirectBack(w, r, flash{Notice: v.Name + " is now the active version."})
}

func (s *Server) versionArchive(w http.ResponseWriter, r *http.Request) {
	v, ok := s.loadVersion(w, r)
	if !ok {
		return
	}
	if _, err := s.st.ArchiveVersion(r.Context(), v.ID); err != nil {
		s.fail(w, r, err)
		return
	}
	s.redirect(w, r, "/data_versions", flash{Notice: v.Name + " has been archived."})
}

func (s *Server) versionDestroy(w http.ResponseWriter, r *http.Request) {
	v, ok := s.loadVersion(w, r)
	if !ok {
		return
	}
	if v.IsActive {
		s.redirect(w, r, "/data_versions", flash{Alert: "Cannot delete the active version."})
		return
	}
	if err := s.st.DeleteVersion(r.Context(), v.ID); err != nil {
		s.fail(w, r, err)
		return
	}
	s.redirect(w, r, "/data_versions", flash{Notice: "Data version was successfully deleted."})
}
