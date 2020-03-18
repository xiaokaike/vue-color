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
    handleChangeComplete(value) {
      console.log('Chrome change complete ===> ', value);
    }
  },
  template: '<Chrome v-model="color" @change-complete="handleChangeComplete" />'
});

ToStorybook.story = {
  name: 'Chrome',
};