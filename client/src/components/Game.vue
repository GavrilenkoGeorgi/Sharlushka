<template>
<div>
    <div class="info"><span>School: {{$store.state.schoolScoreTotal}}</span>
    <span>Game score: {{$store.state.gameTotal}}</span></div>
    <div class="school" v-on:click="recordResult">
      <div class="combination">
        <p id="ones" class="diceIcon">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="100" cy="100" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[0].value }}</p>
      </div>

      <div class="combination">
        <p id="twos" class="diceIcon">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 200 200">
            <circle class="diceCircle" cx="50" cy="150" r="18"/>
            <circle class="diceCircle" cx="150" cy="50" r="18"/>
            <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="diceSvg" d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
          </svg>
        </p>
        <p class="schoolResult blink">{{ $store.state.scoreArray[1].value }}</p>
      </div>

      <div class="combination">
        <p id="threes" class="diceIcon">
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
        <p id="fours" class="diceIcon">
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
        <p id="fives" class="diceIcon">
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
        <p id="sixes" class="diceIcon">
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

    <div class="gameTable">
    <div class="game" v-on:click="recordResult">

      <div class="combination">
        <p id="pair" class="label">Pair</p>
        <p class="result blink">{{ $store.state.scoreArray[6].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[6].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[6].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[6].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="twoPairs" class="label">Two Pairs</p>
        <p class="result blink">{{ $store.state.scoreArray[7].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[7].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[7].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[7].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="threeOfAKind" class="label">Three Of A Kind</p>
        <p class="result blink">{{ $store.state.scoreArray[8].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[8].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[8].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[8].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="full" class="label">Full</p>
        <p class="result blink">{{ $store.state.scoreArray[9].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[9].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[9].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[9].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="quads" class="label">Quads</p>
        <p class="result blink">{{ $store.state.scoreArray[10].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[10].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[10].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[10].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="poker" class="label">Poker</p>
        <p class="result blink">{{ $store.state.scoreArray[11].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[11].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[11].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[11].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="small" class="label">Small</p>
        <p class="result blink">{{ $store.state.scoreArray[12].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[12].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[12].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[12].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="large" class="label">Large</p>
        <p class="result blink">{{ $store.state.scoreArray[13].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[13].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[13].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[13].displayValues[2] }}</p>
      </div>

      <div class="combination">
        <p id="chance" class="label">Chance</p>
        <p class="result blink">{{ $store.state.scoreArray[14].value }}</p>
        <p class="result saved">{{ $store.state.scoreArray[14].displayValues[0] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[14].displayValues[1] }}</p>
        <p class="result saved">{{ $store.state.scoreArray[14].displayValues[2] }}</p>
      </div>
    </div>
    </div>
    <div class="resultBox" v-on:click="deSelectDice"></div>

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
    <div class="controls">
    <button class="gameButton" v-on:click="rollDice()" :disabled="$store.state.rollButtonDisabled == true" :class="{ disabledButton: $store.state.rollButtonDisabled == true}">Roll</button>
    <button class="gameButton" v-on:click="nextTurn(); clearResultBox()" :disabled="$store.state.nextTurnButtonDisabled == true" :class="{ disabledButton: $store.state.nextTurnButtonDisabled == true}">{{ $store.state.nextTurnButtonText}}</button>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '../store/store'

export default {
  name: 'Game',
  computed: mapGetters([
    'evenOrOdd',
    'onesScore',
    'twosScore'
  ]),
  methods: {
    ...mapActions([
      'rollDice',
      'nextTurn',
      'removeDice',
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
    recordResult (event) {
      let combinationId // get combination ID from click event
      if (event.currentTarget.className === 'school') {
        let combinationParagraphNode = event.target.closest('.diceIcon')
        if (combinationParagraphNode) {
          combinationId = combinationParagraphNode.id
        }
      }
      if (event.currentTarget.className === 'game') {
        let combinationParagraphNode = event.target.closest('.label')
        if (combinationParagraphNode) {
          combinationId = combinationParagraphNode.id
        }
      }
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
            // check if it is full to set 'final' flag
            store.state.gameTotal += store.state.scoreArray[combinationIndexInArray].value
            if (store.state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
              store.state.scoreArray[combinationIndexInArray].final = true
              store.state.scoreArray[combinationIndexInArray].value = ''
            }
          }
        } else if (store.state.scoreArray[combinationIndexInArray].value === '' && store.state.schoolCompleted) {
          // if there is no combination to record user can mark one field per turn as cancelled
          // and it won't be used to calculate score
          store.state.nextTurnButtonDisabled = false
          store.state.rollButtonDisabled = true
          store.state.turnCompleted = true
          store.state.scoreArray[combinationIndexInArray].displayValues.push(0)
        } else {
          console.log(`Click harder! Combination ID is ${combinationId}.`)
        }
        if (store.state.gameTurns === 33 && store.state.turnCompleted) {
          alert(`Game over, your score is ${store.state.schoolScoreTotal + store.state.gameTotal}`)
        }
      }
      // not needed?
      /*
      function getAllBlinkinSiblings (element, parent) {
        const children = [...parent.children]
        return children.filter(child => child.classList.contains('blink'))
      } */
    }// end of record result method
  }, // end of methods
  data () {
    return {
      diceArray: store.state.diceArray.length
    }
  }
}
document.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM fully loaded and parsed')
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color-green: hsl(167, 100%, 30%);
$color-orange: hsl(36, 100%, 50%);
$color-gray: hsl(0, 0%, 85%);
$color-lightGray: hsl(0, 0%, 95%);
$color-darkGray: hsl(0, 0%, 50%);
$color-white: hsl(0, 0%, 100%);
.info {
  display: flex;
  justify-content: space-around;
  color: $color-orange;
  margin: .7em 0em 0em 0em;
}
.content {
  display: flex;
  flex-direction: column;
  border: 1px solid salmon;
  // align-items: center;
   //align-self: flex-start;
  // justify-content: space-around;
}
.school {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 1.8em;
  height: 4em;
}
.gameTable {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;
}
.game {
  display: flex;
  width: auto;
  flex-direction: column;
}
.school > .combination {
  width: 2em;
  // border: 1px solid black;
}
.game > .combination {
  display: flex;
  flex-direction: row;
  align-items: center;
  // border-bottom: 1px solid red;
  height: 2em;
}
.diceIcon, .result, .label {
  margin: 0em;
}
.diceIcon {
  font-size: 2.5em;
  color: $color-green;
}
.diceIcon:hover, .label:hover {
  color: $color-orange;
  cursor: pointer;
}
.label {
  color: $color-green;
  // font-size: 1em;
  // margin-bottom: .5em;
  border-right: 1px solid $color-gray;
  width: 8em;
  text-align: right;
  padding-right: .3em;
}
.result {
  padding: 0em .3em 0em .3em;
  margin: 0em 0em 0em .3em;
  color: $color-darkGray;
  width: 2em;
}
.schoolResult {
  margin: 0em;
  padding: 0em;
  color: $color-darkGray;
}
.saved {
  color: $color-orange;
  // background-color: $color-lightGray;
}
.unsaved:hover {
  background-color: $color-lightGray;
}
.currentPlayerName {
  color: $color-green;
}
.diceBox, .resultBox {
  display: flex;
  justify-content: center;
  margin-bottom: .5em;
  height: 2.5em;
}
.resultBox {
  border-bottom: 1px solid $color-gray;
  padding-bottom: .2em;
}
.dice {
  display: flex;
  margin-left: .4em;
  margin-right: .4em;
  height: auto;
  animation: diceDisplay 1s linear;
  // border: 1px solid black;
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
}
.gameButton {
  background: $color-green;
  border: none;
  // cursor: pointer;
  border-radius: .25em;
  font-size: 1.2em;
  color: $color-white;
  padding: .3em;
  width: 6em;
}
.gameButton:hover {
  box-shadow: 2px 2px 12px $color-darkGray;
}
.disabledButton {
  background: $color-gray;
  color: $color-green;
  cursor: auto;
}
.disabledButton:hover {
  box-shadow: 0px 0px 0px $color-darkGray;
}
.blink {
  animation: blinker 2.5s linear infinite;
}
@keyframes blinker {
  50% {
    opacity: 0;
  }
}
// style for icons
.resultBox svg > .diceSvg {
  stroke: $color-orange;
}
.resultBox svg > .diceCircle {
  fill: $color-orange;
}
.resultBox svg:hover > .diceSvg {
  stroke: $color-green;
}
.resultBox svg:hover > .diceCircle {
  fill: $color-green;
}
.diceSvg {
  fill: none;
  stroke: $color-green;
  stroke-width: 10px;
  fill-rule: evenodd;
}
.diceCircle {
  fill: $color-green;
}
svg:hover > .diceSvg{
  stroke: $color-orange;
}
svg:hover > .diceCircle{
  fill: $color-orange;
}
</style>
