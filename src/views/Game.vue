<template>
  <v-container
    id="gameView"
    ma-0
    pa-0
    fill-height
  >
    <!-- Navigation bar -->
    <!--navBar /-->
    <v-layout
      column
      class="game-layout"
      :class="{ 'game-ended': getCurrentGameState.gameOver }"
    >
      <!-- School dice display -->
      <!--v-layout row-->
      <v-flex
        d-flex
        align-center
        class="school-dice-container"
      >
        <v-flex
          v-for="dice in getSchoolArray"
          :id="dice.id"
          :key="dice.id"
          class="dice-wrapper"
          pa-1
        >
          <component
            :is="dice.icon"
            :id="dice.id"
            class="school-score-dice-icon"
            :class="{ chosen:dice.final }"
            @click="recordResult(dice.id)"
          />
        </v-flex>
      </v-flex>
      <!--/v-layout-->
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
          <span :resultId="result.id">{{ result.value }}</span>
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
          :class="{ set:combination.final }"
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
      />
    </v-layout>
    <!--div class="progress-bar" /-->
  </v-container>
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

export default {
  name: `Game`,
  components: {
    DiceBox,
    diceOnes,
    diceTwos,
    diceThrees,
    diceFours,
    diceFives,
    diceSixes
  },
  data: () => ({
    title: `Sharlushka`
  }),
  computed: {
    ...mapGetters([
      `getSchoolArray`,
      `getCombinationArray`,
      `getCurrentGameState`,
      `progressBarState`,
      `isNewTurn`
    ])
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`Game view mounted.`)
    })
  },
  methods: {
    ...mapActions([
      `nextTurn`,
      `recordResultMk2`,
      `clearResultBox`
    ]),
    recordResult(id) { // this really belongs to mutations (
      if (!this.isNewTurn) {
        this.$store.dispatch(`recordResultMk2`, id).then(() => {
          // console.log(`Then after dispatch if new turn is true`)
          // console.log(this.isNewTurn)
          this.$store.commit(`clearResultBox`)
          this.$store.commit(`diceBoxHidden`, true)
          this.$store.commit(`nextTurn`)
        })
      } else {
        console.log(`Roll some dice.`)
      }
      // this.$store.commit(`diceBoxHidden`, true)
      // console.log(`Turn completed`)
      // console.log(`This.isGame ended`)
      // console.log(this.isGameEnded)
      // this.turnCompleted = true
      // this.$store.commit(`nextTurn`)
      // last checks after recording or not recording the result
      // check if gameEnded
      // console.log(`Is game ended? ${this.isGameEnded}`)
      // let gameEnded = this.isGameEnded
      // console.log(result)
      /*
      if (gameEnded === true) {
        console.log(`Game Over!`)
        // store.state.gameEnded = true
        // this.$router.push('/endgame')
        setTimeout(() => {
          // console.log(`Not so fast.. let the user appreciate the results )`)
          // this.$router.push(`/endgame`)
        }, 750)
      } else {
        // this.turnCompleted = true
        console.log(`Commiting next turn!`)
        this.$store.commit(`nextTurn`)
      } */
      // console.log(gameEnded)
      /*
      if (gameEnded) {
        console.log(`Game Over!`)
        // store.state.gameEnded = true
        // this.$router.push('/endgame')
        setTimeout(() => {
          // console.log(`Not so fast.. let the user appreciate the results )`)
          // this.$router.push(`/endgame`)
        }, 750)
      } else {
        // this.turnCompleted = true
        console.log(`Commiting next turn!`)
        this.$store.commit(`nextTurn`)
      } */
      // this.turnCompleted = false
      // this.newTurn1 = true
      /*
      store.state.gameInProgress = true // should be just ones
      // this.turnCompleted = true
      const combinationId = id // ?
      const combinationIndexInArray = store.state.scoreArray.map((dice) => dice.id).indexOf(combinationId)
      if (!store.state.schoolCompleted &&
          store.state.scoreArray[combinationIndexInArray].value !== `` &&
          !store.state.turnCompleted &&
          !store.state.scoreArray[combinationIndexInArray].final) {
        store.state.scoreArray[combinationIndexInArray].final = true
        store.state.schoolScoreTotal += store.state.scoreArray[combinationIndexInArray].value
        store.state.turnCompleted = true
        // set school completed to display game score on the board
        if (store.state.currentGameTurn === 6) {
          store.state.schoolCompleted = true
        }
        this.clearResultBox()
        // this.turnCompleted = true
        // this.removeCurrentHighlight()
      } else if (store.state.scoreArray[combinationIndexInArray].value !== `` &&
                  store.state.scoreArray[combinationIndexInArray].displayValues &&
                  store.state.scoreArray[combinationIndexInArray].displayValues.length < 3 &&
                  !store.state.turnCompleted) {
        store.state.turnCompleted = true // another turn completed in store?
        // push result into display values array
        store.state.scoreArray[combinationIndexInArray].displayValues.push(store.state.scoreArray[combinationIndexInArray].value)
        store.state.gameTotal += store.state.scoreArray[combinationIndexInArray].value
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
          store.state.scoreArray[combinationIndexInArray].final = true
          store.state.scoreArray[combinationIndexInArray].value = ``
        }
        // this.clearResultInStore()
        this.clearResultBox()
        // this.turnCompleted = true
        // this.removeCurrentHighlight()
      } else if (!store.state.turnCompleted && // this really should be a single check
        store.state.scoreArray[combinationIndexInArray].value === `` &&
        !store.state.scoreArray[combinationIndexInArray].final &&
        store.state.schoolCompleted &&
        store.state.rollCount === 0 &&
        !store.state.zeroCheck) {
        // that means if there is no combination to record user can mark one empty
        // field per turn as cancelled
        // and it won't be used to calculate score
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length < 3) {
          store.state.scoreArray[combinationIndexInArray].displayValues.push(0)
          // zero saved during this turn
          store.state.zeroCheck = true
          this.clearResultBox()
          // this.turnCompleted = true
          // this.removeCurrentHighlight()
          store.state.turnCompleted = true
          // this.mainButtonState.disabled = false
        }
        // check if combination is full (it has three results)
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
          store.state.scoreArray[combinationIndexInArray].final = true
        }
        store.state.turnCompleted = true
      } else {
        // console.log(`Nothing to record!`)
        return false
      } */
      // last checks after recording or not recording the result
      /*
      if (store.state.currentGameTurn === 33 && store.state.turnCompleted) {
        console.log(`Game Over!`)
        store.state.gameEnded = true
        // this.$router.push('/endgame')
        setTimeout(() => {
          // console.log(`Not so fast.. let the user appreciate the results )`)
          this.$router.push(`/endgame`)
        }, 750)
      } else {
        // this.turnCompleted = true
        console.log(`Commiting next turn!`)
        store.commit(`nextTurn`)
      }
      // this.turnCompleted = false
      // this.newTurn1 = true
      this.$store.commit(`diceBoxHidden`, true)
      console.log(`Turn completed`) */
    } // end of record result method
  } // end of methods
}
</script>

<style lang="scss" scoped>
@import "../assets/fonts/fonts.scss";
@import "../assets/scss/vars/colors.scss";

.game-layout {
  // padding-top: 3.3em;
  // height: 100vh;
  font-family: $text-font;
  // background: $color-pale-primary;
  // padding-bottom: .2em;
  // border: 1px solid green;
  transition: background-color 1s ease-in;
  // transition-duration: 1s;
  // transition-timing-function: ease-in;
}

.set {
  // background-color: $color-pale-primary;
  color: $color-chosen;
}
.game-ended {
  background: $color-pale-primary;
  /*
  .set {
    transition: background-color 1s ease-out;
    background-color: inherit;
  }*/
}
.school-results-layout {
  // border: 1px solid pink;
  height: 2em;
}
.school-result {
  // height: .8em;
  text-align: center;
}

.game-combinations-layout {
  color: $color-primary-0;
  font-size: 2em;
}
.game-combination {
  padding: .15em 0em .15em 0em;
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
.progress-bar {
  background-color: $color-primary-0;
  box-shadow: 0px 1px 10px 0px $color-primary-4;
  height: .2em;
  position: fixed;
  border: 10px solid green;
  bottom: 0;
  width: 0%;
  transition: width 1.75s cubic-bezier(.27,.13,.46,.96);
}
.full { // progress bar state
  background-color: #AA3838;
  box-shadow: 0em .2em .8em 0em red;
}

// Landscape mode
@media screen and (orientation: landscape) {
  #gameView {
    border: 1px solid pink;
    // display: flex;
    // height: 100vh;
  }
  .game-layout {
    border: 1px solid blue;
    display: flex;
    width: 100%;
    flex-direction: row;
    // padding-top: 3em;
    // border: 1px solid red;
    // padding-bottom: .4em;
  }
  .school-dice-container {
    flex-direction: column;
    // border: 1px solid green;
  }
  .dice-wrapper {
    border: 1px solid red;
  }
  .school-dice-icon {
    // height: 1em;
    // margin: .2em 0em .2em 0em;
  }
  .school-results-layout {
    width: 1em;
    flex-direction: column;
    height: 100%;
    border: 1px solid yellow;
  }
  .game-combinations-layout {
    border: 1px solid yellowgreen;
    // width: 25em;
    // padding: 0em;
    font-size: .81em;
  }
  .game-combination {
    // padding: 0px;
    // margin: 0px;
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
.accented {
  background-color: $color-combination-hightlight;
}

.background-transition {
  transition: background-color .6s ease-in;
}

.school-score-dice-icon {
  color: $color-primary-0;
}
.chosen {
  color: $color-chosen;
}

.v-progress-linear {
  margin: 0em;
}
</style>
