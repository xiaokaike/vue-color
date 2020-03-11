<template>
  <div
    role="GrayscaleColorPicker"
    class="vc-grayscale"
  >
    <ul
      role="option"
      class="vc-grayscale-colors"
    >
      <li
        v-for="c in palette"
        :key="c"
        :aria-label="'Color:' + c"
        class="vc-grayscale-color-item"
        :class="{'vc-grayscale-color-item--white': c == '#FFFFFF'}"
        :style="{background: c}"
        @click="handlerClick(c)"
      >
        <div
          v-show="equals(c)"
          class="vc-grayscale-dot"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Color from '../mixin/color';

const defaultPalatte = [
  '#FFFFFF', '#F2F2F2', '#E6E6E6', '#D9D9D9', '#CCCCCC', '#BFBFBF', '#B3B3B3',
  '#A6A6A6', '#999999', '#8C8C8C', '#808080', '#737373', '#666666', '#595959',
  '#4D4D4D', '#404040', '#333333', '#262626', '#0D0D0D', '#000000'
]

@Component
export default class Grayscale extends mixins(Color) {
  @Prop({default: () => defaultPalatte})
  readonly palette!: string[][];

  get pick() {
    return this.tc.toHexString();
  }

  handlerClick(value: string) {
    this.onColorChange(value);
  }
}

</script>

<style>
.vc-grayscale {
  width: 125px;
  border-radius: 2px;
  box-shadow: 0 2px 15px rgba(0,0,0,.12), 0 2px 10px rgba(0,0,0,.16);
  background-color: #fff;
}
.vc-grayscale-colors {
  border-radius: 2px;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.vc-grayscale-color-item {
  list-style: none;
  width: 25px;
  height: 25px;
  float: left;
  position: relative;
  cursor: pointer;
}
.vc-grayscale-color-item--white .vc-grayscale-dot {
  background: #000;
}

.vc-grayscale-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -2px;
  border-radius: 50%;
  opacity: 1;
  background: #fff;
}
</style>
