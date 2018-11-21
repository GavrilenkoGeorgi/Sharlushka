import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import getDefaultState from './defaultState.js'

Vue.use(Vuex)
// initial state
const state = getDefaultState()

const actions = {
  /* increment: (context, payload) => context.commit('increment'), */
  setCurrentIcon: ({
    commit
  }) => commit('setCurrentIcon'),
  resetGameState: ({
    commit
  }) => commit('resetState'),
  computeScore: ({
    commit
  }) => commit('computeScore'),
  rollDice: ({
    commit
  }) => commit('rollDice'),
  nextTurn: ({
    commit
  }) => commit('nextTurn')
  /*
  incrementIfOdd: ({
    commit,
    state
  }) => {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  } */
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
