import database from './database'
import 'firebase/firestore'

const db = database.firestore()

export async function getUserStats (uid) {
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
            highestScore: doc.data().hiScore,
            resultsArray:  doc.data().resultsArray,
            schoolScores: doc.data().schoolResultsArray,
            diceValuesFavs: doc.data().diceValuesFavs
          }
        }
      })
    })
  return result
}

