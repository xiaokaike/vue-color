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
    }
  },
  methods: {
    handleBlur () {
      if (this.state.blurValue) {
        this.setState({ value: this.state.blurValue, blurValue: null })
      }
    },
    handleChange (e) {
      if (this.props.label !== null) {
        var obj = {}
        obj[this.props.label] = e.target.value
        this.props.onChange(obj)
      } else {
        this.props.onChange(e.target.value)
      }

      this.setState({ value: e.target.value })
    },
    handleKeyDown (e) {
      var number = Number(e.target.value)
      if (number) {
        var amount = this.props.arrowOffset || 1

        // Up
        if (e.keyCode === 38) {
          if (this.props.label !== null) {
            var obj = {}
            obj[this.props.label] = number + amount
            this.props.onChange(obj)
          } else {
            this.props.onChange(number + amount)
          }

          this.setState({ value: number + amount })
        }

        // Down
        if (e.keyCode === 40) {
          if (this.props.label !== null) {
            var obj = {}
            obj[this.props.label] = number - amount
            this.props.onChange(obj)
          } else {
            this.props.onChange(number - amount)
          }

          this.setState({ value: number - amount })
        }

      }
    },
    handleDrag (e) {
      if (this.props.dragLabel) {
        var newValue = Math.round(this.props.value + e.movementX)
        if (newValue >= 0 && newValue <= this.props.dragMax) {
          var obj = {}
          obj[this.props.label] = newValue
          this.props.onChange(obj)
        }
      }
    },
    handleMouseDown (e) {
      if (this.props.dragLabel) {
        e.preventDefault()
        this.handleDrag(e)
        window.addEventListener('mousemove', this.handleDrag)
        window.addEventListener('mouseup', this.handleMouseUp)
      }
    },
    handleMouseUp () {
      this.unbindEventListeners()
    },
    unbindEventListeners () {
      window.removeEventListener('mousemove', this.handleChange)
      window.removeEventListener('mouseup', this.handleMouseUp)
    }
  }

}
</script>

<style>

</style>