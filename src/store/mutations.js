export default {
  computeScore(state) { // biggest chunk of javaScript
    if (!state.turnCompleted) {
      // empty array for calculating score
      const arrayToAnalyse = [[], [], [], [], [], []]
      // dice are with values from 1 to 6, quantity: 5 pieces
      // for any game combination except chances and school we need at least a pair of dice
      // if it is larger than 0, we have at least one dice to calculate
      if (state.combinationArray.length > 0) {
        for (const key in state.combinationArray) {
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
            console.log(`Can't create array to analyse`)
            return false
          }
        }
        /* ---------------School score calculation--------------- */
        if (!state.schoolCompleted) {
          // initialise score var
          let schoolScore
          for (const key in arrayToAnalyse) {
            // key is _the_ key!
            // by checking first item we get dice type -- 'ones', 'twos', 'threes' ... 'sixes'
            const currentDice = arrayToAnalyse[key][0]
            if (!currentDice && state.scoreArray[key].final !== true) {
              state.scoreArray[key].value = `` // if there is no dice of this kind
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
          const pairsArray = []
          const tripleArray = []
          const quadsArray = []
          const smallLargeCheckArray = []
          const scoreSum = (accumulator, currentValue) => accumulator + currentValue
          for (const key in arrayToAnalyse) {
            // key is _the_ key
            // get the first value form array with current _key_
            const currentDice = arrayToAnalyse[key][0]
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
              // there may be two pairs and we need to choose
              // the highest scoring one
              if ((pairsArray.length >= 1 || tripleArray.length >= 1) &&
                !state.scoreArray[6].final) {
                // we have pairs or triples array and the pairs score is not final
                // in case of pairs array
                let highestScoringPair = 0
                if (pairsArray.length > 0) {
                  highestScoringPair = pairsArray[0] * 2
                  state.scoreArray[6].value = highestScoringPair
                }
                if (pairsArray.length > 1) {
                  if (pairsArray[0] > pairsArray[1]) {
                    highestScoringPair = pairsArray[0] * 2
                  } else {
                    highestScoringPair = pairsArray[1] * 2
                  }
                  state.scoreArray[6].value = highestScoringPair
                } else if (pairsArray.length === 1) {
                  highestScoringPair = pairsArray[0] * 2
                  state.scoreArray[6].value = highestScoringPair
                }
                if (tripleArray.length === 1) {
                  // check if it is bigger than what we have already
                  const tripleArrayValue = tripleArray[0] * 2
                  if (tripleArrayValue > highestScoringPair) {
                    state.scoreArray[6].value = tripleArrayValue
                  } else {
                    state.scoreArray[6].value = highestScoringPair
                  }
                }
                // state.scoreArray[6].value = highestScoringPair
              } else if (!state.scoreArray[6].final) {
                state.scoreArray[6].value = ``
              }

              // check for two pairs
              if (pairsArray.length === 2 && !state.scoreArray[7].final) {
                state.scoreArray[7].value = (pairsArray[0] * 2) + (pairsArray[1] * 2)
              } else if (pairsArray.length === 1 && tripleArray.length === 1 && !state.scoreArray[7].final) {
                const xpScore = (pairsArray[0] * 2) + (tripleArray[0] * 2)
                state.scoreArray[7].value = xpScore
              } else if (pairsArray.length < 2 && !state.scoreArray[7].final) {
                state.scoreArray[7].value = `` // do something with this
              }

              // check for three of a kind
              if (tripleArray.length === 1 && !state.scoreArray[8].final) {
                state.scoreArray[8].value = tripleArray[0] * 3
              } else if (!state.scoreArray[8].final) {
                state.scoreArray[8].value = ``
              }

              // check for full
              if (tripleArray.length === 1 && pairsArray.length === 1 && !state.scoreArray[9].final) {
                state.scoreArray[9].value = (tripleArray[0] * 3) + (pairsArray[0] * 2)
              } else if (!state.scoreArray[9].final) {
                state.scoreArray[9].value = ``
              }

              // check for quads
              // very complicated, need to do something about it
              if (quadsArray >= 1) {
                // check for quads
                if (!state.scoreArray[10].final) {
                  state.scoreArray[10].value = quadsArray[0] * 4
                }
                if (!state.scoreArray[8].final) {
                  // so if three of a kind is not final we can count it as a three o.a.k
                  state.scoreArray[8].value = quadsArray[0] * 3
                }
                if (!state.scoreArray[6].final) {
                  // pair is not final, we can count it as a pair
                  state.scoreArray[6].value = quadsArray[0] * 2
                }
              } else if (!state.scoreArray[10].final) {
                // finally clear all previous result calculations
                // need this for proper results clearing onscreen
                // when user deciding which combination to choose
                state.scoreArray[10].value = ``
              }

              // check for poker
              // you should really check for poker first and then
              // for quads, three o.a.k and a pair
              if (arrayToAnalyse[currentDice - 1].length === 5 && !state.scoreArray[11].final) {
                state.scoreArray[11].value = (currentDice * 5) + 80
                // This should be something else here (
                if (!state.scoreArray[10].final) {
                  // quads
                  state.scoreArray[10].value = arrayToAnalyse[currentDice - 1] * 4
                }
                if (!state.scoreArray[8].final) {
                  // so if three of a kind is not final we can count it as a three o.a.k
                  state.scoreArray[8].value = arrayToAnalyse[currentDice - 1] * 3
                }
                if (!state.scoreArray[6].final) {
                  // pair is not final we can count it as a pair
                  state.scoreArray[6].value = arrayToAnalyse[currentDice - 1] * 2
                }
              } else if (!state.scoreArray[11].final) {
                state.scoreArray[11].value = ``
              }
              // check for 'small' and 'large' combinations
              if (arrayToAnalyse[currentDice - 1].length === 1) {
                // collect all dice
                smallLargeCheckArray.push(currentDice)
                // if array is large enough i.e. length equals 5
                if (smallLargeCheckArray.length === 5) {
                  smallLargeCheckArray.sort()
                  // calculate result and save it to the corresponding value
                  if (smallLargeCheckArray[0] === 1 &&
                      smallLargeCheckArray[smallLargeCheckArray.length - 1] === 5 &&
                      !state.scoreArray[12].final) {
                    // we got small combination
                    state.scoreArray[12].value = smallLargeCheckArray.reduce(scoreSum)
                  } else if (smallLargeCheckArray[0] === 2 &&
                              smallLargeCheckArray[smallLargeCheckArray.length - 1] === 6 &&
                              !state.scoreArray[13].final) {
                    // we got large combination
                    state.scoreArray[13].value = smallLargeCheckArray.reduce(scoreSum)
                  }
                } else {
                  state.scoreArray[12].value = ``
                  state.scoreArray[13].value = ``
                }
              }
              // check for chance
              const chanceScore = state.combinationArray.reduce(scoreSum)
              if (!state.scoreArray[14].final) {
                state.scoreArray[14].value = chanceScore
              } else if (!state.scoreArray[14].final) {
                state.scoreArray[14].value = ``
              }
            }
          }
        }
        /* ---------------End of game score calculation--------------- */
      } else if (state.combinationArray.length === 0) { // if combination array is empty,
        // clear all temporary calculation results onscreen
        console.log(`Ain't got shit, captain`)
        for (const key in state.scoreArray) { // there should be one storage array for school and game
          if (state.scoreArray[key].final !== true) { // to clear unconfirmed results properly
            state.scoreArray[key].value = ``
          }
        }
      } else {
        alert(`Error!`) // meh...
      }
    }
  },
  setDiceChosenState(state, diceId) {
    for (const key in state.diceArray) {
      if (state.diceArray[key].id === diceId) {
        if (!state.diceArray[key].chosen) {
          state.combinationArray.push(state.diceArray[key].value)
          state.diceArray[key].chosen = true
        } else {
          state.diceArray[key].chosen = false
          const value = state.diceArray[key].value
          const indexToRemove = state.combinationArray.indexOf(value)
          state.combinationArray.splice(indexToRemove, 1)
        }
      }
    }
  },
  rollDice(state) {
    state.newTurn = false
    state.diceRollInProgress = true // what is this?
    state.rollCount--
    // state.diceRolled = false
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    }
    for (const dice of state.diceArray) {
      if (!dice.chosen) {
        // let numbah = Math.floor((Math.random() * 6) + 1)
        const numbah = getRandomInt(6) + 1 // shifting stuff
        // set dice value
        dice.value = numbah
        // set dice icon svg image
        dice.currentIcon = state.scoreArray[numbah - 1].icon
      }
    }
    // on last roll in school on the sixth turn we check if we can continue
    if (state.rollCount === 0 && state.currentGameTurn <= 6 && !state.turnCompleted) {
      // check if we can record some result, if no -- game over
      const emptyDice = []
      for (let index = 0; index <= 5; index++) {
        // check if all results are set
        if (state.scoreArray[index].value === `` || !state.scoreArray[index].final) {
          emptyDice.push(index + 1)
        }
      }
      for (const value of emptyDice) {
        for (const key in state.diceArray) {
          if (state.diceArray[key].value === value) {
            console.log(`All ok, one found at ${state.diceArray[key].id} with value ${state.diceArray[key].value}`)
            state.gameCheck = true
          }
        }
      }
    }
    // check if user was able to complete school
    if (state.currentGameTurn <= 6 &&
        state.rollCount === 0 &&
        !state.turnCompleted &&
        !state.gameCheck) {
      console.log(`You can't even finish the school... Score is: ${state.schoolScoreTotal}`)
      state.gameEnded = true
      return false
    }
    // state.diceBoxHidden = false
  },
  nextTurn(state) {
    state.newTurn = true
    state.gameCheck = false
    state.zeroCheck = false
    // state.diceBoxHidden = true
    state.currentGameTurn++ // increment turn counter
    state.turnCompleted = false // set new turn state
    state.rollCount = 3 // set roll count to intial value of three
    for (const key in state.diceArray) {
      state.diceArray[key].value = `#`// reset all dice
      state.diceArray[key].chosen = false
    }
    state.combinationArray = []
    // clear unsaved results onscreen
  },
  /*
  stopDiceRollProcess(state) {
    state.diceRollInProgress = false
  },
  */
  resetState(state) { // reset state
    /*
    // hard reset
    // Object.assign(state, getDefaultState())
    */
    // or just reset the game variables
    state.newTurn = true
    state.diceRolled = true
    state.schoolScoreTotal = 0 // total school score
    state.gameTotal = 0 // total game score
    state.schoolCompleted = false // check if school is completed
    state.currentGameTurn = 1 // game turns counter
    state.maxGameTurns = 33
    state.rollCount = 3 // roll counter for the current turn
    state.gameCheck = false // to check if there are any combinations left to record
    // zeroCheck = false,
    state.turnCompleted = false
    state.gameInProgress = false
    state.gameEnded = false
    state.combinationArray = []
    // and clear results
    for (const result of state.scoreArray) {
      result.value = ``
      result.final = false
      if (result.displayValues) {
        result.displayValues = []
      }
    }
    // and all dice chosen states and current value
    for (const dice of state.diceArray) {
      dice.value = `#`
      dice.chosen = false
    }
  },
  setUser(state, payload) {
    state.user = payload
  },
  setUserIsLoggedIn(state, payload) {
    // console.log(`Changing user auth state. ${payload}`)
    state.user = payload
  },
  setUserName(state, name) {
    state.user.name = name
  },
  setAuthState(state, authState) {
    if (!authState) {
      state.user.isAuthenticated = false
      state.user.uid = ``
      state.user.name = ``
    }
  },
  // visibility - boolean
  diceBoxHidden (state, visibility) {
    state.diceBoxHidden = visibility
  },
  gameOver (state) {
    state.gameOver = false
  },
  clearResultBox(state) {
    // clear all temp results in store
    for (const key in state.scoreArray) {
      if (!state.scoreArray[key].final) {
        state.scoreArray[key].value = ``
      }
    }
    // deselect all dice
    for (const key in state.diceArray) {
      if (state.diceArray[key].chosen) {
        state.diceArray[key].chosen = false
      }
    }
  },
  recordResultMk2 (state, id) {
    console.log(`Recording result.`)
    // console.log(`Id in mk2 is ${id}`)
    // state.gameInProgress = true // should be just ones
    // state.gameOver = false
    const combinationId = id
    const combinationIndexInArray = state.scoreArray.map((dice) => dice.id).indexOf(combinationId)
    // check if it is school result
    if (combinationIndexInArray <= 5 && !state.schoolCompleted && !state.newTurn) {
      if (!state.scoreArray[combinationIndexInArray].final
        && state.scoreArray[combinationIndexInArray].value !== ``) {
        // console.log(`Saving school result`)
        state.scoreArray[combinationIndexInArray].final = true
        state.schoolScoreTotal += state.scoreArray[combinationIndexInArray].value
        if (state.currentGameTurn === 6) {
          state.schoolCompleted = true
        }
        state.newTurn = true
      } else {
        console.log(`You clicked on an empty field.`)
        state.newTurn = false
        return false
      }
    } else if (state.schoolCompleted && combinationIndexInArray >= 5) {
      // record game result
      if (state.scoreArray[combinationIndexInArray].value !== `` &&
        state.scoreArray[combinationIndexInArray].displayValues.length < 3) {
        // console.log(`Saving game result.`)
        state.scoreArray[combinationIndexInArray].displayValues.push(state.scoreArray[combinationIndexInArray].value)
        state.gameTotal += state.scoreArray[combinationIndexInArray].value
        state.newTurn = true
      } else if (!state.newTurn &&
        state.scoreArray[combinationIndexInArray].value === `` &&
        !state.scoreArray[combinationIndexInArray].final &&
        state.schoolCompleted &&
        state.rollCount === 0 &&
        !state.zeroCheck) {
        // that means if there is no combination to record user can mark one empty
        // field per turn as cancelled
        // and it won't be used to calculate score
        if (state.scoreArray[combinationIndexInArray].displayValues.length < 3) {
          state.scoreArray[combinationIndexInArray].displayValues.push(0)
          // zero saved during this turn
          state.zeroCheck = true
        }
        state.newTurn = true
      }
      if (state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
        state.scoreArray[combinationIndexInArray].final = true
        // clear temporary display value
        state.scoreArray[combinationIndexInArray].value = ``
      }
    } else if (state.currentGameTurn === 32) {
      console.log(`Game over after last save.`)
    } else {
      console.log(`Not saving game result.`)
    }
  }
}

/*
    if (!state.schoolCompleted &&
        state.scoreArray[combinationIndexInArray].value !== `` &&
        !state.newTurn &&
        !state.scoreArray[combinationIndexInArray].final) {
      state.scoreArray[combinationIndexInArray].final = true
      state.schoolScoreTotal += state.scoreArray[combinationIndexInArray].value
      // set school completed to display game score on the board
      if (state.currentGameTurn === 6) {
        state.schoolCompleted = true
      }
      console.log(`Recording school result`)
    } else if (state.scoreArray[combinationIndexInArray].value !== `` &&
                state.scoreArray[combinationIndexInArray].displayValues &&
                state.scoreArray[combinationIndexInArray].displayValues.length < 3 &&
                !state.turnCompleted) {
      // state.turnCompleted = true // another turn completed in store?
      // push result into display values array
      state.scoreArray[combinationIndexInArray].displayValues.push(state.scoreArray[combinationIndexInArray].value)
      state.gameTotal += state.scoreArray[combinationIndexInArray].value
      if (state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
        state.scoreArray[combinationIndexInArray].final = true
        state.scoreArray[combinationIndexInArray].value = ``
      }
      // this.clearResultInStore()
      // this.clearResultBox()
      // this.turnCompleted = true
      // this.removeCurrentHighlight()
    } else if (!state.turnCompleted && // this really should be a single check
      state.scoreArray[combinationIndexInArray].value === `` &&
      !state.scoreArray[combinationIndexInArray].final &&
      state.schoolCompleted &&
      state.rollCount === 0 &&
      !state.zeroCheck) {
      // that means if there is no combination to record user can mark one empty
      // field per turn as cancelled
      // and it won't be used to calculate score
      if (state.scoreArray[combinationIndexInArray].displayValues.length < 3) {
        state.scoreArray[combinationIndexInArray].displayValues.push(0)
        // zero saved during this turn
        state.zeroCheck = true
        // this.clearResultBox()
        // this.turnCompleted = true
        // this.removeCurrentHighlight()
        // state.turnCompleted = true
        // this.mainButtonState.disabled = false
      }
      // check if combination is full (it has three results)
      if (state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
        state.scoreArray[combinationIndexInArray].final = true
      }
      state.turnCompleted = true
    } else {
      console.log(`Nothing to record in mutations!`)
      // state.turnCompleted = false
      return false
    } */
