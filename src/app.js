import Vue from 'vue'
import color from './Color.vue'

Vue.config.debug = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    color
  }
})
