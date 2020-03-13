import Slider from '../src/components/Slider.vue';

export default {
  title: 'Slider',
};

export const ToStorybook = () => ({
  components: { Slider },
  data() {
    return {
      color: '#689f38'
    }
  },
  methods: {
    handleChange(value) {
      console.log('Slider changed ===> ', value);
    }
  },
  template: '<Slider v-model="color" @change="handleChange" />'
});

ToStorybook.story = {
  name: 'Slider',
};