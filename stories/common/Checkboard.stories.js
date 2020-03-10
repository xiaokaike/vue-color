import Checkboard from '../../src/components/common/Checkboard';

export default {
  title: 'Common/Checkboard',
};

export const ToStorybook = () => ({
  components: { Checkboard },
  data() {
    return {
      styleObject: {
        position: 'relative',
        width: '100px',
        height: '100px',
      }
    }
  },
  template: '<div :style="styleObject"><Checkboard /></div>'
});

ToStorybook.story = {
  name: 'Checkboard',
};