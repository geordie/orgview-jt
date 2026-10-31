package views

// Pager describes one page of a paginated list.
type Pager struct {
	Page, PerPage, Total int
	// URL returns the link to page n.
	URL func(n int) string
}

// TotalPages is the number of pages, at least 1.
func (p Pager) TotalPages() int {
	if p.PerPage <= 0 || p.Total <= 0 {
		return 1
	}
	return (p.Total + p.PerPage - 1) / p.PerPage
}

// Gap marks a run of skipped page numbers in Pager.Window.
const Gap = 0

// Window is the page numbers to show, with Gap for skipped runs, as
// will_paginate lays them out with an inner window of 2 and no outer window.
func (p Pager) Window() []int {
	const inner, outer = 2, 0
	total := p.TotalPages()
	from, to := p.Page-inner, p.Page+inner
	if to > total {
		from -= to - total
		to = total
	}
	if from < 1 {
		to += 1 - from
		from = 1
		if to > total {
			to = total
		}
	}
	var out []int
	if outer+3 < from {
		for i := 1; i <= outer+1; i++ {
			out = append(out, i)
		}
		out = append(out, Gap)
	} else {
		for i := 1; i < from; i++ {
			out = append(out, i)
		}
	}
	for i := from; i <= to; i++ {
		out = append(out, i)
	}
	if total-outer-2 > to {
		out = append(out, Gap)
		for i := total - outer; i <= total; i++ {
			out = append(out, i)
		}
	} else {
		for i := to + 1; i <= total; i++ {
			out = append(out, i)
		}
	}
	return out
}
