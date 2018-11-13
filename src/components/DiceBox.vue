<template>
  <v-flex d-flex ma-0 pa-0 id="diceControls border">
<!-- Dice box -->
    <v-layout row align-center class="dice-box-layout">
      <v-flex d-flex xs9 class="game-dice-container dice-box" v-bind:class="{ visible:!turnCompleted }">
        <svg class="dice-icon default"
          v-for="dice in this.getDiceArray"
          :key="dice.id"
          v-bind:class="{ chosen:dice.chosen }"
          v-bind:id="dice.id"
          v-on:click="selectDice"
          fill="none">
          <use v-bind="{'xlink:href':'#' + dice.currentIcon}"
            class="game-dice animated fadeIn">
          </use>
        </svg>
      </v-flex>
<!-- Main button -->
      <v-flex class="main-button animated"
          v-on:click="handleMainGameButtonClick"
          v-bind:class="{ save: this.mainButtonState.save, bounce: this.mainButtonState.save }">
        <v-layout align-center justify-center row fill-height>
          <v-flex xs2 class="play-arrow animated fadeIn" v-if=" this.mainButtonState.play">
          </v-flex>
          <v-flex v-if=" this.mainButtonState.roll &&
            this.getCurrentGameState.rollsCountForButton <= 3 "
            class="circle-container animated fadeIn">
            <v-layout row justify-center>
              <div v-for="(value, index) in this.getCurrentGameState.rollsCountForButton"
                :key="index" class="roll-circle animated fadeIn">
              </div>
            </v-layout>
          </v-flex>
          <v-flex xs4 v-if=" this.mainButtonState.save" class="stop-brick animated fadeIn">
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
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
      let diceBox = document.querySelector('.dice-box')
      if (elementToAdd.classList.contains('chosen')) {
        diceBox.appendChild(elementToAdd)
      } else {
        diceBox.insertBefore(elementToAdd, diceBox.childNodes[0])
      }
      store.commit('setDiceChosenState', elementToAdd.id)
      store.commit('computeScore')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";

.game-dice-container {
  margin-left: .3em;
  margin-right: .2em; // this
  transition: opacity 1s cubic-bezier(.33,.15,.33,.98) ;
}
.visible {
  opacity: 0; // ??
}
.dice-icon {
  height: 3.6em;
}

/* main button */
.main-button {
  margin-right: .2em;
  color: $color-light;
  border-radius: .25em;
  height: 3.6em;
  background-color: $color-primary-0;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}
.play-arrow {
  margin-left: .375em;
  border-top: .75em solid transparent;
  border-bottom: .75em solid transparent;
  border-left: 1.3em solid $color-pale-primary-lightest;
}
.roll-circle {
  width: .75em;
  height: .75em;
  margin: .2em;
  background: $color-pale-primary-lightest;
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

// landscape
@media screen and (orientation: landscape) {
  .dice-box-layout {
    display: flex;
    flex-direction: column;
    width: 10em;
  }
  .dice-box {
    display: flex;
    flex-direction: column;
  }
  .game-dice-container {
    display: flex;
    flex-direction: column;
  }
  .dice-icon {
  margin: .1em 0em .1em 0em;
  }
  .main-button {
    width: 50%;
    margin: .4em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) { // ipad
  .dice-icon {
    height: 5.8em;
    // border: 1px solid green;
  }
  .main-button {
    border-radius: .5em;
    height: 5.8em;
  }
  .play-arrow {
    border-top: 1.5em solid transparent;
    border-bottom: 1.5em solid transparent;
    border-left: 2.25em solid $color-primary-1;
  }
  .roll-circle {
    width: 1.2em;
    height: 1.2em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1024px) { // ipadPro
  .dice-icon {
    height: 8em;
    // border: 1px solid green;
  }
  .main-button {
    border-radius: .5em;
    height: 8em;
    border-radius: 1em;
  }
  .play-arrow {
    border-top: 2em solid transparent;
    border-bottom: 2em solid transparent;
    border-left: 3em solid $color-primary-1;
  }
  .roll-circle {
    width: 2em;
    height: 2em;
  }
  .stop-brick {
    height: 2.5em;
  }
}
</style>
