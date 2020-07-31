<template>
  <div :class="['vc-iconscout-c', disableAlpha ? 'vc-iconscout-c__disable-alpha' : '']">
    <div class="vc-iconscout-c-saturation-wrap">
      <saturation v-model="colors" @change="childChange"></saturation>
    </div>
    <div class="vc-iconscout-c-body">
      <div class="vc-iconscout-c-controls">
        <div class="vc-iconscout-c-color-wrap">
          <div class="vc-iconscout-c-active-color" :style="{background: activeColor}"></div>
          <checkboard v-if="!disableAlpha"></checkboard>
        </div>

        <div class="vc-iconscout-c-sliders">
          <div class="vc-iconscout-c-hue-wrap">
            <hue v-model="colors" @change="childChange"></hue>
          </div>
          <div class="vc-iconscout-c-alpha-wrap" v-if="!disableAlpha">
            <alpha v-model="colors" @change="childChange"></alpha>
          </div>
        </div>
      </div>

      <div class="vc-iconscout-c-fields-wrap" v-if="!disableFields">
        <div class="vc-iconscout-c-fields" v-show="fieldsIndex === 0">
          <!-- hex -->
          <div class="vc-iconscout-c-field">
             <ed-in label="hex" :value="colors.hex" @change="inputChange"></ed-in>
          </div>
        </div>
        <div class="vc-iconscout-c-fields" v-show="fieldsIndex === 1">
          <!-- rgba -->
          <div class="vc-iconscout-c-field">
            <ed-in label="r" :value="colors.rgba.r" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-c-field">
            <ed-in label="g" :value="colors.rgba.g" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-c-field">
            <ed-in label="b" :value="colors.rgba.b" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-c-field" v-if="!disableAlpha">
            <ed-in label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
          </div>
        </div>
        <div class="vc-iconscout-c-fields" v-show="fieldsIndex === 2">
          <!-- hsla -->
          <div class="vc-iconscout-c-field">
            <ed-in label="h" :value="hsl.h" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-c-field">
            <ed-in label="s" :value="hsl.s" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-c-field">
            <ed-in label="l" :value="hsl.l" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-c-field" v-if="!disableAlpha">
            <ed-in label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
          </div>
        </div>
        <!-- btn -->
        <div v-if="!disableToggle" class="vc-iconscout-c-toggle-btn" @click="toggleViews">
          <div class="vc-iconscout-c-toggle-icon">
            <svg style="width:24px; height:24px" viewBox="0 0 24 24"
              @mouseover="showHighlight"
              @mouseenter="showHighlight"
              @mouseout="hideHighlight">
              <path fill="#333" d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" />
            </svg>
          </div>
          <div class="vc-iconscout-c-toggle-icon-highlight" v-show="highlight"></div>
        </div>
        <!-- btn -->
      </div>
    </div>
    <div
      v-if="defaultPalette.length"
      class="vc-iconscout-c-defaults"
    >
      <button
        v-for="(color, index) in defaultPalette"
        :key="index"
        :class="['vc-iconscout-c-button', (color === 'transparent' || color === 'white') ? `vc-iconscout-c-color-${color}` : '']"
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
    },
    disableToggle: {
      type: Boolean,
      default: false
    },
    defaultPalette: {
      type: Array,
      default: () => []
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
      highlight: false
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
.vc-iconscout-c {
  background: #fff;
  border-radius: 3px;
  box-sizing: initial;
  width: 225px;
  background-color: #fff;
}
.vc-iconscout-c-controls {
  display: flex;
}
.vc-iconscout-c-color-wrap {
  position: relative;
  width: 36px;
}
.vc-iconscout-c-active-color {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  z-index: 1;
}
.vc-iconscout-c-color-wrap .vc-checkerboard {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-size: auto;
}
.vc-iconscout-c-sliders {
  flex: 1;
}
.vc-iconscout-c-fields-wrap {
  display: flex;
  padding-top: 15px;
}
.vc-iconscout-c-fields {
  display: flex;
  margin-left: -6px;
  flex: 1;
}
.vc-iconscout-c-field {
  padding-left: 6px;
  width: 100%;
}
.vc-iconscout-c-toggle-btn {
  width: 32px;
  text-align: right;
  position: relative;
}
.vc-iconscout-c-toggle-icon {
  margin-right: -4px;
  margin-top: 12px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
.vc-iconscout-c-toggle-icon-highlight {
  position: absolute;
  width: 24px;
  height: 28px;
  background: #eee;
  border-radius: 4px;
  top: 10px;
  left: 12px;
}
.vc-iconscout-c-hue-wrap {
  position: relative;
  height: 10px;
  margin-bottom: 8px;
}
.vc-iconscout-c-alpha-wrap {
  position: relative;
  height: 10px;
}
/* .vc-iconscout-c-hue-wrap .vc-hue {
  border-radius: 2px;
} */
.vc-iconscout-c-alpha-wrap .vc-alpha-gradient {
  border-radius: 2px;
}
.vc-iconscout-c-hue-wrap .vc-hue-picker, .vc-iconscout-c-alpha-wrap .vc-alpha-picker {
  width: 14px;
  height: 14px;
  transform: translate(-6px, -2px);
  border: 2px solid #fff;
  background-color: transparent;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
.vc-iconscout-c-body {
  padding: 15px 0 0 0;
  background-color: #fff;
}
.vc-iconscout-c-saturation-wrap {
  width: 100%;
  padding-bottom: 55%;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
}
.vc-iconscout-c-saturation-wrap .vc-saturation-circle {
  width: 14px;
  height: 14px;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.vc-iconscout-c-fields .vc-input__input {
  font-weight: normal;
  font-size: 14px;
  line-height: 160%;
  color: #000;
  width: 100%;
  border: none;
  box-shadow: inset 0 0 0 1px #EBEDF5;
  background: #FAFAFC;
  border-radius: 5px;
  height: 34px;
  text-align: center;
}
.vc-iconscout-c-fields .vc-input__label {
  text-transform: uppercase;
  font-size: 11px;
  line-height: 11px;
  color: #969696;
  text-align: center;
  display: block;
  display: none;
}

.vc-iconscout-c__disable-alpha .vc-iconscout-c-active-color {
  width: 18px;
  height: 18px;
}
.vc-iconscout-c__disable-alpha .vc-iconscout-c-color-wrap {
  width: 30px;
}
.vc-iconscout-c__disable-alpha .vc-iconscout-c-hue-wrap {
  margin-top: 4px;
  margin-bottom: 4px;
}
.vc-iconscout-c-defaults {
  border: 2px solid white;
  background-color: transparent;
  margin-top: 15px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.vc-iconscout-c-button {
  height: 22px;
  width: 22px;
  border: 1px solid transparent;
  padding: 0;
  border-radius: 22px;
  margin: 5px;
  outline: none !important;
  cursor: pointer;
}
.vc-iconscout-c-color-white {
  border-color: #DBDBDB;
}
.vc-iconscout-c-color-transparent {
  border-color: rgba(0, 0, 0, 0.5);
  background-color: #fff;
  background-image:
    -webkit-linear-gradient(45deg,#E4E9F2 25%,transparent 25%,transparent 75%,#E4E9F2 75%,#E4E9F2),
    -webkit-linear-gradient(45deg,#E4E9F2 25%,transparent 25%,transparent 75%,#E4E9F2 75%,#E4E9F2) !important;
  background-position: 0 0,5px 5px;
  background-size: 10px 10px;
}
</style>
