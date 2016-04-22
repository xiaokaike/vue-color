<template>
  <div class="editable-input" data-cid="{{cid}}">
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
    cid: String,
    label: String,
    val: [String|Number],
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