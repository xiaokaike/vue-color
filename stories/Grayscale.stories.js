import Grayscale from '../src/components/Grayscale.vue';

export default {
  title: 'Grayscale',
};

export const ToStorybook = () => ({
  components: { Grayscale },
  data() {
    return {
      color: null
    }
  },
  methods: {
    handleChange(value) {
      console.log('Grayscale changed ===> ', value);
    }
  },
  template: '<Grayscale v-model="color" @change="handleChange" output-format="hex" />'
});

ToStorybook.story = {
  name: 'Grayscale',
};