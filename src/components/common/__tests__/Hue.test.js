import { shallowMount } from '@vue/test-utils';
import randomInt from 'random-int';

import Hue from '@/components/common/Hue';

describe('Hue.vue', () => {
  let wrapper;
  let color;

  beforeEach(() => {
    color = {
      hsl: {
        h: randomInt(360),
        s: randomInt(100),
        l: randomInt(100)
      }
    };
    wrapper = shallowMount(Hue, {
      propsData: {
        color
      },
      attachToDocument: true
    });
  });

  test('has the right class in vertical mode', () => {
    wrapper.setProps({
      direction: 'vertical'
    });
    expect(wrapper.classes()).toContain('vc-hue--vertical');
  });

  test('in horizontal mode should not exceed the range', () => {
    color.hsl.h = 0;
    wrapper.setProps({
      color: JSON.parse(JSON.stringify(color))
    });

    expect(wrapper.vm.pullDirection).toBe('');
    expect(wrapper.vm.pointerTop).toBe('0%');
    expect(wrapper.vm.pointerLeft).toBe('0%');

    color.hsl.h = 360;
    wrapper.setProps({
      color: JSON.parse(JSON.stringify(color))
    });

    expect(wrapper.vm.pullDirection).toBe('right');
    expect(wrapper.vm.pointerTop).toBe('0%');
    expect(wrapper.vm.pointerLeft).toBe('100%');
  });

  test('in vertical mode should not exceed the range', () => {
    color.hsl.h = 0;
    wrapper.setProps({
      direction: 'vertical',
      color: JSON.parse(JSON.stringify(color))
    });

    expect(wrapper.vm.pullDirection).toBe('');
    expect(wrapper.vm.pointerTop).toBe('100%');
    expect(wrapper.vm.pointerLeft).toBe('0%');

    color.hsl.h = 360;
    wrapper.setProps({
      color: JSON.parse(JSON.stringify(color))
    });

    expect(wrapper.vm.pullDirection).toBe('right');
    expect(wrapper.vm.pointerTop).toBe('0%');
    expect(wrapper.vm.pointerLeft).toBe('0%');
  });

  test('trigger mousedown event', () => {
    /* --- Trigger Sequences -- */
    /* PC drag:  mousedown(handleMouseDown) -> onDragStart -> onDragging * n -> onDragEnd */
    /* PC click:  mousedown(handleMouseDown) -> onDragStart -> onDragEnd */
    /* mobile drag:  mousedown(handleMouseDown) -> onDragStart -> onDragging * n -> onDragEnd */
    /* mobile click:  touchstart(handleMouseDown) -> onDragStart -> onDragEnd */

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

  test('handleChange in horizontal mode ', () => {
    wrapper.setData({ containerWidth: 100 });

    wrapper.vm.handleChange({
      pageX: -1,
      preventDefault: () => {}
    });
    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().change[0][0].h).toBe(0);

    wrapper.vm.handleChange({
      pageX: 200,
      preventDefault: () => {}
    });
    expect(wrapper.emitted().change[1][0].h).toBe(360);

    wrapper.vm.handleChange({
      pageX: 60,
      preventDefault: () => {}
    });
    expect(wrapper.emitted().change[2][0].h).toBe(216);
  });

  test('handleChange in vertical mode ', () => {
    wrapper.setProps({
      direction: 'vertical'
    });
    wrapper.setData({ containerHeight: 100 });

    wrapper.vm.handleChange({
      pageY: -1,
      preventDefault: () => {}
    });
    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().change[0][0].h).toBe(360);

    wrapper.vm.handleChange({
      pageY: 200,
      preventDefault: () => {}
    });
    expect(wrapper.emitted().change[1][0].h).toBe(0);

    wrapper.vm.handleChange({
      pageY: 60,
      preventDefault: () => {}
    });
    expect(wrapper.emitted().change[2][0].h).toBe(144);
  });
});
