<template>
  
  <div class="c-material">
    <editable-input class="hex" label="hex" cid="hex"
    :val.sync="colors.hex"
    :style="{ borderColor: colors.hex }"
    :on-change="onChange">
    </editable-input>
    <div class="split flexbox-fix">
      <div class="third">
        <editable-input label="r" cid="rgba"
        :val.sync="colors.rgba.r" 
        :on-change="onChange">
        </editable-input>
      </div>
      <div class="third">
        <editable-input label="g" cid="rgba"
        :val.sync="colors.rgba.g" 
        :on-change="onChange">
        </editable-input>
      </div>
      <div class="third">
        <editable-input label="b" cid="rgba"
        :val.sync="colors.rgba.b"
        :on-change="onChange">
        </editable-input>
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
  props: {
  },
  data () {
    return {
    }
  },
  components: {
    editableInput
  },
  ready () {
  },
  methods: {
    onChange (data) {
      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex',
        })
      } else if (data.r || data.g || data.b) {
        this.colorChange({
          r: data.r || this.colors.rgb.r,
          g: data.g || this.colors.rgb.g,
          b: data.b || this.colors.rgb.b,
          a: data.a || this.colors.rgb.a,
          source: 'rgba',
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.c-material
  width 98px
  height 98px
  padding 16px
  font-family "Roboto"
  position relative
  border-radius 2px
  box-shadow 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)
  .hex
    border-width 2px
  .split
    display flex
    margin-right -10px
    padding-top 11px
  .third
    flex 1
    padding-right 10px
</style>