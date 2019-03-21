import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vue from 'vue'
// import sinon from 'sinon'
import MainPage from '@/views/MainPage.vue'

// to remove some console warnings
Vue.config.ignoredElements = [
  `doneIcon`, `regIcon`
]

// causes --> [Vue warn]: Invalid Component definition:
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
  test(`is a Vue instance and renders gameName and userName when passed`, () => {
    const gameNameString = `Sharlushka`
    const userNameString = `Anonymous`
    const wrapper = shallowMount(MainPage, {
      localVue,
      store,
      gameName: { gameNameString, userNameString }
    })
    const gameNameH1 = wrapper.find(`.game-name`)
    const userNameH2 = wrapper.find(`.user-name-main-page`)
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(typeof gameNameH1.text()).toBe(`string`)
    expect(typeof userNameH2.text()).toBe(`string`)
  })
})