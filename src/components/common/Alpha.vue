<template>
  <div class="vue-color__c-alpha">
    <div class="vue-color__c-alpha__checkboard-wrap">
      <checkboard></checkboard>
    </div>
    <div class="vue-color__c-alpha__gradient" :style="{background: gradientColor}"></div>
    <div class="vue-color__c-alpha__container" v-el:container
        @mousedown="handleMouseDown"
        @touchmove="handleChange"
        @touchstart="handleChange">
      <div class="vue-color__c-alpha__pointer" :style="{left: colors.a * 100 + '%'}">
        <slot><div class="vue-color__c-alpha__picker"></div></slot>
      </div>
    </div>
  </div>
</template>

<script>
import checkboard from './Checkboard.vue'

export default {
  name: 'Alpha',
  props: {
    colors: Object,
    onChange: Function
  },
  components: {
    checkboard
  },
  computed: {
    gradientColor () {
      var rgba = this.colors.rgba
      var rgbStr = [rgba.r, rgba.g, rgba.b].join(',')
      return 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)'
    }
  },
  methods: {
    handleChange (e, skip) {
      !skip && e.preventDefault()
      var container = this.$els.container
      var containerWidth = container.clientWidth
      var left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset)

      var a
      if (left < 0) {
        a = 0
      } else if (left > containerWidth) {
        a = 1
      } else {
        a = Math.round(left * 100 / containerWidth) / 100
      }

      if (this.colors.a !== a) {
        this.onChange({
          h: this.colors.hsl.h,
          s: this.colors.hsl.s,
          l: this.colors.hsl.l,
          a: a,
          source: 'rgba'
        })
      }
    },
    handleMouseDown (e) {
      this.handleChange(e, true)
      window.addEventListener('mousemove', this.handleChange)
      window.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseUp () {
      this.unbindEventListeners()
    },
    unbindEventListeners () {
      window.removeEventListener('mousemove', this.handleChange)
      window.removeEventListener('mouseup', this.handleMouseUp)
    }
  }
}

</script>

<style lang="stylus">
.vue-color__c-alpha
  position absolute
  top 0px
  right 0px
  bottom 0px
  left 0px
.vue-color__c-alpha__checkboard-wrap
  position absolute
  top 0px
  right 0px
  bottom 0px
  left 0px
  overflow hidden
.vue-color__c-alpha__gradient
  position absolute
  top 0px
  right 0px
  bottom 0px
  left 0px
.vue-color__c-alpha__container
  cursor pointer
  position relative
  z-index 2
  height 100%
  margin 0 3px
.vue-color__c-alpha__pointer
  z-index 2
  position absolute
.vue-color__c-alpha__picker
  cursor pointer
  width 4px
  border-radius 1px
  height 8px
  box-shadow 0 0 2px rgba(0, 0, 0, .6)
  background #fff
  margin-top 1px
  transform translateX(-2px)
</style>