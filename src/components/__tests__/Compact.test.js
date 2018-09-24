import { shallowMount } from '@vue/test-utils'
import Compact from '@/components/Compact'
import randomInt from 'random-int'

describe('Compact', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Compact, {
      propsData: {
        color: 'red'
      },
    })
  })

  test('Swatch has a dot when the color is picked', () => {
    const color = '#4078BF';
    wrapper.setProps({
      palette: [color],
    })
    const selector = `[aria-label="Color:${color}"] > .vc-compact-dot`
    expect(wrapper.find(selector).isVisible()).toBe(false)

    wrapper.setProps({
      color
    })
    expect(wrapper.find(selector).isVisible()).toBe(true)
  })

  test('handleClick', () => {
    const palette = wrapper.props().palette;
    const rnd = randomInt(palette.length-1);
    const color = palette[rnd];

    const handlerClick = jest.fn();
    wrapper.setMethods({
      handlerClick
    })

    const item = wrapper.findAll('.vc-compact-color-item').at(rnd);
    item.trigger('click');
    expect(handlerClick).toBeCalledWith(color)
  })

  test('emit', () => {
    const palette = wrapper.props().palette;
    const rnd = randomInt(palette.length-1);
    const color = palette[rnd];

    const item = wrapper.findAll('.vc-compact-color-item').at(rnd);
    item.trigger('click');
    expect(wrapper.emitted().change[0][0].hex).toBe(color)
  })
})