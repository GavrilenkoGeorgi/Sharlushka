<template>
  <v-container fluid fill-height ma-0 pa-0 id="gameView">
<!-- School dice display -->
          <Navigation></Navigation>
          <v-layout column class="game-layout">
            <v-layout row>
            <v-flex d-flex align-center class="school-dice-container">
            <svg v-for="dice in this.getSchoolArray"
                  :key="dice.id"
                  class="school-dice-icon default"
                  fill="none"
                  v-bind:class="{ chosen:dice.final }"
                  v-on:click="handleBoardClick"
                  v-bind:id="dice.id">
              <use v-bind="{'xlink:href':'#' + dice.icon}">
              </use>
            </svg>
          </v-flex>
            </v-layout>
<!-- School results display -->
          <v-layout row class="school-results-layout">
            <v-flex d-flex xs2 align-center justify-center
                class="school-result"
                v-for="result in this.getSchoolArray"
                :key="result.id"
                v-on:click="handleBoardClick"
                v-bind:class="{ saved:result.final, blink:!result.final }">
              <span v-bind:resultId="result.id">{{ result.value }}</span>
            </v-flex>
          </v-layout>
<!-- Game combinations display -->
  <v-layout column justify-center class="game-combinations-layout">
      <v-flex d-flex align-center v-for="combination in this.getCombinationArray"
          :key="combination.id"
          @click="handleBoardClick"
          v-bind:id="combination.id"
          class="game-combination"
          v-bind:class="{ set:combination.final }">
        <v-layout>
          <v-flex xs6 pl-2>{{ combination.fullName }}</v-flex>
          <v-flex xs2 class="text-xs-center" v-for="(value, index) in combination.displayValues" :key="index">
            {{ value }}
          </v-flex>
          <v-flex xs2 class="text-xs-center blink" v-if="combination.value">
              {{ combination.value }}
          </v-flex>
        </v-layout>
      </v-flex>
  </v-layout>
    <DiceBox v-bind:turnCompleted="turnCompleted"></DiceBox>
      </v-layout>
      <div class="progress-bar"></div>
      </v-container>
<!-- Dice controls -->
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
      turnCompleted: false,
      progressBarLength: 3
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
    },
    progressBarState: function () {
      return store.state.rollCount
    }
  },
  watch: {
    turnState: {
      immediate: true,
      handler () { // some spaghetti code
        this.turnCompleted = !this.turnState
      }
    },
    progressBarState: {
      immediate: true,
      handler () {
        if (document.querySelector('.progress-bar')) { // content onload?
          this.updateProgressBar()
        } else {
          return false
        }
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
      // console.dir(event.target)
      let idFound = false
      let scoreId = null
      let elementToCheck = event.target
      while (!idFound && elementToCheck) {
        if (elementToCheck.classList.contains('school-dice-icon') ||
          elementToCheck.classList.contains('dice-icon') ||
          elementToCheck.classList.contains('game-combination')) {
          scoreId = elementToCheck.id
          idFound = true
          // } else if (elementToCheck.classList.contains('school-result')) {
        } else if (elementToCheck.getAttribute('resultId')) {
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
      // this.turnCompleted = true
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
        if (store.state.currentGameTurn === 6) {
          store.state.schoolCompleted = true
        }
        this.clearResultBox()
        // this.removeCurrentHighlight()
      } else if (store.state.scoreArray[combinationIndexInArray].value !== '' &&
                  store.state.scoreArray[combinationIndexInArray].displayValues &&
                  store.state.scoreArray[combinationIndexInArray].displayValues.length < 3 &&
                  !store.state.turnCompleted) {
        store.state.turnCompleted = true // another turn completed in store?
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
        // that means if there is no combination to record user can mark one empty
        // field per turn as cancelled
        // and it won't be used to calculate score
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length < 3) {
          store.state.scoreArray[combinationIndexInArray].displayValues.push(0)
          // zero saved during this turn
          store.state.zeroCheck = true
          this.clearResultBox()
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
      }
      // last checks after recording or not recording the result
      if (store.state.currentGameTurn === 33 && store.state.turnCompleted) {
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
      this.turnCompleted = true
    } // end of record result method
  } // end of methods
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";
@import "../assets/scss/vars/fonts.scss";
/*
#gameView {
  //padding-top: 4.5em;
  border: 1px solid lime;
}
*/
.game-layout {
  padding-top: 3.2em;
  padding-bottom: .2em;
}
.school-dice-container {
  // height: 5em;
  // overflow: hidden;
  // border: 1px solid yellow;
}
.school-dice-icon {
  // background-color: yellow;
  height: 3.8em;
}
.school-result {
  height: 1em;
  text-align: center;
}
.saved {
  color: $color-orange;
}
.game-combinations-layout {
  // font-size: 2em;
  // text-align: right;
  // background-color: yellow;
  // color: red;
  // border: 1px solid red;
  // width: 50em;
  color: $color-primary-0;
  // padding-bottom: 1em;
}
.game-combination {
  // border: 1px solid red;
  padding: 0.2em;
  // display: flex;
  // align-content: center;
  // justify-content: center;
  // align-items: center;
}
.game-result {
  text-align: center;
  // border: 1px solid red;
}
.set {
  background-color: $color-pale-primary;
  color: $color-chosen;
}
.blink {
  color: gray;
  animation: blinker 3s linear infinite;
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

/* Progress bar */
.progress-bar {
  // border: 1px solid red;
  background-color: $color-primary-0;
  box-shadow: 0px 1px 10px 0px $color-primary-4;
  height: .2em;
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
.wide {
  // width: 100%;
  // display: inline;
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 320px) { // iphone5
  .school-dice-container {
    // height: 3.4em;
  }
  .school-result, .game-combination {
    // border: 1px solid pink;
    font-size: 1.8em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (min-width: 360px) { // nokia5
  .school-dice-container {
   // height: 3.8em;
  }
  .school-result {
    // border: 1px solid pink;
    font-size: 2em;
  }
  .game-combination {
    font-size: 2em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) and (min-width: 375px) { // iphoneX
.school-result {
    // border: 1px solid pink;
    font-size: 2.6em;
  }
  .game-combination {
    font-size: 2.6em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) and (min-width: 414px) { // iphone678plus
   .game-combination {
    font-size: 2.3em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) { // ipad
  .school-dice-container {
   // height: 5.8em;
  }
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
  .progress-bar {
    // height: .4em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1024px) { // ipadPro
.game-layout {
  padding-top: 7em;
}
.school-dice-icon {
   height: 8em;
  }
  .school-dice-container {
    // height: 8.8em;
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

@media screen and (max-resolution: 96dpi) and (min-width: 768px) { // desktop
  .school-dice-container {
    // height: 10em;
  }
  .school-result {
    // border: 1px solid pink;
    font-size: 3em;
  }
  .game-combination {
    font-size: 3em;
  }
}

// Landscape mode
@media screen and (orientation: landscape) {
  .game-layout {
    display: flex;
    flex-direction: row;
    padding-top: 2.6em;
    //border: 1px solid red;
    padding-bottom: .4em;
  }
  .school-dice-container {
    // background-color: yellow;
    // width: 5em;
    flex-direction: column;
    // padding: .2em 0em .2em 0em;
  }
  .school-dice-icon {
    // height: 3.3em;
    // background-color: yellow;
    margin: .2em 0em .2em 0em;
  }
  .school-results-layout {
    width: 15em;
    // background-color: gray;
    flex-direction: column;
    // flex-wrap: wrap;
  }
  .school-result {
    // border: 1px solid lime;
    // width: 5em;
  }
  .game-combinations-layout {
    width: 100em;
    padding: 0em;
    font-size: .8em;
    // color: red;
  }
}

</style>
