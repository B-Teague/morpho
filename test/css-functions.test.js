import 'jsdom-global/register'

import { deepEqual } from "testmatrix"

import { calc, rgb, rgba, rotate, attr, cubicBezier, hsl, hsla, linearGradient, radialGradient, repeatingLinearGradient, repeatingRadialGradient, variable } from "../src/css-functions/index"

export default {
  morpho: [
    {
      name: "Create a class that adds a unit suffix",
      assert: deepEqual,
      actual: calc(3, "/", 4),
      expected: ["calc(", 3, "/", 4, ")"]
    },
    {
      name: "Create a class that adds a unit suffix",
      assert: deepEqual,
      actual: rotate(90),
      expected: ["rotate(", "90deg", ")"]
    },
    {
      name: "Create a class that adds a unit suffix",
      assert: deepEqual,
      actual: cubicBezier(0.1, 0.7, 1.0, 0.1),
      expected: ["cubic-bezier(", "0.1", ",", "0.7", ",", "1", ",", "0.1", ")"]
    }
    
  ]
}
