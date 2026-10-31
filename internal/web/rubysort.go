package web

import "math/bits"

// rubySortBy sorts items by an integer key exactly as Ruby 3.3's
// Enumerable#sort_by does when every key is an Integer: an introsort that is
// not stable. Porting it keeps rows with equal counts in the order the
// Rails app showed them. It follows rb_uniform_intro_sort_2 in Ruby's enum.c.
func rubySortBy[T any](items []T, key func(T) int64) {
	n := len(items)
	if n < 2 {
		return
	}
	data := make([]uniformItem[T], n)
	for i, it := range items {
		data[i] = uniformItem[T]{v: key(it), item: it}
	}
	sorted := true
	for i := 1; i < n; i++ {
		if data[i-1].v > data[i].v {
			sorted = false
			break
		}
	}
	if !sorted {
		d := bits.Len(uint(n)) - 1
		uniformQuicksort(data, d<<1)
	}
	for i := range data {
		items[i] = data[i].item
	}
}

type uniformItem[T any] struct {
	v    int64
	item T
}

func uniformInsertionSort[T any](a []uniformItem[T]) {
	if len(a) < 2 {
		return
	}
	for index := 1; index < len(a); index++ {
		tmp := a[index]
		j, k := index, index
		if tmp.v < a[0].v {
			for j > 0 {
				k--
				a[j] = a[k]
				j = k
			}
		} else {
			for {
				k--
				if !(tmp.v < a[k].v) {
					break
				}
				a[j] = a[k]
				j = k
			}
		}
		a[j] = tmp
	}
}

func uniformHeapDown[T any](a []uniformItem[T], offset, length int) {
	tmp := a[offset]
	for {
		c := offset<<1 + 1
		if c > length {
			break
		}
		if c < length && a[c].v < a[c+1].v {
			c++
		}
		if !(tmp.v < a[c].v) {
			break
		}
		a[offset] = a[c]
		offset = c
	}
	a[offset] = tmp
}

func uniformHeapsort[T any](a []uniformItem[T]) {
	n := len(a)
	if n < 2 {
		return
	}
	for offset := n >> 1; offset > 0; {
		offset--
		uniformHeapDown(a, offset, n-1)
	}
	for offset := n - 1; offset > 0; {
		a[0], a[offset] = a[offset], a[0]
		offset--
		uniformHeapDown(a, 0, offset)
	}
}

func med3(a, b, c int64) int64 {
	if a < b {
		if b < c {
			return b
		}
		if c < a {
			return a
		}
		return c
	}
	if c < b {
		return b
	}
	if a < c {
		return a
	}
	return c
}

func uniformQuicksort[T any](a []uniformItem[T], d int) {
	n := len(a)
	if n <= 16 {
		uniformInsertionSort(a)
		return
	}
	if d == 0 {
		uniformHeapsort(a)
		return
	}
	x := med3(a[0].v, a[n>>1].v, a[n-1].v)
	i, j := 0, n-1
	for {
		for a[i].v < x {
			i++
		}
		for x < a[j].v {
			j--
		}
		if i <= j {
			a[i], a[j] = a[j], a[i]
			i++
			j--
		}
		if i > j {
			break
		}
	}
	j++
	if n-j > 1 {
		uniformQuicksort(a[j:], d-1)
	}
	if i > 1 {
		uniformQuicksort(a[:i], d-1)
	}
}
