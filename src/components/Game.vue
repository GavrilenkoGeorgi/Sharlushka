<template>
<div id="gameView">
  <div v-if="$store.state.startMenu" class="startMenu">
    <p class="gameName">Sharlushka</p>
    <img class="startPageDice" src="../assets/icons/startPageDice.svg" alt="Start page dice">
    <div class="buttonBox">
      <button class="menuButton" v-on:click="$store.state.startMenu = false">Play</button>
      <button class="menuButton">Login</button>
    </div>
    <div class="iconLicense">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
    </div>
  </div>
  <Navigation />
    <div class="school" v-on:click="recordResult">
      <div class="combination">
        <p id="ones" class="diceIcon" v-bind:class="{ active:$store.state.scoreArray[0].final }">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[0].value }}</p>
      </div>

      <div class="combination">
        <p id="twos" class="diceIcon" v-bind:class="{ active:$store.state.scoreArray[1].final }">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[1].value }}</p>
      </div>

      <div class="combination">
        <p id="threes" class="diceIcon" v-bind:class="{ active:$store.state.scoreArray[2].final }">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[2].value }}</p>
      </div>

      <div class="combination">
        <p id="fours" class="diceIcon" v-bind:class="{ active:$store.state.scoreArray[3].final }">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[3].value }}</p>
      </div>

      <div class="combination">
        <p id="fives" class="diceIcon" v-bind:class="{ active:$store.state.scoreArray[4].final }">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[4].value }}</p>
      </div>

      <div class="combination">
        <p id="sixes" class="diceIcon" v-bind:class="{ active:$store.state.scoreArray[5].final }">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="100" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[5].value }}</p>
      </div>
    </div>
        <hr class="faded" />
    <div class="gameTable">
    <div class="game" v-on:click="recordResult">

      <div class="gameCombination" v-bind:class="{ complete:$store.state.scoreArray[6].final }">
        <p id="pair" class="label">Pair</p>
        <p v-for="(value, index) in $store.state.scoreArray[6].displayValues" :key="index" class="result saved">
          {{ value }}
        </p>
        <p v-if="$store.state.scoreArray[6].value" class="result blink">{{ $store.state.scoreArray[6].value }}</p>
      </div>

      <div class="gameCombination" v-bind:class="{ complete:$store.state.scoreArray[7].final }">
        <p id="twoPairs" class="label">Two Pairs</p>
        <p v-for="(value, index) in $store.state.scoreArray[7].displayValues" :key="index" class="result saved">
          {{ value }}
        </p>
        <p v-if="$store.state.scoreArray[7].value" class="result blink">{{ $store.state.scoreArray[7].value }}</p>
      </div>

      <div class="gameCombination" v-bind:class="{ complete:$store.state.scoreArray[8].final }">
        <p id="threeOfAKind" class="label">Three Of A Kind</p>
        <p v-for="(value, index) in $store.state.scoreArray[8].displayValues" :key="index" class="result saved">
          {{ value }}
        </p>
        <p v-if="$store.state.scoreArray[8].value" class="result blink">{{ $store.state.scoreArray[8].value }}</p>
      </div>

      <div class="gameCombination" v-bind:class="{ complete:$store.state.scoreArray[9].final }">
        <p id="full" class="label">Full</p>
        <p v-for="(value, index) in $store.state.scoreArray[9].displayValues" :key="index" class="result saved">
          {{ value }}
        </p>
        <p v-if="$store.state.scoreArray[9].value" class="result blink">{{ $store.state.scoreArray[9].value }}</p>
      </div>

      <div class="gameCombination" v-bind:class="{ complete:$store.state.scoreArray[10].final }">
        <p id="quads" class="label">Quads</p>
        <p v-for="(value, index) in $store.state.scoreArray[10].displayValues" :key="index" class="result saved">
          {{ value }}
        </p>
        <p v-if="$store.state.scoreArray[10].value" class="result blink">{{ $store.state.scoreArray[10].value }}</p>
      </div>

      <div class="gameCombination" v-bind:class="{ complete:$store.state.scoreArray[11].final }">
        <p id="poker" class="label">Poker</p>
        <p v-for="(value, index) in $store.state.scoreArray[11].displayValues" :key="index" class="result saved">
          {{ value }}
        </p>
        <p v-if="$store.state.scoreArray[11].value" class="result blink">{{ $store.state.scoreArray[11].value }}</p>
      </div>

      <div class="gameCombination" v-bind:class="{ complete:$store.state.scoreArray[12].final }">
        <p id="small" class="label">Small</p>
        <p v-for="(value, index) in $store.state.scoreArray[12].displayValues" :key="index" class="result saved">
          {{ value }}
        </p>
        <p v-if="$store.state.scoreArray[12].value" class="result blink">{{ $store.state.scoreArray[12].value }}</p>
      </div>

      <div class="gameCombination" v-bind:class="{ complete:$store.state.scoreArray[13].final }">
        <p id="large" class="label">Large</p>
        <p v-for="(value, index) in $store.state.scoreArray[13].displayValues" :key="index" class="result saved">
          {{ value }}
        </p>
        <p v-if="$store.state.scoreArray[13].value" class="result blink">{{ $store.state.scoreArray[13].value }}</p>
      </div>

      <div class="gameCombination" v-bind:class="{ complete:$store.state.scoreArray[14].final }">
        <p id="chance" class="label">Chance</p>
        <p v-for="(value, index) in $store.state.scoreArray[14].displayValues" :key="index" class="result saved">
          {{ value }}
        </p>
        <p v-if="$store.state.scoreArray[14].value" class="result blink">{{ $store.state.scoreArray[14].value }}</p>
      </div>

  </div>
</div>
  <div class="resultBox" v-on:click="deSelectDice"></div>
    <div class="controls">
      <button class="gameButton" v-on:click="rollDice()" :disabled="$store.state.rollButtonDisabled == true" :class="{ disabledButton: $store.state.rollButtonDisabled == true}">Roll</button>
      <button class="gameButton" v-on:click="nextTurn(); clearResultBox()" :disabled="$store.state.nextTurnButtonDisabled == true" :class="{ disabledButton: $store.state.nextTurnButtonDisabled == true}">{{ $store.state.nextTurnButtonText}}</button>
    </div>
    <div class="diceBox"  v-on:click="selectDice">
      <!-- first dice -->
      <div class="dice" id="first">
        <div v-if="$store.state.diceArray[0].value === 1">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[0].value === 2">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[0].value === 3">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[0].value === 4">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[0].value === 5">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[0].value === 6">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="100" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
      </div>
      <!-- second dice -->
      <div class="dice" id="second">
        <div v-if="$store.state.diceArray[1].value === 1">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[1].value === 2">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[1].value === 3">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[1].value === 4">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[1].value === 5">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[1].value === 6">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="100" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
      </div>
      <!-- third dice -->
      <div class="dice" id="third">
        <div v-if="$store.state.diceArray[2].value === 1">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[2].value === 2">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[2].value === 3">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[2].value === 4">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[2].value === 5">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[2].value === 6">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="100" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
      </div>
      <!-- fourth dice -->
      <div class="dice" id="fourth">
        <div v-if="$store.state.diceArray[3].value === 1">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[3].value === 2">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[3].value === 3">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[3].value === 4">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[3].value === 5">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[3].value === 6">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="100" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
      </div>
      <!-- fifth dice -->
      <div class="dice" id="fifth">
        <div v-if="$store.state.diceArray[4].value === 1">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[4].value === 2">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[4].value === 3">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[4].value === 4">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[4].value === 5">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
        <div v-if="$store.state.diceArray[4].value === 6">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="150" cy="100" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <circle class="diceCircle" cx="150" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="50" cy="100" r="18"/>
            <circle class="diceCircle" cx="50" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="endGameMenu" v-if="$store.state.endGameMenu === true">
      <p>Game Over! <br/> Your score is {{ $store.state.schoolScoreTotal + $store.state.gameTotal }}</p>
      <div class="buttonBox">
        <button class="menuButton" v-on:click="restartGame">New game</button>
        <!--button class="menuButton" v-on:click="saveOrRegister">Save Result</button-->
      </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '../store/store'
import Navigation from '../components/Navigation'

export default {
  name: 'Game',
  components: {
    Navigation
  },
  computed: mapGetters([
    'evenOrOdd',
    'onesScore',
    'twosScore'
  ]),
  mounted () {
    // store.state.startMenu = true
    console.log(`Mounted game view`)
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
    selectDice (event) {
      let elementToAdd = event.target.closest('.dice')
      if (elementToAdd && elementToAdd.className === 'dice') {
        let diceBox = document.querySelector('.diceBox')
        let resultBox = document.querySelector('.resultBox')
        diceBox.removeChild(elementToAdd)
        resultBox.appendChild(elementToAdd)

        for (let key in store.state.diceArray) {
          if (store.state.diceArray[key].id === elementToAdd.id) {
            store.state.diceArray[key].chosen = true
            store.state.combinationArray.push(store.state.diceArray[key].value)
            store.commit('computeScore')
          }
        }
      }
    },
    deSelectDice (event) {
      let elementToRemove = event.target.closest('.dice')
      if (elementToRemove && elementToRemove.className === 'dice') {
        let diceBox = document.querySelector('.diceBox')
        let resultBox = document.querySelector('.resultBox')
        resultBox.removeChild(elementToRemove)
        diceBox.appendChild(elementToRemove)

        for (let key in store.state.diceArray) {
          if (store.state.diceArray[key].id === elementToRemove.id) {
            store.state.diceArray[key].chosen = false
            store.state.combinationArray.splice(store.state.combinationArray.findIndex(item => item === store.state.diceArray[key].value), 1)
            store.commit('computeScore')
          }
        }
      }
    },
    clearResultBox (event) {
      let diceBox = document.querySelector('.diceBox')
      let resultBox = document.querySelector('.resultBox')
      while (resultBox.childNodes.length) {
        diceBox.appendChild(resultBox.firstChild)
      }
      store.state.combinationArray = []
    },
    clearResultOnscreen () {
      for (let key in store.state.scoreArray) {
        // just trash it )))
        if (key < 6 && !store.state.scoreArray[key].final) {
          store.state.scoreArray[key].value = '' // school result structure have to be similar to game results
        } else if (key >= 6) {
          store.state.scoreArray[key].value = 0
        }
      }
    },
    recordResult (event) {
      let combinationId // get combination ID from click event
      // console.log(event.target.id)
      if (event.currentTarget.className === 'school') {
        let combinationParagraphNode = event.target.closest('.diceIcon')
        if (combinationParagraphNode) {
          combinationId = combinationParagraphNode.id
        }
      }
      if (event.target.className === 'result blink') {
        // console.log(event.target.parentNode)
        // let parent = event.target
        // let neededParagraph = clickedItem.closest('.label')
        // console.log(`Paragraph is ${neededParagraph}`)
        let combinationParagraphNode = event.target.parentNode.firstChild
        // console.log(`Combination paragraph node: ${combinationParagraphNode}`)
        // console.log(combinationParagraphNode)
        if (combinationParagraphNode) {
          combinationId = combinationParagraphNode.id
        }
      }
      if (event.target.className === 'label') {
        // console.log(event.target.className)
        // let combinationParagraphNode = event.target.firstChild
        // combinationId = combinationParagraphNode.id
        combinationId = event.target.id
      }
      // console.log(`Hi, am inside record result! combination id is: ${combinationId}`)
      if (combinationId && !store.state.turnCompleted) { // check if we get some combination ID from user click
        // if its not undefined get the index of ID in results array
        const combinationIndexInArray = store.state.scoreArray.map(dice => dice.id).indexOf(combinationId)
        if (store.state.scoreArray[combinationIndexInArray].value !== '' && !store.state.scoreArray[combinationIndexInArray].final) {
          // it is not empty and we can record some school result on click
          if (!store.state.schoolCompleted) { // record school result
            // set the final flag to true to record current value
            store.state.scoreArray[combinationIndexInArray].final = true
            store.state.schoolScoreTotal += store.state.scoreArray[combinationIndexInArray].value
            store.state.rollButtonDisabled = true
            store.state.nextTurnButtonDisabled = false
            store.state.turnCompleted = true
            let resultParagraph = document.getElementById(combinationId)
            resultParagraph.nextElementSibling.classList.remove('blink')
            resultParagraph.nextElementSibling.classList.add('saved')
            if (store.state.gameTurns === 6) {
              store.state.schoolCompleted = true
            }
          } else if (store.state.scoreArray[combinationIndexInArray].displayValues.length < 4 && !store.state.turnCompleted) {
            // we clicked on result field
            // user decided to save current selected result
            store.state.rollButtonDisabled = true
            store.state.nextTurnButtonDisabled = false
            store.state.turnCompleted = true
            // push result into display values array
            store.state.scoreArray[combinationIndexInArray].displayValues.push(store.state.scoreArray[combinationIndexInArray].value)

            // save current game score
            store.state.gameTotal += store.state.scoreArray[combinationIndexInArray].value
            if (store.state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
              store.state.scoreArray[combinationIndexInArray].final = true
              store.state.scoreArray[combinationIndexInArray].value = ''
            }
          }
        } else if (store.state.scoreArray[combinationIndexInArray].value === '' && store.state.schoolCompleted) {
          // console.log(`Trying to save zero.`)
          // if there is no combination to record user can mark one field per turn as cancelled
          // and it won't be used to calculate score
          // combinationId = event.target.id
          store.state.nextTurnButtonDisabled = false
          store.state.rollButtonDisabled = true
          store.state.turnCompleted = true
          if (store.state.scoreArray[combinationIndexInArray].displayValues.length < 3) {
            store.state.scoreArray[combinationIndexInArray].displayValues.push(0)
          }
          // check if it is full of zeroes
          if (store.state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
            store.state.scoreArray[combinationIndexInArray].final = true
          }
        } else {
          console.log(`Click harder! Combination ID is ${combinationId}.`)
        }
        if (store.state.gameTurns === store.state.maxGameTurns && store.state.turnCompleted) { // change this!
          // alert(`Game over, your score is ${store.state.schoolScoreTotal + store.state.gameTotal}`)
          store.state.nextTurnButtonDisabled = true
          store.state.endGameMenu = true
        }
        // clear results onscreen
        this.clearResultBox()
        this.clearResultOnscreen()
      }
      // not needed?
      /*
      function getAllBlinkinSiblings (element, parent) {
        const children = [...parent.children]
        return children.filter(child => child.classList.contains('blink'))
      } */
    }, // end of record result method
    restartGame (state) {
      store.commit('resetState')
      store.state.startMenu = false
    },
    addResultOnScreen () {
      console.log(`Adding result`)
    }/* ,
    startNewGame (state) {
        Object.assign(state, initialState);
    } */
  }, // end of methods
  data () {
    return {
      title: 'Sharlushka'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/index.scss";
@import "../assets/scss/vars/colors.scss";

#gameView {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 0em 0em 1em 0em;
}

.school {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0em 2em 0em 2em;
  height: 4em;
}
.gameTable {
  display: flex;
  flex-direction: column;
  padding: 0em 1em 0em 1em;
}
.game {
  display: flex;
  width: auto;
  flex-direction: column;
}
.school > .combination {
  width: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.gameCombination {
  display: flex;
  p {
    display: inherit;
    align-items: center;
    justify-content: center;
    margin: .1em 0em .1em 0em;
  }
  .label {
  color: $color-primary-0;
  font-size: 1.2em;
  width: 9em;
  justify-content: flex-start;
  padding: .3em;
  cursor: pointer;
  }
  .result {
    flex-grow: 1;
  }
}

.complete {
  background-color: $color-pale-primary;
}

.diceIcon:hover {
  cursor: pointer;
}

.schoolResult {
  margin: 0em;
  width: 100%;
  padding: .4em 0em 0em 0em;
  color: $color-light-gray;
  font-size: 1.2em;
  text-align: center;
}

.result {
  padding: 0em .3em 0em .3em;
  color: $color-light-gray;
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
.currentPlayerName {
  color: $color-primary-0;
}
.diceBox, .resultBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5em;
}
.dice {
  display: flex;
  margin-left: .4em;
  margin-right: .4em;
  height: auto;
  // animation: diceDisplay 1s linear;
}
@keyframes diceDisplay {
  0% {
    opacity: 0;
  }
}
.dice:hover {
  cursor: pointer;
}
.controls {
  display: flex;
  justify-content: space-around;
  padding: 0em .8em 0em .8em;
  margin: 0em 0em 1em 0em;
}
.gameButton, .menuButton {
  background: $color-primary-0;
  border: none;
  cursor: pointer;
  border-radius: .25em;
  font-size: 1.5em;
  color: $color-light;
  padding: .3em;
  width: 6em;
}
.menuButton {
  margin: 0em .3em 0em .3em;
}
.gameButton:hover, .menuButton:hover {
  box-shadow: 0px 0px 6px $color-primary-0;
}
.disabledButton {
  background: $color-light-gray;
  color: $color-primary-0;
  cursor: auto;
}
.disabledButton:hover {
  box-shadow: unset;
}
.blink {
  animation: blinker 2.5s linear infinite;
}
@keyframes blinker {
  50% {
    opacity: 0;
  }
}
.info {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  color: $color-primary-0;
}
.infoItem {
  text-align: center;
  margin: .5em .5em .5em .5em;
  width: 9em;
}
.oneMoreRollLeft {
  color: red;
}
.scoreNumDisplay {
  color:$color-orange;
  font-size: 1.1em;
}

// style for icons
.active svg > .diceSvg {
  stroke: $color-orange;
}
.active svg > .diceCircle {
  fill: $color-orange;
}
.resultBox svg > .diceSvg {
  stroke: $color-orange;
}
.resultBox svg > .diceCircle {
  fill: $color-orange;
}
.resultBox svg:hover > .diceSvg {
  stroke: $color-primary-0;
}
.resultBox svg:hover > .diceCircle {
  fill: $color-primary-0;
}
.diceSvg {
  fill: none;
  stroke: $color-primary-0;
  stroke-width: 10px;
  fill-rule: evenodd;
}
.diceCircle {
  fill: $color-primary-0;
}
svg:hover > .diceSvg {
  stroke: $color-orange;
}
svg:hover > .diceCircle {
  fill: $color-orange;
}

// end game menu
.endGameMenu {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100vh;
  background-color: $color-primary-transparent;
  color: $color-primary-0;
  p {
    color: white;
    font-size: 1.4em;
    text-align: center;
    line-height: 1.6em;
  }
  .buttonBox {
    display: inherit;
    flex-direction: row;
  }
  button {
    background-color: white;
    color: inherit;
  }
}

.faded { // horizontal ruler
  border: 0;
  height: 0.065em;
  background-image: linear-gradient(to right, hsla(0, 0%, 65%, 0), hsla(0, 0%, 65%, 0.75), hsla(0, 0%, 65%, 0));
}

// start menu styling

.startMenu {
  display: flex;
  position: absolute;
  background-color: white;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
}

.gameName {
  color: $color-primary-0;
  font-family: $game-name-font;
  font-size: 3.5em;
  margin-top: 1.5em;
}
.startPageDice {
  height: 13em;
}
.buttonBox {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.iconLicense {
  color: $color-primary-1;
  font-size: .6em;
  margin-bottom: 1em;
}
.iconLicense > a {
  color: $color-primary-1;
}
.iconLicense > a:hover {
  color: $color-orange;
}
</style>
