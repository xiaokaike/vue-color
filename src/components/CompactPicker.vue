<template>
  <div class="vc-compact-picker" role="application" aria-label="Compact color picker" tabindex="0">
    <ul class="colors" role="listbox" aria-label="Pick a color">
      <li
        v-for="c in props.palette"
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
const defaultColors: string[] = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
  '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
  '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400',
  '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
  '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
  '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
];
</script>

<script setup lang="ts">
import tinycolor from 'tinycolor2';
import { computed } from 'vue';
import { defineColorModel, EmitEventNames } from '../composable/colorModel.ts';

type Props = {
  /**
   * The list of colors displayed in the compact color palette.
   * Defaults to a 40-color swatch commonly used in design tools.
   */
  palette?: string[],
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
.vc-compact-picker {
  width: 245px;
  padding-top: 5px;
  padding-left: 5px;
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
