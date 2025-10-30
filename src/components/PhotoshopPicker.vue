<template>
  <div role="application" aria-label="PhotoShop color picker" :class="['vc-photoshop-picker', disableFields ? 'fields_disabled' : '']">
    <div class="title" aria-hidden="true">{{title}}</div>
    <div class="body">
      <div class="saturation">
        <Saturation v-model:tinyColor="tinyColorRef" :hue="hueRef"></Saturation>
      </div>
      <div class="hue">
        <Hue direction="vertical" :modelValue="hueRef" @update:modelValue="updateHueRef">
          <div class="hue-picker">
            <i class="hue-picker-left"></i><i class="hue-picker-right"></i>
          </div>
        </Hue>
      </div>
      <div :class="['controls', disableFields ? 'controls_fields_disabled' : '']">
        <div class="preview">
          <div class="preview-label" aria-hidden="true">{{ newLabel }}</div>
          <div class="preview-swatches">
            <div class="preview-color" :aria-label="`New color is #${hex}`" :style="{background: `#${hex}`}"></div>
            <div
              class="preview-color"
              :style="{background: currentColorRef}"
              @click="clickCurrentColor"
              role="button"
              :aria-label="`Current color is ${currentColorRef}`"
              @keydown.space="clickCurrentColor"
              tabindex="0"
            ></div>
          </div>
          <div class="preview-label" aria-hidden="true">{{ currentLabel }}</div>
        </div>
        <div class="actions" v-if="!disableFields">
          <div class="action-btn" role="button" aria-label="Click to apply new color" @click="handleOK" @keydown.space="clickCurrentColor" tabindex="0">{{ okLabel }}</div>
          <div class="action-btn" role="button" :aria-label="cancelLabel" @click="handleCancel" @keydown.space="clickCurrentColor" tabindex="0">{{ cancelLabel }}</div>

          <div class="fields">
            <!-- hsla -->
            <EdIn label="h" desc="°" :value="hsv.h.toFixed()" @change="(v) => inputChangeHSV('h', v)" :a11y="{label: 'Hue'}"></EdIn>
            <EdIn label="s" desc="%" :value="(hsv.s * 100).toFixed()" :min="0" :max="100" @change="(v) => inputChangeHSV('s', v)" :a11y="{label: 'Saturation'}"></EdIn>
            <EdIn label="v" desc="%" :value="(hsv.v * 100).toFixed()" :min="0" :max="100" @change="(v) => inputChangeHSV('v', v)" :a11y="{label: 'Value'}"></EdIn>
            <div class="fields-divider"></div>
            <!-- rgb -->
            <EdIn label="r" :value="rgb.r" @change="(v) => inputChangeRGBA('r', v)" :a11y="{label: 'Red'}"></EdIn>
            <EdIn label="g" :value="rgb.g" @change="(v) => inputChangeRGBA('g', v)" :a11y="{label: 'Green'}"></EdIn>
            <EdIn label="b" :value="rgb.b" @change="(v) => inputChangeRGBA('b', v)" :a11y="{label: 'Blue'}"></EdIn>
            <div class="fields-divider"></div>
            <!-- hex -->
            <HexInput label="#" class="hex" :value="hex" @change="inputChangeHex"></HexInput>
          </div>

          <div
            v-if="hasResetButton"
            class="action-btn"
            @click="handleReset"
            role="button"
            :aria-label="resetLabel"
            @keydown.space="handleReset"
            tabindex="0"
          >{{ resetLabel }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import tinycolor from 'tinycolor2';
import { ref, computed } from 'vue';
import EdIn from './common/EditableInput.vue';
import Saturation from './common/SaturationSlider.vue';
import Hue from './common/HueSlider.vue';
import HexInput from './common/HexInput.vue';

import { defineColorModel, EmitEventNames } from '../composable/colorModel.ts';
import { useHueRef } from '../composable/hue.ts';

type Props = {
  /**
   * Title text displayed at the top of the Photoshop color picker.
   * Defaults to "Color picker".
   */
  title?: string;
  /**
   * Whether to disable all manual color input fields (HSV, RGB, HEX).
   * When true, only the visual sliders are interactive.
   */
  disableFields?: boolean;
  /**
   * Whether to display a "Reset" button below the input fields.
   */
  hasResetButton?: boolean;
  /**
   * Label text for the "OK" button. Used to confirm color selection.
   */
  okLabel?: string;
  /**
   * Label text for the "Cancel" button. Used to revert color selection.
   */
  cancelLabel?: string;
  /**
   * Label text for the "Reset" button. Used to reset to the original color.
   */
  resetLabel?: string;
  /**
   * Label text displayed above the "new color" swatch preview.
   */
  newLabel?: string;
  /**
   * Label text displayed above the "current color" swatch preview.
   */
  currentLabel?: string;
  /**
   * The currently active color shown in the "current" swatch.
   * Clicking it will revert the selected color to this value.
   * Accepts any valid TinyColor-compatible color string (e.g., "#fff", "rgb(0,0,0)", etc.).
   */
  currentColor?: string;
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
  title: 'Color picker',
  disableFields: false,
  hasResetButton: false,
  okLabel: 'OK',
  cancelLabel: 'Cancel',
  resetLabel: 'Reset',
  newLabel: 'new',
  currentLabel: 'current',
  currentColor: '#fff'
});

const emit = defineEmits(EmitEventNames.concat(['ok', 'cancel', 'reset']));

const tinyColorRef = defineColorModel(props, emit);
const { hueRef, updateHueRef } = useHueRef(tinyColorRef);

const currentColorRef = ref(props.currentColor);

const hsv = computed(() => tinyColorRef.value.toHsv());
const hex = computed(() => {
  const hex = tinyColorRef.value.toHexString();
  return hex && hex.replace('#', '');
});
const rgb = computed(() => tinyColorRef.value.toRgb());

const clickCurrentColor = () => {
  tinyColorRef.value = currentColorRef.value;
}

const inputChangeHex = (data: string) => {
  tinyColorRef.value = data;
};

const inputChangeRGBA = (key: 'r' | 'g' | 'b', data?: number) => {
  if (!data || isNaN(Number(data))) {
    return;
  }
  const newValue = {[key]: data};
  tinyColorRef.value = {
    ...rgb.value,
    ...newValue,
  };
}

const inputChangeHSV = (key: 'h' | 's' | 'v', data?: string |  number) => {
  if (!data || isNaN(Number(data))) {
    return;
  }
  const newValue = {[key]: Number(data)};
  tinyColorRef.value = {
    ...hsv.value,
    ...newValue,
  };
}

const handleOK = () => {
  emit('ok');
};

const handleCancel = () => {
  emit('cancel');
};

const handleReset = () => {
  emit('reset');
};

</script>

<style scoped>
.vc-photoshop-picker {
  width: 513px;
  background: var(--vc-ps-bg);
  border-radius: 4px;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.25),
    0 8px 16px rgba(0, 0, 0, 0.15);
  box-sizing: initial;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
}
.fields_disabled {
  width: 390px;
}
.title {
  height: 23px;
  background-image: linear-gradient(-180deg, var(--vc-ps-title-bg-gradient-start) 0%, var(--vc-ps-title-bg-gradient-end) 100%);
  border-bottom: 1px solid var(--vc-ps-title-border);
  border-radius: 4px 4px 0 0;
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.02);
  color: var(--vc-ps-title-color);
  font-size: 13px;
  line-height: 24px;
  text-align: center;
}
.body {
  padding: 15px;
  display: flex;
}
.saturation {
  width: 256px;
  height: 256px;
  position: relative;
  border: 2px solid var(--vc-ps-slider-border);
  border-bottom: 2px solid var(--vc-ps-slider-border-bottom);
  overflow: hidden;
}
.saturation :deep(.picker) {
  width: 12px;
  height: 12px;
  transform: translate(-6px, -6px);
}
.hue {
  height: 256px;
  width: 19px;
  margin-left: 10px;
  border: 2px solid var(--vc-ps-slider-border);
  border-bottom: 2px solid var(--vc-ps-slider-border-bottom);
}
.hue-picker {
  position: relative;
}
.hue-picker-left,
.hue-picker-right {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 8px;
  border-color: transparent transparent transparent var(--vs-ps-picker-border-dark);
  cursor: pointer;
}
.hue-picker-left:after,
.hue-picker-right:after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 0 4px 6px;
  border-color: transparent transparent transparent var(--vs-ps-picker-border-white);
  position: absolute;
  top: 1px;
  left: 1px;
  transform: translate(-8px, -5px);
}
.hue-picker-left {
  transform: translate(-10px, -4px);
}
.hue-picker-right {
  transform: translate(21px, -4px) rotate(180deg);
}

.controls {
  width: 180px;
  margin-left: 10px;
  display: flex;
}
.controls_fields_disabled {
  width: auto;
}

.actions {
  margin-left: 20px;
  flex: 1;
}
.action-btn {
  height: 20px;
  margin-bottom: 10px;
  background-image: linear-gradient(-180deg, var(--vc-ps-btn-gradient-start) 0%, var(--vc-ps-btn-gradient-end) 100%);
  border: 1px solid var(--vc-ps-btn-border);
  border-radius: 2px;
  box-shadow: 0 1px 0 0 var(--vc-ps-btn-shadow);
  cursor: pointer;
  color: var(--vc-ps-btn-color);
  font-size: 14px;
  line-height: 20px;
  text-align: center;
}
.preview {
  width: 60px;
}
.preview-swatches {
  border: 1px solid var(--vc-ps-slider-border);
  border-bottom: 1px solid var(--vc-ps-slider-border-bottom);
  margin-bottom: 2px;
  margin-top: 1px;
}
.preview-color {
  height: 34px;
  box-shadow:
    inset 1px 0 var(--vc-ps-preview-border),
    inset -1px 0 var(--vc-ps-preview-border),
    inset 0 1px var(--vc-ps-preview-border);
}
.preview-label {
  color: var(--vc-ps-label);
  font-size: 14px;
  text-align: center;
}

.fields {
  padding-top: 5px;
  padding-bottom: 9px;
  width: 80px;
  position: relative;
}
.fields :deep(.vc-input-input) {
  width: 40%;
  height: 18px;
  margin-left: 40%;
  margin-right: 10px;
  margin-bottom: 5px;
  padding-left: 3px;
  border: 1px solid var(--vc-ps-input-border);
  box-shadow:
    inset 0 1px 1px var(--vc-ps-input-shadow-dark),
    0 1px 0 0 var(--vc-ps-input-shadow-light);
  background-color: var(--vc-input-bg);
  color: var(--vc-ps-label);
  font-size: 13px;
}
.fields :deep(.vc-input-label), .fields :deep(.vc-input-desc) {
  position: absolute;
  top: 0;
  height: 18px;
  color: var(--vc-ps-label);
  font-size: 13px;
  line-height: 22px;
  text-transform: uppercase;
}
.fields :deep(.vc-input-label) {
  left: 0;
  width: 34px;
}
.fields :deep(.vc-input-desc) {
  right: 0;
  width: 0;
}

.fields-divider {
  height: 5px;
}

.hex :deep(.vc-input-input) {
  width: 80%;
  height: 18px;
  margin-left: 20%;
  margin-bottom: 6px;
  padding-left: 3px;
  border: 1px solid var(--vc-ps-input-border);
  box-shadow:
    inset 0 1px 1px var(--vc-ps-input-shadow-dark),
    0 1px 0 0 var(--vc-ps-input-shadow-light);
  font-size: 13px;
}
.hex :deep(.vc-input-label) {
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  text-transform: uppercase;
  font-size: 13px;
  height: 18px;
  line-height: 22px;
}
</style>