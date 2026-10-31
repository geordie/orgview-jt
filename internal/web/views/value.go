package views

import (
	"encoding/json"
	"math"
	"strconv"
	"strings"
)

// Kind says what a Value holds.
type Kind int

const (
	Nil Kind = iota
	Str
	Int
	Float
)

// Value is a report cell or chart point. It keeps integers and floats apart
// because the Rails app printed them differently (0 versus 0.0).
type Value struct {
	Kind Kind
	S    string
	I    int64
	F    float64
}

func S(s string) Value  { return Value{Kind: Str, S: s} }
func I(i int64) Value   { return Value{Kind: Int, I: i} }
func F(f float64) Value { return Value{Kind: Float, F: f} }
func NilValue() Value   { return Value{} }
func Ints(n []int) []Value {
	out := make([]Value, len(n))
	for i, v := range n {
		out[i] = I(int64(v))
	}
	return out
}

// FromAny converts a database group key (nil, int64, float64, string or
// []byte) to a Value.
func FromAny(v any) Value {
	switch t := v.(type) {
	case nil:
		return NilValue()
	case int64:
		return I(t)
	case int:
		return I(int64(t))
	case float64:
		return F(t)
	case string:
		return S(t)
	case []byte:
		return S(string(t))
	case bool:
		if t {
			return I(1)
		}
		return I(0)
	}
	return NilValue()
}

// String prints the value as Ruby's to_s would.
func (v Value) String() string {
	switch v.Kind {
	case Str:
		return v.S
	case Int:
		return strconv.FormatInt(v.I, 10)
	case Float:
		return RubyFloat(v.F)
	}
	return ""
}

// IsNil reports whether the value is nil.
func (v Value) IsNil() bool { return v.Kind == Nil }

// Number returns the value as a float, for sums.
func (v Value) Number() float64 {
	switch v.Kind {
	case Int:
		return float64(v.I)
	case Float:
		return v.F
	}
	return 0
}

// Round rounds a number to digits places, as Ruby's round(digits) does:
// integers stay integers.
func (v Value) Round(digits int) Value {
	if v.Kind == Float {
		return F(RubyRound(v.F, digits))
	}
	return v
}

// MarshalJSON matches Ruby's to_json: floats keep a ".0".
func (v Value) MarshalJSON() ([]byte, error) {
	switch v.Kind {
	case Str:
		return json.Marshal(v.S)
	case Int:
		return []byte(strconv.FormatInt(v.I, 10)), nil
	case Float:
		return []byte(RubyFloat(v.F)), nil
	}
	return []byte("null"), nil
}

// RubyFloat formats f as Ruby's Float#to_s does.
func RubyFloat(f float64) string {
	switch {
	case math.IsNaN(f):
		return "NaN"
	case math.IsInf(f, 1):
		return "Infinity"
	case math.IsInf(f, -1):
		return "-Infinity"
	}
	abs := math.Abs(f)
	if f == 0 || (abs >= 1e-4 && abs < 1e16) {
		s := strconv.FormatFloat(f, 'f', -1, 64)
		if !strings.Contains(s, ".") {
			s += ".0"
		}
		return s
	}
	// Ruby: 1.0e-05, 1.234e+16
	s := strconv.FormatFloat(f, 'e', -1, 64)
	mant, exp, _ := strings.Cut(s, "e")
	if !strings.Contains(mant, ".") {
		mant += ".0"
	}
	sign := exp[0]
	digits := strings.TrimLeft(exp[1:], "0")
	if len(digits) < 2 {
		digits = strings.Repeat("0", 2-len(digits)) + digits
	}
	return mant + "e" + string(sign) + digits
}

// RubyRound rounds half away from zero to digits places, using the same
// steps as Ruby's Float#round so results match to the last bit.
func RubyRound(x float64, digits int) float64 {
	if digits == 0 {
		return roundHalfUp(x, 1)
	}
	s := math.Pow(10, float64(digits))
	return roundHalfUp(x, s) / s
}

func roundHalfUp(x, s float64) float64 {
	xs := x * s
	f := math.Round(xs)
	if s == 1.0 {
		return f
	}
	if x > 0 {
		if (f+0.5)/s <= x {
			f++
		}
	} else {
		if (f-0.5)/s >= x {
			f--
		}
	}
	return f
}

// Sum adds values as Ruby's Array#sum does: integers exactly, and floats
// with Kahan-Babuska compensation. The result is an integer when every
// value is.
func Sum(vals []Value) Value {
	var isum int64
	i := 0
	for ; i < len(vals); i++ {
		if vals[i].Kind == Float {
			break
		}
		if vals[i].Kind == Int {
			isum += vals[i].I
		}
	}
	if i == len(vals) {
		return I(isum)
	}
	f := float64(isum)
	c := 0.0
	for ; i < len(vals); i++ {
		x := vals[i].Number()
		t := f + x
		if math.Abs(f) >= math.Abs(x) {
			c += (f - t) + x
		} else {
			c += (x - t) + f
		}
		f = t
	}
	return F(f + c)
}
