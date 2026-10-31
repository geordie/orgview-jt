# OrgView

Org charts, teams and reports from Rippling employee exports.

```sh
docker compose up -d --build app   # http://localhost:3001
```

The app is written in Go and stores its data in SQLite. See
[docs/2026-10-31-go-app.md](docs/2026-10-31-go-app.md) for running it without
Docker, the code layout and how it differs from the old Rails app, and
[docs/2026-10-31-move-to-sqlite.md](docs/2026-10-31-move-to-sqlite.md) for the
one-time copy of the old MySQL data.

The Rails app (`app/`, `config/`, `Gemfile`, `Dockerfile.rails`) is still here
until the Go app is verified on real data.
