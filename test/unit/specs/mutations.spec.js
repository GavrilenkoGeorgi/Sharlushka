import mutations from '@/store/mutations'

test(`"setLastSave" sets "state.lastSave" to true`, () => {
  const state = {
    lastSave: false
  }
  mutations.setLastSave(state)
  expect(state.lastSave).toBeTruthy()
})