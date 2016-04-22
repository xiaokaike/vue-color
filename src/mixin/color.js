import tinycolor from 'tinycolor2'

var rgbaRE = /r|g|b|a/i
var hslRE = /h|s|l/i

export default {
  methods: {
    colorChange (data, type) {
      console.log(data, type)

      if(type === 'hex'){
        if(!this.isValidHex(data)){
          return
        }
        var c = tinycolor(data)
        this.hsl = c.toHsl()
        this.rgba = c.toRgb()
      }

      if(rgbaRE.test(type)){
        if(!this.simpleCheckForValidColor(this.rgba)){
          return
        }
        var c = tinycolor(this.rgba)
        this.hex = c.toHexString()
        this.hsl = c.toHsl()
      }

      if(hslRE.test(type)){
        if(!this.simpleCheckForValidColor(this.hsl)){
          return
        }
        var c = tinycolor(this.hsl)
        this.hex = c.toHexString()
        this.rgba = c.toRgb()
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