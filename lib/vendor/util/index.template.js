//This file is generated from ./util/index.template.js based on browserslist configuration and mdn-browser-compat-data for vendor prefixing
var vendorProps = {}
var vendors = {{vendors}}
var vendorCssProps = {{vendorCssProps}}

//Initialization
for (var i = 0; i < vendors.length; i++) {
  for (var j = 0; j < vendorCssProps[i].length; j++){
    var prop = vendorCssProps[i][j]
    vendorProps[prop] ? vendorProps[prop].vendor.push(vendors[i]) : vendorProps[prop] = { vendor: [vendors[i]] }
  }
}
export { vendorProps };
