function isFunc(v) { return !!v && v.constructor === Function }

export default function (css, h, options) {

  options = options || {}
  var classProp = options.classProp || "class"

  return { styled }

  function styled(nodeName, decls, prefix) {
    return function (props, context) {
      props = props || {}
      props[classProp] = [props[classProp], css(isFunc(decls) ? decls(props) : decls, prefix)]
        .filter(Boolean).join(" ")
      return isFunc(nodeName) ? nodeName(props, context) : h(nodeName, props, options.childParam ? context : props.children || [])
    }
  }
}
