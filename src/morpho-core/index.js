var sheet = document.head.appendChild(document.createElement("style")).sheet
var cache = {};

var h = new Uint32Array(1);
h[0] = 1 //seed
function hash() { //MurmurHash3
  h[0] = Math.imul(h[0] ^ h[0] >>> 16, 2246822507);
  h[0] = Math.imul(h[0] ^ h[0] >>> 13, 3266489909);
  h[0] = h[0] ^ h[0] >>> 16;
  return h[0].toString(36)
}

export default function (options) {
  options = options || {}
  var _prefix = options.prefix || "morpho";
  var _unit = options.unit || "px";
  var cssProps = {}
  for (let prop in options.cssProps) {
    cssProps[hyphenate(prop)] = options.cssProps[prop]
  }

  return { css, keyframes }

  function css(decls, prefix) {
    return fromCache(serialize(decls, "&"), ".", prefix || _prefix)
  }

  function keyframes(decls, prefix) {
    return fromCache([wrap(serialize(decls, "").join(""), "& ")], "@keyframes ", prefix || _prefix)
  }

  function isArr(v) { return !!v && v.constructor === Array }
  function isObj(v) { return !!v && v.constructor === Object }

  function hyphenate(str) {
    return str.replace(/[A-Z]/g, "-$&").toLowerCase()
  }

  //cssType is "@keyframes " or "."
  function createStyle(rules, cssType, prefix) {
    var id = prefix + "-" + hash();
    var name = cssType + id
    for (var i = 0; i < rules.length; i++) {
      sheet.insertRule(rules[i].replace(/&/g, name), sheet.cssRules.lenth)
    }
    return id
  }

  function wrap(str, prop) {
    return prop + "{" + str + "}"
  }

  function serialize(obj, parent) {
    var rules = []
    var css = ""
    for (var prop in obj) {
      var value = obj[prop]

      if (/^@/.test(prop)) { //nested @-rule objects only.  Doesn't support global @ rules
        rules.push(wrap(serialize(value, parent).join(""), prop))
      } else {
        if (isObj(value)) {
          rules = rules.concat(serialize(value, parent === "&" && prop.includes("&") ? prop : parent + " " + prop))
        } else {
          var { vendor, unit } = Object.assign({ vendor: [], unit: _unit }, cssProps[hyphenate(prop)])
          value = isArr(value) ? isArr(value[0]) ? value : [value] : [[value]]
          css += value.reduce(function (propRepeat, value) {
            value = value.map(function (val) { return typeof val === "number" ? val + unit : val }).join(" ");
            return propRepeat + vendor.concat("").reduce(function (result, prefix) {
              return result + prefix + hyphenate(prop) + ":" + value + ";" //Vendor prefixing
            }, "")
          }, "")
        }
      }
    }

    //Add all normal css properties as a new rule
    if (css) { rules.push(wrap(css, parent)) }

    return rules
  }

  function fromCache(rules, cssType, prefix) {
    var key = prefix + rules.join("")
    return cache[key] || (cache[key] = createStyle(rules, cssType, prefix))
  }
}
