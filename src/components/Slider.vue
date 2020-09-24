<template>
  <div role="application" aria-label="Slider color picker" class="vc-slider">
    <div class="vc-slider-hue-warp">
      <hue v-model="colors" @change="hueChange"></hue>
    </div>
    <div class="vc-slider-swatches" role="group">
      <div class="vc-slider-swatch" v-for="(offset, index) in swatches" :key="index" :data-index="index"
        :aria-label="'color:' + colors.hex"
        role="button"
        @click="handleSwClick(index, offset)">
        <div
          class="vc-slider-swatch-picker"
          :class="{'vc-slider-swatch-picker--active': isActiveOffset(offset), 'vc-slider-swatch-picker--white': offset.l === 1}"
          :style="{background: 'hsl(' + colors.hsl.h + ', ' + offset.s * 100 + '%, ' + offset.l * 100 + '%)'}"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import colorMixin from '../mixin/color'
import hue from './common/Hue.vue'

export default {
  name: 'Slider',
  mixins: [colorMixin],
  props: {
    swatches: {
      type: Array,
      default () {
        return [
          { s: 0.5, l: 0.8 },
          { s: 0.5, l: 0.65 },
          { s: 0.5, l: 0.5 },
          { s: 0.5, l: 0.35 },
          { s: 0.5, l: 0.2 }
        ]
      }
    }
  },
  components: {
    hue
  },
  methods: {
    isActiveOffset (offset) {
      const hsl = this.colors.hsl
      return (
        Math.abs(hsl.l - offset.l) < 0.01 && Math.abs(hsl.s - offset.s) < 0.01
      )
    },
    hueChange (data) {
      this.colorChange(data)
    },
    handleSwClick (index, offset) {
      this.colorChange({
        h: this.colors.hsl.h,
        s: offset.s,
        l: offset.l,
        source: 'hsl'
      })
    }
  }
}
</script>

<style>
.vc-slider {
  position: relative;
  width: 410px;
}
.vc-slider-hue-warp {
  height: 12px;
  position: relative;
}
.vc-slider-hue-warp .vc-hue-picker {
  width: 14px;
  height: 14px;
  border-radius: 6px;
  transform: translate(-7px, -2px);
  background-color: rgb(248, 248, 248);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
}
.vc-slider-swatches {
  display: flex;
  margin-top: 20px;
}
.vc-slider-swatch {
  margin-right: 1px;
  flex: 1;
  width: 20%;
}
.vc-slider-swatch:first-child {
  margin-right: 1px;
}
.vc-slider-swatch:first-child .vc-slider-swatch-picker {
  border-radius: 2px 0px 0px 2px;
}
.vc-slider-swatch:last-child {
  margin-right: 0;
}
.vc-slider-swatch:last-child .vc-slider-swatch-picker {
  border-radius: 0px 2px 2px 0px;
}
.vc-slider-swatch-picker {
  cursor: pointer;
  height: 12px;
}
.vc-slider-swatch:nth-child(n) .vc-slider-swatch-picker.vc-slider-swatch-picker--active {
  transform: scaleY(1.8);
  border-radius: 3.6px/2px;
}
.vc-slider-swatch-picker--white {
  box-shadow: inset 0 0 0 1px #ddd;
}
.vc-slider-swatch-picker--active.vc-slider-swatch-picker--white {
  box-shadow: inset 0 0 0 0.6px #ddd;
}
</style>
