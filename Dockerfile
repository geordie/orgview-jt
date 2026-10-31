# OrgView, the Go app. The Rails app's image is Dockerfile.rails, kept only for
# the one-time MySQL copy (docs/2026-10-31-move-to-sqlite.md).
FROM golang:1.25-bookworm AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY cmd ./cmd
COPY internal ./internal
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /out/orgview ./cmd/orgview

FROM debian:bookworm-slim
# sqlite3 is the command-line shell, handy for inspecting the database.
RUN apt-get update -qq && apt-get install -yq --no-install-recommends sqlite3 ca-certificates \
    && rm -rf /var/lib/apt/lists/*
COPY --from=build /out/orgview /usr/local/bin/orgview
WORKDIR /app
ENV ORGVIEW_ADDR=:3001 \
    ORGVIEW_DB=/app/storage/development.sqlite3
EXPOSE 3001
CMD ["orgview"]
