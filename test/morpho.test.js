import 'jsdom-global/register'

import { equal, deepEqual } from "testmatrix"

import morpho from '../src/index'

const options = {
  unit: "%",
  cssProps: {
    "border-right-width": {
      "vendor": ["-o-"],
      "unit": "em"
    },
    "height": {
      "unit": "em"
    }
  }
}


const { css, keyframes } = morpho(options);
const m2 = morpho();

export default {
  morpho: [
    { //#1
      name: "Create a class using the css function without prefix option",
      assert: equal,
      actual: (() => {
        css({ backgroundColor: "red" })
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".morpho-mk4wc7 {background-color: red;}"
    },
    { //#2
      name: "insert vendor prefix",
      assert: equal,
      actual: (() => {
        css({
          borderRightWidth: "10px"
        })
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".morpho-dat4zz {-o-border-right-width: 10px; border-right-width: 10px;}"
    },
    { //#3
      name: "Create a unique keyframes name to be used by a css class",
      assert: equal,
      actual: (() => {
        keyframes({
          from: {
            transform: 'scale(2)'
          },
          to: {
            transform: 'scale(4)'
          },
        })
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: "@keyframes morpho-o5wy39 { \n  from {transform: scale(2);} \n  to {transform: scale(4);} \n}"
    },
    { //#4
      name: "create a media query",
      assert: deepEqual,
      actual: (() => {
        css({
          fontSize: "10px",
          "@media (max-width: 450px)": {
            fontSize: "32px",
            h1: {
              color: "yellow"
            }
          }
        });
        return [
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[1],
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
        ]
      })(),
      expected: [
        "@media (max-width: 450px) {.morpho-3kd75a h1 {color: yellow;}.morpho-3kd75a {font-size: 32px;}}",
        ".morpho-3kd75a {font-size: 10px;}"
      ]
    },
    { //#5
      name: "Add props to internal cssProps object",
      assert: equal,
      actual: (() => {
        css({
          borderRadius: 10,
        });
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".morpho-pryrtz {border-radius: 10%;}"
    },
    { //#6
      name: "pseudo selector",
      assert: equal,
      actual: (() => {
        css({
          "&:hover": {
            color: "red"
          }
        })
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]

      })(),
      expected: ".morpho-1l80iw9:hover {color: red;}"
    },
    { //#7
      name: "repeat a css property multiple times using an array of values",
      assert: equal,
      actual: (() => {
        css({
          position: [["fixed"], ["sticky"]]
        })
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0];
      })(),
      expected: ".morpho-v61bi1 {position: sticky;}" //! Both occurrences of position were inserted, but the browser only selects the last successful match
    },
    { //#8
      name: "List of values",
      assert: deepEqual,
      actual: (() => {
        css({
          "transition": ["width", "2s"]
        })
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]

      })(),
      expected: ".morpho-ufznj {transition: width 2s;}"
    },
    { //#9
      name: "Test morph without options parm",
      assert: deepEqual,
      actual: (() => {
        m2.css({
          color: "orange"
        })
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]

      })(),
      expected: ".morpho-xteix3 {color: orange;}"
    }
  ]
}
