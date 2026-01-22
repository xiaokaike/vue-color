<template>
  <button
    class="vc-eyedropper-btn"
    type="button"
    :disabled="!supported"
    @click="pick"
    :aria-label="supported ? ariaLabel : unsupportedAriaLabel"
    :title="supported ? title : unsupportedTitle"
  >
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <path d="M517.248 371.52L186.24 696.064l-30.144 74.624 30.08 69.76 61.12 18.816 89.408-18.752 333.44-351.36z" fill="#FFFFFF"></path>
      <path d="M527.552 391.744l-316.8 316.8a64 64 0 0 0 90.496 90.496l316.8-316.8-90.496-90.496zM572.8 256l90.496-90.496a128 128 0 0 1 180.992 180.992l-90.496 90.496 67.84 67.904a32 32 0 0 1 0 45.248l-45.184 45.248a32 32 0 0 1-45.248 0l-67.904-67.84-316.8 316.8a128 128 0 0 1-180.992-181.056l316.8-316.8-67.904-67.84a32 32 0 0 1 0-45.312l45.248-45.248a32 32 0 0 1 45.248 0L572.8 256z" fill="#525C66"></path>
    </svg>
  </button>
</template>

<script setup lang="ts">
type EyeDropperResult = { sRGBHex: string };

type EyeDropperCtor = new () => { open: () => Promise<EyeDropperResult> };

type Props = {
  ariaLabel?: string;
  unsupportedAriaLabel?: string;
  title?: string;
  unsupportedTitle?: string;
};

withDefaults(defineProps<Props>(), {
  ariaLabel: 'Pick a color from the screen',
  unsupportedAriaLabel: 'EyeDropper is not supported in this browser',
  title: 'Pick color',
  unsupportedTitle: 'EyeDropper not supported',
});

const emit = defineEmits<{
  (e: 'pick', hex: string): void;
  (e: 'error', err: unknown): void;
}>();

const getEyeDropperCtor = (): EyeDropperCtor | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  return (window as unknown as { EyeDropper?: EyeDropperCtor }).EyeDropper;
};

const supported = !!getEyeDropperCtor();

const pick = async () => {
  const EyeDropper = getEyeDropperCtor();
  if (!EyeDropper) {
    return;
  }
  try {
    const eyeDropper = new EyeDropper();
    const result = await eyeDropper.open();
    if (result?.sRGBHex) {
      emit('pick', result.sRGBHex);
    }
  } catch (err) {
    emit('error', err);
  }
};
</script>

<style scoped>
.vc-eyedropper-btn {
  height: 24px;
  width: 24px;
  padding: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px var(--vc-input-border);
  background-color: var(--vc-input-bg);
  color: var(--vc-input-text);
  cursor: pointer;
}

.vc-eyedropper-icon {
  display: block;
}

.vc-eyedropper-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

