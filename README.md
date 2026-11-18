# OrgView

Org charts, teams and reports from Rippling employee exports.

```sh
docker compose up -d --build app   # http://localhost:3001
```

The app is written in Go and stores its data in SQLite. See
[docs/2026-10-31-go-app.md](docs/2026-10-31-go-app.md) for running it without
Docker, the code layout and how it differs from the old Rails app.

OrgView was a Rails app on MySQL until November 2026. The Rails code, the MySQL
copy script and the parity crawler were removed on 2026-11-18; they are in git
history before that date if you ever need them.
