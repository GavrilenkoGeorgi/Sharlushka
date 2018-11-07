<template>
  <v-container fluid mb-1 mt-3 pa-0 id="diceControls">
    <v-layout row fill-height>
      <v-flex d-flex xs9 class="dice-box"
        v-bind:class="{ hidden:!turnCompleted }"> <!-- fix this -->
        <svg class="dice-icon default"
          v-for="dice in this.getDiceArray"
          :key="dice.id"
          v-bind:class="{ chosen:dice.chosen }"
          v-bind:id="dice.id"
          v-on:click="selectDice"
          fill="none">
          <use v-bind="{'xlink:href':'#' + dice.currentIcon}"
            class="animated fadeInUp">
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
<!-- End of button -->
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

#diceControls {
  // border: 1px solid blue;
  height: 2.3em;
}
.dice-box {
  opacity: 1;
  transition: opacity 500ms;
}
.hidden {
  opacity: 0;
}

/* main button */
.main-button {
  margin-right: .2em;
  color: $color-light;
  border-radius: .25em;
  background-color: $color-primary-0;
}
.play-arrow {
  margin-left: .375em;
  border-top: .75em solid transparent;
  border-bottom: .75em solid transparent;
  border-left: 1.3em solid $color-primary-1;
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
.border-orange {
  border: 1px solid orange;
}
.border-green {
  border: 1px solid green;
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

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 320px) { // iphone5
  #diceControls {
    // border: 1px solid orange;
    height: 3em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (min-width: 360px) { // nokia5
  #diceControls {
    // border: 1px solid orange;
    height: 3.5em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) { // ipad
  #diceControls {
    // border: 1px solid orange;
    height: 6.5em;
  }
  .main-button {
    border-radius: .5em;
  }
  .play-arrow {
  // margin-left: .375em;
  border-top: 1.5em solid transparent;
  border-bottom: 1.5em solid transparent;
  border-left: 2.25em solid $color-primary-1;
  }
  .roll-circle {
    width: 1.2em;
    height: 1.2em;
    margin: .3em;
  }
  .stop-brick {
    height: 1.6em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1024px) { // ipadPro
  #diceControls {
    // border: 1px solid orange;
    height: 9.5em;
  }
  .main-button {
    border-radius: 1em;
  }
  .play-arrow {
  // margin-left: .375em;
  border-top: 2em solid transparent;
  border-bottom: 2em solid transparent;
  border-left: 3em solid $color-primary-1;
  }
  .roll-circle {
    width: 2.2em;
    height: 2.2em;
    margin: .5em;
  }
  .stop-brick {
    height: 2.5em;
  }
}

@media screen and (max-resolution: 96dpi) and (min-width: 768px) { // desktop
  #diceControls {
    // border: 1px solid orange;
    height: 10em;
  }
  .main-button {
    border-radius: 1em;
  }
  .play-arrow {
  // margin-left: .375em;
  border-top: 2em solid transparent;
  border-bottom: 2em solid transparent;
  border-left: 3em solid $color-primary-1;
  }
  .roll-circle {
    width: 2.2em;
    height: 2.2em;
    margin: .5em;
  }
  .stop-brick {
    height: 2.5em;
  }
}
</style>
