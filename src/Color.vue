<template>
  <header>
    <h1>Vue-color</h1>  
  </header>
  <div class="wrap">
    <div class="test-wrap">
      <p>{{colors.hex}}</p>
      <p>{{colors.rgba.r}} {{colors.rgba.g}} {{colors.rgba.b}} {{colors.rgba.a}}</p>
      <p>{{colors.hsl.h}} {{colors.hsl.s}} {{colors.hsl.l}} {{colors.hsl.a}}</p>
      <p>{{colors.hsv.h}} {{colors.hsl.s}} {{colors.hsv.v}} {{colors.hsv.a}}</p>
      <p>{{colors.a}}</p>
    </div>

    <div class="components-wrap" style="position: absolute; top: 350px; left: 10px;">
      <material-picker :colors.sync="colors"></material-picker>
      <h6>Material</h6>
    </div>
    
    <div class="components-wrap" style="position: absolute; top: 350px; left: 200px;">
      <compact-picker :colors.sync="colors"></compact-picker>
      <h6>Compact</h6>
    </div>

    <div class="components-wrap" style="position: absolute; top: 350px; right: 0px;">
      <swatches-picker :colors.sync="colors"></swatches-picker>
      <h6>Swatches</h6>
    </div>

    <div class="components-wrap" style="position: absolute; top: 520px; left: 10px;">
      <slider-picker :colors.sync="colors"></slider-picker>
      <h6>Slider</h6>
    </div>

    <div class="components-wrap" style="position: absolute; top: 10px; left: 300px;">
      <sketch-picker :colors.sync="colors"></sketch-picker>
      <h6>Sketch</h6>
    </div>
    
    <div class="components-wrap" style="position: absolute; top: 10px; right: 10px;">
      <chrome-picker :colors.sync="colors"></chrome-picker>
      <h6>Chrome</h6>
    </div>

  </div>
</template>

<script>
import material from './components/Material.vue'
import compact from './components/Compact.vue'
import swatches from './components/Swatches.vue'
import slider from './components/Slider.vue'
import sketch from './components/Sketch.vue'
import chrome from './components/Chrome.vue'

let defaultProps = {
  hex: '#194d33',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1,
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 1,
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 1,
  },
  a: 1,
}

export default {
  name: 'Color',
  components:{
    'material-picker': material,
    'compact-picker': compact,
    'swatches-picker': swatches,
    'slider-picker': slider,
    'sketch-picker': sketch,
    'chrome-picker': chrome
  },
  data () {
    return {
      colors: defaultProps
    }
  }

}
</script>

<style lang="stylus">
header
  text-align center
.wrap
  width 900px
  min-height 800px
  margin 0 auto
  position relative
.components-wrap
  margin-bottom 10px
  h6
    margin 0
    padding 5px 0
    color #666    
.test-wrap
  margin-bottom 10px
  p
    margin 0
</style>