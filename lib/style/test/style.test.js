import 'jsdom-global/register'

import { equal, deepEqual } from "testmatrix"
import { h } from "hyperapp"

import morpho from "../../core/src/index"
const { css } = morpho();
import style from "../src/index" //export var styled = .....
const { styled } = style(css, h)
const styledWithChildren = style(css, h, { childParam: true })


export default {
  morpho: [
    { //#1
      name: "Create a styled component",
      assert: equal,
      actual: (() => {
        styled("div", { border: 5 })()
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".morpho-nnbflx {border: 5px;}"
    },
    { //#2
      name: "Create a styled component with dynamic prop values",
      assert: equal,
      actual: (() => {
        styled("div", props => ({ border: props.value || 0 }))({ value: 10 })
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".morpho-nh5zfc {border: 10px;}"
    },
    { //#3
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
          "class": "morpho-en4vga morpho-nnbflx"
        },
        "children": [],
        node: undefined,
        type: undefined,
        key: undefined
      }
    },
    { //#5
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
          "class": "morpho-en4vga"
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
