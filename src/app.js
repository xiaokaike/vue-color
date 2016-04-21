import color from './Color.vue'
import material from './components/Material.vue'

Vue.config.debug = true

new Vue({
	el: '#app',
	components: {
    color,
    material
  },
  data () {
    return {
    }
  }
})

