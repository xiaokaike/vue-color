import { mount } from '@vue/test-utils'
import Slider from '@/components/Slider';

describe('Slider', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Slider, {
      propsData: {
        color: 'red'
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})