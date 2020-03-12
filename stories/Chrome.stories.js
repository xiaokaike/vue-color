import Chrome from '../src/components/Chrome.vue';

export default {
  title: 'Chrome',
};

export const ToStorybook = () => ({
  components: { Chrome },
  data() {
    return {
      color: '#689f38'
    }
  },
  methods: {
    handleChange(value) {
      console.log('Chrome changed ===> ', value);
    }
  },
  template: '<Chrome v-model="color" @change="handleChange" />'
});

ToStorybook.story = {
  name: 'Chrome',
};