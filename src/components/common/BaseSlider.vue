<template>
  <div class="vc-base-slider">
    <div v-if="$slots.background" class="background">
      <slot name="background"></slot>
    </div>
    <div
      :class="{
        slider: true,
        horizontal: direction === 'horizontal',
        vertical: direction === 'vertical',
      }"
      ref="containerRef"
      @mousedown="handleMouseDown"
      @touchstart="handleMouseDown"
      role="slider"
      :aria-label="ariaLabel"
      :aria-valuemax="max"
      aria-valuemin="0"
      :aria-valuenow="currentValue.toFixed(1)"
      tabindex="0"
      @keydown="handleKeydown"
    >
      <div
        class="picker-wrap"
        :style="{
          left: direction === 'horizontal' ? positionPortion : 0,
          top: direction === 'vertical' ? positionPortion : 0,
        }"
        role="presentation"
      >
        <slot name="picker">
          <div class="picker"></div> <!-- fallback content -->
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import { getPageXYFromEvent, getAbsolutePosition, resolveArrowDirection } from '../../utils/dom.ts';
import { throttle } from '../../utils/throttle.ts';
import { isDefined } from '../../utils/helpers.ts';

type Props = {
  direction?: 'horizontal' | 'vertical';
  modelValue?: number;
  value?: number;
  max?: number;
  step?: number;
  ariaLabel?: string;
};

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  modelValue: 0,
  value: 0,
  max: 100,
  ariaLabel: 'slider'
});

const emit = defineEmits(['input', 'update:modelValue']);

const currentValue = computed(() => props.modelValue ?? props.value);

const positionPortion = computed(() => {
  let percentage = currentValue.value / props.max;
  if (props.direction === 'vertical') {
    // In a vertical slider,
    // lower values place the picker lower on the track,
    // which corresponds to a higher percentage in CSS positioning.
    percentage = 1 - percentage;
  }
  return 100 * percentage + '%';
});

// No using `useTemplateRef` because of vue 2.7 compatibility
const containerRef = ref<HTMLElement | null>(null);

function emitChange (value?: number) {
  if (isDefined(value)) {
    emit('input', value);
    emit('update:modelValue', value);
  }
}

function handleChange (e: MouseEvent | TouchEvent) {
  const { direction, max } = props;

  const container = containerRef.value;
    /* v8 ignore next 4 */
  if (!container) {
    // for some edge cases, container may not exist. see #220
    return
  }

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  const {x: xOffset, y: yOffset } = getAbsolutePosition(container);
  const {x: pageX, y: pageY } = getPageXYFromEvent(e);

  const left = pageX - xOffset;
  const top = pageY - yOffset;

  let newValue;

  if (direction === 'vertical') {
    if (top < 0) {
      newValue = max;
    } else if (top > containerHeight) {
      newValue = 0;
    } else {
      newValue = (1 - (top / containerHeight)) * max;
    }
  } else {
    if (left < 0) {
      newValue = 0;
    } else if (left > containerWidth) {
      newValue = max;
    } else {
      newValue = (left / containerWidth) * max;
    }
  }
  emitChange(newValue);
}

const throttledHandleChange = throttle(handleChange);

function handleMouseDown (e: MouseEvent | TouchEvent) {
  handleChange(e);
  if (e.type.startsWith('mouse')) {
    window.addEventListener('mousemove', throttledHandleChange);
    window.addEventListener('mouseup', handleMouseUp);
  } else {
    window.addEventListener('touchmove', throttledHandleChange)
    window.addEventListener('touchend', handleMouseUp);
  }
}

/* v8 ignore next 3 */
function handleMouseUp () {
  unbindEventListeners();
}

function unbindEventListeners () {
  window.removeEventListener('mousemove', throttledHandleChange);
  window.removeEventListener('mouseup', handleMouseUp);

  window.removeEventListener('touchmove', throttledHandleChange);
  window.removeEventListener('touchend', handleMouseUp);
}

function handleKeydown(e: KeyboardEvent) {
  e.preventDefault();
  const { direction, max } = props;
  const keyDirection = resolveArrowDirection(e);
  const step = props.step ?? max / 100;
  const value = currentValue.value;
  let newValue;
  switch(keyDirection) {
    case 'left': {
      if (direction !== 'horizontal') {
        return;
      }
      newValue = value - step < 0 ? 0 : value - step;
      break;
    }
    case 'right': {
      if (direction !== 'horizontal') {
        return;
      }
      newValue = value + step > max ? max : value + step;
      break;
    }
    case 'down': {
      if (direction !== 'vertical') {
        return;
      }
      newValue = value - step < 0 ? 0 : value - step;
      break;
    }
    case 'up': {
      if (direction !== 'vertical') {
        return
      }
      newValue = value + step > max ? max : value + step;
      break;
    };
  }

  emitChange(newValue);
}

onUnmounted(() => {
  unbindEventListeners();
});
</script>

<style scoped>
.vc-base-slider {
  position: relative;
  width: 100%;
  height: 100%;
  /** preventing default (scroll) behavior */
  touch-action: none;
}
.background, .slider {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.background {
  overflow: hidden;
}
.slider {
  cursor: pointer;
  z-index: 2;
}
.picker-wrap {
  position: absolute;
  z-index: 2;
  outline: none;
}
.picker {
  width: 4px;
  height: 8px;
  margin-top: 1px;
  border-radius: 1px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  background: var(--vc-picker-bg);
  cursor: pointer;
  transform: translateX(-2px);
}
</style>
