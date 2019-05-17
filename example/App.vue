<template>
  <div id="app">
    <iconscout-picker
      v-model="colors"
    />

    <iconscout-color-picker
      v-model="colors"
    />

    <div
      class="previewColor"
      :style="{
        backgroundColor: bgc
      }"/>
  </div>
</template>

<script>
import iconscout from '../src/components/Iconscout.vue'
import iconscoutColor from '../src/components/IconscoutColorPicker.vue'

let defaultProps = {
  hex: '#194d33',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 1
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 1
  },
  a: 1
}

export default {
  components: {
    'iconscout-picker': iconscout,
    'iconscout-color-picker': iconscoutColor
  },
  data () {
    return {
      colors: defaultProps
    }
  },
  computed: {
    bgc () {
      return `rgba(${this.colors.rgba.r}, ${this.colors.rgba.g}, ${this.colors.rgba.b}, ${this.colors.rgba.a})`
    }
  },
  methods: {
    onOk () {
      console.log('ok')
    },
    onCancel () {
      console.log('cancel')
    },
    updateValue (value) {
      this.colors = value
    }
  },
  created () {
  }
}
</script>

<style>
.previewColor {
  width: 100px;
  height: 100px;
}
</style>
