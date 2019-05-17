<template>
  <div :class="['vc-iconscout', disableAlpha ? 'vc-iconscout__disable-alpha' : '']">
    <div class="vc-iconscout-colors-wrap">
      <div class="vc-iconscout-saturation-wrap">
        <saturation v-model="colors" @change="childChange"></saturation>
      </div>
      <div class="vc-iconscout-hue-wrap">
        <hue v-model="colors" @change="childChange" direction="vertical"></hue>
      </div>
      <div class="vc-iconscout-alpha-wrap" v-if="!disableAlpha">
        <alpha v-model="colors" @change="childChange" direction="vertical"></alpha>
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
import checkboard from './common/Checkboard.vue'

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
    'ed-in': editableInput,
    checkboard
  },
  props: {
    presetColors: {
      type: Array,
      default () {
        return presetColors
      }
    },
    disableAlpha: {
      type: Boolean,
      default: false
    },
    disableFields: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hex () {
      return this.colors.hex.replace('#', '')
    },
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

<style>
.vc-iconscout {
  position: relative;
  box-sizing: initial;
  background: #fff;
  border-radius: 4px;
}
.vc-iconscout-colors-wrap {
  position: relative;
  display: flex;
}
.vc-iconscout-saturation-wrap {
  width: 270px;
  height: 210px;
  position: relative;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 5px;
  box-sizing: border-box;
}
.vc-iconscout-hue-wrap {
  width: 15px;
  height: 210px;
  position: relative;
  border-radius: 7.5px;
  margin-left: 15px;
}
.vc-iconscout-alpha-wrap {
  width: 15px;
  height: 210px;
  position: relative;
  border-radius: 7.5px;
  margin-left: 15px;
}
</style>
