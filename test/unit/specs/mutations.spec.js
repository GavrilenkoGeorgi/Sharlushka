import mutations from '@/store/mutations'

test(`"setLastSave" sets "state.lastSave" to true`, () => {
  const state = {
    lastSave: false
  }
  mutations.setLastSave(state)
  expect(state.lastSave).toBeTruthy()
})

test(`"setErrorMessage" sets "state.error.dialogIsVisible"
  to true and "state.error.dialogMessage"
  to typeof 'string'`, () => {
  const state = {
    error: {
      dialogIsVisible: false,
      dialogMessage: undefined
    }
  }
  let error = {
    dialogIsVisible: true,
    dialogMessage: `Some error!`
  }
  mutations.setErrorMessage(state, error)
  expect(state.error.dialogIsVisible).toBeTruthy()
  expect(typeof state.error.dialogMessage).toBe(`string`)
})
