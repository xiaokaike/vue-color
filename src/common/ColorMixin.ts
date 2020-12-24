import Vue, { PropOptions } from 'vue';
import Tinycolor from 'tinycolor2';
import Component from 'vue-class-component';
import debounce from 'lodash.debounce';
import { DEFAULT_COLOR } from '../config';

interface FormatMethodMap {
  [key: string]: keyof Tinycolor.Instance;
}
const formatMethodMap: FormatMethodMap = {
  hex: 'toHex',
  hex8: 'toHex8',
  hexString: 'toHexString',
  hex8String: 'toHex8String',
  rgb: 'toRgb',
  rgbString: 'toRgbString',
  hsv: 'toHsv',
  hsvString: 'toHsvString',
  hsl: 'toHsl',
  hslString: 'toHslString',
  name: 'toName'
};

export const supportFormat = Object.keys(formatMethodMap);

function getAccurateFormat (format: string, value: tinycolor.ColorInput) {
  if (format === 'hex' && typeof value === 'string' && value.indexOf('#') >= 0) {
    return 'hexString';
  }
  if (format === 'hex8' && typeof value === 'string' && value.indexOf('#') >= 0) {
    return 'hex8String';
  }
  if (format === 'rgb' && typeof value === 'string') {
    return 'rgbString';
  }
  if (format === 'hsv' && typeof value === 'string') {
    return 'hsvString';
  }
  if (format === 'hsl' && typeof value === 'string') {
    return 'hslString';
  }
  return format;
}

// We declare the props separately
// to make props types inferable.
const Props = Vue.extend({
  props: {
    value: {
      validator (value) { return Tinycolor(value).isValid(); }
    } as PropOptions<tinycolor.ColorInput>,
    outputFormat: {
      type: String,
      validator (value) { return supportFormat.indexOf(value) >= 0; }
    }
  }
});

@Component
export default class Color extends Props {
  private debouncedChangeEvent = debounce((tc) => {
    this.$emit('change-complete', tc);
  }, 100); // TODO: debounce delay 可配置

  private debouncedConsistentChangeEvent = debounce((tc) => {
    this.$emit('consistent-change-complete', tc);
  }, 100); // TODO: debounce delay 可配置

  // because default value is `#000`
  private _outputFormat: string | undefined;

  get isInputEmpty () {
    return this.value === null;
  }

  // `tc` stands for tinycolor
  get tc () {
    if (this.value === null) {
      return new Tinycolor(DEFAULT_COLOR);
    }
    const tc = new Tinycolor(this.value);
    return tc;
  }

  created () {
    if (typeof this.outputFormat === 'undefined') {
      this._outputFormat = getAccurateFormat(new Tinycolor(this.value).getFormat(), this.value);
    } else {
      this._outputFormat = this.outputFormat;
    }
  }

  getOutputFormat () {
    return this._outputFormat;
  }

  setOutputFormat (format: string) {
    this._outputFormat = format;
  }

  onColorChange (value: tinycolor.ColorInput) {
    const tc = new Tinycolor(value);
    // to support v-model
    this.$emit('input', tc);
    this.$emit('change', tc);
    this.debouncedChangeEvent(tc);

    if (typeof this._outputFormat === 'undefined') {
      return;
    }
    // to avoid precision lose, need to separate another method to provide identical output
    const formatMethod = formatMethodMap[this._outputFormat];
    if (formatMethod && tc[formatMethod]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const formatted = tc[formatMethod]();
      this.$emit('consistent-change', formatted);
      this.debouncedConsistentChangeEvent(formatted);
    }
  }

  equals (color: tinycolor.ColorInput) {
    if (this.isInputEmpty) {
      return false;
    }
    return Tinycolor.equals(this.tc, color);
  }
};
