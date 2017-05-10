<template>
  <div class="vue-color__slider">
    <div class="vue-color__slider__hue-warp">
      <hue v-model="colors" @change="hueChange"></hue>
    </div>
    <div class="vue-color__slider__swatches">
      <div class="vue-color__slider__swatch" v-for="(offset, index) in swatches" :data-index="index"
        @click="handleSwClick(index, offset)">
        <div class="vue-color__slider__swatch-picker"
        :class="{'vue-color__slider__swatch-picker--active': offset == activeOffset}"
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

<style lang="stylus">
.vue-color__slider
  position relative
  width 410px
.vue-color__slider__hue-warp
  height 12px
  position relative
  .vue-color__c-hue__picker
    width 14px
    height 14px
    border-radius 6px
    transform translate(-7px, -2px)
    background-color rgb(248, 248, 248)
    box-shadow 0 1px 4px 0 rgba(0, 0, 0, 0.37)
.vue-color__slider__swatches
  display flex
  margin-top 20px
.vue-color__slider__swatch
  margin-right 1px
  flex 1
  width 20%
  &:first-child
    margin-right 1px
    .vue-color__slider__swatch-picker
      border-radius 2px 0px 0px 2px
  &:last-child
    margin-right 0
    .vue-color__slider__swatch-picker
      border-radius 0px 2px 2px 0px
.vue-color__slider__swatch-picker
  cursor pointer
  height 12px
.vue-color__slider__swatch-picker--active
  transform scaleY(1.8)
  border-radius: 3.6px/2px
</style>
