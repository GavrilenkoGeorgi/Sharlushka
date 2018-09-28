import Vue from 'vue'
import Vuex from 'vuex'
// import { stat } from 'fs';

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    debug: false,
    currentUserName: '', // remove this from here
    mainButtonText: 'Start',
    schoolScoreTotal: 0, // total school score
    gameTotal: 0, // total game score
    schoolCompleted: false, // check if school is completed
    gameTurns: 1, // game turns counter
    maxGameTurns: 33,
    rollCount: 3, // roll counter for the current turn
    gameCheck: false, // to check if there are any combinations left to record
    zeroCheck: false,
    turnCompleted: false,
    combinationArray: [],
    scoreArray: [{
      value: '', // school combinations
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
    diceArray: [{ // dice Array
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
    }]
  }
}

// initial state
const state = getDefaultState()

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
  debugInfo: function (state) {
    // console.log(`Debug on`)
    // console.log(state)
    for (let key in state.scoreArray) {
      if (state.scoreArray[key].value !== '') {
        let info = {
          name: state.scoreArray[key].id,
          chosen: state.scoreArray[key].chosen,
          value: state.scoreArray[key].value
        }
        // console.log(info)
        return info
      }
    }
  },
  chosenDiceArray: function (state) {
    // console.log(`Getter test`)
    return state.diceArray.filter(dice => {
      return dice.chosen
    })
  },
  currentValuesInScoreArray: function (state) {
    // console.log(`Current values getter`)
    return state.scoreArray.filter(score => {
      return score.value !== '' && !score.final
    })
  }
}
const mutations = {
  computeScore (state) {
    if (!state.turnCompleted) {
      // empty array for calculating score
      let arrayToAnalyse = [[], [], [], [], [], []] // dice are with values from 1 to 6, quantity: 5 pieces
      // for any game combination except chances and school we need at least a pair of dice
      // if it is larger than 0, we have at least one dice to calculate
      if (state.combinationArray.length > 0) {
        for (let key in state.combinationArray) {
          // fill the 2D array to analyse it
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
              // console.log(`Can't create array to analyse.`)
              return false
          }
        }
        /* ---------------School score calculation--------------- */
        if (!state.schoolCompleted) {
          // initialise score var
          let schoolScore
          for (let key in arrayToAnalyse) {
            // key is _the_ key!
            // by checking first item we get dice type -- 'ones', 'twos', 'threes' ... 'sixes'
            let currentDice = arrayToAnalyse[key][0]
            if (!currentDice && state.scoreArray[key].final !== true) {
              state.scoreArray[key].value = '' // if there is no dice of this kind
            }
            if (arrayToAnalyse[key].length === 3) {
              // we got three equal dice and the score for that is zero points
              schoolScore = 0
            } else {
              // array of dice is greater than zero and not equal to three
              // we do this trick. example: we got two sixes, arrayToAnanlyse.["sixes"].length minus 3 is '-1'
              // multiplied by 6 will score '-6'
              // if we got 1 dice with value 6 --> array.length is '-2' * 6 equals '-12'
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
          let quadsArray = []
          let smallLargeCheckArray = []
          const scoreSum = (accumulator, currentValue) => accumulator + currentValue
          for (let key in arrayToAnalyse) {
            // key is _the_ key
            // get the first value form array with current _key_
            let currentDice = arrayToAnalyse[key][0]
            if (currentDice) { // start
              // collect dice into helper arrays
              if (arrayToAnalyse[currentDice - 1].length === 2) {
                pairsArray.push(currentDice)
              }
              if (arrayToAnalyse[currentDice - 1].length === 3) {
                tripleArray.push(currentDice)
              }
              if (arrayToAnalyse[currentDice - 1].length === 4) {
                quadsArray.push(currentDice)
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
              // very complicated, need to do something about it
              // if (arrayToAnalyse[currentDice - 1].length === 4 && !state.scoreArray[10].final) {
              if (quadsArray >= 1 && !state.scoreArray[10].final) {
                // console.log(`Quads debug quadsArray -->`)
                // console.log(quadsArray)
                // state.scoreArray[10].value = currentDice * 4
                state.scoreArray[10].value = quadsArray[0] * 4
              } else if (!state.scoreArray[10].final) {
                state.scoreArray[10].value = ''
              }

              // check for poker
              if (arrayToAnalyse[currentDice - 1].length === 5 && !state.scoreArray[11].final) {
                state.scoreArray[11].value = (currentDice * 5) + 80
              } else if (!state.scoreArray[11].final) {
                state.scoreArray[11].value = ''
              }

              // check for 'small' and 'large' combinations
              if (arrayToAnalyse[currentDice - 1].length === 1) {
                // collect all dice
                smallLargeCheckArray.push(currentDice)
                // if array is large enough i.e. length equals 5
                if (smallLargeCheckArray.length === 5) {
                  smallLargeCheckArray.sort()
                  // calculate result and save it to the corresponding value
                  if (smallLargeCheckArray[0] === 1 && smallLargeCheckArray[smallLargeCheckArray.length - 1] === 5) {
                    // we got small combination
                    state.scoreArray[12].value = smallLargeCheckArray.reduce(scoreSum)
                  } else if (smallLargeCheckArray[0] === 2 && smallLargeCheckArray[smallLargeCheckArray.length - 1] === 6) {
                    // we got large combination
                    state.scoreArray[13].value = smallLargeCheckArray.reduce(scoreSum)
                  }
                }
              } else if (!state.scoreArray[12].final) {
                state.scoreArray[12].value = ''
              } else if (!state.scoreArray[13].final) {
                state.scoreArray[13].value = ''
              }
              // check for chance
              let chanceScore = state.combinationArray.reduce(scoreSum)
              if (!state.scoreArray[14].final) {
                state.scoreArray[14].value = chanceScore
              } else if (!state.scoreArray[14].final) {
                state.scoreArray[14].value = ''
              }
            }
          }
        }
        /* ---------------End of game score calculation--------------- */
      } else if (state.combinationArray.length === 0) { // if combination array is empty, clear all temporary calculation results onscreen
        // console.log(`ain't got shit, captain`)
        for (let key in state.scoreArray) { // there should be one storage array for school and game
          if (state.scoreArray[key].final !== true) { // to clear unconfirmed results properly
            state.scoreArray[key].value = ''
          }
        }
      } else {
        alert(`Error!`)
      }
    }
  },
  rollDice (state) {
    state.rollCount--
    // console.log(`Current game turn ${state.gameTurns}`)
    for (let key in state.diceArray) {
      if (state.diceArray[key].chosen !== true) {
        state.diceArray[key].value = Math.floor((Math.random() * 6) + 1)
      }
    }
    /*
    if (state.rollCount === 0) {
      state.rollButtonDisabled = true
    }
    */
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
            // console.log(`All ok, one found at ${state.diceArray[key].id} with value ${state.diceArray[key].value}`)
            state.gameCheck = true
          }
        }
      }
    }
    // check if user was able to complete school
    if (state.gameTurns <= 6 && state.rollCount === 0 && !state.turnCompleted && !state.gameCheck) {
      // state.nextTurnButtonText = 'Game over'
      // state.nextTurnButtonDisabled = false
      state.endGameMenu = true
    }
  },
  nextTurn (state) {
    state.gameCheck = false
    state.zeroCheck = false
    if (!state.gameCheck && !state.turnCompleted) {
      alert(`Game over, your score is ${state.schoolScoreTotal}`)
    } else {
      state.gameTurns++ // increment turn counter
      state.turnCompleted = false // set new turn state
      // state.rollButtonDisabled = false // unlock roll button
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
      state.combinationArray = []
      // state.nextTurnButtonDisabled = true
    }
  },
  resetState (state) {
    Object.assign(state, getDefaultState())
  }
} // mutations end

const actions = {
  /* increment: (context, payload) => context.commit('increment'), */
  resetGameState: ({
    commit
  }) => commit('resetState'),
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
