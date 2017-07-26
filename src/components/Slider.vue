<template>
  <div class="c-slider">
    <div class="hue-warp">
      <hue v-model="colors" @change="hueChange"></hue>
    </div>
    <div class="swatches">
      <div class="swatch" v-for="(offset, index) in swatches" :data-index="index"
        @click="handleSwClick(index, offset)">
        <div class="swatch-picker"
        :class="{'swatch-picker--active': offset == activeOffset}"
        :style="{background: 'hsl(' + colors.hsl.h + ', 50%, ' + (offset * 100) + '%)'}"
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
    direction: String
  },
  components: {
    hue
  },
  computed: {
    activeOffset () {
      if (Math.round(this.colors.hsl.s * 100) / 100 === 0.50) {
        return Math.round(this.colors.hsl.l * 100) / 100
      }
      return 0
    }
  },
  data () {
    return {
      swatches: ['.80', '.65', '.50', '.35', '.20']
    }
  },
  methods: {
    hueChange (data) {
      this.colorChange(data)
    },
    handleSwClick (index, offset) {
      this.colorChange({
        h: this.colors.hsl.h,
        s: 0.5,
        l: offset,
        source: 'hsl'
      })
    }
  }
}
</script>

<style scoped>
.c-slider {
  position: relative;
  width: 410px;
}
.hue-warp {
  height: 12px;
  position: relative;
}
 .hue-warp >>> .picker {
  width: 14px;
  height: 14px;
  border-radius: 6px;
  transform: translate(-7px, -2px);
  background-color: rgb(248, 248, 248);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
} 
.swatches {
  display: flex;
  margin-top: 20px;
}
.swatch {
  margin-right: 1px;
  flex: 1;
  width: 20%;
}
.swatch:first-child {
  margin-right: 1px;
}
.swatch:first-child .swatch-picker {
  border-radius: 2px 0px 0px 2px;
}
.swatch:last-child {
  margin-right: 0;
}
.swatch:last-child .swatch-picker {
  border-radius: 0px 2px 2px 0px;
}
.swatch-picker {
  cursor: pointer;
  height: 12px;
}
.swatch-picker--active {
  transform: scaleY(1.8);
  border-radius: 3.6px/2px;
}
</style>
