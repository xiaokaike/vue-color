<template>
  <div class="hue">
    <div class="container" v-el:container
      @mousedown="handleMouseDown">
      <div class="pointer" :style="{left: pointerLeft}">
        <i class="picker"></i>
      </div>  
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hue',
  props: {
    colors: Object,
    onChange: Function
  },
  data () {
    return {
      
    }
  },
  computed: {
    pointerLeft () {
      return (this.colors.hsl.h * 100) / 360 + '%'
    }
  },
  methods:{
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
          this.onChange({
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
          this.onChange({
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
  }

}
</script>

<style lang="stylus">
.hue
  position absolute
  top 0px
  right 0px
  bottom 0px
  left 0px
  background linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)
  border-radius 2px
  .pointer
    z-index 2
    position absolute
  .picker
    display block
    width 14px
    height 14px
    border-radius 6px
    transform translate(-7px, -1px)
    background-color rgb(248, 248, 248)
    box-shadow 0 1px 4px 0 rgba(0, 0, 0, 0.37)
</style>