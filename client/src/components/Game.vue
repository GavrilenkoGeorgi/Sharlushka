<template>
<div>
    <div class="info"><span>School: {{$store.state.schoolScoreTotal}}</span>
    <span>Game score: {{$store.state.gameTotal}}</span></div>
    <div class="school" v-on:click="recordResult">
      <div class="combination">
        <p id="ones" class="diceIcon">&#9856;</p>
        <p class="result blink">{{ $store.state.scoreArray[0].value }}</p>
      </div>
      <div class="combination">
        <p id="twos" class="diceIcon">&#9857;</p>
        <p class="result blink">{{ $store.state.scoreArray[1].value }}</p>
      </div>
      <div class="combination">
        <p id="threes" class="diceIcon">&#9858;</p>
        <p class="result blink">{{ $store.state.scoreArray[2].value }}</p>
      </div>
      <div class="combination">
        <p id="fours" class="diceIcon">&#9859;</p>
        <p class="result blink">{{ $store.state.scoreArray[3].value }}</p>
      </div>
      <div class="combination">
        <p id="fives" class="diceIcon">&#9860;</p>
        <p class="result blink">{{ $store.state.scoreArray[4].value }}</p>
      </div>
      <div class="combination">
        <p id="sixes" class="diceIcon">&#9861;</p>
        <p class="result blink">{{ $store.state.scoreArray[5].value }}</p>
      </div>
    </div>

    <div class="gameTable">
    <div class="game" v-on:click="recordResult">

      <div class="combination">
        <p id="pair" class="label">Pair</p>
        <p class="result blink">{{ $store.state.scoreArray[6].value }}</p>
        <!--p class="result blink">{{ $store.state.scoreArray[6].value }}</p>
        <p class="result blink">{{ $store.state.scoreArray[6].value }}</p-->
      </div>

      <div class="combination">
        <p id="twoPairs" class="label">Two Pairs</p>
        <p class="result blink">{{ $store.state.scoreArray[7].value }}</p>
        <!--p class="result blink">{{ $store.state.scoreArray[7].value }}</p>
        <p class="result blink">{{ $store.state.scoreArray[7].value }}</p-->
      </div>

      <div class="combination">
        <p id="threeOfAKind" class="label">Three Of A Kind</p>
        <p class="result blink">{{ $store.state.scoreArray[8].value }}</p>
      </div>

      <div class="combination">
        <p id="full" class="label">Full</p>
        <p class="result blink">{{ $store.state.scoreArray[9].value }}</p>
      </div>

      <div class="combination">
        <p id="quads" class="label">Quads</p>
        <p class="result blink">{{ $store.state.scoreArray[10].value }}</p>
      </div>

      <div class="combination">
        <p id="poker" class="label">Poker</p>
        <p class="result blink">{{ $store.state.scoreArray[11].value }}</p>
      </div>

      <div class="combination">
        <p id="small" class="label">Small</p>
        <p class="result blink">{{ $store.state.scoreArray[12].value }}</p>
      </div>

      <div class="combination">
        <p id="large" class="label">Large</p>
        <p class="result blink">{{ $store.state.scoreArray[13].value }}</p>
      </div>

      <div class="combination">
        <p id="firstChance" class="label">First Chance</p>
        <p class="result blink">{{ $store.state.scoreArray[14].value }}</p>
      </div>

      <div class="combination">
        <p id="secondChance" class="label">Second Chance</p>
        <p class="result blink">{{ $store.state.scoreArray[15].value }}</p>
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
    <button class="gameButton" v-on:click="nextTurn(); clearResultBox()" :disabled="$store.state.nextTurnButtonDisabled == true" :class="{ disabledButton: $store.state.nextTurnButtonDisabled == true}">Next turn</button>
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
      function getAllBlinkinSiblings (element, parent) {
        const children = [...parent.children]
        return children.filter(child => child.classList.contains('blink'))
      }

      if ((event.target.className === 'diceIcon' || event.target.className === 'label') && event.target.nextElementSibling.textContent !== '') {
        const diceIndexInArray = store.state.scoreArray.map(dice => dice.id).indexOf(event.target.id)
        console.log(`dice index in array to record ${diceIndexInArray}`)
        if (store.state.scoreArray[diceIndexInArray].value.length < 4 && !store.state.turnCompleted) {
          // we clicked on result field
          // user decided to save current selected result
          let children = getAllBlinkinSiblings(event.target, event.target.parentElement)
          console.log(children[0])
          children[0].classList.remove('blink')
          // change color of a saved result
          children[0].classList.add('saved')
          // event.target.nextElementSibling.classList.add('saved')
          // set flag to change turn state to 'completed'
          store.state.turnCompleted = true
          /* if (store.state.scoreArray[diceIndexInArray].final !== true) { */
          store.state.scoreArray[diceIndexInArray].final = true
          // record total score value
          if (!store.state.schoolCompleted) {
            store.state.schoolScoreTotal += store.state.scoreArray[diceIndexInArray].value
          } else {
            store.state.gameTotal += store.state.scoreArray[diceIndexInArray].value
          }
          // lock roll button
          store.state.rollButtonDisabled = true
          console.log(`store.state.gameTurns ${store.state.gameTurns}`)

          if (store.state.gameTurns === 6) {
            console.log(`School completion check`)
            // check if all results in school are set
            let schoolCompletedCheck = true
            for (let index = 0; index <= 5; index++) {
              // check all fields in school score part of the array
              if (!store.state.scoreArray[index].final) {
                // if any of them isn't set, school not completed
                schoolCompletedCheck = false
                console.log(`School is not completed ${schoolCompletedCheck}`)
              }
            }
            console.log(`School completed is ${schoolCompletedCheck}`)
            if (schoolCompletedCheck) {
              // set flags
              store.state.schoolCompleted = true
              store.state.gameLocked = false
              // increment game turn counter
              store.state.gameTurns++
              // unlock next turn button
              store.state.nextTurnButtonDisabled = false
            } else {
              console.log(`School not completed`)
              store.state.nextTurnButtonDisabled = true
            }
          } else {
            // increment game turn counter
            store.state.gameTurns++
            // unlock next turn button
            store.state.nextTurnButtonDisabled = false
          }
        } else {
          console.log(`You clicked on an empty field`)
        }
      }
    }// end of compute score method
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
  // font-size: 1.4em;
  padding: 0em .3em 0em .3em;
  margin: 0em 0em 0em .3em;
  color: $color-darkGray;
  // background-color: yellow;
  width: 2em;
  // height: 100%;
}
// .result:hover {
// background-color: $color-lightGray;
// }
.saved {
  color: $color-orange;
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
</style>
