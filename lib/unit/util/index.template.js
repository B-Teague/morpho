//This file is generated from ./util/index.template.js
var unitProps = {}
var units = {{units}}
var unitCssProps = {{unitCssProps}}


//Initialization
for (var i = 0; i < units.length; i++) {
  for (let prop of unitCssProps[i]) {
    unitProps[prop] = { unit: units[i] }
  }
}

export { unitProps }
