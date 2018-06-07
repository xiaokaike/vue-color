<template>
  <div :class="['vc-iconscout', disableAlpha ? 'vc-iconscout__disable-alpha' : '']">
    <div class="vc-iconscout-saturation-wrap">
      <saturation v-model="colors" @change="childChange"></saturation>
    </div>
    <div class="vc-iconscout-body">
      <div class="vc-iconscout-controls">
        <div class="vc-iconscout-color-wrap">
          <div class="vc-iconscout-active-color" :style="{background: activeColor}"></div>
          <checkboard v-if="!disableAlpha"></checkboard>
        </div>

        <div class="vc-iconscout-sliders">
          <div class="vc-iconscout-hue-wrap">
            <hue v-model="colors" @change="childChange"></hue>
          </div>
          <div class="vc-iconscout-alpha-wrap" v-if="!disableAlpha">
            <alpha v-model="colors" @change="childChange"></alpha>
          </div>
        </div>
      </div>

      <div class="vc-iconscout-fields-wrap" v-if="!disableFields">
        <div class="vc-iconscout-fields" v-show="fieldsIndex === 0">
          <!-- hex -->
          <div class="vc-iconscout-field">
            <ed-in label="hex" :value="colors.hex" @change="inputChange"></ed-in>
          </div>
        </div>
        <div class="vc-iconscout-fields" v-show="fieldsIndex === 1">
          <!-- rgba -->
          <div class="vc-iconscout-field">
            <ed-in label="r" :value="colors.rgba.r" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-field">
            <ed-in label="g" :value="colors.rgba.g" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-field">
            <ed-in label="b" :value="colors.rgba.b" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-field" v-if="!disableAlpha">
            <ed-in label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
          </div>
        </div>
        <div class="vc-iconscout-fields" v-show="fieldsIndex === 2">
          <!-- hsla -->
          <div class="vc-iconscout-field">
            <ed-in label="h" :value="hsl.h" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-field">
            <ed-in label="s" :value="hsl.s" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-field">
            <ed-in label="l" :value="hsl.l" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-field" v-if="!disableAlpha">
            <ed-in label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
          </div>
        </div>
        <!-- btn -->
        <div class="vc-iconscout-toggle-btn" @click="toggleViews">
          <div class="vc-iconscout-toggle-icon">
            <svg style="width:24px; height:24px" viewBox="0 0 24 24"
              @mouseover="showHighlight"
              @mouseenter="showHighlight"
              @mouseout="hideHighlight">
              <path fill="#333" d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" />
            </svg>
          </div>
          <div class="vc-iconscout-toggle-icon-highlight" v-show="highlight"></div>
        </div>
        <!-- btn -->
      </div>
    </div>
    <div class="vc-iconscout-defaults">
      <button
        v-for="(color, index) in defaultColors"
        :key="index"
        :class="['vc-iconscout-button', (color === 'transparent' || color === 'white') ? `vc-iconscout-color-${color}` : '']"
        :style="{ backgroundColor: color }"
        @click="inputChange({ hex: color })"
      >
      </button>
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

export default {
  name: 'Chrome',
  mixins: [colorMixin],
  props: {
    disableAlpha: {
      type: Boolean,
      default: false
    },
    disableFields: {
      type: Boolean,
      default: false
    }
  },
  components: {
    saturation,
    hue,
    alpha,
    'ed-in': editableInput,
    checkboard
  },
  data () {
    return {
      fields: ['hex', 'rgba', 'hsla'],
      fieldsIndex: 0,
      highlight: false,
      defaultColors: [
        '#000',
        '#818181',
        'white',
        'transparent',
        '#FF475E',
        '#FFB438',
        '#FFEF2B',
        '#75C81B',
        '#2FD4C9',
        '#6597FF',
        '#A851FF',
        '#FF5AB4'
      ]
    }
  },
  computed: {
    hsl () {
      const { h, s, l } = this.colors.hsl
      return {
        h: h.toFixed(),
        s: `${(s * 100).toFixed()}%`,
        l: `${(l * 100).toFixed()}%`
      }
    },
    activeColor () {
      const rgba = this.colors.rgba
      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
    }
  },
  watch: {
    colors (newVal) {
      const { a } = newVal
      if (a < 1 && this.fieldsIndex === 0) {
        this.fieldsIndex = 1
      }
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
      } else if (data.h || data.s || data.l) {
        const s = data.s ? (data.s.replace('%', '') / 100) : this.colors.hsl.s
        const l = data.l ? (data.l.replace('%', '') / 100) : this.colors.hsl.l

        this.colorChange({
          h: data.h || this.colors.hsl.h,
          s,
          l,
          source: 'hsl'
        })
      }
    },
    toggleViews () {
      if (this.fieldsIndex >= 2) {
        this.fieldsIndex = this.colors.a < 1 ? 1 : 0
        return
      }
      this.fieldsIndex++
    },
    showHighlight () {
      this.highlight = true
    },
    hideHighlight () {
      this.highlight = false
    }
  }
}
</script>

<style>
.vc-iconscout {
  background: #fff;
  border-radius: 3px;
  box-sizing: initial;
  width: 225px;
  background-color: #fff;
}
.vc-iconscout-controls {
  display: flex;
}
.vc-iconscout-color-wrap {
  position: relative;
  width: 36px;
}
.vc-iconscout-active-color {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  z-index: 1;
}
.vc-iconscout-color-wrap .vc-checkerboard {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-size: auto;
}
.vc-iconscout-sliders {
  flex: 1;
}
.vc-iconscout-fields-wrap {
  display: flex;
  padding-top: 16px;
}
.vc-iconscout-fields {
  display: flex;
  margin-left: -6px;
  flex: 1;
}
.vc-iconscout-field {
  padding-left: 6px;
  width: 100%;
}
.vc-iconscout-toggle-btn {
  width: 32px;
  text-align: right;
  position: relative;
}
.vc-iconscout-toggle-icon {
  margin-right: -4px;
  margin-top: 12px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
.vc-iconscout-toggle-icon-highlight {
  position: absolute;
  width: 24px;
  height: 28px;
  background: #eee;
  border-radius: 4px;
  top: 10px;
  left: 12px;
}
.vc-iconscout-hue-wrap {
  position: relative;
  height: 10px;
  margin-bottom: 8px;
}
.vc-iconscout-alpha-wrap {
  position: relative;
  height: 10px;
}
.vc-iconscout-hue-wrap .vc-hue {
  border-radius: 2px;
}
.vc-iconscout-alpha-wrap .vc-alpha-gradient {
  border-radius: 2px;
}
.vc-iconscout-hue-wrap .vc-hue-picker, .vc-iconscout-alpha-wrap .vc-alpha-picker {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  transform: translate(-6px, -2px);
  background-color: rgb(248, 248, 248);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
}
.vc-iconscout-body {
  padding: 16px 16px 12px;
  background-color: #fff;
}
.vc-iconscout-saturation-wrap {
  width: 100%;
  padding-bottom: 55%;
  position: relative;
  border-radius: 2px 2px 0 0;
  overflow: hidden;
}
.vc-iconscout-saturation-wrap .vc-saturation-circle {
  width: 12px;
  height: 12px;
}

.vc-iconscout-fields .vc-input__input {
  font-size: 11px;
  color: #333;
  width: 100%;
  border-radius: 2px;
  border: none;
  box-shadow: inset 0 0 0 1px #dadada;
  height: 21px;
  text-align: center;
}
.vc-iconscout-fields .vc-input__label {
  text-transform: uppercase;
  font-size: 11px;
  line-height: 11px;
  color: #969696;
  text-align: center;
  display: block;
  margin-top: 12px;
}

.vc-iconscout__disable-alpha .vc-iconscout-active-color {
  width: 18px;
  height: 18px;
}
.vc-iconscout__disable-alpha .vc-iconscout-color-wrap {
  width: 30px;
}
.vc-iconscout__disable-alpha .vc-iconscout-hue-wrap {
  margin-top: 4px;
  margin-bottom: 4px;
}
.vc-iconscout-defaults {
  border: 2px solid white;
  background-color: #F8FAFF;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.vc-iconscout-button {
  height: 22px;
  width: 22px;
  border: 1px solid transparent;
  padding: 0;
  border-radius: 22px;
  margin: 5px;
  outline: none !important;
  cursor: pointer;
}
.vc-iconscout-color-white {
  border-color: #DBDBDB;
}
.vc-iconscout-color-transparent {
  border-color: rgba(0, 0, 0, 0.5);
  background-color: #fff;
  background-image:
    -webkit-linear-gradient(45deg,#E4E9F2 25%,transparent 25%,transparent 75%,#E4E9F2 75%,#E4E9F2),
    -webkit-linear-gradient(45deg,#E4E9F2 25%,transparent 25%,transparent 75%,#E4E9F2 75%,#E4E9F2) !important;
  background-position: 0 0,5px 5px;
  background-size: 10px 10px;
}
</style>
