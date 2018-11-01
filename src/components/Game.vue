<template>
  <v-container fill-height fluid ma-0 pa-0>
    <v-layout row wrap justify-space-between>
      <Navigation></Navigation>
<!-- School dice display -->
      <v-flex d-flex xs12 class="school-dice-container">
        <svg v-for="dice in this.getSchoolArray"
              :key="dice.id"
              class="school-dice-icon" fill="none"
              v-on:click="handleBoardClick"
              v-bind:id="dice.id">
          <use v-bind="{'xlink:href':'#' + dice.icon}"
              class="default" v-bind:class="{ chosen:dice.final }">
          </use>
        </svg>
      </v-flex>
<!-- School results display -->
      <v-flex xs2 class="school-result" v-for="result in this.getSchoolArray" :key="result.id"
          v-bind:resultId="result.id"
          v-bind:class="{ chosen:result.final, blink:!result.final }">
        <span>{{ result.value }}</span>
      </v-flex>
<!-- Game combinations display -->
      <v-flex xs12 class="game-combination" v-for="combination in this.getCombinationArray" :key="combination.id"
          v-bind:id="combination.id" v-bind:class="{ set:combination.final }">
        <v-flex xs6 class="game-combination-name">{{ combination.fullName }}</v-flex>
        <v-flex xs2 class="game-result" v-for="(value, index) in combination.displayValues" :key="index">
          {{ value }}
        </v-flex>
        <v-flex xs2 class="game-result blink" v-if="combination.value">
            {{ combination.value }}
        </v-flex>
      </v-flex>
<!-- Dice controls -->
      <DiceBox v-bind:turnCompleted="turnCompleted"></DiceBox>
      <div class="progress-bar"></div>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '../store/store'
import Navigation from '../components/Navigation'
import DiceBox from '../components/DiceBox'

export default {
  name: 'Game',
  data () {
    return {
      title: 'Sharlushka',
      highestScore: 0,
      turnCompleted: false
    }
  },
  components: {
    Navigation,
    DiceBox
  },
  computed: {
    ...mapGetters([
      'debugInfo',
      'chosenDiceArray',
      'currentValuesInScoreArray',
      'getSchoolArray',
      'getCombinationArray',
      'getDiceArray',
      'getCurrentGameState'
    ]),
    turnState: function () {
      return store.state.newTurn
    }
  },
  watch: {
    turnState: {
      immediate: true,
      handler () { // some spaghetti code
        this.turnCompleted = !this.turnState
      }
    }
  },
  mounted () {
    let highestScore = localStorage.getItem('highestScore')
    if (highestScore) {
      this.highestScore = highestScore
    }
  },
  methods: {
    ...mapActions([
      'nextTurn',
      // 'newGame',
      'computeScore'
      // 'setDiceChosenState',
      // 'incrementAsync'
    ]),
    updateProgressBar () {
      let progressBar = document.querySelector('.progress-bar')
      if (store.state.rollCount === 2) {
        progressBar.style.width = '33%'
      } else if (store.state.rollCount === 1) {
        progressBar.style.width = '66%'
      } else if (store.state.rollCount === 0) {
        progressBar.style.width = '100%'
        progressBar.classList.add('full')
      } else if (store.state.rollCount === 3) {
        progressBar.style.width = '0%'
        progressBar.classList.remove('full')
      }
    },
    handleBoardClick (event) {
      let idFound = false
      let scoreId = null
      let elementToCheck = event.target
      while (!idFound && elementToCheck) {
        if (elementToCheck.classList.contains('school-dice-icon') ||
          elementToCheck.classList.contains('dice-icon') ||
          elementToCheck.classList.contains('game-combination')) {
          scoreId = elementToCheck.id
          idFound = true
        } else if (elementToCheck.classList.contains('school-result')) {
          scoreId = elementToCheck.getAttribute('resultId')
          idFound = true
        } else {
          elementToCheck = elementToCheck.parentElement
        }
      }
      if (scoreId) {
        this.recordResult(scoreId)
      } else {
        console.log(`Id is: ${scoreId}`)
      }
    },
    clearResultBox () {
      // clear all temp results in store
      for (let key in store.state.scoreArray) {
        if (!store.state.scoreArray[key].final) {
          store.state.scoreArray[key].value = ''
        }
      }
      // deselect all dice
      for (let key in store.state.diceArray) {
        if (store.state.diceArray[key].chosen) {
          store.state.diceArray[key].chosen = false
        }
      }
    },
    debugMode () {
      store.state.debug = true
    },
    recordResult (id) {
      this.turnCompleted = true
      let combinationId = id
      const combinationIndexInArray = store.state.scoreArray.map(dice => dice.id).indexOf(combinationId)
      if (!store.state.schoolCompleted &&
          store.state.scoreArray[combinationIndexInArray].value !== '' &&
          !store.state.turnCompleted &&
          !store.state.scoreArray[combinationIndexInArray].final) {
        store.state.scoreArray[combinationIndexInArray].final = true
        store.state.schoolScoreTotal += store.state.scoreArray[combinationIndexInArray].value
        store.state.turnCompleted = true
        // set school completed to display game score on the board
        if (store.state.gameTurns === 6) {
          store.state.schoolCompleted = true
        }
        this.clearResultBox()
        // this.removeCurrentHighlight()
      } else if (store.state.scoreArray[combinationIndexInArray].value !== '' &&
                  store.state.scoreArray[combinationIndexInArray].displayValues.length < 3 &&
                  !store.state.turnCompleted) {
        store.state.turnCompleted = true
        // push result into display values array
        store.state.scoreArray[combinationIndexInArray].displayValues.push(store.state.scoreArray[combinationIndexInArray].value)
        store.state.gameTotal += store.state.scoreArray[combinationIndexInArray].value
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
          store.state.scoreArray[combinationIndexInArray].final = true
          store.state.scoreArray[combinationIndexInArray].value = ''
        }
        // this.clearResultInStore()
        this.clearResultBox()
        // this.removeCurrentHighlight()
      } else if (!store.state.turnCompleted &&
        store.state.scoreArray[combinationIndexInArray].value === '' &&
        !store.state.scoreArray[combinationIndexInArray].final &&
        store.state.schoolCompleted &&
        store.state.rollCount === 0 &&
        !store.state.zeroCheck) {
        // that means if there is no combination to record user can mark one field per turn as cancelled
        // and it won't be used to calculate score
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length < 3) {
          store.state.scoreArray[combinationIndexInArray].displayValues.push(0)
          // zero saved during this turn
          store.state.zeroCheck = true
          this.clearResultBox()
          // this.removeCurrentHighlight()
          store.state.turnCompleted = true
          this.mainButtonState.disabled = false
        }
        // check if it is full
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
          store.state.scoreArray[combinationIndexInArray].final = true
        }
        store.state.turnCompleted = true
      } else {
        // console.log(`Nothing to record!`)
        return false
      }
      // last checks after recording or not recording the result
      if (store.state.gameTurns === 33 && store.state.turnCompleted) {
        // console.log(`Game Over!`)
        let score = store.state.schoolScoreTotal + store.state.gameTotal
        let highestScore = localStorage.getItem('highestScore')
        if (!highestScore) {
          // console.log(`Highest score not set, setting it for the first time`)
          localStorage.setItem('highestScore', score)
        } else if (score > highestScore) {
          localStorage.setItem('highestScore', score)
        } else {
          console.log(`Your score is not so high ${score}`)
        }
        this.$router.push({ path: '/endgame' })
      } else {
        this.turnCompleted = true
        store.commit('nextTurn')
        this.updateProgressBar()
      }
    } // end of record result method
  } // end of methods
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";
@import "../assets/scss/vars/fonts.scss";

.school-dice-container {
  height: 2.5em;
}
.school-result {
  height: 1em;
  text-align: center;
}
.game-combination {
  font-size: 1.2em;
  // font-family: verdana;
  text-align: right;
}

/*
.school {
  // padding: .5em .3em .5em .3em;
}
.school-result {
  text-align: center;
  // border: 1px solid pink;
  // width: 100%;
  // font-size: 1.3em;
  // font-weight: 700;
  // height: 1.5em;
}

.game-combination {
  // display: flex;
  // flex-direction: row;
  // color: $color-primary-0;
}

.game-combination-name {
  // font-size: 1.8em;
  // text-align: right;
}

.game-result {
  // display: flex;
  // flex-grow: 1;
  // align-items: center;
  // justify-content: center;
  // font-weight: 700;
  // font-size: 1.4em;
  // border: 1px solid yellow;
}
.blink {
  color: gray;
  animation: blinker 3s linear infinite;
}
@keyframes blinker {
  10% {
    opacity: .1;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
}
.set {
  color: $color-orange;
  background-color: $color-primary-tint;
}
.saved {
  color: $color-orange;
}

.dice-controls {
  border: 1px solid red;
  // padding: .3em;
}

.school-dice-icon {
  height: auto;
  width: 100%;
}
*/
/* main button
.main-button {
  display: flex;
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
*/
/*
.hidden {
  opacity: 1;
}
*/

/*
.game {
  // padding: 1em 0em 1em 0em;
}
*/
/* Progress bar */

.progress-bar {
  // border: 1px solid red;
  background-color: $color-primary-0;
  box-shadow: 0px 1px 10px 0px $color-primary-4;
  height: .4em;
  position: fixed;
  bottom: 0;
  width: 0%;
  transition: width 1.75s;
}
.full { // progress bar
  background-color: #AA3838;
  box-shadow: 0em .2em .8em 0em red;
}

.border-lime {
  border: 1px solid lime;
}
.border {
  border: 1px solid pink;
}

.border-black {
  border: 1px solid black;
}
/*
@media screen and (orientation: landscape) { // nokia5
  .game-screen {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0em 1em 0em 1em;
    }
  .school {
    // border: 1px solid green;
    flex-direction: column;
    padding: .3em;
  }
  .game {
    padding: 0em;
    width: 60%;
  }

  .school-dice-icon {
    height: 2.8em;
    width: 2.8em;
  }
  .school-result-layout {
    // border: 1px solid green;
    height: 18em;
    display: flex;
    flex-direction: column;
    flex-basis: 0;
  }
  .school-result {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
  }
  .game-combination-name {
    font-size: 1.4em;
  }
  .dice-controls-container {
    flex-direction: column;
  }
  .main-button {
    height: 4em;
    margin-top: .2em; // meh...
    margin-left: 0em;
  }
}
*/
/*
.school-dice-container {
  height: 2.8em;
}
*/
/*
@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (min-width: 360px) { // nokia5
  .school-dice-container {
    height: 3.5em;
  }
}
*/
/*
@media screen and (max-resolution: 96dpi) and (min-width: 768px) { // desktop
  .school-dice-container {
    height: 8em;
  }
}
*/
@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (min-width: 360px) { // nokia5
  .school-dice-container {
    height: 3.8em;
  }
}
@media screen and (max-resolution: 96dpi) and (min-width: 768px) { // desktop
  .school-dice-container {
    height: 10em;
  }
}
</style>
