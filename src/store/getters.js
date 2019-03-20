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
  isLastSave: (state) => state.lastSave,
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
  }
  // cantFinishSchool: (state) => state.wasNotAbleToCompleteSchool ? true : false
}

