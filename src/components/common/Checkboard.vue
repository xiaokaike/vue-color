<template>
  <div
    class="vc-checkerboard"
    :style="bgStyle"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

let _checkboardCache: {[key: string]: string} = {};

@Component
export default class Checkboard extends Vue {
  @Prop({default: 8})
  readonly size!: number;

  @Prop({default: '#fff'})
  readonly white!: string;

  @Prop({default: '#e6e6e6'})
  readonly grey!: string;

  get bgStyle() {
    const checkboard = getCheckboard(this.white, this.grey, this.size);
    if (checkboard === null) {
      return {};
    }
    return {
      'background-image': `url(${checkboard})`
    }
  }
}

/**
 * get checkboard base data and cache
 *
 * @param {String} c1 hex color
 * @param {String} c2 hex color
 * @param {Number} size
 */
function getCheckboard (c1: string, c2: string, size: number) {
  const key = c1 + ',' + c2 + ',' + size

  if (_checkboardCache[key]) {
    return _checkboardCache[key]
  } else {
    const checkboard = renderCheckboard(c1, c2, size);
    if (checkboard === null) {
      return null;
    }
    _checkboardCache[key] = checkboard
    return checkboard
  }
}

/**
 * get base 64 data by canvas
 *
 * @param {String} c1 hex color
 * @param {String} c2 hex color
 * @param {Number} size
 */

function renderCheckboard (c1: string, c2: string, size: number) {
  // Dont Render On Server
  if (typeof document === 'undefined') {
    return null
  }
  var canvas = document.createElement('canvas')
  canvas.width = canvas.height = size * 2
  var ctx = canvas.getContext('2d')
  // If no context can be found, return early.
  if (!ctx) {
    return null
  }
  ctx.fillStyle = c1
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = c2
  ctx.fillRect(0, 0, size, size)
  ctx.translate(size, size)
  ctx.fillRect(0, 0, size, size)
  return canvas.toDataURL()
}

</script>

<style>
.vc-checkerboard {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-size: contain;
}
</style>
