<template>
  <!-- Dice box -->
  <v-layout
    v-if="!isGameEnded && !isLastResultSaved"
    class="dice-box-container"
    align-center
  >
    <v-flex
      xs9
    >
      <!-- v-if="getCurrentGameState.currentRollCount <= 2" -->
      <v-layout
        v-if="getCurrentGameState.currentRollCount <= 2"
        row
        justify-space-around
        fill-height
        px-1
        class="dice-icons-layout"
      >
        <v-flex
          v-for="dice in getDiceArray"
          :id="dice.id"
          :key="dice.id"
          d-flex
          shrink
          class="game-dice animated slow fadeIn"
          :class="{ chosen: dice.chosen }"
          @click="selectDice(dice.id)"
        >
          <component
            :is="dice.currentIcon"
            class="dice-box-icon"
          />
        </v-flex>
      </v-layout>
    </v-flex>
    <!-- Main button do something with the margins -->
    <v-flex
      class="main-button-container"
    >
      <v-layout
        align-center
        justify-center
        row
        fill-height
        class="main-button animated slow fadeIn"
        :class="{ save: mainButtonStateCheck }"
        aria-label="Main game button"
        type="button"
        @click.prevent="handleMainGameButtonClick"
      >
        <!-- v-if="getCurrentGameState.currentRollCount === 3 && !isGameEnded" -->
        <v-flex
          v-if="getCurrentGameState.currentRollCount === 3 && !isGameEnded"
          xs2
          class="play-arrow animated slow fadeIn"
        />
        <!-- Button roll state -->
        <v-flex
          v-if="mainButtonIsRolling === true"
          class="circle-container"
        >
          <v-layout
            row
            justify-center
          >
            <div
              v-for="(value, index) in getCurrentGameState.rollsCountForButton"
              :key="index"
              class="roll-circle animated slow fadeIn"
            />
          </v-layout>
        </v-flex>
        <!-- Button save state -->
        <v-flex
          v-if="getCurrentGameState.currentRollCount === 0"
          xs4
          class="stop-brick animated slow fadeIn"
        />
      </v-layout>
    </v-flex>
  </v-layout>
  <v-layout
    v-else
    align-center
    justify-center
    class="end-game-buttons"
  >
    <!-- Save button if user is not decided yet to save -->
    <v-flex
      d-flex
      xs6
    >
      <v-btn
        v-if="!isLastResultSaved"
        flat
        outline
        ripple
        color="purple darken-2"
        :to="'/endgame'"
        class="button"
      >
        <saveIcon class="default-icon-color button-icon-margin" />
        Save
      </v-btn>
      <v-btn
        v-else
        flat
        outline
        ripple
        color="orange"
        class="button"
        @click="restartGame()"
      >
        <restartIcon class="chosen button-icon-margin" />
        Restart
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store/store'
import diceOnes from '../assets/icons/diceOnes.svg'
import diceTwos from '../assets/icons/diceTwos.svg'
import diceThrees from '../assets/icons/diceThrees.svg'
import diceFours from '../assets/icons/diceFours.svg'
import diceFives from '../assets/icons/diceFives.svg'
import diceSixes from '../assets/icons/diceSixes.svg'
import restartIcon from '../assets/icons/baseline-replay-24px.svg'
import saveIcon from '../assets/icons/baseline-save-24px.svg'

export default {
  name: `DiceBox`,
  components: {
    diceOnes,
    diceTwos,
    diceThrees,
    diceFours,
    diceFives,
    diceSixes,
    restartIcon,
    saveIcon
  },
  data() {
    return {
      navigatorSupported: false
    }
  },
  computed: {
    ...mapGetters([
      `getDiceArray`,
      `getCurrentGameState`,
      `isGameEnded`,
      `isNewTurn`,
      `mainButtonIsRolling`,
      `isLastResultSaved`
    ]),
    mainButtonStateCheck:() => store.state.rollCount === 0 ? true : false
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`Dice box mounted.`)
      if (`vibrate` in navigator) {
        // vibration API supported
        this.navigatorSupported = true
      }
    })
  },
  methods: {
    restartGame() {
      console.log(`Restarting game.`)
      store.commit(`resetState`)
      // cause of the same route
      // this.$router.go(`/game`)
    },
    vibrate() {
      if (this.navigatorSupported) {
        // const pattern = [175, 150, 125, 75, 60]
        const pattern = [175, 150, 125, 0]
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate
        navigator.vibrate(pattern)
      } else return false
    },
    animateDice() {
      const diceToAnimateOnRoll = document.querySelectorAll(`.game-dice:not(.chosen)`)
      // animating dice
      for (const dice of diceToAnimateOnRoll) {
        // need to do something about
        // this animation reapplying thing
        dice.classList.add(`blink`)
        void dice.offsetWidth
        dice.classList.remove(`blink`)
      }
    },
    handleMainGameButtonClick() {
      if (this.$store.state.rollCount > 0) {
        store.commit(`rollDice`)
        this.animateDice()
      } else if (this.$store.state.rollCount === 0) {
        this.vibrate()
      }
    },
    selectDice(id) {
      // id of a dice e.g. `ones` or `sixes`
      if (!this.isNewTurn) {
        this.$store.commit(`setDiceChosenState`, id)
        this.$store.dispatch(`computeScore`, id)
        // then save chosen dice value to favs
        this.$store.dispatch(`saveFavDiceValue`, id)
        const dice = document.getElementById(id)
        const diceBox = dice.parentElement
        // get chosen dice quantity if any,
        // to add or remove dice on user click
        let chosenDiceQuantity = diceBox.querySelectorAll(`.chosen`).length
        diceBox.insertBefore(dice, diceBox.childNodes[chosenDiceQuantity])
      } else {
        console.log(`Roll some dice, duh.`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";

.dice-box-container {
  padding-right: .4em;
}
.dice-box-icon, .main-button-container {
  // border: 1px solid pink;
  height: 3.1em; // starting from iphone 5 screen size
  color: $color-primary-0;
  svg {
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  }
}
.default-icon-color {
  fill: $color-primary-0;
}
.game-dice {
  svg {
    color: $color-primary-0;
  }
}
.chosen {
  fill: $color-chosen;
  // two types of icons UI and game dice
  // change `fill` to `currentColor` inside svg
  svg {
    color: $color-chosen;
  }
}

/* main button */
.main-button {
  border-radius: .25em;
  background-color: $color-primary-0;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}
.save {
  animation-name: bounce;
  background-color: $color-very-red;
  box-shadow: 0em 0em .3em $color-very-red;
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
  background: $main-button-brick-color;
  box-shadow: 0em 0em .4em .05em $main-button-brick-color;
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 360px) { // Nokia5
  .dice-box-icon, .main-button-container {
    height: 3.4em;
  }
}

// landscape
@media screen and (orientation: landscape) {
  .dice-box-container {
    // border: 1px solid red;
    width: 20%;
    height: 100%;
    flex-direction: column;
    padding: 0em 0em .3em 0em;
  }
  .dice-icons-layout {
    flex-direction: column;
  }
  .main-button-container {
    flex-direction: column;
    width: 6em;
  }
  .dice-box-icon { //dice-icon?
    height: 2.8em;
  }
  .end-game-buttons {
    flex-direction: column;
    position: absolute;
    right: 10%;
    top: 25%;
  }
}

/*
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) { // ipad
  .dice-icon {
    // height: 5.8em;
    // border: 1px solid green;
  }
  .main-button {
    border-radius: .5em;
    // height: 5.8em;
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
    // height: 8em;
    // border: 1px solid green;
  }
  .main-button {
    // height: 8em;
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
    // height: 4.6em;
  }
  .main-button {
    // height: 4.6em;
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
    // height: 6em;
  }
  .main-button {
    // height: 5.4em; // really need this?
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
    // height: 6em;
  }
  .main-button {
    // height: 6em;
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
} */
/*
@media screen and (max-resolution: 96dpi) and (min-width: 500px) { // desktop
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

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

.zoomIn {
  animation-name: zoomIn;
}
</style>
