<template>
<div>
  <table class="results" v-on:click="recordResult" style="width:100%">
  <!--tr>
    <th></th>
    <th class="currentPlayerName">Anonymous</th>
  </tr-->
  <tr>
    <td class="combinationName">1</td>
    <td id="ones" class="result">{{ $store.state.schoolScore[0].value }}</td>
  </tr>
  <tr>
    <td class="combinationName">2</td>
    <td id="twos" class="result">{{ $store.state.schoolScore[1].value }}</td>
  </tr>
  <tr>
    <td class="combinationName">3</td>
    <td id="threes" class="result">{{ $store.state.schoolScore[2].value }}</td>
  </tr>
  <tr>
    <td class="combinationName">4</td>
    <td id="fours" class="result">{{ $store.state.schoolScore[3].value }}</td>
  </tr>
  <tr>
    <td class="combinationName">5</td>
    <td id="fives" class="result">{{ $store.state.schoolScore[4].value }}</td>
  </tr>
  <tr>
    <td class="combinationName">6</td>
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
    <td class="result"></td>
  </tr>
</table>
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
  <button class="gameButton" v-on:click="rollDice()" :disabled="$store.state.rollButtonDisabled == true">Roll</button>
  <button class="gameButton" v-on:click="nextTurn(); clearResultBox()" :disabled="$store.state.rollButtonDisabled == false">Next turn</button>
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
      console.log(`Clearing result box`)
      let diceBox = document.querySelector('.diceBox')
      let resultBox = document.querySelector('.resultBox')
      while (resultBox.childNodes.length) {
        diceBox.appendChild(resultBox.firstChild)
      }
      store.state.combinationArray = []
    },
    recordResult (event) {
      if (event.target.className === 'result') {
        // we clicked on result field
        const diceIndex = store.state.schoolScore.map(dice => dice.id).indexOf(event.target.id)
        store.state.schoolScore[diceIndex].final = true
        store.state.schoolScoreTotal += store.state.schoolScore[diceIndex].value
      }
    }
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
$color-darkGray: hsl(0, 0%, 50%);
$color-white: hsl(0, 0%, 100%);

table, th, td {
    border-bottom: 1px solid $color-gray;
    border-collapse: collapse;
    font-size: 0.85em;
    margin-bottom: .8em;
}
th {
  text-align: center;
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
.combinationName, .schoolResult {
  color: $color-green;
  font-weight: 700;
  text-align: right;
  border-right: 1px solid $color-gray;
  padding: .2em;
  width: 8em;
}
.result {
  color: $color-orange;
  font-weight: 700;
}
.result:hover {
  background-color: $color-gray;
  cursor: pointer;
}
.schoolResult {
  text-align: right;
  color: $color-orange;
}
.currentPlayerName {
  color: $color-green;
}
.controls {
  display: flex;
  justify-content: space-around;
}
.gameButton {
  background: $color-green;
  border: none;
  cursor: pointer;
  border-radius: .2em;
  font-size: 1.2em;
  color: $color-white;
  padding: .3em;
  width: 6em;
}
.gameButton:hover {
  box-shadow: 2px 2px 12px $color-darkGray;
}

</style>
