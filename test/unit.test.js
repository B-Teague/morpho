import 'jsdom-global/register'

import { equal } from "testmatrix"

import morpho from "../src/index"
import {unitProps} from "../src/unit/index"

const { css } = morpho({cssProps: unitProps});

export default {
  morpho: [
    { //#1
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: (() => {
        css({ margin: 5 })
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".morpho-nnbflx {margin: 5rem;}"
    }
  ]
}
