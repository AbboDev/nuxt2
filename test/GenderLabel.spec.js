import { createLocalVue, mount } from '@vue/test-utils'
import UiIcon from 'balm-ui/src/scripts/components/icon/icon.vue'
import GenderLabel from '@/components/GenderLabel.vue'

const localVue = createLocalVue()
localVue.component('UiIcon', UiIcon)

describe('GenderLabel', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(GenderLabel, {
      localVue,
      propsData: {},
      slots: {},
      // stubs: {
      //   UiIcon
      // },
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('is male when no props are pass', () => {
    expect(wrapper.element.classList.contains('o-gender--male')).toBeTruthy()

    expect(wrapper.find('span > span').text()).toBe('Male')
  })

  test('is female when props are pass', async () => {
    await wrapper.setProps({
      gender: 'female',
    })

    expect(wrapper.element.classList.contains('o-gender--female')).toBeTruthy()

    expect(wrapper.find('span > span').text()).toBe('Female')
  })

  test('slot is not linked to props when set', () => {
    wrapper = mount(GenderLabel, {
      localVue,
      propsData: {},
      slots: {
        default: 'Test prova',
      },
    })

    expect(wrapper.element.classList.contains('o-gender--male')).toBeTruthy()

    expect(wrapper.find('span > span').text()).toBe('Test prova')
  })
})
