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
    commit,
  }) => commit(`setCurrentIcon`),
  resetGameState: ({
    commit,
  }) => commit(`resetState`),
  computeScore: ({
    commit,
  }) => commit(`computeScore`),
  rollDice: ({
    commit,
  }) => commit(`rollDice`),
  nextTurn: ({
    commit,
  }) => commit(`nextTurn`),
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
