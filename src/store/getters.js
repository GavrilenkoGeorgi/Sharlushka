export default {
  getCurrentGameState (state) {
    let currentGameState = {
      currentTurn: state.currentGameTurn,
      rollsCountForButton: state.rollCount,
      schoolCompleted: state.schoolCompleted,
      currentGameTurn: state.currentGameTurn,
      currentRollCount: state.rollCount,
      turnCompleted: state.turnCompleted,
      gameEnded: state.gameEnded,
      diceRolled: state.diceRolled,
      gameCheck: state.gameCheck
    }
    return currentGameState
  },
  getDiceIds (state) {
    let diceIdsContainer = state.scoreArray.slice(0, state.diceArray.length + 1)
    let diceIds = []
    for (let id of diceIdsContainer) {
      diceIds.push(id.icon)
      // console.log(`Inside get ids ${id.icon}`)
    }
    return diceIds
  },
  getSchoolArray (state) {
    let schoolArray = state.scoreArray.slice(0, state.diceArray.length + 1)
    return schoolArray
  },
  getCombinationArray (state) {
    // another one for export
    let combinationArray = state.scoreArray.slice(state.diceArray.length + 1, state.scoreArray.length)
    return combinationArray
  },
  getDiceArray (state) {
    return state.diceArray
  },
  getTotalScore (state) {
    return state.schoolScoreTotal + state.gameTotal
  },
  getDefaultUserName (state) {
    return state.defaultUserName
  },
  debugInfo (state) {
    // console.log(`Debug on`)
    for (let key in state.diceArray) {
      if (state.diceArray[key].chosen) {
        let info = {
          // name: state.diceArray[key].id,
          chosen: state.diceArray[key].chosen,
          firstDice: state.diceArray[0].chosen
          // value: state.diceArray[key].value
        }
        return info
      }
    }
  },
  chosenDiceArray (state) {
    return state.diceArray.filter(dice => {
      return dice.chosen
    })
  },
  currentValuesInScoreArray (state) {
    return state.scoreArray.filter(score => {
      return score.value !== '' && !score.final
    })
  }
}
