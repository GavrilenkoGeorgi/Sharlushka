import { shallowMount, createLocalVue } from '@vue/test-utils'
// import { createLocalVue } from '@vue/test-utils'
// import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vue from 'vue'
import MainPage from '@/views/MainPage.vue'
Vue.config.ignoredElements = [
  `doneIcon`, `regIcon`
]

const localVue = createLocalVue()

localVue.use(Vuex)
Vue.use(Vuetify)

describe(`MainPage.vue`, () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      progressBarState: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  test(`is a Vue instance`, () => {
    // const wrapper = mount(MainPage)
    const wrapper = shallowMount(MainPage, { localVue, store })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  /*
  it(`test if it working or not"`, () => {
    const wrapper = shallowMount(MainPage, { localVue, store })
    // const input = wrapper.find('input')
    // input.element.value = 'input'
    // input.trigger('input')
    // expect(actions.actionInput).toHaveBeenCalled()
    // expect(actions.progressBarState.called).toBe(33)
  })
  */
})