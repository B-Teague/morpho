//This file is generated from ./util/index.template.js
var unitProps = {}
var units = {{units}}
var unitCssProps = {{unitCssProps}}

//Initialization
for (var i = 0; i < units.length; i++) {
  for (var j = 0; j < unitCssProps[i].length; j++) {
    unitProps[unitCssProps[i][j]] = { unit: units[i] }
  }
}

export { unitProps }
