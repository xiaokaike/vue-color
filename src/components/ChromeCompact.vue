<template>
  <div class="vue-color__chrome">
    <div class="vue-color__chrome__saturation-wrap">
      <saturation v-model="colors" @change="childChange" @change-ended="changeEnded"></saturation>
    </div>
    <div class="vue-color__chrome__chrome-body">
      <div class="vue-color__chrome__controls">
        <div class="vue-color__chrome__color-wrap">
          <div class="vue-color__chrome__active-color" :style="{background: activeColor}"></div>
        </div>

        <div class="vue-color__chrome__sliders">
          <div class="vue-color__chrome__hue-wrap">
            <hue v-model="colors" @change="childChange" @change-ended="changeEnded"></hue>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colorMixin from '../mixin/color'
import saturation from './common/Saturation.vue'
import hue from './common/Hue.vue'

export default {
  name: 'ChromeCompact',
  mixins: [colorMixin],
  components: {
    saturation,
    hue
  },
  data () {
    return {
      fields: ['hex', 'rgba', 'hsla'],
      fieldsIndex: 0,
      highlight: false
    }
  },
  computed: {
    activeColor () {
      var rgba = this.colors.rgba
      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
    }
  },
  methods: {
    handlePreset (c) {
      this.colorChange({
        hex: c,
        source: 'hex'
      })
    },
    childChange (data) {
      this.colorChange(data)
    },
    changeEnded (data) {
      this.colorChange(data)
      this.$emit('change-ended', this.val.hex)
    }
  }
}
</script>

<style lang="stylus">
.vue-color__chrome
  background #fff
  border-radius 2px
  box-shadow 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3)
  box-sizing initial
  width 225px
  font-family Menlo
  background-color #fff
.vue-color__chrome__controls
  display flex
.vue-color__chrome__color-wrap
  width 32px
.vue-color__chrome__active-color
  margin-top 6px
  width 16px
  height 16px
  border-radius 8px
  position relative
  overflow hidden
.vue-color__chrome__sliders
  flex 1
  .vue-color__c-hue
  .vue-color__c-alpha__gradient
    border-radius 2px
  .vue-color__c-alpha__picker,
  .vue-color__c-hue__picker
    width 12px
    height 12px
    border-radius 6px
    transform translate(-6px, -2px)
    background-color rgb(248, 248, 248)
    box-shadow 0 1px 4px 0 rgba(0, 0, 0, 0.37)
.vue-color__chrome__hue-wrap
  position relative
  height 10px
  margin-bottom 8px
.vue-color__chrome__chrome-body
  padding 16px 16px 12px
  background-color #fff
.vue-color__chrome__saturation-wrap
  width 100%
  padding-bottom 55%
  position relative
  border-radius 2px 2px 0 0
  overflow hidden
  .vue-color__saturation--circle
    width 12px
    height 12px
</style>