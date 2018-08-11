import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  testMenu: false, // some testing
  schoolScoreTotal: 0, // total school score
  gameTotal: 0, // total game score
  // caclculatedScore: 0,
  /* schoolTurns: 1, // counter for number of turns to complete school */
  schoolCompleted: false, // check if school is completed
  gameTurns: 32, // game turns counter
  rollCount: 3, // roll counter for the current turn
  gameCheck: false,
  gameLocked: true, // unlock after completing school
  rollButtonDisabled: false,
  nextTurnButtonDisabled: true,
  nextTurnButtonText: 'Next Turn',
  turnCompleted: false,
  combinationArray: [],
  scoreArray: [{ // school combinations
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
    id: 'sixes'// 5
  },
  { // game combinations
    value: '',
    displayValues: [],
    final: false,
    id: 'pair' // 6
  },
  {
    value: '',
    displayValues: [],
    final: false,
    id: 'twoPairs' // 7

  },
  {
    value: '',
    displayValues: [],
    final: false,
    id: 'threeOfAKind' // 8
  },
  {
    value: '',
    displayValues: [],
    final: false,
    id: 'full' // 9
  },
  {
    value: '',
    displayValues: [],
    final: false,
    id: 'quads' // 10
  },
  {
    value: '',
    displayValues: [],
    final: false,
    id: 'poker' // 11
  },
  {
    value: '',
    displayValues: [],
    final: false,
    id: 'small' // 12
  },
  {
    value: '',
    displayValues: [],
    final: false,
    id: 'large' // 13
  },
  {
    value: '',
    displayValues: [],
    final: false,
    id: 'chance' // 14
  }],
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
  }],
  onesScore: 'initial', // need to remove this
  twosScore: 0 // and this
}

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

const mutations = {
  computeScore (state) {
    // empty array for calculating score
    let arrayToAnalyse = [[], [], [], [], [], []]
    // clear result if there is one dice in the combination array
    // for any game combination except chances and school we need at least a pair of dice
    if (state.combinationArray.length === 1) {
      // some ugly hardcoded stuff
      // to clear the range of values in the scoreArray
      for (let scoreArrayIndex = 6; scoreArrayIndex <= 14; scoreArrayIndex++) {
        if (state.scoreArray[scoreArrayIndex].final !== true) {
          state.scoreArray[scoreArrayIndex].value = ''
        }
      }
    }
    // if it is larger than 0, we have at least one dice to calculate
    if (state.combinationArray.length > 0) {
      for (let key in state.combinationArray) {
        // fill the 2D array to analyse later
        switch (state.combinationArray[key]) {
          case 1:
            arrayToAnalyse[0].push(state.combinationArray[key])
            break
          case 2:
            arrayToAnalyse[1].push(state.combinationArray[key])
            break
          case 3:
            arrayToAnalyse[2].push(state.combinationArray[key])
            break
          case 4:
            arrayToAnalyse[3].push(state.combinationArray[key])
            break
          case 5:
            arrayToAnalyse[4].push(state.combinationArray[key])
            break
          case 6:
            arrayToAnalyse[5].push(state.combinationArray[key])
            break
          default:
            console.log(`Couldn't create array to analyse.`)
        }
      }
      /* ---------------School score calculation--------------- */
      if (!state.schoolCompleted) {
        // initialise score var
        let schoolScore
        for (let key in arrayToAnalyse) {
          // key is _the_ key
          let currentDice = arrayToAnalyse[key][0]
          if (!currentDice && state.scoreArray[key].final !== true) {
            state.scoreArray[key].value = ''
          }
          // by checking first item we get dice type -- 'ones', 'twos', 'threes'
          if (arrayToAnalyse[key].length === 3) {
            // we got three equal dice and the score for that is zero points
            schoolScore = 0
          } else {
            // array of dice is greater than zero and not equal to three
            schoolScore = (arrayToAnalyse[key].length - 3) * arrayToAnalyse[key][0]
          }
          if (currentDice && state.scoreArray[currentDice - 1].final !== true) {
            // exists an array with at least one dice in it, set the score
            state.scoreArray[currentDice - 1].value = schoolScore
          }
        } /* ---------------End of school score calculation--------------- */
      } else {
        /* ---------------Game score calculation--------------- */
        let pairsArray = []
        let tripleArray = []
        let smallLargeCheckArray = []
        const scoreSum = (accumulator, currentValue) => accumulator + currentValue
        for (let key in arrayToAnalyse) {
          // key is _the_ key
          let currentDice = arrayToAnalyse[key][0]
          if (currentDice) { // start
            // collect dice into helper arrays
            if (arrayToAnalyse[currentDice - 1].length === 2) {
              pairsArray.push(currentDice)
            }
            if (arrayToAnalyse[currentDice - 1].length === 3) {
              tripleArray.push(currentDice)
            }

            // check for 'pair' combination
            if (pairsArray.length >= 1 && !state.scoreArray[6].final) {
              if (pairsArray.length === 1) {
                state.scoreArray[6].value = (pairsArray[0] * 2)
              } else if (pairsArray[0] > pairsArray[1]) {
                state.scoreArray[6].value = pairsArray[0] * 2
              } else {
                state.scoreArray[6].value = pairsArray[1] * 2
              }
            } else if (!state.scoreArray[6].final) {
              state.scoreArray[6].value = ''
            }

            // check for two pairs
            if (pairsArray.length === 2 && !state.scoreArray[7].final) {
              state.scoreArray[7].value = (pairsArray[0] * 2) + (pairsArray[1] * 2)
            } else if (pairsArray.length < 2 && !state.scoreArray[7].final) {
              state.scoreArray[7].value = ''
            }

            // check for three of a kind
            if (tripleArray.length === 1 && !state.scoreArray[8].final) {
              state.scoreArray[8].value = tripleArray[0] * 3
            } else if (!state.scoreArray[8].final) {
              state.scoreArray[8].value = ''
            }

            // check for full
            if (tripleArray.length === 1 && pairsArray.length === 1 && !state.scoreArray[9].final) {
              state.scoreArray[9].value = (tripleArray[0] * 3) + (pairsArray[0] * 2)
            } else if (!state.scoreArray[9].final) {
              state.scoreArray[9].value = ''
            }

            // check for quads
            if (arrayToAnalyse[currentDice - 1].length === 4 && !state.scoreArray[10].final) {
              state.scoreArray[10].value = currentDice * 4
            } else if (!state.scoreArray[10].final) {
              state.scoreArray[10].value = ''
            }

            // check for poker
            if (arrayToAnalyse[currentDice - 1].length === 5 && !state.scoreArray[11].final) {
              state.scoreArray[11].value = (currentDice * 5) + 80
            } else if (!state.scoreArray[11].final) {
              state.scoreArray[11].value = ''
            }

            // check for small
            if (arrayToAnalyse[currentDice - 1].length === 1) {
              // collect all dice
              smallLargeCheckArray.push(currentDice)
              // if array is large enough i.e. length equals 5
              if (smallLargeCheckArray.length === 5) {
                // calculate result and save it to the corresponding value
                if (smallLargeCheckArray[0] === 1) {
                  state.scoreArray[12].value = smallLargeCheckArray.reduce(scoreSum)
                } else {
                  state.scoreArray[13].value = smallLargeCheckArray.reduce(scoreSum)
                }
              }
            }
            // check for chance
            let chanceScore = state.combinationArray.reduce(scoreSum)
            if (!state.scoreArray[14].final) {
              state.scoreArray[14].value = chanceScore
            }
          }
        }
      }
      /* ---------------End of game score calculation--------------- */
    } else { // if combination array is empty, clear all temporary calculation results onscreen
      console.log(`ain't got shit, captain`)
      for (let key in state.scoreArray) { // there should be one storage array for school and game
        if (state.scoreArray[key].final !== true) { // to clear unconfirmed results properly
          state.scoreArray[key].value = ''
        }
      }
    }
  },
  rollDice (state) {
    state.rollCount--
    console.log(`Current game turn ${state.gameTurns}`)
    for (let key in state.diceArray) {
      if (state.diceArray[key].chosen !== true) {
        state.diceArray[key].value = Math.floor((Math.random() * 6) + 1)
      }
    }
    if (state.rollCount === 0) {
      state.rollButtonDisabled = true
    }
    if (state.rollCount === 0 && state.gameTurns <= 6 && !state.turnCompleted) {
      // check if we can record some result, if no -- game over
      let emptyDice = []
      for (let index = 0; index <= 5; index++) {
        // check if all results are set
        if (state.scoreArray[index].value === '' || !state.scoreArray[index].final) {
          emptyDice.push(index + 1)
        }
      }
      for (let value of emptyDice) {
        for (let key in state.diceArray) {
          if (state.diceArray[key].value === value) {
            console.log(`All ok, one found at ${state.diceArray[key].id} with value ${state.diceArray[key].value}`)
            state.gameCheck = true
          }
        }
      }
    }
    if (state.gameTurns <= 6 && state.rollCount === 0 && !state.turnCompleted && !state.gameCheck) {
      state.nextTurnButtonText = 'Game over'
      state.nextTurnButtonDisabled = false
    }
  },
  nextTurn (state) {
    state.gameCheck = false
    if (!state.gameCheck && !state.turnCompleted) {
      alert(`Game over, your score is ${state.schoolScoreTotal}`)
    } else {
      state.gameTurns++ // increment turn counter
      state.turnCompleted = false // set new turn state
      state.rollButtonDisabled = false // unlock roll button
      state.rollCount = 3 // set roll count to intial value of three
      for (let key in state.diceArray) {
        state.diceArray[key].value = '#'// reset all dice
        state.diceArray[key].chosen = false
      }
      // clear unsaved results onscreen
      for (let key in state.scoreArray) {
        if (!state.scoreArray[key].final) {
          state.scoreArray[key].value = ''
        }
      }
      state.nextTurnButtonDisabled = true
    }
  }
} // mutations end

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
