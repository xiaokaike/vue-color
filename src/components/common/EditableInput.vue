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

<script lang="ts">
import clamp from 'clamp';
import { Vue, Component, Prop, Ref } from 'vue-property-decorator';

const clamps = {
  r: (v: number) => clamp(v, 255, 0),
  g: (v: number) => clamp(v, 255, 0),
  b: (v: number) => clamp(v, 255, 0),
  a: (v: number) => clamp(v, 1, 0),
  h: (v: number) => clamp(v, 360, 0),
  s: (v: number) => clamp(v, 100, 0),
  l: (v: number) => clamp(v, 100, 0),
  v: (v: number) => clamp(v, 100, 0),
}

type LabelsWithClamp = 'r' | 'g' | 'b' | 'a' | 'h' | 's' | 'l' | 'v';

@Component
export default class EditableInput extends Vue {
  @Prop()
  value !: string | number;
  @Prop()
  label?: LabelsWithClamp | string;
  @Prop()
  desc ?: string;
  @Prop({ default: 1 })
  step?: number;

  @Ref()
  readonly input!: HTMLInputElement;

  handleChange (value: string | number) {
    const { label } = this;
    let v = value;
    let numberedValue = +value;
    if (!isNaN(numberedValue)) {
      if (label === 'r' ||  label === 'g' ||  label === 'b' ||  label === 'a' ||  label === 'h' ||  label === 's' ||  label === 'l' ||  label === 'v') {
        const clamp = clamps[label];
        v = clamp(numberedValue);
      }
    }
    this.$emit('change', v);
    const $input = this.$refs.input as HTMLInputElement;
    $input.value = v.toString();
  }

  handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    e.target && this.handleChange(target.value);
  }

  handleKeyDown(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;
    let val = target.value;

    let number = Number(val)

    if (!isNaN(number)) {
      let amount = this.step || 1;

      // Up
      if (e.keyCode === 38) {
        // TODO: 精度问题
        this.handleChange(number + amount)
        e.preventDefault()
      }

      // Down
      if (e.keyCode === 40) {
        // TODO: 精度问题
        this.handleChange(number - amount)
        e.preventDefault()
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
