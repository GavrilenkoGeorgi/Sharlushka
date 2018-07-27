<template>
<div>
  <table class="results" v-on:click="recordResult" style="width:100%">
  <tr>
    <th>Study</th>
    <th>Player 1</th>
    <th>Player 2</th>
  </tr>
  <tr>
    <td class="combinationName">1</td>
    <td id="ones" class="result">{{ $store.state.schoolScore[0].value }}</td>
    <td></td>
  </tr>
  <tr>
    <td class="combinationName">2</td>
    <td id="twos" class="result">{{ $store.state.schoolScore[1].value }}</td>
    <td></td>
  </tr>
  <tr>
    <td class="combinationName">3</td>
    <td id="threes" class="result">{{ $store.state.schoolScore[2].value }}</td>
    <td></td>
  </tr>
  <tr>
    <td class="combinationName">4</td>
    <td id="fours" class="result">{{ $store.state.schoolScore[3].value }}</td>
    <td></td>
  </tr>
  <tr>
    <td class="combinationName">5</td>
    <td id="fives" class="result">{{ $store.state.schoolScore[4].value }}</td>
    <td></td>
  </tr>
  <tr>
    <td class="combinationName">6</td>
    <td id="sixes" class="result">{{ $store.state.schoolScore[5].value }}</td>
    <td></td>
  </tr>
  <tr>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Пара</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Две пары</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Тройник</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Фул</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Каре</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Покер</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Малый</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Большой</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Первый шанс</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Второй шанс</td>
    <td></td>
    <td></td>
  </tr>
</table>
  <div class="score"><!-- Score is {{$store.state.score}}<br-->
  combination array is: {{$store.state.combinationArray}}</div>
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
  <button v-on:click="rollDice()" :disabled="$store.state.rollButtonDisabled == true">Roll</button> {{ $store.state.rollCount }} left.
  <button v-on:click="nextTurn(); clearResultBox()" :disabled="$store.state.rollButtonDisabled == false">Next turn</button>
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
table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    font-size: 0.85em;
    text-align: left;
}
.diceBox, .resultBox {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}
.dice {
  color: white;
  line-height: 1.5em;
  background-color: hsl(167, 100%, 30%);
  font-size: 1.5em;
  width:1.5em;
  height:1.5em;
  margin-right: .3em;
}
.selected {
  background-color: hsl(36, 100%, 50%);
}
.combinationName {
  color: hsl(167, 100%, 30%);
  font-weight: 700;
  width: 7em;
  text-align: center;
}
</style>
