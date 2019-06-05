import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
// import getDefaultState from './defaultState.js'
import getDefaultState from './debugState.js'

Vue.use(Vuex)

// initial state
const state = getDefaultState()

const actions = {
  setCurrentUser: async ({ commit }, userData) => {
    commit(`setCurrentUser`, userData)
  },
  clearUserStats: async ({ commit }) => {
    commit(`clearUserStats`)
  },
  setLeaderboardStats: async ( { commit }, stats) => {
    commit(`setLeaderboardStats`, stats)
  },
  setAnonymousDiceFavs: async ({ commit }, favs) => {
    commit(`setAnonymousDiceFavs`, favs)
  },
  resetDiceValueFavs: async ({ commit }) => {
    commit(`resetDiceValueFavs`)
  },
  setCurrentIcon: ({
    commit
  }) => commit(`setCurrentIcon`),
  setLastSave ({ commit }, value) {
    return new Promise((resolve) => {
      commit(`setLastSave`, value)
      resolve()
    })
  },
  setUserName ({ commit }, value) {
    return new Promise((resolve) => {
      commit(`setUserName`, value)
      resolve()
    })
  },
  resetGameOver ({ commit }, value) {
    return new Promise((resolve) => {
      commit(`resetGameOver`, value)
      resolve()
    })
  },
  setGameOverDialog ({ commit }, value) {
    return new Promise((resolve) => {
      commit(`setGameOverDialog`, value)
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
      commit(`clearResultBox`, id)
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
  saveFavDiceValue ({ commit }, id ) {
    return new Promise((resolve) => {
      commit(`saveFavDiceValue`, id)
      resolve()
    })
  },
  resetGameState: async ({ commit }) => {
    commit(`resetGameState`)
  },
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
