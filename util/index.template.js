//This file is generated from ./util/index.template.js based on browserslist configuration and mdn-browser-compat-data for vendor prefixing
var sheet = document.head.appendChild(document.createElement("style")).sheet
var cache = {
  prefix: "morpho",
  unit: "px"
};

var cssProps = {}
var vendors = {{vendors}}
var vendorCssProps = {{vendorCssProps}}
var unitlessCssProps = {{unitlessCssProps}}

var isFunc = v => !!v && v.constructor === Function
var isArr = v => !!v && v.constructor === Array
var isObj = v => !!v && v.constructor === Object

//!!! WARNING !!!
//This hash function may cause collision with future css property names
//This library requires a perfect hash function for vendor prefixing to work correctly.
//This file will fail to generate from createCssPropMap.js if a collision is detected.
var n = new Uint16Array(1)
{{hashCssProp}}

//Perfect 32bit hash function for css class names
var m = new Uint32Array(1);
var seed = 1;
function hash() {
  m[0] = seed++;
  m[0] = (m[0] ^ m[0] >> 16) * 0x7feb352d
  m[0] = (m[0] ^ m[0] >> 16) * 0x846ca68b
  m[0] ^= m[0] >> 16;
  return m[0].toString(36);
}

function getPropData(prop) {
  prop = Object.assign({ unit: cache.unit, vendor: [] }, cssProps[hashCssProp(prop)] || {})
  return [prop.unit, prop.vendor]
}

function hyphenate(str) {
  return str.replace(/[A-Z]/g, "-$&").toLowerCase()
}

//cssType is "@keyframes " or "."
function createStyle(rules, cssType, prefix) {
  var id = prefix + "-" + hash();
  var name = cssType + id
  for (let rule of rules) {
    rule = rule.replace(/&/g, name)
    sheet.insertRule(rule, sheet.cssRules.lenth)
  }
  return id
}

function wrap(str, prop) {
  return prop + "{" + str + "}"
}

function serialize(obj, parent) {
  var rules = []
  var css = ""
  for (let prop in obj) {
    var value = obj[prop]

    if (/^@/.test(prop)) { //nested @-rule objects only.  Doesn't support global @ rules
      rules.push(wrap(serialize(value, parent).join(""), prop))
    } else {
      if (isObj(value)) {
        rules.push(...serialize(value, parent === "&" && prop.includes("&") ? prop : parent + " " + prop))
      } else {
        prop = hyphenate(prop)
        var [unit, vendor] = getPropData(prop)
        value = isArr(value) ? isArr(value[0]) ? value : [value] : [[value]]
        css += value.reduce(function (propRepeat, value) {
          value = value.map(val => typeof val === "number" ? val + unit : val).join(" ");
          return propRepeat + vendor.concat("").reduce(function (result, vendor) {
            return result + vendor + prop + ":" + value + ";" //Vendor prefixing
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

export default function (h, options) {
  //Initialization
  for (var i = 0; i < vendors.length; i++) {
    for (let prop of vendorCssProps[i]) {
      cssProps[prop] ? cssProps[prop].vendor.push(vendors[i]) : cssProps[prop] = { vendor: [vendors[i]] }
    }
  }

  for (let prop of unitlessCssProps) {
    cssProps[prop] ? cssProps[prop].unit = "" : cssProps[prop] = { unit: "" }
  }

  options = options || {}
  for (let prop in options.cssProps) {
    var hashedProp = hashCssProp(hyphenate(prop))
    cssProps[hashedProp] = Object.assign({ vendor: [], unit: cache.unit },
      cssProps[hashedProp],
      options.cssProps[prop]
    )
  }
  cache.unit = options.unit || cache.unit //global unit default
  var classProp = options.classProp || "class" //React uses className

  return { styled, css, keyframes }

  function styled(nodeName, decls, prefix) {
    return function (props, context) {
      props = props || {}
      props[classProp] = [props[classProp], css(isFunc(decls) ? decls(props) : decls, prefix)]
        .filter(Boolean).join(" ")
      return isFunc(nodeName) ? nodeName(props, context) : h(nodeName, props, options.childParam ? context : props.children || [])
    }
  }

  function css(decls, prefix) {
    return fromCache(serialize(decls, "&"), ".", prefix || cache.prefix)
  }

  function keyframes(decls, prefix) {
    return fromCache([wrap(serialize(decls, "").join(""), "& ")], "@keyframes ", prefix || cache.prefix)
  }
}
