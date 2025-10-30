<template>
  <div role="application" aria-label="Material color inputs" class="vc-material-picker">
    <HexInput class="hex" label="hex" :value="tinyColorRef.toHexString()"
      :style="{ borderColor: tinyColorRef.toHexString() }" @change="onHexChange" :with-hash="true"></HexInput>

    <div class="rgb">
      <div class="color">
        <EdIn label="r" :value="rgb.r" @change="(v) => onChange('r', v)" :a11y="{label: 'Red'}"></EdIn>
      </div>
      <div class="color">
        <EdIn label="g" :value="rgb.g" @change="(v) => onChange('g', v)" :a11y="{label: 'Green'}"></EdIn>
      </div>
      <div class="color">
        <EdIn label="b" :value="rgb.b" @change="(v) => onChange('b', v)" :a11y="{label: 'Blue'}"></EdIn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import tinycolor from 'tinycolor2';
import { computed } from 'vue';
import EdIn from './common/EditableInput.vue';
import HexInput from './common/HexInput.vue';
import { defineColorModel, EmitEventNames } from '../composable/colorModel.ts';

type Props = {
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
}
const props = defineProps<Props>();
const emit = defineEmits(EmitEventNames);

const tinyColorRef = defineColorModel(props, emit);

const rgb = computed(() => tinyColorRef.value.toRgb());

function onHexChange(hex: string) {
  tinyColorRef.value = hex;
}

function onChange(key: 'r' | 'g' | 'b', value: number) {
  tinyColorRef.value = {
    ...rgb.value,
    [key]: value
  };
}
</script>

<style scoped>
.vc-material-picker {
  position: relative;
  width: 98px;
  height: 98px;
  padding: 16px;
  border-radius: 2px;
  box-shadow:
  0 2px 10px rgba(0, 0, 0, 0.12),
  0 2px 5px rgba(0, 0, 0, 0.16);
  background-color: var(--vc-body-bg);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
}

.vc-material-picker :deep(.vc-input-input) {
  width: 100%;
  height: 30px;
  margin-top: 12px;
  background-color: var(--vc-body-bg);
  color: var(--vc-input-text);
  font-size: 15px;
}

.vc-material-picker :deep(.vc-input-label) {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 11px;
  color: var(--vc-input-label);
}

.hex {
  border-bottom-width: 2px;
  border-bottom-style: solid;
}
.rgb {
  display: flex;
  margin-right: -10px;
  padding-top: 11px;
}
.color {
  flex: 1;
  padding-right: 10px;
}
</style>