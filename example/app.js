/* eslint-disable */
Vue.config.debug = true
var material = VueColor.Material
var compact = VueColor.Compact
var swatches = VueColor.Swatches
var slider = VueColor.Slider
var sketch = VueColor.Sketch
var chrome = VueColor.Chrome
var photoshop = VueColor.Photoshop

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
