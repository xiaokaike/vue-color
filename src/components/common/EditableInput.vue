<template>
  <div class="vc-editable-input">
    <input
      ref="input"
      :value="value"
      :aria-label="desc ? label + '(' + desc + ')' : label"
      class="vc-input__input"
      @keydown="handleKeyDown"
      @input="handleInput"
    >
    <span
      :for="label"
      class="vc-input__label"
    >{{ label }}</span>
    <span class="vc-input__desc">{{ desc }}</span>
  </div>
</template>

<script>
import clamp from 'clamp'

function validate(v, max, min){
  const vv = +v;
  if (isNaN(vv)) {
    return v;
  }
  return clamp(vv, max, min)
}
const validators = {
  r: (v) => validate(v, 255, 0),
  g: (v) => validate(v, 255, 0),
  b: (v) => validate(v, 255, 0),
  a: (v) => validate(v, 1, 0),
  h: (v) => validate(v, 360, 0),
  s: (v) => validate(v, 100, 0),
  l: (v) => validate(v, 100, 0),
  v: (v) => validate(v, 100, 0),
}

export default {
  name: 'EditableInput',
  props: {
    label: String,
    desc: String,
    value: [String, Number],
    arrowOffset: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleChange (newVal) {
      const { label } = this;
      let data = {}
      newVal = validators[label] ? validators[label](newVal) : newVal
      data[label] = newVal
      this.$emit('change', data)
      this.$refs.input.value = newVal
    },
    handleInput(e) {
      this.handleChange(e.target.value)
    },
    handleKeyDown (e) {
      let val = e.target.value

      let number = Number(val)

      if (!isNaN(number)) {
        let amount = this.arrowOffset || 1

        // Up
        if (e.keyCode === 38) {
          val = number + amount
          this.handleChange(val)
          e.preventDefault()
        }

        // Down
        if (e.keyCode === 40) {
          val = number - amount
          this.handleChange(val)
          e.preventDefault()
        }
      }
    }
  }
}
</script>

<style>
.vc-editable-input {
  position: relative;
}
.vc-input__input {
  padding: 0;
  border: 0;
  outline: none;
}
.vc-input__label {
  text-transform: capitalize;
}
</style>
