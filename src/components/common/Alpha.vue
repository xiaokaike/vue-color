<template>
  <div
    role="HuePanel"
    class="vc-alpha"
  >
    <div class="vc-alpha-checkboard-wrap">
      <Checkboard />
    </div>
    <div
      class="vc-alpha-gradient"
      :style="{background: gradientColor}"
    />
    <div
      ref="container"
      class="vc-alpha-container"
      @mousedown="handleMouseDown"
      @touchmove="handlTouchEvents"
      @touchstart="handlTouchEvents"
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

<script lang="ts">
import Checkboard from './Checkboard.vue';
import { Component, Ref, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Color from '../../mixin/color';

@Component({
  components: {
    Checkboard
  }
})
export default class Alpha extends mixins(Color) {
  @Ref()
  readonly container!: HTMLDivElement;

  containerWidth = 0;
  xOffset = 0;
  // pointerLeft: string = '0%';
  // gradientColor: string = 'none';

  // @Watch('tc')
  // onTCChanged(color: tinycolor.Instance | null) {
  //   console.log(' color ===> ', color);
  //   if (color === null) {
  //     this.pointerLeft = '0%';
  //     return;
  //   }
  //   // console.log('this.tc.getAlpha() ==>', this.tc.getAlpha());
  //   this.pointerLeft = `${color.getAlpha() * 100}%`;
  // }

  get a() {
    if (this.tc === null) {
      return 1;
    }
    //@ts-ignore
    console.log('===a====', this.tc._a);
    //@ts-ignore
    return this.tc._a;
  }
  get pointerLeft() {
    // if (this.tc === null) {
    //   return '0%';
    // }
    // console.log('this.tc.getAlpha() ==>', this.tc.getAlpha());
    return `${this.a * 100}%`;
  }
  gradientColor() {
    if (this.tc === null) {
      /* TODO: */return 'black';
    }
    const rgba = this.tc.toRgb();
    const rgbStr = [rgba.r, rgba.g, rgba.b].join(',');
    return `linear-gradient(to right, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`;
  }
  mounted() {
    const $container = this.$refs.container as HTMLDivElement;
    this.containerWidth = $container.clientWidth
    this.xOffset = $container.getBoundingClientRect().left + window.pageXOffset
  }
  handleChange(pageX: number) {
    if (this.tc === null) {
      return;
    }

    const { containerWidth, xOffset } = this;
    const left = pageX - xOffset;

    let a;
    if (left < 0) {
      a = 0;
    } else if (left > containerWidth) {
      a = 1;
    } else {
      a = Math.round(left * 100 / containerWidth) / 100;
    }

    console.log('==this.tc.getAlpha()==>', this.tc.getAlpha(), a);
    if (this.tc.getAlpha() !== a) {
      // TODO: 需要强行改变 format
      this.onColorChange(this.tc.setAlpha(a));
    }
  }
  handleMouseDown(e: MouseEvent) {
    e.preventDefault();
    this.handleChange(e.pageX);
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }
  handleMouseMove(e: MouseEvent) {
    this.handleChange(e.pageX);
  }
  handleMouseUp () {
    this.unbindEventListeners()
  }
  unbindEventListeners () {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }
  handlTouchEvents (e: TouchEvent) {
    const pageX = e.touches ? e.touches[0].pageX : 0;
    this.handleChange(pageX);
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
