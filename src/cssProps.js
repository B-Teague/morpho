//This file is generated from "./util/createCssPropMap.js"
//Supported browser versions and vendor prefixes are based on data 
//from npm packages browserslist and mdn-browser-compat-data
var vendors = ["-webkit-","-ms-","-moz-","-o-"]
var vendorCssProps = [["kzu","392","16fh","os4","306","u4k","orl","lxe","11wk","13yc","6tb","1ap7","76n","wh1","1cio","82v","14bo","b5r","j16","15tf","u5b","hd8","tcj","18kk","tot","pz1","1cnf","1bj1","bpd","s2v","m6j","12mq","16i8","137t","f88","16pl","pk7","1ch8","1503","16m9","jfz","1b8d","1dqg","a96","6ez","1aoi","1ebr","j71","159a","wsp","fse","23m","bu9","phi","po1","dre","18l3","32i","1c6k","gfm","1dr2","pnb","145o","xkh","xki","11my","qyq","14q","9tc","4sc","rz4","144r","do7","gv4","2r0","fcb","pss","n9p","12gz","iat","13fg","1dbi"],["bu9","fsv","phi","hrh","hri","1zx","7pw","8qg","wbi","szn","iqy","lkj","6dp","1b42","1dbi","1efg","8o4"],["h2h","13fg"],[]]
var unitlessCssProps = ["306","r5z","b5r","783","1cnf","pz1","bpd","f88","1b8d","wsp","1ebr","x3x","j71","795","3fu","l84","yoj","90x","kj8","f5k","124d","18d7","18yy","rqa","fs6","1cde","dkg","12yj","1dr2","12gb","h2h","rax","1tr","yxv","935","14a4","x4w","15s2","13nu","17q3","t7a","19n5"]

//!!! WARNING !!!
//This hash function may cause collision with future css property names
//This library requires a perfect hash function for vendor prefixing to work correctly.
//This file will fail to generate from createCssPropMap.js if a collision is detected.
var h = new Uint16Array(1)
function hashCssProp(prop) {
  h[0] = 0;
  for (var i = 0; i < prop.length; i++) {
    h[0] = ((h[0] << 4) - h[0]) + prop.charCodeAt(i);
  }
  return h[0].toString(36);
}

//Initialize the cssProps object which is used for fetching vendor prefixes 
//and default numerical unit ("px") using a hashed css property name
var cssProps = {}
for (var i = 0; i < vendors.length; i++) {
  for (let prop of vendorCssProps[i]) {
    cssProps[prop] ? cssProps[prop].vendor.push(vendors[i]) : cssProps[prop] = { vendor: [vendors[i]] }
  }
}

for (let prop of unitlessCssProps) {
  cssProps[prop] ? cssProps[prop].unit = "" : cssProps[prop] = { unit: "" }
}

export {hashCssProp, cssProps}