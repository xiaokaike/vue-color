<template>
  
  <div class="material">
    <editable-input class="c-hex" label="hex" :val.sync="hex"
    :style="{ borderColor: hex }"
    @change="handleChange">
    </editable-input>
    <div class="split" className="flexbox-fix">
      <div class="third">
        <editable-input class="c-input" label="r" :val.sync="rgba.r" 
        @change="handleChange">
        </editable-input>
      </div>
      <div class="third">
        <editable-input class="c-input" label="g" :val.sync="rgba.g" 
        @change="handleChange">
        </editable-input>
      </div>
      <div class="third">
        <editable-input class="c-input" label="b" :val.sync="rgba.b" 
        @change="handleChange">
        </editable-input>
      </div>
    </div>
  </div>

</template>

<script>
import color from '../helpers/color'
import editableInput from './EditableInput.vue'

export default {
  name: 'Material',
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
      hex: '#333'
    }, 0)
    console.log(c)
  },
  methods: {
    handleChange (data) {
      if (data.hex) {
        color.isValidHex(data.hex) && this.props.onChange({
          hex: data.hex,
          source: 'hex',
        })
      } else if (data.r || data.g || data.b) {
        this.props.onChange({
          r: data.r || this.props.rgb.r,
          g: data.g || this.props.rgb.g,
          b: data.b || this.props.rgb.b,
          source: 'rgb',
        })
      }
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

.material .wrap {
  position: relative;
}
.c-hex input {
  width: 100%;
  margin-top: 12px;
  font-size: 15px;
  color: #333;
  padding: 0;
  border: 0;
  border-bottom: 2px solid #ccc;
  outline: none;
  height: 30px;
}
.c-hex .label {
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 11px;
  color: #999999;
  text-transform: capitalize;
}


/*Input*/
.c-input input {
  width: 100%;
  margin-top: 12px;
  font-size: 15px;
  color: #333;
  padding: 0;
  border: 0;
  border-bottom: 1px solid #eee;
  outline: none;
  height: 30px;
}
.c-input .label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 11px;
  color: #999999;
  text-transform: capitalize;
}

.c-input .wrap {
  position: relative;
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