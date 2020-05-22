function delim(name, unit) {
  return function() {
    var args = Array.prototype.slice.call(arguments); //100, 200, 50
    var len = unit && unit.length
    var delimited = args.reduce(function(arr, arg, i) {
      if (i > 0 && !["calc", "attr"].includes(name)) {
        arr.push(",")
      }
      return arr.concat(
        typeof arg === "number"
          ? Array.isArray(unit)
            ? i >= len
              ? arg + unit[len - 1] //Use last unit for remaining args
              : arg + unit[i]
            : arg
          : arg
      );
    }, []);

    return [name + "("].concat(delimited).concat(")");
  };
}

//some functions require units, others are unitless
var rgb = delim("rgb", [""])
var rgba = delim("rgba", [""])
var rotate = delim("rotate", ["deg"])
var calc = delim("calc")
var attr = delim("attr")
var cubicBezier = delim("cubic-bezier", [""])
var hsl = delim("hsl", ["", "%"])
var hsla = delim("hsla", ["", "%", "%", ""])
var linearGradient = delim("linear-gradient", ["deg", "%"])
var radialGradient = delim("radial-gradient", ["%"])
var repeatingLinearGradient = delim("repeating-linear-gradient", ["deg", "%"])
var repeatingRadialGradient = delim("repeating-radial-gradient", ["%"])
var variable = delim("var")

export { calc, rgb, rgba, rotate, attr, cubicBezier, hsl, hsla, linearGradient, radialGradient, repeatingLinearGradient, repeatingRadialGradient, variable };
