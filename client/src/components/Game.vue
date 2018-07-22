<template>
<div>
  <div class="diceBox">
    <div class="dice">{{ $store.state.diceArray[0] }}</div>
    <div class="dice">{{ $store.state.diceArray[1] }}</div>
    <div class="dice">{{ $store.state.diceArray[2] }}</div>
    <div class="dice">{{ $store.state.diceArray[3] }}</div>
    <div class="dice">{{ $store.state.diceArray[4] }}</div>
    <!-- Array: {{$store.state.diceArray[0]}}<br-->
    <!-- firstDice: {{$store.state.firstDiceValue}} -->
    <button v-on:click="rollDice">Roll {{ $store.state.rollCount }}</button>
  </div>
</div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Game',
  computed: mapGetters([
    'evenOrOdd'
  ]),
  methods: mapActions([
    'rollDice',
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.diceBox {
  display: flex;
  justify-content: center;
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
