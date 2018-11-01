<template>
  <v-container fluid ma-0 pa-0 id="diceControls">
    <v-layout row fill-height>
      <v-flex d-flex xs9 class="dice-box"
        v-bind:class="{ hidden:!turnCompleted }"> <!-- fix this -->
        <svg class="dice-icon"
          v-for="dice in this.getDiceArray"
          :key="dice.id"
          v-bind:id="dice.id"
          v-on:click="selectDice"
          fill="none">
          <use v-bind="{'xlink:href':'#' + dice.currentIcon}"
            class="default animated fadeIn"
            v-bind:class="{ chosen:dice.chosen, fadeInUp:$store.diceRolled }"><!-- dice rolled from store! -->
          </use>
        </svg>
      </v-flex>
      <v-flex d-flex xs3 class="main-button pa-0 animated"
          v-on:click="handleMainGameButtonClick"
          v-bind:class="{ save: this.mainButtonState.save, bounce: this.mainButtonState.save }">
        <div v-if=" this.mainButtonState.play"
          class="play-arrow-right animated fadeIn">
        </div>
        <div v-if=" this.mainButtonState.roll &&
          this.getCurrentGameState.rollsCountForButton <= 3 "
          class="circle-container animated fadeIn">
        <div v-for="(value, index) in this.getCurrentGameState.rollsCountForButton"
          :key="index" class="roll-circle animated fadeIn">
        </div>
        </div>
        <div v-if=" this.mainButtonState.save" class="stop-brick animated fadeIn">
        </div>
        <!-- {{ turnCompleted }} -->
      </v-flex>
    </v-layout>
  </v-container>
<!-- fill="none" stroke-width=".7em" in case of flyiq4415 or firefox-->
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store/store'

export default {
  name: 'DiceBox',
  props: ['turnCompleted'],
  data () {
    return {
      mainButtonState: {
        play: true,
        roll: false,
        save: false,
        disabled: false
      }
    }
  },
  watch: {
    turnCompleted: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler () {
        this.updateMainButtonState()
      }
    }
  },
  computed: {
    ...mapGetters([
      'getDiceArray',
      'getCurrentGameState'
    ])
  },
  methods: {
    updateMainButtonState () {
      let button = document.querySelector('.main-button')
      this.mainButtonState.play = true
      this.mainButtonState.save = false
      this.mainButtonState.roll = false
      if (this.getCurrentGameState.rollsCountForButton === 3 &&
          !this.getCurrentGameState.turnCompleted) {
        this.mainButtonState.play = true
      }
      if (this.getCurrentGameState.rollsCountForButton <= 2 &&
          !this.getCurrentGameState.turnCompleted) {
        // trigger render circles
        this.mainButtonState.play = false
        this.mainButtonState.roll = true
      }
      if (this.getCurrentGameState.turnCompleted) {
        this.mainButtonState.roll = false
        this.mainButtonState.play = true
        this.mainButtonState.disabled = false
      }
      if (this.getCurrentGameState.rollsCountForButton === 0 &&
          !this.getCurrentGameState.turnCompleted) {
        this.mainButtonState.roll = false
        this.mainButtonState.play = false
        this.mainButtonState.save = true
        this.mainButtonState.disabled = true
        // window.navigator.vibrate(200)
        // navigator.vibrate([500, 250, 500, 250, 500, 250, 500, 250, 500, 250, 500])
        button.classList.add('bounce')
      } else {
        return false
      }
    },
    handleMainGameButtonClick () {
      if (this.getCurrentGameState.rollsCountForButton > 0 && !this.getCurrentGameState.turnCompleted) {
        if (!this.diceRolled) {
          this.diceRolled = true
        }
        store.commit('rollDice')
        this.updateMainButtonState()
      }
    },
    selectDice (event) {
      let elementToAdd = event.currentTarget
      store.commit('setDiceChosenState', elementToAdd.id)
      store.commit('computeScore')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";

.border-orange {
  border: 1px solid orange;
}

.border-green {
  border: 1px solid green;
}

#diceControls {
  // border: 1px solid blue;
  height: 2.3em;
}

.hidden {
  opacity: 0;
}
/* main button */
.main-button {
  // display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // margin-left: .2em;
  color: $color-light;
  border-radius: .25em;
  background-color: $color-primary-0;
}
.play-arrow-right {
  border-top: .55em solid transparent;
  border-bottom: .55em solid transparent;
  border-left: .95em solid $color-primary-1;
}
.circle-container {
  display: flex;
  align-items: center;
  // border: 1px solid pink;
}
.roll-circle {
  width: .75em;
  height: .75em;
  margin: .2em;
  background: $color-primary-1;
  border-radius: 50%
}
.stop-brick {
  width: 1em;
  height: 1em;
  margin: .2em;
  background: $color-light;
  box-shadow: 0em 0em .4em .05em $color-light;
}
.save {
  color: $color-light;
  background-color: $color-very-red;
  box-shadow: 0em 0em .3em $color-very-red;
}

@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (min-width: 360px) { // nokia 5
  #diceControls {
    border: 1px solid orange;
    // height: 3.6em;
  }
}

@media screen and (orientation: landscape) { // nokia5
  #diceControls {
    // flex-direction: column;
  }
  .dice-box, .result-box {
    // flex-direction: column;
  }
  .dice-icon {
    // margin: .1em 0em .1em 0em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (min-width: 360px) { // nokia5
  #diceControls {
    // border: 1px solid orange;
    height: 3.5em;
  }
}

@media screen and (max-resolution: 96dpi) and (min-width: 768px) { // desktop
  #diceControls {
    // border: 1px solid orange;
    height: 10em;
  }
}
</style>
