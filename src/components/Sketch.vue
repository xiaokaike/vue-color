<template>
  <div
    role="SketchColorPicker"
    :class="['vc-sketch', disableAlpha ? 'vc-sketch__disable-alpha' : '']"
  >
    <div class="vc-sketch-saturation-wrap">
      <Saturation
        :value="tc"
        @change="onColorChange"
      />
    </div>
    <div class="vc-sketch-controls">
      <div class="vc-sketch-sliders">
        <div class="vc-sketch-hue-wrap">
          <Hue
            :value="tc"
            @change="onColorChange"
          />
        </div>
        <div
          v-if="!disableAlpha"
          class="vc-sketch-alpha-wrap"
        >
          <Alpha
            :value="tc"
            @change="onAlphaChange"
          />
        </div>
      </div>
      <div class="vc-sketch-color-wrap">
        <div
          :aria-label = "`Currentcolor: ${tc.toRgbString()}`"
          class="vc-sketch-active-color"
          :style="{background: tc.toRgbString()}"
        />
        <Checkboard />
      </div>
    </div>
    <div
      v-if="!disableFields"
      class="vc-sketch-field"
    >
      <!-- rgba -->
      <div class="vc-sketch-field--double">
        <EditableInput
          label="hex"
          :value="hex"
          @change="onColorChange"
        />
      </div>
      <div class="vc-sketch-field--single">
        <EditableInput
          label="r"
          :value="rgba.r"
          @change="onInputChange('r', $event)"
        />
      </div>
      <div class="vc-sketch-field--single">
        <EditableInput
          label="g"
          :value="rgba.g"
          @change="onInputChange('r', $event)"
        />
      </div>
      <div class="vc-sketch-field--single">
        <EditableInput
          label="b"
          :value="rgba.b"
          @change="onInputChange('r', $event)"
        />
      </div>
      <div
        v-if="!disableAlpha"
        class="vc-sketch-field--single"
      >
        <EditableInput
          label="a"
          :value="rgba.a"
          :step="0.01"
          @change="onInputChange('r', $event)"
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
          @click="onColorChange(c)"
        />
        <div
          v-else
          :key="c"
          :aria-label="'Color:' + c"
          class="vc-sketch-presets-color"
          @click="onColorChange(c)"
        >
          <checkboard />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Color from '../common/ColorMixin';
import { hasAlpha, isTransparent } from '../utils';

import EditableInput from './common/EditableInput.vue'
import Saturation from './common/Saturation.vue'
import Hue from './common/Hue.vue'
import Alpha from './common/Alpha.vue'
import Checkboard from './common/Checkboard.vue'

const presetColors = [
  '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
  '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',
  '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
  'rgba(0,0,0,0)'
];

@Component({
  components: {EditableInput, Saturation, Hue, Alpha, Checkboard}
})
export default class Sketch extends mixins(Color) {
  @Prop({default: () => presetColors})
  presetColors!: string[];

  @Prop({default: false})
  disableAlpha!: boolean;

  @Prop({default: false})
  disableFields!: boolean;

  get hex() {
    if (hasAlpha(this.tc)) {
      return this.tc.toHex8();
    } else {
      return this.tc.toHex();
    }
  }

  get rgba() {
    return this.tc.toRgb();
  }

  isTransparent = isTransparent;

  onAlphaChange(color: string) {
    if (hasAlpha(color)  && this.getOutputFormat() === 'hex') {
      this.setOutputFormat('hex8')
    }
    this.onColorChange(color);
  }

  onInputChange(label: 'r' | 'g' | 'b' | 'a', value: string) {
    this.onColorChange({
      ...this.rgba,
      [label]: value
    })
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
