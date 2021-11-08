import 'jsdom-global/register.js'
import test from 'ava'
import morpho from '../src/morpho-core/index.js'

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

test("Create a class using the css function without prefix option", t => {
    css({ backgroundColor: "red" })
    t.deepEqual(
        document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0],
        ".morpho-mk4wc7 {background-color: red;}"
    )
})

test("insert vendor prefix", t => {
    css({
        borderRightWidth: "10px"
    })
    t.deepEqual(
        document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0],
        ".morpho-dat4zz {-o-border-right-width: 10px; border-right-width: 10px;}"
    )
})

test("Create a unique keyframes name to be used by a css class", t => {
    keyframes({
        from: {
        transform: 'scale(2)'
        },
        to: {
        transform: 'scale(4)'
        },
    })
    t.deepEqual(
        document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0],
        "@keyframes morpho-o5wy39 { \n  from {transform: scale(2);} \n  to {transform: scale(4);} \n}"
    )
})

test("create a media query", t => {
    css({
        fontSize: "10px",
        "@media (max-width: 450px)": {
        fontSize: "32px",
        h1: {
            color: "yellow"
        }
        }
    });
    t.deepEqual([
            document.styleSheets[0].cssRules.map((rule) => rule.cssText)[1],
            document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0]
        ],
        [
            "@media (max-width: 450px) {.morpho-3kd75a h1 {color: yellow;}.morpho-3kd75a {font-size: 32px;}}",
            ".morpho-3kd75a {font-size: 10px;}"
        ]
    )
})

test("Add props to internal cssProps object", t => {
    css({
          borderRadius: 10,
        });
    t.deepEqual(
        document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0],
        ".morpho-pryrtz {border-radius: 10%;}"
    )
})

test("pseudo selector", t => {
    css({
        "&:hover": {
        color: "red"
        }
    })
    t.deepEqual(
        document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0],
        ".morpho-1l80iw9:hover {color: red;}"
    )
})

test("repeat a css property multiple times using an array of values", t => {
    css({
        position: [["fixed"], ["sticky"]]
    })
    t.deepEqual(
        document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0],
        ".morpho-v61bi1 {position: sticky;}" //! Both occurrences of position were inserted, but the browser only selects the last successful match
    )
})

test("List of values", t => {
    css({
        "transition": ["width", "2s"]
    })
    t.deepEqual(
        document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0],
        ".morpho-ufznj {transition: width 2s;}"
    )
})

test("Test morph without options parm", t => {
    m2.css({
        color: "orange"
    })
    t.deepEqual(
        document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0],
        ".morpho-xteix3 {color: orange;}"
    )
})
