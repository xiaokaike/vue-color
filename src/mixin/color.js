import tinycolor from 'tinycolor2'

export default {
  props: {
    colors: Object
  },
  created () {
    // console.log(this.colors)
    this.colors.hex = this.colors.hex.toUpperCase()
  },
  methods: {
    colorChange (data, oldHue) {
      if (data.a && data.a > 1) {
        data.a = 1
      }

      var color = data.hex ? tinycolor(data.hex) : tinycolor(data)
      var hsl = color.toHsl()
      var hsv = color.toHsv()
      if (hsl.s === 0) {
        hsl.h = oldHue || 0
        hsv.h = oldHue || 0
      }
      this.colors = {
        hsl: hsl,
        hex: color.toHexString().toUpperCase(),
        rgba: color.toRgb(),
        hsv: hsv,
        oldHue: data.h || oldHue || hsl.h,
        source: data.source,
        a: data.a
      }
    },
    isValidHex (hex) {
      return tinycolor(hex).isValid()
    },
    simpleCheckForValidColor (data) {
      var keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'a', 'v']
      var checked = 0
      var passed = 0

      for (var i = 0; i < keysToCheck.length; i++) {
        var letter = keysToCheck[i]
        if (data[letter]) {
          checked++
          if (!isNaN(data[letter])) {
            passed++
          }
        }
      }

      if (checked === passed) {
        return data
      }
    }
  }
}
