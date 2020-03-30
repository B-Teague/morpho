const fs = require('fs');

//!!! WARNING !!!
//This hash function may cause collision with future css property names
//A different hash function will need to be replaced here and in index.js to create a perfect hash
var n = new Uint16Array(1)
function hashCssProp(prop) {
  n[0] = 0;
  for (var i = 0; i < prop.length; i++) {
    n[0] = ((n[0] << 4) - n[0]) + prop.charCodeAt(i);
  }
  return n[0].toString(36);
}

var units = ["", "%", "px", "em"]
const unitCssPropsNames = [[ //Props that do not use a unit
  "animation-iteration-count",
  "border-image-outset",
  "border-image-slice",
  "border-image-width",
  "box-flex",
  "box-flex-group",
  "box-ordinal-group",
  "column-count",
  "columns",
  "flex",
  "flex-grow",
  "flex-positive",
  "flex-shrink",
  "flex-negative",
  "flex-order",
  "grid-area",
  "grid-row",
  "grid-row-end",
  "grid-row-span",
  "grid-row-start",
  "grid-column",
  "grid-column-end",
  "grid-column-span",
  "grid-column-start",
  "font-weight",
  "line-clamp",
  "line-height",
  "opacity",
  "order",
  "orphans",
  "tab-size",
  "widows",
  "z-index",
  "zoom",
  "fill-opacity",
  "flood-opacity",
  "stop-opacity",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
], [ //Props that should use '%' by default

], [ //Props that should use 'px' by default
  "border"
], [ //Props that should use 'em' by default

]];

var unitCssProps = unitCssPropsNames.map(unitArray => unitArray.map(prop => hashCssProp(prop)));

let index = fs.readFileSync('./util/index.template.js', 'utf-8')

index = index.replace("{{units}}", JSON.stringify(units, (v, k) => {return k}))
index = index.replace("{{unitCssProps}}", JSON.stringify(unitCssProps, (v, k) => {return k}))

fs.writeFileSync('./src/index.js', index);
