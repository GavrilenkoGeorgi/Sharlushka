/*
/* @param {array} scores Array of integers
/* @return {integer}     Average user score
*/
export function computeAverageScore(scores) {
  const arrayToReduce = []
  const scoreSum = (accumulator, currentValue) => accumulator + currentValue
  for (const value of scores) {
    arrayToReduce.push(value)
  }
  if (arrayToReduce.length > 0) {
    return parseInt(arrayToReduce.reduce(scoreSum) / arrayToReduce.length)
  } else {
    return 0
  }
}
/*
/* @param {integer} averageScore     Average user score
/* @param {integer} maxPossibleScore Max possible score in game
/* @return {integer}                 User percent from max
/*                                   possible score
*/
export function computePercentFromMax(averageScore, maxPossibleScore) {
  let result = Math.floor(averageScore / maxPossibleScore * 100)
  if (result) {
    return result + `%`
  } else {
    return ``
  }
}
