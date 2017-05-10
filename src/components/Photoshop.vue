<template>
  <div class="vue-color__photoshop">
    <div class="vue-color__photoshop__head">{{head}}</div>
    <div class="vue-color__photoshop__body">
      <div class="vue-color__photoshop__saturation-wrap">
        <saturation v-model="colors" @change="childChange"></saturation>
      </div>
      <div class="vue-color__photoshop__hue-wrap">
        <hue v-model="colors" @change="childChange" direction="vertical">
          <div class="vue-color__photoshop__hue-pointer">
            <i class="vue-color__photoshop__hue-pointer--left"></i><i class="vue-color__photoshop__hue-pointer--right"></i>
          </div>
        </hue>
      </div>
      <div class="vue-color__photoshop__controls">
        <div class="vue-color__photoshop__previews">
          <div class="vue-color__photoshop__previews__label">new</div>
          <div class="vue-color__photoshop__previews__swatches">
            <div class="vue-color__photoshop__previews__pr-color" :style="{background: colors.hex}"></div>
            <div class="vue-color__photoshop__previews__pr-color" :style="{background: currentColor}"></div>
          </div>
          <div class="vue-color__photoshop__previews__label">current</div>
        </div>
        <div class="vue-color__photoshop__actions">
          <div class="vue-color__photoshop__ac-btn" @click="handleAccept">OK</div>
          <div class="vue-color__photoshop__ac-btn" @click="handleCancel">Cancel</div>
          <div class="vue-color__photoshop__fields">
            <!-- hsla -->
            <ed-in label="h" v-model="colors.hsl.h" @change="inputChange"></ed-in>
            <ed-in label="s" v-model="colors.hsl.s" @change="inputChange"></ed-in>
            <ed-in label="v" v-model="colors.hsl.l" @change="inputChange"></ed-in>
            <div class="vue-color__photoshop__fields__divider"></div>
            <!-- rgba -->
            <ed-in label="r" v-model="colors.rgba.r" @change="inputChange"></ed-in>
            <ed-in label="g" v-model="colors.rgba.g" @change="inputChange"></ed-in>
            <ed-in label="b" v-model="colors.rgba.b" @change="inputChange"></ed-in>
            <div class="vue-color__photoshop__fields__divider"></div>
            <!-- hex -->
            <ed-in label="#" class="vue-color__photoshop__fields__hex" v-model="colors.hex" @change="inputChange"></ed-in>
          </div>

        </div>
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
    'ed-in': editableInput
  },
  data () {
    return {
      currentColor: '#FFF'
    }
  },
  created () {
    this.currentColor = this.colors.hex
  },
  methods: {
    childChange (data) {
      this.colorChange(data)
    },
    inputChange (data) {
      if (!data) {
        return
      }
      if (data['#']) {
        this.isValidHex(data['#']) && this.colorChange({
          hex: data['#'],
          source: 'hex'
        })
      } else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba'
        })
      }
    },
    handleAccept () {
      this.$emit('ok')
    },
    handleCancel () {
      this.$emit('cancel')
    }
  }

}
</script>

<style lang="stylus">
.vue-color__photoshop
  background #DCDCDC
  border-radius 4px
  box-shadow 0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15)
  box-sizing initial
  width 513px
  font-family Roboto
.vue-color__photoshop__head
  background-image linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%)
  border-bottom 1px solid #B1B1B1
  box-shadow inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02)
  height 23px
  line-height 24px
  border-radius 4px 4px 0 0
  font-size 13px
  color #4D4D4D
  text-align center
.vue-color__photoshop__body
  padding 15px
  display flex
.vue-color__photoshop__saturation-wrap
  width 256px
  height 256px
  position relative
  border 2px solid #B3B3B3
  border-bottom 2px solid #F0F0F0
  overflow hidden
  .vue-color__saturation--circle
    width 12px
    height 12px
.vue-color__photoshop__hue-wrap
  position relative
  height 256px
  width 19px
  margin-left 10px
  border 2px solid #B3B3B3
  border-bottom 2px solid #F0F0F0
.vue-color__photoshop__hue-pointer
  position relative
.vue-color__photoshop__hue-pointer--left
.vue-color__photoshop__hue-pointer--right
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
.vue-color__photoshop__hue-pointer--left
  transform translate(-13px, -4px)
.vue-color__photoshop__hue-pointer--right
  transform translate(20px, -4px) rotate(180deg)
.vue-color__photoshop__controls
  width 180px
  margin-left 10px
  display flex
.vue-color__photoshop__actions
  margin-left 20px
  flex 1
.vue-color__photoshop__ac-btn
  cursor pointer
  background-image linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%)
  border 1px solid #878787
  border-radius 2px
  height 20px
  box-shadow 0 1px 0 0 #EAEAEA
  font-size 14px
  color #000
  line-height 20px
  text-align center
  margin-bottom 10px
.vue-color__photoshop__previews
  width 60px
.vue-color__photoshop__previews__swatches
  border 1px solid #B3B3B3
  border-bottom 1px solid #F0F0F0
  margin-bottom 2px
  margin-top 1px
.vue-color__photoshop__previews__pr-color
  height 34px
  box-shadow inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000
.vue-color__photoshop__previews__label
  font-size 14px
  color #000
  text-align center
.vue-color__photoshop__fields
  padding-top 5px
  padding-bottom 9px
  width 80px
  position relative
  .vue-color__editable-input__input
    margin-left 40%
    width 40%
    height 18px
    border 1px solid #888888
    box-shadow inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC
    margin-bottom 5px
    font-size 13px
    padding-left 3px
    margin-right 10px
  .vue-color__editable-input__label
    top 0
    left 0
    width 34px
    text-transform uppercase
    font-size 13px
    height 18px
    line-height 22px
    position absolute
.vue-color__photoshop__fields__divider
  height 5px
.vue-color__photoshop__fields__hex
  .vue-color__editable-input__input
    margin-left 20%
    width 80%
    height 18px
    border 1px solid #888888
    box-shadow inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC
    margin-bottom 6px
    font-size 13px
    padding-left 3px
  .vue-color__editable-input__label
    position absolute
    top 0
    left 0
    width 14px
    text-transform uppercase
    font-size 13px
    height 18px
    line-height 22px
</style>
