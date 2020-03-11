import Saturation from '../../src/components/common/Saturation';

export default {
  title: 'Common/Saturation',
};

export const ToStorybook = () => ({
  components: { Saturation },
  data() {
    return {
      color: '#26489F'
    }
  },
  methods: {
    handleChange(value) {
      console.log('Saturation changed ===> ', value);
    }
  },
  template: '<Saturation v-model="color" @change="handleChange" />'
});

ToStorybook.story = {
  name: 'Saturation',
};