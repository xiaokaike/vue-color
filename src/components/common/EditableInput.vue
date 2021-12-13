<template>
  <div class="vc-editable-input">
    <div class="copyright" @click="onCopy">
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" >
        <path d="M15.5 6.45033C15.4913 6.37377 15.4746 6.29835 15.45 6.22533V6.15033C15.4099 6.06464 15.3565 5.98588 15.2917 5.91699L10.2917 0.916992C10.2228 0.852172 10.144 0.798726 10.0583 0.758659C10.0335 0.755126 10.0082 0.755126 9.98333 0.758659C9.89868 0.71011 9.80519 0.678946 9.70833 0.666992H6.33333C5.67029 0.666992 5.03441 0.930384 4.56557 1.39923C4.09673 1.86807 3.83333 2.50395 3.83333 3.16699V4.00033H3C2.33696 4.00033 1.70107 4.26372 1.23223 4.73256C0.763392 5.2014 0.5 5.83728 0.5 6.50033V14.8337C0.5 15.4967 0.763392 16.1326 1.23223 16.6014C1.70107 17.0703 2.33696 17.3337 3 17.3337H9.66667C10.3297 17.3337 10.9656 17.0703 11.4344 16.6014C11.9033 16.1326 12.1667 15.4967 12.1667 14.8337V14.0003H13C13.663 14.0003 14.2989 13.7369 14.7678 13.2681C15.2366 12.7993 15.5 12.1634 15.5 11.5003V6.50033C15.5 6.50033 15.5 6.50033 15.5 6.45033ZM10.5 3.50866L12.6583 5.66699H11.3333C11.1123 5.66699 10.9004 5.5792 10.7441 5.42291C10.5878 5.26663 10.5 5.05467 10.5 4.83366V3.50866ZM10.5 14.8337C10.5 15.0547 10.4122 15.2666 10.2559 15.4229C10.0996 15.5792 9.88768 15.667 9.66667 15.667H3C2.77899 15.667 2.56702 15.5792 2.41074 15.4229C2.25446 15.2666 2.16667 15.0547 2.16667 14.8337V6.50033C2.16667 6.27931 2.25446 6.06735 2.41074 5.91107C2.56702 5.75479 2.77899 5.66699 3 5.66699H3.83333V11.5003C3.83333 12.1634 4.09673 12.7993 4.56557 13.2681C5.03441 13.7369 5.67029 14.0003 6.33333 14.0003H10.5V14.8337ZM13.8333 11.5003C13.8333 11.7213 13.7455 11.9333 13.5893 12.0896C13.433 12.2459 13.221 12.3337 13 12.3337H6.33333C6.11232 12.3337 5.90036 12.2459 5.74408 12.0896C5.5878 11.9333 5.5 11.7213 5.5 11.5003V3.16699C5.5 2.94598 5.5878 2.73402 5.74408 2.57774C5.90036 2.42146 6.11232 2.33366 6.33333 2.33366H8.83333V4.83366C8.83333 5.4967 9.09672 6.13259 9.56557 6.60143C10.0344 7.07027 10.6703 7.33366 11.3333 7.33366H13.8333V11.5003Z" fill="#B4BAD6"/>
      </svg>
    </div>
    <input class="vc-input__input"
      :aria-label="desc?label+'('+desc+')':label"
      v-model="val"
      @keydown="handleKeyDown"
      @input="update"
      ref="input">
    <span class="vc-input__label">{{label}}</span>
    <span class="vc-input__desc">{{desc}}</span>
  </div>
</template>

<script>
import CopyToClipboard from 'copy-to-clipboard'

export default {
  name: 'editableInput',
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
    onCopy() {
      CopyToClipboard(this.value)
    },

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
    // **** unused
    // handleBlur (e) {
    //   console.log(e)
    // },
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
    // **** unused
    // handleDrag (e) {
    //   console.log(e)
    // },
    // handleMouseDown (e) {
    //   console.log(e)
    // }
  }
}
</script>

<style>
.vc-editable-input {
  position: relative;
}
.vc-editable-input .copyright{
  position: absolute;
  left: 10.5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.vc-editable-input .vc-input__input {
  padding: 0;
  border: 0;
  outline: none;
  padding-left: 35px;
  padding-right: 10px;
  box-sizing: border-box;
}
.vc-input__label {
  text-transform: capitalize;
}
</style>
