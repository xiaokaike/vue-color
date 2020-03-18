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
      }
    }
  },
  methods: {
    handleChange(value) {
      console.log('Saturation changed ===> ', value.toHex());
    },
    handleSubmit() {
      // TODO: if the format is same with input's, that would be good #185
      console.log('Saturation Submit ===> ', this.color);
    }
  },
  template: `
    <div>
      <div :style="styleObject">
        <Saturation v-model="color" @change-complete="handleChange" />
      </div>
      <button @click="handleSubmit">Submit</button>
    </div>`
});

ToStorybook.story = {
  name: 'Saturation',
};