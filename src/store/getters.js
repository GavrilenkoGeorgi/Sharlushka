export default {
  getCurrentGameState (state) {
    let currentGameState = {
      currentTurn: state.gameTurns,
      rollsCountForButton: state.rollCount,
      schoolCompleted: state.schoolCompleted,
      turnCompleted: state.turnCompleted,
      diceRolled: state.diceRolled
    }
    return currentGameState
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
