# The Rails app's vendor/ folder would put Go into vendoring mode; -mod=mod
# makes Go use go.mod instead. Remove once Rails is gone.
export GOFLAGS := -mod=mod

DB ?= storage/development.sqlite3

.PHONY: run build test generate vet docker

## run: serve the app on :3001 from $(DB)
run: generate
	go run ./cmd/orgview -db $(DB)

## build: build bin/orgview
build: generate
	go build -o bin/orgview ./cmd/orgview

## test: run the Go tests
test:
	go test ./...

## vet: go vet and gofmt
vet:
	go vet ./...
	test -z "$$(gofmt -l cmd internal)"

## generate: regenerate the templ views (the _templ.go files are committed)
generate:
	go build -o bin/templ github.com/a-h/templ/cmd/templ
	bin/templ generate -path internal/web/views

## docker: build and start the app container
docker:
	docker compose up -d --build app
