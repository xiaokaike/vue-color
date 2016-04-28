<template>
  <div class="c-photoshop">
    <div class="head">{{head}}</div>
    <div class="body">
      <div class="saturation-wrap">
        <saturation :colors.sync="colors" :on-change="childChange"></saturation>
      </div>
      <div class="hue-wrap">
        <hue :colors.sync="colors" :on-change="childChange" direction="vertical">
          <div class="hue-pointer">
            <i class="left"></i><i class="right"></i>
          </div>
        </hue>  
      </div>
      <div class="controls">
        
      </div>
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
  name: 'Photoshop',
  mixins: [colorMixin],
  props: {
    head: {
      type: String,
      default: 'Color Picker' 
    }
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
    childChange (data){
      this.colorChange(data)
    }
  }

}
</script>

<style lang="stylus">
.c-photoshop
  background #DCDCDC
  border-radius 4px
  box-shadow 0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15)
  box-sizing initial
  width 513px
  .head
    background-image linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%)
    border-bottom 1px solid #B1B1B1
    box-shadow inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02)
    height 23px
    line-height 24px
    border-radius 4px 4px 0 0
    font-size 13px
    color #4D4D4D
    text-align center
  .body
    padding 15px
    display flex
  .saturation-wrap
    width 256px
    height 256px
    position relative
    border 2px solid #B3B3B3
    border-bottom 2px solid #F0F0F0
    overflow hidden
  .hue-wrap
    position relative
    height 256px
    width 19px
    margin-left 10px
    border 2px solid #B3B3B3
    border-bottom 2px solid #F0F0F0
  .hue-pointer
    position relative
    .left
    .right
      position absolute
      width 0
      height 0
      border-style solid
      border-width 5px 0 5px 8px
      border-color transparent transparent transparent #555
      &:after
        content ""
        width 0
        height 0
        border-style solid
        border-width 4px 0 4px 6px
        border-color transparent transparent transparent #fff
        position absolute
        top 1px
        left 1px
        transform translate(-8px, -5px)
    .left
      transform translate(-13px, -4px)
    .right
      transform translate(20px, -4px) rotate(180deg)
  .controls
    width 180px
    margin-left 10px
</style>