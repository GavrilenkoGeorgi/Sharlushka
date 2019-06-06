// set up initial localStorage values
export function setLocalStorageDefaults () {
  console.log(`Inside async local storage setup!`)
  localStorage.setItem(`userName`, `Anonymous`)
  localStorage.setItem(`lastScoresArray`, ``)
  localStorage.setItem(`schoolScores`, ``)
  localStorage.setItem(`diceValuesFavs`, `0,0,0,0,0,0`)
  localStorage.setItem(`combinationsFavs`, `0,0,0,0,0,0,0,0,0`)
}

// set user stats to local storage upon loggin in
export function setDataFromDbToLs (data) {
  localStorage.setItem(`userName`, data.userName)
  localStorage.setItem(`lastScoresArray`, data.resultsArray)
  localStorage.setItem(`schoolScores`, data.schoolResultsArray)
  localStorage.setItem(`diceValuesFavs`, data.diceValuesFavs)
  localStorage.setItem(`combinationsFavs`, data.combinationsFavs)
}

// append some data to an existing value
export function appendToStorage (name, data) {
  let old = localStorage.getItem(name)
  if (old === ``) {
    localStorage.setItem(name, old + data)
  } else {
    data = `,` + data
    localStorage.setItem(name, old + data)
  }
}

// gather data from localStorage
// to save to firestore
export async function gatherDataFromLocalStorage () {
  const dataToSave = {
    combinationsFavs: localStorage.getItem(`combinationsFavs`),
    diceValuesFavs: localStorage.getItem(`diceValuesFavs`).split(`,`).map(Number),
    resultsArray: localStorage.getItem(`lastScoresArray`),
    schoolResultsArray: localStorage.getItem(`schoolScores`)
  }
  return dataToSave
}

// sum values in two arrays
// not exactly local storage related
export function sumTwoArrays (current, newOne) {
  let updated = current.map((num, idx) => {
    return num + newOne[idx]
  })
  return updated
}
