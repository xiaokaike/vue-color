<template>
  <div
    role="HuePanel"
    :class="['vc-hue', directionClass]"
  >
    <div
      ref="container"
      class="vc-hue-container"
      @mousedown="handleMouseDown"
      @touchmove="handleChange"
      @touchstart="handleChange"
    >
      <div
        role="CurrentHuePointer"
        class="vc-hue-pointer"
        :style="{top: pointerTop, left: pointerLeft}"
      >
        <div class="vc-hue-picker" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hue',
  props: {
    color: Object,
    direction: {
      type: String,
      // [horizontal | vertical]
      default: 'horizontal'
    }
  },
  data () {
    return {
      oldHue: 0,
      pullDirection: ''
    }
  },
  computed: {
    hsl() {
      return this.color.hsl
    },
    directionClass () {
      return {
        'vc-hue--horizontal': this.direction === 'horizontal',
        'vc-hue--vertical': this.direction === 'vertical'
      }
    },
    pointerTop () {
      let top = 0;
      if (this.direction === 'vertical') {
        if (this.hsl.h === 0 && this.pullDirection === 'right') {
          top = 0
        } else {
          top = -((this.hsl.h * 100) / 360) + 100
        }
      }
      return `${top}%`;
    },
    pointerLeft () {
      let left = 0;
      if (this.direction === 'horizontal') {
        if (this.hsl.h === 0 && this.pullDirection === 'right') {
          left = 100
        } else {
          left = (this.hsl.h * 100) / 360
        }
      }
      return `${left}%`;
    }
  },
  watch: {
    color () {
      const h = this.hsl.h
      if (h !== 0 && h - this.oldHue > 0) this.pullDirection = 'right'
      if (h !== 0 && h - this.oldHue < 0) this.pullDirection = 'left'
      this.oldHue = h
    }
  },
  mounted() {
    const $container = this.$refs.container
    this.containerWidth = $container.clientWidth
    this.containerHeight = $container.clientHeight

    this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset
    this.yOffset = $container.getBoundingClientRect().top + window.pageYOffset
  },
  methods: {
    handleChange (e, skip) {
      !skip && e.preventDefault()

      const { containerWidth, containerHeight, xOffset, yOffset } = this;
      const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
      const pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
      const left = pageX - xOffset
      const top = pageY - yOffset

      let h
      let percent

      if (this.direction === 'vertical') {
        if (top < 0) {
          h = 360
        } else if (top > containerHeight) {
          h = 0
        } else {
          percent = -(top * 100 / containerHeight) + 100
          h = (360 * percent / 100)
        }

        if (this.hsl.h !== h) {
          this.$emit('change', {
            h: h,
            s: this.hsl.s,
            l: this.hsl.l,
            a: this.hsl.a,
            source: 'hsl'
          })
        }
      } else {
        if (left < 0) {
          h = 0
        } else if (left > containerWidth) {
          h = 360
        } else {
          percent = left * 100 / containerWidth
          h = (360 * percent / 100)
        }

        if (this.hsl.h !== h) {
          this.$emit('change', {
            h: h,
            s: this.hsl.s,
            l: this.hsl.l,
            a: this.hsl.a,
            source: 'hsl'
          })
        }
      }
    },
    handleMouseDown (e) {
      this.handleChange(e, true)
      window.addEventListener('mousemove', this.handleChange)
      window.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseUp (/*e*/) {
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
.vc-hue {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 2px;
}
.vc-hue--horizontal {
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}
.vc-hue--vertical {
  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}
.vc-hue-container {
  cursor: pointer;
  margin: 0 2px;
  position: relative;
  height: 100%;
}
.vc-hue-pointer {
  z-index: 2;
  position: absolute;
}
.vc-hue-picker {
  cursor: pointer;
  margin-top: 1px;
  width: 4px;
  border-radius: 1px;
  height: 8px;
  box-shadow: 0 0 2px rgba(0, 0, 0, .6);
  background: #fff;
  transform: translateX(-2px);
}
.vc-hue--vertical .vc-hue-picker {
  transform: translateX(-2px) translateY(-50%);
}
</style>
