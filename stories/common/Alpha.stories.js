import Alpha from '../../src/components/common/Alpha';

export default {
  title: 'Common/Alpha',
};

export const ToStorybook = () => ({
  components: { Alpha },
  data() {
    return {
      color: null
    }
  },
  methods: {
    handleChange(value) {
      console.log('Alpha changed ===> ', value);
    }
  },
  template: '<Alpha v-model="color" @change="handleChange" />'
});

ToStorybook.story = {
  name: 'Alpha',
};