import { shallowMount } from '@vue/test-utils'
import randomInt from 'random-int'

import EditableInput from '@/components/common/EditableInput'

describe('EditableInput.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(EditableInput, {
      propsData: {
        label: 'r',
        value: 100
      }
    })
  })

  test('trigger keydown and input', () => {

    const $input = wrapper.find({ ref: 'input' })
    const handleChange = jest.fn()
    wrapper.setMethods({ handleChange })

    $input.trigger('keydown', {
      keyCode: 38
    })
    expect(handleChange).toHaveBeenCalledTimes(1)
    $input.trigger('keydown', {
      keyCode: 40
    })
    expect(handleChange).toHaveBeenCalledTimes(2)

    $input.trigger('input')
    expect(handleChange).toHaveBeenCalledTimes(3)
  })

  test('handleKeyDown should change value with certain offset', () => {
    const handleChange = jest.fn()
    wrapper.setMethods({ handleChange })
    const $input = wrapper.find({ ref: 'input' })

    $input.element.value = 100
    $input.trigger('keydown', {
      keyCode: 40
    })
    expect(handleChange).toBeCalledWith(99)

    $input.element.value = 100
    wrapper.setProps({
      arrowOffset: 10
    })
    $input.trigger('keydown', {
      keyCode: 38
    })
    expect(handleChange).toBeCalledWith(110)
  })

  test('emit', () => {
    wrapper.setProps({
      label: 'hex'
    })
    wrapper.vm.handleChange('#fff')
    expect(wrapper.emitted().change[0]).toEqual([{ hex: '#fff' }])
  })

  describe('validators', () => {
    const data = [
      {
        label: 'r',
        max: 255,
        min: 0
      },
      {
        label: 'g',
        max: 255,
        min: 0
      },
      {
        label: 'b',
        max: 255,
        min: 0
      },
      {
        label: 'a',
        max: 1,
        min: 0
      },
      {
        label: 'h',
        max: 360,
        min: 0
      },
      {
        label: 's',
        max: 100,
        min: 0
      },
      {
        label: 'l',
        max: 100,
        min: 0
      },
      {
        label: 'v',
        max: 100,
        min: 0
      }
    ]
    data.forEach(({label, max, min}) => {
      it(`validators - ${label}`, () => {
        wrapper.setProps({
          label
        })
        wrapper.vm.handleChange(max+1)
        expect(wrapper.emitted().change[0]).toEqual([{ [label]: max }])
        wrapper.vm.handleChange(min-1)
        expect(wrapper.emitted().change[1]).toEqual([{ [label]: min }])
        const r = randomInt(min, max);
        wrapper.vm.handleChange(r)
        expect(wrapper.emitted().change[2]).toEqual([{ [label]: r }])
      })
    })
  })
})