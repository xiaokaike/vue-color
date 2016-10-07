<template>
  <div id="app">
    <a class="github-fork-ribbon" href="https://github.com/xiaokaike/vue-color" title="Fork me on GitHub">Fork me on GitHub</a>
    <header>
      <h1>Vue-color</h1>
    </header>
    <div class="wrap">
      <!-- <div class="test-wrap">
        <p>{{colors.hex}}</p>
        <p>{{colors.rgba.r}} {{colors.rgba.g}} {{colors.rgba.b}} {{colors.rgba.a}}</p>
        <p>{{colors.hsl.h}} {{colors.hsl.s}} {{colors.hsl.l}} {{colors.hsl.a}}</p>
        <p>{{colors.hsv.h}} {{colors.hsl.s}} {{colors.hsv.v}} {{colors.hsv.a}}</p>
        <p>{{colors.a}}</p>
      </div> -->
      <div class="components-wrap" style="position: absolute; top: 10px; left: 10px;">
        <material-picker v-model="colors" @change-color="onChange"></material-picker>
        <h6>Material</h6>
      </div>
      <div class="components-wrap" style="position: absolute; top: 10px; left: 200px;">
        <compact-picker v-model="colors" @change-color="onChange"></compact-picker>
        <h6>Compact</h6>
      </div>
      <div class="components-wrap" style="position: absolute; top: 180px; left: 10px;">
        <slider-picker v-model="colors" @change-color="onChange"></slider-picker>
        <h6>Slider</h6>
      </div>
      <!-- <div class="components-wrap" style="position: absolute; top: 10px; right: 0px;">
        <photoshop-picker :colors.sync="colors" @ok="onOk" @cancel="onCancel"></photoshop-picker>
        <h6>Photoshop</h6>
      </div> -->
      <div class="components-wrap" style="position: absolute; top: 380px; right: 0px;">
        <swatches-picker v-model="colors" @change-color="onChange"></swatches-picker>
        <h6>Swatches</h6>
      </div>
      <!-- <div class="components-wrap" style="position: absolute; top: 400px; left: 300px;">
        <sketch-picker :colors.sync="colors"></sketch-picker>
        <h6>Sketch</h6>
      </div>
      <div class="components-wrap" style="position: absolute; top: 400px; left: 0px;">
        <chrome-picker :colors.sync="colors"></chrome-picker>
        <h6>Chrome</h6>
      </div> -->
    </div>
  </div>
</template>

<script>
import material from '../src/components/Material.vue'
import compact from '../src/components/Compact.vue'
import swatches from '../src/components/Swatches.vue'
import slider from '../src/components/Slider.vue'
import sketch from '../src/components/Sketch.vue'
import chrome from '../src/components/Chrome.vue'
import photoshop from '../src/components/Photoshop.vue'

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
  data () {
    return {
      colors: defaultProps
    }
  },
  components: {
    'material-picker': material,
    'compact-picker': compact,
    'swatches-picker': swatches,
    'slider-picker': slider,
    'sketch-picker': sketch,
    'chrome-picker': chrome,
    'photoshop-picker': photoshop
  },
  methods: {
    onOk () {
      console.log('ok')
    },
    onCancel () {
      console.log('cancel')
    },
    onChange (val) {
      this.colors = val
    }
  },
  created () {
  }
}
</script>

<style>
header {
  text-align: center;
}

.wrap {
  width: 1000px;
  min-height: 800px;
  margin: 0 auto;
  position: relative;
}

.components-wrap {
  margin-bottom: 10px;
}

.components-wrap h6 {
  margin: 0;
  padding: 5px 0;
  color: #666;
}

.test-wrap {
  margin-bottom: 10px;
}

.test-wrap p {
  margin: 0;
}
</style>
