import Vue from 'vue'

export default {
  computeScore(state) { // some code on prod
    if (!state.newTurn) {
      // empty array for calculating score looks like this:
      const arrayToAnalyse = [[], [], [], [], [], []]
      // dice are with values from 1 to 6, quantity: 5 pieces
      // for any game combination except chances and school we need at least a pair of dice
      // if array is larger than 0, we have at least one dice to calculate
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
            console.log(`Can't create array to analyse.`)
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
      }
      return true
    } else return false
  },
  saveResultInStore (state, id) {
    const combinationIndexToSave = state.scoreArray.map((dice) => dice.id).indexOf(id)
    // check if it is school result
    if (!state.schoolCompleted && !state.newTurn) {
      if (!state.scoreArray[combinationIndexToSave].final
        && state.scoreArray[combinationIndexToSave].value !== ``) {
        // console.log(`Saved school result.`)
        state.scoreArray[combinationIndexToSave].final = true
        state.schoolScoreTotal += state.scoreArray[combinationIndexToSave].value
        if (state.currentGameTurn === 6) {
          state.schoolCompleted = true
        }
        // new turn after school
        state.newTurn = true
      } else {
        console.log(`You clicked on an empty field
          and you can't save zero to school combination.`)
      }
    } else if (state.schoolCompleted && !state.newTurn) {
      // record game result
      if (state.scoreArray[combinationIndexToSave].value !== `` &&
        !state.scoreArray[combinationIndexToSave].final &&
        state.scoreArray[combinationIndexToSave].displayValues.length < 3) {
        // console.log(`Saved game result.`)
        state.scoreArray[combinationIndexToSave].displayValues.push(state.scoreArray[combinationIndexToSave].value)
        state.gameTotal += state.scoreArray[combinationIndexToSave].value
        // new turn after game
        state.newTurn = true
      }
      if (!state.newTurn &&
        state.scoreArray[combinationIndexToSave].value === `` &&
        !state.scoreArray[combinationIndexToSave].final &&
        state.rollCount === 0 &&
        !state.zeroCheck) {
        // that means if there is no combination to record user can mark one empty
        // field per turn as cancelled
        // and it won't be used to calculate score
        console.log(`Saved zero.`)
        if (state.scoreArray[combinationIndexToSave].displayValues.length < 3) {
          state.scoreArray[combinationIndexToSave].displayValues.push(0)
          // zero was saved during this turn
          state.zeroCheck = true
          // new turn after zero
          state.newTurn = true
        }
      } else {
        console.log(`You still have a chance to score.`)
      }
      // check if it is the last save
      if (state.currentGameTurn === state.maxGameTurns && state.newTurn) {
        console.log(`Last save!`)
        state.gameOver = true
        // state.lastSave = true
      }
      if (state.scoreArray[combinationIndexToSave].displayValues.length === 3) {
        // set it to final
        state.scoreArray[combinationIndexToSave].final = true
        // and clear current value so it won't stay onscreen (
        state.scoreArray[combinationIndexToSave].value = ``
      }
      return true
    } else {
      console.log(`No new turn.`)
      return false
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
    state.rollCount--
    state.newTurn = false
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    }
    // let counter = 0
    // let numbah = undefined
    for (const dice of state.diceArray) {
      // ----------- Every possible combination -----------
      /*
      if (counter < 1) {
        numbah = 2
      } else if (counter < 2) {
        numbah = 3
      } else if (counter < 3) {
        numbah = 4
      } else if (counter < 4 ) {
        numbah = 5
      } else if (counter < 5 ) {
        numbah = 6
      }
      if (!dice.chosen) {
        // set dice value
        dice.value = numbah
        // set dice icon svg image
        dice.currentIcon = state.scoreArray[numbah - 1].icon
      }
      counter++ */

      // ----------- Pseudo random numbers -----------
      if (!dice.chosen) {
        const numbah = getRandomInt(6) + 1 // shifting stuff
        // set dice value
        dice.value = numbah
        // set dice icon svg image
        dice.currentIcon = state.scoreArray[numbah - 1].icon
      }
      // ----------------------------------------------
    }
    // check if user was able to complete school
    // on last roll in school on the sixth turn we check if we can continue
    if (state.rollCount === 0 && state.currentGameTurn <= 6 && !state.schoolCompleted) {
      // check if we can record some result, if no -- game over
      state.gameOver = true // cause are checking if it is not
      const emptyDice = []
      for (let index = 0; index <= 5; index++) {
        // check if all results are set
        if (state.scoreArray[index].value === `` || !state.scoreArray[index].final) {
          // collecting indexes of those which are not set
          emptyDice.push(index + 1)
          // [3, 6]
        }
      }
      // for each value of this array
      // value is 1 or 2 .. or 6
      for (let value of emptyDice) {
        // key in array of dice in state
        // has current rolled dice value
        // for this roll and turn
        for (let key in state.diceArray) {
        // if it is equal to missing dice key
        // e.g. value of 6 for emptyDice.push(5 + 1)
        // all is OK and user was able to complete school
        //
        // cause of no zero saving in school
        // check if there are dice among
        // that which are not chosen
          if (state.diceArray[key].value === value) {
            // a lucky one!
            state.gameOver = false
            console.log(`All ok, one dice found with id ${state.diceArray[key].id}, with value ${state.diceArray[key].value}`)
          }
        }
      }
    }
  },
  nextTurn(state) {
    state.zeroCheck = false
    state.currentGameTurn++ // increment turn counter
    state.rollCount = 3 // set roll count to intial value of three
    for (const key in state.diceArray) {
      state.diceArray[key].value = `#`// reset all dice
      state.diceArray[key].chosen = false
    }
    state.combinationArray = []
  },
  // resetGameState(state) {
  restartGame(state) {
    console.log(`Final mutation, debug is`, state.debug)
    // hard reset
    // Object.assign(state, getDefaultState())
    let valuesToReset = {
      currentGameTurn: 1, // game turns counter
      rollCount: 3, // roll counter for the current turn
      maxGameTurns: 33, // 6 turns for school, 27 for the game
      newTurn: true, // 1st turn in game is new turn
      schoolCompleted: false, // check if school is completed
      gameOver: false,
      zeroCheck: false, // to check if zero was saving during turn
      schoolScoreTotal: 0, // total school score
      gameTotal: 0, // total game score
      combinationArray: [],
      lastResultSaved: false
    }
    Object.assign(state, valuesToReset)
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
  // set user name after login
  setUserName (state, name) {
    console.log(`Setting user name:`, name)
    /*
    let valuesToSet = {
      name: value
    } */
    // let userData = state.userData
    // Object.assign(userData, valuesToSet)
    Vue.set(state[`userData`], `name`, name)
  },
  setErrorMessage(state, error) {
    Vue.set(state, `error`, error)
  },
  // action
  setCurrentUser(state, userData) {
    Vue.set(state, `userData`, userData)
  },
  // used inside get userDataFromDB
  setUserStats (state, userStats) {
    Vue.set(state, `userStats`, userStats)
  },
  setLeaderboardStats (state, stats) {
    Vue.set(state, `leaderboardStats`, stats)
  },
  // action
  clearUserStats (state) {
    Vue.set(state, `userStats`, {})
  },
  setLastSave (state, value) {
    Vue.set(state, `lastResultSaved`, value)
  },
  resetGameOver (state, value) {
    state.gameOver = value
  },
  clearResultBox(state, id) {
    let getMaxValueQuantity = (array, max) => {
      const quantity = new Map([...new Set(array)]
        .map(x => [x, array.filter(y => y === x).length]))
      return quantity.get(max)
    }
    if (id) {
      // for calculating combinations
      // consisting from equal dice
      let gameCombinationValue = undefined
      let combination = state.scoreArray.find(combination => combination.id === id)

      if (combination.displayValues) {
        gameCombinationValue = combination.displayValues[combination.displayValues.length - 1]
      } else {
        gameCombinationValue = combination.value
      }

      if (gameCombinationValue) { // adding saved combination to stats
        // for school results
        let combinationIndex = state.scoreArray.findIndex(combination => combination.id === id)
        let schoolArray = state.scoreArray.slice(0, 6)

        // for game results
        let currentCombinationArray = state.combinationArray

        // for `two pairs` and `full` combinations
        let maxValue = Math.max(...currentCombinationArray)
        let secondValue = undefined
        let diceQuantity = state.diceArray.length
        let maxValueQuantity = getMaxValueQuantity(state.combinationArray, maxValue)

        // calculate two pairs combination values
        if (id == `twoPairs`) {
          // get current values
          maxValue = Math.max(...currentCombinationArray) // really need this?
          // console.dir(`Max value quantity ${maxValueQuantity}`)
          // console.log(maxValueQuantity)
          // make some changes
          if (maxValueQuantity == 1) {
            // console.log(`Two pairs. ${currentCombinationArray}`)
            let itemToRemove = currentCombinationArray.indexOf(maxValue)
            // remove current max value
            if (itemToRemove > -1) {
              currentCombinationArray.splice(itemToRemove, 1)
            }
            // so that we have new trimmed array of values
            // and new maxValue from it for two pairs combination
            maxValue = Math.max(...currentCombinationArray)
            // console.log(`new max value ${maxValue}`)
            secondValue = state.combinationArray.find(value => value !== maxValue)
          } else if (currentCombinationArray.length == 5) {
            // not `full`, but two pairs with one additional die
            // get other dice by clearing current max values
            // from array
            let twoPairsArray = []
            for (let value of currentCombinationArray) {
              if (value != maxValue) {
                twoPairsArray.push(value)
              }
            }
            // console.log(`Trimmed array --> ${twoPairsArray}`)
            if (twoPairsArray.length <= 3) {
              // first element of array
              secondValue = twoPairsArray[0]
            } else {
              let secondToMaxValue = Math.max(...twoPairsArray)
              secondValue = twoPairsArray.find(value => value !== secondToMaxValue)
            }
          } else {
            // genuine two pairs
            // max value is above so
            // just find the second value
            secondValue = state.combinationArray.find(value => value !== maxValue)
          }
        }

        switch (id) {
        // school results
        case `ones`:
        case `twos`:
        case `threes`:
        case `fours`:
        case `fives`:
        case `sixes`:
          for (let dice of currentCombinationArray) {
            for (let index in schoolArray) {
              if ((dice - 1) == index && index == combinationIndex) {
                // increment
                state.userStats.diceValuesFavs[index] += 1
              }
            }
          }
          break
        // game results
        case `pair`:
          state.userStats.diceValuesFavs[gameCombinationValue/2 - 1] += 2
          break
        case `threeOfAKind`:
          state.userStats.diceValuesFavs[gameCombinationValue/3 - 1] += 3
          break
        case `quads`:
          state.userStats.diceValuesFavs[gameCombinationValue/4 - 1] += 4
          break
          // 6 in poker is 30 + 80
        case `poker`:
          state.userStats.diceValuesFavs[(gameCombinationValue - 80) / 5 - 1] += 5
          break
        case `twoPairs`:
          state.userStats.diceValuesFavs[maxValue - 1] += 2
          state.userStats.diceValuesFavs[secondValue - 1] += 2
          break
        case `full`:
          secondValue = state.combinationArray.find(value => value !== maxValue)
          if (maxValueQuantity == 3) {
            state.userStats.diceValuesFavs[maxValue - 1] += maxValueQuantity
            state.userStats.diceValuesFavs[secondValue - 1] += 2
          } else {
            state.userStats.diceValuesFavs[maxValue - 1] += maxValueQuantity - 1
            state.userStats.diceValuesFavs[secondValue - 1] += 3
          }
          break
        case `small`:
          while (diceQuantity != 0) {
            // small combination
            // from value `five` to `one`
            state.userStats.diceValuesFavs[diceQuantity - 1] += 1
            diceQuantity--
          }
          break
        case `large`:
          while (diceQuantity != 0) {
            // large combination
            // from value `six` to `two`
            state.userStats.diceValuesFavs[diceQuantity] += 1
            diceQuantity--
          }
          break
        case `chance`:
          // incrementing by values
          for (let value of currentCombinationArray) {
            let index = value - 1
            state.userStats.diceValuesFavs[index] += 1
          }
          break
        }
      }
    }
    // clear all temp results in store
    for (let key in state.scoreArray) {
      if (!state.scoreArray[key].final) {
        state.scoreArray[key].value = ``
      }
    }
    // deselect all dice
    for (let key in state.diceArray) {
      if (state.diceArray[key].chosen) {
        state.diceArray[key].chosen = false
      }
    }
    // reset combination array
    state.combinationArray = []
  },
  setAnonymousDiceFavs (state, favs) {
    state.userStats.diceValuesFavs = favs
  },
  resetDiceValueFavs (state) {
    state.userStats.diceValuesFavs = [0, 0, 0, 0, 0, 0]
  }
}
