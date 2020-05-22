var unitProps = {}
var units = [
  "", //unitless
  "%",
  "px",
  "em",
  "rem"
]
var unitCssProps = [
  [ //unitless
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
    "stroke-width"
  ],
  [ //percent
    "border"
  ], 
  [ //pixel
    
  ],
  [ //em

  ],
  [ //rem
    "margin",
    "padding"
  ]
]

//Initialization
for (var i = 0; i < units.length; i++) {
  for (var j = 0; j < unitCssProps[i].length; j++) {
    unitProps[unitCssProps[i][j]] = { unit: units[i] }
  }
}

export { unitProps }
