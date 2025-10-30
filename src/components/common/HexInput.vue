<template>
  <EdIn
    :label="props.label" :a11y="a11y"
    :value="inputValueRef"
    @change="inputChangeHex"
    @blur="inputBlur"
  ></EdIn>
</template>

<script setup lang="ts">
import tinycolor from 'tinycolor2';
import { ref, watch } from 'vue';
import EdIn from './EditableInput.vue';
import { isValid } from '../../utils/color';

type Props = {
  value?: string;
  label?: string;
  desc?: string;
  a11y?: {
    label?: string;
  },
  type?: 'hex' | 'hex8';
  withHash?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'hex',
  withHash: false
});

const emit = defineEmits(['change']);

const a11y = {
  label: props.type === 'hex' ? 'Hex' : 'Hex with transparency',
  ...props.a11y
}

const formatHexValue = (rawValue?: string, formatType: 'hex' | 'hex8' = 'hex') => {
  let hex = '';
  if (formatType === 'hex') {
    hex = tinycolor(rawValue).toHexString(); // with hash
  }
  if (formatType === 'hex8') {
    hex = tinycolor(rawValue).toHex8String(); // with hash
  }
  if (props.withHash !== true) {
    hex = hex.replace('#', '');
  }
  return hex;
}

const inputValueRef = ref(formatHexValue(props.value, props.type));

watch(
  () => props.value,
  (newVal) => {
    if (!tinycolor.equals(newVal, inputValueRef.value)) {
      inputValueRef.value = formatHexValue(newVal, props.type);
    }
  }
);

const inputChangeHex = (data?: string) => {

  if (!data) {
    return;
  }

  inputValueRef.value = data;

  // fix: https://github.com/linx4200/vue-color/issues/325
  let length = data.length;
  if (data[0] === '#') {
    length = length - 1;
  }
  if (props.type === 'hex' && (length % 3 !== 0 && length !== 8)) {
    return;
  }
  if (props.type === 'hex8' && (length !== 8)) {
    return;
  }
  if (isValid(data)) {
    emit('change', data);
  }
};

const inputBlur = () => {
  let length = inputValueRef.value.length;
  if (inputValueRef.value[0] === '#') {
    length = length - 1;
  }
  if (isValid(inputValueRef.value) &&
    ((props.type === 'hex' && length === 6) || (props.type === 'hex8' && length === 8))) {
    return;
  }
  // Normalize the input value to the standard format.
  inputValueRef.value = formatHexValue(props.value, props.type);
}
</script>
