<template>
  
  <div class="material">
    <editable-input class="hex" label="hex" :val.sync="hex"
    :style="{ borderColor: hex }"
    :on-change="colorChange">
    </editable-input>
    <div class="split flexbox-fix">
      <div class="third">
        <editable-input label="r" :val.sync="rgba.r" 
        :on-change="colorChange">
        </editable-input>
      </div>
      <div class="third">
        <editable-input label="g" :val.sync="rgba.g" 
        :on-change="colorChange">
        </editable-input>
      </div>
      <div class="third">
        <editable-input label="b" :val.sync="rgba.b" 
        :on-change="colorChange">
        </editable-input>
      </div>
    </div>  
  </div>
  
</template>

<script>
import color from '../helpers/color'
import editableInput from './EditableInput.vue'
import colorMixin from '../mixin/color'

export default {
  name: 'Material',
  mixins: [colorMixin],
  props: {
    hex: String,
    rgba: Object,
    hsl: Object,
  },
  data () {
    return {
    }
  },
  components: {
    editableInput
  },
  ready () {
    var c = color.toState({
      hex: this.hex
    }, 0)
    console.log(c)
  },
  methods: {
    cc (e) {
      console.log(e)
    }
  }
}
</script>

<style>
.material {
  width: 98px;
  height: 98px;
  padding: 16px;
  font-family: "Roboto";
  position: relative;
  border-radius: 2px;
  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
}
.material .hex {
  border-width: 2px;
}
.split {
  display: flex;
  margin-right: -10px;
  padding-top: 11px;
}
.third {
  flex: 1;
  padding-right: 10px;
}
</style>