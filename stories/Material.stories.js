import Material from '../src/components/Material.vue';

export default {
  title: 'Material',
};

export const ToStorybook = () => ({
  components: { Material },
  data() {
    return {
      color: '#36473f'
    }
  },
  methods: {
    handleChange(value) {
      console.log('Material changed ===> ', value);
    }
  },
  template: '<Material v-model="color" @change="handleChange" />'
});

ToStorybook.story = {
  name: 'Material',
};