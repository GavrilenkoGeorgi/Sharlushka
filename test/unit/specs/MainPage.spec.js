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
  // let actions
  let store

  beforeEach(() => {
    /*
    actions = {
      progressBarState: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
    */
    store = new Vuex.Store()
  })
  test(`Main page renders gameName and userName when passed`, () => {
    const gameNameString = `Sharlushka`
    const userNameString = `Anonymous`
    const wrapper = shallowMount(MainPage, {
      localVue,
      store,
      gameName: { gameNameString, userNameString }
    })

    // reference to the component instance
    // wrapper.vm
    // reference to the root dom node
    // wrapper.element
    const gameNameH1 = wrapper.find(`.game-name`)
    const userNameH2 = wrapper.find(`.user-name-main-page`)
    // const copyrightSpanTag = wrapper.find(`.copyrights`)
    expect(typeof gameNameH1.text()).toBe(`string`)
    expect(typeof userNameH2.text()).toBe(`string`)
    // expect(copyrightSpanTag.exists()).toBeTruthy()
  })
})