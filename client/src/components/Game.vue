<template>
<div>
    <div class="info"><span>School: {{$store.state.schoolScoreTotal}}</span>
    <span>Game score: {{$store.state.gameTotal}}</span></div>
    <div class="school" v-on:click="recordResult">
      <div class="combination">
        <p id="ones" class="diceIcon">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[0].value }}</p>
      </div>

      <div class="combination">
        <p id="twos" class="diceIcon">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[1].value }}</p>
      </div>

      <div class="combination">
        <p id="threes" class="diceIcon">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[2].value }}</p>
      </div>

      <div class="combination">
        <p id="fours" class="diceIcon">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[3].value }}</p>
      </div>

      <div class="combination">
        <p id="fives" class="diceIcon">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[4].value }}</p>
      </div>

      <div class="combination">
        <p id="sixes" class="diceIcon">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="100" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[5].value }}</p>
      </div>
    </div>

    <div class="gameTable">
    <div class="game" v-on:click="recordResult">

      <div class="combination">
        <p id="pair" class="label">Pair</p>
        <p class="result blink">{{ $store.state.scoreArray[6].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[6].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[6].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[6].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="twoPairs" class="label">Two Pairs</p>
        <p class="result blink">{{ $store.state.scoreArray[7].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[7].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[7].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[7].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="threeOfAKind" class="label">Three Of A Kind</p>
        <p class="result blink">{{ $store.state.scoreArray[8].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[8].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[8].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[8].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="full" class="label">Full</p>
        <p class="result blink">{{ $store.state.scoreArray[9].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[9].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[9].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[9].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="quads" class="label">Quads</p>
        <p class="result blink">{{ $store.state.scoreArray[10].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[10].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[10].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[10].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="poker" class="label">Poker</p>
        <p class="result blink">{{ $store.state.scoreArray[11].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[11].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[11].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[11].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="small" class="label">Small</p>
        <p class="result blink">{{ $store.state.scoreArray[12].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[12].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[12].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[12].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="large" class="label">Large</p>
        <p class="result blink">{{ $store.state.scoreArray[13].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[13].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[13].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[13].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="chance" class="label">Chance</p>
        <p class="result blink">{{ $store.state.scoreArray[14].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[14].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[14].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[14].displayValues[2] }}</p>
      </div>
    </div>
    </div>
    <div class="resultBox" v-on:click="deSelectDice"></div>

    <div class="diceBox" v-on:click="selectDice">
      <div class="dice" id="first">{{ $store.state.diceArray[0].value }}</div>
      <div class="dice" id="second">{{ $store.state.diceArray[1].value }}</div>
      <div class="dice" id="third">{{ $store.state.diceArray[2].value }}</div>
      <div class="dice" id="fourth">{{ $store.state.diceArray[3].value }}</div>
      <div class="dice" id="fifth">{{ $store.state.diceArray[4].value }}</div>
    </div>
    <div class="controls">
    <button class="gameButton" v-on:click="rollDice()" :disabled="$store.state.rollButtonDisabled == true" :class="{ disabledButton: $store.state.rollButtonDisabled == true}">Roll</button>
    <button class="gameButton" v-on:click="nextTurn(); clearResultBox()" :disabled="$store.state.nextTurnButtonDisabled == true" :class="{ disabledButton: $store.state.nextTurnButtonDisabled == true}">{{ $store.state.nextTurnButtonText}}</button>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '../store/store'

export default {
  name: 'Game',
  computed: mapGetters([
    'evenOrOdd',
    'onesScore',
    'twosScore'
  ]),
  methods: {
    ...mapActions([
      'rollDice',
      'nextTurn',
      'removeDice',
      'increment',
      'decrement',
      'incrementIfOdd',
      'incrementAsync'
    ]),
    selectDice (event) {
      if (event.target.className === 'dice') {
        let diceBox = document.querySelector('.diceBox')
        let resultBox = document.querySelector('.resultBox')
        diceBox.removeChild(event.target)
        resultBox.appendChild(event.target)

        for (let key in store.state.diceArray) {
          if (store.state.diceArray[key].id === event.target.id) {
            store.state.diceArray[key].chosen = true
            store.state.combinationArray.push(store.state.diceArray[key].value)
            store.commit('computeScore')
          }
        }
      }
    },
    deSelectDice (event) {
      if (event.target.className === 'dice') {
        let diceBox = document.querySelector('.diceBox')
        let resultBox = document.querySelector('.resultBox')
        resultBox.removeChild(event.target)
        diceBox.appendChild(event.target)

        for (let key in store.state.diceArray) {
          if (store.state.diceArray[key].id === event.target.id) {
            store.state.diceArray[key].chosen = false
            store.state.combinationArray.splice(store.state.combinationArray.findIndex(item => item === store.state.diceArray[key].value), 1)
            store.commit('computeScore')
          }
        }
      }
    },
    clearResultBox (event) {
      // console.log(`Clearing result box`)
      let diceBox = document.querySelector('.diceBox')
      let resultBox = document.querySelector('.resultBox')
      while (resultBox.childNodes.length) {
        diceBox.appendChild(resultBox.firstChild)
      }
      store.state.combinationArray = []
    },
    recordResult (event) {
      // console.log(event.target)
      // console.log(event.currentTarget)
      // store.state.turnCompleted = false
      let combinationId // get combination ID from click event
      if (event.currentTarget.className === 'school') {
        let combinationParagraphNode = event.target.closest('.diceIcon')
        if (combinationParagraphNode) {
          combinationId = combinationParagraphNode.id
        }
      }
      if (event.currentTarget.className === 'game') {
        let combinationParagraphNode = event.target.closest('.label')
        if (combinationParagraphNode) {
          combinationId = combinationParagraphNode.id
        }
      }
      if (combinationId && !store.state.turnCompleted) { // check if we get some combination ID from user click
        // console.log(`Combination ID is '${combinationId}'`)
        // if its not undefined get the index of ID in results array
        const combinationIndexInArray = store.state.scoreArray.map(dice => dice.id).indexOf(combinationId)
        if (store.state.scoreArray[combinationIndexInArray].value !== '' && !store.state.scoreArray[combinationIndexInArray].final) {
          // it is not empty and we can record some school result on click
          if (!store.state.schoolCompleted) { // record school result
            // set the final flag to true to record current value
            store.state.scoreArray[combinationIndexInArray].final = true
            store.state.schoolScoreTotal += store.state.scoreArray[combinationIndexInArray].value
            store.state.rollButtonDisabled = true
            store.state.nextTurnButtonDisabled = false
            store.state.turnCompleted = true
            let resultParagraph = document.getElementById(combinationId)
            resultParagraph.nextElementSibling.classList.remove('blink')
            resultParagraph.nextElementSibling.classList.add('saved')
            if (store.state.gameTurns === 6) {
              store.state.schoolCompleted = true
            }
          } else if (store.state.scoreArray[combinationIndexInArray].displayValues.length < 4 && !store.state.turnCompleted) {
            // we clicked on result field
            // user decided to save current selected result
            store.state.rollButtonDisabled = true
            store.state.nextTurnButtonDisabled = false
            store.state.turnCompleted = true
            // push result into display values array
            store.state.scoreArray[combinationIndexInArray].displayValues.push(store.state.scoreArray[combinationIndexInArray].value)
            // check if it is full to set 'final' flag
            store.state.gameTotal += store.state.scoreArray[combinationIndexInArray].value
            if (store.state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
              store.state.scoreArray[combinationIndexInArray].final = true
              store.state.scoreArray[combinationIndexInArray].value = ''
            }
          }
        /* } else if (store.state.gameTurns <= 6 && !store.state.schoolCompleted) {
          console.log(`Game over, you could even complete school`)
          store.state.gameCheck = false
          store.state.nextTurnButtonText = 'Game Over'
          store.state.nextTurnButtonDisabled = false */
        } else if (store.state.scoreArray[combinationIndexInArray].value === '' && store.state.schoolCompleted) {
          // if there is no combination to record user can mark one field per turn as cancelled
          // and it won't be used to calculate score
          store.state.nextTurnButtonDisabled = false
          store.state.rollButtonDisabled = true
          store.state.turnCompleted = true
          store.state.scoreArray[combinationIndexInArray].displayValues.push(0)
        } else {
          console.log(`Click harder! Combination ID is ${combinationId}.`)
        }
        if (store.state.gameTurns === 33 && store.state.turnCompleted) {
          alert(`Game over, your score is ${store.state.schoolScoreTotal + store.state.gameTotal}`)
        }
        /* ------------------ Check if school is completed ------------------
        if (store.state.gameTurns === 6 && !store.state.turnCompleted && store.state.rollCount === 0) {
          let schoolCompletionCheck = true
          for (let index = 0; index <= 6; index++) {
            // check if everything in school is set
            if (store.state.scoreArray[index].final === false) {
              console.log(`School results needed for ${store.state.scoreArray[index].id}`)
              schoolCompletionCheck = false
            }
          }
          if (schoolCompletionCheck) { // school completed
            store.state.schoolCompleted = true
          } else {
            store.state.schoolCompleted = false
            store.nextTurnButtonDisabled = true
            alert(`You need to complete school to play the game.`)
          }
        }
        ------------------ End of check if school is completed ------------------ */
      }
      // not needed?
      /*
      function getAllBlinkinSiblings (element, parent) {
        const children = [...parent.children]
        return children.filter(child => child.classList.contains('blink'))
      } */
      /*
      const diceIndexInArray = store.state.scoreArray.map(dice => dice.id).indexOf(combinationId)
      if (combinationId) {
        // console.log(`dice index in array to record ${diceIndexInArray}`)
        // check which result to record, school or game
        if (!store.state.schoolCompleted && store.state.scoreArray[diceIndexInArray].value !== '') { // record school result
          store.state.scoreArray[diceIndexInArray].final = true
          // set flag to change turn state to 'completed'
          store.state.turnCompleted = true
          let resultParagraph = document.getElementById(combinationId)
          console.log(resultParagraph)
          console.log(resultParagraph.nextElementSibling)
          resultParagraph.nextElementSibling.classList.remove('blink')
          resultParagraph.nextElementSibling.classList.add('saved')
          // event.target.nextElementSibling.classList.remove('blink')
          // event.target.nextElementSibling.classList.add('saved')
        } else if (store.state.scoreArray[diceIndexInArray].displayValues.length < 4 && !store.state.turnCompleted) {
          // we clicked on result field
          // user decided to save current selected result
          store.state.turnCompleted = true
          // push result into display values array
          store.state.scoreArray[diceIndexInArray].displayValues.push(store.state.scoreArray[diceIndexInArray].value)
          // check if it is full to set 'final' flag
          if (store.state.scoreArray[diceIndexInArray].displayValues.length === 3) {
            store.state.scoreArray[diceIndexInArray].final = true
            store.state.scoreArray[diceIndexInArray].value = ''
          }
        }
        // record total score value
        if (!store.state.schoolCompleted) {
          store.state.schoolScoreTotal += store.state.scoreArray[diceIndexInArray].value
        } else {
          store.state.gameTotal += store.state.scoreArray[diceIndexInArray].value
        }
        // lock roll button
        store.state.rollButtonDisabled = true
        if (store.state.gameTurns === 6) {
          // console.log(`School completion check`)
          // check if all results in school are set
          let schoolCompletedCheck = true
          for (let index = 0; index <= 5; index++) {
            // check all fields in school score part of the array
            if (!store.state.scoreArray[index].final) {
              // if any of them isn't set, school not completed
              schoolCompletedCheck = false
              // console.log(`School is not completed ${schoolCompletedCheck}`)
            }
          }
          // console.log(`School completed is ${schoolCompletedCheck}`)
          if (schoolCompletedCheck) {
            // set flags
            store.state.schoolCompleted = true
            store.state.gameLocked = false
            // increment game turn counter
            store.state.gameTurns++
            // unlock next turn button
            store.state.nextTurnButtonDisabled = false
          } else {
            alert(`School not completed`)
            store.state.nextTurnButtonDisabled = true
          }
        } else {
          // increment game turn counter
          store.state.gameTurns++
          // unlock next turn button
          store.state.nextTurnButtonDisabled = false
        }
        for (let key in store.state.scoreArray) { // there should be one storage array for school and game
          if (store.state.scoreArray[key].final !== true) { // to clear unconfirmed results properly
            store.state.scoreArray[key].value = ''
          }
        }
      } else if (event.target.nextElementSibling.textContent === '' && store.state.schoolCompleted) {
        // if there is no combination to record user can mark one field per turn as cancelled
        // and it won't be used to calculate score
        store.state.gameTurns++
        store.state.turnCompleted = true
        store.state.scoreArray[diceIndexInArray].displayValues.push(0)
      } else {
        // console.log(`You clicked on an empty field`)
        // console.log(event.target.id)
      }
      // console.log(`store.state.gameTurns ${store.state.gameTurns}`)
      if (store.state.gameTurns === 33) {
        store.state.nextTurnButtonDisabled = true
        console.log(`Game over`)
        console.log(`Your score is: ${store.state.schoolScoreTotal + store.state.gameTotal}`)
      }
      */
    }// end of record result method
  }, // end of methods
  data () {
    return {
      diceArray: store.state.diceArray.length
    }
  }
}
document.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM fully loaded and parsed')
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color-green: hsl(167, 100%, 30%);
$color-orange: hsl(36, 100%, 50%);
$color-gray: hsl(0, 0%, 85%);
$color-lightGray: hsl(0, 0%, 95%);
$color-darkGray: hsl(0, 0%, 50%);
$color-white: hsl(0, 0%, 100%);
.info {
  display: flex;
  justify-content: space-around;
  color: $color-orange;
  margin: .7em 0em 0em 0em;
}
.content {
  display: flex;
  flex-direction: column;
  border: 1px solid salmon;
  // align-items: center;
   //align-self: flex-start;
  // justify-content: space-around;
}
.school {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 1.8em;
  height: 4em;
}
.gameTable {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;
}
.game {
  display: flex;
  width: auto;
  flex-direction: column;
}
.school > .combination {
  width: 2em;
  // border: 1px solid black;
}
.game > .combination {
  display: flex;
  flex-direction: row;
  align-items: center;
  // border-bottom: 1px solid red;
  height: 2em;
}
.diceIcon, .result, .label {
  margin: 0em;
}
.diceIcon {
  font-size: 2.5em;
  color: $color-green;
}
.diceIcon:hover, .label:hover {
  color: $color-orange;
  cursor: pointer;
}
.label {
  color: $color-green;
  // font-size: 1em;
  // margin-bottom: .5em;
  border-right: 1px solid $color-gray;
  width: 8em;
  text-align: right;
  padding-right: .3em;
}
.result {
  padding: 0em .3em 0em .3em;
  margin: 0em 0em 0em .3em;
  color: $color-darkGray;
  width: 2em;
}
.schoolResult {
  margin: 0em;
  padding: 0em;
  color: $color-darkGray;
}
.saved {
  color: $color-orange;
  // background-color: $color-lightGray;
}
.unsaved:hover {
  background-color: $color-lightGray;
}
.currentPlayerName {
  color: $color-green;
}
.diceBox, .resultBox {
  display: flex;
  justify-content: center;
  margin-bottom: .5em;
  height: 2.5em;
}
.resultBox {
  border-bottom: 1px solid $color-gray;
  padding-bottom: .2em;
}
.dice {
  color: $color-white;
  line-height: 1.5em;
  background-color: $color-orange;
  font-size: 1.5em;
  width:1.5em;
  height:1.5em;
  margin-right: .3em;
  border-radius: .2em;
}
.dice:hover {
  cursor: pointer;
  box-shadow: 2px 2px 12px $color-darkGray;
}
.controls {
  display: flex;
  justify-content: space-around;
}
.gameButton {
  background: $color-green;
  border: none;
  // cursor: pointer;
  border-radius: .25em;
  font-size: 1.2em;
  color: $color-white;
  padding: .3em;
  width: 6em;
}
.gameButton:hover {
  box-shadow: 2px 2px 12px $color-darkGray;
}
.disabledButton {
  background: $color-gray;
  color: $color-green;
  cursor: auto;
}
.disabledButton:hover {
  box-shadow: 0px 0px 0px $color-darkGray;
}
.blink {
  animation: blinker 2.5s linear infinite;
}
@keyframes blinker {
  50% {
    opacity: 0;
  }
}
// style for icons
.diceSvg {
  fill: none;
  stroke: $color-green;
  stroke-width: 10px;
  fill-rule: evenodd;
}
.diceCircle {
  fill: $color-green;
}
svg:hover > .diceSvg{
  stroke: $color-orange;
}
svg:hover > .diceCircle{
  fill: $color-orange;
}
</style>
