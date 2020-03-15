import Photoshop from '../src/components/Photoshop.vue';

export default {
  title: 'Photoshop',
};

export const ToStorybook = () => ({
  components: { Photoshop },
  data() {
    return {
      color: '#689f38'
    }
  },
  methods: {
    handleChange(value) {
      console.log('Photoshop changed ===> ', value);
    }
  },
  template: '<Photoshop v-model="color" @change="handleChange" />'
});

ToStorybook.story = {
  name: 'Photoshop',
};