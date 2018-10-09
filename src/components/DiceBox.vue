<template>
    <div id="diceControls" v-bind:class="{ hidden:$store.state.diceBoxHidden }">
    <div class="result-box animated slideInLeft" v-on:click="selectDice">
    </div>
    <div class="dice-box animated slideInLeft">
      <div v-for="dice in this.getDiceArray"
        :key="dice.id"
        v-bind:id="dice.id"
        v-on:click="selectDice">
        <svg class="dice-icon" fill="none"> <!-- fill="none" stroke-width=".7em" in case of flyiq4415-->
          <use v-bind="{'xlink:href':'#' + dice.currentIcon}"
            class="default animated fadeInUp" x="0" y="0"
            v-bind:class="{ chosen:dice.chosen, fadeInUp:$store.diceRolled }"></use>
        </svg>
      </div>
    </div>
    </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import store from '../store/store'

export default {
  name: 'DiceBox',
  data () {
    return {
      state: true
    }
  },
  computed: {
    ...mapGetters([
      'getDiceArray'
    ])
  },
  methods: {
    handleDiceClick (element) {
      while (element) {
        if (element.classList.contains('dice-icon')) {
          return element
        } else {
          element = element.parentElement
          if (element) {
            this.handleDiceClick(element)
          } else {
            return false
          }
        }
      }
    },
    selectDice (event) {
      this.clicked = true
      let elementToAdd = event.currentTarget
      let diceBox = document.querySelector('.dice-box')
      let resultBox = document.querySelector('.result-box')
      if (elementToAdd.parentElement === diceBox && !store.state.turnCompleted) {
        diceBox.removeChild(elementToAdd) // dice-container
        resultBox.appendChild(elementToAdd)
        store.commit('setDiceChosenState', elementToAdd.id)
        store.commit('computeScore')
      } else if (elementToAdd.parentElement === resultBox) {
        resultBox.removeChild(elementToAdd)
        diceBox.appendChild(elementToAdd) // dice-container
        store.commit('setDiceChosenState', elementToAdd.id)
        store.commit('computeScore')
      }
    },
    deSelectDice (event) {
      let elementToRemove = this.handleDiceClick(event.target)
      let diceBox = document.querySelector('.dice-box')
      let resultBox = document.querySelector('.result-box')
      if (elementToRemove && !store.state.turnCompleted) {
        // dice-container
        resultBox.removeChild(elementToRemove)
        diceBox.appendChild(elementToRemove)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
@import "../../node_modules/animate.css/animate.css";

#diceControls {
  display: flex;
  flex-grow: 2;
  flex-basis: 0;
  // width: 100%;
  transition: all 1s;
}
.dice-box, .result-box {
  display: flex;
  flex-grow: 1;
  // flex-basis: 0;
  // align-content: center;
  // align-items: center;
  // border: 1px solid green;
  // height: 4em;
}
svg {
  width: 100%;
  padding-bottom: -100%;
  height: 2em;
  overflow: hidden;
}
.dice-icon {
  // width: 2em;
  // border: 1px solid red;
  // width: 100%;
  width: 100%;
  // padding-bottom: 100%;
  // height: 1px;
  overflow: visible
  // padding-bottom: -100%;
}
.hidden {
  // visibility: hidden;
  // display: none;
  width: 0em;
  opacity: 0;
}
</style>
