<template>
  <div
    role="HuePanel"
    class="vc-alpha"
  >
    <div class="vc-alpha-checkboard-wrap">
      <checkboard />
    </div>
    <div
      class="vc-alpha-gradient"
      :style="{background: gradientColor}"
    />
    <div
      ref="container"
      class="vc-alpha-container"
      @mousedown="handleMouseDown"
      @touchmove="handleChange"
      @touchstart="handleChange"
    >
      <div
        role="CurrentAlphaPointer"
        class="vc-alpha-pointer"
        :style="{left: pointerLeft}"
      >
        <div class="vc-alpha-picker" />
      </div>
    </div>
  </div>
</template>

<script>
import checkboard from './Checkboard.vue'

export default {
  name: 'Alpha',
  components: {
    checkboard
  },
  props: {
    color: Object,
    onChange: Function
  },
  computed: {
    pointerLeft () {
      return `${this.color.a * 100}%`;
    },
    gradientColor () {
      var rgba = this.color.rgba
      var rgbStr = [rgba.r, rgba.g, rgba.b].join(',')
      return 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)'
    }
  },
  mounted () {
    const $container = this.$refs.container
    this.containerWidth = $container.clientWidth
  },
  methods: {
    handleChange (e, skip) {
      !skip && e.preventDefault()
      const container = this.$refs.container
      const { containerWidth } = this;

      var xOffset = container.getBoundingClientRect().left + window.pageXOffset
      var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
      var left = pageX - xOffset

      var a
      if (left < 0) {
        a = 0
      } else if (left > containerWidth) {
        a = 1
      } else {
        a = Math.round(left * 100 / containerWidth) / 100
      }

      if (this.color.a !== a) {
        this.$emit('change', {
          h: this.color.hsl.h,
          s: this.color.hsl.s,
          l: this.color.hsl.l,
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
  overflow: hidden;
}
.vc-alpha-gradient {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.vc-alpha-container {
  cursor: pointer;
  position: relative;
  z-index: 2;
  height: 100%;
  margin: 0 3px;
}
.vc-alpha-pointer {
  z-index: 2;
  position: absolute;
}
.vc-alpha-picker {
  cursor: pointer;
  width: 4px;
  border-radius: 1px;
  height: 8px;
  box-shadow: 0 0 2px rgba(0, 0, 0, .6);
  background: #fff;
  margin-top: 1px;
  transform: translateX(-2px);
}
</style>
