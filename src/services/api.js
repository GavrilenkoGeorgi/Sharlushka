import database from './database'
import 'firebase/firestore'
const db = database.firestore()

export async function getUserStatsFromDb (uid) {
  let result = undefined
  await db.collection(`users`).where(`uid`, `==`, uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().uid === uid) {
          result = {
            // should be `display name`
            userName: doc.data().name,
            // userUid: doc.data().uid,
            // highestScore: doc.data().hiScore,
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
        // console.log(docToUpdateId)
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
}
