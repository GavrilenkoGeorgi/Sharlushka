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
    })
  return result
}

export async function syncUserStatsWithDB (uid, data) {
  console.log(`Saving to firestore stats for user with ${uid} and`, data)
  return true
}
