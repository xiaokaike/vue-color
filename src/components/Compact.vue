<template>
  <div class="vue-color__compact">
    <ul class="vue-color__compact__colors">
      <li class="vue-color__compact__color-item" v-for="c in defaultColors"
        @click="handlerClick(c)"
        :class="{'vue-color__compact__color-item--white': c === '#FFFFFF' }"
        :style="{background: c}">
        <div class="vue-color__compact__dot" v-show="c === pick"></div>
      </li>
    </ul>
    <!-- <div class="vue-color__compact__fields">
      <div class="vue-color__compact__pick-color" :style="{background: pick}"></div>
      <div class="vue_color__compact__col-hex">
        <ed-in label="vue-color__compact__hex"
        :val.sync="colors.hex"
        :style="{ borderColor: colors.hex }"
        :change="onChange"></ed-in>
      </div>
      <div class="vue-color__compact__col-3">
        <ed-in label="r" :val.sync="colors.rgba.r"
        :change="onChange"></ed-in>
      </div>
      <div class="vue-color__compact__col-3">
        <ed-in label="g" :val.sync="colors.rgba.g"
        :change="onChange"></ed-in>
      </div>
      <div class="vue-color__compact__col-3">
        <ed-in label="b" :val.sync="colors.rgba.b"
        :change="onChange"></ed-in>
      </div>
    </div> -->
  </div>
</template>

<script>
import colorMixin from '../mixin/color'
import editableInput from './common/EditableInput.vue'

const defaultColors = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
  '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
  '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400',
  '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
  '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
  '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
]

export default {
  name: 'Compact',
  mixins: [colorMixin],
  props: {
  },
  components: {
    'ed-in': editableInput
  },
  computed: {
    pick () {
      return this.colors.hex
    }
  },
  data () {
    return {
      defaultColors: defaultColors
    }
  },
  methods: {
    handlerClick (c) {
      this.colorChange({
        hex: c,
        source: 'hex'
      })
    },
    onChange (data) {
      if (!data) {
        return
      }
      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex'
        })
      } else if (data.r || data.g || data.b) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba'
        })
      }
    }
  }
}

</script>

<style lang="stylus">
.vue-color__compact
  padding-top 5px
  padding-left 5px
  width 240px
  border-radius 2px
  box-shadow 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)
  background-color #fff
.vue-color__compact__colors
  overflow hidden
  padding 0
  margin 0
.vue-color__compact__color-item
  list-style none
  width 15px
  height 15px
  float left
  margin-right 5px
  margin-bottom 5px
  position relative
  cursor pointer
.vue-color__compact__color-item--white
  box-shadow inset 0 0 0 1px #ddd
  .vue-color__compact__dot
      background #000
.vue-color__compact__dot
  position absolute
  top 5px
  right 5px
  bottom 5px
  left 5px
  border-radius 50%
  opacity 1
  background #fff
.vue-color__compact__fields
  display flex
  position relative
  padding-bottom 6px
  padding-right 5px
  position relative
  .vue-color__editable-input__input
    width 70%
    padding-left 30%
    background none
    font-size 12px
    color #333
    height 16px
  .vue-color__editable-input__label
    position absolute
    top 3px
    left 0
    line-height 16px
    text-transform uppercase
    font-size 12px
    color #999
.vue-color__compact__pick-color
  position absolute
  top 6px
  left 5px
  height 9px
  width 9px
.vue-color__compact__col-3
  flex 1
.vue_color__compact__col-hex
  flex 2
  .vue-color__editable-input__input
    width 80%
    padding-left 20%
  .vue-color__editable-input__label
    display none
</style>
