# OrgView Simplification Proposal
**Date:** 2026-03-19

## Background

This app was originally built for an org with a dual supply/demand structure, using a complex Workday/PACE CSV export with 50+ columns. We're repurposing it for a simpler org represented by a 9-column CSV:

```
Person ID,Business Title,Job Code,Job Level,Country,Personnel Area,Company/Subsidiary,Org Unit,Leader ID
```

This document proposes the simplifications needed to support this new input while retaining the core reporting capabilities.

---

## Decisions

- **`squads` → rename to `teams`** throughout (table, model, controller, views, routes)
- **Org Unit values are flat for now** — no embedded hierarchy separator; every team is at the same level (depth=1). Hierarchy support can be added later.
- **`squads_employees` → rename to `teams_employees`** and keep, since employees could potentially map to more than one team
- **Display name** — `person_id` used everywhere a name would be shown
- **`Job Level` format** — values look like `(P22) Sr` or `(M25) Dir`. Parse seniority integer from the digits inside the parentheses (e.g. `22`, `25`). The prefix letter also signals manager status: `M` = manager, `P` = individual contributor — use this to derive `is_manager` at import time instead of scanning all `leader_id` values.
- **No `Org Unit` hierarchy separator** — flat for now, consistent with the above
- **`Personnel Area`** — geographic location (region/area), not a replacement for `worker_type`. Add as a new column; `worker_type` is removed since it had no equivalent in the new CSV.
- **Column naming** — use `job_code` (not `job_function`). All reports updated accordingly.

---

## What to Remove

### 1. The `emp` Staging Table → Replace

The current `emp` table has ~50 columns, all Workday/PACE/supply/demand specific. It acts as a staging area before employees and teams are generated from it.

**Proposal:** Replace with a much simpler staging table that mirrors only the 9 new CSV columns:

| New column | Type |
|---|---|
| `person_id` | string |
| `business_title` | string |
| `job_code` | string |
| `job_level` | string |
| `country` | string |
| `personnel_area` | string |
| `company` | string |
| `org_unit` | string |
| `leader_id` | string |

No more `supply_team_name`, `demand_team_*`, `pace_supervisory_org_*`, `workday_*`, `allocated_fte`, etc.

### 2. The `roles` Table → Remove

The `roles` table was a lookup used to *enrich* the raw import: each row in `emp` had a Workday job profile (e.g., "Software Engineer III") that was matched against `roles` to assign a canonical `job_function`, `job_function_group`, `seniority`, and `is_manager` flag.

With the new CSV, this enrichment is unnecessary — `Business Title`, `Job Code`, and `Job Level` come directly and cleanly from the source. There's no need to generate roles, store them, or manage them.

**Files to remove:**
- `app/models/role.rb`
- `app/controllers/roles_controller.rb`
- `app/controllers/concerns/cba_roles_generator.rb`
- `app/views/roles/` (all views)
- `data/roles.csv`

### 3. CBA-Specific Concerns → Remove

All three CBA generator concerns exist solely to translate the old complex CSV format into the app's models.

**Files to remove:**
- `app/controllers/concerns/cba_employee_generator.rb` — the multi-step employee build process
- `app/controllers/concerns/cba_squad_generator.rb` — supply + demand team tree building; replaced by a new simpler `team_generator.rb`
- `app/controllers/concerns/cba_roles_generator.rb` — roles extraction from emp table
- `app/controllers/concerns/employee_generator.rb` — sample data generator using Faker (no longer relevant)
- `app/lib/cba_utils.rb` — management level string parser (no longer needed)

### 4. Reports → Partial Removal

**Reports to remove:**
- `reports/employee_allocations` — original use case (supply/demand fractional allocation) is gone
- `reports/team_geos` — hardcoded Australia vs India percentages, not generalizable

**Views to remove:**
- `app/views/reports/employee_allocations.html.erb`
- `app/views/reports/team_geos.html.erb`

**Keep (to evolve later):**
- Squad/team health reports (`squad_health`, `squad_health_details`, `squad_children`, `squad_members_managers`) — health thresholds are CBA-specific today but will be updated for the new org context in a future pass

### 5. Employee Treeviews → Keep

`app/views/employees/treeview.html.erb` and `treeview2.html.erb` are kept and updated to rename squad references to team.

---

## What to Change

### 1. `squads` → `teams` (Rename Throughout)

Every reference to "squad" becomes "team":

| Old | New |
|---|---|
| `squads` table | `teams` table |
| `squads_employees` table | `teams_employees` table |
| `Squad` model | `Team` model |
| `SquadsEmployee` model | `TeamsEmployee` model |
| `SquadsController` | `TeamsController` |
| `squads_controller.rb` | `teams_controller.rb` |
| `app/views/squads/` | `app/views/teams/` |
| Routes: `resources :squads` | `resources :teams` |
| Nav: "Squads" | "Teams" |
| Reports: "Squad X" | "Team X" |

Squad health columns (`squad_health`, `squad_health_details`) are removed from the `teams` table since that concept is also going away.

### 2. `teams` Table Schema

All existing columns are kept — health columns will be evolved for the new org context later. Rename stat columns for clarity:
- `squad_members` → `member_count`
- `org_members` → `org_member_count`
- `squad_members_managers` → `manager_count`
- `squad_health` → `team_health`
- `squad_health_details` → `team_health_details`

### 3. `teams_employees` (formerly `squads_employees`) — Keep

The join table is preserved since an employee could potentially map to more than one team. The `allocation` column stays in case partial allocation becomes relevant.

Remove:
- `app/views/reports/employee_allocations.html.erb` — the specific allocations report is removed since the original use case (supply vs demand fractional allocation) doesn't apply; but the join table itself stays

### 4. `employees` Table Schema

**Remove columns:**
- `name` — no first/last name fields in new CSV; use `person_id` for display
- `start_date` — not in new CSV
- `worker_type` — replaced by `personnel_area`
- `job_function_group` — was the Workday job family group; no equivalent in new CSV

**Add columns:**
- `job_code` — from `Job Code` CSV column; used everywhere `job_function` was previously used
- `job_level` — from `Job Level` CSV column, stored as the raw string (e.g. `"(P22) Sr"`)
- `personnel_area` — from `Personnel Area` CSV column (geographic region)
- `company` — from `Company/Subsidiary` CSV column

**Rename/keep:**
- `title` ← from `Business Title`
- `seniority` ← integer parsed from `Job Level` — extract digits from inside the parentheses (e.g. `"(P22) Sr"` → `22`, `"(M25) Dir"` → `25`)
- `country` ← from `Country`
- `manager_id` ← from `Leader ID`
- `is_manager` ← derived from `Job Level` prefix at import time: `M` prefix → true, `P` prefix → false (e.g. `"(M25) Dir"` → manager, `"(P22) Sr"` → not a manager). Falls back to scanning `leader_id` values for any rows where the prefix is absent or unrecognised.
- `person_id`, `data_version_id` — unchanged

**Remove columns:**
- `name` — no name field in new CSV; `person_id` used for display
- `start_date` — not in new CSV
- `worker_type` — no equivalent in new CSV; `personnel_area` serves a different geo purpose
- `job_function` — replaced by `job_code`
- `job_function_group` — no equivalent in new CSV

**Validation changes:**
- Remove validations for `name`, `start_date`, `job_function`
- `title` (Business Title) remains required

### 5. Import Pipeline — Collapse from 5 Steps to 2

**Current 5-step process:**
1. Upload CSV → `emp` staging table
2. Generate Roles (from `emp` → `roles`)
3. Generate Employees (from `emp` + `roles` → `employees`)
4. Generate Squads (from `emp` → `squads` + `squads_employees`)
5. Generate Squad Stats

**Proposed 2-step process:**
1. Upload CSV → directly build `employees` (staging table optional for inspection)
2. Generate Teams → parse `Org Unit` hierarchy from `emp` → `teams` + `teams_employees` + compute stats

This preserves the generate-teams-stats step since hierarchy stats (depth, member counts, descendants) are still valuable. Step 1 and 3 (Generate Roles, Build Employees from staged emp) collapse into one.

The home page shrinks accordingly.

### 6. `EmployeeCsvImporter` — Rewrite

Replace the current importer (which validates against 74 expected headers, reads into `emp`, and delegates to `CbaEmployeeGenerator`) with a new concern that:
- Validates against 9 headers: `Person ID`, `Business Title`, `Job Code`, `Job Level`, `Country`, `Personnel Area`, `Company/Subsidiary`, `Org Unit`, `Leader ID`
- Reads directly into `employees` (with `data_version_id`)
- Parses `seniority` from `Job Level` by extracting digits inside parentheses: `/\(([PM])(\d+)\)/`
- Derives `is_manager` from the `Job Level` prefix letter (`M` → true, `P` → false); falls back to a second-pass `leader_id` scan for unrecognised prefixes
- Populates `job_code` directly from `Job Code`
- Stores the raw `Job Level` string in `job_level`

### 7. New `TeamGenerator` Concern

Replaces `cba_squad_generator.rb`. Already created at `app/controllers/concerns/team_generator.rb`. It:
- Reads distinct `org_unit` values from `Emp.import_filter`
- Creates one flat `Team` record per unique value (depth=1, no parent)
- Builds `teams_employees` membership records from each employee's `org_unit`
- Computes team stats (member counts, descendants, health) — same logic as the old stats builder
- Hierarchy support (parsing a separator in `org_unit` values) can be added in a future pass

### 8. Reports — Update and Remove

**Keep (with minor updates):**

| Report | Change needed |
|---|---|
| Employee Countries | None |
| Employee Roles (titles) | None |
| Employee Role Density (title by team) | Rename "squad" → "team"; filter by `job_code` |
| Employee Job Function | Rename to "Job Code"; query `job_code` column |
| Employee Job Function Density | Same; rename "squad" → "team" |
| Employee Seniority | Rename label to "Job Level" |
| Management Ratios | None |
| Team Size (was Squad Size) | Rename |
| Team Depth (was Squad Depth) | Rename |

**Remove:**

| Report | Reason |
|---|---|
| Employee Worker Types | No `worker_type` in new schema |
| Employee Worker Types by Country | Same |
| Employee Squad Allocations | Original use case (supply/demand fractional allocation) gone |
| Team Geographies | Hardcoded to Australia/India, not generalizable |

**Keep (to evolve later):**

| Report | Note |
|---|---|
| Team Health | Thresholds are CBA-specific; will be updated for new org context |
| Team Health Details | Same |
| Team Children | Same |
| Team Members Managers | Same |

**Add:**
- Personnel Area breakdown report (geo distribution)
- Company/Subsidiary breakdown report

---

## What to Keep (Unchanged)

- `data_versions` table and `DataVersion` model — version management remains valuable
- `DataVersionsController` — unchanged
- Report rendering infrastructure (`TableColumns`, `ChartData`, `LinkInfo`, `LinkParams` models)
- `application_controller.rb` — unchanged
- Layout, Bootstrap styling
- Pagination helpers
- `data_version_switcher.js`

---

## Summary of Changes by File

### Delete
- `app/models/role.rb`
- `app/controllers/roles_controller.rb`
- `app/controllers/concerns/cba_employee_generator.rb`
- `app/controllers/concerns/cba_roles_generator.rb`
- `app/controllers/concerns/cba_squad_generator.rb`
- `app/controllers/concerns/employee_generator.rb`
- `app/lib/cba_utils.rb`
- `app/views/roles/` (all)
- `app/views/reports/employee_allocations.html.erb`
- `app/views/reports/team_geos.html.erb`
- `data/roles.csv`
- `test/fixtures/roles.yml`
- `test/models/role_test.rb`
- `test/models/squads_employee_test.rb` (replaced by teams_employee_test)

### Rename
- `app/models/squad.rb` → `app/models/team.rb`
- `app/models/squads_employee.rb` → `app/models/teams_employee.rb`
- `app/controllers/squads_controller.rb` → `app/controllers/teams_controller.rb`
- `app/views/squads/` → `app/views/teams/` (including treeview)
- `app/views/employees/treeview.html.erb` — keep, rename squad references to team
- `app/views/employees/treeview2.html.erb` — keep, rename squad references to team
- `app/views/reports/squad_health.html.erb` → `app/views/reports/team_health.html.erb`
- `app/views/reports/squad_health_details.html.erb` → `app/views/reports/team_health_details.html.erb`
- `app/views/reports/squad_children.html.erb` → `app/views/reports/team_children.html.erb`
- `app/views/reports/squad_members_managers.html.erb` → `app/views/reports/team_members_managers.html.erb`
- `test/fixtures/squads.yml` → `test/fixtures/teams.yml`
- `test/fixtures/squads_employees.yml` → `test/fixtures/teams_employees.yml`
- `test/system/roles_test.rb` → remove (roles gone)

### New
- `app/controllers/concerns/team_generator.rb` — replaces `cba_squad_generator.rb`
- Migration: replace `emp` table with 9-column schema
- Migration: drop `roles` table
- Migration: rename `squads` → `teams`, remove health columns, rename stat columns
- Migration: rename `squads_employees` → `teams_employees`
- Migration: update `employees` (add new columns, remove old)
- `test/fixtures/teams.yml`
- `test/fixtures/teams_employees.yml`

### Rewrite
- `app/controllers/concerns/employee_csv_importer.rb` — new 9-column schema, direct-to-employees import
- `app/views/home/index.html.erb` — 2-step import
- `app/views/employees/index.html.erb` — update displayed columns
- `app/views/employees/show.html.erb` — update fields
- `app/views/employees/_form.html.erb` — update fields
- `app/views/layouts/application.html.erb` — rename "Squads" → "Teams", remove Roles nav item
- `config/routes.rb` — remove roles routes, rename squads → teams, remove old generator routes

### Update (smaller changes)
- `app/models/employee.rb` — update validations, remove old columns, add new
- `app/controllers/employees_controller.rb` — remove `build_cba_list`, `structure`, `treeview`, `treeview2` actions
- `app/controllers/reports_controller.rb` — remove obsolete actions, rename squad → team references
- `db/schema.rb` — reflects all migrations above
- `test/fixtures/employees.yml`

---

## All Questions Resolved

| Question | Decision |
|---|---|
| Display name | Use `person_id` |
| `Job Level` format | `(P22) Sr`, `(M25) Dir` — extract digits from inside parens for `seniority`; prefix letter (`M`/`P`) derives `is_manager` |
| Org Unit separator | None for now — all teams are flat (depth=1) |
| `Personnel Area` | Geographic location; new column on `employees`, not a replacement for `worker_type` |
| Column naming | Use `job_code` throughout (not `job_function`) |
