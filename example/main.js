import Vue from 'vue';
import App from './App.vue';

/* eslint-disable */
console.log('vue version: ', Vue.version);

Vue.config.productionTip = false;
Vue.config.devtools = true

new Vue({
  el: '#app-wrap',
  render: h => h(App)
})
