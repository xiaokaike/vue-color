import Sketch from '../src/components/Sketch.vue';

export default {
  title: 'Sketch',
};

export const ToStorybook = () => ({
  components: { Sketch },
  data() {
    return {
      color: '#689f38'
    }
  },
  methods: {
    handleChange(value) {
      console.log('Sketch changed ===> ', value);
    }
  },
  template: '<Sketch v-model="color" @change="handleChange" />'
});

ToStorybook.story = {
  name: 'Sketch',
};