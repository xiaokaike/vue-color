import { shallowMount } from '@vue/test-utils'
import Swatches from '@/components/Swatches'
import randomInt from 'random-int'

describe('Swatches', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Swatches, {
      propsData: {
        color: 'red'
      },
    })
  })

  test('Swatch has a dot when the color is picked', () => {
    const color = '#4078BF';
    wrapper.setProps({
      palette: [[color]],
    })
    const selector = `[aria-label="Color:${color}"] > .vc-swatches-pick`
    expect(wrapper.find(selector).isVisible()).toBe(false)

    wrapper.setProps({
      color
    })
    expect(wrapper.find(selector).isVisible()).toBe(true)
  })

  test('handleClick', () => {
    const palette = wrapper.props().palette;
    const rnd1 = randomInt(palette.length-1);
    const rnd2 = randomInt(palette[rnd1].length-1);
    const color = palette[rnd1][rnd2];

    const handlerClick = jest.fn();
    wrapper.setMethods({
      handlerClick
    })

    const item = wrapper.findAll('.vc-swatches-color-group').at(rnd1).findAll('.vc-swatches-color-it').at(rnd2);
    item.trigger('click');
    expect(handlerClick).toBeCalledWith(color)
  })

  test('emit', () => {
    const palette = wrapper.props().palette;
    const rnd1 = randomInt(palette.length-1);
    const rnd2 = randomInt(palette[rnd1].length-1);
    const color = palette[rnd1][rnd2];

    const item = wrapper.findAll('.vc-swatches-color-group').at(rnd1).findAll('.vc-swatches-color-it').at(rnd2);
    item.trigger('click');
    expect(wrapper.emitted().change[0][0].hex).toBe(color)
  })
})