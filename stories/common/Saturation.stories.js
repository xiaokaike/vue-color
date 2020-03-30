import Saturation from '../../src/components/common/Saturation';

export default {
  title: 'Common/Saturation',
};

export const ToStorybook = () => ({
  components: { Saturation },

  data() {
    return {
      color: '#26489F',
      styleObject: {
        position: 'relative',
        width: '500px',
        height: '500px',
      },
      result: ''
    }
  },
  methods: {
    handleChange(value) {
      this.result = value;
    },
    handleSubmit() {
      console.log('Saturation Submit ===> ', this.result);
    }
  },
  template: `
    <div>
      <div :style="styleObject">
        <Saturation v-model="color" @consistent-change-complete="handleChange" />
      </div>
      <button @click="handleSubmit">Submit</button>
    </div>`
});

ToStorybook.story = {
  name: 'Saturation',
};