export default {
  getCurrentGameState(state) {
    const currentGameState = {
      currentTurn: state.currentGameTurn, // wtf
      rollsCountForButton: state.rollCount,
      schoolCompleted: state.schoolCompleted,
      currentGameTurn: state.currentGameTurn, // this
      currentRollCount: state.rollCount,
      turnCompleted: state.turnCompleted,
      gameEnded: state.gameEnded,
      diceRollInProgress: state.diceRollInProgress,
      gameCheck: state.gameCheck,
      gameInProgress: state.gameInProgress,
      newTurn: state.newTurn
    }
    return currentGameState
  },
  progressBarState(state) {
    let fraction = 3
    let numbah = state.rollCount - fraction
    let percent = fraction * numbah * 11.075
    return Math.round(Math.abs(percent))
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
  isNewTurn (state) {
    return state.newTurn ? true : false
  },
  isLastRollInGame (state) {
    return state.currentGameTurn === state.maxGameTurns ? true : false
  },
  getCombinationArray(state) {
    // another one for export
    const combinationArray = state.scoreArray.slice(state.diceArray.length + 1, state.scoreArray.length)
    return combinationArray
  },
  getMaxPossibleScore: (state) => state.maxPossibleScore,
  getUserAuthState: (state) => state.user.isAuthenticated,
  getUserData: (state) => state.user, // ?
  getTotalScore(state) {
    return state.schoolScoreTotal + state.gameTotal
  },
  getSchoolScore(state) {
    return state.schoolScoreTotal
  },
  getDefaultUserName(state) {
    return state.defaultUserName
  },
  isDiceBoxHidden: (state) => state.newTurn
}

