package web

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
	"testing"
)

func TestRubySortByMatchesRuby(t *testing.T) {
	if _, err := exec.LookPath("ruby"); err != nil || os.Getenv("RUBY_SORT_CHECK") == "" {
		t.Skip("set RUBY_SORT_CHECK=1 with ruby installed")
	}
	for _, n := range []int{3, 10, 17, 30, 45, 100, 250, 1000} {
		for mod := 1; mod <= 7; mod += 3 {
			keys := make([]int64, n)
			var src []string
			for i := range keys {
				keys[i] = int64((i*7919 + i*i) % (mod*3 + 1))
				src = append(src, fmt.Sprint(keys[i]))
			}
			out, err := exec.Command("ruby", "-e", "a=["+strings.Join(src, ",")+"].each_with_index.to_a; puts a.sort_by{|v,_| v}.map(&:last).join(',')").Output()
			if err != nil {
				t.Fatal(err)
			}
			idx := make([]int, n)
			for i := range idx {
				idx[i] = i
			}
			rubySortBy(idx, func(i int) int64 { return keys[i] })
			var got []string
			for _, i := range idx {
				got = append(got, fmt.Sprint(i))
			}
			if strings.Join(got, ",") != strings.TrimSpace(string(out)) {
				t.Errorf("n=%d mod=%d:\n go   %s\n ruby %s", n, mod, strings.Join(got, ","), out)
			}
		}
	}
}
