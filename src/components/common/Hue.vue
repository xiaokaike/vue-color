<template>
  <div
    role="HuePanel"
    :class="['vc-hue', directionClass]"
  >
    <div
      ref="container"
      class="vc-hue-container"
      @mousedown="handleMouseDown"
      @touchmove="handleTouchEvnet"
      @touchstart="handleTouchEvnet"
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

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Color from '../../mixin/color';

@Component
export default class Hue extends mixins(Color) {

  @Prop({ default: 'horizontal' }) readonly direction!: 'horizontal' | 'vertical'

  @Ref('container') readonly container!: HTMLDivElement

  oldHue = 0;
  pullDirection = '';
  containerWidth = 0;
  containerHeight = 0;
  xOffset = 0;
  yOffset = 0;

  get hsl() {
    return this.tc.toHsl();
  }

  get directionClass() {
    return {
      'vc-hue--horizontal': this.direction === 'horizontal',
      'vc-hue--vertical': this.direction === 'vertical'
    }
  }

  get pointerTop() {
    let top = 0;
    if (this.direction === 'vertical') {
      if (this.hsl.h === 0 && this.pullDirection === 'right') {
        top = 0
      } else {
        top = -((this.hsl.h * 100) / 360) + 100
      }
    }
    return `${top}%`;
  }

  get pointerLeft() {
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

  @Watch('hsl')
  onHSLChanged(val: tinycolor.ColorFormats.HSLA) {
    const h = val.h
    if (h !== 0 && h - this.oldHue > 0) this.pullDirection = 'right'
    if (h !== 0 && h - this.oldHue < 0) this.pullDirection = 'left'
    this.oldHue = h
  }

  mounted() {
    const $container = this.container;
    this.containerWidth = $container.clientWidth
    this.containerHeight = $container.clientHeight

    this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset
    this.yOffset = $container.getBoundingClientRect().top + window.pageYOffset
  }

  handleChange(pageX: number, pageY: number) {
    let h
    let percent
    const { containerWidth, containerHeight, xOffset, yOffset } = this;
    const left = pageX - xOffset
    const top = pageY - yOffset

    if (this.direction === 'vertical') {
      if (top < 0) {
        h = 360
      } else if (top > containerHeight) {
        h = 0
      } else {
        percent = -(top * 100 / containerHeight) + 100
        h = (360 * percent / 100)
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
    }

    if (this.hsl.h !== h) {
      this.onColorChange({...this.hsl, ...{ h }});
    }
  }

  handleTouchEvnet(e: TouchEvent) {
    e.preventDefault();
    this.handleChange(e.touches ? e.touches[0].pageX : 0, e.touches ? e.touches[0].pageY : 0);
  }

  handleMouseDown(e: MouseEvent) {
    this.handleChange(e.pageX, e.pageY);
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseMove(e: MouseEvent) {
    this.handleChange(e.pageX, e.pageY);
  }

  handleMouseUp (/*e*/) {
    this.unbindEventListeners()
  }

  unbindEventListeners () {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
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
