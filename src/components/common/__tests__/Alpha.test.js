import { shallowMount } from '@vue/test-utils';
import randomInt from 'random-int';

import Alpha from '@/components/common/Alpha';

describe('Alpha.vue', () => {
  let wrapper;
  let color;

  beforeEach(() => {
    color = {
      rgba: {
        r: randomInt(255),
        g: randomInt(255),
        b: randomInt(255),
        a: 1
      },
      hsl: {
        h: randomInt(360),
        s: randomInt(100),
        l: randomInt(100)
      },
      a: 0.8
    };
    wrapper = shallowMount(Alpha, {
      propsData: {
        color
      },
      attachToDocument: true
    });
  });

  test('the pointer\'s position is decided by the value of alpha.', () => {
    expect(wrapper.vm.pointerLeft).toBe('80%');

    color.a = 0;
    wrapper.setProps({
      color: JSON.parse(JSON.stringify(color))
    });
    expect(wrapper.vm.pointerLeft).toBe('0%');

    color.a = 1;
    wrapper.setProps({
      color: JSON.parse(JSON.stringify(color))
    });
    expect(wrapper.vm.pointerLeft).toBe('100%');
  });

  test('trigger mousedown event', () => {
    const $container = wrapper.find({ ref: 'container' });
    const handleChange = jest.fn();
    const unbindEventListeners = jest.fn();
    wrapper.setMethods({ handleChange, unbindEventListeners });

    $container.trigger('mousedown');
    expect(handleChange).toHaveBeenCalledTimes(1);

    $container.trigger('mousemove');
    expect(handleChange).toHaveBeenCalledTimes(2);

    $container.trigger('mouseup');
    expect(unbindEventListeners).toHaveBeenCalledTimes(1);
  });

  test('trigger touchstart and touchmove event', () => {
    const $container = wrapper.find({ ref: 'container' });
    const handleChange = jest.fn();
    wrapper.setMethods({ handleChange });

    $container.trigger('touchstart');
    expect(handleChange).toHaveBeenCalledTimes(1);

    $container.trigger('touchmove');
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  test('handleChange', () => {
    wrapper.setData({ containerWidth: 100 });

    wrapper.vm.handleChange({
      pageX: -1,
      preventDefault: () => {}
    });
    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().change[0][0].a).toBe(0);

    wrapper.vm.handleChange({
      pageX: 200,
      preventDefault: () => {}
    });
    expect(wrapper.emitted().change[1][0].a).toBe(1);

    color.a = 1;
    wrapper.setProps({
      color: JSON.parse(JSON.stringify(color))
    });
    wrapper.vm.handleChange({
      pageX: 60,
      preventDefault: () => {}
    });
    expect(wrapper.emitted().change[2][0].a).toBe(0.6);
  });
});
