import Material from '../src/components/Material.vue';

export default {
  title: 'Material',
};

export const ToStorybook = () => ({
  components: { Material },
  data() {
    return {
      color: null
    }
  },
  methods: {
    handleChange(value) {
      console.log('Material changed ===> ', value);
    }
  },
  template: '<Material v-model="color" @change="handleChange" output-format="hex" />'
});

ToStorybook.story = {
  name: 'Material',
};