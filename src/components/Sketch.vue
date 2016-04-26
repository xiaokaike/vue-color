<template>
  <div class="c-sketch">
    <div class="saturation-wrap">
      <saturation :colors.sync="colors" :on-change="childChange"></saturation>
    </div>
    <div class="controls">
      <div class="sliders">
        <div class="hue-wrap">
          <hue :colors.sync="colors" :on-change="childChange"></hue>  
        </div>
        <div class="alpha-wrap">
          <alpha :colors.sync="colors" :on-change="childChange"></alpha>
        </div>
      </div>
      <div class="color-wrap">
        <div class="active-color" :style="{background: activeColor}"></div>
      </div>
    </div>
    
    <div class="presets">
      <div class="presets-color"
        v-for="c in presetColors"
        :style="{background: c}"
        @click="handlePreset(c)"
        >
      </div>
    </div>
  </div>
</template>

<script>
import colorMixin from '../mixin/color'
import editableInput from './common/EditableInput.vue'
import saturation from './common/Saturation.vue'
import hue from './common/Hue.vue'
import alpha from './common/Alpha.vue'

let presetColors = [
  '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', 
  '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', 
  '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF'
]

export default {
  name: 'Sketch',
  mixins: [colorMixin],
  components: {
    saturation,
    hue,
    alpha,
    'ed-in': editableInput,
  },
  props: {
  },
  data () {
    return {
      presetColors: presetColors
    }
  },
  computed: {
    activeColor () {
      var rgba = this.colors.rgba
      return 'rgba(' + rgba.r + ', ' + rgba.g + ', ' + rgba.b + ', ' + rgba.a + ')'
    }
  },
  methods:{
    handlePreset (c){
      this.colorChange({
        hex: c,
        source: 'hex'
      })
    },
    childChange (data){
      this.colorChange(data)
    }
  }

}
</script>

<style lang="stylus">
.c-sketch
  position relative
  width 200px
  padding 10px 10px 0
  box-sizing initial
  background #fff
  border-radius 4px
  box-shadow 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)
  .saturation-wrap
    width 100%
    padding-bottom 75%
    position relative
    overflow hidden
  .controls
    display flex
    .sliders
      padding 4px 0
      flex 1
    .hue-wrap
      position relative
      height 10px
      overflow hidden
    .alpha-wrap
      position relative
      height 10px
      margin-top 4px
      overflow hidden
    .color-wrap
      width 24px
      height 24px
      position relative
      margin-top 4px
      margin-left 4px
      border-radius 3px
    .active-color
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      border-radius 2px
      box-shadow inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)
      z-index 2
  .presets
    margin-right -10px
    margin-left -10px
    padding-left 10px
    padding-top 10px
    border-top 1px solid #eee
    .presets-color
      border-radius 3px
      overflow hidden
      position relative
      display inline-block
      margin 0 10px 10px 0
      vertical-align top
      cursor pointer
      width 16px
      height 16px
      box-shadow inset 0 0 0 1px rgba(0,0,0,.15)
</style>