# vue-color 

[![npm](https://img.shields.io/npm/v/vue-color.svg)](https://www.npmjs.com/package/vue-color)

Color Pickers for Sketch, Photoshop, Chrome & more with Vue.js(vue2.0).  

## [Live demo](http://xiaokaike.github.io/vue-color/)

![intro](./intro.png)

## Installation

### NPM
```bash
$ npm install vue-color
```

### CommonJS
```js
var Photoshop = require('vue-color/src/Photoshop.vue');

new Vue({
  components: {
    'Photoshop': Photoshop
  }
})
```

### ES6
```js
import { Photoshop } from 'vue-color'

new Vue({
  components: {
    'photoshop-picker': Photoshop
  }
})
```

### Browser globals
The `dist` folder contains `vue-color.js` and `vue-color.min.js` with all components exported in the <code>window.VueColor</code> object. These bundles are also available on NPM packages.

```html
<script src="path/to/vue.js"></script>
<script src="path/to/vue-color.min.js"></script>
<script>
  var Photoshop = VueColor.Photoshop
</script>
```

## Local setup

```
npm install
npm run dev
```

## Usage
```js

var defaultProps = {
  hex: '#194d33',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 1
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 1
  },
  a: 1
}

new Vue({
  el: '#app',
  components: {
    'material-picker': material,
    'compact-picker': compact,
    'swatches-picker': swatches,
    'slider-picker': slider,
    'sketch-picker': sketch,
    'chrome-picker': chrome,
    'photoshop-picker': photoshop
  },
  data: {
    colors: defaultProps
  }
})

```

```html
<!-- suppose you have the data 'colors' in your component -->
<material-picker v-model="colors" />
<compact-picker v-model="colors" />
<swatches-picker v-model="colors" />
<slider-picker v-model="colors" />
<sketch-picker v-model="colors" />
<chrome-picker v-model="colors" />
<photoshop-picker v-model="colors" />
```

OR

```html
<chrome-picker :value="colors" @input="updateValue"></chrome-picker>
```

OR

```html
<swatches-picker 
  :value="colors" 
  :colorLevels="['900', '500', '300']" 
  :colorMap="['red','orange','yellow','green','blue','indigo','purple']" 
  :removeColors="['#FFFFFF', '#B71C1C']" 
  @input="updateValue">
</swatches-picker>
```

## Customizable props
Swatches can be provided:
- `colorLevels` - an Array of values indicating intensity of each color
- `colorMap` - an Array of colors which are matched from material design colors
- `removeColors` - an Array of color hex values to remove from final list of colors to display


## TODO
-[] docs
-[] more components


## License

vue-color is licensed under [The MIT License](LICENSE).
