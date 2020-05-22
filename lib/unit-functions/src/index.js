var append = function(unit) {
  return function(num) {
    return num + unit
  }
}

var em = append("em")
var ex = append("ex")
var cap = append("cap")
var ic = append("ic")
var prct = append("%")
var lh = append("lh")
var px = append("px")
var cm = append("cm")
var mm = append("mm")
var inch = append("in")
var pt = append("pt")
var pc = append("pc")
var ch = append("ch")
var rem = append("rem")
var vh = append("vh")
var vw = append("vw")
var vmin = append("vmin")
var vmax = append("vmax")

export { em, ex, cap, ic, prct, lh, px, cm, mm, inch, pt, pc, ch, rem, vh, vw, vmin, vmax }
