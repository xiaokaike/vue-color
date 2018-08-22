<template>
  <div class="vc-editable-input">
    <input
      ref="input"
      :aria-label="desc ? label + '(' + desc + ')' : label"
      class="vc-input__input"
      :value="val"
      @keydown="handleKeyDown"
      @change="update"
    >
    <span
      :for="label"
      class="vc-input__label"
    >{{ label }}</span>
    <span class="vc-input__desc">{{ desc }}</span>
  </div>
</template>

<script>
export default {
  name: 'EditableInput',
  props: {
    label: String,
    desc: String,
    value: [String, Number],
    max: Number,
    min: Number,
    arrowOffset: {
      type: Number,
      default: 1
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (v) {
        // TODO: min
        if (!(this.max === undefined) && +v > this.max) {
          this.$refs.input.value = this.max
        } else {
          return v
        }
      }
    }
  },
  methods: {
    update (e) {
      this.handleChange(e.target.value)
    },
    handleChange (newVal) {
      let data = {}
      data[this.label] = newVal
      if (data.hex === undefined && data['#'] === undefined) {
        this.$emit('change', data)
      } else if (newVal.length > 5) {
        this.$emit('change', data)
      }
    },
    handleKeyDown (e) {
      let val = this.val
      let number = Number(val)

      if (number) {
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
