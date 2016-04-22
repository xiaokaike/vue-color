<template>
  <div>
    <div class="test-wrap">
      <p>{{hex}}</p>
      <p>{{rgba.r}} {{rgba.g}} {{rgba.b}} {{rgba.a}}</p>
      <p>{{hsl.h}} {{hsl.s}} {{hsl.l}}</p>
    </div>

    <div class="components-wrap">
      <material :hex.sync="hex" :rgba.sync="rgba" :hsl.sync="hsl"></material>
      <h6>Material</h6>
    </div>
    
    <div class="components-wrap">
      <compact :hex.sync="hex" :rgba.sync="rgba" :hsl.sync="hsl"></compact>
      <h6>Compact</h6>
    </div>

    <div class="components-wrap">
      <swatches :hex.sync="hex" :rgba.sync="rgba" :hsl.sync="hsl"></swatches>
      <h6>Swatches</h6>
    </div>
  </div>
</template>

<script>
import material from './components/Material.vue'
import compact from './components/Compact.vue'
import swatches from './components/Swatches.vue'

export default {
  name: 'Color',
  components:{
    material,
    compact,
    swatches
  },
  props: {
  },
  data () {
    return {
      hex: '#333',
      rgba: {
        r: 51,
        g: 51,
        b: 51,
        a: 1,
      },
      hsl: {
        h: 0,
        s: 0,
        l: .20,
        a: 1,
      }
    }
  }

}
</script>

<style>
.components-wrap{
  margin-bottom: 10px;
}
.components-wrap h6{
  margin: 0;
  padding: 5px 0;
  color: #666;
}
.test-wrap {
  margin-bottom: 10px;
}
.test-wrap p{
  margin: 0;
}
</style>