export default {
  getUserData: state => state.userData,
  getUserStats: state => state.userStats,
  getCurrentGameState(state) {
    const currentGameState = {
      schoolCompleted: state.schoolCompleted,
      currentGameTurn: state.currentGameTurn,
      currentRollCount: state.rollCount,
      rollsCountForButton: state.rollCount,
      newTurn: state.newTurn,
      gameOver: state.gameOver
    }
    return currentGameState
  },
  getLeaderboardStats: state => state.leaderboardData,
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
  isGameInProgress (state) {
    if (state.currentGameTurn === 1 && state.rollCount === 3) {
      return false
    } else return true
  },
  getCombinationArray(state) {
    // another one for export
    const combinationArray = state.scoreArray.slice(state.diceArray.length + 1, state.scoreArray.length)
    return combinationArray
  },
  getMaxPossibleScore: (state) => state.maxPossibleScore,
  userData: state => state.userData,
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
    return combinationsFavsArray
  }
}
