<template>
  <div role='application' aria-label='Chrome color picker' class='vc-paletto'>
    <div class='vc-paletto-saturation-wrap'>
      <saturation v-model='colors' @change='childChange'></saturation>
    </div>
    <div class='vc-paletto-body'>
      <div class='vc-paletto-controls'>
         <div class='vc-paletto-sliders'>
          <div class='vc-paletto-hue-wrap'>
            <hue v-model='colors' @change='childChange' direction='vertical'></hue>
          </div>
        </div>
      </div>
    </div>
    <div class='vc-paletto-fields-wrap' v-if='!disableFields'>
        <div class='vc-paletto-fields'>
            <!-- hex -->
            <div class='vc-paletto-field vc-paletto-field-hex'>
            <ed-in label='hex' :value='colors.hex' @change='inputChange'></ed-in>
            </div>
        </div>
        <div class='vc-paletto-fields'>
            <!-- rgba -->
            <div class='vc-paletto-field'>
            <ed-in label='r' :value='colors.rgba.r' @change='inputChange'></ed-in>
            </div>
            <div class='vc-paletto-field'>
            <ed-in label='g' :value='colors.rgba.g' @change='inputChange'></ed-in>
            </div>
            <div class='vc-paletto-field'>
            <ed-in label='b' :value='colors.rgba.b' @change='inputChange'></ed-in>
            </div>
        </div>
        <div class='vc-paletto-fields'>
            <!-- hsla -->
            <div class='vc-paletto-field'>
            <ed-in label='h' :value='hsl.h' @change='inputChange'></ed-in>
            </div>
            <div class='vc-paletto-field'>
            <ed-in label='s' :value='hsl.s' @change='inputChange'></ed-in>
            </div>
            <div class='vc-paletto-field'>
            <ed-in label='l' :value='hsl.l' @change='inputChange'></ed-in>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import colorMixin from '../mixin/color'
import editableInput from './common/EditableInput.vue'
import saturation from './common/Saturation.vue'
import hue from './common/Hue.vue'
import checkboard from './common/Checkboard.vue'

export default {
  name: 'Paletto',
  mixins: [colorMixin],
  props: {
    disableFields: {
      type: Boolean,
      default: false
    }
  },
  components: {
    saturation,
    hue,
    'ed-in': editableInput,
    checkboard
  },
  data () {
    return {
      fieldsIndex: 0,
      highlight: false
    }
  },
  computed: {
    hsl () {
      const { h, s, l } = this.colors.hsl
      return {
        h: h.toFixed(),
        s: `${(s * 100).toFixed()}%`,
        l: `${(l * 100).toFixed()}%`
      }
    },
    activeColor () {
      const rgba = this.colors.rgba
      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
    },
    hasAlpha () {
      return this.colors.a < 1
    }
  },
  methods: {
    childChange (data) {
      this.colorChange(data)
    },
    inputChange (data) {
      if (!data) {
        return
      }
      if (data.hex) {
        this.isValidHex(data.hex) &&
          this.colorChange({
            hex: data.hex,
            source: 'hex'
          })
      } else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba'
        })
      } else if (data.h || data.s || data.l) {
        const s = data.s ? data.s.replace('%', '') / 100 : this.colors.hsl.s
        const l = data.l ? data.l.replace('%', '') / 100 : this.colors.hsl.l

        this.colorChange({
          h: data.h || this.colors.hsl.h,
          s,
          l,
          source: 'hsl'
        })
      }
    },
    toggleViews () {
      if (this.fieldsIndex >= 2) {
        this.fieldsIndex = 0
        return
      }
      this.fieldsIndex++
    },
    showHighlight () {
      this.highlight = true
    },
    hideHighlight () {
      this.highlight = false
    }
  }
}
</script>

<style>
.vc-paletto {
  box-sizing: initial;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  grid-column-gap: var(--pi-margin-small, .5rem);
}

.vc-paletto-controls {
  display: flex;
}

.vc-paletto-sliders {
  flex: 1;
}

.vc-paletto-fields-wrap {
  display: grid;
  grid-template-columns: 1.375fr 1fr 1fr;
  overflow: hidden;
  padding: 1rem;
  grid-column-start: 1;
  grid-column-end: 3;
  font-family: var(--pi-font-family-monospace, 'monospace');
}

@media (min-width: 30em) {
  .vc-paletto-fields-wrap {
    grid-column-end: 2;
  }
}

.vc-paletto-fields {
  display: block;
}

/* .vc-paletto-field {
  width: 100%;
} */

.vc-paletto-hue-wrap {
  position: relative;
  height: 100%;
  width: 2.25rem;
}

.vc-paletto .vc-hue {
  border-radius: 0;
}

.vc-paletto-hue-wrap .vc-hue-picker {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 100%;
  transform: translate(0, -1.125rem);
  background-color: rgb(248, 248, 248);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
}
.vc-paletto-body {
  display: flex;
}
.vc-paletto-saturation-wrap {
  width: 100%;
  padding-bottom: 55%;
  position: relative;
  overflow: hidden;
}
.vc-paletto-saturation-wrap .vc-saturation-circle {
  width: 2.25rem;
  height: 2.25rem;
  transform: translate(-1rem, -1rem);
  border-radius: 100%;
}

.vc-saturation-circle {
  transition: width ease-in 0.15s, height ease-in 0.15s, transform ease-in 0.15s;
}

.vc-editable-input {
  display: grid;
  grid-template-columns: auto auto;
  width: 100%;
  justify-content: start;
  grid-gap: .25rem;
}

.vc-paletto-fields .vc-input__input {
  font-size: var(--pi-font-size-sm, 11px);
  color: #fff;
  width: 2.25rem;
  border: none;
  text-align: left;
  background: rgba(0,0,0,.1);
  order: 1;
  border-bottom: 1px solid var(--pi-color-quiet, #fff);
  padding: 0 .25rem;
}

.vc-paletto-field-hex .vc-editable-input {
  grid-template-columns: auto auto;
}

.vc-paletto-field-hex .vc-input__input {
  width: 3.675rem;
}

.vc-paletto-field {
  margin-bottom: 0.125rem;
}

.vc-paletto-fields .vc-input__label {
  text-transform: uppercase;
  font-size: var(--pi-font-size-sm, 11px);
  color: var(--pi-color-quiet, #fff);
  display: block;
  margin: 0;
}

.vc-paletto .vc-hue-container {
  margin: 0;
}
</style>
