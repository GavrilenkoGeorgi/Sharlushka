/*
/* @param {array} scores
/* @return {integer} Average user score
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
/*
/* @param {Array} values
/* @return {Array} Of percentages for chart
*/
export function convertValuesToPercent(values) {
  let percentages = []
  let highestValue = Math.max(...values)
  for (let value of values) {
    if (value === highestValue) {
      percentages.push((value/value) * 100)
      continue
    } else {
      percentages.push(Math.floor((value / highestValue) * 100))
    }
  }
  return percentages
}
/*
/* @param {Integer} quantityOfLabels
/*  Length of results array
/* @param {Integer} numberToDisplay
/*  Number of labels to display
/* @return {Array} Labels to display on chart
*/
export function prepareLabelsForChart(quantityOfLabels, numberToDisplay) {
  console.log(`Quantity of labels`, quantityOfLabels)
  console.log(`Number to display`, numberToDisplay)
  // this one is glitchy
  const resultsToDisplay = Math.abs(numberToDisplay)
  const lastLabelToDisplay = quantityOfLabels - resultsToDisplay
  const labelsArray = []
  if (quantityOfLabels >= resultsToDisplay) {
    while (quantityOfLabels !== lastLabelToDisplay) {
      labelsArray.push(quantityOfLabels)
      quantityOfLabels--
    }
    return labelsArray.reverse()
  } else {
    while (quantityOfLabels !== 0) {
      labelsArray.push(quantityOfLabels)
      quantityOfLabels--
      // console.log(`Scaaary..`)
    }
    return labelsArray.reverse()
  }
}
