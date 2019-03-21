import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import getDefaultState from './defaultState.js'
// import getDefaultState from './debugState.js'

Vue.use(Vuex)
// initial state
const state = getDefaultState()

const actions = {
  /* increment: (context, payload) => context.commit('increment'), */
  setCurrentIcon: ({
    commit
  }) => commit(`setCurrentIcon`),
  setLastSave ({ commit }) {
    return new Promise((resolve) => {
      commit(`setLastSave`)
      resolve()
    })
  },
  resetGameOver ({ commit }, value) {
    return new Promise((resolve) => {
      commit(`resetGameOver`, value)
      resolve()
    })
  },
  clearResultBox ({ commit }) {
    return new Promise((resolve) => {
      commit(`clearResultBox`)
      resolve()
    })
  },
  saveResultInStore ({ commit }, id) {
    return new Promise((resolve) => {
      commit(`saveResultInStore`, id)
      resolve()
    })
  },
  computeScore ({ commit }) {
    return new Promise((resolve) => {
      commit(`computeScore`)
      resolve()
    })
  },
  setErrorMessage ({ commit }, error ) {
    return new Promise((resolve) => {
      commit(`setErrorMessage`, error)
      resolve()
    })
  },
  resetGameState: ({
    commit
  }) => commit(`resetState`),
  rollDice: ({
    commit
  }) => commit(`rollDice`),
  nextTurn: ({
    commit
  }) => commit(`nextTurn`)
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
