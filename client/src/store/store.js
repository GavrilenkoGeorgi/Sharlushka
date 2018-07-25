import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 2,
  schoolScore: [{
    value: 'initial'
  },
  {
    value: 'initial'
  },
  {
    value: 'initial'
  },
  {
    value: 'initial'
  },
  {
    value: 'initial'
  },
  {
    value: 'initial'
  }],
  onesScore: 'initial',
  twosScore: 0,
  combinationArray: [],
  diceArray: [{
    value: 1,
    chosen: true,
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
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

const mutations = {
  /* increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  }, */
  computeScore (state) {
    state.count++
    if (state.combinationArray.length > 0) {
      let schoolArray = [[], [], [], [], [], []]

      for (let key in state.combinationArray) {
        if (state.combinationArray[key] === 1) {
          schoolArray[0].push(state.combinationArray[key])
          // we get array to calculate score for 'ones'
        }
        if (state.combinationArray[key] === 2) {
          schoolArray[1].push(state.combinationArray[key])
          // we get array to calculate score for 'twos'
        }
        if (state.combinationArray[key] === 3) {
          schoolArray[2].push(state.combinationArray[key])
          // we get array to calculate score for 'threes'
        }
        if (state.combinationArray[key] === 4) {
          schoolArray[3].push(state.combinationArray[key])
          // we get array to calculate score for 'fourths'
        }
        if (state.combinationArray[key] === 5) {
          schoolArray[4].push(state.combinationArray[key])
          // we get array to calculate score for 'fives'
        }
        if (state.combinationArray[key] === 6) {
          schoolArray[5].push(state.combinationArray[key])
          // we get array to calculate score for 'sixes'
        }
      }
      let baseScore = 0
      for (let key in schoolArray) {
        let currentDice = schoolArray[key][0]
        console.log(`Current dice is: ${currentDice}`)
        // key is _the_ key
        if (schoolArray[key].length === 3) {
          // we got three equal dice and the score for that is zero points
          baseScore = 0
        } else {
          // array of dice is greater than zero and not equal to three
          baseScore = (schoolArray[key].length - 3) * schoolArray[key][0]
          console.log(`Result in else ${baseScore}`)
        }
        if (currentDice) {
          state.schoolScore[currentDice - 1].value = baseScore
        }
      }
    } else {
      console.log(`ain't got shit, captain`)
    }
  },
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
  computeScore: ({
    commit
  }) => commit('computeScore'),
  rollDice: ({
    commit
  }) => commit('rollDice'),
  removeDice: ({
    commit
  }) => commit('removeDice'),
  increment: ({
    commit
  }) => commit('increment'),
  decrement: ({
    commit
  }) => commit('decrement'),
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
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
