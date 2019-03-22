import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vue from 'vue'
import App from '@/App.vue'

// to remove some console warnings
Vue.config.ignoredElements = [
  `router-view`
]

// causes --> [Vue warn]: Invalid Component definition:
const localVue = createLocalVue()

Vue.use(Vuetify)

describe(`App.vue`, () => {
  test(`App is a Vue instance`, () => {
    const wrapper = shallowMount(App, {
      localVue
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
