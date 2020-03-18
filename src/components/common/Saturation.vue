<template>
  <div
    ref="container"
    role="SaturationPanel"
    class="vc-saturation"
    :style="{background: bgColor}"
    @mousedown="handleMouseDown"
    @touchmove="handleTouchEvents"
    @touchstart="handleTouchEvents"
  >
    <div class="vc-saturation--white" />
    <div class="vc-saturation--black" />
    <div
      role="CurrentSaturationPointer"
      class="vc-saturation-pointer"
      :style="{top: pointerTop, left: pointerLeft}"
    >
      <div class="vc-saturation-circle" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Color from '../../mixin/color';
import clamp from 'clamp';
import throttle from 'lodash.throttle';

@Component
export default class Saturation extends mixins(Color) {
  containerWidth = 0;
  containerHeight = 0;
  xOffset = 0;
  yOffset = 0;

  lastMouseEvent = '';

  throttle = throttle((fn, data) => {
    fn(data)
  }, 20,
  {
    'leading': true,
    'trailing': false
  })

  @Ref('container')
  readonly container!: HTMLDivElement

  get hsv() {
    return this.tc.toHsv();
  }
  get bgColor() {
    return `hsl(${this.hsv.h}, 100%, 50%)`
  }
  get pointerTop () {
    return (-(this.hsv.v * 100) + 1) + 100 + '%'
  }
  get pointerLeft () {
    return this.hsv.s * 100 + '%'
  }
  mounted() {
    const $container = this.$refs.container as HTMLDivElement;
    this.containerWidth = $container.clientWidth
    this.containerHeight = $container.clientHeight

    this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset
    this.yOffset = $container.getBoundingClientRect().top + window.pageYOffset
  }
  handleChange (pageX: number, pageY: number) {
    // !skip && e.preventDefault()
    const { containerWidth, containerHeight, xOffset, yOffset } = this;
    const left = clamp(pageX - xOffset, 0, containerWidth)
    const top = clamp(pageY - yOffset, 0, containerHeight)
    const saturation = left / containerWidth
    const bright = clamp(-(top / containerHeight) + 1, 0, 1)

    this.throttle(this.onColorChange, {
      ...this.hsv,
      ... {
        s: saturation,
        v: bright,
      }
    })
  }
  handleMouseDown (/* e: MouseEvent */) {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }
  handleMouseMove(e: MouseEvent) {
    this.lastMouseEvent = e.type;
    this.handleChange(e.pageX, e.pageY);
  }
  handleMouseUp (e: MouseEvent) {
    if (this.lastMouseEvent !== 'mousemove') {
      this.handleChange(e.pageX, e.pageY);
    }
    this.lastMouseEvent = '';
    this.unbindEventListeners()
  }
  unbindEventListeners () {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }
  handleTouchEvents(e: TouchEvent) {
    const pageX = e.touches ? e.touches[0].pageX : 0;
    const pageY = e.touches ? e.touches[0].pageY : 0;
    this.handleChange(pageX, pageY);
  }
}
</script>

<style>
.vc-saturation,
.vc-saturation--white,
.vc-saturation--black {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.vc-saturation--white {
  background: linear-gradient(to right, #fff, rgba(255,255,255,0));
}
.vc-saturation--black {
  background: linear-gradient(to top, #000, rgba(0,0,0,0));
}
.vc-saturation-pointer {
  cursor: pointer;
  position: absolute;
}
.vc-saturation-circle {
  cursor: head;
  width: 4px;
  height: 4px;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);
  border-radius: 50%;
  transform: translate(-2px, -2px);
}
</style>
