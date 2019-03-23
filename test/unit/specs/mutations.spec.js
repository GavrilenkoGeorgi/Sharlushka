import mutations from '@/store/mutations'
import defaultState from '@/store/defaultState'

const state = defaultState()

test(`"setLastSave" sets "user.lastResultSaved" to boolean`, () => {
  mutations.setLastSave(state, true)
  expect(typeof state.user.lastResultSaved).toBe(`boolean`)
})

test(`"computeScore" returns boolean after score calculation`, () => {
  let result = mutations.computeScore(state)
  expect(typeof result).toBe(`boolean`)
})

test(`"saveResultInStore" saves result with given id`, () => {
  let resultId = `poker`
  let result = mutations.saveResultInStore(state, resultId)
  expect(typeof result).toBe(`boolean`)
})

test(`"rollDice" rolls dice`, () => {
  let currentRollCount = state.rollCount
  let newTurnState = true
  mutations.rollDice(state)
  expect(state.rollCount).toBeLessThan(currentRollCount)
  expect(state.newTurn).not.toBe(newTurnState)
  for (let dice of state.diceArray) {
    expect(dice.value).toBeLessThanOrEqual(6)
    expect(dice.value).toBeGreaterThanOrEqual(1)
  }
})

test(`"nextTurn" initiates next turn`, () => {
  let previousTurn = state.currentGameTurn
  mutations.nextTurn(state)
  expect(state.zeroCheck).toBeFalsy()
  expect(state.currentGameTurn).toBeGreaterThan(previousTurn)
  for (let dice of state.diceArray) {
    expect(dice.value).toBe(`#`)
    expect(dice.chosen).toBeFalsy()
  }
  expect(state.combinationArray).toEqual([])
})

test(`"resetState" correctly resets chosen state values to defaults`, () => {
  mutations.resetState(state)
  // you should reset whole game settings
  // object in store which apparently doesn`t exist
  expect(state.currentGameTurn).toBe(1)
  expect(state.rollCount).toBe(3)
  expect(state.maxGameTurns).toBe(33)
  expect(state.newTurn).toBeTruthy()
  expect(state.schoolCompleted).toBeFalsy()
  expect(state.gameOver).toBeFalsy()
  expect(state.zeroCheck).toBeFalsy()
  expect(state.schoolScoreTotal).toBe(0)
  expect(state.gameTotal).toBe(0)
  expect(state.combinationArray).toEqual([])
  for (let result of state.scoreArray) {
    expect(result.value).toBe(``)
    expect(result.final).toBeFalsy()
  }
  for (let dice of state.diceArray) {
    expect(dice.value).toBe(`#`)
    expect(dice.chosen).toBeFalsy()
  }
  expect(state.user.lastResultSaved).toBeFalsy()
})

test(`"setUserIsLoggedIn" sets user login state to boolean`, () => {
  let currentState = state.user.isAuthenticated
  // toggle it
  mutations.setUserIsLoggedIn(state, !currentState)
  expect(typeof state.user.isAuthenticated).toBe(`boolean`)
  expect(state.user.isAuthenticated).toEqual(!currentState)
})

test(`"setLastSave" sets user last save to boolean`, () => {
  let currentState = state.user.lastResultSaved
  // toggle it
  mutations.setLastSave(state, !currentState)
  expect(typeof state.user.isAuthenticated).toBe(`boolean`)
  expect(state.user.isAuthenticated).toEqual(!currentState)
})

test(`"resetGameOver" sets user last save to boolean`, () => {
  let currentState = state.gameOver
  // toggle it
  mutations.resetGameOver(state, !currentState)
  expect(typeof state.user.isAuthenticated).toBe(`boolean`)
  expect(state.user.isAuthenticated).toEqual(!currentState)
})

test(`"clearResultBox" clears result box`, () => {
  mutations.clearResultBox(state)
  // clear all temp results in store
  for (let combination of state.scoreArray) {
    if (!combination.final) {
      expect(combination.value).toBe(``)
    }
    // deselect all dice
    for (let dice of state.diceArray) {
      expect(dice.chosen).toBeFalsy()
    }
  }
})

test(`"setErrorMessage" sets error message`, () => {
  let error = {
    dialogIsVisible: true,
    dialogMessage: `Some error!`
  }
  mutations.setErrorMessage(state, error)
  expect(state.error.dialogIsVisible).toBeTruthy()
  expect(typeof state.error.dialogMessage).toBe(`string`)
})
