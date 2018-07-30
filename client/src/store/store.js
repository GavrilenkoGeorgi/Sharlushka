import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  schoolScoreTotal: 0, // total school score
  gameTotal: 0, // total game score
  schoolTurns: 1, // counter for number of turns to complete school
  schoolScore: [{ // school score array
    value: '',
    final: false,
    id: 'ones'
  },
  {
    value: '',
    final: false,
    id: 'twos'

  },
  {
    value: '',
    final: false,
    id: 'threes'
  },
  {
    value: '',
    final: false,
    id: 'fours'
  },
  {
    value: '',
    final: false,
    id: 'fives'
  },
  {
    value: '',
    final: false,
    id: 'sixes'
  }],
  gameScore: [{ // game score array
    value: 2,
    final: false,
    id: 'pair'
  },
  {
    value: 3,
    final: false,
    id: 'twoPairs'

  },
  {
    value: 8,
    final: false,
    id: 'threeOfAKind'
  },
  {
    value: 4,
    final: false,
    id: 'full'
  },
  {
    value: 5,
    final: false,
    id: 'quads'
  },
  {
    value: 4,
    final: false,
    id: 'poker'
  },
  {
    value: 9,
    final: false,
    id: 'small'
  },
  {
    value: 12,
    final: false,
    id: 'large'
  },
  {
    value: 11,
    final: false,
    id: 'firstChance'
  },
  {
    value: 8,
    final: false,
    id: 'secondChance'
  }],
  onesScore: 'initial',
  twosScore: 0,
  combinationArray: [],
  diceArray: [{
    value: '#',
    chosen: false,
    id: 'first'
  },
  {
    value: '#',
    chosen: false,
    id: 'second'
  },
  {
    value: '#',
    chosen: false,
    id: 'third'
  },
  {
    value: '#',
    chosen: false,
    id: 'fourth'
  },
  {
    value: '#',
    chosen: false,
    id: 'fifth'
  }
  ],
  rollCount: 3,
  rollButtonDisabled: false,
  nextTurnButtonDisabled: true
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
    // empty array for calculating score in "school"
    let schoolArray = [[], [], [], [], [], []]
    // if it is larger than 0, we have at least one dice to calculate
    if (state.combinationArray.length > 0) {
      for (let key in state.combinationArray) {
        // maybe a switch would be better for this
        if (state.combinationArray[key] === 1) {
          schoolArray[0].push(state.combinationArray[key])
          // we get array to calculate score for 'ones'
        }
        if (state.combinationArray[key] === 2) {
          schoolArray[1].push(state.combinationArray[key])
          // for 'twos'
        }
        if (state.combinationArray[key] === 3) {
          schoolArray[2].push(state.combinationArray[key])
          // for 'threes'
        }
        if (state.combinationArray[key] === 4) {
          schoolArray[3].push(state.combinationArray[key])
          // for 'fourths'
        }
        if (state.combinationArray[key] === 5) {
          schoolArray[4].push(state.combinationArray[key])
          // for 'fives'
        }
        if (state.combinationArray[key] === 6) {
          schoolArray[5].push(state.combinationArray[key])
          // for 'sixes'
        }
      }
      // initialise score var
      let baseScore
      for (let key in schoolArray) {
        // key is _the_ key
        let currentDice = schoolArray[key][0]
        // by checking first item we get dice type -- 'ones', 'twos', 'threes'
        // if it is undefined, i.e. no dice of this type left in the score array
        // set it to empty to clear results table for this dice on screen
        if (currentDice === undefined && state.schoolScore[key].final !== true) {
          state.schoolScore[key].value = ''
        }
        if (schoolArray[key].length === 3) {
          // we got three equal dice and the score for that is zero points
          baseScore = 0
        } else {
          // array of dice is greater than zero and not equal to three
          baseScore = (schoolArray[key].length - 3) * schoolArray[key][0]
        }
        if (currentDice && state.schoolScore[currentDice - 1].final !== true) {
          // exists an array with at least one dice in it, set the score
          state.schoolScore[currentDice - 1].value = baseScore
        }
      }
    } else { // if combination array is empty, clear all temporary calculation results onscreen
      console.log(`ain't got shit, captain`)
      for (let key in state.schoolScore) {
        if (state.schoolScore[key].final !== true) {
          state.schoolScore[key].value = ''
        }
      }
    }
  },
  rollDice (state) {
    for (let key in state.diceArray) {
      if (state.diceArray[key].chosen !== true) {
        state.diceArray[key].value = Math.floor((Math.random() * 6) + 1)
      }
    }
    state.rollCount--
    if (state.rollCount === 0) {
      state.rollButtonDisabled = true
    }
    /*
    else if (state.schoolTurns === 6 && state.rollCount === 0) {
      state.rollButtonDisabled = true
      console.log(`No turns left`)
    } */
  },
  nextTurn (state) {
    state.rollButtonDisabled = false
    state.rollCount = 3
    for (let key in state.diceArray) {
      state.diceArray[key].value = '#'
      state.diceArray[key].chosen = false
    }
    state.nextTurnButtonDisabled = true
    state.schoolTurns++
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
  /* removeDice: ({
    commit
  }) => commit('removeDice'), */
  nextTurn: ({
    commit
  }) => commit('nextTurn'),
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
