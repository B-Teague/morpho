import 'jsdom-global/register.js'
import test from 'ava'
import morpho from "../src/morpho-core/index.js"
import { vendorProps } from "../src/vendor/index.js"

const options = {
  cssProps: vendorProps
}
const { css } = morpho(options);

test('Create a class that adds a vendor prefix', t => {
  css({ transition: ["width", "2s"] });
	t.deepEqual(
    document.styleSheets[0].cssRules.map((rule) => rule.cssText)[0],
    ".morpho-mk4wc7 {-webkit-transition: width 2s; transition: width 2s;}"
  );
});