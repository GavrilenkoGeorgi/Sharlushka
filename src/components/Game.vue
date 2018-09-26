<template>
  <div id="gameView">
    <Navigation />
      <div class="school" v-on:click="handleBoardClick">
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
          <!--hr class="faded" /-->
      <div class="gameTable">
      <div class="game" v-on:click="handleBoardClick">

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
    <div class="dice-box-container">
      <div class="resultBox" v-bind:class="{ hidden:$store.state.turnCompleted, border: $store.state.combinationArray.length >= 1 }" v-on:click="deSelectDice"></div>
      <div class="diceBox"  v-on:click="selectDice" v-bind:class="{ hidden:$store.state.turnCompleted }">
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
      </div> <!--end if diceBox-->
      <div class="main-button" v-on:click="handleMainGameButton" v-bind:class="{ disabled:mainButtonDisabled }">{{ mainButtonText }}</div>
    </div>
    <!--div class="controls">
      <button class="gameButton" v-on:click="rollDice()" :disabled="$store.state.rollButtonDisabled == true" :class="{ disabledButton: $store.state.rollButtonDisabled == true}">Roll</button>
      <button class="gameButton" v-on:click="newTurnInit" :disabled="$store.state.nextTurnButtonDisabled == true" :class="{ disabledButton: $store.state.nextTurnButtonDisabled == true}">{{ $store.state.nextTurnButtonText}}</button>
    </div-->
    <div class="endGameMenu" v-if="$store.state.endGameMenu === true">
      <p>Game Over, {{ userName }}!<br/> Your score is {{ $store.state.schoolScoreTotal + $store.state.gameTotal }}</p>
      <p v-if="highestScore">Highest score is {{ highestScore }}</p>
      <div class="button-box">
        <button class="menuButton" v-on:click="restartGame">New game</button>
        <!--button class="menuButton" v-on:click="saveOrRegister">Save Result</button-->
      </div>
    </div>
      <!--div class="debug"><span class="output">Debug: {{debugInfo}}</span><br />
        <span>Dice 4 chosen: {{$store.state.diceArray[3].chosen}}</span><br />
        <span>Combination array: {{$store.state.combinationArray}}</span>
      </div-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '../store/store'
import Navigation from '../components/Navigation'

export default {
  name: 'Game',
  data () {
    return {
      title: 'Sharlushka',
      userName: '',
      highestScore: 0,
      registerForm: false,
      userExists: false,
      loginButtonText: 'Change',
      formValueName: '',
      mainButtonText: 'Start',
      mainButtonDisabled: false
    }
  },
  components: {
    Navigation
  },
  computed: mapGetters([
    'evenOrOdd',
    'onesScore',
    'debugInfo'
  ]),
  mounted () {
    let user = localStorage.getItem('userName')
    if (user) {
      this.userExists = true
      this.userName = user
      store.state.currentUserName = user
    }
    let highestScore = localStorage.getItem('highestScore')
    if (highestScore) {
      this.highestScore = highestScore
    }
    if (!this.userExists) {
      this.loginButtonText = 'New user'
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
      'incrementIfOdd',
      'incrementAsync'
    ]),
    handleMainGameButton () {
      if (store.state.rollCount > 0 && !store.state.turnCompleted) {
        store.commit('rollDice')
      } else if (store.state.turnCompleted) {
        this.clearResultBox()
      } else {
        console.log(`Record something!`)
      }
      this.updateMainButtonState()
    },
    updateMainButtonState () {
      if (store.state.gameTurns === 1 && store.state.rollCount === 3) {
        this.mainButtonText = 'Start'
      } else if (store.state.rollCount > 0 && !store.state.turnCompleted) {
        this.mainButtonText = `Roll ${store.state.rollCount}`
      } else if (store.state.rollCount === 0 && !store.state.turnCompleted) {
        this.mainButtonText = 'Rec!'
        this.mainButtonDisabled = true
      } else {
        this.mainButtonText = 'Turn'
        this.mainButtonDisabled = false
      }
    },
    parseDebug () {
      // console.log(`This debug info is currently: ${this.debugInfo}`)
    },
    buttonText () {
      if (!this.userExists) {
        this.loginButtonText = 'New user'
      }
    },
    formInputControl () {
      // toggles user name input
      if (this.registerForm) {
        this.registerForm = false
      } else {
        this.registerForm = true
      }
    },
    handleBoardClick (event) {
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
      let diceFound = false
      if (element) {
        let elementToCheck = element.parentElement
        while (!diceFound && elementToCheck) {
          if (elementToCheck.classList.contains('dice')) {
            diceFound = true
            return elementToCheck
          } else {
            elementToCheck = elementToCheck.parentElement
            this.handleDiceClick(elementToCheck)
          }
        }
      } else {
        return false
      }
    },
    selectDice (event) {
      let elementToAdd = this.handleDiceClick(event.target)
      let diceBox = document.querySelector('.diceBox')
      let resultBox = document.querySelector('.resultBox')
      if (event.target === diceBox) {
        return false
      }
      if (elementToAdd && !store.state.turnCompleted) {
        diceBox.removeChild(elementToAdd)
        resultBox.appendChild(elementToAdd)
      }
      for (let key in store.state.diceArray) {
        if (store.state.diceArray[key].id === elementToAdd.id) {
          store.state.diceArray[key].chosen = true
          store.state.combinationArray.push(store.state.diceArray[key].value)
          store.commit('computeScore')
        }
      }
    },
    deSelectDice (event) {
      let elementToRemove = this.handleDiceClick(event.target)
      let diceBox = document.querySelector('.diceBox')
      let resultBox = document.querySelector('.resultBox')
      if (event.target === resultBox) {
        return false
      }
      // store.state.combinationArray.splice(store.state.combinationArray.findIndex(item => item === store.state.diceArray[key].value), 1)
      if (elementToRemove && !store.state.turnCompleted) {
        resultBox.removeChild(elementToRemove)
        diceBox.appendChild(elementToRemove)
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
    },
    clearResultBox () {
      let diceBox = document.querySelector('.diceBox')
      let resultBox = document.querySelector('.resultBox')
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
      // console.log(`Clearing onscreen`)
      store.state.debug = true
    },
    recordResult (id, type) {
      console.log(`Game turn # ${store.state.gameTurns}`)
      let resultType = type
      let combinationId = id
      const combinationIndexInArray = store.state.scoreArray.map(dice => dice.id).indexOf(combinationId)
      if (resultType === 'school' && store.state.scoreArray[combinationIndexInArray].value !== '' && !store.state.turnCompleted && !store.state.scoreArray[combinationIndexInArray].final) {
        store.state.scoreArray[combinationIndexInArray].final = true
        store.state.schoolScoreTotal += store.state.scoreArray[combinationIndexInArray].value
        store.state.turnCompleted = true
        let resultParagraph = document.getElementById(combinationId)
        resultParagraph.nextElementSibling.classList.remove('blink')
        resultParagraph.nextElementSibling.classList.add('saved')
        // set school completed to display game score on the board
        if (store.state.gameTurns === 6) {
          store.state.schoolCompleted = true
        }
        this.clearResultBox()
        this.updateMainButtonState()
      } else if (resultType === 'gameCombination' && store.state.scoreArray[combinationIndexInArray].value !== '' && store.state.scoreArray[combinationIndexInArray].displayValues.length < 3 && !store.state.turnCompleted) {
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
      } else if (!store.state.turnCompleted && store.state.scoreArray[combinationIndexInArray].value === '' && !store.state.scoreArray[combinationIndexInArray].final && store.state.schoolCompleted && store.state.rollCount === 0 && !store.state.zeroCheck) {
        // if there is no combination to record user can mark one field per turn as cancelled
        // and it won't be used to calculate score
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length < 3) {
          store.state.scoreArray[combinationIndexInArray].displayValues.push(0)
          // zero saved during this turn
          store.state.zeroCheck = true
          this.clearResultBox()
          this.updateMainButtonState()
          store.state.turnCompleted = true
        }
        // check if it is full
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
          store.state.scoreArray[combinationIndexInArray].final = true
        }
      } else {
        console.log(`Nothing to record!`)
        return false
      }
      // last checks after recording or not recording result
      if (store.state.gameTurns === 33 && store.state.turnCompleted) {
        console.log(`Game Over!`)
        let score = store.state.schoolScoreTotal + store.state.gameTotal
        store.state.endGameMenu = true
        let highestScore = localStorage.getItem('highestScore')
        if (!highestScore) {
          // console.log(`Highest score not set, setting it for the first time`)
          localStorage.setItem('highestScore', score)
        } else if (score > highestScore) {
          localStorage.setItem('highestScore', score)
        } else {
          console.log(`Your score is not so high ${score}`)
        }
      } else {
        store.commit('nextTurn')
      }
    }, // end of record result method
    restartGame (state) {
      this.clearResultBox()
      this.userName = localStorage.getItem('userName')
      this.highestScore = localStorage.getItem('highestScore')
      // this.updateMainButtonState()
      store.commit('resetState')
      this.mainButtonText = 'Start'
      this.mainButtonDisabled = false
      // this.toggleBurger()
    }
  } // end of methods
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
  // padding: 0em 0em 1em 0em;
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

.schoolResult {
  margin: 0em;
  width: 100%;
  padding: .4em 0em 0em 0em;
  // color: $color-light-gray;
  color: $color-primary-2;
  font-size: 1.2em;
  text-align: center;
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
.currentPlayerName {
  color: $color-primary-0;
}

.dice-box-container {
  display: flex;
  flex-direction: row;
  // justify-content: center;
  // align-items: center;
  // border: 1px solid lime;
  // height: 2.3em;
  //margin-bottom: .3em;
  // align-self: flex-end;
  margin-top: 1em;
  padding: 0em .3em .3em .3em;
}
.diceBox, .resultBox {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding-top: .15em;
  // height: 2.5em;
  // border: 1px solid magenta;
}

.main-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4em;
  height: 2.15em;
  color: $color-light;
  font-size: 1.1em;
  padding: .3em;
  border-radius: .3em;
  background-color: $color-primary-0;
  margin-left: auto; //!
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

.dice {
  display: flex;
  margin-left: .4em;
  margin-right: .4em;
  // height: auto;
  // animation: diceDisplay 1s linear;
  // background-color: lime;
  // z-index: 1;
}

// .diceIcon {
  // background-color: lime;
  // z-index: 1;
// }

.diceIcon:hover {
  cursor: pointer;
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
    opacity: .2;
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

.resultBox svg > path {
  stroke: $color-orange;
}
.resultBox svg > circle {
  fill: $color-orange;
}
/*
.resultBox svg:hover > .diceSvg {
  stroke: $color-primary-0;
}
.resultBox svg:hover > .diceCircle {
  fill: $color-primary-0;
}
*/
.diceSvg {
  fill: none;
  stroke: $color-primary-0;
  stroke-width: 10px;
  fill-rule: evenodd;
}
.diceCircle {
  fill: $color-primary-0;
}
/*
svg:hover > .diceSvg {
  stroke: $color-orange;
}
svg:hover > .diceCircle {
  fill: $color-orange;
}
*/

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
  .button-box {
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

.startPageDice {
  height: 13em;
}
.button-box {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.iconLicense {
  color: $color-primary-1;
  font-size: .6em;
  margin-bottom: 1em;
  text-align: center;
}
.iconLicense > a {
  color: $color-primary-1;
}
.iconLicense > a:hover {
  color: $color-orange;
}

.greeting {
  color: $color-primary-0;
  font-size: 2em;
}

@media only screen and (max-width: 500px) , screen and (max-height: 300px) {
    // #gameView {
    // padding-bottom: .2em;
    // }
    .controls {
      margin-bottom: .3em;
    }
    .gameTable {
      padding: 0em .2em 0em .2em;
    }
    .schoolResult {
      padding: 0;
    }
    .gameButton {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 1.4em;
      // border: 1px solid red;
      width: 6em;
      height: auto;
    }
    .controls {
      padding: 0;
    }
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
}
</style>
