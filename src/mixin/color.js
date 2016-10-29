import tinycolor from 'tinycolor2'

function _colorChange (data, oldHue) {
  if (data.a && data.a > 1) {
    data.a = 1
  }

  var color = data.hex ? tinycolor(data.hex) : tinycolor(data)
  var hsl = color.toHsl()
  var hsv = color.toHsv()
  if (hsl.s === 0) {
    hsl.h = data.h || oldHue || 0
    hsv.h = data.h || oldHue || 0
  }
  return {
    hsl: hsl,
    hex: color.toHexString().toUpperCase(),
    rgba: color.toRgb(),
    hsv: hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
    a: data.a
  }
}

export default {
  props: ['value'],
  data () {
    return {
      val: _colorChange(this.value)
    }
  },
  computed: {
    colors: {
      get () {
        return this.val
      },
      set (newVal) {
        this.val = newVal
        this.$emit('change-color', newVal)
      }
    }
  },
  watch: {
    value (newVal) {
      this.val = _colorChange(newVal)
      // this.$emit('change', newVal)
    }
  },
  created () {
    // console.log(this.colors)
    /*
      Enforce the colorChange in case only HEX value is given.
      Guarantees that HEX value is uppercase and other values such
      as HSL or HSV exists and reflect the HEX value
      TODO accept any kind of color value, HEX, RGBA, HSL and others
    */
    // this.colors = _colorChange(this.colors)
  },
  methods: {
    colorChange (data, oldHue) {
      this.colors = _colorChange(data, oldHue || this.oldHue)
      this.oldHue = this.colors.hsl.h
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
