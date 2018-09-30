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
    <div class="new-game" v-on:click="handleBoardClick">
      <div class="new-game-combination" v-for="combination in this.getCombinationArray" :key="combination.id" v-bind:id="combination.id">
        <p class="new-game-combination-name">{{ combination.fullName }}</p>
        <p class="new-game-result" v-if="combination.value">
          {{ combination.value }}
        </p>
        <p class="new-game-result" v-for="index in combination.displayValues" :key="index">
          {{ index }}
        </p>
      </div>
    </div>

  <div class="dice-box-container">
    <div class="result-box" v-bind:class="{ hidden:$store.state.turnCompleted, border: $store.state.combinationArray.length >= 1 }" v-on:click="deSelectDice"></div>
    <div class="dice-box"  v-on:click="selectDice" v-bind:class="{ hidden:$store.state.turnCompleted }">

      <div class="dice-container">
        <svg class="dice-icon" id="first" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
          <use v-if="$store.state.diceArray[0].value === '#'" xlink:href="#diceOnesSelected" />
          <use v-if="$store.state.diceArray[0].value === 1" xlink:href="#diceOnes" />
          <use v-if="$store.state.diceArray[0].value === 2" xlink:href="#diceTwos" />
          <use v-if="$store.state.diceArray[0].value === 3" xlink:href="#diceThrees" />
          <use v-if="$store.state.diceArray[0].value === 4" xlink:href="#diceFours" />
          <use v-if="$store.state.diceArray[0].value === 5" xlink:href="#diceFives" />
          <use v-if="$store.state.diceArray[0].value === 6" xlink:href="#diceSixes" />
        </svg>
      </div>

      <div class="dice-container">
        <svg class="dice-icon" id="second" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
          <use v-if="$store.state.diceArray[1].value === '#'" xlink:href="#diceOnesSelected" />
          <use v-if="$store.state.diceArray[1].value === 1" xlink:href="#diceOnes" />
          <use v-if="$store.state.diceArray[1].value === 2" xlink:href="#diceTwos" />
          <use v-if="$store.state.diceArray[1].value === 3" xlink:href="#diceThrees" />
          <use v-if="$store.state.diceArray[1].value === 4" xlink:href="#diceFours" />
          <use v-if="$store.state.diceArray[1].value === 5" xlink:href="#diceFives" />
          <use v-if="$store.state.diceArray[1].value === 6" xlink:href="#diceSixes" />
        </svg>
      </div>

      <div class="dice-container">
        <svg class="dice-icon" id="third" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
          <use v-if="$store.state.diceArray[2].value === '#'" xlink:href="#diceOnesSelected" />
          <use v-if="$store.state.diceArray[2].value === 1" xlink:href="#diceOnes" />
          <use v-if="$store.state.diceArray[2].value === 2" xlink:href="#diceTwos" />
          <use v-if="$store.state.diceArray[2].value === 3" xlink:href="#diceThrees" />
          <use v-if="$store.state.diceArray[2].value === 4" xlink:href="#diceFours" />
          <use v-if="$store.state.diceArray[2].value === 5" xlink:href="#diceFives" />
          <use v-if="$store.state.diceArray[2].value === 6" xlink:href="#diceSixes" />
        </svg>
      </div>

      <div class="dice-container">
        <svg class="dice-icon" id="fourth" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
          <use v-if="$store.state.diceArray[3].value === '#'" xlink:href="#diceOnesSelected" />
          <use v-if="$store.state.diceArray[3].value === 1" xlink:href="#diceOnes" />
          <use v-if="$store.state.diceArray[3].value === 2" xlink:href="#diceTwos" />
          <use v-if="$store.state.diceArray[3].value === 3" xlink:href="#diceThrees" />
          <use v-if="$store.state.diceArray[3].value === 4" xlink:href="#diceFours" />
          <use v-if="$store.state.diceArray[3].value === 5" xlink:href="#diceFives" />
          <use v-if="$store.state.diceArray[3].value === 6" xlink:href="#diceSixes" />
        </svg>
      </div>

      <div class="dice-container">
        <svg class="dice-icon" id="fifth" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
          <use v-if="$store.state.diceArray[4].value === '#'" xlink:href="#diceOnesSelected" />
          <use v-if="$store.state.diceArray[4].value === 1" xlink:href="#diceOnes" />
          <use v-if="$store.state.diceArray[4].value === 2" xlink:href="#diceTwos" />
          <use v-if="$store.state.diceArray[4].value === 3" xlink:href="#diceThrees" />
          <use v-if="$store.state.diceArray[4].value === 4" xlink:href="#diceFours" />
          <use v-if="$store.state.diceArray[4].value === 5" xlink:href="#diceFives" />
          <use v-if="$store.state.diceArray[4].value === 6" xlink:href="#diceSixes" />
        </svg>
      </div>

    </div> <!-- End of dice-box-->
    <div class="main-button animated" v-on:click="handleMainGameButton" v-bind:class="{ disabled:mainButtonDisabled }">{{ mainButtonText }}</div>
  </div> <!-- End of dice box container -->
  <div class="progress-bar"></div>
    <!-- SVG icons defs -->
    <!-- Default icons -->
    <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="diceOnes" viewBox="0 0 220 220">
        <circle fill="currentColor" cx="100" cy="100" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceTwos" viewBox="0 0 220 220">
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceThrees" class="dice" viewBox="0 0 220 220">
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="100" cy="100" r="18"/>
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceFours" class="dice" viewBox="0 0 220 220">
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <circle fill="currentColor" cx="150" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceFives" class="dice" viewBox="0 0 220 220">
        <circle fill="currentColor" cx="100" cy="100" r="18"/>
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <circle fill="currentColor" cx="150" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceSixes" class="dice" viewBox="0 0 220 220">
        <circle fill="currentColor" cx="150" cy="100" r="18"/>
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <circle fill="currentColor" cx="150" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="100" r="18"/>
        <circle fill="currentColor" cx="50" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
    </svg>
    <!-- SVG icons end -->
  </div>
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
      highestScore: 0,
      registerForm: false,
      userExists: false,
      // loginButtonText: 'Change',
      // formValueName: '',
      mainButtonText: 'Start',
      mainButtonDisabled: false,
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
      'chosenDiceArray',
      'currentValuesInScoreArray',
      'getSchoolArray',
      'getCombinationArray'
    ])
  },
  mounted () {
    let highestScore = localStorage.getItem('highestScore')
    if (highestScore) {
      this.highestScore = highestScore
    }
    // let temp = this.getSchoolArray
    for (let value of this.getCombinationArray) {
      console.log(value.id)
    }
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
      'incrementIfOdd',
      'incrementAsync'
    ]),
    handleBoardClick (event) {
      console.log(`New SVG!`)
      let idFound = false
      let scoreId = null
      let scoreType = null
      let elementToCheck = event.target // .parentElement?

      if (elementToCheck.classList.contains('school-dice-icon')) {
        scoreId = elementToCheck.id
        scoreType = 'school'
        idFound = true
      }
      if (elementToCheck.parentElement.classList.contains('school-dice-icon') || elementToCheck.classList.contains('school-result')) {
        scoreId = elementToCheck.getAttribute('resultId')
        scoreType = 'school'
        idFound = true
      }
      if (elementToCheck.classList.contains('game-combination')) {
        scoreId = elementToCheck.id
        scoreType = 'game'
        idFound = true
      }
      if (elementToCheck.parentElement.classList.contains('new-game-combination')) {
        scoreId = elementToCheck.parentElement.id
        scoreType = 'game'
        idFound = true
      }
      // if ()
      /*
      if (elementToCheck)
      while (!idFound && elementToCheck) {
        if (!elementToCheck.getAttribute('id')) {
          // console.log(`testing xor`)
          // console.log(`Attribute is: ${elementToCheck.getAttribute('id')}`)
          // console.log(`ClassList is: ${elementToCheck.classList.contains('school-dice-icon')}`)
          scoreId = elementToCheck.getAttribute('resultId')
          scoreType = elementToCheck.parentElement.className
          idFound = true
        } else if (elementToCheck.classList.contains('label')) {
          scoreId = elementToCheck.id
          scoreType = elementToCheck.parentElement.className
          idFound = true
        } else if (elementToCheck.classList.contains('result')) {
          scoreId = elementToCheck.parentElement.firstChild.id
          scoreType = elementToCheck.parentElement.className
          idFound = true
        } else {
          elementToCheck = elementToCheck.parentElement
        }
        if (!elementToCheck) {
          return false
        }
      } */
      console.log(idFound)
      if (scoreId && scoreType) {
        // console.log(`Score id is: ${scoreId}`)
        // console.log(`Score type is: ${scoreType}`)
        this.recordResult(scoreId, scoreType)
      }
    },
    handleMainGameButton () {
      if (store.state.rollCount > 0 && !store.state.turnCompleted) {
        store.commit('rollDice')
        this.updateProgressBar()
      } else if (store.state.turnCompleted) {
        this.clearResultBox()
      } else {
        console.log(`Record something!`)
      }
      this.updateMainButtonState()
    },
    updateMainButtonState () {
      let button = document.querySelector('.main-button')
      // button.classList.remove('bounce')
      if (store.state.gameTurns === 1 && store.state.rollCount === 3) {
        this.mainButtonText = 'Start'
      } else if (store.state.rollCount > 0 && !store.state.turnCompleted) {
        this.mainButtonText = `Roll ${store.state.rollCount}`
      } else if (store.state.rollCount === 0 && !store.state.turnCompleted) {
        this.mainButtonText = 'SAVE'
        this.mainButtonDisabled = true
        button.classList.add('bounce')
      } else {
        this.mainButtonText = 'Turn'
        this.mainButtonDisabled = false
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
    handleBoardClickOld (event) {
      let idFound = false
      let scoreId = null
      let scoreType = null
      let elementToCheck = event.target // .parentElement
      while (!idFound && elementToCheck) {
        if (elementToCheck.classList.contains('combination')) {
          scoreId = elementToCheck.firstChild.id
          scoreType = elementToCheck.parentElement.className
          idFound = true
        } else if (elementToCheck.classList.contains('label')) {
          scoreId = elementToCheck.id
          scoreType = elementToCheck.parentElement.className
          idFound = true
        } else if (elementToCheck.classList.contains('result')) {
          scoreId = elementToCheck.parentElement.firstChild.id
          scoreType = elementToCheck.parentElement.className
          idFound = true
        } else {
          elementToCheck = elementToCheck.parentElement
        }
        if (!elementToCheck) {
          return false
        }
      }
      if (scoreId && scoreType) {
        this.recordResult(scoreId, scoreType)
      }
    },
    handleDiceClick (element) {
      // console.log(`Inside element to add`)
      // console.log(`Given element is ->`)
      // console.dir(element)
      // console.log(`Element classList ->>`)
      // console.log(element.classList)
      // if (element) {
      // let elementToCheck = element.parentElement
      // let diceFound = false
      while (/* !diceFound && */ element) {
        if (element.classList.contains('dice-icon')) {
          // diceFound = true
          // console.log(`Dice id to add -->`)
          // console.log(element.id)
          return element
        } else {
          element = element.parentElement
          this.handleDiceClick(element)
        }
      }
      /*
      } else {
        // console.log(`Click harder`)
        return false
      }
      */
    },
    selectDice (event) {
      // console.log(`Event target is -->`)
      // console.log(event.currentTarget)
      let elementToAdd = this.handleDiceClick(event.target)
      /*
      if (elementToAdd) {
        console.log(elementToAdd.id)
      } else {
        console.log(`No id found`)
      }
      */
      // elementToAdd.classList.remove('slideOutRight')
      // elementToAdd.classList.add('zoomIn')
      // console.log(`Inside select dice`)
      // console.log(elementToAdd.id)

      let diceBox = document.querySelector('.dice-box')
      let resultBox = document.querySelector('.result-box')
      /*
      if (event.target === diceBox) {
        return false
      }
      */
      if (elementToAdd && !store.state.turnCompleted) {
        let diceContainer = elementToAdd.parentElement
        diceBox.removeChild(diceContainer) // dice-container
        resultBox.appendChild(diceContainer)
      }
      for (let key in store.state.diceArray) {
        if (store.state.diceArray[key].id === elementToAdd.id) {
          store.state.diceArray[key].chosen = true
          store.state.combinationArray.push(store.state.diceArray[key].value)
          store.commit('computeScore')
        }
      }
      // this.highlightHighestValue()
    },
    deSelectDice (event) {
      let elementToRemove = this.handleDiceClick(event.target)
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
      }
      store.commit('computeScore')
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
    recordResult (id, type) {
      // console.log(`Game turn # ${store.state.gameTurns}`)
      let resultType = type
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
    } // end of record result method
  } // end of methods
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/index.scss";
@import "../../node_modules/animate.css/animate.css";
// @import "../assets/scss/vars/colors.scss";

#gameView {
  // display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.school {
  display: flex;
  width: 100%;
  height: auto;
  padding-top: .3em;
  color: $color-primary-0;
  font-weight: 700;
  // border: 1px solid lime;
  div {
    flex-grow: 1;
    flex-basis: 0;
    text-align: center;
  }
}

/*
.game-table {
  display: flex;
  flex-direction: column;
  // padding: 0em 1em 0em 1em;
}
*/
.game {
  display: flex;
  width: auto;
  flex-direction: column;
  margin-top: .5em;
  padding: 0em .3em 0em .3em;
}

.game-combination {
  display: flex;
  p {
    display: inherit;
    align-items: center;
    justify-content: center;
    // margin: .1em 0em .1em 0em;
  }
  .label {
  color: $color-primary-0;
  font-size: 1.2em;
  width: 9em;
  justify-content: flex-start;
  // padding: .3em;
  cursor: pointer;
  }
  .result {
    flex-grow: 1;
  }
}

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

.dice-box-container {
  display: flex;
  flex-direction: row;
  width:100%;
  // margin-top: 1em;
  padding: .5em .3em .3em .3em;
  // border: 1px dotted red;
}
.dice-box, .result-box {
  display: flex;
  justify-content: center;
  // height: 3em;
  // border: 1px solid red;
  // width: 100%;
  // align-content: center;
  // align-items: center;
  // padding-top: .15em;
}

.dice-container {
  // width: 20%;
  padding: 0em .4em 0em .4em;
}

.main-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: .1em;
  // height: 2.15em;
  color: $color-light;
  // font-size: 1.1em;
  // padding: .3em;
  border-radius: .3em;
  background-color: $color-primary-0;
  // margin-left: auto; //!
  transition: background-color 1.75s;
}

.main-button:hover {
  box-shadow: 0px 0px 6px $color-primary-0;
}

.disabled {
  color: $color-light;
  background-color: $color-very-red;
  box-shadow: 0px 0px 6px $color-very-red;
}

.border {
  border-right: .2em solid orange;
}

.blink {
  animation: blinker 2.5s linear infinite;
}
@keyframes blinker {
  50% {
    opacity: .2;
  }
}

.faded { // horizontal ruler
  border: 0;
  height: 0.065em;
  background-image: linear-gradient(to right, hsla(0, 0%, 65%, 0), hsla(0, 0%, 65%, 0.75), hsla(0, 0%, 65%, 0));
}

.hidden {
  visibility: hidden;
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

.full {
  background-color: #AA3838;
  box-shadow: 0px 1px 10px 0px red;
}

.highest-value {
  color: $color-very-red;
  text-shadow: 0px 0px 15px $color-very-red-transparent;
}

@media only screen and (-webkit-min-device-pixel-ratio: 1.6) {
    .game-table {
      // padding: 0em 1em 0em 1em;
      // border: 1px solid red;
    }
    .school {
      // margin-top: 1em;
    }
    .school-results {
      padding: 0;
      // border: 1px solid red;
    }
    .game-combination {
      // margin-top: .2em;
    }
    .dice-box-container {
      // border: 1px solid green;
    }
    .main-button {
      // font-size: 1.5em;
    }
// .dice-icon {
  /* padding-bottom: 97%; */
  /* height: 1px; */
  /* overflow: visible; */
// }
}
.new-game{
  display: flex;
  flex-direction: column;
  // flex-basis: 0;
  // border: 1px solid green;
}
.new-game-combination {
  display: flex;
  flex-direction: row;
  // border: 1px solid blue;
}
.new-game-combination-name {
  // border: 1px solid orangered;
  flex-grow: 3;
  flex-basis: 0;
}
.new-game-result {
  flex-grow: 1;
  flex-basis: 0;
  text-align: center;
  // border: 1px solid yellow;
  color: red;
  font-size: 1.4em;
}
</style>
