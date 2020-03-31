import 'jsdom-global/register'

import { equal } from "testmatrix"

import morpho from "../../../src/index"
import { vendorProps } from "../src/index"

const { css } = morpho({ vendorProps });

export default {
  morpho: [
    { //#1
      name: "Create a class that adds a vendor prefix",
      assert: equal,
      actual: (() => {
        css({ transition: ["width", "2s"] })
        return document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
      })(),
      expected: ".morpho-nnbflx {-webkit-transition: width 2s; transition: width 2s;}"
    }
  ]
}
