import Vue from 'vue/dist/vue.min.js'
import App from './App.vue'

/* eslint-disable */
console.log(Vue.version)
Vue.config.productionTip = false;

Vue.config.devtools = true

new Vue({
  el: '#app-wrap',
  render: h => h(App)
  // components: { App }
})
