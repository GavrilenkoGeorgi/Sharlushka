export default {
  getUserData: state => state.userData,
  getUserStats: state => state.userStats,
  getCurrentUserName: state => state.userData.name,
  // to end the game we need this
  getCurrentGameState: state => {
    // is game in progress and it's not
    // first turn and first roll
    function isGameInProgress() {
      if (state.currentGameTurn === 1 && state.rollCount === 3) {
        return false
      } else return true
    }
    function calcTotalScore () {
      return state.schoolScoreTotal + state.gameTotal
    }
    const currentGameState = {
      schoolCompleted: state.schoolCompleted,
      currentGameTurn: state.currentGameTurn,
      currentRollCount: state.rollCount,
      newTurn: state.newTurn,
      gameOver: state.gameOver,
      gameInProgress: isGameInProgress(),
      isLastResultSaved: state.lastResultSaved,
      maxPossibleScore: state.maxPossibleScore,
      schoolScore: state.schoolScoreTotal,
      totalScore: calcTotalScore()
    }
    return currentGameState
  },
  // leaderboard and user stats
  getMaxPossibleScore: state => state.maxPossibleScore,
  // progressbar in game view
  progressBarState: state => {
    let fraction = 3
    let numbah = state.rollCount - fraction
    let percent = fraction * numbah * 11.075
    const result = Math.round(Math.abs(percent))
    return result ? result : 0
  },
  // help page uses this to set dice icons
  getDiceIds: state => {
    const diceIdsContainer = state.scoreArray.slice(0, state.diceArray.length + 1)
    let diceIds = []
    for (let id of diceIdsContainer) {
      diceIds.push(id.icon)
    }
    return diceIds
  },
  // dice box
  getDiceArray: state => state.diceArray,
  mainButtonIsRolling: state => {
    if (!state.newTurn
      && state.rollCount === 2
      || state.rollCount === 1) {
      return true
    } else {
      return false
    }
  },
  // game view
  getSchoolArray: state => {
    const schoolArray = state.scoreArray.slice(0, state.diceArray.length + 1)
    return schoolArray
  },
  // game view combinations display
  getCombinationArray: state => {
    // another one for export
    const combinationArray = state.scoreArray.slice(state.diceArray.length + 1, state.scoreArray.length)
    return combinationArray
  },
  // collect all combinations that
  // are set during current game
  // to save to user stats: localstorage
  // and firestore at the end of the game
  getCurrentNonZeroCombinations: state => {
    let arrayWithResults = state.scoreArray.slice(state.diceArray.length + 1, state.scoreArray.length)
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
