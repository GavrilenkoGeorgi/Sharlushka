// set up initial localStorage values
export function setUpLocalStorage () {
  console.log(`Inside async local storage setup!`)
  localStorage.setItem(`userName`, `Anonymous`)
  localStorage.setItem(`highestScore`, ``)
  localStorage.setItem(`lastScoresArray`, ``)
  localStorage.setItem(`schoolScores`, ``)
  localStorage.setItem(`diceValuesFavs`, `0,0,0,0,0,0`)
  localStorage.setItem(`combinationsFavs`, `0,0,0,0,0,0,0,0,0`)
}

// append some data to an existing value
export function appendToStorage (name, data) {
  let old = localStorage.getItem(name)
  if (old === null) old = ``
  localStorage.setItem(name, old + data)
}

// sum two values in array
export function sumTwoArrays (current, newOne) {
  let updated = current.map((num, idx) => {
    return num + newOne[idx]
  })
  return updated
}