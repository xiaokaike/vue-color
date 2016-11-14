<template>
  <div class="vue-color__editable-input">
    <input class="vue-color__editable-input__input"
      v-model="val"
      @keydown="handleKeyDown"
      @input="update">
    <span class="vue-color__editable-input__label">{{label}}</span>
  </div>
</template>

<script>
export default {
  name: 'editableInput',
  props: {
    label: String,
    value: [String, Number],
    max: Number,
    arrowOffset: {
      type: Number,
      default: 1
    }
  },
  computed: {
    val () {
      return this.value
    }
  },
  filters: {
    maxFilter: {
      read (val) {
        if (this.max && val > this.max) {
          return this.max
        } else {
          return val
        }
      },
      write (val, oldVal) {
        return val
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
      this.$emit('on-change', data)
    },
    handleBlur (e) {
      console.log(e)
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
    },
    handleDrag (e) {
      console.log(e)
    },
    handleMouseDown (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="stylus">
.vue-color__editable-input
  position relative
.vue-color__editable-input__input
  padding 0
  border 0
  outline none
.vue-color__editable-input__label
  text-transform capitalize
</style>
