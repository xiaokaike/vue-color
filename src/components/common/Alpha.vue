<template>
  <div :class="['vc-alpha', directionClass]">
    <div class="vc-alpha-checkboard-wrap">
      <checkboard></checkboard>
    </div>
    <div class="vc-alpha-gradient" :style="{background: gradientColor}"></div>
    <div class="vc-alpha-container" ref="container"
        @mousedown="handleMouseDown"
        @touchmove="handleChange"
        @touchstart="handleChange">
      <div class="vc-alpha-pointer" :style="{
        left: direction === 'horizontal' ? colors.a * 100 + '%' : 0,
        top: direction === 'vertical' ? colors.a * 100 + '%' : 0
      }">
        <div class="vc-alpha-picker"></div>
      </div>
    </div>
  </div>
</template>

<script>
import checkboard from './Checkboard.vue'

export default {
  name: 'Alpha',
  props: {
    value: Object,
    onChange: Function,
    direction: {
      type: String,
      // [horizontal | vertical]
      default: 'horizontal'
    }
  },
  components: {
    checkboard
  },
  computed: {
    colors () {
      return this.value
    },
    gradientColor () {
      var rgba = this.colors.rgba
      var rgbStr = [rgba.r, rgba.g, rgba.b].join(',')
      return `linear-gradient(to ${this.direction === 'horizontal' ? 'right' : 'bottom'}, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`
    }
  },
  methods: {
    handleChange (e, skip) {
      !skip && e.preventDefault()
      var container = this.$refs.container

      var a

      if (this.direction === 'horizontal') {
        var containerWidth = container.clientWidth
        var xOffset = container.getBoundingClientRect().left + window.pageXOffset
        var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
        var left = pageX - xOffset

        if (left < 0) {
          a = 0
        } else if (left > containerWidth) {
          a = 1
        } else {
          a = Math.round(left * 100 / containerWidth) / 100
        }
      } else {
        var containerHeight = container.clientHeight
        var yOffset = container.getBoundingClientRect().top + window.pageYOffset
        var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
        var top = pageY - yOffset

        if (top < 0) {
          a = 0
        } else if (top > containerHeight) {
          a = 1
        } else {
          a = Math.round(top * 100 / containerHeight) / 100
        }
      }

      if (this.colors.a !== a) {
        this.$emit('change', {
          h: this.colors.hsl.h,
          s: this.colors.hsl.s,
          l: this.colors.hsl.l,
          a: a,
          source: 'rgba'
        })
      }
    },
    handleMouseDown (e) {
      this.handleChange(e, true)
      window.addEventListener('mousemove', this.handleChange)
      window.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseUp () {
      this.unbindEventListeners()
    },
    unbindEventListeners () {
      window.removeEventListener('mousemove', this.handleChange)
      window.removeEventListener('mouseup', this.handleMouseUp)
    }
  }
}

</script>

<style>
.vc-alpha {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.vc-alpha-checkboard-wrap {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 8px;
  overflow: hidden;
}
.vc-alpha-gradient {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 8px;
}
.vc-alpha-container {
  cursor: pointer;
  position: relative;
  z-index: 2;
  height: 100%;
  border-radius: 8px;
  /* margin: 0 3px; */
}
.vc-alpha-pointer {
  z-index: 2;
  position: absolute;
}
.vc-alpha-picker {
  cursor: pointer;
  width: 10px;
  height: 10px;
  border: 4px solid #FFFFFF;
  border-radius: 50%;
  transform: translate(-2px, -50%);
}
</style>
