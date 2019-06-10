import database from './database'
import 'firebase/firestore'
import 'firebase/auth'

const db = database.firestore()

export class firestoreConnection {
  // get user stats from db to display
  async getLeaderboardStats() {
    return await db.collection(`users`).orderBy(`hiScore`).get()
      .then((querySnapshot) => {
        let result = []
        querySnapshot.forEach((doc) => {
          const userData = {
            id: doc.id,
            userName: doc.data().name,
            hiScore: doc.data().hiScore,
            resultsArray: doc.data().resultsArray
          }
          result.push(userData)
        })
        return result
      }).catch(error => console.error(error))
  }
  // get user data from db
  async getUserStatsFromDb (uid) {
    return await db.collection(`users`).where(`uid`, `==`, uid)
      .get()
      .then(querySnapshot => {
        let userData
        querySnapshot.forEach(doc => {
          if (doc.data().uid === uid) {
            userData = {
              userName: doc.data().name,
              resultsArray:  doc.data().resultsArray,
              schoolResultsArray: doc.data().schoolResultsArray,
              diceValuesFavs: doc.data().diceValuesFavs,
              combinationsFavs: doc.data().combinationsFavs
            }
          }
        })
        return userData
      }).catch(error => {
        console.error(error)
      })
  }
  // sync stats for given user uid and data
  async syncStats(uid, data) {
    let colRef = `users`
    await db.collection(colRef).where(`uid`, `==`, uid).get()
      .then(querySnapshot => {
        let docToUpdateId
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          if (doc.data().uid === uid) {
            docToUpdateId = doc.id
          }
        })
        return docToUpdateId
      }).then((docToUpdateId) => {
        const docRef = db.collection(colRef).doc(docToUpdateId)
        docRef.update({
          resultsArray: data.resultsArray,
          schoolResultsArray: data.schoolResultsArray,
          diceValuesFavs: data.diceValuesFavs,
          combinationsFavs: data.combinationsFavs
        }).catch(error => {
          console.error(error)
        })
        return true
      })
  }
  // verify user email after user signed up
  verifyUserEmail() {
    const user = database.auth().currentUser
    user.sendEmailVerification().catch(error => console.error(error))
  }
  // sign up new user
  async signUp (email, password) {
    let data
    await database.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        data = response
      }).catch(error => {
        data = error
      })
    return data
  }
  // add new user data
  addNewUserData (newUserData) {
    const newUserRef = db.collection(`users`).doc()
    newUserRef.set(newUserData)
  }
}
