import { action } from '@storybook/addon-actions';
import Slider from '../../src/components/Slider.vue';
import { COMP_PATH_NAME } from './constant';

export default {
  title: `${COMP_PATH_NAME}/Slider`,
  argTypes: {
    swatches: {
      name: 'swatches',
      type: { required: false },
      description: 'define lightness of each swatches',
      table: {
        category: 'props',
        type: {
          summary: 'string[]',
          detail: '' // TODO:
        },
        defaultValue: { summary: "['.80', '.65', '.50', '.35', '.20']" }
      },
      control: null
    }
  }
};

const actions = {
  change: action('@change'),
  changeComplete: action('@change-complete')
};

const Template = ({ swatches }) => {
  return {
    data () {
      return {
        color: '#bf4040',
        swatches: swatches
      };
    },
    methods: {
      handleChange (val) {
        actions.change(val);
      }
    },
    components: { Slider },
    template: '<Slider v-model="color" :swatches="swatches" v-on:change="handleChange" />'
  };
};

// export const Primary = Template.bind({});

export const CustomSwatches = Template.bind({});
CustomSwatches.args = {
  swatches: ['1', '.8', '.6', '.4', '.2', '0']
};
CustomSwatches.argTypes = {
  swatches: {
    control: {
      type: 'array'
    }
  }
};
