<template>
  <div class="vue-color__sketch">
    <div class="vue-color__sketch__saturation-wrap">
      <saturation v-model="colors" @change="childChange"></saturation>
    </div>
    <div class="vue-color__sketch__controls">
      <div class="vue-color__sketch__sliders">
        <div class="vue-color__sketch__hue-wrap">
          <hue v-model="colors" @change="childChange"></hue>  
        </div>
        <div class="vue-color__sketch__alpha-wrap">
          <alpha v-model="colors" @change="childChange"></alpha>
        </div>
      </div>
      <div class="vue-color__sketch__color-wrap">
        <div class="vue-color__sketch__active-color" :style="{background: activeColor}"></div>
      </div>
    </div>
    <div class="vue-color__sketch__field">
      <!-- rgba -->
      <div class="vue-color__sketch__field--double">
        <ed-in label="hex" v-model="colors.hex" @change="inputChange"></ed-in>  
      </div>
      <div class="vue-color__sketch__field--single">
        <ed-in label="r" v-model="colors.rgba.r" @change="inputChange"></ed-in>
      </div>
      <div class="vue-color__sketch__field--single">
        <ed-in label="g" v-model="colors.rgba.g" @change="inputChange"></ed-in>
      </div>
      <div class="vue-color__sketch__field--single">
        <ed-in label="b" v-model="colors.rgba.b" @change="inputChange"></ed-in>
      </div>
      <div class="vue-color__sketch__field--single">
        <ed-in label="a" v-model="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
      </div>
    </div>
    <div class="vue-color__sketch__presets">
      <div class="vue-color__sketch__presets-color"
        v-for="c in presetColors"
        :style="{background: c}"
        @click="handlePreset(c)">
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

const presetColors = [
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
    'ed-in': editableInput
  },
  data () {
    return {
      presetColors: presetColors
    }
  },
  computed: {
    activeColor () {
      var rgba = this.colors.rgba
      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
    }
  },
  methods: {
    handlePreset (c) {
      this.colorChange({
        hex: c,
        source: 'hex'
      })
    },
    childChange (data) {
      this.colorChange(data)
    },
    inputChange (data) {
      if (!data) {
        return
      }
      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex'
        })
      } else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba'
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.vue-color__sketch
  position relative
  width 200px
  padding 10px 10px 0
  box-sizing initial
  background #fff
  border-radius 4px
  box-shadow 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)
.vue-color__sketch__saturation-wrap
  width 100%
  padding-bottom 75%
  position relative
  overflow hidden
.vue-color__sketch__controls
  display flex
.vue-color__sketch__sliders
  padding 4px 0
  flex 1
  .vue-color__c-hue
  .vue-color__c-alpha__gradient
    border-radius 2px
.vue-color__sketch__hue-wrap
  position relative
  height 10px
.vue-color__sketch__alpha-wrap
  position relative
  height 10px
  margin-top 4px
  overflow hidden
.vue-color__sketch__color-wrap
  width 24px
  height 24px
  position relative
  margin-top 4px
  margin-left 4px
  border-radius 3px
.vue-color__sketch__active-color
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  border-radius 2px
  box-shadow inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)
  z-index 2
.vue-color__sketch__field
  display flex
  padding-top 4px
  .vue-color__editable-input__input
    width 80%
    padding 4px 10% 3px
    border none
    box-shadow inset 0 0 0 1px #ccc
    font-size 11px
  .vue-color__editable-input__label
    display block
    text-align center
    font-size 11px
    color #222
    padding-top 3px
    padding-bottom 4px
    text-transform capitalize
.vue-color__sketch__field--single
  flex 1
  padding-left 6px
.vue-color__sketch__field--double
  flex 2
.vue-color__sketch__presets
  margin-right -10px
  margin-left -10px
  padding-left 10px
  padding-top 10px
  border-top 1px solid #eee
.vue-color__sketch__presets-color
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