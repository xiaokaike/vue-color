<template>
  <div class="wrap">
    <div class="test-wrap">
      <p>{{colors.hex}}</p>
      <p>{{colors.rgba.r}} {{colors.rgba.g}} {{colors.rgba.b}} {{colors.rgba.a}}</p>
      <p>{{colors.hsl.h}} {{colors.hsl.s}} {{colors.hsl.l}} {{colors.hsl.a}}</p>
      <p>{{colors.hsv.h}} {{colors.hsl.s}} {{colors.hsv.v}} {{colors.hsv.a}}</p>
    </div>

    <div class="components-wrap">
      <material-picker :colors.sync="colors"></material-picker>
      <h6>Material</h6>
    </div>
    
    <div class="components-wrap">
      <compact-picker :colors.sync="colors"></compact-picker>
      <h6>Compact</h6>
    </div>

    <div class="components-wrap">
      <swatches-picker :colors.sync="colors"></swatches-picker>
      <h6>Swatches</h6>
    </div>

    <div class="components-wrap">
      <slider-picker :colors.sync="colors"></slider-picker>
      <h6>Slider</h6>
    </div>
    
  </div>
</template>

<script>
import material from './components/Material.vue'
import compact from './components/Compact.vue'
import swatches from './components/Swatches.vue'
import slider from './components/Slider.vue'

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
}

export default {
  name: 'Color',
  components:{
    'material-picker': material,
    'compact-picker': compact,
    'swatches-picker': swatches,
    'slider-picker': slider
  },
  props: {
  },
  data () {
    return {
      colors: defaultProps
    }
  }

}
</script>

<style lang="stylus">
.wrap
  width 600px
  margin 0 auto
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