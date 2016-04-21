<template>
  <div class="wrap">
    <input class="input" 
      v-model="val"
      @keydown="handleKeyDown" 
      @change="handleChange" 
      @blur="handleBlur"/>
    <span class="label" @mousedown="handleMouseDown">{{label}}</span>
  </div>
</template>

<script>
export default {
  name: 'editableInput',
  props: {
    label: String,
    val: [String, Number],
  },
  data () {
    return {
      arrowOffset: 1
    }
  },
  methods: {
    handleBlur () {
      
    },
    handleChange (e) {
      
    },
    handleKeyDown (e) {
      var val = this.val;

      var number = Number(val)
      if (number) {
        var amount = this.arrowOffset || 1

        // Up
        if (e.keyCode === 38) {
          this.val = number + amount
        }

        // Down
        if (e.keyCode === 40) {
          this.val = number - amount
        }

      }
    },
    handleDrag (e) {
      
    },
    handleMouseDown (e) {
      
    }
  }

}
</script>

<style>

</style>