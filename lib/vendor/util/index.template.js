//This file is generated from ./util/index.template.js based on browserslist configuration and mdn-browser-compat-data for vendor prefixing
var cssProps = {}
var vendors = {{vendors}}
var vendorCssProps = {{vendorCssProps}}

export default function () {
  //Initialization
  for (var i = 0; i < vendors.length; i++) {
    for (let prop of vendorCssProps[i]) {
      cssProps[prop] ? cssProps[prop].vendor.push(vendors[i]) : cssProps[prop] = { vendor: [vendors[i]] }
    }
  }
  return cssProps;
}
