import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  schoolScoreTotal: 0, // total school score
  gameTotal: 0, // total game score
  schoolTurns: 1, // counter for number of turns to complete school
  schoolCompleted: false, // check if school is completed
  gameTurns: 1, // game turns counter
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
    value: '',
    final: false,
    id: 'pair'
  },
  {
    value: '',
    final: false,
    id: 'twoPairs'

  },
  {
    value: '',
    final: false,
    id: 'threeOfAKind'
  },
  {
    value: '',
    final: false,
    id: 'full'
  },
  {
    value: '',
    final: false,
    id: 'quads'
  },
  {
    value: '',
    final: false,
    id: 'poker'
  },
  {
    value: '',
    final: false,
    id: 'small'
  },
  {
    value: '',
    final: false,
    id: 'large'
  },
  {
    value: '',
    final: false,
    id: 'firstChance'
  },
  {
    value: '',
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
  computeGameScore (state) {
    let gameArray = [[], [], [], [], [], []]
    if (state.combinationArray.length > 0) {
      console.log(`Computing game score ${gameArray}`)
      for (let key in state.combinationArray) {
        // generate two dimensial array with user selected dice
        // maybe a switch would be better for this
        if (state.combinationArray[key] === 1) {
          gameArray[0].push(state.combinationArray[key])
          // we get array to calculate score for 'ones'
        }
        if (state.combinationArray[key] === 2) {
          gameArray[1].push(state.combinationArray[key])
          // for 'twos'
        }
        if (state.combinationArray[key] === 3) {
          gameArray[2].push(state.combinationArray[key])
          // for 'threes'
        }
        if (state.combinationArray[key] === 4) {
          gameArray[3].push(state.combinationArray[key])
          // for 'fourths'
        }
        if (state.combinationArray[key] === 5) {
          gameArray[4].push(state.combinationArray[key])
          // for 'fives'
        }
        if (state.combinationArray[key] === 6) {
          gameArray[5].push(state.combinationArray[key])
          // for 'sixes'
        }
      }
      // console.log(`Game array is ${gameArray}`)
      // initialise score var
      // let baseScore
      // array for two pairs combination check
      let pairsArray = []
      let smallLargeCheckArray = []
      const scoreSum = (accumulator, currentValue) => accumulator + currentValue
      for (let key in gameArray) {
        // key is _the_ key
        let currentDice = gameArray[key][0]
        // by checking first item we get dice type -- 'ones', 'twos', 'threes'
        // if it is undefined, i.e. no dice of this type left in the score array
        // set it to empty to clear results table for this dice on screen
        if (currentDice === undefined && state.gameScore[key].final !== true) {
          state.gameScore[key].value = ''
        }
        // check for 'pair' combination
        if (currentDice && gameArray[currentDice - 1].length === 2) {
          // console.log(`We got a pair of ${currentDice}`)
          // let score = currentDice * 2
          state.gameScore[0].value = currentDice * 2
          // check for two pairs
          pairsArray.push(currentDice)
          if (pairsArray.length === 2) {
            // console.log(`We got two pairs ${pairsArray}`)
            state.gameScore[1].value = (pairsArray[0] * 2) + (pairsArray[1] * 2)
          }
        }
        // check for three of a kind
        if (currentDice && gameArray[currentDice - 1].length === 3) {
          // console.log(`We got three of a kind`)
          state.gameScore[2].value = currentDice * 3
        }
        // check for full
        if (currentDice && gameArray[currentDice - 1].length === 3 && pairsArray.length === 1) {
          // console.log(`We got full`)
          state.gameScore[3].value = (currentDice * 3) + (pairsArray[0] * 2)
        }
        // check for quads
        if (currentDice && gameArray[currentDice - 1].length === 4) {
          state.gameScore[4].value = currentDice * 4
        }
        // check for poker
        if (currentDice && gameArray[currentDice - 1].length === 5) {
          state.gameScore[5].value = (currentDice * 5) + 80
        }
        // check for small
        if (currentDice && gameArray[currentDice - 1].length === 1) {
          // collect all dice
          smallLargeCheckArray.push(currentDice)
          // if array is large enough i.e. lenght equals 5
          if (smallLargeCheckArray.length === 5) {
            // calculate result and save it to the corresponding value
            if (smallLargeCheckArray[0] === 1) {
              state.gameScore[6].value = smallLargeCheckArray.reduce(scoreSum)
            } else {
              state.gameScore[7].value = smallLargeCheckArray.reduce(scoreSum)
            }
          }
        }
        // check for chance
        let chanceScore = state.combinationArray.reduce(scoreSum)
        if (currentDice && !state.gameScore[8].final) {
          state.gameScore[8].value = chanceScore
        } else if (currentDice && !state.gameScore[9].final) {
          state.gameScore[9].value = chanceScore
        }
        /*
        if (gameArray[key].length === 3) {
          // we got three equal dice and the score for that is zero points
          baseScore = 0
        } else {
          // array of dice is greater than zero and not equal to three
          baseScore = (gameArray[key].length - 3) * gameArray[key][0]
        }
        if (currentDice && state.gameScore[currentDice - 1].final !== true) {
          // exists an array with at least one dice in it, set the score
          state.gameScore[currentDice - 1].value = baseScore
        } */
      }
    } else { // if combination array is empty, clear all temporary calculation results onscreen
      console.log(`ain't got shit, captain`)
      for (let key in state.gameScore) {
        if (state.gameScore[key].final !== true) {
          state.gameScore[key].value = ''
        }
      }
    }
  },
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
  computeGameScore: ({
    commit
  }) => commit('computeGameScore'),
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
