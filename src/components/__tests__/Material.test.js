import { mount } from '@vue/test-utils'
// import randomInt from 'random-int'

import Material from '@/components/Material';
import EditableInput from '../common/EditableInput.vue';


describe('Material', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Material, {
      propsData: {
        color: 'red'
      }
    })
  })

  test('Material contains a hex input and rgb inputs', () => {
    const inputs = wrapper.findAll(EditableInput);
    const l = inputs.length;
    const labels = [];
    for(let i = 0; i < l; i ++){
      labels.push(inputs.at(i).find('input').attributes()['aria-label']);
    }
    expect(labels).toEqual(['hex', 'r', 'g', 'b'])
  })

  test('trigger `onChange` event when input changes', () => {
    const onChange = jest.fn();
    wrapper.setMethods({ onChange });


    const inputs = wrapper.findAll(EditableInput);
    const l = inputs.length;
    for(let i = 0; i < l; i ++){
      const input = inputs.at(i);
      input.vm.$emit('change', 'red');
      expect(onChange).toBeCalledWith('red');
    }
  })

  test('`onChange` method handles data correctly', () => {
    const colorChange = jest.fn();
    wrapper.setMethods({ colorChange });

    // empty input
    wrapper.vm.onChange();
    expect(colorChange).not.toBeCalled();

    // invalid data
    wrapper.vm.onChange('red');
    expect(colorChange).not.toBeCalled();

    // handle invalid hex
    wrapper.vm.onChange({hex: '#ooo'});
    expect(colorChange).not.toBeCalled();

    // handle hex
    wrapper.vm.onChange({hex: '#333'});
    expect(colorChange).toBeCalledWith({ hex: '#333' });

    // handle rgba
    const rgba = wrapper.vm.tc.rgba;
    ['r', 'g', 'b'].forEach(field => {
      const val = { [field]: 100 };
      const data = { ...rgba, ...val };
      wrapper.vm.onChange(val);
      expect(colorChange).toBeCalledWith({ ...data });
    })
  })
})