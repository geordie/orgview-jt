# Move Team Feature

## Context

Teams have a `parent_id`-based hierarchy but no UI to change a team's parent. This document describes the implementation plan for a "Move Team" action on both the show page and the index table, using a Bootstrap modal with a searchable tree picker.

---

## UX Summary

- **Show page:** "Move Team" button in the Team Summary section
- **Index page:** "Move" button in each row's Actions column
- **Modal:** Shows current parent, a search-filtered list of all valid parent candidates (excluding self and descendants), plus a "Make Root Team" option
- On confirm: updates parent, recalculates `full_path`/`depth` for the team and all descendants, refreshes aggregate stats

---

## Files to Change

| File | Change |
|------|--------|
| `config/routes.rb` | Add `move` and `move_candidates` routes |
| `app/controllers/teams_controller.rb` | Add `move`, `move_candidates` actions and `descendant_ids` helper |
| `app/views/teams/show.html.erb` | Add Move Team button; render modal partial |
| `app/views/teams/index.html.erb` | Add Move button per row; render modal partial |
| `app/views/teams/_move_modal.html.erb` | New shared modal partial with JS |
| `test/controllers/teams_controller_test.rb` | Add move action tests |

---

## Routes

```ruby
get  'teams/:id/move_candidates', to: 'teams#move_candidates'
patch 'teams/:id/move',           to: 'teams#move'
```

---

## Controller

### `before_action`

Add `:move` and `:move_candidates` to the `:set_team` before_action.

### Private helper: `descendant_ids(team)`

Walks the tree via `parent_id` (not `full_path`) to reliably find all descendants:

```ruby
def descendant_ids(team)
  ids, queue = [], [team.id]
  until queue.empty?
    batch = Team.where(parent_id: queue, data_version_id: team.data_version_id).pluck(:id)
    ids.concat(batch)
    queue = batch
  end
  ids
end
```

### `move_candidates` (GET → JSON)

Returns all teams in the active version except self and descendants, ordered by `full_path`:

```ruby
def move_candidates
  current_version = DataVersion.active.first
  excluded = [@team.id] + descendant_ids(@team)
  candidates = Team.where(data_version_id: current_version.id)
    .where.not(id: excluded)
    .order(:full_path)
  render json: candidates.map { |t| { id: t.id, name: t.name, full_path: t.full_path, depth: t.depth } }
end
```

### `move` (PATCH → JSON)

1. Resolve new parent (`params[:parent_id]` blank = make root)
2. Guard against moving to self or own descendant (server-side check)
3. Compute new `full_path` and `depth`
4. Bulk-update all descendants' `full_path` and `depth` using SQL `REPLACE` + depth delta
5. Save the team's own new attributes
6. Call `build_teams_stats(current_version)` to refresh aggregate counts
7. Return `{ redirect_url: team_url(@team) }` on success

```ruby
def move
  current_version = DataVersion.active.first
  new_parent_id   = params[:parent_id].presence

  if new_parent_id
    new_parent = Team.where(data_version_id: current_version.id).find(new_parent_id)
    if descendant_ids(@team).include?(new_parent.id) || new_parent.id == @team.id
      render json: { error: 'Cannot move a team to itself or its own descendant' }, status: :unprocessable_entity
      return
    end
    new_depth     = new_parent.depth + 1
    new_full_path = "#{new_parent.full_path} > #{@team.name}"
  else
    new_depth     = 1
    new_full_path = @team.name
  end

  old_full_path = @team.full_path
  depth_delta   = new_depth - @team.depth

  # Update descendants while old full_path is still known
  Team.where(data_version_id: current_version.id)
      .where("full_path LIKE ?", "#{Team.sanitize_sql_like(old_full_path)} > %")
      .update_all([
        "full_path = REPLACE(full_path, ?, ?), depth = depth + ?",
        "#{old_full_path} >", "#{new_full_path} >", depth_delta
      ])

  @team.assign_attributes(parent_id: new_parent_id, full_path: new_full_path, depth: new_depth)

  if @team.save
    build_teams_stats(current_version)
    render json: { redirect_url: team_url(@team) }
  else
    render json: { error: @team.errors.full_messages.join(', ') }, status: :unprocessable_entity
  end
end
```

---

## Modal Partial (`_move_modal.html.erb`)

A single Bootstrap 5 modal used by both the show and index pages:

- **Header:** "Move Team: {name}" (populated via JS on open)
- **Body:**
  - Search input (filters list client-side)
  - Scrollable `<ul>`: first item is "Make Root Team", remaining are candidates fetched via `GET /teams/{id}/move_candidates.json`
  - Each candidate shows `full_path` with visual indentation by depth
- **Footer:** Cancel + Move Team confirm button

**JS behaviour (inline `<script type="module">`):**
- On `show.bs.modal`: read `data-team-id` / `data-team-name` from the triggering button, fetch candidates, render list
- Search input filters rendered items client-side
- Click to select stores `selectedParentId` and highlights the row
- Confirm button: `PATCH /teams/{id}/move` with `{ parent_id: selectedParentId }`, then `window.location = redirect_url`

---

## Show Page (`show.html.erb`)

Add button in the Team Summary section next to the Parent row:

```erb
<button class="btn btn-outline-secondary btn-sm"
        data-bs-toggle="modal" data-bs-target="#moveTeamModal"
        data-team-id="<%= @team.id %>"
        data-team-name="<%= @team.name %>">
  Move Team
</button>
```

Render at bottom of page:

```erb
<%= render 'move_modal' %>
```

---

## Index Page (`index.html.erb`)

Add in each row's Actions column alongside the Detail button:

```erb
<button class="btn btn-outline-secondary btn-sm"
        data-bs-toggle="modal" data-bs-target="#moveTeamModal"
        data-team-id="<%= team.id %>"
        data-team-name="<%= team.name %>">
  Move
</button>
```

Render the modal once at the bottom:

```erb
<%= render 'move_modal' %>
```

---

## Tests (`test/controllers/teams_controller_test.rb`)

| Test | Assertion |
|------|-----------|
| Move team to new parent | 200, `parent_id` updated, `full_path` and `depth` correct |
| Move team to root | 200, `parent_id` nil, `depth` = 1, `full_path` = name |
| Prevent move to own descendant | 422 response |
| Move candidates excludes self and descendants | JSON does not include team or its children |

---

## Verification

1. `bin/rails test` — full suite passes
2. `bin/rails test test/controllers/teams_controller_test.rb` — new tests pass
3. Manual: visit `/teams` → click Move on a row → pick a new parent → confirm → redirected to show page with updated parent and full_path
4. Manual: show page → Move Team → "Make Root Team" → depth becomes 1
5. Manual: move a parent team and verify its children's full_paths are updated
