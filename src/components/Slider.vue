<template>
  <div class="c-slider">
    <dir class="hue-warp">
      <div class="hue">
        <div class="container" v-el:container
          @mousedown="handleMouseDown">
          <div class="pointer" :style="{left: (this.colors.hsl.h * 100) / 360 + '%'}">
            <i class="picker"></i>
          </div>  
        </div>
      </div>
    </dir>
    <div class="swatches">
      <div class="swatch" v-for="sw in swatches" data-index="{{$index}}"
        @click="handleSwClick($index, sw.offset)">
        <div class="swatch-picker"
        :class="{active: sw.offset == activeOffset}"
        :style="{background: 'hsl(' + colors.hsl.h + ', 50%, ' + (sw.offset * 100) + '%)'}"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import colorMixin from '../mixin/color'

export default {
  name: 'Slider',
  mixins: [colorMixin],
  props: {
    direction: String
  },
  computed: {
    activeOffset () {
      if(Math.round(this.colors.hsl.s * 100) / 100 == .50){
        return Math.round(this.colors.hsl.l * 100) / 100
      }
      return 0
    }
  },
  filters: {
  },
  data () {
    return {
      swatches: [{
        offset: '.80',
      }, {
        offset: '.65',
      }, {
        offset: '.50',
      }, {
        offset: '.35',
      }, {
        offset: '.20',
      }]
    }
  },
  ready () {
    
  },
  methods: {
    handleChange (e, skip) {
      !skip && e.preventDefault()
      
      var container = this.$els.container
      var containerWidth = container.clientWidth
      var containerHeight = container.clientHeight
      var left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset)
      var top = (e.pageY || e.touches[0].pageY) - (container.getBoundingClientRect().top + window.pageYOffset)

      if (this.direction === 'vertical') {
        var h
        if (top < 0) {
          h = 359
        } else if (top > containerHeight) {
          h = 0
        } else {
          var percent = -(top * 100 / containerHeight) + 100
          h = (360 * percent / 100)
        }

        if (this.colors.hsl.h !== h) {
          this.colorChange({
            h: h,
            s: this.colors.hsl.s,
            l: this.colors.hsl.l,
            a: this.colors.hsl.a,
            source: 'hsl',
          })
        }
      } else {
        var h
        if (left < 0) {
          h = 0
        } else if (left > containerWidth) {
          h = 359
        } else {
          var percent = left * 100 / containerWidth
          h = (360 * percent / 100)
        }

        if (this.colors.hsl.h !== h) {
          this.colorChange({
            h: h,
            s: this.colors.hsl.s,
            l: this.colors.hsl.l,
            a: this.colors.hsl.a,
            source: 'hsl',
          })
        }
      }
    },
    handleMouseDown (e) {
      this.handleChange(e, true)
      window.addEventListener('mousemove', this.handleChange)
      window.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseUp (e) {
      this.unbindEventListeners()
    },
    unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange)
      window.removeEventListener('mouseup', this.handleMouseUp)
    },
    handleSwClick (index, offset){
      this.colorChange({
        h: this.colors.hsl.h,
        s: .5,
        l: offset,
        source: 'hsl',
      })
    }
  }

}
</script>

<style lang="stylus">
.c-slider
  position relative
  .hue-warp
    height 12px
    position relative
  .hue
    position absolute
    top 0px
    right 0px
    bottom 0px
    left 0px
    background linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)
    -ms-border-radius 2px
    -moz-border-radius 2px
    -o-border-radius 2px
    -webkit-border-radius 2px
    border-radius 2px
  .container
    margin 0 2px
    position relative
    height 100%
  .pointer
    z-index 2
    position absolute
  .picker
    display block
    width 14px
    height 14px
    -ms-border-radius 6px
    -moz-border-radius 6px
    -o-border-radius 6px
    -webkit-border-radius 6px
    border-radius 6px
    -ms-transform translate(-7px, -1px)
    -moz-transform translate(-7px, -1px)
    -o-transform translate(-7px, -1px)
    -webkit-transform translate(-7px, -1px)
    transform translate(-7px, -1px)
    background-color rgb(248, 248, 248)
    -ms-box-shadow 0 1px 4px 0 rgba(0, 0, 0, 0.37)
    -moz-box-shadow 0 1px 4px 0 rgba(0, 0, 0, 0.37)
    -o-box-shadow 0 1px 4px 0 rgba(0, 0, 0, 0.37)
    -webkit-box-shadow 0 1px 4px 0 rgba(0, 0, 0, 0.37)
    box-shadow 0 1px 4px 0 rgba(0, 0, 0, 0.37)
  .swatches
    display -webkit-box
    margin-top 20px
    .swatch
      margin-right 1px
      -webkit-box-flex 1
      width 20%
      &:first-child
        .swatch-picker
          border-radius 2px 0px 0px 2px        
      &:last-child
        margin-right 0
        .swatch-picker
          border-radius 0px 2px 2px 0px
    .swatch-picker
      height 12px
      cursor pointer
      &.active
        transform scaleY(1.8)
        border-radius: 3.6px/2px
      


</style>