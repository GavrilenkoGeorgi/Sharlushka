import database from './database'
import 'firebase/firestore'
import 'firebase/auth'
const db = database.firestore()

export async function getUserStatsFromDb (uid) {
  let result = undefined
  await db.collection(`users`).where(`uid`, `==`, uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().uid === uid) {
          result = {
            userName: doc.data().name,
            resultsArray:  doc.data().resultsArray,
            schoolResultsArray: doc.data().schoolResultsArray,
            diceValuesFavs: doc.data().diceValuesFavs,
            combinationsFavs: doc.data().combinationsFavs
          }
        }
      })
    }).catch(error => {
      console.log(`Error getting documents: `, error)
    })
  return result
}

export async function getLeaderboardStats () {
  let result = []
  await db.collection(`users`).orderBy(`hiScore`).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const userData = {
          id: doc.id,
          userName: doc.data().name,
          hiScore: doc.data().hiScore,
          resultsArray: doc.data().resultsArray
        }
        result.push(userData)
      })
    }).catch(error => console.error(error))
  return result
}

export async function signUp (email, password) {
  let result = {}
  await database.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      result = response
    }).catch(error => console.error(error))
  return result
}

export async function addNewUserData (newUserData) {
  const newUserRef = db.collection(`users`).doc()
  newUserRef.set(newUserData)
}

export class connectToDb {
  constructor(uid, data) {
    this.uid = uid
    this.data = data
  }
  sync() {
    let colRef = `users`
    db.collection(colRef).where(`uid`, `==`, this.uid).get()
      .then(querySnapshot => {
        let docToUpdateId
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          if (doc.data().uid === this.uid) {
            docToUpdateId = doc.id
          }
        })
        return docToUpdateId
      }).then((docToUpdateId) => {
        const docRef = db.collection(colRef).doc(docToUpdateId)
        docRef.update({
          resultsArray: this.data.resultsArray,
          schoolResultsArray: this.data.schoolResultsArray,
          diceValuesFavs: this.data.diceValuesFavs,
          combinationsFavs: this.data.combinationsFavs
        }).catch(error => {
          console.log(`Error getting documents: `, error)
        })
      })
  }
  verifyUserEmail() {
    console.log(`Sending verification email`)
    const user = database.auth().currentUser
    user.sendEmailVerification().then(() => {
      console.log(`Email sent`)
    }).catch(error => console.error(error))
  }
}
