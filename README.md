<p align="center">
  <img width="200" height="200" src="./assets/Morpho.png">
</p>

# <center>Morpho</center>
**<center>Small and beautiful CSS-in-JS library</center>**

## Features

* **Tiny**
  * morpho - 3kb
* **Framework Agnostic** - use with Hyperapp, React, Vue, Angular or anything that has a class attribute
* **Uniquely scoped class names:** ```.morpho-nnbflx```
* **Custom css class name prefixing:** ```.article-header-xj38d```
* **Custom default numerical units:** ```5 -> 5em```
* **Vendor Prefixing** ```{-webkit-box-direction: normal; box-direction: normal;}```
* **List values:** ```[width, 2] -> transition: width 2s;```
* **@media queries** ```@media (max-width: 450px){}```
* **@keyframes** ```@keyframes morpho-nnbflx {}```
* **Nesting** ```.morpho-dx8a25 {} h1 .morpho-dx8a25 {}```
* **Dynamic Prop values** ```props => ({color: props.color})```
* **Pseudo Selectors and elements** ```.morpho-5tqubj:hover {}```
* **Combinators** ```.morpho-ra155c + .morpho-ra155c {}```
* **Styled Components** ```styled("div", {
    borderRadius: "5px"
  })```
  * Style Unstyled Components ```styled(Button, {
  color: "tomato"
})```
  * Extend Styled Components ```styled(GreenButton, {
      fontSize: 10
    })```

## Setup

Install morpho library

```sh
npm i morpho
```

With a module bundler like Rollup or Webpack, import morpho into your application

```js
import morpho from "morpho"
```

If a bundler is not being used, morpho can be imported in a &lt;script&gt; tag as a module.

```html
<script type="module">
  import morpho from "https://unpkg.com/morpho@0.1.2/src/index.js"
</script>
```

## Getting Started

```js
const options = {} //See options below

const { css, keyframes, styled } = morpho(h, options); 
//h is only required for styled components

const generatedClassName = css({
  color: "blue"
})

//Hyperapp
const Component = (props, children) => {
  return h("div", {class: generatedClassName}, children)
}

//React
const Component = (props) => {
  return <div className={generatedClassName}>Hello World</div>
}

//Vue
<div v-bind:class="[activeClass]"></div>
data: {
  activeClass: generatedClassName,
}

//Angular
<div [ngClass]="{[generatedClassName]: true}">
```

## Options

```js
{
  classProp: "class",
  childParam: true,
  unit: "em",
  cssProps: {
    border: {
      vendor: ["-webkit-", "-moz-"],
      unit: "%"
    }
  }
}
```

* *classProp* - Only applies when using the ```@morpho/style``` library.  Use this to specify the name of the property that represents a css class.  For example, React uses the property name ```"className"```.  Default value is ```"class"```.
  
* *childParam* - Only applies when using the ```@morpho/style``` library.  This determines how the children property will be used.  For example, Hyperapp uses the function signature ```(props, children)``` while React uses the function signature ```(props)``` and children is accessed through ```props.children```.  Set this value to ```true``` for the ```(props, children)``` Component signature.  Default value is ```false```.
  
* *unit* - This option is used to specify the global default numerical unit.  Examples include: ```"%", "rem", or "px"```.  Default value is ```"px"```. **TODO** - Set several different default units based on [CSS Best Practices](https://gist.github.com/basham/2175a16ab7c60ce8e001)

* *cssProps* - Use this option to fully customize how each css property will apply vendor prefixing or default numerical values.  For example, if you want the css property ```transition``` to use the ```"-webkit-"``` prefix and a default unit in milliseconds ```"ms"```,  you would initialize this option to:

  ```js
  cssProps: {
    transition: {
      vendor: ["-webkit-"], //Accepts and applies a list of vendor prefixes
      unit: "ms" //Appends a unit to a numerical value.  Ex: 5 -> 5ms
    }
  }
  ```

  Note: cssProps will override default vendor and unit settings


* ## **Uniquely scoped class names**
  
  ```css
  .morpho-nnbflx
  ```

* ## **Styled components**

  * For any framework that supports JSX or exposes an h() function, you can use the ```@morpho/style``` library to create styled components
  
  ```js
  import { morpho } from "morpho"
  const { css, keyframes, styled } = morpho(h, options);
  //styled requires a JSX h function
  
  const Button = styled("div", {
    margin: "1em",
    padding: "0.25em 1em",
    borderRadius: 3 //defaults to global unit "px"
  });
  ```

* ## **Vendor Prefixing**
   * If you wish to support vendor prefixing, you can use the ```@morpho/vendor``` library which has a predefined list of css properties based on data from ```browserlist``` and ```mdn-browser-compat-data```
  
  ```js
  import { morpho } from "morpho"

  const { css, keyframes } = morpho();

  const vendorClassName = css({
    boxDirection: "normal"
  })
  ```

  ```css
  .morpho-en4vga {
    -webkit-box-direction: normal;
    box-direction: normal;
  }
  ```

* ## **Custom default units**
  * If you want ```morpho``` to default numerical values with unit, you can use the predefined list from ```@morpho\unit```. *Note - This list currently only contains css properties that are unitless.  The global default will append "px".  Todo - Add additional default units to several css properties based on [CSS Best Practices](https://gist.github.com/basham/2175a16ab7c60ce8e001)*
  
  ```js
  import { morpho } from "morpho"

  const { css, keyframes } = morpho();

  const vendorClassName = css({
    border: 5
  })
  ```

   ```css
  .morpho-en4vga {
    border: 5px;
  }
  ```

* ## **Extend a component**
  
  ```js
  const GreenButton = styled(Button, {
    color: "tomato",
  });
  ```

* ## **Style an unstyled component**
  
  ```js
  const Button = (props) => h("div", {class: props.class}, props.children);

  const OrangeButton styled(Button, {
    backgroundColor: "orange"
  })
  ```

* ## **Custom class name prefixing**

  ```js
  const Fancy = styled("div", {
      borderRightWidth: 5
  },"article-header")

  const className = css({borderRightWidth: 5}, "article-header")
  ```

  ```css
  .article-header-nnbflx
  ```

* ## **Media queries**
  
  ```js
  css({
    "@media (max-width: 450px)": {
      fontSize: "32px"
    }
  })
  ```

  ```css
  @media (max-width: 450px) {
    .morpho-o2rq5t {font-size: 32px;}
  }
  ```

* ## **Keyframes**

  ```js
  keyframes({
    from: {
      transform: 'scale(2)'
    },
    to: {
      transform: 'scale(4)'
    },
  })
  ```

  ```css
  @keyframes morpho-nnbflx {
    from {
      transform: scale(2);
    }

    to {
      transform: scale(4);
    }
  }
  ```

* ## **Numeric values**
  
  ```js
  const Fancy = styled("div", {
    width: 5,
    columns: 10
  })
  ```

  ```css
  .morpho-o2rq5t {
    width: 5px;
    columns: 10px;
  }
  ```

* ## **List of values**
  
  ```js
  const Fancy = styled("div", {
    transition: ["width", 2]
  })
  ```

  ```css
  .morpho-ta4jzb {
    -webkit-transition: width 2s;
    transition: width 2s;
  }
  ```

* ## **Repeat properties using nested arrays**

  ```js
  const Fancy = styled("div", {
    position: [["-webkit-sticky"], ["sticky"]]
  })
  ```

  ```css
  .morpho-ta4jzb {
    position: -webkit-sticky;
    position: sticky;
  }
  ```

* ## **Nesting**
  
  ```js
  const Fancy = styled("div", {
    width: 5,
    "h1 &": {
      color: "orange",
      tag: {
        fontSize: "21px",
        "& h2": {
          border: "5px"
        }
      }
    }
  })
  ```

  ```css
  .morpho-dx8a25 {width: 5%;}
  h1 .morpho-dx8a25 {color: orange;}
  h1 .morpho-dx8a25 tag {font-size: 21px;}
  h1 .morpho-dx8a25 tag .morpho-dx8a25 h2 {border: 5px;}
  ```

* ## **Dynamically set css values from props**

  ```js
  const Button = styled("div", props => ({
    color: props.myColor || "green",
    width: props.size || "5px"
  }))
  Button({ myColor: "orange", size: "20px" });
  ```

  ```css
  .morpho-qbjka {
    color: orange;
    width: 20px;
  }
  ```

* ## **Pseudo selectors and elements**

  ```js
  const Link = styled("div", {
    color: "blue",
    "&:hover": {
      color: "red"
    }
  })
  ```

  ```css
  .morpho-5tqubj:hover {
    color: red;
  }
  .morpho-5tqubj {
    color: blue;
  }
  ```

* ## **Combinators**
  
  ```js
  const Fancy = styled("div", {
    color: "#123456",
    "& + &": {
      color: "#32AB71"
    }
  })
  ```

  ```css
  .morpho-ra155c + .morpho-ra155c {
    color: #32AB71;
  }
  .morpho-ra155c {
    color: #123456;
  }
  ```

## Credits

A lot of inspiration and work for this library comes from Picostyle.  Some of the work I added to Picostyle including css export is also found here.

### **Differences between morpho and picostyle**

Morpho adds a lot of additional features that are not found in Picostyle including: list values, default numeric units, vendor prefixing, nesting, and dynamic values from props.
