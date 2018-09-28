import { shallowMount } from '@vue/test-utils'
import colorMixin from '../color';

const Dummy = {
  template: '<div>dummy</div>',
}

describe('color mixin', () => {
  let wrapper;
  let color = 'red';
  beforeEach(() => {
    wrapper = shallowMount(Dummy, {
      propsData: {
        color
      },
      mixins: [colorMixin]
    })
  })

  test('prop `color`', () => {
    expect(wrapper.props().color).toBe(color);
  })

  test('method `isValidHex`', () => {
    // empty
    expect(wrapper.vm.isValidHex()).toBe(false);
    // invalid
    expect(wrapper.vm.isValidHex('#lll')).toBe(false);
    // valid
    expect(wrapper.vm.isValidHex('#aaa')).toBe(true);
  })

  test('method `paletteUpperCase`', () => {
    // empty
    expect(wrapper.vm.paletteUpperCase(null)).toBeUndefined();
    // valid
    expect(wrapper.vm.paletteUpperCase(['#aaa'])).toEqual(['#AAA']);
  })

  test('method `isTransparent`', () => {
    // empty
    expect(wrapper.vm.isTransparent()).toBe(false);
    // valid - hex
    expect(wrapper.vm.isTransparent('#aaa')).toBe(false);
    expect(wrapper.vm.isTransparent('#19714500')).toBe(true);
    expect(wrapper.vm.isTransparent('#19714559')).toBe(false);
    // valid - rgba
    expect(wrapper.vm.isTransparent({ r: 1, g: 1, b: 1 })).toBe(false);
    expect(wrapper.vm.isTransparent({ r: 1, g: 1, b: 1, a: 0 })).toBe(true);
    expect(wrapper.vm.isTransparent({ r: 1, g: 1, b: 1, a: 0.5 })).toBe(false);
  })
})