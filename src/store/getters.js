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
      gameInProgress: state.gameInProgress
    }
    return currentGameState
  },
  getProcessing: (state) => state.processing,
  getError: (state) => state.error,
  getDiceIds(state) {
    const diceIdsContainer = state.scoreArray.slice(0, state.diceArray.length + 1)
    const diceIds = []
    for (const id of diceIdsContainer) {
      diceIds.push(id.icon)
      // console.log(`Inside get ids ${id.icon}`)
    }
    return diceIds
  },
  getSchoolArray(state) {
    const schoolArray = state.scoreArray.slice(0, state.diceArray.length + 1)
    return schoolArray
  },
  getCombinationArray(state) {
    // another one for export
    const combinationArray = state.scoreArray.slice(state.diceArray.length + 1, state.scoreArray.length)
    return combinationArray
  },
  getMaxPossibleScore: (state) => state.maxPossibleScore,
  getUserAuthState: (state) => state.user.isAuthenticated, // ?
  getDiceArray: (state) => state.diceArray,
  getTotalScore(state) {
    return state.schoolScoreTotal + state.gameTotal
  },
  getSchoolScore(state) {
    return state.schoolScoreTotal
  },
  getDefaultUserName(state) {
    return state.defaultUserName
  },
  getUserData: (state) => state.user,
  debugInfo(state) {
    // console.log(`Debug on`)
    for (const key in state.diceArray) {
      if (state.diceArray[key].chosen) {
        const info = {
          // name: state.diceArray[key].id,
          chosen: state.diceArray[key].chosen,
          firstDice: state.diceArray[0].chosen
          // value: state.diceArray[key].value
        }
        return info
      }
    }
  },
  chosenDiceArray(state) {
    return state.diceArray.filter((dice) => {
      return dice.chosen
    })
  },
  currentValuesInScoreArray(state) {
    return state.scoreArray.filter((score) => {
      return score.value !== `` && !score.final
    })
  }
}
