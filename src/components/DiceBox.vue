<template>
    <div id="diceControls">
    <div class="result-box" v-on:click="selectDice">
    </div>
    <div class="dice-box">
      <svg class="dice-icon" v-for="dice in this.getDiceArray"
        :key="dice.id"
        v-bind:id="dice.id"
        v-on:click="selectDice"
        fill="none">
          <use v-bind="{'xlink:href':'#' + dice.currentIcon}"
            class="default animated fadeIn" x="0" y="0"
            v-bind:class="{ chosen:dice.chosen, fadeInUp:$store.diceRolled }"></use>
        </svg>
      </div>
    </div>
<!-- fill="none" stroke-width=".7em" in case of flyiq4415 or firefox-->
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
// @import "../../node_modules/animate.css/animate.css";

#diceControls {
  display: flex;
}
.dice-box, .result-box {
  display: inherit;
  flex-flow: row;
  justify-content: flex-end;
}

.dice-icon {
  width: 2.3em;
  height: 2.3em;
}

/*
@media screen and (-webkit-min-device-pixel-ratio: 1.4) and (min-width: 250px) { // fly iq4415 iphone5Se
  // defaults above
}
*/

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 320px) { // iphone 4
  .dice-icon {
    width: 2.6em;
    height: 2.6em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (min-width: 360px) { // nokia5
  .dice-icon {
    width: 2.9em;
    height: 2.9em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2.6) and (min-width: 411px) { // pixel 2
  .dice-icon {
    width: 3.5em;
    height: 3.5em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) and (min-width: 414px) { // iphone678
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) { // iPad
  .dice-icon {
    width: 6.5em;
    height: 6.5em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1024px) { // iPadPro
  .dice-icon {
    width: 8.5em;
    height: 8.5em;
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) {

}
@media screen and (max-resolution: 96dpi) and (min-width: 700px) { // desktop
  .dice-icon {
    width: 8em;
    height: 8em;
  }
}
</style>
