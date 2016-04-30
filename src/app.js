import Vue from 'vue'
import color from './Color.vue'

Vue.config.debug = true

new Vue({
  el: '#app',
  components: {
    color
  }
})
