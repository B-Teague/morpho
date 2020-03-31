//This file is generated from ./util/index.template.js based on browserslist configuration and mdn-browser-compat-data for vendor prefixing
var vendorProps = {}
var vendors = ["-webkit-","-ms-","-moz-","-o-"]
var vendorCssProps = [["kzu","392","16fh","os4","306","u4k","orl","lxe","11wk","13yc","6tb","1ap7","76n","wh1","1cio","82v","14bo","b5r","j16","15tf","u5b","hd8","tcj","18kk","tot","pz1","1cnf","1bj1","bpd","s2v","m6j","12mq","16i8","137t","f88","16pl","pk7","1ch8","1503","16m9","jfz","1b8d","1dqg","a96","6ez","1aoi","1ebr","j71","159a","wsp","fse","23m","bu9","phi","po1","dre","18l3","32i","1c6k","gfm","1dr2","pnb","145o","xkh","xki","11my","qyq","14q","9tc","4sc","rz4","144r","do7","gv4","2r0","fcb","pss","n9p","12gz","iat","13fg","1dbi"],["bu9","fsv","phi","hrh","hri","1zx","7pw","8qg","wbi","szn","iqy","lkj","6dp","1b42","1dbi","1efg","8o4"],["h2h","13fg"],[]]

//Initialization
for (var i = 0; i < vendors.length; i++) {
  for (var j = 0; j < vendorCssProps[i].length; j++){
    var prop = vendorCssProps[i][j]
    vendorProps[prop] ? vendorProps[prop].vendor.push(vendors[i]) : vendorProps[prop] = { vendor: [vendors[i]] }
  }
}
export { vendorProps };
