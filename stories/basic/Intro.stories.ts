import { action } from '@storybook/addon-actions';
import Chrome from '../../src/components/Chrome.vue';
import { supportFormat } from '../../src/common/ColorMixin';

export default {
  title: 'Basic/Intro'
};

const Template = ({ outputFormat, handleChange, handleConsistentChange, handleChangeComplete, handleConsistentChangeComplete }) => {
  return {
    props: {
      outputFormat: {
        default: outputFormat
      }
    },
    data () {
      return {
        color: '#7d3c3c'
      };
    },
    methods: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handleChange: handleChange || (() => {}),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handleConsistentChange: handleConsistentChange || (() => {}),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handleChangeComplete: handleChangeComplete || (() => {}),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handleConsistentChangeComplete: handleConsistentChangeComplete || (() => {})
    },
    components: { Chrome },
    template: '<Chrome v-model="color" @change="handleChange" @consistent-change="handleConsistentChange" @change-complete="handleChangeComplete" @consistent-change-complete="handleConsistentChangeComplete" :output-format="outputFormat" />'
  };
};

export const Primary = Template.bind({});
Primary.args = {
  handleChange: action('@change')
};

export const SpecifiedOutputFormat = Template.bind({});
SpecifiedOutputFormat.args = {
  handleChange: action('@change'),
  handleConsistentChange: action('@change-complete')
};
SpecifiedOutputFormat.argTypes = {
  outputFormat: {
    control: {
      type: 'select',
      options: supportFormat
    },
    defaultValue: 'hslString'
  }
};

export const DebouncedEvent = Template.bind({});
DebouncedEvent.args = {
  handleChangeComplete: action('@change-complete'),
  handleConsistentChangeComplete: action('@consistent-change-complete')
};
DebouncedEvent.argTypes = {
  outputFormat: {
    control: {
      type: 'select',
      options: supportFormat
    },
    defaultValue: 'hslString'
  }
};
