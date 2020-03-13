import 'jsdom-global/register'
import { h } from "hyperapp"
import { equal, deepEqual } from "testmatrix"

import nanostyle from ".."

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

const { styled, css, keyframes } = nanostyle(h);
const n2 = nanostyle(h, options);

const unstyled = (props) => {
  return h("div", { class: props.class }, props.children)
}

export default {
  nanostyle: [
    { //#1
      name: "Create a class using the css function without prefix option",
      assert: equal,
      actual: (() => {
        css({ backgroundColor: "red" })
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".nano-nnbflx {background-color: red;}"
    },
    { //#2
      name: "Create a styled component",
      assert: equal,
      actual: (() => {
        styled("div", {
          backgroundColor: "blue"
        })()
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".nano-nh5zfc {background-color: blue;}"
    },
    { //#3
      name: "insert vendor prefix",
      assert: equal,
      actual: (() => {
        styled("div", {
          boxDirection: "normal"
        })()
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".nano-en4vga {-webkit-box-direction: normal; box-direction: normal;}"
    },
    { //#4
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
      expected: "@keyframes nano-o2rq5t { \n  from {-webkit-transform: scale(2); transform: scale(2);} \n  to {-webkit-transform: scale(4); transform: scale(4);} \n}"
    },
    { //#5
      name: "create a media query",
      assert: deepEqual,
      actual: (() => {
        styled("div", {
          fontSize: "10px",
          "@media (max-width: 450px)": {
            fontSize: "32px",
            h1: {
              color: "yellow"
            }
          }
        })()
        return [
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[1],
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
        ]
      })(),
      expected: [
        "@media (max-width: 450px) {.nano-yi32xy h1 {color: yellow;}.nano-yi32xy {font-size: 32px;}}",
        ".nano-yi32xy {font-size: 10px;}"
      ]
    },
    { //#6
      name: "style an unstyled component",
      assert: equal,
      actual: (() => {
        styled(unstyled, {
          backgroundColor: "orange"
        })()
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0];
      })(),
      expected: ".nano-6oi6pv {background-color: orange;}"
    },
    { //#7
      name: "repeat a css property multiple times using an array of values",
      assert: equal,
      actual: (() => {
        styled(unstyled, {
          position: [["fixed"], ["sticky"]]
        })()
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0];
      })(),
      expected: ".nano-b34ut1 {position: sticky;}" //! Both occurrences of position were inserted, but the browser only selects the last successful match
    },
    { //#8
      name: "extend a styled component",
      assert: deepEqual,
      actual: (() => {
        const Button = styled("div", {
          color: "red",
          fontSize: "43px"
        })
        const BlueButton = styled(Button, {
          color: "blue"
        })
        return BlueButton();
      })(),
      expected: {
        "name": "div",
        "props": {
          "class": "nano-ber9to nano-ppbal9"
        },
        "children": [],
        node: undefined,
        type: undefined,
        key: undefined
      }
    },
    { //#9
      name: "dynamically set value from props",
      assert: deepEqual,
      actual: (() => {
        const Button = styled("div", props => ({
          color: props.myColor || "green",
          fontSize: "5px"
        }))
        Button({ myColor: "orange" });
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".nano-qbjka {color: orange; font-size: 5px;}"
    },
    { //#10
      name: "pseudo selector",
      assert: deepEqual,
      actual: (() => {
        const Link = styled("div", {
          color: "blue",
          "&:hover": {
            color: "red"
          }
        })
        Link();
        return [
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[1],
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
        ]

      })(),
      expected: [
        ".nano-5tqubj:hover {color: red;}",
        ".nano-5tqubj {color: blue;}"
      ]
    },
    { //#11
      name: "descendant combinator",
      assert: deepEqual,
      actual: (() => {
        const Fancy = styled("div", {
          fontSize: "91em",
          ".someParentClass &": {
            border: "3px"
          }
        })
        Fancy();
        return [
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[1],
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
        ]

      })(),
      expected: [
        ".someParentClass .nano-dd0dfr {border: 3px;}",
        ".nano-dd0dfr {font-size: 91em;}"
      ]
    },
    { //#12
      name: "Adjacent sibling combinator",
      assert: deepEqual,
      actual: (() => {
        const Fancy = styled("div", {
          color: "#123456",
          "& + &": {
            color: "#32AB71"
          }
        })
        Fancy();
        return [
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[1],
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
        ]

      })(),
      expected: [
        ".nano-ra155c + .nano-ra155c {color: #32AB71;}",
        ".nano-ra155c {color: #123456;}"
      ]
    },
    { //#13
      name: "List of values",
      assert: deepEqual,
      actual: (() => {
        const Fancy = styled("div", {
          "transition": ["width", "2s"]
        })
        Fancy();
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]

      })(),
      expected: ".nano-ta4jzb {-webkit-transition: width 2s; transition: width 2s;}"
    },
    { //#14
      name: "Default units for numeric values",
      assert: deepEqual,
      actual: (() => {
        const Fancy = styled("div", {
          "width": 5,
          "columns": 10
        })
        Fancy();
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]

      })(),
      expected: ".nano-7nkqy1 {width: 5%; -webkit-columns: 10; columns: 10;}"
    },
    { //#15
      name: "Triple nested content",
      assert: deepEqual,
      actual: (() => {
        const Fancy = styled("div", {
          "width": 5,
          "h1 &": {
            color: "orange",
            "tag": {
              fontSize: "21px",
              "& h2": {
                border: "5px"
              }
            }
          }
        })
        Fancy();
        return [
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[3],
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[2],
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[1],
          document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
        ]

      })(),
      expected: [
        "h1 .nano-dx8a25 tag .nano-dx8a25 h2 {border: 5px;}",
        "h1 .nano-dx8a25 tag {font-size: 21px;}",
        "h1 .nano-dx8a25 {color: orange;}",
        ".nano-dx8a25 {width: 5%;}"
      ]
    },
    { //#16
      name: "Custom decl prefixes and unit defaults",
      assert: equal,
      actual: (() => {
        const Fancy = n2.styled("div", {
          borderRightWidth: 5
        },"meaningfulName")
        Fancy();
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]

      })(),
      expected: ".meaningfulName-6lokp7 {-o-border-right-width: 5em; border-right-width: 5em;}"
    },
    { //#17
      name: "Create a class using the css function with prefix option",
      assert: equal,
      actual: (() => {
        css({ backgroundColor: "pink" }, "customClassPrefix");
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".customClassPrefix-4e723a {background-color: pink;}"
    },
    { //#18
      name: "Custom default units, but no custom default vendor prefix",
      assert: equal,
      actual: (() => {
        const Fancy = n2.styled("div", {
          height: 5
        })
        Fancy();
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]

      })(),
      expected: ".nano-sk08h6 {height: 5em;}"
    },
  ]
}
