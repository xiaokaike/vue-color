import { shallowMount } from '@vue/test-utils'

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

  test('emit', () => {})

  test('validators', () => {})
})