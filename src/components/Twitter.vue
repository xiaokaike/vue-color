<template>
    <div class="vc-card twitter-picker"
      :class="{
        'vc-hide-triangle ': triangle === 'hide',
        'vc-top-left-triangle ': triangle === 'top-left',
        'vc-top-right-triangle ': triangle === 'top-right',
      }"
      :style="{
        width: typeof width === 'number' ? `${width}px` : width
      }"
    >
      <div class="vc-triangle-shadow"></div>
      <div class="vc-triangle"></div>

      <div class="vc-body">
        <span
          class="vc-swatch"
          :style="{
            background: color,
            boxShadow: `0 0 4px ${ equal(color) ? color : 'transparent' }`,
          }"
          v-for="(color, index) in defaultColors"
          :key="index"
          @click="handlerClick(color)"
        >
        </span>
        <div class="vc-hash">#</div>
        <editable-input label="#" :value="hex" @change="inputChange"></editable-input>
        <div class="vc-clear"></div>
      </div>
    </div>
</template>

<script>
import editableInput from './common/EditableInput.vue'
import colorMixin from '../mixin/color'

const defaultColors = [
  '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3',
  '#EB144C', '#F78DA7', '#9900EF'
]

export default {
  name: 'Twitter',
  mixins: [colorMixin],
  components: {
    editableInput
  },
  data () {
    return {
      currentColor: '#fff'
    }
  },
  props: {
    width: {
      type: [String, Number],
      default: 276
    },
    defaultColors: {
      type: Array,
      default () {
        return defaultColors
      }
    },
    triangle: {
      default: 'top-left',
      validator (value) {
        return ['hide', 'top-left', 'top-right'].includes(value)
      }
    }
  },
  computed: {
    hsv () {
      const hsv = this.colors.hsv
      return {
        h: hsv.h.toFixed(),
        s: (hsv.s * 100).toFixed(),
        v: (hsv.v * 100).toFixed()
      }
    },
    hex () {
      const hex = this.colors.hex
      return hex && hex.replace('#', '')
    }
  },
  methods: {
    equal (color) {
      return color.toLowerCase() === this.colors.hex.toLowerCase()
    },
    handlerClick (color) {
      this.colorChange({
        hex: color,
        source: 'hex'
      })
    },
    inputChange (data) {
      if (!data) {
        return
      }
      if (data['#']) {
        this.isValidHex(data['#']) && this.colorChange({
          hex: data['#'],
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
      } else if (data.h || data.s || data.v) {
        this.colorChange({
          h: data.h || this.colors.hsv.h,
          s: (data.s / 100) || this.colors.hsv.s,
          v: (data.v / 100) || this.colors.hsv.v,
          source: 'hsv'
        })
      }
    }
  }
}
</script>

<style>
.vc-card {
  background: #fff;
  border: 0 solid rgba(0,0,0,0.25);
  box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  border-radius: 4px;
  position: relative;
}
.vc-triangle {
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0 9px 10px 9px;
  border-color: transparent transparent #fff transparent;
  position: absolute;
}
.vc-triangle-shadow {
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0 9px 10px 9px;
  border-color: transparent transparent rgba(0, 0, 0, .1) transparent;
  position: absolute;
}
.vc-body {
  padding: 15px 9px 9px 15px;
}
.vc-editable-input {
  position: relative;
}
.vc-editable-input input {
  width: 100px;
  font-size: 14px;
  color: #666;
  border: 0px;
  outline: none;
  height: 28px;
  box-shadow: inset 0 0 0 1px #F0F0F0;
  box-sizing: content-box;
  border-radius: 0 4px 4px 0;
  float: left;
  padding: 1px;
  padding-left: 8px;
}
.vc-editable-input span {
  display: none;
}
.vc-hash {
  background: #F0F0F0;
  height: 30px;
  width: 30px;
  border-radius: 4px 0 0 4px;
  float: left;
  color: #98A1A4;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vc-swatch {
  width: 30px;
  height: 30px;
  float: left;
  border-radius: 4px;
  margin: 0 6px 6px 0;
  cursor: pointer;
  position: relative;
  outline: none;
}
.vc-clear {
  clear: both;
}
.vc-hide-triangle .vc-triangle {
  display: none;
}
.vc-hide-triangle .vc-triangle-shadow {
  display: none;
}
.vc-top-left-triangle .vc-triangle{
  top: -10px;
  left: 12px;
}
.vc-top-left-triangle .vc-triangle-shadow{
  top: -11px;
  left: 12px;
}
.vc-top-right-triangle .vc-triangle{
  top: -10px;
  right: 12px;
}
.vc-top-right-triangle .vc-triangle-shadow{
  top: -11px;
  right: 12px;
}
</style>
