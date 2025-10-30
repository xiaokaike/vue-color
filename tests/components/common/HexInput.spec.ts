import { expect, test } from 'vitest';
import { render } from 'vitest-browser-vue';
import HexInput from '../../../src/components/common/HexInput.vue';

test('renders formatted hex value and default accessibility label', async () => {
  const { getByRole } = render(HexInput, {
    props: {
      value: '#FFAA00',
    },
  });

  const textbox = getByRole('textbox');
  await expect.element(textbox).toHaveAccessibleName('Hex');
  await expect.element(textbox).toHaveValue('ffaa00');
});

test('renders with hash when requested', async () => {
  const { getByRole } = render(HexInput, {
    props: {
      value: '#ABCDEF',
      withHash: true,
    },
  });

  const textbox = getByRole('textbox');
  await expect.element(textbox).toHaveValue('#abcdef');
});

test('reacts to external value changes', async () => {
  const { getByRole, rerender } = render(HexInput, {
    props: {
      value: '#112233',
    },
  });

  const textbox = getByRole('textbox');
  await expect.element(textbox).toHaveValue('112233');

  rerender({ value: '#AABBCC' });
  await Promise.resolve();
  await expect.element(textbox).toHaveValue('aabbcc');
});

test('emits change for valid inputs and ignores invalid ones', async () => {
  const { getByRole, emitted } = render(HexInput, {
    props: {
      value: '#000000',
    },
  });

  const textbox = getByRole('textbox');

  await textbox.fill('12345');
  expect(emitted().change).toBeUndefined();

  await textbox.fill('1234567');
  expect(emitted().change).toBeUndefined();

  await textbox.fill('aabbcc');
  expect(emitted().change?.[0]).toEqual(['aabbcc']);

  await textbox.fill('123');
  expect(emitted().change?.[1]).toEqual(['123']);

  await textbox.fill('143311b8');
  expect(emitted().change?.[2]).toEqual(['143311b8']);
});

test('handles hex8 formatting and validation', async () => {
  const { getByRole, emitted } = render(HexInput, {
    props: {
      value: '#AABBCCFF',
      type: 'hex8',
    },
  });

  const textbox = getByRole('textbox');
  await expect.element(textbox).toHaveAccessibleName('Hex with transparency');
  await expect.element(textbox).toHaveValue('aabbccff');

  await textbox.fill('123');
  expect(emitted()).not.toHaveProperty('change');

  await textbox.fill('1234567');
  expect(emitted()).not.toHaveProperty('change');

  await textbox.fill('12345678');
  expect(emitted().change?.[0]).toEqual(['12345678']);
});

test('normalizes value on blur when input is invalid', async () => {
  const { getByRole } = render(HexInput, {
    props: {
      value: '#ABCDEF',
    },
  });

  const textbox = getByRole('textbox');
  await textbox.fill('12');
  textbox.element().dispatchEvent(new FocusEvent('blur'));
  await Promise.resolve();
  await expect.element(textbox).toHaveValue('abcdef');
});
