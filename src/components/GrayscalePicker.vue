<template>
  <div role="application" aria-label="Grayscale color picker" class="vc-grayscale-picker">
    <ul class="colors" role="listbox" aria-label="Select a grayscale color" tabindex="0">
      <li
        v-for="c in palette"
        :key="c"
        :class="{'color-item_white': c === '#FFFFFF', 'color-item': true }"
        :style="{background: c}"
        @click="handlerClick(c)"
        role="option"
        :aria-label="'color:' + c"
        :aria-selected="c.toUpperCase() === pick"
        :title="c"
        @keydown.space="handlerClick(c)"
        tabindex="0"
      >
        <div class="dot" v-show="c.toUpperCase() === pick"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
const defaultColors = [
  '#FFFFFF', '#F2F2F2', '#E6E6E6', '#D9D9D9', '#CCCCCC', '#BFBFBF', '#B3B3B3',
  '#A6A6A6', '#999999', '#8C8C8C', '#808080', '#737373', '#666666', '#595959',
  '#4D4D4D', '#404040', '#333333', '#262626', '#0D0D0D', '#000000'
]
</script>

<script setup lang="ts">
import tinycolor from 'tinycolor2';
import { computed } from 'vue';
import { defineColorModel, EmitEventNames } from '../composable/colorModel.ts';

type Props = {
  /**
   * The list of grayscale colors displayed in the picker.
   * Defaults to a 20-step grayscale palette from white to black.
   */
  palette?: string[];
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
  palette: () => defaultColors
});

const emit = defineEmits(['change'].concat(EmitEventNames));

const tinyColorRef = defineColorModel(props, emit);

const pick = computed(() => {
  return tinyColorRef.value.toHexString().toUpperCase();
});

const handlerClick = (hex: string) => {
  tinyColorRef.value = hex;
}
</script>

<style scoped>
.vc-grayscale-picker {
  padding-top: 5px;
  padding-left: 5px;
  width: 245px;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.12),
    0 2px 5px rgba(0, 0, 0, 0.16);
  background-color: var(--vc-body-bg);
}
.colors {
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.color-item {
  list-style: none;
  width: 15px;
  height: 15px;
  float: left;
  margin-right: 5px;
  margin-bottom: 5px;
  position: relative;
  cursor: pointer;
}
.color-item_white {
  box-shadow: inset 0 0 0 1px #ddd;
}
.color-item_white .dot {
  background: #000;
}

.dot {
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  border-radius: 50%;
  opacity: 1;
  background: #fff;
}
</style>