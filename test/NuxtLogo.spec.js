import { mount } from '@vue/test-utils'
import NuxtLogo from '@/components/NuxtLogo.vue'

describe('NuxtLogo', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(NuxtLogo)
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('is a svg', () => {
    expect(wrapper.element.tagName).toBe('svg')
  })
})
