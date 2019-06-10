import store from '../store/store'
import config from '../services/firebaseConfig.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import { setDataFromDbToLs } from './localStorageHelper'
import { firestoreConnection } from '../services/api'

export default {
  install: (Vue) => {
    const database = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
    const auth = database.auth()
    Vue.prototype.$auth = {
      login: async (username, pass ) => {
        try {
          return await auth.signInWithEmailAndPassword(username, pass)
        } catch (error) {
          store.commit(`setErrorMessage`, error.message)
        }
      },
      logout: async () => {
        try {
          return await auth.signOut()
        } catch (error) {
          store.commit(`setErrorMessage`, error.message)
        }
      }
    }
    auth.onAuthStateChanged(user => {
      let userData
      if (user) {
        new firestoreConnection()
          .getUserStatsFromDb(user.uid)
          .then((stats) => {
            setDataFromDbToLs(stats)
          }).catch(error => console.log(error))
        userData = {
          isAuthenticated: true,
          uid: user.uid,
          email: user.email
        }
      } else {
        userData = {
          isAuthenticated: false,
          uid: null,
          email: null
        }
      }
      store.commit(`setCurrentUser`, userData)
    })
  }
}