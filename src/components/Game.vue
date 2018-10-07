<template>
  <div id="gameView">
    <Navigation />
    <!-- School layout -->
    <div class="school" v-on:click="handleBoardClick">
      <svg class="school-dice-icon" v-for="dice in this.getSchoolArray" :key="dice.id" v-bind:id="dice.id">
        <use v-bind="{'xlink:href':'#' + dice.icon}" class="default" x="0" y="0" v-bind:class="{ chosen:dice.final }" v-bind:resultId="dice.id"></use>
      </svg>
    </div>
    <div class="school" v-on:click="handleBoardClick">
      <div class="school-result" v-for="result in this.getSchoolArray" :key="result.id" v-bind:resultId="result.id" v-bind:class="{ chosen:result.final }">{{ result.value }}</div>
    </div>
    <!--hr class="faded" /-->
    <!-- Game table -->
    <div class="game" v-on:click="handleBoardClick">
      <div class="game-combination" v-for="combination in this.getCombinationArray" :key="combination.id" v-bind:id="combination.id" v-bind:class="{ set:combination.final }">
        <p class="game-combination-name">{{ combination.fullName }}</p>
        <p class="game-result" v-for="(value, index) in combination.displayValues" :key="index">
          {{ value }}
        </p>
        <p class="game-result blink" v-if="combination.value">
          {{ combination.value }}
        </p>
      </div>
    </div>
    <div class="dice-controls">
        <div class="dice-box-container" v-bind:class="{ hidden:$store.state.diceBoxHidden }">
          <!-- Result box -->
          <div class="result-box" v-bind:class="{ border: $store.state.combinationArray.length >= 100 }" v-on:click="selectDice"></div>
          <!-- Dice box -->
          <div class="dice-box">
            <div v-for="dice in this.getDiceArray" :key="dice.id" v-bind:id="dice.id" v-on:click="selectDice">
              <svg class="dice-icon" fill="none" stroke-width=".7em"> <!-- fill="none" stroke-width=".7em" in case of flyiq4415-->
                <use v-bind="{'xlink:href':'#' + dice.currentIcon}"
                  class="default animated fadeInUp" x="0" y="0"
                  v-bind:class="{ chosen:dice.chosen }"></use>
              </svg>
            </div>
          </div>
          <!--svg class="dice-icon" v-for="dice in this.getDiceArray" :key="dice.id" v-bind:id="dice.id" fill="none" stroke-width=".5em"-->
            <!--use v-bind="{'xlink:href':'#' + dice.currentIcon}" class="default" x="0" y="0" v-bind:class="{ chosen:dice.final }" ></use-->
      </div>
      <div class="main-button animated fadeId" v-on:click="handleMainGameButton"
        v-bind:class="{ save: this.mainButtonState.save }">

          <div v-if=" this.mainButtonState.play " class="play-arrow-right animated fadeIn">
            </div>

          <div v-if=" this.mainButtonState.roll && this.getCurrentGameState.rollsCountForButton <= 3 " class="circle-container">

            <div v-for="(value, index) in this.getCurrentGameState.rollsCountForButton"
              :key="index" class="roll-circle animated fadeIn"></div>

          </div>

          <div v-if=" this.mainButtonState.save" class="stop-brick animated fadeIn"></div>
      </div>
    </div>
  <!-- End of dice box container -->
  <div class="progress-bar"></div>
</div>
  <!--div class="debug">{{debugInfo}}
    {{clicked}}
  </div-->

</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import { mapGetters, mapActions } from 'vuex'
import store from '../store/store'
import Navigation from '../components/Navigation'

export default {
  name: 'Game',
  data () {
    return {
      title: 'Sharlushka',
      // userName: '',
      test: true,
      clicked: false,
      highestScore: 0,
      registerForm: false,
      userExists: false,
      // loginButtonText: 'Change',
      // formValueName: '',
      mainButtonState: {
        play: true,
        roll: false,
        save: false,
        disabled: false
      },
      mainButtonText: '',
      // mainButtonDisabled: false,
      currentlyHighlightedElement: null,
      diceToDisplay: [
        { value: '6', chosen: true, id: 'diceSixesSelected' },
        { value: '5', chosen: false, id: 'second' }]
    }
  },
  components: {
    Navigation
  },
  computed: {
    ...mapGetters([
      'evenOrOdd',
      'onesScore',
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
    // let temp = this.getSchoolArray
    // for (let value of this.getCombinationArray) {
    //  console.log(value.id)
    // }
    // this.updateMainButtonState()
    // store.mapGetters.chosenDiceArray
    // let temp = this.chosenDiceArray()
    // console.log(store.getters.chosenDiceArray)
    // it a start!
    // this.mainButtonText = store.state.mainButtonText
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
      'incrementIfOdd',
      'incrementAsync'
    ]),
    handleMainGameButton () {
      if (store.state.rollCount > 0 && !store.state.turnCompleted) {
        store.commit('rollDice')
        this.updateProgressBar()
        this.updateMainButtonState()
      } else if (store.state.turnCompleted) {
        this.clearResultBox()
        this.updateMainButtonState()
      } else {
        this.updateMainButtonState()
        // console.log(`Record something!`)
        return false
      }
      this.updateMainButtonState()
    },
    updateMainButtonStateBak () {
      let button = document.querySelector('.main-button')
      this.mainButtonDisabled = false
      // button.classList.remove('bounce')
      if (store.state.gameTurns === 1 && store.state.rollCount === 3) {
        this.mainButtonText = 'Start'
      } else if (store.state.rollCount > 0 && !store.state.turnCompleted) {
        this.mainButtonText = `Roll ${store.state.rollCount}`
      } else if (store.state.rollCount === 0 && !store.state.turnCompleted) {
        this.mainButtonText = 'SAVE'
        this.mainButtonDisabled = true
        button.classList.add('bounce')
      } else if (store.state.rollCount === 0 && store.state.turnCompleted) {
        this.mainButtonText = 'Turn'
        this.mainButtonDisabled = false
      } else {
        this.mainButtonText = 'Turn'
      }
    },
    updateMainButtonState () {
      let button = document.querySelector('.main-button')

      // this.mainButtonState.play = false
      if (this.getCurrentGameState.rollsCountForButton === 3 && !this.getCurrentGameState.turnCompleted) {
        this.mainButtonState.play = true
        // this.mainButtonState.roll = false
      } else if (!this.getCurrentGameState.turnCompleted && this.getCurrentGameState.rollsCountForButton <= 2) {
        // render three circles
        this.mainButtonState.play = false
        this.mainButtonState.roll = true
        // this.mainButtonText = `Roll ${store.state.rollCount}`
      } else if (this.getCurrentGameState.turnCompleted) {
        this.mainButtonState.roll = false
        this.mainButtonState.play = true
        this.mainButtonState.disabled = false
      } else if (store.state.rollCount === 0 && !this.getCurrentGameState.turnCompleted) {
        // this.mainButtonText = 'SAVE'
        this.mainButtonState.roll = false
        this.mainButtonState.play = false
        this.mainButtonState.save = true
        this.mainButtonState.disabled = true
        button.classList.add('bounce')
        console.log(`Bounce!`)
        /* else if (store.state.rollCount === 0 && store.state.turnCompleted) {
        this.mainButtonState.save = false
        this.mainButtonState.play = true
        this.mainButtonState.disabled = false
        // this.mainButtonDisabled = false
      } */
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
        // console.log(`Removing highlight from ->`)
        // console.log(this.currentlyHighlightedElement.nextSibling)
        this.currentlyHighlightedElement.nextElementSibling.classList.remove('highest-value')
        // let elementToRemove = document.querySelector('.highest-value')
        // elementToRemove.classList.remove('highest-value')
      } else {
        return false
      }
    },
    highlightHighestValue () {
      // highlight highest value onscreen
      this.removeCurrentHighlight()
      // this.currentlyHighlightedElement = null
      // console.log(`highlighting highest value`)
      // console.log(this.currentValuesInScoreArray)
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
      console.log(`Handle board click`)
      let idFound = false
      let scoreId = null
      // let scoreType = null
      let elementToCheck = event.target // .parentElement?
      while (!idFound && elementToCheck) {
        if (elementToCheck.classList.contains('school-dice-icon') ||
          elementToCheck.classList.contains('dice-icon') ||
          elementToCheck.classList.contains('game-combination')) {
          scoreId = elementToCheck.id
          // scoreType = 'school'
          idFound = true
        } else if (elementToCheck.classList.contains('school-result')) {
          scoreId = elementToCheck.getAttribute('resultId')
          idFound = true
        } else {
          elementToCheck = elementToCheck.parentElement
        }
      }
      /*
      if (elementToCheck.parentElement.classList.contains('school-dice-icon') || elementToCheck.classList.contains('school-result')) {
        scoreId = elementToCheck.getAttribute('resultId')
        // scoreType = 'school'
        idFound = true
      }
      */
      // console.log(idFound)
      // console.log(scoreId)
      // if (scoreId && scoreType) {
      if (scoreId) {
        // console.log(`Score id is: ${scoreId}`)
        // console.log(`Score type is: ${scoreType}`)
        // this.recordResult(scoreId, scoreType)
        this.recordResult(scoreId)
      }
    },
    handleDiceClick (element) {
      while (element) {
        if (element.classList.contains('dice-icon')) {
          // console.log(`Dice id to add -->`)
          // console.log(element.id)
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
      // console.log(`Select dice event target is -->`)
      // console.log(event.currentTarget.id)
      // let elementToAdd = this.handleDiceClick(event.target)
      let elementToAdd = event.currentTarget
      // store.commit('setDiceChosenState', elementToAdd.id)
      // console.log(`element to add is ${elementToAdd.id}`)
      let diceBox = document.querySelector('.dice-box')
      let resultBox = document.querySelector('.result-box')
      if (elementToAdd.parentElement === diceBox && !store.state.turnCompleted) {
        // console.log(`Selecting dice`)
        // let transferElement =
        diceBox.removeChild(elementToAdd) // dice-container
        resultBox.appendChild(elementToAdd)
        store.commit('setDiceChosenState', elementToAdd.id)
        store.commit('computeScore')
      } else if (elementToAdd.parentElement === resultBox) {
        // console.log(`Deselecting dice`)
        resultBox.removeChild(elementToAdd)
        diceBox.appendChild(elementToAdd) // dice-container
        store.commit('setDiceChosenState', elementToAdd.id)
        store.commit('computeScore')
      }
      // let diceContainer = elementToAdd.parentElement
      // store.commit('computeScore')
      /*
      for (let key in store.state.diceArray) {
        if (store.state.diceArray[key].id === elementToAdd.id) {
          store.state.diceArray[key].chosen = true
          store.state.combinationArray.push(store.state.diceArray[key].value)
          store.commit('computeScore')
        }
      }
      */
      // this.highlightHighestValue()
    },
    deSelectDice (event) {
      let elementToRemove = this.handleDiceClick(event.target)
      // console.log(`element to add is ${elementToAdd}`)
      let diceBox = document.querySelector('.dice-box')
      let resultBox = document.querySelector('.result-box')
      /*
      if (event.target === diceBox) {
        return false
      }
      */
      if (elementToRemove && !store.state.turnCompleted) {
        // let diceContainer = elementToAdd.parentElement
        // dice-container
        resultBox.removeChild(elementToRemove)
        diceBox.appendChild(elementToRemove)
      }
      /*
      // let elementToRemove = this.handleDiceClick(event.target)
      // elementToRemove.classList.remove('slideInRight')
      // elementToRemove.classList.add('zoomIn')
      let diceBox = document.querySelector('.dice-box')
      let resultBox = document.querySelector('.result-box')
      /*
      if (event.target === resultBox) {
        return false
      }
      */
      // store.state.combinationArray.splice(store.state.combinationArray.findIndex(item => item === store.state.diceArray[key].value), 1)
      /*
      if (elementToRemove && !store.state.turnCompleted) {
        let diceContainer = elementToRemove.parentElement
        resultBox.removeChild(diceContainer)
        diceBox.appendChild(diceContainer)
        // store.state.combinationArray.splice(store.state.combinationArray.findIndex(item => item === store.state.diceArray[key].value), 1)
        for (let key in store.state.diceArray) {
          if (store.state.diceArray[key].id === elementToRemove.id) {
            store.state.diceArray[key].chosen = false
            let value = store.state.diceArray[key].value
            let indexToRemove = store.state.combinationArray.indexOf(value)
            store.state.combinationArray.splice(indexToRemove, 1)
          }
        }
      } */
      // store.commit('computeScore')
      // this.highlightHighestValue()
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
      // console.log(`Game turn # ${store.state.gameTurns}`)
      // let resultType = type
      let combinationId = id
      const combinationIndexInArray = store.state.scoreArray.map(dice => dice.id).indexOf(combinationId)
      if (!store.state.schoolCompleted && store.state.scoreArray[combinationIndexInArray].value !== '' && !store.state.turnCompleted && !store.state.scoreArray[combinationIndexInArray].final) {
        store.state.scoreArray[combinationIndexInArray].final = true
        store.state.schoolScoreTotal += store.state.scoreArray[combinationIndexInArray].value
        store.state.turnCompleted = true
        let resultParagraph = document.getElementById(combinationId)
        resultParagraph.lastElementChild.classList.remove('blink')
        resultParagraph.classList.add('saved')
        // resultParagraph.nextElementSibling.classList.remove('blink')
        // resultParagraph.nextElementSibling.classList.add('saved')
        // set school completed to display game score on the board
        if (store.state.gameTurns === 6) {
          store.state.schoolCompleted = true
        }
        this.clearResultBox()
        this.updateMainButtonState()
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
        this.updateMainButtonState()
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
          this.updateMainButtonState()
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
        // store.state.endGameMenu = true
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
        store.commit('nextTurn')
        this.updateProgressBar()
      }
      this.updateMainButtonState()
    } // end of record result method
    /*
    recordResult (id) {
      // console.log(`Game turn # ${store.state.gameTurns}`)
      // let resultType = type
      let combinationId = id
      const combinationIndexInArray = store.state.scoreArray.map(dice => dice.id).indexOf(combinationId)
      if (resultType === 'school' && store.state.scoreArray[combinationIndexInArray].value !== '' && !store.state.turnCompleted && !store.state.scoreArray[combinationIndexInArray].final) {
        store.state.scoreArray[combinationIndexInArray].final = true
        store.state.schoolScoreTotal += store.state.scoreArray[combinationIndexInArray].value
        store.state.turnCompleted = true
        let resultParagraph = document.getElementById(combinationId)
        resultParagraph.lastElementChild.classList.remove('blink')
        resultParagraph.classList.add('saved')
        // resultParagraph.nextElementSibling.classList.remove('blink')
        // resultParagraph.nextElementSibling.classList.add('saved')
        // set school completed to display game score on the board
        if (store.state.gameTurns === 6) {
          store.state.schoolCompleted = true
        }
        this.clearResultBox()
        this.updateMainButtonState()
        this.removeCurrentHighlight()
      } else if (resultType === 'game' && store.state.scoreArray[combinationIndexInArray].value !== '' && store.state.scoreArray[combinationIndexInArray].displayValues.length < 3 && !store.state.turnCompleted) {
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
        this.updateMainButtonState()
        this.removeCurrentHighlight()
      } else if (!store.state.turnCompleted && store.state.scoreArray[combinationIndexInArray].value === '' && !store.state.scoreArray[combinationIndexInArray].final && store.state.schoolCompleted && store.state.rollCount === 0 && !store.state.zeroCheck) {
        // if there is no combination to record user can mark one field per turn as cancelled
        // and it won't be used to calculate score
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length < 3) {
          store.state.scoreArray[combinationIndexInArray].displayValues.push(0)
          // zero saved during this turn
          store.state.zeroCheck = true
          this.clearResultBox()
          this.updateMainButtonState()
          this.removeCurrentHighlight()
          store.state.turnCompleted = true
        }
        // check if it is full
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
          store.state.scoreArray[combinationIndexInArray].final = true
        }
      } else {
        // console.log(`Nothing to record!`)
        return false
      }
      // last checks after recording or not recording result
      if (store.state.gameTurns === 33 && store.state.turnCompleted) {
        // console.log(`Game Over!`)
        let score = store.state.schoolScoreTotal + store.state.gameTotal
        // store.state.endGameMenu = true
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
        store.commit('nextTurn')
        this.updateProgressBar()
      }
    }, // end of record result method
    */
  } // end of methods
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/index.scss";
@import "../../node_modules/animate.css/animate.css";
// @import "../assets/scss/vars/colors.scss";

.complete {
  background-color: $color-pale-primary;
}

.result {
  padding: 0em .2em 0em .2em;
  // color: $color-light-gray;
  color: $color-primary-2;
  width: 2em;
  font-size: 1.2em;
  cursor: pointer;
}
.result:hover {
  background-color: $color-pale-primary;
}
.saved {
  color: $color-orange;
}

.dice-container {
  // width: 20%;
  padding: 0em .4em 0em .4em;
}

.faded { // horizontal ruler
  border: 0;
  height: 0.065em;
  background-image: linear-gradient(to right, hsla(0, 0%, 65%, 0), hsla(0, 0%, 65%, 0.75), hsla(0, 0%, 65%, 0));
}

.result-box-border-hidden {
  border: 0;
}

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

.progress-bar {
  // border: 1px solid red;
  background-color: $color-primary-0;
  box-shadow: 0px 1px 10px 0px $color-primary-4;
  height: .2em;
  width: 0%;
  transition: width 1.75s;
}

.full { //progress bar
  background-color: #AA3838;
  box-shadow: 0px 1px 10px 0px red;
}

.highest-value {
  color: $color-very-red;
  text-shadow: 0px 0px 15px $color-very-red-transparent;
}
// new

#gameView {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.school {
  display: flex;
  justify-content: space-around;
  width: 100%;
  color: $color-primary-2;
  font-weight: 700;
  div {
    flex-grow: 1;
    flex-basis: 0;
    text-align: center;
    height: 1em;
  }
}
.game {
  display: flex;
  flex-direction: column;
  color: $color-primary-2;
  font-weight: 700;
  // border: 1px solid green;
}

.dice-box-container {
  display: flex;
  width: 100%;
  transition: all .7s;
  transition-timing-function: linear;
  // transition: opacity 3s;
  opacity: 1;
  z-index: 1;
  // padding-left: .3em;
  // border: 1px dotted red;
}

.dice-controls {
  display: flex;
  flex-direction: row;
  // padding-left: .2em; // change svg viewport
  // border: 1px solid pink;
}

.dice-box, .result-box {
  display: flex;
  align-items: center;
  // border: 1px dotted green;
  div {
    display: flex;
    align-items: center;
  }
}

.hidden {
  // visibility: hidden;
  // display: none;
  width: 0%;
  opacity: 0;
}

.padding {
  padding-left: 0em;
}

.main-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // padding-bottom: .175em;
  margin: 0em .3em 0em .3em;
  color: $color-light;
  border-radius: .4em;
  background-color: $color-primary-0;
  width: 100%;
  // transition: width 1s;
  // transition-timing-function: ease-out;
  z-index: 2;
}

.play-arrow-right {
  // width: 0;
  // height: 0;
  border-top: .75em solid transparent;
  border-bottom: .75em solid transparent;
  border-left: 1.25em solid $color-primary-1;
}
.circle-container {
  display: flex;
  // width: 100%;
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
  width: 3em;
  height: 1.25em;
  margin: .2em;
  background: $color-light;
  box-shadow: 0px 0px .4em .05em $color-light;
}
.save {
  color: $color-light;
  background-color: $color-very-red;
  box-shadow: 0px 0px 6px $color-very-red;
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
.game-combination {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: .1em 0em .1em 0em;
  padding: .3em;
  transition: all 1s;
  // border: 1px solid blue;
}

.game-combination-name {
  width: 60%;
}

.game-result {
  flex-grow: 1;
  text-align: center;
  // border: 1px solid yellow;
  color: $color-orange;
}

@media screen and (max-width: 40em) { // nokia 5
  .school {
    // border: 1px solid green;
    svg {
      width: 3em;
      height: 3em;
    }
    div {
      font-size: 1.4em;
    }
  }
  .game {
    div {
      font-size: 1.3em;
    }
  }
  .dice-controls {
    svg {
      width: 3em;
      height: 3em;
    }
    margin: 1em 0em 1em 0em;
  }
}

@media screen and (max-width: 20em) { // fly iq4415 (
    .school {
      border: 1px solid pink;
      margin-top: .3em;
    svg {
      width: 2em;
      height: 2em;
    }
    div {
      font-size: 1em;
    }
  }
  .game {
    div {
      font-size: .9em;
    }
  }
  .dice-controls {
    margin: 0em;
    svg {
      width: 1.8em;
      height: 1.8em;
    }
    margin: 1em 0em 1em 0em;
  }
}
</style>
