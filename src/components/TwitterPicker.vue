<template>
  <div
    :class="['vc-twitter-picker', {
      'tri_hide': props.triangle === 'hide',
      'tri_top_left': props.triangle === 'top-left',
      'tri_top_right': props.triangle === 'top-right',
    }]"
    :style="{
      width: typeof props.width === 'number' ? `${props.width}px` : props.width
    }"
    role="application"
    aria-label="Twitter color picker"
  >
    <div class="triangle_shadow"></div>
    <div class="triangle"></div>

    <div class="body" role="listbox" tabindex="0" aria-label="Select a color">
      <span
        v-for="(color, index) in presetColors"
        :key="index"
        class="swatch"
          :style="{
          background: color,
          boxShadow: `0 0 4px ${equal(color) ? color : 'transparent'}`,
        }"
        @click="handlerClick(color)"
        role="option"
        :aria-label="'color:' + color"
        :title="color"
        :aria-selected="equal(color)"
        @keydown.space="handlerClick(color)"
        tabindex="0"
      >
      </span>
      <div class="hash" aria-hidden="true">#</div>
      <HexInput :value="hex" @change="inputChange"></HexInput>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script lang="ts">
const defaultColors = [
  '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3',
  '#EB144C', '#F78DA7', '#9900EF'
]
</script>

<script setup lang="ts">
import tinycolor from 'tinycolor2';
import { computed } from 'vue';
import HexInput from './common/HexInput.vue';
import { defineColorModel, EmitEventNames } from '../composable/colorModel';

type Props = {
  /**
   * Width of the picker container.
   * Can be a number (in pixels) or a string with CSS units (e.g., "100%", "300px").
   * Defaults to 276.
   */
  width?: number | string;
  /**
   * List of preset color swatches to display.
   * Each color should be a valid hex string (e.g., "#FF6900").
   * Defaults to a curated Twitter-style palette.
   */
  presetColors?: string[];
  /**
   * Position of the decorative triangle at the top of the picker.
   * Can be `'top-left'`, `'top-right'`, or `'hide'`.
   * Defaults to `'top-left'`.
   */
  triangle?: 'hide' | 'top-left' | 'top-right';

  /**
   * Used with `v-model:tinyColor`. Accepts any valid TinyColor input format.
   */
  tinyColor?: tinycolor.ColorInput;
  /**
   * Used with `v-model`. Accepts any valid TinyColor input format.
   */
  modelValue?: tinycolor.ColorInput;
  /**
   * Fallback for `v-model` compatibility in Vue 2.7.
   * Accepts any valid TinyColor input.
   */
  value?: tinycolor.ColorInput;
};

const props = withDefaults(defineProps<Props>(), {
  width: 276,
  presetColors: () => defaultColors,
  triangle: 'top-left'
});
const emit = defineEmits(EmitEventNames);

const tinyColorRef = defineColorModel(props, emit);

const hex = computed(()=>tinyColorRef.value.toHexString());

const equal = (color: string) => {
  return color.toLowerCase() === hex.value.toLowerCase();
}

const handlerClick = (color: string) => {
  tinyColorRef.value = color;
}

const inputChange = (hex: string) => {
  tinyColorRef.value = hex;
}
</script>

<style scoped>
.vc-twitter-picker {
  position: relative;
  background: var(--vc-body-bg);
  border: 0 solid rgba(0, 0, 0, 0.25);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}

.triangle {
  position: absolute;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0 9px 10px 9px;
  border-color: transparent transparent var(--vc-body-bg) transparent;
}

.triangle_shadow {
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0 9px 10px 9px;
  border-color: transparent transparent rgba(0, 0, 0, .1) transparent;
  position: absolute;
}

.body {
  padding: 15px 9px 9px 15px;
}

.vc-twitter-picker :deep(.vc-editable-input) {
  position: relative;
}

.vc-twitter-picker :deep(.vc-input-input) {
  float: left;
  width: 100px;
  height: 28px;
  padding: 1px;
  padding-left: 8px;
  outline: none;
  box-shadow: inset 0 0 0 1px var(--vc-twitter-input-border);
  box-sizing: content-box;
  border: 0px;
  border-radius: 0 4px 4px 0;
  background-color: var(--vc-twitter-input-bg);
  color: var(--vc-twitter-input-color);
  font-size: 14px;
}

.vc-twitter-picker :deep(.vc-editable-input) span {
  display: none;
}

.hash {
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 4px 0 0 4px;
  background: var(--vc-twitter-hash-bg);
  color: var(--vc-twitter-hash-color);
}

.swatch {
  width: 30px;
  height: 30px;
  float: left;
  border-radius: 4px;
  margin: 0 6px 6px 0;
  cursor: pointer;
  position: relative;
  outline: none;
}

.clear {
  clear: both;
}

.tri_hide .triangle {
  display: none;
}

.tri_hide .triangle_shadow {
  display: none;
}

.tri_top_left .triangle {
  top: -10px;
  left: 12px;
}

.tri_top_left .triangle_shadow {
  top: -11px;
  left: 12px;
}

.tri_top_right .triangle {
  top: -10px;
  right: 12px;
}

.tri_top_right .triangle_shadow {
  top: -11px;
  right: 12px;
}
</style>
