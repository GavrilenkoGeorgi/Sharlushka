import { shallowMount, createLocalVue } from '@vue/test-utils'
// import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vue from 'vue'
import Game from '@/views/Game.vue'
Vue.config.ignoredElements = [
  `doneIcon`,
  `regIcon`,
  `menuIcon`,
  `saveIcon`,
  `restartIcon`,
  `diceOnes`,
  `diceTwos`,
  `diceThrees`,
  `diceFours`,
  `diceFives`,
  `diceSixes`
]

const localVue = createLocalVue()

localVue.use(Vuex)
Vue.use(Vuetify)

describe(`Game.vue`, () => {
  let actions
  let store
  let getters

  beforeEach(() => {
    actions = {
      computeScore: jest.fn()
    }
    getters = {
      getSchoolArray: () => [{
        value: ``, // school combinations
        final: false,
        id: `ones`,
        icon: `diceOnes`
      },
      {
        value: ``,
        final: false,
        id: `twos`,
        icon: `diceTwos`
      },
      {
        value: ``,
        final: false,
        id: `threes`,
        icon: `diceThrees`
      },
      {
        value: ``,
        final: false,
        id: `fours`,
        icon: `diceFours`
      },
      {
        value: ``,
        final: false,
        id: `fives`,
        icon: `diceFives`
      },
      {
        value: ``,
        final: false,
        id: `sixes`,
        icon: `diceSixes`
      }],
      getCombinationArray: jest.fn(),
      progressBarState: jest.fn(),
      getSchoolScore: jest.fn(),
      schoolFinished: jest.fn()
    }
    store = new Vuex.Store({
      actions,
      getters
    })
  })
  test(`is a Vue instance and game-layout exists`, () => {
    // const wrapper = mount(MainPage)
    const wrapper = shallowMount(Game, { localVue, store, getters })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.find(`.game-layout`).exists()).toBeTruthy()
  })
})