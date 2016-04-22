import tinycolor from 'tinycolor2'

var rgbaRE = /r|g|b|a/i
var hslRE = /h|s|l/i
var hsvRE = /h|s|v/i

export default {
  props: {
    colors: Object
  },
  created (){
    console.log(this.colors)
  },
  methods: {
    colorChange (data, oldHue) {
      var color = data.hex ? tinycolor(data.hex) : tinycolor(data)
      var hsl = color.toHsl()
      var hsv = color.toHsv()
      if (hsl.s === 0) {
        hsl.h = oldHue || 0
        hsv.h = oldHue || 0
      }

      this.colors = {
        hsl: hsl,
        hex: color.toHexString(),
        rgba: color.toRgb(),
        hsv: hsv,
        oldHue: data.h || oldHue || hsl.h,
        source: data.source,
      }

      this.onChange && this.onChange();
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