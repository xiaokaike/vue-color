<template>
  <div class="c-swatches" data-pick="{{pick}}">
    <div class="box">
      <div class="color-group" v-for="group in defaultColors.colors">
        <div class="color-it" v-for="c in group"
          @click="handlerClick(c)"
          :style="{background: c}">
          <div class="pick" v-show="c === pick">
            <svg :style="{width: '24px', height:'24px'}" viewBox="0 0 24 24">
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

var defaultColors = {
  width: 320,
  height: 240,
  colors: [
    [material.red['900'], material.red['700'], material.red['500'], material.red['300'], material.red['100']],
    [material.pink['900'], material.pink['700'], material.pink['500'], material.pink['300'], material.pink['100']],
    [material.purple['900'], material.purple['700'], material.purple['500'], material.purple['300'], material.purple['100']],
    [material.deepPurple['900'], material.deepPurple['700'], material.deepPurple['500'], material.deepPurple['300'], material.deepPurple['100']],
    [material.indigo['900'], material.indigo['700'], material.indigo['500'], material.indigo['300'], material.indigo['100']],
    [material.blue['900'], material.blue['700'], material.blue['500'], material.blue['300'], material.blue['100']],
    [material.lightBlue['900'], material.lightBlue['700'], material.lightBlue['500'], material.lightBlue['300'], material.lightBlue['100']],
    [material.cyan['900'], material.cyan['700'], material.cyan['500'], material.cyan['300'], material.cyan['100']],
    [material.teal['900'],  material.teal['700'], material.teal['500'], material.teal['300'], material.teal['100']],
    ['#194D33', material.green['700'], material.green['500'], material.green['300'], material.green['100']],
    [material.lightGreen['900'], material.lightGreen['700'], material.lightGreen['500'], material.lightGreen['300'], material.lightGreen['100']],
    [material.lime['900'], material.lime['700'], material.lime['500'], material.lime['300'], material.lime['100']],
    [material.yellow['900'], material.yellow['700'], material.yellow['500'], material.yellow['300'], material.yellow['100']],
    [material.amber['900'], material.amber['700'], material.amber['500'], material.amber['300'], material.amber['100']],
    [material.orange['900'], material.orange['700'], material.orange['500'], material.orange['300'], material.orange['100']],
    [material.deepOrange['900'], material.deepOrange['700'], material.deepOrange['500'], material.deepOrange['300'], material.deepOrange['100']],
    [material.brown['900'], material.brown['700'], material.brown['500'], material.brown['300'], material.brown['100']],
    [material.blueGrey['900'], material.blueGrey['700'], material.blueGrey['500'], material.blueGrey['300'], material.blueGrey['100']],
  ],
}

export default {
  name: 'Swatches',
  mixins: [colorMixin],
  props: {
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
  ready () {
    
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
.c-swatches
  width 320px
  height 240px
  overflow-y scroll
  background-color #fff
  box-shadow 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)
  .box
    padding 16px 0 6px 16px
    overflow hidden
  .color-group
    padding-bottom 10px
    width 40px
    float left
    margin-right 10px
  .color-it
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
  .pick
    fill: rgb(255, 255, 255);
    margin-left: 8px;
    display: block;

</style>