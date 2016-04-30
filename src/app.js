import Vue from 'vue'
import material from './components/Material.vue'
import compact from './components/Compact.vue'
import swatches from './components/Swatches.vue'
import slider from './components/Slider.vue'
import sketch from './components/Sketch.vue'
import chrome from './components/Chrome.vue'
import photoshop from './components/Photoshop.vue'

Vue.config.debug = true

/* eslint-disable no-new */

let defaultProps = {
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
