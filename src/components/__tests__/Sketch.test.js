import { shallowMount } from '@vue/test-utils';
import tinycolor from 'tinycolor2';

import Sketch from '@/components/Sketch';
import Saturation from '@/components/common/Saturation.vue';
import Hue from '@/components/common/Hue.vue';
import Alpha from '@/components/common/Alpha.vue';
import EditableInput from '@/components/common/EditableInput.vue';

describe('Sketch', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Sketch, {
      propsData: {
        color: 'red'
      }
    });
  });

  test('disable fields via props `disableFields`', () => {
    expect(wrapper.find('.vc-sketch-field').exists()).toBe(true);

    wrapper.setProps({ disableFields: true });

    expect(wrapper.find('.vc-sketch-field').exists()).toBe(false);
  });

  test('disable alpha fields via props `disableAlpha`', () => {
    const root = wrapper.find('.vc-sketch');
    expect(root.classes()).not.toContain('vc-sketch__disable-alpha');
    expect(wrapper.find('.vc-sketch-alpha-wrap').exists()).toBe(true);
    expect(wrapper.findAll('.vc-sketch-field--single')).toHaveLength(4);

    wrapper.setProps({ disableAlpha: true });

    expect(root.classes()).toContain('vc-sketch__disable-alpha');
    expect(wrapper.find('.vc-sketch-alpha-wrap').exists()).toBe(false);
    expect(wrapper.findAll('.vc-sketch-field--single')).toHaveLength(3);
  });

  test('set `presetColors` and handle click on preset color', () => {
    const presetColors = [
      '#D0021B', '#F5A623', '#F8E71C', '#000', '#fff',
      'rgba(0,0,0,0)'
    ];
    const colorChange = jest.fn();

    wrapper.setProps({ presetColors });
    wrapper.setMethods({ colorChange });

    const colors = wrapper.findAll('.vc-sketch-presets-color');

    presetColors.forEach((c, i) => {
      const color = colors.at(i);
      if (i !== presetColors.length - 1) {
        expect(color.element.style.background).toBe(tinycolor(c).toRgbString());
      } else {
        expect(color.element.style.background).toBeFalsy();
      }
      color.trigger('click');
      expect(colorChange).toHaveBeenNthCalledWith(i + 1, { hex: c, source: 'hex' });
    });
  });

  test('computed value `hex` without alpha', (done) => {
    wrapper = shallowMount(Sketch, {
      propsData: {
        color: 'red'
      },
      sync: false // FIXME: https://github.com/vuejs/vue-test-utils/issues/829
    });

    setTimeout(() => {
      expect(wrapper.vm.hex).toEqual('FF0000');
      done();
    });
  });

  test('computed value `hex` with alpha', (done) => {
    wrapper = shallowMount(Sketch, {
      propsData: {
        color: 'rgba(73, 191, 118, 0.69)'
      },
      sync: false // FIXME: https://github.com/vuejs/vue-test-utils/issues/829
    });

    setTimeout(() => {
      expect(wrapper.vm.hex).toEqual('49BF76B0');
      done();
    });
  });

  test('computed value `activeColor`', (done) => {
    wrapper = shallowMount(Sketch, {
      propsData: {
        color: '#5D520B'
      },
      sync: false // FIXME: https://github.com/vuejs/vue-test-utils/issues/829
    });

    setTimeout(() => {
      expect(wrapper.vm.activeColor).toBe('rgba(93,82,11,1)');
      done();
    });
  });

  test('trigger `colorChange` event when child components change the color', () => {
    const colorChange = jest.fn();
    wrapper.setMethods({ colorChange });

    wrapper.find(Saturation).vm.$emit('change', 'red');
    expect(colorChange).toBeCalledWith('red');

    wrapper.find(Hue).vm.$emit('change', 'red');
    expect(colorChange).toBeCalledWith('red');

    wrapper.find(Alpha).vm.$emit('change', 'red');
    expect(colorChange).toBeCalledWith('red');
  });

  test('trigger `colorChange` event when inputs change', () => {
    const colorChange = jest.fn();
    wrapper.setMethods({ colorChange });

    const inputs = wrapper.findAll(EditableInput);
    for (let i = 0, l = inputs.length; i < l; i++) {
      inputs.at(i).vm.$emit('change', { hex: '#fff' });
      expect(colorChange).toHaveBeenNthCalledWith(i + 1, {
        hex: '#fff',
        source: 'hex'
      });
    }
  });

  test('`inputChange` method handles data correctly', () => {
    const colorChange = jest.fn();
    wrapper.setMethods({ colorChange });

    // empty input
    wrapper.vm.inputChange();
    expect(colorChange).not.toBeCalled();

    // invalid data
    wrapper.vm.inputChange('red');
    expect(colorChange).not.toBeCalled();

    // handle invalid hex
    wrapper.vm.inputChange({ hex: '#ooo' });
    expect(colorChange).not.toBeCalled();

    // handle hex
    wrapper.vm.inputChange({ hex: '#333' });
    expect(colorChange).toBeCalledWith({ hex: '#333', source: 'hex' });

    // handle rgba
    const rgba = wrapper.vm.tc.rgba;
    ['r', 'g', 'b', 'a'].forEach(field => {
      const val = { [field]: 100 };
      const data = { ...rgba, ...val };
      wrapper.vm.inputChange(val);
      expect(colorChange).toBeCalledWith({ ...data, source: 'rgba' });
    });
  });
});
