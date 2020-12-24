import { action } from '@storybook/addon-actions';
import Swatches from '../../src/components/Swatches.vue';
import { COMP_PATH_NAME } from './constant';

export default {
  title: `${COMP_PATH_NAME}/Swatches`,
  // component: Swatches, // used by addons for automatic prop table generation
  argTypes: {
    palette: {
      name: 'palette',
      type: { required: false },
      description: 'define swatches', // TODO
      table: {
        category: 'props',
        type: {
          summary: 'string[][]',
          detail: '' // TODO:
        },
        defaultValue: { summary: 'xxxx' } // TODO: add link
      },
      control: null
    }
  }
};

const actions = {
  change: action('@change')
};

const Template = ({ palette }) => {
  return {
    data () {
      return {
        color: '#B71C1C',
        palette: palette && JSON.parse(palette)
      };
    },
    methods: {
      handleChange (val) {
        actions.change(val);
      }
    },
    components: { Swatches },
    template: '<Swatches v-model="color" :palette="palette" @change="handleChange" />'
  };
};

export const Primary = Template.bind({});

export const CustomPalette = Template.bind({});
CustomPalette.args = {
  palette: '[["#aa2e25","#a31545","#6d1b7b","#482880"],["#a05050","#a84466", "#82488c", "#68518f"]]'
};
CustomPalette.argTypes = {
  palette: {
    control: {
      type: 'text'
    }
  }
};
