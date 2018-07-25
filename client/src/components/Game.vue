<template>
<div>
  <table style="width:100%">
  <tr>
    <th>Study</th>
    <th>Player 1</th>
    <th>Player 2</th>
  </tr>
  <tr>
    <td>1</td>
    <td>{{ $store.state.schoolScore[0].value }}</td>
    <td>{{ $store.state.count }}</td>
  </tr>
  <tr>
    <td>2</td>
    <td>{{ $store.state.schoolScore[1].value }}</td>
    <td></td>
  </tr>
  <tr>
    <td>3</td>
    <td>{{ $store.state.schoolScore[2].value }}</td>
    <td></td>
  </tr>
  <tr>
    <td>4</td>
    <td>{{ $store.state.schoolScore[3].value }}</td>
    <td></td>
  </tr>
  <tr>
    <td>5</td>
    <td>{{ $store.state.schoolScore[4].value }}</td>
    <td></td>
  </tr>
  <tr>
    <td>6</td>
    <td>{{ $store.state.schoolScore[5].value }}</td>
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

  <button v-on:click="rollDice">Roll {{ $store.state.rollCount }}</button>
</div>

</template>

<script>
/* eslint-disable */
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
            // store.state.score += store.state.diceArray[key].value
            // console.log(`Current dice id: ${store.state.diceArray[key].id}`)
            store.state.combinationArray.push(store.state.diceArray[key].value)
            // console.log(`calculating score`)
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
            // store.state.score -= store.state.diceArray[key].value
            store.state.combinationArray.splice(store.state.combinationArray.findIndex(item => item === store.state.diceArray[key].value), 1)
            // console.log(`calculating score`)
            store.commit('computeScore')
          }
        }
      }
    }
  },
  data() {
    return {
        // fruits: ['apple', 'banana', 'orange'],
        diceArray: store.state.diceArray.length,
        // rolledDice: store.state.rolledDice.length
        }
    },
}

  document.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM fully loaded and parsed')
  // let diceBox = document.querySelector('.diceBox')
  // let diceCount = diceBox.childElementCount
  // console.log(`child element count ${diceCount}`)
  // console.log(`child element count ${diceCount}`)
  // console.log(`store is ${store.state.numOfDiceToRoll}`)
  //let diceArray = store.state.diceArray
  //console.log(`Dice array is ${diceArray}`)
})
 
// alert('Hello!')

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
</style>
