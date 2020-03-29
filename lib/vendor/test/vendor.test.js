import 'jsdom-global/register'
import { h } from "hyperapp"
import preact from 'preact';

// // Create your app
// const app = preact.h('h1', null, 'Hello World!');

// render(app, document.body);

import { equal, deepEqual } from "testmatrix"

import morpho from ".."

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


const { styled, css, keyframes } = morpho(h, {childParam: true});
const n2 = morpho(h, options);
const morphoPreact = morpho(preact.h);

const unstyled = (props) => {
  return h("div", { class: props.class }, props.children)
}

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
      name: "Create a styled component",
      assert: equal,
      actual: (() => {
        styled("div", {
          backgroundColor: "blue"
        })()
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".morpho-nh5zfc {background-color: blue;}"
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
      expected: ".morpho-en4vga {-webkit-box-direction: normal; box-direction: normal;}"
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
      expected: "@keyframes morpho-o2rq5t { \n  from {-webkit-transform: scale(2); transform: scale(2);} \n  to {-webkit-transform: scale(4); transform: scale(4);} \n}"
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
        "@media (max-width: 450px) {.morpho-yi32xy h1 {color: yellow;}.morpho-yi32xy {font-size: 32px;}}",
        ".morpho-yi32xy {font-size: 10px;}"
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
      expected: ".morpho-6oi6pv {background-color: orange;}"
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
      expected: ".morpho-b34ut1 {position: sticky;}" //! Both occurrences of position were inserted, but the browser only selects the last successful match
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
          "class": "morpho-ber9to morpho-ppbal9"
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
      expected: ".morpho-qbjka {color: orange; font-size: 5px;}"
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
        ".morpho-5tqubj:hover {color: red;}",
        ".morpho-5tqubj {color: blue;}"
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
        ".someParentClass .morpho-dd0dfr {border: 3px;}",
        ".morpho-dd0dfr {font-size: 91em;}"
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
        ".morpho-ra155c + .morpho-ra155c {color: #32AB71;}",
        ".morpho-ra155c {color: #123456;}"
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
      expected: ".morpho-ta4jzb {-webkit-transition: width 2s; transition: width 2s;}"
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
      expected: ".morpho-7nkqy1 {width: 5%; -webkit-columns: 10; columns: 10;}"
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
        "h1 .morpho-dx8a25 tag .morpho-dx8a25 h2 {border: 5px;}",
        "h1 .morpho-dx8a25 tag {font-size: 21px;}",
        "h1 .morpho-dx8a25 {color: orange;}",
        ".morpho-dx8a25 {width: 5%;}"
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
      expected: ".morpho-sk08h6 {height: 5em;}"
    },
    { //#19
      name: "Pass children through props.children",
      assert: equal,
      actual: (() => {
        const FancyBorder = morphoPreact.styled("div", {
          borderRadius: 5
        })
        return JSON.stringify(FancyBorder({children: "A child string"}))

      })(),
      expected: JSON.stringify({
        "type":"div",
        "props":{
          "children":"A child string",
          "class":"morpho-1gn34l"
        },
        "__k":null,
        "__":null,
        "__b":0,
        "__e":null,
        "__c":null
      })
    },
  ]
}
