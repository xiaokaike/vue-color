import { action } from '@storybook/addon-actions';
import Chrome from '../../src/components/Chrome.vue';
import { COMP_PATH_NAME } from './constant';

export default {
  title: `${COMP_PATH_NAME}/Chrome`,
  argTypes: {
    disableAlpha: {
      name: 'disable-alpha',
      type: { required: false },
      description: 'whether alpha channel is disabled',
      table: {
        category: 'props',
        type: {
          summary: 'boolean'
        },
        defaultValue: { summary: 'false' }
      },
      control: {
        type: 'boolean'
      }
    },
    disableFields: {
      name: 'disable-fields',
      type: { required: false },
      description: 'whether the field inputs are disabled',
      table: {
        category: 'props',
        type: {
          summary: 'boolean'
        },
        defaultValue: { summary: 'false' }
      },
      control: {
        type: 'boolean'
      }
    }
  }
};

const actions = {
  change: action('@change'),
  changeComplete: action('@change-complete')
};

const Template = ({ disableAlpha, disableFields }) => {
  return {
    props: {
      disableAlpha: {
        default: disableAlpha
      },
      disableFields: {
        default: disableFields
      }
    },
    data () {
      return {
        color: '#bf4040'
      };
    },
    methods: {
      handleChange (val) {
        actions.change(val);
      }
    },
    components: { Chrome },
    template: '<Chrome v-model="color" @change="handleChange" :disable-alpha="disableAlpha" :disable-fields="disableFields" />'
  };
};

export const Primary = Template.bind({});
