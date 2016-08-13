<template>
  <div class="vue-color__swatches" :data-pick="pick">
    <div class="vue-color__swatches__box">
      <div class="vue-color__swatches__color-group" v-for="group in defaultColors">
        <div class="vue-color__swatches__color-it" v-for="c in group"
          :data-color="c"
          @click="handlerClick(c)"
          :style="{background: c}">
          <div class="vue-color__swatches__pick" v-show="c == pick">
            <svg style="width: 24px; height:24px;" viewBox="0 0 24 24">
              <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import material from 'material-colors'
import colorMixin from '../mixin/color'

var colorMap = [
  'red', 'pink', 'purple', 'deepPurple',
  'indigo', 'blue', 'lightBlue', 'cyan',
  'teal', 'green', 'lightGreen', 'lime',
  'yellow', 'amber', 'orange', 'deepOrange',
  'brown', 'blueGrey'
]
var colorLevel = ['900', '700', '500', '300', '100']
var defaultColors = (() => {
  var colors = []
  colorMap.forEach((type) => {
    var typeColor = []
    colorLevel.forEach((level) => {
      typeColor.push(material[type][level].toUpperCase())
    })
    colors.push(typeColor)
  })
  return colors
})()

export default {
  name: 'Swatches',
  mixins: [colorMixin],
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
    }
  }

}
</script>

<style lang="stylus">
.vue-color__swatches
  width 320px
  height 240px
  overflow-y scroll
  background-color #fff
  box-shadow 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)
.vue-color__swatches__box
  padding 16px 0 6px 16px
  overflow hidden
.vue-color__swatches__color-group
  padding-bottom 10px
  width 40px
  float left
  margin-right 10px
.vue-color__swatches__color-it
  width 40px
  height 24px
  cursor pointer
  background #880e4f
  margin-bottom 1px
  overflow hidden
  -ms-border-radius 2px 2px 0 0
  -moz-border-radius 2px 2px 0 0
  -o-border-radius 2px 2px 0 0
  -webkit-border-radius 2px 2px 0 0
  border-radius 2px 2px 0 0
.vue-color__swatches__pick
  fill: rgb(255, 255, 255);
  margin-left: 8px;
  display: block;

</style>
