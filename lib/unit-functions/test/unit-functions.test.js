import 'jsdom-global/register'

import { equal } from "testmatrix"

import { em, ex, cap, ic, prct, lh, px, cm, mm, inch, pt, pc, ch, rem, vh, vw, vmin, vmax } from "../src/index"

export default {
  "unit-functions": [
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: em(5),
      expected: "5em"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: ex(5),
      expected: "5ex"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: cap(5),
      expected: "5cap"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: ic(5),
      expected: "5ic"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: prct(5),
      expected: "5%"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: lh(5),
      expected: "5lh"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: px(5),
      expected: "5px"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: cm(5),
      expected: "5cm"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: mm(5),
      expected: "5mm"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: inch(5),
      expected: "5in"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: pt(5),
      expected: "5pt"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: pc(5),
      expected: "5pc"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: ch(5),
      expected: "5ch"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: rem(5),
      expected: "5rem"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: vh(5),
      expected: "5vh"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: vw(5),
      expected: "5vw"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: vmin(5),
      expected: "5vmin"
    },
    { 
      name: "Create a class that adds a unit suffix",
      assert: equal,
      actual: vmax(5),
      expected: "5vmax"
    }    
  ]
}
