import { mount } from '@vue/test-utils'
import GenderLabel from '@/components/GenderLabel.vue'

describe('GenderLabel', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(GenderLabel)

    expect(wrapper.vm).toBeTruthy()
  })

  test('is male when no props are pass', () => {
    const wrapper = mount(GenderLabel, {
      propsData: {},
      slots: {},
    })

    expect(wrapper.element.classList.contains('o-gender--male')).toBeTruthy()

    expect(wrapper.find('span > span').text()).toBe('Male')
  })

  test('is female when props are pass', () => {
    const wrapper = mount(GenderLabel, {
      propsData: {
        gender: 'female',
      },
      slots: {},
    })

    expect(wrapper.element.classList.contains('o-gender--female')).toBeTruthy()

    expect(wrapper.find('span > span').text()).toBe('Female')
  })

  test('slot is not linked to props when set', () => {
    const wrapper = mount(GenderLabel, {
      propsData: {},
      slots: {
        default: 'Test prova'
      },
    })

    expect(wrapper.element.classList.contains('o-gender--male')).toBeTruthy()

    expect(wrapper.find('span > span').text()).toBe('Test prova')
  })
})
