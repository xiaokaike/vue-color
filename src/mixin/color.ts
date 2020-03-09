import Vue, { PropOptions }  from 'vue'
import tinycolor from 'tinycolor2';
import Component from 'vue-class-component'

const supportFormat = ['hex']

// We declare the props separately
// to make props types inferable.
const Props = Vue.extend({
  props: {
    value: {
      // default: '#fff',
      // required: true,
      validator(value){ return tinycolor(value).isValid() }
    } as PropOptions<tinycolor.ColorInput>,
    outputFormat: {
      type: String,
      validator(value){ return supportFormat.indexOf(value) >= 0 }
    }
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

// TODO: 枚举 & fallback
interface FormatMethodMap {
  [key: string]: 'toHexString'
}
const formatMethodMap: FormatMethodMap = {
  hex: 'toHexString'
};

@Component
export default class Color extends Props {

  // because default value is `#fff`
  inputFormat: string = 'hex';

  // `tc` stands for tinycolor
  get tc () {
    if (this.value === null) {
      // TODO: warning, when outputFormat is undefined
      this.inputFormat = this.outputFormat;
      return null;
    }
    const tc = tinycolor(this.value);
    this.inputFormat = tc.getFormat();
    return tc;
  }
  // set tc (value: tinycolor.ColorInput) {
  //   this.
  // }
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
  onColorChange(value: tinycolor.ColorInput) {
    const tc = tinycolor(value);
    let formatMethod = formatMethodMap[this.inputFormat];
    const res = formatMethod ? tc[formatMethod]() : tc;
    this.$emit('input', res);
    this.$emit('change', res);
  }
  // methods: {
  //   colorChange (data, oldHue) {
  //     this.oldHue = this.tc.hsl.h
  //     this.tc = _colorChange(data, oldHue || this.oldHue)
  //   },
  isValidHex(hex: string) {
    return tinycolor(hex).isValid();
  }
  //   paletteUpperCase (palette) {
  //     return palette.map(c => c.toUpperCase())
  //   },
  //   isTransparent (color) {
  //     return tinycolor(color).getAlpha() === 0
  //   }
  // }
};

