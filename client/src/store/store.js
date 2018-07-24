import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 1,
  score: 0,
  computedScore: 0,
  combinationArray: [],
  diceArray: [{
    value: 1,
    chosen: false,
    id: 'first'
  },
  {
    value: 2,
    chosen: false,
    id: 'second'
  },
  {
    value: 3,
    chosen: false,
    id: 'third'
  },
  {
    value: 4,
    chosen: false,
    id: 'fourth'
  },
  {
    value: 5,
    chosen: false,
    id: 'fifth'
  }
  ],
  rollCount: 0
}

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
  result: function (state) {
    let resultArray = state.combinationArray
    return resultArray
  }
  // numOfDiceToRoll: state => console.log(state.numOfDiceToRoll)
}

const mutations = {
  /* increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  }, */
  rollDice (state) {
    // console.log(`computing score`)
    for (let key in state.diceArray) {
      if (state.diceArray[key].chosen !== true) {
        state.diceArray[key].value = Math.floor((Math.random() * 6) + 1)
      }
    }
    state.rollCount++
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
