import 'jsdom-global/register'

import { equal, deepEqual } from "testmatrix"
import { h } from "hyperapp"

import morpho from "../src/index"

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


const { css, keyframes, styled } = morpho(h, options);
const m2 = morpho();
const styledWithChildren = morpho(h, { childParam: true })

export default {
  morpho: [
    { //#1
      name: "Create a class using the css function without prefix option",
      assert: equal,
      actual: (() => {
        css({ backgroundColor: "red" })
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".morpho-nnbflx {background-color: red;}"
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
      expected: ".morpho-nh5zfc {-o-border-right-width: 10px; border-right-width: 10px;}"
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
      expected: "@keyframes morpho-en4vga { \n  from {-webkit-transform: scale(2); transform: scale(2);} \n  to {-webkit-transform: scale(4); transform: scale(4);} \n}"
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
        "@media (max-width: 450px) {.morpho-o2rq5t h1 {color: yellow;}.morpho-o2rq5t {font-size: 32px;}}",
        ".morpho-o2rq5t {font-size: 10px;}"
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
      expected: ".morpho-yi32xy {-webkit-border-radius: 10%; border-radius: 10%;}"
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
      expected: ".morpho-6oi6pv:hover {color: red;}"
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
      expected: ".morpho-b34ut1 {position: sticky;}" //! Both occurrences of position were inserted, but the browser only selects the last successful match
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
      expected: ".morpho-ber9to {-webkit-transition: width 2s; transition: width 2s;}"
    },
    { //#9
      name: "Test morph without options parm (uses new styleSheets)",
      assert: deepEqual,
      actual: (() => {
        m2.css({
          color: "orange"
        })
        return document.styleSheets[1].cssRules.map((rule) => rule.cssText)[0]

      })(),
      expected: ".morpho-nnbflx {color: orange;}"
    },
    { //#10
      name: "Create a styled component",
      assert: equal,
      actual: (() => {
        styled("div", { border: 5 })()
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".morpho-ppbal9 {border: 5px;}"
    },
    { //#11
      name: "Create a styled component with dynamic prop values",
      assert: equal,
      actual: (() => {
        styled("div", props => ({ border: props.value || 0 }))({ value: 10 })
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".morpho-qbjka {border: 10px;}"
    },
    { //#12
      name: "Extend a styled component",
      assert: deepEqual,
      actual: (() => {
        var a = styled("div", { border: 5 })
        var extended = styled(a, { color: "blue" })
        return extended()
      })(),
      expected: {
        "name": "div",
        "props": {
          "class": "morpho-5tqubj morpho-ppbal9"
        },
        "children": [],
        node: undefined,
        type: undefined,
        key: undefined
      }
    },
    { //#13
      name: "Pass children to a styled component",
      assert: deepEqual,
      actual: (() => {
        var Component = styledWithChildren.styled("div", { color: "blue" })
        return Component({}, [
          h("p", {}, "Some text from a child paragraph")
        ])
      })(),
      expected: {
        "name": "div",
        "props": {
          "class": "morpho-nnbflx"
        },
        "children": [
          {
            "name": "p",
            "props": {},
            "children": [
              {
                "name": "Some text from a child paragraph",
                "props": {},
                "children": [],
                "type": 3,
                node: undefined,
                key: undefined
              }
            ],
            node: undefined,
            type: undefined,
            key: undefined
          }
        ],
        node: undefined,
        type: undefined,
        key: undefined
      }
    }
  ]
}
