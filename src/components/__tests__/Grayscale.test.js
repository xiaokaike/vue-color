import { shallowMount } from '@vue/test-utils'
import Grayscale from '@/components/Grayscale'
import randomInt from 'random-int'

describe('Slider', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Grayscale, {
      propsData: {
        color: 'red'
      },
    })
  })

  test('Swatch pops up when the color is picked', () => {
    const color = '#4078BF';
    wrapper.setProps({
      palette: [color],
    })
    const selector = `[aria-label="Color:${color}"] > .vc-grayscale-dot`
    expect(wrapper.find(selector).isVisible()).toBe(false)

    wrapper.setProps({
      color
    })
    expect(wrapper.find(selector).isVisible()).toBe(true)
  })

  test('handleClick', () => {
    const palette = wrapper.props().palette;
    const rnd = randomInt(palette.length);
    const color = palette[rnd];

    const handlerClick = jest.fn();
    wrapper.setMethods({
      handlerClick
    })

    const item = wrapper.findAll('.vc-grayscale-color-item').at(rnd);
    item.trigger('click');
    expect(handlerClick).toBeCalledWith(color)
  })
})