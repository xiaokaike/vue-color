import { mount } from '@vue/test-utils'
import Chrome from '@/components/Chrome'
// import randomInt from 'random-int'
import Checkboard from '../common/Checkboard.vue';
import Alpha from '../common/Alpha.vue';

describe('Chrome', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Chrome, {
      propsData: {
        color: 'red'
      },
    })
  })

  test('disable all alpha options when set `disableAlpha` true', () => {
    expect(wrapper.contains(Checkboard)).toBe(true)
    expect(wrapper.contains(Alpha)).toBe(true)
    expect(wrapper.contains('input[aria-label="a"]')).toBe(true)


    wrapper.setProps({
      disableAlpha: true
    })

    expect(wrapper.find('.vc-chrome').classes()).toContain('vc-chrome__disable-alpha')

    expect(wrapper.contains(Checkboard)).toBe(false)
    expect(wrapper.contains(Alpha)).toBe(false)
    expect(wrapper.contains('input[aria-label="a"]')).toBe(false)
  })

  test('disable all inputs when set `disableFields` true', () => {
    expect(wrapper.contains('.vc-chrome-fields-wrap')).toBe(true)

    wrapper.setProps({
      disableFields: true
    })

    expect(wrapper.contains('.vc-chrome-fields-wrap')).toBe(false)
  })
})