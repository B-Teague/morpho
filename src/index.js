//This file is generated from ./util/index.template.js based on browserslist configuration and mdn-browser-compat-data for vendor prefixing
var sheet = document.head.appendChild(document.createElement("style")).sheet
var cache = {
  prefix: "morpho",
  unit: "px"
};

var cssProps = {}
var vendors = ["-webkit-","-ms-","-moz-","-o-"]
var vendorCssProps = [["kzu","392","16fh","os4","306","u4k","orl","lxe","11wk","13yc","6tb","1ap7","76n","wh1","1cio","82v","14bo","b5r","j16","15tf","u5b","hd8","tcj","18kk","tot","pz1","1cnf","1bj1","bpd","s2v","m6j","12mq","16i8","137t","f88","16pl","pk7","1ch8","1503","16m9","jfz","1b8d","1dqg","a96","6ez","1aoi","1ebr","j71","159a","wsp","fse","23m","bu9","phi","po1","dre","18l3","32i","1c6k","gfm","1dr2","pnb","145o","xkh","xki","11my","qyq","14q","9tc","4sc","rz4","144r","do7","gv4","2r0","fcb","pss","n9p","12gz","iat","13fg","1dbi"],["bu9","fsv","phi","hrh","hri","1zx","7pw","8qg","wbi","szn","iqy","lkj","6dp","1b42","1dbi","1efg","8o4"],["h2h","13fg"],[]]
var unitlessCssProps = ["306","r5z","b5r","783","1cnf","pz1","bpd","f88","1b8d","wsp","1ebr","x3x","j71","795","3fu","l84","yoj","90x","kj8","f5k","124d","18d7","18yy","rqa","fs6","1cde","dkg","12yj","1dr2","12gb","h2h","rax","1tr","yxv","935","14a4","x4w","15s2","13nu","17q3","t7a","19n5"]

var isFunc = v => !!v && v.constructor === Function
var isArr = v => !!v && v.constructor === Array
var isObj = v => !!v && v.constructor === Object

//!!! WARNING !!!
//This hash function may cause collision with future css property names
//This library requires a perfect hash function for vendor prefixing to work correctly.
//This file will fail to generate from createCssPropMap.js if a collision is detected.
var n = new Uint16Array(1)
function hashCssProp(prop) {
  n[0] = 0;
  for (var i = 0; i < prop.length; i++) {
    n[0] = ((n[0] << 4) - n[0]) + prop.charCodeAt(i);
  }
  return n[0].toString(36);
}

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
