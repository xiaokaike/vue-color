<template>
  <div class="c-checkboard" :style="{background:  bg}"></div>
</template>

<script>

let _checkboardCache = {}

function renderCheckboard(c1, c2, size) {
  if (typeof document == 'undefined') return null // Dont Render On Server
  var canvas = document.createElement('canvas')
  canvas.width = canvas.height = size * 2
  var ctx = canvas.getContext('2d')
  if (!ctx) return null // If no context can be found, return early.
  ctx.fillStyle = c1
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = c2
  ctx.fillRect(0, 0, size, size)
  ctx.translate(size, size)
  ctx.fillRect(0, 0, size, size)
  return canvas.toDataURL()
}


function getCheckboard(c1, c2, size) {
  var key = c1 + ',' + c2 + ',' + size

  if (_checkboardCache[key]) {
    return _checkboardCache[key]
  } else {
    var checkboard = renderCheckboard(c1, c2, size)
    _checkboardCache[key] = checkboard
    return checkboard
  }
}

export default {
  name: 'Checkboard',
  data () {
    return {
      size: 8,
      white: '#fff',
      grey: '#e6e6e6',
    }
  },
  computed: {
    bg () {
      var bgi = getCheckboard(this.white, this.grey, this.size)

      return 'url(' + bgi + ') center left' 
    }
  }
}
</script>

<style lang="stylus">
.c-checkboard{
  position absolute
  top 0px
  right 0px
  bottom 0px
  left 0px
}
</style>