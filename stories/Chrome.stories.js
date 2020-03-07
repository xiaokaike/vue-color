import Chrome from '../src/components/Chrome';

export default {
  title: 'Chrome',
};

export const ToStorybook = () => ({
  components: { Chrome },
  template: '<Chrome />'
});

ToStorybook.story = {
  name: 'Chrome',
};