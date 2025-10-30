<template>
  <div class="vc-editable-input">
    <input
      class="vc-input-input"
      :value="props.value"
      @keydown="handleKeyDown"
      @input="handleInput"
      @blur="handleBlur"
      :aria-label="ariaLabel"
      :id="labelId"
    >
    <label :for="labelId" class="vc-input-label" aria-hidden="true">{{props.label}}</label>
    <span v-if="!!desc" class="vc-input-desc" aria-hidden="true">{{desc}}</span>
  </div>
</template>

<script setup lang="ts">
import { getFractionDigit } from '../../utils/math';
import { resolveArrowDirection } from '../../utils/dom';
import { isDefined } from '../../utils/helpers';

type Props = {
  value: string | number;
  label?: string;
  desc?: string;
  max?: number;
  min?: number;
  step?: number;
  a11y?: {
    label?: string;
  }
}

const props = withDefaults(defineProps<Props>(), {
  step: 1
});

const emit = defineEmits(['change', 'blur']);

const ariaLabel = props.a11y?.label ?? props.label;

const labelId = `input__label__${ariaLabel}__${Math.random().toString().slice(2, 5)}`;

function update (newVal: number | string) {
  const { min, max } = props;
  if (isDefined(max) && +newVal > max) {
    emit('change', max);
    return;
  }
  if (isDefined(min) && +newVal < min) {
    emit('change', min);
    return;
  }
  emit('change', newVal);
}

function handleInput (e: Event) {
  update((e.target as HTMLInputElement)?.value);
}

function handleBlur (e: Event) {
  emit('blur', e);
}

function handleKeyDown (e: KeyboardEvent) {
  let number = Number(props.value);
  if (!isNaN(number)) {
    let step = props.step;
    const fractionDigit = getFractionDigit(step);
    const arrowDirection = resolveArrowDirection(e);

    // Up
    if (arrowDirection === 'up') {
      update((number + step).toFixed(fractionDigit));
      e.preventDefault();
    }

    // Down
    if (arrowDirection === 'down') {
      update((number - step).toFixed(fractionDigit));
      e.preventDefault();
    }
  }
}

// **** unused
// function handleDrag (e) {
//   console.log(e)
// },
// function handleMouseDown (e) {
//   console.log(e)
// }
</script>

<style scoped>
.vc-editable-input {
  position: relative;
}
.vc-input-input {
  width: 100%;
  padding: 0;
  border: 0;
  outline: none;
}
.vc-input-label {
  text-transform: capitalize;
}
</style>
