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
  // after login
  setCurrentUser: async ({ commit }, userData) =>
    commit(`setCurrentUser`, userData),

  // after log out
  clearUserStats: async ({ commit }) =>
    commit(`clearUserStats`),

  // user stats view
  setLeaderboardStats: async ( { commit }, stats) =>
    commit(`setLeaderboardStats`, stats),

  // end game view
  setGameEnd: async ({ commit }) =>
    commit(`setGameEnd`),

  // restart buttons
  restartGame: async ({ commit }) =>
    commit(`restartGame`),

  // after saving result
  nextTurn: async ({ commit }) =>
    commit(`nextTurn`),

  // dice box component
  rollDice: async ({ commit }) =>
    commit(`rollDice`),
  setDiceChosenState: async ({ commit }, id) =>
    commit(`setDiceChosenState`, id),

  // navbar click spot
  clearResultBox: async ({ commit }) =>
    commit(`clearResultBox`),

  // game view
  saveResultInStore ({ commit }, id) {
    return new Promise((resolve) => {
      commit(`saveResultInStore`, id)
      // should move this to component
      commit(`clearResultBox`, id)
      resolve()
    })
  },

  // after chosing dice
  computeScore: async ({ commit }) =>
    commit(`computeScore`),

  setErrorMessage: async ({ commit }, error ) =>
    commit(`setErrorMessage`, error)
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
