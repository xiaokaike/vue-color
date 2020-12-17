/* eslint-disable @typescript-eslint/no-empty-function */

import { shallowMount } from '@vue/test-utils';
import randomInt from 'random-int';

import Saturation from '@/components/common/Saturation';

jest.useFakeTimers();

describe('Saturation.vue', () => {
  let wrapper;
  let color;
  const h = randomInt(360);
  const s = randomInt(360);
  const v = randomInt(100);

  beforeEach(() => {
    color = {
      hsv: { h, s, v, a: 1 }
    };
    wrapper = shallowMount(Saturation, {
      propsData: {
        color
      },
      attachToDocument: true
    });
  });

  test('background color', () => {
    expect(wrapper.vm.bgColor).toBe(`hsl(${h}, 100%, 50%)`);
  });

  test('top position of the pointer', () => {
    expect(wrapper.vm.pointerTop).toBe(`${(-(v * 100) + 1) + 100}%`);
  });

  test('left position of the pointer', () => {
    expect(wrapper.vm.pointerLeft).toBe(`${s * 100}%`);
  });

  test('trigger mousedown event', () => {
    const $container = wrapper.find({ ref: 'container' });
    const handleChange = jest.fn();
    const unbindEventListeners = jest.fn();
    wrapper.setMethods({ handleChange, unbindEventListeners });

    $container.trigger('mousedown');
    $container.trigger('mousemove');
    expect(handleChange).toHaveBeenCalledTimes(1);

    $container.trigger('mouseup');
    expect(handleChange).toHaveBeenCalledTimes(2);
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
    const onChange = jest.fn();
    wrapper.setMethods({ onChange });
    wrapper.setData({ containerWidth: 100, containerHeight: 100 });

    wrapper.vm.handleChange({
      pageX: -1,
      pageY: -1,
      preventDefault: () => {}
    });
    expect(onChange).toBeCalledWith({
      h,
      s: 0,
      v: 1,
      a: 1,
      source: 'hsva'
    });

    jest.runAllTimers();

    wrapper.vm.handleChange({
      pageX: 101,
      pageY: 101,
      preventDefault: () => {}
    });
    expect(onChange).toBeCalledWith({
      h,
      s: 1,
      v: 0,
      a: 1,
      source: 'hsva'
    });

    jest.runAllTimers();

    wrapper.vm.handleChange({
      pageX: 60,
      pageY: 60,
      preventDefault: () => {}
    });
    expect(onChange).toBeCalledWith({
      h,
      s: 0.6,
      v: 0.4,
      a: 1,
      source: 'hsva'
    });
  });

  test('emit', () => {
    wrapper.vm.onChange({ h, s, v });
    expect(wrapper.emitted().change[0]).toEqual([{ h, s, v }]);
  });
});
