<template>
  <div class="editable-input">
    <input class="input" 
      v-model="val"
      @keydown="handleKeyDown"
      @input="handleChange">
    <span class="label" @mousedown="handleMouseDown">{{label}}</span>
  </div>
</template>

<script>
export default {
  name: 'editableInput',
  props: {
    label: String,
    val: [String, Number],
    onChange: Function
  },
  data () {
    return {
      arrowOffset: 1
    }
  },
  methods: {
    handleChange (e) {
      console.log('change', e)
      this.onChange(this.val, this.label)
    },
    handleBlur (e) {
      
    },
    handleKeyDown (e) {
      var val = this.val
      var label = this.label
      var number = Number(val)

      if (number) {
        var amount = this.arrowOffset || 1

        // Up
        if (e.keyCode === 38) {
          this.val = number + amount
          e.preventDefault()
          this.onChange(val, label)
        }

        // Down
        if (e.keyCode === 40) {
          this.val = number - amount
          e.preventDefault()
          this.onChange(val, label)
        }

      }
    },
    handleDrag (e) {
      console.log(e)
    },
    handleMouseDown (e) {
      
    }
  }

}
</script>

<style>
.editable-input {
  border-bottom: 1px solid #eee;
  position: relative;
}
.editable-input .input{
  width: 100%;
  margin-top: 12px;
  font-size: 15px;
  color: #333;
  padding: 0;
  border: 0;
  outline: none;
  height: 30px;
}
.editable-input .label{
  position: absolute;
  top: 0;
  left: 0;
  font-size: 11px;
  color: #999999;
  text-transform: capitalize;
}
</style>