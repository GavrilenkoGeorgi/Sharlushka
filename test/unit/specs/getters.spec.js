import getters from '@/store/getters'

test(`"progressBarState" returns 0 up to 100 percent`, () => {
  const state = {
    rollCount: 3
  }
  expect(getters.progressBarState(state)).toBeGreaterThanOrEqual(0)
  expect(getters.progressBarState(state)).toBeLessThan(100)
})

test(`"mainButtonIsRolling" returns true of false`, () => {
  const state = {
    newTurn: false,
    rollCount: 1
  }
  if (!state.newTurn && state.rollCount <=2 && state.rollCount != 0) {
    expect(getters.mainButtonIsRolling(state)).toBeTruthy()
  } else {
    expect(getters.mainButtonIsRolling(state)).toBeFalsy()
  }
})