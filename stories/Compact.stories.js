import Compact from '../src/components/Compact.vue';

export default {
  title: 'Compact',
};

export const ToStorybook = () => ({
  components: { Compact },
  data() {
    return {
      color: '#689f38'
    }
  },
  methods: {
    handleChange(value) {
      console.log('Compact changed ===> ', value);
    }
  },
  template: '<Compact v-model="color" @change="handleChange" />'
});

ToStorybook.story = {
  name: 'Compact',
};