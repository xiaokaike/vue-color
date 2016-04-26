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
    val: [String | Number],
    onChange: Function
  },
  data () {
    return {
      arrowOffset: 1
    }
  },
  methods: {
    handleChange (e) {
      var data = {}
      data[this.label] = this.val;
      this.onChange(data)
    },
    handleBlur (e) {
      
    },
    handleKeyDown (e) {
      var val = this.val
      var number = Number(val)

      if (number) {
        var amount = this.arrowOffset || 1

        // Up
        if (e.keyCode === 38) {
          this.val = number + amount
          e.preventDefault()
        }

        // Down
        if (e.keyCode === 40) {
          this.val = number - amount
          e.preventDefault()
        }

        this.handleChange()
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

<style lang="stylus">
.editable-input
  position relative
  .input
    padding 0
    border 0
    outline none
  .label
    text-transform capitalize
</style>