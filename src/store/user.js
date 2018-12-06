// import firebase from 'firebase'
import firebase from 'firebase/app'

export default {
  state: {
    user: {
      isAuthenticated: false,
      uid: null
    }
  },
  mutations: {
    SET_USER (state, payload) {
      state.user.isAuthenticated = true
      state.user.uid = payload
    }
  },
  actions: {
    signUp ({commit}, payload) {
      commit('SET_PROCESSING', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          console.log(`User added uid is ${user.id}`)
          commit('SET_USER', user.id)
          commit('SET_PROCESSING', false)
        })
        .catch(error => {
          commit('SET_PROCESSING', false)
          commit('SET_ERROR', error.message)
        })
    }
  }
}
