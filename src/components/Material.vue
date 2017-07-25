<template>

  <div class="c-material">
    <ed-in class="hex" label="hex" v-model="colors.hex"
      :style="{ borderColor: colors.hex }" @change="onChange"></ed-in>

    <div class="split">
      <div class="third">
        <ed-in label="r" v-model="colors.rgba.r"
        @change="onChange"></ed-in>
      </div>
      <div class="third">
        <ed-in label="g" v-model="colors.rgba.g"
        @change="onChange"></ed-in>
      </div>
      <div class="third">
        <ed-in label="b" v-model="colors.rgba.b"
        @change="onChange"></ed-in>
      </div>
    </div>
  </div>

</template>

<script>
import editableInput from './common/EditableInput.vue'
import colorMixin from '../mixin/color'

export default {
  name: 'Material',
  mixins: [colorMixin],
  components: {
    'ed-in': editableInput
  },
  methods: {
    onChange (data) {
      if (!data) {
        return
      }
      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex'
        })
      } else if (data.r || data.g || data.b) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba'
        })
      }
    }
  }
}
</script>

<style scoped>
.c-material {
  width: 98px;
  height: 98px;
  padding: 16px;
  font-family: "Roboto";
  position: relative;
  border-radius: 2px;
  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
  background-color: #fff;
}

.c-material >>> .input__input {
  width: 100%;
  margin-top: 12px;
  font-size: 15px;
  color: #333;
  height: 30px;
}

.c-material >>> .input__label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 11px;
  color: #999;
  text-transform: capitalize;
}

.hex {
  border-bottom-width: 2px;
  border-bottom-style: solid;
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
