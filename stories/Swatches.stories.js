import Swatches from '../src/components/Swatches.vue';

export default {
  title: 'Swatches',
};

export const ToStorybook = () => ({
  components: { Swatches },
  data() {
    return {
      color: '#689f38'
    }
  },
  methods: {
    handleChange(value) {
      console.log('Swatches changed ===> ', value);
    }
  },
  template: '<Swatches v-model="color" @change="handleChange" />'
});

ToStorybook.story = {
  name: 'Swatches',
};