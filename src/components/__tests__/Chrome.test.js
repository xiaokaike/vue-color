import { mount } from '@vue/test-utils';
// import randomInt from 'random-int'

import Chrome from '@/components/Chrome';
import Checkboard from '../common/Checkboard.vue';
import Alpha from '../common/Alpha.vue';
import Hue from '../common/Hue.vue';
import Saturation from '../common/Saturation.vue';
import EditableInput from '../common/EditableInput.vue';

describe('Chrome', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Chrome, {
      propsData: {
        color: 'red'
      }
    });
  });

  test('disable all alpha options when set `disableAlpha` true', () => {
    expect(wrapper.contains(Checkboard)).toBe(true);
    expect(wrapper.contains(Alpha)).toBe(true);
    expect(wrapper.contains('input[aria-label="a"]')).toBe(true);

    wrapper.setProps({
      disableAlpha: true
    });

    expect(wrapper.find('.vc-chrome').classes()).toContain('vc-chrome__disable-alpha');

    expect(wrapper.contains(Checkboard)).toBe(false);
    expect(wrapper.contains(Alpha)).toBe(false);
    expect(wrapper.contains('input[aria-label="a"]')).toBe(false);
  });

  test('disable all inputs when set `disableFields` true', () => {
    expect(wrapper.contains('.vc-chrome-fields-wrap')).toBe(true);

    wrapper.setProps({
      disableFields: true
    });

    expect(wrapper.contains('.vc-chrome-fields-wrap')).toBe(false);
  });

  test('display `hsl` in a proper way', () => {
    expect(wrapper.vm.hsl).toEqual({ h: '0', s: '100%', l: '50%' });

    // FIXME: TypeError: Cannot read property '_transitionClasses' of undefined
    // https://github.com/vuejs/vue-test-utils/issues/829
    // wrapper.setProps({
    //   color: '#439CA7'
    // })

    // expect(wrapper.vm.hsl).toEqual({ h: '187', s: '43%', l:'46%' })
  });

  test('trigger `colorChange` event when child components change the color', () => {
    const stub = jest.fn();
    wrapper.setMethods({ colorChange: stub });

    wrapper.find(Saturation).vm.$emit('change', 'red');
    expect(stub).toBeCalledWith('red');

    wrapper.find(Hue).vm.$emit('change', 'red');
    expect(stub).toBeCalledWith('red');

    wrapper.find(Alpha).vm.$emit('change', 'red');
    expect(stub).toBeCalledWith('red');
  });

  test('trigger `colorChange` event when inputs change', () => {
    const stub = jest.fn();
    wrapper.setMethods({ colorChange: stub });

    wrapper.find(EditableInput).vm.$emit('change', { hex: '#fff' });
    expect(stub).toBeCalledWith({
      hex: '#fff',
      source: 'hex'
    });
  });

  test('`inputChange` method handles data correctly', () => {
    const stub = jest.fn();
    wrapper.setMethods({ colorChange: stub });

    // empty input
    wrapper.vm.inputChange();
    expect(stub).not.toBeCalled();

    // invalid data
    wrapper.vm.inputChange('red');
    expect(stub).not.toBeCalled();

    // handle invalid hex
    wrapper.vm.inputChange({ hex: '#ooo' });
    expect(stub).not.toBeCalled();

    // handle hex
    wrapper.vm.inputChange({ hex: '#333' });
    expect(stub).toBeCalledWith({ hex: '#333', source: 'hex' });

    // handle rgba
    const rgba = wrapper.vm.rgba;
    const r = 100;
    const data = { ...rgba, r };
    wrapper.vm.inputChange({ r });
    expect(stub).toBeCalledWith({ ...data, source: 'rgba' });

    // handle hsl
    const hsl = wrapper.vm.tc.hsl;
    const h = 100;
    const data1 = { ...hsl, h };
    delete data1.a;
    wrapper.vm.inputChange({ h });
    expect(stub).toBeCalledWith({ ...data1, source: 'hsl' });

    const s = '50%';
    const data2 = { ...hsl, s: 0.5 };
    delete data2.a;
    wrapper.vm.inputChange({ s });
    expect(stub).toBeCalledWith({ ...data2, source: 'hsl' });
  });
});
