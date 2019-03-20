<template>
  <!-- Navigation bar -->
  <!--navBar /-->
  <v-layout
    column
    class="game-layout"
  >
    <!-- School dice display -->
    <v-layout
      class="school-dice-layout"
      align-center
    >
      <v-flex
        v-for="dice in getSchoolArray"
        :id="dice.id"
        :key="dice.id"
        d-flex
        justify-center
        align-center
        class="dice-wrapper"
      >
        <component
          :is="dice.icon"
          :id="dice.id"
          :class="{ chosen:dice.final }"
          @click="recordResult(dice.id)"
        />
      </v-flex>
    </v-layout>
    <!-- School results display -->
    <v-layout
      row
      class="school-results-layout"
      align-center
    >
      <v-flex
        v-for="result in getSchoolArray"
        :key="result.id"
        d-flex
        xs2
        align-center
        justify-center
        class="school-result"
        :class="{ chosen:result.final, blink:!result.final }"
        @click="recordResult(result.id)"
      >
        {{ result.value }}
      </v-flex>
    </v-layout>
    <!-- Game combinations display -->
    <v-layout
      column
      justify-center
      class="game-combinations-layout"
    >
      <v-flex
        v-for="combination in getCombinationArray"
        :id="combination.id"
        :key="combination.id"
        d-flex
        align-center
        class="game-combination"
        :class="{ chosen:combination.final }"
        @click="recordResult(combination.id)"
      >
        <v-layout
          class="background-transition"
          :class="{ accented:!combination.final && combination.value }"
        >
          <v-flex
            xs6
            pl-2
          >
            {{ combination.fullName }}
          </v-flex>
          <v-flex
            v-for="(value, index) in combination.displayValues"
            :key="index"
            xs2
            class="text-xs-center"
          >
            {{ value }}
          </v-flex>
          <v-flex
            v-if="combination.value"
            xs2
            class="blink text-xs-center"
          >
            {{ combination.value }}
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <DiceBox />
    <v-progress-linear
      :value="progressBarState"
      color="purple darken-2"
      height="4"
      class="progress-bar"
    />
    <v-dialog
      v-model="isGameOver"
      width="20em"
    >
      <v-card class="school-not-finished-dialog pb-3">
        <v-card-text
          class="game-over-text"
        >
          <h3 class="chosen">
            {{ userName }}!
          </h3>
          <p v-if="isGameOver && schoolFinished">
            Your score is:
            <span class="chosen">{{ getTotalScore }}</span>.
          </p>
          <p v-else>
            You can't even finish the school, your score is
            <span class="chosen">{{ getSchoolScore }}</span>.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-space-around>
            <v-flex
              v-if="isGameOver && schoolFinished"
              d-flex
              xs5
            >
              <v-btn
                flat
                outline
                color="purple darken-2"
                :to="'/endgame'"
              >
                <saveIcon class="default-icon-color button-icon-margin" />
                Save
              </v-btn>
            </v-flex>
            <v-flex
              v-if="!schoolFinished"
              d-flex
              xs5
            >
              <v-btn
                color="orange"
                flat
                outline
                ripple
                class="restart-button"
                @click="restartGame"
              >
                <restartIcon class="highlighted" />
                restart
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DiceBox from '../components/DiceBox.vue'
import diceOnes from '../assets/icons/diceOnes.svg'
import diceTwos from '../assets/icons/diceTwos.svg'
import diceThrees from '../assets/icons/diceThrees.svg'
import diceFours from '../assets/icons/diceFours.svg'
import diceFives from '../assets/icons/diceFives.svg'
import diceSixes from '../assets/icons/diceSixes.svg'
import restartIcon from '../assets/icons/baseline-replay-24px.svg'
import doneIcon from '../assets/icons/baseline-done-24px.svg'
import saveIcon from '../assets/icons/baseline-save-24px.svg'

export default {
  name: `Game`,
  components: {
    DiceBox,
    diceOnes,
    diceTwos,
    diceThrees,
    diceFours,
    diceFives,
    diceSixes,
    restartIcon,
    doneIcon,
    saveIcon
  },
  data: () => ({
    title: `Sharlushka`,
    userName: ``
  }),
  computed: {
    ...mapGetters([
      `isNewTurn`,
      `isGameEnded`,
      `getSchoolArray`,
      `progressBarState`,
      `getCombinationArray`,
      `getSchoolScore`,
      `getTotalScore`,
      `schoolFinished`
    ]),
    isGameOver: {
      get () {
        return this.$store.state.gameOver
      },
      set (newValue) {
        return this.$store.dispatch(`resetGameOver`, newValue)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`Game view mounted.`)
      this.userName = localStorage.getItem(`userName`)
    })
  },
  methods: {
    ...mapActions([
      `nextTurn`,
      `saveResultInStore`,
      `clearResultBox`
    ]),
    restartGame() { // remove this from dice box
      console.log(`Restarting game.`)
      this.$store.commit(`resetState`)
      this.$router.push(`/game`)
    },
    recordResult(id) {
      // if this is new turn then
      if (!this.isNewTurn) {
        this.$store.dispatch(`saveResultInStore`, id).then(() => {
          if (this.isNewTurn) {
            this.$store.commit(`clearResultBox`)
            if (!this.isGameEnded) {
              this.$store.commit(`nextTurn`)
            }
          }
        })
      } else {
        console.log(`Roll some dice.`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/fonts/fonts.scss";
@import "../assets/scss/vars/colors.scss";

* {
  font-family: $text-font;
}

p {
  margin: 0;
}

.dice-icon {
  // class name directly from svg file
  height: 3.5em;
}
.game-layout {
  transition: background-color 1s ease-in;
  padding: .3em 0em .3em 0em;
  color: $color-primary-0;
}
.school-results-layout {
  height: 1em;
  font-size: 1.6em;
}
.game-combinations-layout {
  font-size: 1.9em;
}
.game-combination {
  padding: .15em 0em .15em 0em;
}
.accented {
  background-color: $color-combination-hightlight;
}
.background-transition {
  transition: background-color .6s ease-in;
}
.chosen {
  color: $color-chosen;
}
.v-progress-linear {
  margin: 0em;
  position: absolute;
  bottom: 0;
}

.blink {
  color: $color-primary-1;
  font-weight: 700;
  animation: blinker 3s ease-out infinite;
}
.blink:hover {
  color: $color-chosen;
  animation: none;
}
@keyframes blinker {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.school-not-finished-dialog {
  font-size: 1.4em;
  border: 2px solid $color-primary-0;
}

// Landscape mode
@media screen and (orientation: landscape) {
  .game-layout {
    // border: 1px solid blue;
    flex-direction: row;
  }
  .school-dice-layout {
    // border: 1px solid pink;
    flex-direction: column;
  }
  .dice-icon {
    height: 3.1em;
  }
  .school-dice-layout {
    width: 15%;
  }
  .school-results-layout {
    flex-direction: column;
    width: 15%;
    padding-right: 2em;
    height: auto;
  }
  .game-combinations-layout {
    // border: 1px solid yellowgreen;
    font-size: 1.1em;
    width: 60%;
  }
  .game-combination {
    // border: 1px solid purple;
    padding: 0em;
  }
}
/*
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 320px) { // iphone5
  .school-dice-icon {
    // margin: .2em 0em .2em 0em;
    height: 3em;
  }
  .school-result, .game-combination {
    // font-size: 1.8em;
    font-size: 1.5em;
    // color: red;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 360px) { // nokia5
  .school-dice-icon {
    height: 3.7em;
  }
  .school-result, .game-combination {
    font-size: 1.85em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) and (min-width: 375px) { // iphoneX
.school-dice-icon {
    // margin: .2em 0em .2em 0em;
    height: 4em;
  }
  .school-result, .game-combination {
    // border: 1px solid pink;
    font-size: 2.2em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) and (min-width: 414px) { // iphone678plus
  .game-combination {
    font-size: 2.3em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) { // ipad
  .school-dice-icon {
    height: 5.8em;
  }
  .school-result {
    // border: 1px solid pink;
    font-size: 3em;
  }
  .game-combination {
    font-size: 2.8em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1024px) { // ipadPro

.school-dice-icon {
   height: 8em;
  }
  .school-result {
    // border: 1px solid pink;
    font-size: 4.5em;
  }
  .game-combination {
    font-size: 4em;
  }
  .progress-bar {
    height: .4em;
  }
}

@media screen and (max-resolution: 96dpi) and (max-width: 480px) { // fly iq4415
  .school-dice-icon {
    // background-color: yellow;
    height: 4.6em;
  }
  .game-combinations-layout {
    padding-bottom: .3em;
  }
  .school-result, .game-combination {
    // border: 1px solid pink;
    font-size: 2.7em;
    // font-weight: 700;
    // color: green;
  }
}
@media screen and (max-resolution: 96dpi) and (min-width: 481px) { // fly iq4415
  .school-dice-icon {
    height: 6em;
  }
  .game-combinations-layout {
    padding-bottom: .3em;
  }
  .school-result, .game-combination {
    // border: 1px solid pink;
    font-size: 2.4em;
    // font-weight: 700;
    // color: green;
  }
}

@media screen and (max-resolution: 96dpi) and (orientation: landscape) { // desktop default window proportions
  .game-layout {
    // padding-top: 6em;
    // padding-bottom: .6em;
  }
  .school-result, .game-combination {
    // color: red;
    font-size: 4em;
  }
}
*/
</style>
