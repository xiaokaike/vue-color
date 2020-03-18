import Hue from '../../src/components/common/Hue';

export default {
  title: 'Common/Hue',
};

export const ToStorybook = () => ({
  components: { Hue },
  data() {
    return {
      color: '#36473f'
    }
  },
  methods: {
    handleChange(value) {
      console.log('hue changed ===> ', value);
    }
  },
  template: `
    <div :style="{position: 'relative', width: '360px', height: '10px'}">
      <Hue v-model="color" @change="handleChange" />'
    </div>
  `
});

ToStorybook.story = {
  name: 'Hue',
};