<template>
  <div
    role="ChromeColorPicker"
    :class="['vc-chrome', disableAlpha ? 'vc-chrome__disable-alpha' : '']"
  >
    <div class="vc-chrome-saturation-wrap">
      <Saturation :value="tc" @change="onColorChange" />
    </div>
    <div class="vc-chrome-body">
      <div class="vc-chrome-controls">
        <div class="vc-chrome-color-wrap">
          <div
            class="vc-chrome-active-color"
            :style="{background: tc.toRgbString()}"
          />
          <Checkboard v-if="!disableAlpha" />
        </div>

        <div class="vc-chrome-sliders">
          <div class="vc-chrome-hue-wrap">
            <Hue :value="tc" @change="onColorChange" />
          </div>
          <div
            v-if="!disableAlpha"
            class="vc-chrome-alpha-wrap"
          >
            <Alpha :value="tc" @change="onAlphaChange" />
          </div>
        </div>
      </div>

      <div
        v-if="!disableFields"
        class="vc-chrome-fields-wrap"
      >
        <div
          v-show="fieldsIndex === 0"
          class="vc-chrome-fields"
        >
          <!-- hex -->
          <div class="vc-chrome-field">
            <EditableInput
              v-if="!hasAlpha"
              label="hex"
              :value="tc.toHexString()"
              @change="onColorChange"
            />
            <EditableInput
              v-if="hasAlpha"
              label="hex"
              :value="tc.toHex8String()"
              @change="onColorChange"
            />
          </div>
        </div>
        <div
          v-show="fieldsIndex === 1"
          class="vc-chrome-fields"
        >
          <!-- rgba -->
          <div class="vc-chrome-field">
            <EditableInput
              label="r"
              :value="rgba.r"
              @change="inputChange('r', $event)"
            />
          </div>
          <div class="vc-chrome-field">
            <EditableInput
              label="g"
              :value="rgba.g"
              @change="inputChange('g', $event)"
            />
          </div>
          <div class="vc-chrome-field">
            <EditableInput
              label="b"
              :value="rgba.b"
              @change="inputChange('b', $event)"
            />
          </div>
          <div
            v-if="!disableAlpha"
            class="vc-chrome-field"
          >
            <EditableInput
              label="a"
              :value="rgba.a"
              :step="0.01"
              @change="inputChange('a', $event)"
            />
          </div>
        </div>
        <div
          v-show="fieldsIndex === 2"
          class="vc-chrome-fields"
        >
          <!-- hsla -->
          <div class="vc-chrome-field">
            <EditableInput
              label="h"
              :value="hsl.h"
              @change="inputChange('h', $event)"
            />
          </div>
          <div class="vc-chrome-field">
            <EditableInput
              label="s"
              :value="`${(hsl.s * 100).toFixed()}%`"
              @change="inputChange('s', $event)"
            />
          </div>
          <div class="vc-chrome-field">
            <EditableInput
              label="l"
              :value="`${(hsl.l * 100).toFixed()}%`"
              @change="inputChange('l', $event)"
            />
          </div>
          <div
            v-if="!disableAlpha"
            class="vc-chrome-field"
          >
            <EditableInput
              label="a"
              :value="hsl.a"
              :step="0.01"
              @change="inputChange('a', $event)"
            />
          </div>
        </div>
        <!-- btn -->
        <div
          class="vc-chrome-toggle-btn"
          role="button"
          aria-label="Change another color definition"
          @click="toggleViews"
        >
          <div class="vc-chrome-toggle-icon">
            <svg
              style="width:24px; height:24px"
              viewBox="0 0 24 24"
              @mouseover="showHighlight"
              @mouseenter="showHighlight"
              @mouseout="hideHighlight"
            >
              <path
                fill="#333"
                d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
              />
            </svg>
          </div>
          <div
            v-show="highlight"
            class="vc-chrome-toggle-icon-highlight"
          />
        </div>
        <!-- btn -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Color from '../common/ColorMixin';
import { hasAlpha } from '../utils';

import EditableInput from './common/EditableInput.vue';
import Saturation from './common/Saturation.vue';
import Hue from './common/Hue.vue';
import Alpha from './common/Alpha.vue';
import Checkboard from './common/Checkboard.vue';

@Component({
  components: { EditableInput, Saturation, Hue, Alpha, Checkboard }
})
export default class Chrome extends mixins(Color) {
  @Prop({ default: false })
  disableAlpha !: boolean;

  @Prop({ default: false })
  disableFields !: boolean;

  fieldsIndex = 0;
  highlight = false;

  get rgba () {
    return this.tc.toRgb();
  }

  get hsl () {
    return this.tc.toHsl();
  }

  get hasAlpha () {
    return this.tc.getAlpha() < 1;
  }

  toggleViews () {
    if (this.fieldsIndex >= 2) {
      this.fieldsIndex = 0;
      return;
    }
    this.fieldsIndex++;
  }

  // TODO: use css instead ?
  showHighlight () {
    this.highlight = true;
  }

  hideHighlight () {
    this.highlight = false;
  }

  onAlphaChange (color: string) {
    if (hasAlpha(color) && this.getOutputFormat() === 'hex') {
      this.setOutputFormat('hex8');
    }
    this.onColorChange(color);
  }

  inputChange (label: 'r' | 'g' | 'b' | 'a' | 'h' | 's' | 'l', value: string | number) {
    if (label === 'r' || label === 'g' || label === 'b') {
      this.onColorChange({
        ...this.rgba,
        [label]: value
      });
    }
    if (label === 'h' || label === 's' || label === 'l') {
      this.onColorChange({
        ...this.hsl,
        [label]: value
      });
    }
    if (label === 'a') {
      this.onColorChange(this.tc.setAlpha(+value));
    }
  }
}
</script>

<style>
.vc-chrome {
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);
  box-sizing: initial;
  width: 225px;
  font-family: Menlo;
  background-color: #fff;
}
.vc-chrome-controls {
  display: flex;
}
.vc-chrome-color-wrap {
  position: relative;
  width: 36px;
}
.vc-chrome-active-color {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  z-index: 1;
}
.vc-chrome-color-wrap .vc-checkerboard {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-size: auto;
}
.vc-chrome-sliders {
  flex: 1;
}
.vc-chrome-fields-wrap {
  display: flex;
  padding-top: 16px;
}
.vc-chrome-fields {
  display: flex;
  margin-left: -6px;
  flex: 1;
}
.vc-chrome-field {
  padding-left: 6px;
  width: 100%;
}
.vc-chrome-toggle-btn {
  width: 32px;
  text-align: right;
  position: relative;
}
.vc-chrome-toggle-icon {
  margin-right: -4px;
  margin-top: 12px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
.vc-chrome-toggle-icon-highlight {
  position: absolute;
  width: 24px;
  height: 28px;
  background: #eee;
  border-radius: 4px;
  top: 10px;
  left: 12px;
}
.vc-chrome-hue-wrap {
  position: relative;
  height: 10px;
  margin-bottom: 8px;
}
.vc-chrome-alpha-wrap {
  position: relative;
  height: 10px;
}
.vc-chrome-hue-wrap .vc-hue {
  border-radius: 2px;
}
.vc-chrome-alpha-wrap .vc-alpha-gradient {
  border-radius: 2px;
}
.vc-chrome-hue-wrap .vc-hue-picker, .vc-chrome-alpha-wrap .vc-alpha-picker {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  transform: translate(-6px, -2px);
  background-color: rgb(248, 248, 248);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
}
.vc-chrome-body {
  padding: 16px 16px 12px;
  background-color: #fff;
}
.vc-chrome-saturation-wrap {
  width: 100%;
  padding-bottom: 55%;
  position: relative;
  border-radius: 2px 2px 0 0;
  overflow: hidden;
}
.vc-chrome-saturation-wrap .vc-saturation-circle {
  width: 12px;
  height: 12px;
}

.vc-chrome-fields .vc-input__input {
  font-size: 11px;
  color: #333;
  width: 100%;
  border-radius: 2px;
  border: none;
  box-shadow: inset 0 0 0 1px #dadada;
  height: 21px;
  text-align: center;
}
.vc-chrome-fields .vc-input__label {
  text-transform: uppercase;
  font-size: 11px;
  line-height: 11px;
  color: #969696;
  text-align: center;
  display: block;
  margin-top: 12px;
}

.vc-chrome__disable-alpha .vc-chrome-active-color {
  width: 18px;
  height: 18px;
}
.vc-chrome__disable-alpha .vc-chrome-color-wrap {
  width: 30px;
}
.vc-chrome__disable-alpha .vc-chrome-hue-wrap {
  margin-top: 4px;
  margin-bottom: 4px;
}
</style>
