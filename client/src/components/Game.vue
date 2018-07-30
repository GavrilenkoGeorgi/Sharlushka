<template>
<div>
  <!--ul class="results" v-on:click="recordResult">
    <li>
      <span class="combinationName">&#9856;</span>
      <span id="ones" class="result">{{ $store.state.schoolScore[0].value }}</span>
    </li>
    <li>
      <span class="combinationName">&#9857;</span>
      <span id="twos" class="result">{{ $store.state.schoolScore[1].value }}</span>
    </li>
    <li>
      <span class="combinationName">&#9858;</span>
      <span id="threes" class="result">{{ $store.state.schoolScore[2].value }}</span>
    </li>
  </ul-->
  <div class="info"><span>School: {{$store.state.schoolScoreTotal}}</span> <span>Total score: {{$store.state.gameTotal}}</span></div>
  <div class ="school" v-on:click="recordResult">
    <div id="ones" class="combinationName">&#9856;</div>
    <div id="twos" class="combinationName">&#9857;</div>
    <div id="threes" class="combinationName">&#9858;</div>
    <div id="fours" class="combinationName">&#9859;</div>
    <div id="fives" class="combinationName">&#9860;</div>
    <div id="sixes" class="combinationName">&#9861;</div>

    <div class="combinationResult">{{ $store.state.schoolScore[0].value }}</div>
    <div class="combinationResult">{{ $store.state.schoolScore[1].value }}</div>
    <div class="combinationResult">{{ $store.state.schoolScore[2].value }}</div>
    <div class="combinationResult">{{ $store.state.schoolScore[3].value }}</div>
    <div class="combinationResult">{{ $store.state.schoolScore[4].value }}</div>
    <div class="combinationResult">{{ $store.state.schoolScore[5].value }}</div>
  </div>
  <!--div class="schoolResult">School total: {{ $store.state.schoolScoreTotal }}</div-->

  <div class ="game">
    <div class="gameCombination">Pair</div>
    <div class="gameCombination">Two pairs</div>
    <div class="combinationResult">{{ $store.state.gameScore[0].value }}</div>
    <div class="combinationResult">{{ $store.state.gameScore[1].value }}</div>
    <div class="gameCombination">Three of a kind</div>
    <div class="gameCombination">Full</div>
    <div class="combinationResult">{{ $store.state.gameScore[2].value }}</div>
    <div class="combinationResult">{{ $store.state.gameScore[3].value }}</div>
    <div class="gameCombination">Quads</div>
    <div class="gameCombination">Poker</div>
    <div class="combinationResult">{{ $store.state.gameScore[4].value }}</div>
    <div class="combinationResult">{{ $store.state.gameScore[5].value }}</div>
    <div class="gameCombination">Small</div>
    <div class="gameCombination">Large</div>
    <div class="combinationResult">{{ $store.state.gameScore[6].value }}</div>
    <div class="combinationResult">{{ $store.state.gameScore[7].value }}</div>
    <div class="gameCombination">First Chance</div>
    <div class="gameCombination">Second Chance</div>
    <div class="combinationResult">{{ $store.state.gameScore[8].value }}</div>
    <div class="combinationResult">{{ $store.state.gameScore[9].value }}</div>
  </div>
  <!--table class="results" v-on:click="recordResult" style="width:100%">
  <tr>
    <th></th>
    <th class="currentPlayerName">Anonymous</th>
  </tr>
  <tr>
    <td class="combinationName unicodeDice">&#9856;</td>
    <td id="ones" class="result">{{ $store.state.schoolScore[0].value }}</td>
  </tr>
  <tr>
    <td class="combinationName unicodeDice">&#9857;</td>
    <td id="twos" class="result">{{ $store.state.schoolScore[1].value }}</td>
  </tr>
  <tr>
    <td class="combinationName unicodeDice">&#9858;</td>
    <td id="threes" class="result">{{ $store.state.schoolScore[2].value }}</td>
  </tr>
  <tr>
    <td class="combinationName unicodeDice">&#9859;</td>
    <td id="fours" class="result">{{ $store.state.schoolScore[3].value }}</td>
  </tr>
  <tr>
    <td class="combinationName unicodeDice">&#9860;</td>
    <td id="fives" class="result">{{ $store.state.schoolScore[4].value }}</td>
  </tr>
  <tr>
    <td class="combinationName unicodeDice">&#9861;</td>
    <td id="sixes" class="result">{{ $store.state.schoolScore[5].value }}</td>
  </tr>
  <tr>
    <td class="schoolResult">School total:</td>
    <td class="result">{{ $store.state.schoolScoreTotal }}</td>
  </tr>
  <tr>
    <td class="combinationName">Пара</td>
    <td class="result"></td>
  </tr>
  <tr>
    <td class="combinationName">Две пары</td>
    <td class="result"></td>
  </tr>
  <tr>
    <td class="combinationName">Тройник</td>
    <td class="result"></td>
  </tr>
  <tr>
    <td class="combinationName">Фул</td>
    <td class="result"></td>
  </tr>
  <tr>
    <td class="combinationName">Каре</td>
    <td class="result"></td>
  </tr>
  <tr>
    <td class="combinationName">Покер</td>
    <td class="result"></td>
  </tr>
  <tr>
    <td class="combinationName">Малый</td>
    <td class="result"></td>
  </tr>
  <tr>
    <td class="combinationName">Большой</td>
    <td class="result"></td>
  </tr>
  <tr>
    <td class="combinationName">Первый шанс</td>
    <td class="result"></td>
  </tr>
  <tr>
    <td class="combinationName">Второй шанс</td>
    <td class="result"></td>
  </tr>
  <tr>
    <td class="schoolResult">Game total:</td>
    <td class="result">{{ $store.state.gameTotal}}</td>
  </tr>
</table-->
  <!--div class="score"> combination array is: {{$store.state.combinationArray}}</div-->
  <div class="resultBox" v-on:click="deSelectDice">
    <!--div class="dice" v-for="dice in rolledDice" :key="dice">{{ $store.state.rolledDice[dice-1] }}</div-->
  </div>

  <div class="diceBox" v-on:click="selectDice">
    <div class="dice" id="first">{{ $store.state.diceArray[0].value }}</div>
    <div class="dice" id="second">{{ $store.state.diceArray[1].value }}</div>
    <div class="dice" id="third">{{ $store.state.diceArray[2].value }}</div>
    <div class="dice" id="fourth">{{ $store.state.diceArray[3].value }}</div>
    <div class="dice" id="fifth">{{ $store.state.diceArray[4].value }}</div>
  </div>
  <!-- button v-on:click="">Do things</button -->
  <!--p>{{evenOrOdd}}</p-->
<!-- div class="diceBox" v-on:click="doThings">
    <div class="dice" v-for="dice in diceArray" :key="dice">{{ $store.state.diceArray[dice-1] }}</div>
</div -->
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
      const diceIndex = store.state.schoolScore.map(dice => dice.id).indexOf(event.target.id)
      if (event.target.className === 'combinationName' && store.state.schoolScore[diceIndex].value !== '') {
        // we clicked on result field
        // find the index of the dice to record
        // const diceIndex = store.state.schoolScore.map(dice => dice.id).indexOf(event.target.id)
        // set record flag to true and freeze current value
        // console.log(`Flag is ${store.state.schoolScore[diceIndex].final}`)
        if (store.state.schoolScore[diceIndex].final !== true) {
          store.state.schoolScore[diceIndex].final = true
          // record total score value
          store.state.schoolScoreTotal += store.state.schoolScore[diceIndex].value
          // lock roll button
          store.state.rollButtonDisabled = true
          // unlock next turn button
          if (store.state.schoolTurns === 6) {
            store.state.nextTurnButtonDisabled = true
            console.log(`No more turns`)
          } else {
            store.state.nextTurnButtonDisabled = false
          }
        } else {
          console.log(`You clicked on an empty or recorded field`)
        }
      }
    } /*
    saveResult (event) {
      console.log(`${event.target.id}`)
      // const diceIndex = store.state.schoolScore.map(dice => dice.id).indexOf(event.target.id)
      if (event.target.className === 'combinationName' && event.target.textContent !== '') {
        // console.log(`Event target content: ${event.target.textContent}`)
        // console.log(`Event target is: ${event.target}`)
        // we clicked on result field
        // find the index of the dice to record
        const diceIndex = store.state.schoolScore.map(dice => dice.id).indexOf(event.target.id)
        // set record flag to true and freeze current value
        // console.log(`Flag is ${store.state.schoolScore[diceIndex].final}`)
        if (store.state.schoolScore[diceIndex].final !== true) {
          store.state.schoolScore[diceIndex].final = true
          // record total score value
          store.state.schoolScoreTotal += store.state.schoolScore[diceIndex].value
          // unlock next turn button
          if (store.state.schoolTurns === 6) {
            store.state.nextTurnButtonDisabled = true
            console.log(`No more turns`)
          } else {
            store.state.nextTurnButtonDisabled = false
          }
        } else {
          console.log(`You clicked on an empty or recorded field`)
        }
      }
    } */
  },
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
  margin: .7em 0em .7em 0em;
}
.game {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2em 2em 2em 2em 2em 2em 2em 2em 2em 2em;
  /* background-color: antiquewhite; */
  color: $color-green;
  margin-bottom: .7em;
}
.school {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 2em 2em;
  margin-bottom: .7em;
}
.combinationName, .combinationResult, .gameCombination {
  align-self: center;
  justify-self:center;
}
.combinationName {
  font-size: 2.5em;
  color: $color-green;
}
.combinationName:hover {
  color: $color-orange;
  cursor: pointer;
}
.combinationResult {
  font-size: 1.2em;
  color: $color-orange;
}

.schoolResult {
  text-align: right;
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
.selected {
  background-color: $color-orange;
}
.controls {
  display: flex;
  justify-content: space-around;
}
.gameButton {
  background: $color-green;
  border: none;
  cursor: pointer;
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
</style>
