<template>
    <div id="diceControls">
      <!--v-layout id="diceControls" align-center justify-center row fill-height-->
        <div class="result-box" v-on:click="selectDice">
        </div>
        <div align-center class="dice-box">
          <svg class="dice-icon" v-for="dice in this.getDiceArray"
            :key="dice.id"
            v-bind:id="dice.id"
            v-on:click="selectDice"
            fill="none">
              <use v-bind="{'xlink:href':'#' + dice.currentIcon}"
                class="default animated fadeIn"
                v-bind:class="{ chosen:dice.chosen, fadeInUp:$store.diceRolled }"></use>
            </svg>
          </div>
      <!--/v-layout-->
    </div>
<!-- fill="none" stroke-width=".7em" in case of flyiq4415 or firefox-->
</template>

<script>
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

#diceControls {
  display: flex;
}

.dice-icon {
  width: 2.7em;
  height: 2.7em;
  object-fit: contain;
  margin: 0em .1em 0em .1em;
}

.dice-box, .result-box {
  display: flex;
  align-items: center;
}

@media screen and (orientation: landscape) { // nokia5
  #diceControls {
    flex-direction: column;
  }
  .dice-box, .result-box {
    flex-direction: column;
  }
  .dice-icon {
    margin: .1em 0em .1em 0em;
  }
}

</style>
