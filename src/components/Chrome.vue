<template>
  <div class="c-chrome">
    
  </div>
</template>

<script>
import colorMixin from '../mixin/color'

export default {
  name: 'Chrome',
  mixins: [colorMixin],
  props: {
  },
  data () {
    return {
      
    }
  }

}
</script>

<style lang="stylus">
.c-chrome
  border 1px solid #000
  background #fff
  border-radius 2px
  box-shadow 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3)
  box-sizing "initial"
  width 225px
  font-family "Menlo"
  .saturation
    width 100%
    padding-bottom 55%
    position relative
    border-radius 2px 2px 0 0
    overflow hidden
</style>