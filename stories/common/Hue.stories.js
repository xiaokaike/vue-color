import Hue from '../../src/components/common/Hue';

export default {
  title: 'Common',
};

export const ToStorybook = () => ({
  components: { Hue },
  data() {
    return {
      color: '#fff'
    }
  },
  methods: {
    handleChange(value) {
      console.log('hue changed ===> ', value);
    }
  },
  template: '<Hue :value="color" @change="handleChange" />'
});

ToStorybook.story = {
  name: 'Hue',
};