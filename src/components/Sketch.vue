<template>
  <div
    role="SketchColorPicker"
    :class="['vc-sketch', disableAlpha ? 'vc-sketch__disable-alpha' : '']"
  >
    <div class="vc-sketch-saturation-wrap">
      <saturation
        :color="tc"
        @change="childChange"
      />
    </div>
    <div class="vc-sketch-controls">
      <div class="vc-sketch-sliders">
        <div class="vc-sketch-hue-wrap">
          <hue
            :color="tc"
            @change="childChange"
          />
        </div>
        <div
          v-if="!disableAlpha"
          class="vc-sketch-alpha-wrap"
        >
          <alpha
            :color="tc"
            @change="childChange"
          />
        </div>
      </div>
      <div class="vc-sketch-color-wrap">
        <div
          :aria-label="'CurrentColor:' + activeColor"
          class="vc-sketch-active-color"
          :style="{background: activeColor}"
        />
        <checkboard />
      </div>
    </div>
    <div
      v-if="!disableFields"
      class="vc-sketch-field"
    >
      <!-- rgba -->
      <div class="vc-sketch-field--double">
        <ed-in
          label="hex"
          :value="hex"
          @change="inputChange"
        />
      </div>
      <div class="vc-sketch-field--single">
        <ed-in
          label="r"
          :value="tc.rgba.r"
          @change="inputChange"
        />
      </div>
      <div class="vc-sketch-field--single">
        <ed-in
          label="g"
          :value="tc.rgba.g"
          @change="inputChange"
        />
      </div>
      <div class="vc-sketch-field--single">
        <ed-in
          label="b"
          :value="tc.rgba.b"
          @change="inputChange"
        />
      </div>
      <div
        v-if="!disableAlpha"
        class="vc-sketch-field--single"
      >
        <ed-in
          label="a"
          :value="tc.a"
          :arrow-offset="0.01"
          @change="inputChange"
        />
      </div>
    </div>
    <div
      class="vc-sketch-presets"
      role="group"
    >
      <template v-for="c in presetColors">
        <div
          v-if="!isTransparent(c)"
          :key="c"
          class="vc-sketch-presets-color"
          :aria-label="'Color:' + c"
          :style="{background: c}"
          @click="handlePreset(c)"
        />
        <div
          v-else
          :key="c"
          :aria-label="'Color:' + c"
          class="vc-sketch-presets-color"
          @click="handlePreset(c)"
        >
          <checkboard />
        </div>
      </template>
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
  '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
  'rgba(0,0,0,0)'
]

export default {
  name: 'Sketch',
  components: {
    saturation,
    hue,
    alpha,
    'ed-in': editableInput,
    checkboard
  },
  mixins: [colorMixin],
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
      let hex
      if (this.tc.a < 1) {
        hex = this.tc.hex8
      } else {
        hex = this.tc.hex
      }
      return hex.replace('#', '')
    },
    activeColor () {
      var rgba = this.tc.rgba
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
          r: data.r || this.tc.rgba.r,
          g: data.g || this.tc.rgba.g,
          b: data.b || this.tc.rgba.b,
          a: data.a || this.tc.rgba.a,
          source: 'rgba'
        })
      }
    }
  }
}
</script>

<style>
.vc-sketch {
  position: relative;
  width: 200px;
  padding: 10px 10px 0;
  box-sizing: initial;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 8px 16px rgba(0, 0, 0, .15);
}

.vc-sketch-saturation-wrap {
  width: 100%;
  padding-bottom: 75%;
  position: relative;
  overflow: hidden;
}

.vc-sketch-controls {
  display: flex;
}

.vc-sketch-sliders {
  padding: 4px 0;
  flex: 1;
}

.vc-sketch-sliders .vc-hue,
.vc-sketch-sliders .vc-alpha-gradient {
  border-radius: 2px;
}

.vc-sketch-hue-wrap {
  position: relative;
  height: 10px;
}

.vc-sketch-alpha-wrap {
  position: relative;
  height: 10px;
  margin-top: 4px;
  overflow: hidden;
}

.vc-sketch-color-wrap {
  width: 24px;
  height: 24px;
  position: relative;
  margin-top: 4px;
  margin-left: 4px;
  border-radius: 3px;
}

.vc-sketch-active-color {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);
  z-index: 2;
}

.vc-sketch-color-wrap .vc-checkerboard {
  background-size: auto;
}

.vc-sketch-field {
  display: flex;
  padding-top: 4px;
}

.vc-sketch-field .vc-input__input {
  width: 90%;
  padding: 4px 0 3px 10%;
  border: none;
  box-shadow: inset 0 0 0 1px #ccc;
  font-size: 10px;
}

.vc-sketch-field .vc-input__label {
  display: block;
  text-align: center;
  font-size: 11px;
  color: #222;
  padding-top: 3px;
  padding-bottom: 4px;
  text-transform: capitalize;
}

.vc-sketch-field--single {
  flex: 1;
  padding-left: 6px;
}

.vc-sketch-field--double {
  flex: 2;
}

.vc-sketch-presets {
  margin-right: -10px;
  margin-left: -10px;
  padding-left: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.vc-sketch-presets-color {
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin: 0 10px 10px 0;
  vertical-align: top;
  cursor: pointer;
  width: 16px;
  height: 16px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);
}

.vc-sketch-presets-color .vc-checkerboard {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);
  border-radius: 3px;
}

.vc-sketch__disable-alpha .vc-sketch-color-wrap {
  height: 10px;
}
</style>
