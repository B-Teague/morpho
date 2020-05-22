const bcd = require('mdn-browser-compat-data')
const browserslist = require('browserslist');
const fs = require('fs');

//* Change this query based on your target of supported browsers
const browserQuery = "> 1%, last 2 versions, not dead";

//This maps the name of the browsers in browserslist to the names used by mdn
const browserslistToMdnAlias = {
  "and_chr": "chrome_android",
  "and_ff": "firefox_android",
  "and_qq": "qq_android",
  "and_uc": "uc_android",
  "android": "webview_android",
  "firefox": "firefox",
  "edge": "edge",
  "ie": "ie",
  "opera": "opera",
  "op_mob": "opera_android",
  "chrome": "chrome",
  "safari": "safari",
  "ios_saf": "safari_ios",
  "samsung": "samsunginternet_android"
}

//Create a list of lowest supported versions from browserslist queries
const browsersVersion = browserslist(browserQuery).reduce((result, browser) => {
  const [browserName, versionText] = browser.split(" ");
  const mdnBrowser = browserslistToMdnAlias[browserName];

  //Only add results for mdn listed browsers
  if (mdnBrowser) {
    // Pick the lowest version.  Examples: 'ios_saf 12.2-12.4' or 'ios_saf 13.3'
    const version = versionText.includes("-") ? Number.parseFloat(versionText.split("-")[0]) : Number.parseFloat(versionText);

    if (result[mdnBrowser]) {
      if (version < result[mdnBrowser]) { //Replace current version with lower version
        result[mdnBrowser] = version;
      }
    } else {
      result[mdnBrowser] = version; //New entry
    }
  }

  return result
}, {});

console.log(browsersVersion);
// {
//   chrome_android: 80,
//   firefox_android: 68,
//   ...
// }

cssPrefixes = {};
collisionCheck = {};

//Find all browsers
Object.keys(bcd.css.properties).forEach(property => {

  const current = bcd.css.properties[property]

  //Not all css properties have a __compat entry
  if (current.__compat) {
    const support = current.__compat.support

    // "chrome": {
    //   "version_added": "1",
    //   "vendor": "-webkit-"
    // },
    // or
    // "firefox_android": [
    //   {
    //     "version_added": "4",
    //     "vendor": "-moz-"
    //   },
    //   {
    //     "version_added": "49",
    //     "vendor": "-webkit-"
    //   }
    // ]

    //Loop through all browsers looking for a prefix entry for the current css property
    Object.keys(support).forEach(browser => {

      //Convert all entries to an array
      const prefixVersions = Array.isArray(support[browser]) ? support[browser] : [support[browser]];

      //find the most current version that is <= supported browser version
      const currentEntries = prefixVersions.reduce((entry, version) => {


        //Convert version to number - Some entries have non-numeric characters.  Ex: "<=13.5", true, null
        const version_added = typeof version.version_added === 'string' ? Number.parseFloat(version.version_added.replace(/[^\d.-]/g, '')) : 0.0

        //Pick all current versions >= oldest supported version
        //If no versions found, default to highest version < supported version
        if (version_added >= browsersVersion[browser]) {
          entry.prefixes.push(version)
        } else {
          if (version_added > entry.maxEntry.version_added) {
            entry.maxEntry = {
              version_added: version_added, //save numeric only value
              prefix: version.prefix
            }
          }
        }

        return entry;
      }, { maxEntry: { version_added: 0, prefix: undefined }, prefixes: [] });

      //If prefixes array is empty, then use maxEntry
      if (currentEntries.prefixes.length === 0) {
        currentEntries.prefixes.push(currentEntries.maxEntry);
      }

      currentEntries.prefixes.forEach((currentEntry) => {
        //Only add entries that have a prefix
        if (currentEntry.prefix) {
          if (cssPrefixes[property]) {
            if (!cssPrefixes[property].vendor.includes(currentEntry.prefix)) {
              cssPrefixes[property].vendor.push(currentEntry.prefix); //Append prefix value if not already exists
            }
          } else {
            cssPrefixes[property] = {
              vendor: [currentEntry.prefix]
            }; //New prefix value
          }
        }
      })
    })

  } else {
    //Not sure what to do here yet.
    // The css property align-content does not have a direct __compat property.
    // The css property align-items does not have a direct __compat property. 
    // The css property align-self does not have a direct __compat property.  
    // The css property break-after does not have a direct __compat property. 
    // The css property break-before does not have a direct __compat property.
    // The css property break-inside does not have a direct __compat property.
    // The css property column-gap does not have a direct __compat property.  
    // The css property gap does not have a direct __compat property.
    // The css property justify-content does not have a direct __compat property.
    // The css property justify-items does not have a direct __compat property.  
    // The css property justify-self does not have a direct __compat property. 
    // The css property place-content does not have a direct __compat property.  
    // The css property place-items does not have a direct __compat property. 
    // The css property place-self does not have a direct __compat property.
    // The css property row-gap does not have a direct __compat property.
  }
})

var vendors = ["-webkit-", "-ms-", "-moz-", "-o-"]
var vendorCssProps = [[], [], [], []]

Object.keys(cssPrefixes).forEach((prop) => {
  cssPrefixes[prop].vendor.forEach((prefix) => {
    vendorCssProps[vendors.indexOf(prefix)].push(prop);
  })
})

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


var index = fs.readFileSync('./util/index.template.js', 'utf-8')

index = index.replace("{{vendors}}", JSON.stringify(vendors, (v, k) => {return k}, 2))
index = index.replace("{{vendorCssProps}}", JSON.stringify(vendorCssProps, (v, k) => {return k}, 2))

fs.writeFileSync('./src/index.js', index);
