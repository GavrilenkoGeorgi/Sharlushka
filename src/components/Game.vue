<template>
  <div id="gameView">
    <Navigation />
    <div class="school" v-on:click="handleBoardClick">
      <figure id="ones" class="combination">
        <div class="dice-container">
            <svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
              <use v-if="$store.state.scoreArray[0].final" xlink:href="#diceOnesSelected" />
              <use v-else xlink:href="#diceOnes" />
            </svg>
        </div>
        <p class="school-result blink">{{ $store.state.scoreArray[0].value }}</p>
      </figure>
      <figure id="twos" class="combination">
        <div class="dice-container">
            <svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
              <use v-if="$store.state.scoreArray[1].final" xlink:href="#diceTwosSelected" />
              <use v-else xlink:href="#diceTwos" />
            </svg>
        </div>
        <p class="school-result blink">{{ $store.state.scoreArray[1].value }}</p>
      </figure>
      <figure id="threes" class="combination">
        <div class="dice-container">
            <svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
              <use v-if="$store.state.scoreArray[2].final" xlink:href="#diceThreesSelected" />
              <use v-else xlink:href="#diceThrees" />
            </svg>
        </div>
        <p class="school-result blink">{{ $store.state.scoreArray[2].value }}</p>
      </figure>
      <figure id="fours" class="combination">
        <div class="dice-container">
            <svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
              <use v-if="$store.state.scoreArray[3].final" xlink:href="#diceFoursSelected" />
              <use v-else xlink:href="#diceFours" />
            </svg>
        </div>
        <p class="school-result blink">{{ $store.state.scoreArray[3].value }}</p>
      </figure>
      <figure id="fives" class="combination">
        <div class="dice-container">
            <svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
              <use v-if="$store.state.scoreArray[4].final" xlink:href="#diceFivesSelected" />
              <use v-else xlink:href="#diceFives" />
            </svg>
        </div>
        <p class="school-result blink">{{ $store.state.scoreArray[4].value }}</p>
      </figure>
      <figure id="sixes" class="combination">
        <div class="dice-container">
            <svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
              <use v-if="$store.state.scoreArray[5].final" xlink:href="#diceSixesSelected" />
              <use v-else xlink:href="#diceSixes" />
            </svg>
        </div>
        <p class="school-result blink">{{ $store.state.scoreArray[5].value }}</p>
      </figure>
    </div>
    <!--hr class="faded" /-->
      <div class="game-table">
      <div class="game" v-on:click="handleBoardClick">

        <div class="game-combination" v-bind:class="{ complete:$store.state.scoreArray[6].final }">
          <p id="pair" class="label">Pair</p>
          <p v-for="(value, index) in $store.state.scoreArray[6].displayValues" :key="index" class="result saved">
            {{ value }}
          </p>
          <p v-if="$store.state.scoreArray[6].value" class="result blink">{{ $store.state.scoreArray[6].value }}</p>
        </div>

        <div class="game-combination" v-bind:class="{ complete:$store.state.scoreArray[7].final }">
          <p id="twoPairs" class="label">Two Pairs</p>
          <p v-for="(value, index) in $store.state.scoreArray[7].displayValues" :key="index" class="result saved">
            {{ value }}
          </p>
          <p v-if="$store.state.scoreArray[7].value" class="result blink">{{ $store.state.scoreArray[7].value }}</p>
        </div>

        <div class="game-combination" v-bind:class="{ complete:$store.state.scoreArray[8].final }">
          <p id="threeOfAKind" class="label">Three Of A Kind</p>
          <p v-for="(value, index) in $store.state.scoreArray[8].displayValues" :key="index" class="result saved">
            {{ value }}
          </p>
          <p v-if="$store.state.scoreArray[8].value" class="result blink">{{ $store.state.scoreArray[8].value }}</p>
        </div>

        <div class="game-combination" v-bind:class="{ complete:$store.state.scoreArray[9].final }">
          <p id="full" class="label">Full</p>
          <p v-for="(value, index) in $store.state.scoreArray[9].displayValues" :key="index" class="result saved">
            {{ value }}
          </p>
          <p v-if="$store.state.scoreArray[9].value" class="result blink">{{ $store.state.scoreArray[9].value }}</p>
        </div>

        <div class="game-combination" v-bind:class="{ complete:$store.state.scoreArray[10].final }">
          <p id="quads" class="label">Quads</p>
          <p v-for="(value, index) in $store.state.scoreArray[10].displayValues" :key="index" class="result saved">
            {{ value }}
          </p>
          <p v-if="$store.state.scoreArray[10].value" class="result blink">{{ $store.state.scoreArray[10].value }}</p>
        </div>

        <div class="game-combination" v-bind:class="{ complete:$store.state.scoreArray[11].final }">
          <p id="poker" class="label">Poker</p>
          <p v-for="(value, index) in $store.state.scoreArray[11].displayValues" :key="index" class="result saved">
            {{ value }}
          </p>
          <p v-if="$store.state.scoreArray[11].value" class="result blink">{{ $store.state.scoreArray[11].value }}</p>
        </div>

        <div class="game-combination" v-bind:class="{ complete:$store.state.scoreArray[12].final }">
          <p id="small" class="label">Small</p>
          <p v-for="(value, index) in $store.state.scoreArray[12].displayValues" :key="index" class="result saved">
            {{ value }}
          </p>
          <p v-if="$store.state.scoreArray[12].value" class="result blink">{{ $store.state.scoreArray[12].value }}</p>
        </div>

        <div class="game-combination" v-bind:class="{ complete:$store.state.scoreArray[13].final }">
          <p id="large" class="label">Large</p>
          <p v-for="(value, index) in $store.state.scoreArray[13].displayValues" :key="index" class="result saved">
            {{ value }}
          </p>
          <p v-if="$store.state.scoreArray[13].value" class="result blink">{{ $store.state.scoreArray[13].value }}</p>
        </div>

        <div class="game-combination" v-bind:class="{ complete:$store.state.scoreArray[14].final }">
          <p id="chance" class="label">Chance</p>
          <p v-for="(value, index) in $store.state.scoreArray[14].displayValues" :key="index" class="result saved">
            {{ value }}
          </p>
          <p v-if="$store.state.scoreArray[14].value" class="result blink">{{ $store.state.scoreArray[14].value }}</p>
        </div>
    </div>
  </div>
  <div>
    <div class="dice-box-container">
      <!--div class="result-box" v-bind:class="{ hidden:$store.state.turnCompleted, border: $store.state.combinationArray.length >= 1 }" v-on:click="deSelectDice"></div-->
      <div class="dice-box"  v-on:click="selectDice" v-bind:class="{ hidden:$store.state.turnCompleted }">
        <!-- first dice -->
        <div class="dice-container">
            <svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
              <use v-if="$store.state.diceArray[0].value === '#'" xlink:href="#diceOnesSelected" />
              <use v-if="$store.state.diceArray[0].value === 1" xlink:href="#diceOnes" />
              <use v-if="$store.state.diceArray[0].value === 2" xlink:href="#diceTwos" />
              <use v-if="$store.state.diceArray[0].value === 3" xlink:href="#diceThrees" />
              <use v-if="$store.state.diceArray[0].value === 4" xlink:href="#diceFours" />
              <use v-if="$store.state.diceArray[0].value === 5" xlink:href="#diceFives" />
              <use v-if="$store.state.diceArray[0].value === 6" xlink:href="#diceSixes" />
            </svg>
            <svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
              <use v-if="$store.state.diceArray[1].value === '#'" xlink:href="#diceOnesSelected" />
              <use v-if="$store.state.diceArray[1].value === 1" xlink:href="#diceOnes" />
              <use v-if="$store.state.diceArray[1].value === 2" xlink:href="#diceTwos" />
              <use v-if="$store.state.diceArray[1].value === 3" xlink:href="#diceThrees" />
              <use v-if="$store.state.diceArray[1].value === 4" xlink:href="#diceFours" />
              <use v-if="$store.state.diceArray[1].value === 5" xlink:href="#diceFives" />
              <use v-if="$store.state.diceArray[1].value === 6" xlink:href="#diceSixes" />
            </svg>
            <svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
              <use v-if="$store.state.diceArray[2].value === '#'" xlink:href="#diceOnesSelected" />
              <use v-if="$store.state.diceArray[2].value === 1" xlink:href="#diceOnes" />
              <use v-if="$store.state.diceArray[2].value === 2" xlink:href="#diceTwos" />
              <use v-if="$store.state.diceArray[2].value === 3" xlink:href="#diceThrees" />
              <use v-if="$store.state.diceArray[2].value === 4" xlink:href="#diceFours" />
              <use v-if="$store.state.diceArray[2].value === 5" xlink:href="#diceFives" />
              <use v-if="$store.state.diceArray[2].value === 6" xlink:href="#diceSixes" />
            </svg>
            <!--svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
              <use v-if="$store.state.diceArray[3].value === '#'" xlink:href="#diceOnesSelected" />
              <use v-if="$store.state.diceArray[3].value === 1" xlink:href="#diceOnes" />
              <use v-if="$store.state.diceArray[3].value === 2" xlink:href="#diceTwos" />
              <use v-if="$store.state.diceArray[3].value === 3" xlink:href="#diceThrees" />
              <use v-if="$store.state.diceArray[3].value === 4" xlink:href="#diceFours" />
              <use v-if="$store.state.diceArray[3].value === 5" xlink:href="#diceFives" />
              <use v-if="$store.state.diceArray[3].value === 6" xlink:href="#diceSixes" />
            </svg>
            <svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
              <use v-if="$store.state.diceArray[4].value === '#'" xlink:href="#diceOnesSelected" />
              <use v-if="$store.state.diceArray[4].value === 1" xlink:href="#diceOnes" />
              <use v-if="$store.state.diceArray[4].value === 2" xlink:href="#diceTwos" />
              <use v-if="$store.state.diceArray[4].value === 3" xlink:href="#diceThrees" />
              <use v-if="$store.state.diceArray[4].value === 4" xlink:href="#diceFours" />
              <use v-if="$store.state.diceArray[4].value === 5" xlink:href="#diceFives" />
              <use v-if="$store.state.diceArray[4].value === 6" xlink:href="#diceSixes" />
            </svg>
            <svg class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 200 210" preserveAspectRatio="xMidYMin slice" width="100%">
              <use v-if="$store.state.diceArray[5].value === '#'" xlink:href="#diceOnesSelected" />
              <use v-if="$store.state.diceArray[5].value === 1" xlink:href="#diceOnes" />
              <use v-if="$store.state.diceArray[5].value === 2" xlink:href="#diceTwos" />
              <use v-if="$store.state.diceArray[5].value === 3" xlink:href="#diceThrees" />
              <use v-if="$store.state.diceArray[5].value === 4" xlink:href="#diceFours" />
              <use v-if="$store.state.diceArray[5].value === 5" xlink:href="#diceFives" />
              <use v-if="$store.state.diceArray[5].value === 6" xlink:href="#diceSixes" />
            </svg-->
          </div>
        </div>
      </div>
        <!--div class="dice animated" id="first">
          <div v-if="$store.state.diceArray[0].value === 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[0].value === 2">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[0].value === 3">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[0].value === 4">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[0].value === 5">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[0].value === 6">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="150" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="100" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
        </div-->
        <!-- second dice -->
        <!-- div class="dice animated" id="second">
          <div v-if="$store.state.diceArray[1].value === 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[1].value === 2">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[1].value === 3">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[1].value === 4">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[1].value === 5">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[1].value === 6">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="150" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="100" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
        </div-->
        <!-- third dice -->
        <!--div class="dice animated" id="third">
          <div v-if="$store.state.diceArray[2].value === 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[2].value === 2">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[2].value === 3">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[2].value === 4">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[2].value === 5">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[2].value === 6">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="150" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="100" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
        </div-->
        <!-- fourth dice -->
        <!--div class="dice animated" id="fourth">
          <div v-if="$store.state.diceArray[3].value === 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice" cx="100" cy="100" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[3].value === 2">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[3].value === 3">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[3].value === 4">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[3].value === 5">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[3].value === 6">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="150" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="100" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
        </div-->
        <!-- fifth dice -->
        <!--div class="dice animated" id="fifth">
          <div v-if="$store.state.diceArray[4].value === 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[4].value === 2">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[4].value === 3">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[4].value === 4">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[4].value === 5">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="100" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
          <div v-if="$store.state.diceArray[4].value === 6">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
              <circle class="dice-circle" cx="150" cy="100" r="18"/>
              <circle class="dice-circle" cx="150" cy="50" r="18"/>
              <circle class="dice-circle" cx="150" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="150" r="18"/>
              <circle class="dice-circle" cx="50" cy="100" r="18"/>
              <circle class="dice-circle" cx="50" cy="50" r="18"/>
              <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="dice-svg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
            </svg>
          </div>
        </div>
      </div--> <!--end if dice-box-->
      </div>
      <div>
      <div class="main-button animated" v-on:click="handleMainGameButton" v-bind:class="{ disabled:mainButtonDisabled }">{{ mainButtonText }}</div>
    </div>
    <div class="progress-bar">
    </div>
    <!--div class="debug">{{currentValuesInScoreArray}}</div-->

    <!-- SVG icons defs -->
    <!-- Default icons -->
    <svg class="defs-only" xmlns="http://www.w3.org/2000/svg">
      <symbol id="diceOnes" class="dice">
        <circle cx="100" cy="100" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceTwos" class="dice">
        <circle cx="50" cy="150" r="18"/>
        <circle cx="150" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceThrees" class="dice">
        <circle cx="50" cy="150" r="18"/>
        <circle cx="100" cy="100" r="18"/>
        <circle cx="150" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceFours" class="dice">
        <circle cx="150" cy="50" r="18"/>
        <circle cx="150" cy="150" r="18"/>
        <circle cx="50" cy="150" r="18"/>
        <circle cx="50" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceFives" class="dice">
        <circle cx="100" cy="100" r="18"/>
        <circle cx="150" cy="50" r="18"/>
        <circle cx="150" cy="150" r="18"/>
        <circle cx="50" cy="150" r="18"/>
        <circle cx="50" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceSixes" class="dice">
        <circle cx="150" cy="100" r="18"/>
        <circle cx="150" cy="50" r="18"/>
        <circle cx="150" cy="150" r="18"/>
        <circle cx="50" cy="150" r="18"/>
        <circle cx="50" cy="100" r="18"/>
        <circle cx="50" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
<!-- Selected dice icons -->
      <symbol id="diceOnesSelected" class="dice-chosen">
        <circle cx="100" cy="100" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceTwosSelected" class="dice-chosen">
        <circle cx="50" cy="150" r="18"/>
        <circle cx="150" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceThreesSelected" class="dice-chosen">
        <circle cx="50" cy="150" r="18"/>
        <circle cx="100" cy="100" r="18"/>
        <circle cx="150" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceFoursSelected" class="dice-chosen">
        <circle cx="150" cy="50" r="18"/>
        <circle cx="150" cy="150" r="18"/>
        <circle cx="50" cy="150" r="18"/>
        <circle cx="50" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceFivesSelected" class="dice-chosen">
        <circle cx="100" cy="100" r="18"/>
        <circle cx="150" cy="50" r="18"/>
        <circle cx="150" cy="150" r="18"/>
        <circle cx="50" cy="150" r="18"/>
        <circle cx="50" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceSixesSelected" class="dice-chosen">
        <circle cx="150" cy="100" r="18"/>
        <circle cx="150" cy="50" r="18"/>
        <circle cx="150" cy="150" r="18"/>
        <circle cx="50" cy="150" r="18"/>
        <circle cx="50" cy="100" r="18"/>
        <circle cx="50" cy="50" r="18"/>
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
      test: false,
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
      'currentValuesInScoreArray'
    ])
  },
  mounted () {
    let highestScore = localStorage.getItem('highestScore')
    if (highestScore) {
      this.highestScore = highestScore
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
      console.dir(event.target)
      let idFound = false
      let scoreId = null
      let scoreType = null
      let elementToCheck = event.target // .parentElement?

      while (!idFound && elementToCheck) {
        if (elementToCheck.classList.contains('combination')) {
          // scoreId = elementToCheck.firstChild.id
          scoreId = elementToCheck.id
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
        console.log(`Score id is: ${scoreId}`)
        console.log(`Score type is: ${scoreType}`)
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
      // elementToAdd.classList.remove('slideOutRight')
      elementToAdd.classList.add('zoomIn')
      let diceBox = document.querySelector('.dice-box')
      let resultBox = document.querySelector('.result-box')
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
      // this.highlightHighestValue()
    },
    deSelectDice (event) {
      let elementToRemove = this.handleDiceClick(event.target)
      // elementToRemove.classList.remove('slideInRight')
      // elementToRemove.classList.add('zoomIn')
      let diceBox = document.querySelector('.dice-box')
      let resultBox = document.querySelector('.result-box')
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
      } else if (resultType === 'game-combination' && store.state.scoreArray[combinationIndexInArray].value !== '' && store.state.scoreArray[combinationIndexInArray].displayValues.length < 3 && !store.state.turnCompleted) {
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.school {
  display: flex;
  // flex-direction: row;
  // justify-content: center;
  // align-items: center;
  // align-items: flex-start;
  // padding: 0em 2em 0em 2em;
  // height: 4em;
  // border: 1px solid green;
  // height: 3em;
}
.game-table {
  display: flex;
  flex-direction: column;
  // padding: 0em 1em 0em 1em;
}
.game {
  display: flex;
  width: auto;
  flex-direction: column;
}
/*
.school > .combination {
  width: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
*/
.game-combination {
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

.school-result {
  margin: 0em;
  // border: 1px solid red;
  // width: 100%;
  // padding: .4em 0em 0em 0em;
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
.saved .school-result {
  color: $color-orange;
}
/*
.dice-container > svg > path {
  stroke: $color-orange;
}
.saved svg > circle {
  fill: $color-orange;
}
*/
.dice-box-container {
  display: flex;
  flex-direction: row;
  margin-top: 1em;
  padding: 0em .3em .3em .3em;
}
.dice-box, .result-box {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding-top: .15em;
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
/*
.dice {
  display: flex;
  margin-left: .4em;
  margin-right: .4em;
  // animation: diceDisplay 1s linear;
}

.dice-icon:hover {
  cursor: pointer;
}

@keyframes diceDisplay {
  50% {
    opacity: 0;
  }
}
*/
.blink {
  animation: blinker 2.5s linear infinite;
}
@keyframes blinker {
  50% {
    opacity: .2;
  }
}

// style for icons
/*
.active svg > .dice-svg {
  stroke: $color-orange;
}
.active svg > .dice-circle {
  fill: $color-orange;
}

.result-box svg > path {
  stroke: $color-orange;
}
.result-box svg > circle {
  fill: $color-orange;
}*/
/*
.dice-svg {
  fill: none;
  stroke: $color-primary-0;
  stroke-width: 10px;
  fill-rule: evenodd;
}
.dice-circle {
  fill: $color-primary-0;
}
*/
/*
svg:hover > .dice-svg {
  stroke: $color-orange;
}
svg:hover > .dice-circle {
  fill: $color-orange;
}
*/

.faded { // horizontal ruler
  border: 0;
  height: 0.065em;
  background-image: linear-gradient(to right, hsla(0, 0%, 65%, 0), hsla(0, 0%, 65%, 0.75), hsla(0, 0%, 65%, 0));
}
/*
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
*/
/*
@media only screen and (max-width: 300px) , screen and (max-height: 500px) {
    .game-table {
      padding: 0em .2em 0em .2em;
    }
    .school-result {
      padding: 0;
      border: 1px solid red;
    }
}
*/
@media only screen and (-webkit-min-device-pixel-ratio: 1.6) {
    .game-table {
      // padding: 0em 1em 0em 1em;
      // border: 1px solid red;
    }
    .school {
      // margin-top: 1em;
    }
    .school-result {
      padding: 0;
      // border: 1px solid red;
    }
    .game-combination {
      // margin-top: .2em;
    }
    .dice-box-container {
      margin-top: auto;
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

.dice-container {
    // display: flex;
    // text-align: center;
    // box-sizing: content-box;
    // width: 70%;
    padding: 0em .4em 0em .4em;
    // border: 1px solid green;
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
/*
.highest-value {
  // font-size: 2em;
  // color: $color-very-red;
  // text-shadow: 0px 0px 15px $color-very-red-transparent;
  // border: 1px solid red;
}
*/
.highest-value {
  color: $color-very-red;
  text-shadow: 0px 0px 15px $color-very-red-transparent;
}
/*
.dice-path {
  fill: none;
  // stroke: indigo;
  stroke: indigo;
  stroke-width: 1em;
  fill-rule: evenodd;
}

.dice-icon > circle {
  fill: $color-orange;
}

.dice-icon > path {
  stroke: $color-orange;
}
*/
/*
.highest-value svg > .dice-svg {
  stroke: $color-very-red;
}
.highest-value svg > .dice-circle {
  fill: $color-very-red;
}
*/
</style>
