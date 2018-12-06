import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
/*
const settings = {
  timestampsInSnapshots: true
}
*/
// firebase.settings(settings)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
/*
const firebaseApp = firebase.initializeApp(firebaseConfig)
*/
firebase.firestore().settings({timestampsInSnapshots: true})

export default firebase.firestore()
