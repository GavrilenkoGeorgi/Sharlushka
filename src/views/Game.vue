<template>
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
        class="school-dice-icon"
      >
        <component
          :is="dice.icon"
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
            class="text-xs-center blink"
          >
            {{ combination.value }}
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <!-- Dice box with button -->
    <DiceBox />
    <!-- Progress bar -->
    <v-progress-linear
      :value="progressBarState"
      color="purple darken-2"
      height="4"
      class="progress-bar"
    />
    <!-- Game over dialog -->
    <GameOverDialog />
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DiceBox from '../components/DiceBox.vue'
import GameOverDialog from '../components/GameOverDialog.vue'
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
    GameOverDialog,
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
    userName: ``,
    dialog: false
  }),
  computed: {
    ...mapGetters([
      `isNewTurn`,
      `isGameEnded`,
      `getSchoolArray`,
      `progressBarState`,
      `getCombinationArray`,
      `getUserAuthState`
    ])
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`Game view mounted.`)
      if (this.getUserAuthState) {
        // shouldn't be here i guess
        let userNameToSet = localStorage.getItem(`userName`)
        this.$store.dispatch(`setUserName`, userNameToSet)
      }
    })
  },
  methods: {
    ...mapActions([
      `nextTurn`,
      `saveResultInStore`,
      `clearResultBox`
    ]),
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
@import "../assets/scss/vars/colors.scss";

p {
  margin: 0;
}

/*
.dice-icon {
  // class name directly from svg file?
  // height: 3.6em;
}
*/

.school-dice-layout, .school-dice-icon {
  padding: 0em .15em 0em .15em;
}

.game-layout {
  transition: background-color 1s ease-in;
  padding: .3em 0em .3em 0em;
  color: $color-primary-0;
}
.school-results-layout {
  height: 1em;
  font-size: 1.5em;
}
.game-combinations-layout {
  font-size: 1.8em;
}
.game-combination {
  padding: .075em 0em .075em 0em;
}
.accented {
  background-color: $color-combination-highlight;
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

// Nokia5
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 360px) {
  .dice-icon {
    height: 3.8em;
  }
  .school-result {
    font-size: 1.1em;
  }
  .game-combination {
    font-size: 1.05em;
  }
}

// Landscape mode
@media screen and (orientation: landscape) {
  .game-layout {
    flex-direction: row;
  }
  .school-dice-layout {
    flex-direction: column;
    padding-left: 1em;
    // border: 1px solid red;
    // width: 3em;
  }
  .school-dice-icon {
    // border: 1px solid orange;
    width: 3.8em;
  }
  /*
  .dice-icon {
    height: 3.1em;
  }
  .school-dice-layout {
    width: 15%;
  }
  */
  .school-results-layout {
    flex-direction: column;
    width: 15%;
    padding-right: 2em;
    height: auto;
  }
  .game-combinations-layout {
    font-size: 1.1em;
    width: 60%;
  }
  .game-combination {
    padding: 0em;
  }
}

// desktop
@media screen and (max-resolution: 96dpi) and (min-width: 500px) {
  .school-dice-icon {
    width: 7em;
  }
  .school-result {
    font-size: 2.5em;
  }
  .game-combination {
    font-size: 2.5em;
  }
}

// iphoneX
@media screen and (-webkit-min-device-pixel-ratio: 3) and (min-width: 375px) {
  .game-combination {
    font-size: 1.3em;
  }
}

// iphone678plus
@media screen and (-webkit-min-device-pixel-ratio: 3) and (min-width: 414px) {
  .game-combination {
    font-size: 1.35em;
  }
}

// ipad
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) {
  .dice-icon {
    height: 7em;
  }
  .school-result {
    font-size: 2.2em;
  }
  .game-combination {
    font-size: 1.7em;
  }
}

// ipadPro
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1024px) {
  .dice-icon {
    height: 8em;
  }
  .school-result {
    font-size: 2.5em;
  }
  .game-combination {
    font-size: 2.3em;
  }
}
</style>
