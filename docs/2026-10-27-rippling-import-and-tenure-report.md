# Rippling CSV import and tenure report

## CSV columns

The employee importer (`app/controllers/concerns/employee_csv_importer.rb`)
expects the Rippling export format. These headers are required:

| CSV column | Stored as |
|---|---|
| Employee - ID | `person_id` |
| Employee | `name` |
| Start date | `start_date` (ISO dates; unparseable values are stored blank) |
| Current entity information - legal entity name | `company` |
| Work location - Country | `country` |
| Rippling profile number | `job_code` |
| Title | `title` |
| Department | team name (see below) |
| Level name | `job_level` (seniority parsed from a `(P22)`/`(M25)` prefix, else 0) |
| Job family name | `job_family` |
| Manager - ID | `manager_id` |
| Is a manager | `is_manager` (falls back to the level prefix, then to having reports) |

`Manager` is not used.

Each distinct Department becomes a flat, top-level team in the active data
version and employees are assigned to it. Re-importing clears the active
version's employees, teams and team memberships first. Run "build all teams
stats" afterwards to refresh team counts.

## Tenure report

`/reports/tenure` (Reports > Employee Tenure) counts employees by completed
years of service. Tenure is measured up to the fixed date
`ReportsController::TENURE_AS_OF` (Oct 26, 2026), not today.

| Label | Completed years |
|---|---|
| < 1 year | 0 |
| 1 - 2 years | 1-2 |
| 3 - 5 years | 3-4 |
| 5 - 10 years | 5-9 |
| 10 - 20 years | 10-19 |
| > 20 years | 20+ |

Employees without a start date appear under "Unknown". The report accepts a
`team_id` filter like the seniority report.

## Employees tree view

Cards show the name in the header and labelled Team, Title, Direct Reports and
Org Size rows. Org size is the number of direct and indirect reports.
