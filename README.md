# nanostyle

A tiny CSS-in-JS framework with all the bells and wistles.

Documentation in progress.

## Setup

Install nanostyle

```sh
npm i nanostyle
```

With a module bundler like Rollup or Webpack, import nanostyle into your application

```js
import nanostyle from "nanostyle"
```

If a bundler is not being used, nanostyle can be imported in a script> tag as a module.

```html
<script type="module">
  import nanostyle from "https://unpkg.com/nanostyle"
</script>
```

## Getting Started

```js
const options = {
  classProp = "class" /* React uses className */
  childParam = true /* Hyperapp uses (props, children)
  childParam = false /*React (props) => {props.children}*/  
  unit: "em", //Global default numeric unit
  cssProps: {
    "border": {
      vendor: ["-webkit-", "-moz-"], //Override or add custom vendor prefixes
      unit: "%" //Default unit for single css property
    }
  }
}

const { styled, css, keyframes } = nanostyle(h, options);

const customClass = css({
  color: "blue"
})

const Component = (props, children) => h("p", {class: customClass}, children)

const StyledComponent = styled("p", {
  fontSize: 10
}, "customPrefix")

const doubleSize =  keyframes({
  from: {
    transform: 'scale(2)'
  },
  to: {
    transform: 'scale(4)'
  },
})

const grow = css({
  animation: [doubleSize, "300ms"]
})
```

## Features

* ## **Framework agnostic**

  * Use with Hyperapp, React, Vue or anything that has a class attribute or exposes an ```h()``` function

* ## **Tiny < 3k**

* ## **Fully scoped class names**
  
  ```css
  .nano-nnbflx
  ```

* ## **Style a component**

  ```js
  const Button = styled("div")({
    margin: "1em",
    padding: "0.25em 1em",
    borderRadius: "3px"
  });
  ```

* ## **Extend a component**
  
  ```js
  const GreenButton = styled(Button)({
    color: "tomato",
  });
  ```

* ## **Style an unstyled component**
  
  ```js
  const Button = (props) => h("div", {class: props.class}, props.children);

  const OrangeButton styled(Button)({
    backgroundColor: "orange"
  })
  ```

* ## **Vendor Prefixing**
  
  ```css
  .nano-en4vga {
    -webkit-box-direction: normal;
    box-direction: normal;
  }
  ```

* ## **Custom class name prefixing**

  ```js
  const Fancy = styled("div")({
      borderRightWidth: 5
  },"article-header")

  const className = css({borderRightWidth: 5}, "article-header")
  ```

  ```css
  .article-header-nnbflx
  ```

* ## **Media queries**
  
  ```css
  @media (max-width: 450px) {
    .nano-yi32xy {
      font-size: 32px;
    }
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
  @keyframes nano-nnbflx {
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
  const Fancy = styled("div")({
    "width": 5,
    "columns": 10
  })
  ```

* ## **Custom default units**
  
  ```js
  const options = {
    unit: "%", //Set global default, normally px
    cssProps: {
      "height": {
        "unit": "em" //Property default
      }
    }
  }
  ```

* ## **List of values**
  
  ```js
  const Fancy = styled("div")({
    "transition": ["width", 2]
  })
  ```

  ```css
  .nano-ta4jzb {
    -webkit-transition: width 2s;
    transition: width 2s;
  }
  ```

* ## **Repeat properties using nested arrays**

  ```js
  const Fancy = styled("div")({
    position: [["-webkit-sticky"], ["sticky"]]
  })
  ```

  ```css
  .nano-ta4jzb {
    position: -webkit-sticky;
    position: sticky;
  }
  ```

* ## **Nesting**
  
  ```js
  const Fancy = styled("div")({
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
  ```

  ```css
  .nano-dx8a25 {width: 5%;}
  h1 .nano-dx8a25 {color: orange;}
  h1 .nano-dx8a25 tag {font-size: 21px;}
  h1 .nano-dx8a25 tag .nano-dx8a25 h2 {border: 5px;}
  ```

* ## **Dynamically set css values from props**

  ```js
  const Button = styled("div")(props => ({
    color: props.myColor || "green",
    width: props.size || "5px"
  }))
  Button({ myColor: "orange", size: "20px" });
  ```

  ```css
  .nano-qbjka {
    color: orange;
    width: 20px;
  }
  ```

* ## **Pseudo selectors and elements**

  ```js
  const Link = styled("div")({
    color: "blue",
    "&:hover": {
      color: "red"
    }
  })
  ```

  ```css
  .nano-5tqubj:hover {
    color: red;
  }
  .nano-5tqubj {
    color: blue;
  }
  ```

* ## **Combinators**
  
  ```js
  const Fancy = styled("div")({
    color: "#123456",
    "& + &": {
      color: "#32AB71"
    }
  })
  ```

  ```css
  .nano-ra155c + .nano-ra155c {
    color: #32AB71;
  }
  .nano-ra155c {
    color: #123456;
  }
  ```
