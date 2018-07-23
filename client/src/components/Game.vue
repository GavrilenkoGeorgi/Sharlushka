<template>
<div>
  <div class="resultBox">
    <!--div class="dice" v-for="dice in rolledDice" :key="dice">{{ $store.state.rolledDice[dice-1] }}</div-->
  </div>

  <!-- div class="diceBox" v-on:click="doThings">
    <div class="dice">{{ $store.state.diceArray[0] }}</div>
    <div class="dice">{{ $store.state.diceArray[1] }}</div>
    <div class="dice">{{ $store.state.diceArray[2] }}</div>
    <div class="dice">{{ $store.state.diceArray[3] }}</div>
    <div class="dice">{{ $store.state.diceArray[4] }}</div>
  </div-->
  <!-- button v-on:click="">Do things</button -->
  <!--p>{{evenOrOdd}}</p-->
<div class="diceBox" v-on:click="doThings">
    <div class="dice" v-for="dice in diceArray" :key="dice">{{ $store.state.diceArray[dice-1] }}</div>
</div>

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
    'evenOrOdd'
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
    doThings (event) {
    
      // let targetId = event.currentTarget.id
      if (event.target.className === 'dice') {
        let diceBox = document.querySelector('.diceBox')
        let resultBox = document.querySelector('.resultBox')
        let selectedDice = event.target
        let rolledDice = store.state.rolledDice
        // console.log(`event target ${selectedDice.textContent}`)
        rolledDice.push(selectedDice.textContent)
        // console.log(rolledDice)
        diceBox.removeChild(selectedDice)
        resultBox.appendChild(selectedDice)
        store.state.numOfDiceToRoll--
        console.log(`Num of dice to roll is ${store.state.numOfDiceToRoll}`)
      }
    }
  },
  data() {
        return {
            fruits: ['apple', 'banana', 'orange'],
            diceArray: store.state.diceArray.length,
            // rolledDice: store.state.rolledDice.length
        };
    }
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

.diceBox, .resultBox {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}
.dice {
  color: white;
  line-height: 1.5em;
  background-color: hsl(174, 72%, 33%);
  font-size: 1.5em;
  width:1.5em;
  height:1.5em;
  margin-right: .3em;
}
</style>
