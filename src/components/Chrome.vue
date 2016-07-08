<template>
  <div class="vue-color__chrome">
    <div class="vue-color__chrome__saturation-wrap">
      <saturation :colors.sync="colors" :on-change="childChange"></saturation>
    </div>
    <div class="vue-color__chrome__chrome-body">
      <div class="vue-color__chrome__controls">
        <div class="vue-color__chrome__color-wrap">
          <div class="vue-color__chrome__active-color" :style="{background: activeColor}"></div>
        </div>

        <div class="vue-color__chrome__sliders">
          <div class="vue-color__chrome__hue-wrap">
            <hue :colors.sync="colors" :on-change="childChange"></hue>  
          </div>
          <div class="vue-color__chrome__alpha-wrap">
            <alpha :colors.sync="colors" :on-change="childChange"></alpha>
          </div>
        </div>
      </div>
      
      <div class="vue-color__chrome__fields-wrap">
        <div class="vue-color__chrome__fields" v-show="fieldsIndex === 0">
          <!-- hex -->
          <div class="vue-color__chrome__field">
            <ed-in label="hex"
            :val.sync="colors.hex"
            :on-change="inputChange"></ed-in>  
          </div>
        </div>
        <div class="vue-color__chrome__fields" v-show="fieldsIndex === 1">
          <!-- rgba -->
          <div class="vue-color__chrome__field">
            <ed-in label="r" :val.sync="colors.rgba.r" 
            :on-change="inputChange"></ed-in>
          </div>
          <div class="vue-color__chrome__field">
            <ed-in label="g" :val.sync="colors.rgba.g" 
            :on-change="inputChange"></ed-in>
          </div>
          <div class="vue-color__chrome__field">
            <ed-in label="b" :val.sync="colors.rgba.b"
            :on-change="inputChange"></ed-in>
          </div>
          <div class="vue-color__chrome__field">
            <ed-in label="a" :val.sync="colors.a" :arrow-offset="0.01" :max="1"
            :on-change="inputChange"></ed-in>
          </div>
        </div>
        <div class="vue-color__chrome__fields" v-show="fieldsIndex === 2">
          <!-- hsla -->
          <div class="vue-color__chrome__field">
            <ed-in label="h" :val.sync="colors.hsl.h" 
            :on-change="inputChange"></ed-in>
          </div>
          <div class="vue-color__chrome__field"> 
            <ed-in label="s" :val.sync="colors.hsl.s"
            :on-change="inputChange"></ed-in>
          </div>
          <div class="vue-color__chrome__field">
            <ed-in label="l" :val.sync="colors.hsl.l"
            :on-change="inputChange"></ed-in>
          </div>
          <div class="vue-color__chrome__field">
            <ed-in label="a" :val.sync="colors.a" :arrow-offset="0.01" :max="1"
            :on-change="inputChange"></ed-in>
          </div>
        </div>
        <!-- btn -->
        <div class="vue-color__chrome__toggle-btn" @click="toggleViews">
          <div class="vue-color__chrome__icon">
            <svg style="width:24px; height:24px" viewBox="0 0 24 24" 
              @mouseover="showHighlight" 
              @mouseenter="showHighlight" 
              @mouseout="hideHighlight">
              <path fill="#333" d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" />
            </svg>
          </div>
          <div class="vue-color__chrome__icon-highlight" v-show="highlight"></div>
        </div>
        <!-- btn -->
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
  name: 'Chrome',
  mixins: [colorMixin],
  props: {
  },
  components: {
    saturation,
    hue,
    alpha,
    'ed-in': editableInput
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
    inputChange (data) {
      if (!data) {
        return
      }
      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
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
    toggleViews () {
      if (this.fieldsIndex >= 2) {
        this.fieldsIndex = 0
        return
      }
      this.fieldsIndex ++
    },
    showHighlight () {
      this.highlight = true
    },
    hideHighlight () {
      this.highlight = false
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
.vue-color__chrome__fields-wrap
  padding-top 16px
  display flex
.vue-color__chrome__fields
  display flex
  margin-left -6px
  flex 1
.vue-color__chrome__field
  padding-left 6px
  width 100%
.vue-color__chrome__toggle-btn
  width 32px
  text-align right
  position relative
.vue-color__chrome__icon
  margin-right -4px
  margin-top 12px
  cursor pointer
  position relative
  z-index 2
.vue-color__chrome__icon-highlight
  position absolute
  width 24px
  height 28px
  background #eee
  border-radius 4px
  top 10px
  left 12px  
.vue-color__chrome__hue-wrap
  position relative
  height 10px
  margin-bottom 8px
.vue-color__chrome__alpha-wrap
  position relative
  height 10px
.vue-color__chrome__chrome-body
  padding 16px 16px 12px
.vue-color__chrome__saturation-wrap
  width 100%
  padding-bottom 55%
  position relative
  border-radius 2px 2px 0 0
  overflow hidden
  .vue-color__saturation--circle
    width 12px
    height 12px
.vue-color__chrome__fields
  .vue-color__editable-input__input
    font-size 11px
    color #333
    width 100%
    border-rradius 2px
    border none
    box-shadow inset 0 0 0 1px #dadada
    height 21px
    text-align center
  .vue-color__editable-input__label
    text-transform uppercase
    font-size 11px
    line-height 11px
    color #969696
    text-align center
    display block
    margin-top 12px

</style>