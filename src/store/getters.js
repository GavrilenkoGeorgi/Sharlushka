export default {
  getCurrentGameState(state) {
    const currentGameState = {
      schoolCompleted: state.schoolCompleted,
      currentGameTurn: state.currentGameTurn,
      currentRollCount: state.rollCount,
      rollsCountForButton: state.rollCount,
      newTurn: state.newTurn
    }
    return currentGameState
  },
  progressBarState(state) {
    let fraction = 3
    let numbah = state.rollCount - fraction
    let percent = fraction * numbah * 11.075
    let result = Math.round(Math.abs(percent))
    return result ? result : 0
  },
  mainButtonIsRolling(state) {
    if (!state.newTurn
      && state.rollCount === 2
      || state.rollCount === 1) {
      return true
    } else {
      return false
    }
  },
  getDiceIds(state) {
    const diceIdsContainer = state.scoreArray.slice(0, state.diceArray.length + 1)
    let diceIds = []
    for (let id of diceIdsContainer) {
      diceIds.push(id.icon)
    }
    return diceIds
  },
  getDiceArray: (state) => state.diceArray,
  getSchoolArray(state) {
    const schoolArray = state.scoreArray.slice(0, state.diceArray.length + 1)
    return schoolArray
  },
  isGameEnded: (state) => state.gameOver,
  isNewTurn: (state) => state.newTurn,
  isLastResultSaved: (state) => state.user.lastResultSaved,
  getCombinationArray(state) {
    // another one for export
    const combinationArray = state.scoreArray.slice(state.diceArray.length + 1, state.scoreArray.length)
    return combinationArray
  },
  getMaxPossibleScore: (state) => state.maxPossibleScore,
  getUserAuthState: (state) => state.user.isAuthenticated,
  getUserData: (state) => state.user,
  getTotalScore(state) {
    return state.schoolScoreTotal + state.gameTotal
  },
  getSchoolScore(state) {
    return state.schoolScoreTotal
  },
  getDefaultUserName(state) {
    return state.defaultUserName
  },
  schoolFinished(state) {
    return state.schoolCompleted
  },
  error: state => state.error,
  // getDiceValuesFavs: state => state.user.diceValuesFavs
  getDiceValuesFavs(state) {
    return state.user.diceValuesFavs
  },
  getCurrentNonZeroCombinations(state) {
    // console.log(`Getting current non zero combinations.`)
    let arrayWithResults = state.scoreArray.slice(state.diceArray.length + 1, state.scoreArray.length)
    // console.log(`From this -->`)
    // console.log(arrayWithResults)
    let combinationsFavsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let index in arrayWithResults) {
      let currentSavedValues = arrayWithResults[index].displayValues
      for (let value of currentSavedValues) {
        if (value != 0) {
          combinationsFavsArray[index]++
        }
      }
    }
    // console.log(`Returning this -->`)
    // console.log(combinationsFavsArray)
    return combinationsFavsArray
  }
}
