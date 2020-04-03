<template>
  <div id="app">
    <a
      class="github-fork-ribbon"
      href="https://github.com/xiaokaike/vue-color"
      title="Fork me on GitHub"
    >
      Fork me on GitHub
    </a>
    <div class="header-container">
      <div
        class="header-bg"
        :style="{'background-color': bgc}"
      />
      <div class="header">
        <div class="intro-wrap">
          <div class="intro">
            <h1>Vue-color</h1>
            <p role="presentation">A Collection of Color Pickers from Sketch, Photoshop, Chrome, Github, Twitter, Material Design & more</p>
          </div>
        </div>
        <div class="demo-item">
          <Chrome v-model="color" />
          <h2>Chrome</h2>
        </div>
      </div>
    </div>

    <div class="demo-container">
      <div class="demo-list">
        <div class="demo-item">
          <Sketch v-model="color" />
          <h2>Sketch</h2>
        </div>
        <div class="demo-item">
          <Photoshop v-model="color" @ok="onOk" @cancel="onCancel" />
          <h2>Photoshop</h2>
        </div>
      </div>
      <div class="demo-list">
        <div class="demo-item">
          <Material v-model="color" />
          <h2>Material</h2>
        </div>
        <div class="demo-item">
          <Slider v-model="color" />
          <h2>Slider</h2>
        </div>
      </div>
      <div class="demo-list">
        <div class="demo-item">
          <Compact v-model="color" />
          <h2>Compact</h2>
          <br>
          <br>
          <Grayscale v-model="color" />
          <h2>Grayscale</h2>
        </div>
        <div class="demo-item">
          <Swatches v-model="color" />
          <h2>Swatches</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Photoshop, Chrome, Sketch, Slider, Swatches, Grayscale, Compact, Material } from '../dist/vue-color.min.mjs';

export default {
  components: {
    Photoshop,
    Chrome,
    Sketch,
    Slider,
    Swatches,
    Grayscale,
    Compact,
    Material
  },
  data () {
    return {
      color: '#194d33'
    }
  },
  computed: {
    bgc () {
      return typeof this.color === 'string' ? this.color : this.color.toHexString();
    }
  },
  methods: {
    onOk () {
      /* eslint-disable*/
      console.log('ok')
    },
    onCancel () {
      console.log('cancel')
      /* eslint-enable*/
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
}

.header-container {
  position: relative;
}
.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 580px;
  background-color: #333;
  opacity: 0.5;
  z-index: 0;
}
.header {
  display: flex;
  max-width: 780px;
  margin: 0 auto;
  padding: 20px 0;
}
.intro-wrap {
  flex: 1;
  margin-right: 100px;
}
.intro {
  width: 300px;
  color: rgba(0, 0, 0, 0.65098);
}
.intro > h1 {
  font-size: 40px;
  font-weight: normal;
  line-height: 60px;
}
.intro > p {
  font-size: 16px;
  font-weight: normal;
  line-height: 22px;
}

.demo-container {
  max-width: 780px;
  min-height: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}
.demo-list {
  display: flex;
  margin-bottom: 20px;
}
.demo-item {
  position: relative;
  margin-bottom: 10px;
  margin: 0 10px 0 10px;
  z-index: 2;
}
.demo-item h2 {
  margin: 0;
  padding: 5px 0;
  color: #666;
  font-size: 16px;
  font-weight: normal;
}
</style>
