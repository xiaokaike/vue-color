<template>
  <div class="c-chrome">
    <div class="hue-wrap">
      <hue :colors.sync="colors" :on-change="childChange"></hue>  
    </div>
    <div class="alpha-wrap">
      <alpha :colors.sync="colors" :on-change="childChange"></alpha>
    </div>
  </div>
</template>

<script>
import colorMixin from '../mixin/color'
import editableInput from './common/EditableInput.vue'
import saturation from './common/Saturation.vue'
import hue from './common/Hue.vue'
import alpha from './common/Alpha.vue'

export default {
  name: 'Chrome',
  mixins: [colorMixin],
  props: {
  },
  components: {
    saturation,
    hue,
    alpha,
    'ed-in': editableInput,
  },
  data () {
    return {
      
    }
  },
  methods:{
    handlePreset (c){
      this.colorChange({
        hex: c,
        source: 'hex'
      })
    },
    childChange (data){
      this.colorChange(data)
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
  .hue-wrap
    position relative
    height 20px
  .alpha-wrap
    position relative
    height 20px
    margin-top 4px
    overflow hidden
</style>