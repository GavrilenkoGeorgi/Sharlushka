import Vue from 'vue'
import Vuex from 'vuex'
// import store from './store/store'

Vue.use(Vuex)

const state = {
  count: 1,
  // rolled: false,
  // firstDiceValue: 1,
  diceArray: [1, 2, 3, 4, 5],
  rolledDice: [],
  rollCount: 0,
  numOfDiceToRoll: 5
}

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
  numOfDiceToRoll: state => console.log(state.numOfDiceToRoll)
}

const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  },
  removeDice (state) {
    state.numOfDiceToRoll--
  },
  rollDice (state) {
    // console.log(state.diceArray[4])
    // state.firstDiceValue = Math.floor((Math.random() * 6) + 1)
    // state.diceArray[0] = Math.floor((Math.random() * 6) + 1)
    state.rollCount++
    for (let key in state.diceArray) {
      state.diceArray[key] = Math.floor((Math.random() * 6) + 1)
    }
    console.log(state.diceArray)
  }
}

const actions = {
  /* increment: (context, payload) => context.commit('increment'), */
  rollDice: ({ commit }) => commit('rollDice'),
  removeDice: ({ commit }) => commit('removeDice'),
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd: ({ commit, state }) => {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync: ({ commit }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
