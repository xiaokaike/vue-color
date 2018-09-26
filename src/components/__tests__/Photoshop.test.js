import { shallowMount } from '@vue/test-utils'

import Photoshop from '@/components/Photoshop';
import Saturation from '@/components/common/Saturation.vue';
import Hue from '@/components/common/Hue.vue';
import EditableInput from '@/components/common/EditableInput.vue';


describe('Photoshop', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Photoshop, {
      propsData: {
        color: 'red'
      },
    })
  })

  test('display picker name vie props `head`', () => {
    const head = 'I am a header';
    wrapper.setProps({ head })
    expect(wrapper.find('.vc-ps-head').text()).toBe(head);
  })

  test('disable fields via props `disableFields`', () => {
    const root = wrapper.find('.vc-photoshop');
    const controls = wrapper.find('.vc-ps-controls');

    expect(root.classes()).not.toContain('vc-photoshop__disable-fields');
    expect(controls.classes()).not.toContain('vc-ps-controls__disable-fields');
    expect(wrapper.find('.vc-ps-actions').isEmpty()).toBe(false);

    wrapper.setProps({ disableFields: true });

    expect(root.classes()).toContain('vc-photoshop__disable-fields');
    expect(controls.classes()).toContain('vc-ps-controls__disable-fields');
    expect(wrapper.findAll('.vc-ps-actions')).toHaveLength(0);
  })

  test('show reset button via props `hasResetButton`', () => {
    expect(wrapper.findAll('.vc-ps-ac-btn[aria-label="reset"]')).toHaveLength(0);

    wrapper.setProps({ hasResetButton: true, resetLabel: 'reset reset' });
    const btns = wrapper.findAll('.vc-ps-ac-btn[aria-label="reset"]');
    expect(btns).toHaveLength(1);
    btns.at(0).trigger('click');
    expect(wrapper.emitted().reset).toBeTruthy();
    expect(btns.at(0).text()).toBe('reset reset');
  })

  test('modify text of buttons via props `acceptLabel` and `cancelLabel`', () => {
    const acceptLabel = 'accept label';
    const cancelLabel = 'cancel label';

    wrapper.setProps({ acceptLabel, cancelLabel });
    expect(wrapper.find('.vc-ps-ac-btn[aria-label="Confirm"]').text()).toBe(acceptLabel);
    expect(wrapper.find('.vc-ps-ac-btn[aria-label="Cancel"]').text()).toBe(cancelLabel);
  })

  test('computed value `hsv`', (done) => {
    wrapper = shallowMount(Photoshop, {
      propsData: {
        color: '#5D520B'
      },
      sync: false  // FIXME: https://github.com/vuejs/vue-test-utils/issues/829
    })

    setTimeout(() => {
      expect(wrapper.vm.hsv).toEqual({"h": "52", "s": "88", "v": "36"});
      done();
    })
  })

  test('computed value `hex`', (done) => {
    wrapper = shallowMount(Photoshop, {
      propsData: {
        color: '#5D520B'
      },
      sync: false  // FIXME: https://github.com/vuejs/vue-test-utils/issues/829
    })

    setTimeout(() => {
      expect(wrapper.vm.hex).toBe('5D520B');
      done();
    })
  })

  test('trigger `colorChange` event when child components change the color', () => {
    const colorChange = jest.fn();
    wrapper.setMethods({ colorChange });

    wrapper.find(Saturation).vm.$emit('change', 'red');
    expect(colorChange).toBeCalledWith('red');

    wrapper.find(Hue).vm.$emit('change', 'red');
    expect(colorChange).toBeCalledWith('red');
  })

  test('trigger `colorChange` event when inputs change', () => {
    const colorChange = jest.fn();
    wrapper.setMethods({ colorChange });

    const inputs = wrapper.findAll(EditableInput);
    for(let i = 0, l = inputs.length; i < l; i++) {
      inputs.at(i).vm.$emit('change', { '#': '#fff' });
      expect(colorChange).toHaveBeenNthCalledWith(i+1, {
        hex: '#fff',
      })
    }
  })

  test('click current color panel and call `colorChange` method', () => {
    const colorChange = jest.fn();
    wrapper.setMethods({ colorChange });
    const currentColor = wrapper.vm.currentColor;
    wrapper.findAll('.vc-ps-previews__pr-color').at(1).trigger('click');

    expect(colorChange).toBeCalledWith({
      hex: currentColor
    });
  })

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
    wrapper.vm.inputChange({'#': '#ooo'});
    expect(colorChange).not.toBeCalled();

    // handle hex
    wrapper.vm.inputChange({'#': '#333'});
    expect(colorChange).toBeCalledWith({ hex: '#333' });

    // handle rgba
    const rgba = wrapper.vm.tc.rgba;
    ['r', 'g', 'b'].forEach(field => {
      const val = { [field]: 100 };
      const data = { ...rgba, ...val };
      wrapper.vm.inputChange(val);
      expect(colorChange).toBeCalledWith({ ...data });
    })

    // handle hsv
    const hsv = wrapper.vm.tc.hsv;
    delete hsv.a;
    [{ key: 'h', processor: (val) => val },
    { key: 's', processor: (val) => (val / 100) },
    { key: 'v', processor: (val) => (val / 100) }].forEach(({key, processor}) => {
      const val = { [key]: 100 };
      wrapper.vm.inputChange(val);

      val[key] = processor(100);
      const data = { ...hsv, ...val };
      expect(colorChange).toBeCalledWith({ ...data });
    })
  })
})