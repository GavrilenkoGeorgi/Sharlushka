import config from './firebaseConfig.js'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.firestore()