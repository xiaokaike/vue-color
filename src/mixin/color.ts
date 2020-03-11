import Vue, { PropOptions }  from 'vue'
import tinycolor from 'tinycolor2';
import Component from 'vue-class-component'

// TODO: 枚举 & fallback
const supportFormat = ['hex', 'hex8']

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

// TODO: 枚举 & fallback
interface FormatMethodMap {
  [key: string]: 'toHexString' | 'toHex8String'
}
const formatMethodMap: FormatMethodMap = {
  hex: 'toHexString',
  hex8: 'toHex8String'
};

@Component
export default class Color extends Props {

  // because default value is `#fff`
  private _outputFormat: string = 'hex';

  // `tc` stands for tinycolor
  get tc () {
    if (this.value === null) {
      // TODO: warning, when outputFormat is undefined
      this._outputFormat = this.outputFormat;
      return null;
    }
    const tc = tinycolor(this.value);
    this._outputFormat = tc.getFormat();
    return tc;
  }
  getOutputFormat() {
    return this._outputFormat;
  }
  setOutputFormat(/*TODO: enum this type */format: string) {
    this._outputFormat = format;
  }
  onColorChange(value: tinycolor.ColorInput) {
    const tc = tinycolor(value);
    let formatMethod = formatMethodMap[this._outputFormat];
    const res = formatMethod ? tc[formatMethod]() : tc;
    console.log(" color onColorChange ===>", res);
    this.$emit('input', res);
    this.$emit('change', res);
  }
  isValidHex(hex: string) {
    return tinycolor(hex).isValid();
  }
  equals(color: tinycolor.ColorInput) {
    if (this.tc === null) {
      return false;
    }
    return tinycolor.equals(this.tc, color);
  }
  //   isTransparent (color) {
  //     return tinycolor(color).getAlpha() === 0
  //   }
  // }
};

