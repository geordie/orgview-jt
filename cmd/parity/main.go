// Command parity checks that the Go app renders the same pages as the Rails
// app while both exist. It is a migration tool, removed with the Rails app.
//
//	parity gen DIR                 write sample employee and contractor CSVs
//	parity load URL DIR            drive a fresh app through imports, moves,
//	                               stats and edits using the CSVs in DIR
//	parity crawl URL OUT [URLS]    save normalized pages; with URLS (a file of
//	                               paths), fetch exactly those, else discover
//	                               them by following links from the menus
//	parity diff A B                compare two crawls, page by page
//
// A typical run, against copies of the same database:
//
//	parity crawl http://localhost:3001 /tmp/rails
//	parity crawl http://localhost:8080 /tmp/go /tmp/rails/urls.txt
//	parity diff /tmp/rails /tmp/go
package main

import (
	"fmt"
	"os"
)

func main() {
	if len(os.Args) < 2 {
		usage()
	}
	var err error
	switch os.Args[1] {
	case "gen":
		if len(os.Args) != 3 {
			usage()
		}
		err = gen(os.Args[2])
	case "load":
		if len(os.Args) != 4 {
			usage()
		}
		err = load(os.Args[2], os.Args[3])
	case "crawl":
		if len(os.Args) < 4 || len(os.Args) > 5 {
			usage()
		}
		list := ""
		if len(os.Args) == 5 {
			list = os.Args[4]
		}
		err = crawl(os.Args[2], os.Args[3], list)
	case "diff":
		if len(os.Args) != 4 {
			usage()
		}
		var same bool
		same, err = diff(os.Args[2], os.Args[3])
		if err == nil && !same {
			os.Exit(1)
		}
	default:
		usage()
	}
	if err != nil {
		fmt.Fprintln(os.Stderr, "parity:", err)
		os.Exit(1)
	}
}

func usage() {
	fmt.Fprintln(os.Stderr, "usage: parity gen DIR | load URL DIR | crawl URL OUT [URLS] | diff A B")
	os.Exit(2)
}
