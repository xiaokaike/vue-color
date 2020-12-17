import { shallowMount } from '@vue/test-utils';
import Slider from '@/components/Slider';
import randomInt from 'random-int';

describe('Slider', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Slider, {
      propsData: {
        color: 'red'
      }
    });
  });

  test('Swatch pops up when the color is picked', () => {
    expect(wrapper.vm.activeOffset).toBe(-1);

    wrapper.setProps({
      color: '#4078BF'
    });
    expect(wrapper.vm.activeOffset).toBe(0.5);

    wrapper.setProps({
      color: '#fff',
      swatches: ['1', '.50', '0']
    });
    expect(wrapper.vm.activeOffset).toBe(1);

    wrapper.setProps({
      color: '#000',
      swatches: ['1', '.50', '0']
    });
    expect(wrapper.vm.activeOffset).toBe(0);
  });

  test('Handle click in swatch', () => {
    const colorChange = jest.fn();
    wrapper.setMethods({ colorChange });

    const swatches = ['1', '.80', '.65', '.50', '.35', '.20', '0'];
    wrapper.setProps({
      swatches
    });

    const rnd = randomInt(0, 6);
    wrapper.findAll('.vc-slider-swatch').at(rnd).trigger('click');
    expect(colorChange).toBeCalledWith({ h: 0, s: 0.5, l: swatches[rnd], source: 'hsl' });
  });
});
