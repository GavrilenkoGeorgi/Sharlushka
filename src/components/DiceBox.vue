<template>
  <v-flex d-flex ma-0 pa-0 id="diceControls">
<!-- Dice box -->
    <v-layout row align-center class="dice-box-layout">
      <v-flex d-flex xs9 class="game-dice-container dice-box"
        v-bind:class="{ visible: this.getCurrentGameState.gameEnded, visible: this.hidden }">
        <svg class="dice-icon default animated"
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
          @click.prevent="handleMainGameButtonClick"
          aria-label="Main game button"
          type="button"
          v-bind:class="{ save: this.mainButtonState.save,
          bounce: this.mainButtonState.save,
          fadeOut: this.getCurrentGameState.gameEnded,
          visible: this.getCurrentGameState.gameEnded }">
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
    <!--div class="debug">Navigator suported is: {{ navigatorSupported }}<br/>{{ zzz }}</div-->
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
      navigatorSupported: false,
      hidden: false,
      zzz: 'zzz',
      mainButtonState: {
        play: true,
        roll: false,
        save: false,
        disabled: false
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      console.log('Dice box component mounted')
      if ('vibrate' in navigator) {
        this.navigatorSupported = true
        // vibration API supported
        // console.log(`Vibrate in navigator is ${'vibrate' in navigator}`)
        // navigator.vibrate([5, 200, 20])
      }
    })
  },
  watch: {
    turnCompleted: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler () {
        if (!this.getCurrentGameState.gameEnded) {
          this.updateMainButtonState()
          this.hidden = !this.hidden
        }
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
    vibrate () {
      console.log('zzz')
      this.zzz += '-zzz'
      let pattern = [5, 75, 66, 300, 33, 150, 15]
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate
      navigator.vibrate(pattern)
    },
    vibrateOnce () {
      console.log(`One z`)
      let pattern = [10]
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate
      navigator.vibrate(pattern)
    },
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
        // this.vibrate()
        button.classList.add('bounce')
      } else {
        return false
      }
    },
    handleMainGameButtonClick () {
      if (this.getCurrentGameState.rollsCountForButton > 0 &&
        !this.getCurrentGameState.turnCompleted) {
        // this.vibrateOnce()
        store.commit('rollDice')
        if (this.getCurrentGameState.diceRollInProgress) {
          let diceToAnimateOnRoll = document.querySelectorAll('.dice-icon:not(.chosen)')
          for (let dice of diceToAnimateOnRoll) {
            dice.classList.add('zoomIn')
          }
        }
        if (this.getCurrentGameState.currentRollCount === 0 &&
            this.getCurrentGameState.currentGameTurn <= 6 &&
            !this.getCurrentGameState.gameCheck) {
          this.$router.push({ path: '/endgame' })
        }
        setTimeout(function () {
          // not the best way to do it, but
          // console.log(`timing!`)
          let diceToRemoveAnimFrom = document.querySelectorAll('.dice-icon')
          for (let dice of diceToRemoveAnimFrom) {
            dice.classList.remove('zoomIn')
          }
        }, 500)
      }
      this.updateMainButtonState()
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
@import "../assets/scss/index.scss";
/*
.debug {
  position: fixed;
  top: 24%;
  left: 45%;
  font-size: .9em;
  line-height: 1.8;
  padding: .3em;
  border: 1px solid pink;
}
*/
.game-dice-container {
  margin-left: .3em;
  margin-right: .2em; // this
  transition: opacity 800ms cubic-bezier(.33,.15,.33,.98) ;
}
.visible {
  opacity: 0; // ??
}
.dice-icon {
  height: 3.6em;
}

/* main button */
.main-button {
  margin-right: .4em;
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
    // border: 1px solid red;
    padding-top: .15em;
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
    width: 75%;
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

@media screen and (max-resolution: 96dpi) and (max-width: 480px) { // fly iq4415
  .dice-icon {
    // border: 1px solid pink;
    height: 4.6em;
  }
  .main-button {
    height: 4.6em;
    // border-radius: .4em;
  }
  .play-arrow {
    border-top: 1em solid transparent;
    border-bottom: 1em solid transparent;
    border-left: 2em solid $color-primary-1;
  }
  .roll-circle {
    width: 1em;
    height: 1em;
  }
  .stop-brick {
    height: 1.4em;
  }
}

@media screen and (max-resolution: 96dpi) and (min-width: 481px) { // fly iq4415
  .dice-icon {
    // border: 1px solid red;
    height: 6em;
  }
  .main-button {
    height: 5.4em; // really need this?
    border-radius: .4em;
  }
  .play-arrow {
    border-top: 1.33em solid transparent;
    border-bottom: 1.33em solid transparent;
    border-left: 2.33em solid $color-primary-1;
  }
  .roll-circle {
    width: 1.33em;
    height: 1.33em;
  }
  .stop-brick {
    height: 2em;
  }
}

@media screen and (max-resolution: 96dpi) and (min-width: 768px) { // desktop
  .dice-icon {
    // border: 1px solid orange;
    height: 6em;
  }
  .main-button {
    height: 6em;
    border-radius: .6em;
  }
  .play-arrow {
    border-top: 1.33em solid transparent;
    border-bottom: 1.33em solid transparent;
    border-left: 2.33em solid $color-primary-1;
  }
  .roll-circle {
    width: 1.33em;
    height: 1.33em;
  }
  .stop-brick {
    height: 2em;
  }
}

/*
// @media screen and (max-resolution: 96dpi) and (min-width: 500px) { // desktop
  .dice-box-layout {
    width: 12em;
  }
  .main-button {
    width: 8.5em;
    border-radius: .6em;
  }
  .play-arrow {
    border-top: 1.7em solid transparent;
    border-bottom: 1.7em solid transparent;
    border-left: 2.9em solid $color-primary-1;
  }
  .roll-circle {
    width: 1.5em;
    height: 1.5em;
  }
  .stop-brick {
    height: 2.5em;
  }
}
*/
@keyframes bounce {
  from,
  20%,
  53%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -25px, 0);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -12px, 0);
  }

  90% {
    transform: translate3d(0, -4px, 0);
  }
}
.bounce {
  animation-name: bounce;
  transform-origin: center bottom;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}
</style>
