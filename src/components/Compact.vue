<template>
  <div class="c-compact">
    <ul class="colors">
      <li class="color-item" v-for="c in defaultColors" 
        @click="handlerClick(c)"
        :class="{white: c === '#FFFFFF' }"
        :style="{background: c}">
        <div class="dot" v-show="c === pick"></div>
      </li>
    </ul>
    <div class="fields">
      <div class="pick-color" :style="{background: pick}"></div>
      <div class="col-hex">
        <editable-input label="hex" cid="hex"
        :val.sync="colors.hex"
        :style="{ borderColor: colors.hex }"
        :on-change="onChange">
        </editable-input>
      </div>
      <div class="col-3">
        <editable-input label="r" cid="rgba"
        :val.sync="colors.rgba.r" 
        :on-change="onChange">
        </editable-input>
      </div>
      <div class="col-3">
        <editable-input label="g" cid="rgba"
        :val.sync="colors.rgba.g" 
        :on-change="onChange">
        </editable-input>
      </div>
      <div class="col-3">
        <editable-input label="b" cid="rgba"
        :val.sync="colors.rgba.b"
        :on-change="onChange">
        </editable-input>
      </div>
    </div>
  </div>
</template>

<script>
import colorMixin from '../mixin/color'
import editableInput from './common/EditableInput.vue'

var defaultColors = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
  '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
  '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400',
  '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
  '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
  '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E',
]

export default {
  name: 'Compact',
  mixins: [colorMixin],
  props: {
  },
  components: {
    editableInput
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
    onChange () {
    }
  }
}

</script>

<style lang="stylus">
.c-compact
  padding-top 5px
  padding-left 5px
  width 240px
  border-radius 2px
  box-shadow 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)
  .colors
    overflow hidden
    padding 0
    margin 0
  .color-item
    list-style none
    width 15px
    height 15px
    float left
    margin-right 5px
    margin-bottom 5px
    position relative
    cursor pointer
    &.white
      box-shadow inset 0 0 0 1px #ddd
      .dot
        background #000      
  .dot
    position absolute
    top 5px
    right 5px
    bottom 5px
    left 5px
    border-radius 50%
    opacity 1
    background #fff
  .fields
    display flex
    position relative
    padding-bottom 6px
    padding-right 5px
    position relative
    .pick-color
      position absolute
      top 6px
      left 5px
      height 9px
      width 9px
    .col-hex
      flex 2
      .input
        width 80%
        padding-left 20%  
      .label
        display none
    .col-3
      flex 1
    .input
      width 70%
      padding-left 30%
      background none
      font-size 12px
      color #333
      height 16px
    .label
      position absolute
      top 3px
      left 0
      line-height 16px
      text-transform uppercase
      font-size 12px
      color #999
</style>