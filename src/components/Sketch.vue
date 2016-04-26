<template>
  <div class="c-sketch">
    <div class="saturation-wrap">
      <saturation :colors.sync="colors" :on-change="saturationChange"></saturation>
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

let presetColors = [
  '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', 
  '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', 
  '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF'
]

export default {
  name: 'Sketch',
  mixins: [colorMixin],
  components: {
    'ed-in': editableInput,
    saturation
  },
  props: {
  },
  data () {
    return {
      presetColors: presetColors
    }
  },
  methods:{
    handlePreset: function(c){
      this.colorChange({
        hex: c,
        source: 'hex'
      })
    },
    saturationChange: function(data){
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
    margin-bottom 10px
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