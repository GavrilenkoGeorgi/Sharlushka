import store from '../store/store'
import firebaseConfig from '../services/firebaseConfig.js'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  install: (Vue) => {
    const database = firebase.initializeApp(firebaseConfig)
    const auth = database.auth()
    Vue.prototype.$auth = {
      login: async (username, pass ) => {
        return await auth.signInWithEmailAndPassword(username, pass)
      },
      logout: async () => {
        await auth.signOut()
      }
    }
    auth.onAuthStateChanged(user => {
      if (user) {
        let userData = {
          isAuthenticated: true,
          uid: user.uid,
          email: user.email
        }
        store.commit(`setCurrentUser`, userData)
      } else {
        let userData = {
          isAuthenticated: false,
          uid: null,
          email: null
        }
        store.commit(`setCurrentUser`, userData)
      }
    })
  }
}