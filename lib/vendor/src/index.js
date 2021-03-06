//This file is generated from ./util/index.template.js based on browserslist configuration and mdn-browser-compat-data for vendor prefixing
var vendorProps = {}
var vendors = [
  "-webkit-",
  "-ms-",
  "-moz-",
  "-o-"
]
var vendorCssProps = [
  [
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timing-function",
    "animation",
    "appearance",
    "backdrop-filter",
    "backface-visibility",
    "background-clip",
    "background-origin",
    "background-size",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-image-slice",
    "border-image",
    "border-radius",
    "border-top-left-radius",
    "border-top-right-radius",
    "box-align",
    "box-decoration-break",
    "box-direction",
    "box-flex-group",
    "box-flex",
    "box-lines",
    "box-ordinal-group",
    "box-orient",
    "box-pack",
    "box-shadow",
    "box-sizing",
    "color-adjust",
    "column-count",
    "column-rule-color",
    "column-rule-style",
    "column-rule-width",
    "column-rule",
    "column-span",
    "column-width",
    "columns",
    "filter",
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
    "flex",
    "font-kerning",
    "font-variant-ligatures",
    "hyphens",
    "line-break",
    "mask-clip",
    "mask-image",
    "mask-origin",
    "mask-position",
    "mask-repeat",
    "mask-size",
    "order",
    "perspective-origin",
    "perspective",
    "scroll-snap-points-x",
    "scroll-snap-points-y",
    "shape-margin",
    "text-emphasis-color",
    "text-emphasis-position",
    "text-emphasis-style",
    "text-emphasis",
    "text-orientation",
    "text-size-adjust",
    "transform-origin",
    "transform-style",
    "transform",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "transition",
    "user-modify",
    "user-select"
  ],
  [
    "hyphens",
    "ime-mode",
    "line-break",
    "overflow-x",
    "overflow-y",
    "scroll-snap-type",
    "scrollbar-3dlight-color",
    "scrollbar-arrow-color",
    "scrollbar-base-color",
    "scrollbar-darkshadow-color",
    "scrollbar-face-color",
    "scrollbar-highlight-color",
    "scrollbar-shadow-color",
    "text-overflow",
    "user-select",
    "word-break",
    "writing-mode"
  ],
  [
    "tab-size",
    "user-modify"
  ],
  []
]

//Initialization
for (var i = 0; i < vendors.length; i++) {
  for (var j = 0; j < vendorCssProps[i].length; j++){
    var prop = vendorCssProps[i][j]
    vendorProps[prop] ? vendorProps[prop].vendor.push(vendors[i]) : vendorProps[prop] = { vendor: [vendors[i]] }
  }
}
export { vendorProps };
