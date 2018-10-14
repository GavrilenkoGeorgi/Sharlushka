<template>
  <div id="gameView">
    <Navigation />
    <div class="game-view-box">
    <!-- School layout -->
    <!-- div class="school-dice-container"-->
      <div class="school" v-on:click="handleBoardClick">
        <svg class="school-dice-icon" fill="none" v-for="dice in this.getSchoolArray" :key="dice.id" v-bind:id="dice.id">
          <use v-bind="{'xlink:href':'#' + dice.icon}" class="default" x="0" y="0" v-bind:class="{ chosen:dice.final }" v-bind:resultId="dice.id"></use>
        </svg>
      </div>
    <!--/div-->
    <div class="school" v-on:click="handleBoardClick">
      <div class="school-result" v-for="result in this.getSchoolArray" :key="result.id"
        v-bind:resultId="result.id"
        v-bind:class="{ chosen:result.final }">
        {{ result.value }}
      </div>
    </div>
    <!-- div class="game-view-box" -->
    <!-- Game table -->
    <div class="game" v-on:click="handleBoardClick">
      <div class="game-combination" v-for="combination in this.getCombinationArray" :key="combination.id"
        v-bind:id="combination.id" v-bind:class="{ set:combination.final }">
        <div class="game-combination-name">{{ combination.fullName }}</div>
        <div class="game-result" v-for="(value, index) in combination.displayValues" :key="index">
          {{ value }}
        </div>
        <div class="game-result blink" v-if="combination.value">
          {{ combination.value }}
        </div>
      </div>
    </div>
    <!-- Dice controls -->
      <div class="dice-controls">
        <div class="dice-controls-container">
          <DiceBox v-bind:class="{ bordered:$store.state.diceBoxHidden }" />
        <!--/div-->
<!-- Main button -->
        <div class="main-button animated" v-on:click="handleMainGameButtonClick"
          v-bind:class="{ save: this.mainButtonState.save, bounce: this.mainButtonState.save }">
            <div v-if=" this.mainButtonState.play " class="play-arrow-right animated fadeIn">
              </div>
            <div v-if=" this.mainButtonState.roll &&
              this.getCurrentGameState.rollsCountForButton <= 3 "
              class="circle-container animated fadeIn">
              <div v-for="(value, index) in this.getCurrentGameState.rollsCountForButton"
                :key="index" class="roll-circle animated fadeIn"></div>
            </div>
            <div v-if=" this.mainButtonState.save" class="stop-brick animated fadeIn"></div>
        </div>
        </div>
      </div>
    <!-- End of dice controls -->
    </div>
    <div class="progress-bar"></div>
    </div>
  <!-- /div -->
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
      test: true,
      clicked: false,
      highestScore: 0,
      registerForm: false,
      userExists: false,
      newTurn: false,
      mainButtonState: {
        play: true,
        roll: false,
        save: false,
        disabled: false
      },
      mainButtonText: '',
      currentlyHighlightedElement: null,
      diceToDisplay: [
        { value: '6', chosen: true, id: 'diceSixesSelected' },
        { value: '5', chosen: false, id: 'second' }]
    }
  },
  watch: {
    newTurn () {
      this.updateMainButtonState()
      // this.updateProgressBar()
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
    ])
  },
  mounted () {
    let highestScore = localStorage.getItem('highestScore')
    if (highestScore) {
      this.highestScore = highestScore
    }
  },
  methods: {
    ...mapActions([
      'rollDice',
      'nextTurn',
      'removeDice',
      'openMenu',
      'newGame',
      'increment',
      'decrement',
      'computeScore',
      'setDiceChosenState',
      'incrementAsync'
    ]),
    handleMainGameButtonClick () {
      if (this.getCurrentGameState.rollsCountForButton > 0 && !this.getCurrentGameState.turnCompleted) {
        if (!this.diceRolled) {
          this.diceRolled = true
        }
        store.commit('rollDice')
        this.updateProgressBar()
        this.updateMainButtonState()
      } else if (this.getCurrentGameState.turnCompleted) {
        this.newTurn = true
        store.commit('nextTurn')
      }
    },
    updateMainButtonState () {
      let button = document.querySelector('.main-button')
      this.mainButtonState.play = true
      this.mainButtonState.save = false
      this.mainButtonState.roll = false
      if (this.getCurrentGameState.rollsCountForButton === 3 && !this.getCurrentGameState.turnCompleted) {
        this.mainButtonState.play = true
      }
      if (this.getCurrentGameState.rollsCountForButton <= 2 && !this.getCurrentGameState.turnCompleted) {
        // trigger render circles
        this.mainButtonState.play = false
        this.mainButtonState.roll = true
      }
      if (this.getCurrentGameState.turnCompleted) {
        this.mainButtonState.roll = false
        this.mainButtonState.play = true
        this.mainButtonState.disabled = false
      }
      if (this.getCurrentGameState.rollsCountForButton === 0 && !this.getCurrentGameState.turnCompleted) {
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
    removeCurrentHighlight () {
      if (this.currentlyHighlightedElement) {
        // clear current highlights
        this.currentlyHighlightedElement.nextElementSibling.classList.remove('highest-value')
      } else {
        return false
      }
    },
    highlightHighestValue () {
      // highlight highest value onscreen
      this.removeCurrentHighlight()
      // this.currentlyHighlightedElement = null
      let highestScoreCombination = null
      let highestValue = -12 // minimal combination score on sixes
      for (let combination of this.currentValuesInScoreArray) {
        if (combination.value >= highestValue) {
          highestValue = combination.value
          highestScoreCombination = combination
          // console.log(`Highest score combination ${highestScoreCombination.id}`)
        }
      }
      if (highestScoreCombination) {
        this.currentlyHighlightedElement = document.getElementById(highestScoreCombination.id)
        // let temp = document.getElementById(highestScoreCombination.id)
        if (!store.state.schoolCompleted) {
          // let itemToHighlight = document.getElementById(highestScoreCombination.id)
          // console.log(`Item to highlight ${this.currentlyHighlightedElement}`)
          this.currentlyHighlightedElement.nextElementSibling.classList.add('highest-value')
          // console.log(itemToHighlight.nextElementSibling.classList)
        } /* else if (store.state.schoolCompleted && this.currentlyHighlightedElement.nextElementSibling) {
          // this.currentlyHighlightedElement.lastChild.classList.add('highest-value')
          // console.log(`Currently highlighted item is ->`)
          // console.dir(this.currentlyHighlightedElement)
          // this.currentlyHighlightedElement.parentElement.classList.add('highest-value')
          // console.dir(this.currentlyHighlightedElement.parentElement.lastElementChild)
          // let gameResultElement = this.currentlyHighlightedElement.parentElement
          console.dir(this.currentlyHighlightedElement.nextElementSibling)
          this.currentlyHighlightedElement.parentNode.lastChild.classList.add('highest-value')
        } */
      } else {
        return false
      }
    },
    handleBoardClick (event) {
      let idFound = false
      let scoreId = null
      let elementToCheck = event.target // .parentElement?
      while (!idFound && elementToCheck) {
        if (elementToCheck.classList.contains('school-dice-icon') ||
          elementToCheck.classList.contains('dice-icon') ||
          elementToCheck.classList.contains('game-combination')) {
          scoreId = elementToCheck.id
          idFound = true
        } else if (elementToCheck.classList.contains('school-result')) {
          scoreId = elementToCheck.getAttribute('res ultId')
          idFound = true
        } else {
          elementToCheck = elementToCheck.parentElement
        }
      }
      if (scoreId) {
        this.recordResult(scoreId)
      }
    },
    handleDiceClick (element) {
      while (element) {
        if (element.classList.contains('dice-icon')) {
          return element
        } else {
          element = element.parentElement
          if (element) {
            this.handleDiceClick(element)
          } else {
            return false
          }
        }
      }
    },
    selectDice (event) {
      this.clicked = true
      let elementToAdd = event.currentTarget
      let diceBox = document.querySelector('.dice-box')
      let resultBox = document.querySelector('.result-box')
      if (elementToAdd.parentElement === diceBox && !store.state.turnCompleted) {
        diceBox.removeChild(elementToAdd) // dice-container
        resultBox.appendChild(elementToAdd)
        store.commit('setDiceChosenState', elementToAdd.id)
        store.commit('computeScore')
      } else if (elementToAdd.parentElement === resultBox) {
        resultBox.removeChild(elementToAdd)
        diceBox.appendChild(elementToAdd) // dice-container
        store.commit('setDiceChosenState', elementToAdd.id)
        store.commit('computeScore')
      }
    },
    deSelectDice (event) {
      let elementToRemove = this.handleDiceClick(event.target)
      let diceBox = document.querySelector('.dice-box')
      let resultBox = document.querySelector('.result-box')
      if (elementToRemove && !store.state.turnCompleted) {
        // dice-container
        resultBox.removeChild(elementToRemove)
        diceBox.appendChild(elementToRemove)
      }
    },
    clearResultBox () {
      let diceBox = document.querySelector('.dice-box')
      let resultBox = document.querySelector('.result-box')
      while (resultBox.childNodes.length) {
        diceBox.appendChild(resultBox.firstChild)
      }
      // and clear all temp results in store
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
      let combinationId = id
      const combinationIndexInArray = store.state.scoreArray.map(dice => dice.id).indexOf(combinationId)
      if (!store.state.schoolCompleted &&
          store.state.scoreArray[combinationIndexInArray].value !== '' &&
          !store.state.turnCompleted &&
          !store.state.scoreArray[combinationIndexInArray].final) {
        store.state.scoreArray[combinationIndexInArray].final = true
        store.state.schoolScoreTotal += store.state.scoreArray[combinationIndexInArray].value
        store.state.turnCompleted = true
        let resultParagraph = document.getElementById(combinationId)
        resultParagraph.lastElementChild.classList.remove('blink')
        resultParagraph.classList.add('saved')
        // set school completed to display game score on the board
        if (store.state.gameTurns === 6) {
          store.state.schoolCompleted = true
        }
        this.clearResultBox()
        this.removeCurrentHighlight()
      } else if (store.state.scoreArray[combinationIndexInArray].value !== '' && store.state.scoreArray[combinationIndexInArray].displayValues.length < 3 && !store.state.turnCompleted) {
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
        this.removeCurrentHighlight()
      } else if (!store.state.turnCompleted &&
        store.state.scoreArray[combinationIndexInArray].value === '' &&
        !store.state.scoreArray[combinationIndexInArray].final &&
        store.state.schoolCompleted &&
        store.state.rollCount === 0 &&
        !store.state.zeroCheck) {
        // if there is no combination to record user can mark one field per turn as cancelled
        // and it won't be used to calculate score
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length < 3) {
          store.state.scoreArray[combinationIndexInArray].displayValues.push(0)
          // zero saved during this turn
          store.state.zeroCheck = true
          this.clearResultBox()
          this.removeCurrentHighlight()
          store.state.turnCompleted = true
          this.mainButtonText = 'Turn'
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
      // last checks after recording or not recording result
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
        this.newTurn = true
        store.commit('nextTurn')
        this.updateMainButtonState()
        this.updateProgressBar()
      }
    } // end of record result method
  } // end of methods
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
// @import "../../node_modules/animate.css/animate.css";
#gameView {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.game-view-box {
  // border: 1px solid green;
  padding: 0em .4em 0em .4em;
}
.school {
  display: flex;
  // border: 1px solid #AA3838;
  justify-content: space-around;
  // align-content: center;
  color: $color-primary-2;
  div {
    flex-grow: 1;
    flex-basis: 0;
    text-align: center;
  }
  .school-dice-icon {
    height: 2.5em;
    width: 2.5em;
    padding: .2em;
    // position: absolute;
  }
  .school-result {
    height: 1em;
  }
}

.game {
  display: flex;
  flex-direction: column;
  color: $color-primary-2;
  // border: 1px solid green;
  padding: 0em .5em 0em .5em;
  margin: 1em 0em 1em 0em;
}
.game-combination {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: .3em 0em .3em 0em;
  // border: 1px solid blue;
}
.game-combination-name {
  width: 60%;
}
.game-result {
  flex-grow: 1;
  text-align: center;
  font-weight: 700;
  // border: 1px solid yellow;
}
.blink {
  color: gray;
  animation: blinker 2.5s linear infinite;
}
@keyframes blinker {
  50% {
    opacity: .2;
  }
}
.set {
  color: $color-orange;
  background-color: $color-primary-tint;
}
.saved {
  color: $color-orange;
}

/* Dice control */
.dice-controls {
  display: flex;
  flex-direction: row;
  // border: 1px solid green;
  justify-content: space-between;
  padding: 0em .5em 0em .5em;
}
.dice-controls-container {
  display: flex;
  width: 100%;
  // flex-direction: row;
  // flex-wrap: nowrap;
  // align-content: center;
  // align-items: center;
  // justify-content: space-between;
  // align-items: center;
  // flex-basis: 0;
}

.bordered {
  // border: 1px solid red;
  visibility: hidden;
  // width: 0%;
}

/* main button */

.main-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  // position: absolute;
  // left
  // flex-grow: 2;
  color: $color-light;
  border-radius: .25em;
  background-color: $color-primary-0;
  // align-self: flex-start;
  // margin: 0 auto;
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
  box-shadow: 0px 0px .4em .05em $color-light;
}
.save {
  color: $color-light;
  background-color: $color-very-red;
  box-shadow: 0px 0px .3em $color-very-red;
}

/*Progress bar */
.progress-bar {
  // border: 1px solid red;
  background-color: $color-primary-0;
  box-shadow: 0px 1px 10px 0px $color-primary-4;
  height: .2em;
  width: 0%;
  transition: width 1.75s;
  margin-top: .3em;
}
.full { // progress bar
  background-color: #AA3838;
  box-shadow: 0em .2em .8em 0em red;
}

// stuff
.debug {
  background-color: cornflowerblue;
  position: fixed;
  z-index: 1;
  width: 225px;
  color:indigo;
  top:150px;
  opacity: .9;
  height: 10em;
  overflow: hidden;
}
.highest-value {
  color: $color-very-red;
  text-shadow: 0px 0px 15px $color-very-red-transparent;
}

/*
@media screen and (-webkit-min-device-pixel-ratio: 1.4) and (min-width: 250px) { // fly iq4415 iphone5Se
  // defaults above
}
*/

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 320px) { // iphone 4
  .school {
    .school-dice-icon {
      height: 3.2em;
      width: 3.2em;
    }
  }
  .game {
    padding: 0em .6em 0em .6em;
    margin-bottom: .8em;
  }
  .game-combination {
    font-size: 1.2em;
    // margin: .3em 0em .3em 0em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (min-width: 360px) { // nokia5
  .school {
    margin: 0em 0em 1em 0em;
    .school-dice-icon {
      height: 3.5em;
      width: 3.5em;
    }
    .school-result {
      // height: 2em;
      font-size: 1.4em;
    }
  }
  .game {
    margin: .7em 0em 2.3em 0em;
  }
  .game-combination {
    font-size: 1.4em;
    // border: 1px solid pink;
    // margin: .3em 0em .3em 0em;
  }
  .game-combination-name {
    width: 60%;
  }
  .game-result {
    font-weight: 500;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (min-width: 360px) and (orientation: landscape) { // nokia5
  .game-view-box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .school {
    display: flex;
    flex-direction: column;
    // border: 1px solid #AA3838;
    // justify-content: space-around;
    // align-content: center;
    color: $color-primary-2;
    div {
      flex-grow: 1;
      flex-basis: 0;
      text-align: center;
    }
    .school-dice-icon {
      height: 3em;
      width: 3em;
      padding: .2em;
      // position: absolute;
    }
    .school-result {
      height: 1em;
      width: 1em;
      display: inherit;
      align-items: center;
      justify-content: center;
    }
  }
  .game {
    // border: 1px solid pink;
    width: 60%;
    margin: 0;
  }
  .game-combination {
    margin: .1em 0em .1em 0em;
    // padding: 0em 0em .2em 0em;
    font-size: 1.5em;
  }
  .dice-controls-container {
    display: flex;
    flex-direction: column;
    // border: 1px solid blue;
    // flex-flow: nowrap;
  }
  .main-button {
    height: 4em;
    width: 6em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 375px) { // iPhone6
  .game {
    padding: 0em 1.5em 0em 1.5em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2.6) and (min-width: 411px) { // pixel 2
  .school {
    .school-dice-icon {
      height: 3.9em;
      width: 3.9em;
    }
    .school-result {
      font-size: 1.7em;
    }
  }
  .game-combination {
    font-size: 1.7em;
    margin: .3em 0em .3em 0em;
  }
  .game-combination-name {
    width: 60%;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) { //Ipad
  .school {
    .school-dice-icon {
      height: 5.5em;
      width: 5.5em;
    }
    .school-result {
      font-size: 2.4em;
      font-weight: 700;
    }
  }
  .game-combination {
    font-size: 2.5em;
  }
  .game-combination-name {
    width: 60%;
  }
  .game-result {
    font-weight: 500;
  }
  .game {
    padding: 0em 3em 0em 3em;
  }
  .dice-controls {
    padding: 0em 1em 1em 1em;
  }
  .main-button {
    border-radius: .8em;
    background-color: $color-primary-0;
  }
  .play-arrow-right {
    border-top: 1.55em solid transparent;
    border-bottom: 1.55em solid transparent;
    border-left: 1.95em solid $color-primary-1;
  }
  .circle-container {
    display: flex;
    align-items: center;
    // border: 1px solid pink;
  }
  .roll-circle {
    width: 1.75em;
    height: 1.75em;
    margin: .4em;
    background: $color-primary-1;
    border-radius: 50%
  }
  .stop-brick {
    width: 3em;
    height: 2em;
    margin: .2em;
    background: $color-light;
    box-shadow: 0px 0px .6em .07em $color-light;
  }
  .save {
    color: $color-light;
    background-color: $color-very-red;
    box-shadow: 0em .1em .6em $color-very-red;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1024px) { // iPadPro
  .school {
    .school-dice-icon {
      height: 8.5em;
      width: 8.5em;
    }
    .school-result {
      font-size: 2.4em;
      font-weight: 700;
    }
  }
  .game-combination {
    font-size: 3.5em;
  }
  .game-combination-name {
    width: 60%;
  }
  .game-result {
    font-weight: 500;
  }
  .game {
    padding: 0em 3em 0em 3em;
    // margin: 4em 0em 4em 0em;
  }
  .dice-controls {
    padding: 0em 1em 1em 1em;
  }
  .progress-bar {
    height: .5em;
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) and (min-width: 414px) { // iphone678
}

@media screen and (max-resolution: 96dpi) and (min-width: 700px) { // desktop
  .school {
    .school-dice-icon {
      width: 8em;
      height: 8em;
      // border: 1px solid orange;
    }
    .school-result {
      font-size: 2.4em;
      font-weight: 700;
    }
  }
  .game {
    padding: 0em 5em 0em 5em;
    // border: 1px solid red;
  }
  .game-combination {
    font-size: 1.9em;
  }
}
</style>
