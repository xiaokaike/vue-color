import Vue, { PropOptions }  from 'vue'
import tinycolor from 'tinycolor2';
import Component from 'vue-class-component'

// We declare the props separately
// to make props types inferable.
const Props = Vue.extend({
  props: {
    value: {
      default: '#fff',
      required: true,
      validator(value){ return tinycolor(value).isValid() }
    } as PropOptions<tinycolor.ColorInput>
  }
})

// function _colorChange (data, oldHue) {
//   var alpha = data && data.a
//   var color

//   // hsl is better than hex between conversions
//   if (data && data.hsl) {
//     color = tinycolor(data.hsl)
//   } else if (data && data.hex && data.hex.length > 0) {
//     color = tinycolor(data.hex)
//   } else if (data && data.hsv) {
//     color = tinycolor(data.hsv)
//   } else if (data && data.rgba) {
//     color = tinycolor(data.rgba)
//   } else if (data && data.rgb) {
//     color = tinycolor(data.rgb)
//   } else {
//     color = tinycolor(data)
//   }

//   if (color && (color._a === undefined || color._a === null)) {
//     color.setAlpha(alpha || 1)
//   }

//   var hsl = color.toHsl()
//   var hsv = color.toHsv()

//   if (hsl.s === 0) {
//     hsv.h = hsl.h = data.h || (data.hsl && data.hsl.h) || oldHue || 0
//   }

//   /* --- comment this block to fix #109, may cause #25 again --- */
//   // when the hsv.v is less than 0.0164 (base on test)
//   // because of possible loss of precision
//   // the result of hue and saturation would be miscalculated
//   // if (hsv.v < 0.0164) {
//   //   hsv.h = data.h || (data.hsv && data.hsv.h) || 0
//   //   hsv.s = data.s || (data.hsv && data.hsv.s) || 0
//   // }

//   // if (hsl.l < 0.01) {
//   //   hsl.h = data.h || (data.hsl && data.hsl.h) || 0
//   //   hsl.s = data.s || (data.hsl && data.hsl.s) || 0
//   // }
//   /* ------ */

//   return {
//     hsl: hsl,
//     hex: color.toHexString().toUpperCase(),
//     hex8: color.toHex8String().toUpperCase(),
//     rgba: color.toRgb(),
//     hsv: hsv,
//     oldHue: data.h || oldHue || hsl.h,
//     source: data.source,
//     a: data.a || color.getAlpha()
//   }
// }

@Component
export default class Color extends Props {
  // `tc` stands for tinycolor
  get tc () {
    return tinycolor(this.value)
  }
  // props: {
  //   color: {
  //     type: [String, Object],
  //     required: true,
  //     default: '#fff',
  //     validator: color => tinycolor(color).isValid
  //   }
  // },
  // computed: {
  //   // `tc` stands for tinycolor
  //   tc: {
  //     get () {
  //       return _colorChange(this.color)
  //     },
  //     set (color) {
  //       this.$emit('change', color)
  //     }
  //   }
  // },
  handleColorChanged() {
    // this.tc = color
  }
  // methods: {
  //   colorChange (data, oldHue) {
  //     this.oldHue = this.tc.hsl.h
  //     this.tc = _colorChange(data, oldHue || this.oldHue)
  //   },
  //   isValidHex (hex) {
  //     return tinycolor(hex).isValid()
  //   },
  //   paletteUpperCase (palette) {
  //     return palette.map(c => c.toUpperCase())
  //   },
  //   isTransparent (color) {
  //     return tinycolor(color).getAlpha() === 0
  //   }
  // }
};

