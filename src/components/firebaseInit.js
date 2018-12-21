import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
firebase.firestore().settings({timestampsInSnapshots: true})
export default firebase.firestore()
