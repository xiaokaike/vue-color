
import { DEFAULT_COLOR } from '../src/config';
import {supportFormat } from '../src/common/ColorMixin';

export const parameters = {
  layout: 'centered',
  argTypes: {
    value: {
      name: 'value / v-model',
      type: { required: false },
      description: 'binding value',
      table: {
        category: 'props',
        type: {
          summary: 'string | object',
          detail: 'any types that tinycolor2 accepts'
        },
        defaultValue: { summary: DEFAULT_COLOR }
      },
      control: {
        type: null
      }
    },
    outputFormat: {
      name: 'output-format',
      type: { required: false },
      description: 'If `output-format` is specified, can listen to `consistent-change` or `consistent-change-complete` event to get the output color which is formatted base on this type.',
      table: {
        category: 'props',
        type: {
          summary: supportFormat.join('|'),
        },
        defaultValue: { summary: 'the format of value', detail: 'Default value is determined by `value / v-model`' }
      },
      control: {
        type: null
      }
    },
    input: {
      description: 'triggers when the Input value change',
      table: {
        category: 'events',
        type: { summary: '(value: tinycolor)' }
      }
    },
    change: {
      description: 'triggers when the Input value change',
      table: {
        category: 'events',
        type: { summary: '(value: tinycolor)' }
      }
    },
    'change-complete': {
      description: 'triggers when the Input value change with debounce delay',
      table: {
        category: 'events',
        type: { summary: '(value: tinycolor)' }
      }
    },
    'consistent-change': {
      description: 'triggers when the Input value change and return the color which is formatted base on `output-format` value',
      table: {
        category: 'events',
        type: { summary: '(value: string | object)' }
      }
    }
    // 'consistent-change': { control: 'string', table: { category: 'events', type: { summary: 'string' } } },
    // 'consistent-change-complete': { control: 'string', table: { category: 'events', type: { summary: 'string' } } }
  }
}