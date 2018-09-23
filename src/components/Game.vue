<template>
  <div id="gameView">
    <div v-if="$store.state.startMenu" class="startMenu">
      <p class="game-name">Sharlushka</p>
      <img class="startPageDice" src="../assets/icons/startPageDice.svg" alt="Start page dice">
      <div class="greeting" v-if="userExists">
        <p>Hi, {{userName}}</p>
      </div>
      <div class="register-form" v-if="registerForm">
        <form class="new-user">
          <!--label for="userName">User Name</label-->
          <input v-model="formValueName" type="text" id="userName" name="newUserName" placeholder="Name">
        </form>
        <div class="closeButton" v-on:click="formInputControl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </div>
      </div>
      <div class="button-box">
        <button class="menuButton" v-on:click="$store.state.startMenu = false">Play</button>
        <button v-if="!registerForm" class="menuButton" v-on:click="formInputControl">{{ loginButtonText }}</button>
        <button v-if="registerForm" class="menuButton" v-on:click="registerUser">Save</button>
      </div>
      <div class="iconLicense">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
      </div>
    </div>
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
      </div> <!--end if diceBox-->
      <div class="resultBox" v-bind:class="{ hidden:$store.state.turnCompleted, border: $store.state.combinationArray.length >= 1 }" v-on:click="deSelectDice"></div>
    </div>
    <div class="controls">
      <button class="gameButton" v-on:click="rollDice()" :disabled="$store.state.rollButtonDisabled == true" :class="{ disabledButton: $store.state.rollButtonDisabled == true}">Roll</button>
      <button class="gameButton" v-on:click="newTurnInit" :disabled="$store.state.nextTurnButtonDisabled == true" :class="{ disabledButton: $store.state.nextTurnButtonDisabled == true}">{{ $store.state.nextTurnButtonText}}</button>
    </div>
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
      zeroCheck: false
      // debugCheckForFinal: {}
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
    // store.state.startMenu = true
    // console.log(`Mounted game view`)
    let user = localStorage.getItem('userName')
    // console.log(`Hi ${user}`)
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
    registerUser () {
      // console.log(`Register user`)
      // localStorage.setItem("userName", "Smith")
      localStorage.setItem('userName', this.formValueName)
      this.userName = this.formValueName
      // this.registerForm = false
      store.state.startMenu = false
      // something for navigation
      store.state.currentUserName = this.userName
    },
    handleBoardClick (event) {
      // console.log(`Handling board click. Event target -->`)
      // console.dir(event.target)
      // find combinationID
      // let stop = 10
      // let temp
      let idFound = false
      let scoreId = null
      let scoreType = null
      let elementToCheck = event.target // .parentElement
      while (!idFound && elementToCheck) {
        if (elementToCheck.classList.contains('combination')) {
          scoreId = elementToCheck.firstChild.id
          scoreType = elementToCheck.parentElement.className
          // // console.log(`name: ${elementToCheck.firstChild.id}`)
          // // console.log(`type: ${elementToCheck.parentElement.className}`)
          // // console.log(`Combination is ${scoreId}`)
          // console.dir(scoreId)
          idFound = true
          // return temp
        } else if (elementToCheck.classList.contains('label')) {
          scoreId = elementToCheck.id
          scoreType = elementToCheck.parentElement.className
          // // console.log(`Label is ${scoreId}`)
          idFound = true
          // return scoreId
        } else if (elementToCheck.classList.contains('result')) {
          // // console.log(`Result paragraph`)
          scoreId = elementToCheck.parentElement.firstChild.id
          scoreType = elementToCheck.parentElement.className
          // // console.log(scoreId)
          // // console.log(scoreType)
          // // console.log(`Result par label is ${scoreId}`)
          idFound = true
        } else {
          elementToCheck = elementToCheck.parentElement
        }
        if (!elementToCheck) {
          // // console.log(`No more parents element is: ${elementToCheck}`)
          // return idFound
        }
        /*
        if (stop <= 0) {
          idFound = true
          // console.log(`Error`)
        }
        stop--
        */
      }
      if (scoreId && scoreType) {
        this.recordResult(scoreId, scoreType)
      }
    },
    handleDiceClick (element) {
      let diceFound = false
      if (element) {
        let elementToCheck = element.parentElement
        // console.log(`Current parent -->`)
        // console.dir(elementToCheck)

        while (!diceFound && elementToCheck) {
          if (elementToCheck.classList.contains('dice')) {
            // console.log(`Dice id found: ${elementToCheck.id}`)
            diceFound = true
            return elementToCheck
          } else {
            // console.log(`Switching parents`)
            elementToCheck = elementToCheck.parentElement
            this.handleDiceClick(elementToCheck)
          }
        }
      } else {
        // console.log(`No element to check ${element}`)
        return false
      }
    },
    selectDice (event) {
      // console.log(`inside select dice`)
      // let elementToAdd = event.target.closest('.dice')
      // console.log(`Event target -->`)
      // console.log(event.target.id)
      // // console.log(`Event current target -->`)
      // // console.log(event.currentTarget)
      // // console.log(event.target.classList)
      // closest doesn't work on andrid 4.1
      // hence this stuff
      // let parentNode = event.target.parentElement
      // let grandParentNode = parentNode.parentElement
      // let elementToAdd = grandParentNode
      // end of it
      // console.dir(`Result: ${this.handleDiceClick(event.target)}`)
      let elementToAdd = this.handleDiceClick(event.target)
      // console.dir(`Element to add ${elementToAdd}`)
      let diceBox = document.querySelector('.diceBox')
      let resultBox = document.querySelector('.resultBox')
      if (event.target === diceBox) {
        // console.log(`Click harder!`)
        return false
      }
      if (elementToAdd) {
        diceBox.removeChild(elementToAdd)
        resultBox.appendChild(elementToAdd)
      }
      for (let key in store.state.diceArray) {
        if (store.state.diceArray[key].id === elementToAdd.id) {
          store.state.diceArray[key].chosen = true
          // console.log(`Dice chosen: ${store.state.diceArray[key].chosen}`)
          store.state.combinationArray.push(store.state.diceArray[key].value)
          store.commit('computeScore')
        }
      }
    },
    deSelectDice (event) {
      // console.log(event.target)
      /*
      let parentNode = event.target.parentElement
      let grandParentNode = parentNode.parentElement
      let elementToRemove = grandParentNode
      */
      let elementToRemove = this.handleDiceClick(event.target)
      let diceBox = document.querySelector('.diceBox')
      let resultBox = document.querySelector('.resultBox')
      if (event.target === resultBox) {
        console.log(`Result box!`)
        // return false
      }
      // store.state.combinationArray.splice(store.state.combinationArray.findIndex(item => item === store.state.diceArray[key].value), 1)
      if (elementToRemove) {
        // console.log(`We got element to remove -->`)
        // console.dir(elementToRemove.id)
        resultBox.removeChild(elementToRemove)
        diceBox.appendChild(elementToRemove)
        // store.state.combinationArray.splice(store.state.combinationArray.findIndex(item => item === store.state.diceArray[key].value), 1)
        for (let key in store.state.diceArray) {
          // console.log(store.state.diceArray[key].value)
          if (store.state.diceArray[key].id === elementToRemove.id) {
            // console.log(`Removing dice`)
            store.state.diceArray[key].chosen = false
            // store.state.diceArray[key].value = ''
            let value = store.state.diceArray[key].value
            // console.log(`Element to remove value is ${value}`)
            // console.log(`Index of value to remove`)
            // console.log(store.state.combinationArray.indexOf(value))
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
    /*
    clearResultInStore () {
      for (let key in store.state.scoreArray) {
        if (!store.state.scoreArray[key].final) {
          store.state.scoreArray[key].value = ''
        }
      }
    },
    */
    debugMode () {
      // console.log(`Clearing onscreen`)
      store.state.debug = true
    },
    recordResult (id, type) {
      // console.log(`recording new result`)
      let resultType = type
      let combinationId = id
      // console.log(`Combination ID: ${combinationId}`)
      const combinationIndexInArray = store.state.scoreArray.map(dice => dice.id).indexOf(combinationId)
      // console.log(`Combination index in array: ${combinationIndexInArray}`)

      if (resultType === 'school' && store.state.scoreArray[combinationIndexInArray].value !== '' && !store.state.turnCompleted && !store.state.scoreArray[combinationIndexInArray].final) {
        store.state.scoreArray[combinationIndexInArray].final = true
        store.state.schoolScoreTotal += store.state.scoreArray[combinationIndexInArray].value
        store.state.rollButtonDisabled = true
        store.state.nextTurnButtonDisabled = false
        store.state.turnCompleted = true
        let resultParagraph = document.getElementById(combinationId)
        // console.log(`Result paragraph -->`)
        // console.dir(resultParagraph)
        resultParagraph.nextElementSibling.classList.remove('blink')
        resultParagraph.nextElementSibling.classList.add('saved')
        // set school completed to display game score on the board
        if (store.state.gameTurns === 6) {
          store.state.schoolCompleted = true
        }
        this.clearResultBox()
      } else if (resultType === 'gameCombination' && store.state.scoreArray[combinationIndexInArray].value !== '' && store.state.scoreArray[combinationIndexInArray].displayValues.length < 3 && !store.state.turnCompleted) {
        // // console.log(`Recording game result`)
        store.state.rollButtonDisabled = true
        store.state.nextTurnButtonDisabled = false
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
      } else if (store.state.scoreArray[combinationIndexInArray].value === '' && !store.state.scoreArray[combinationIndexInArray].final && store.state.schoolCompleted && store.state.rollCount === 0 && !this.zeroCheck) {
        // console.log(`Trying to save zero.`)
        // console.log(resultType)
        // if there is no combination to record user can mark one field per turn as cancelled
        // and it won't be used to calculate score
        // combinationId = event.target.id
        store.state.nextTurnButtonDisabled = false
        store.state.rollButtonDisabled = true
        store.state.turnCompleted = true
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length < 3) {
          store.state.scoreArray[combinationIndexInArray].displayValues.push(0)
          // store.state.scoreArray[combinationIndexInArray].final = true
          // zero saved during this turn
          this.zeroCheck = true
          // this.clearResultInStore()
          // this.clearResultBox()
        }
        // check if it is full
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
          store.state.scoreArray[combinationIndexInArray].final = true
        }
      } else {
        // console.log(`Nothing to record!`)
        return false
      }
      if (store.state.gameTurns === store.state.maxGameTurns && store.state.turnCompleted) {
        let score = store.state.schoolScoreTotal + store.state.gameTotal
        store.state.nextTurnButtonDisabled = true
        store.state.endGameMenu = true
        let highestScore = localStorage.getItem('highestScore')
        if (!highestScore) {
          // console.log(`Highest score not set, setting it for the first time`)
          localStorage.setItem('highestScore', score)
        } else if (score > highestScore) {
          // console.dir(`You got a record! ${score}`)
          localStorage.setItem('highestScore', score)
        } else {
          console.log(`Your score is not so high ${score}`)
        }
      }
      // this.clearResultBox()
      // this.clearResultInStore()
    },
    newTurnInit () {
      // workaround for android 4.4.2 on FLYIQ4415QUADRAND
      this.clearResultBox()
      // user recorded zero on this turn
      if (this.zeroCheck) {
        this.zeroCheck = false
      }
      store.commit('nextTurn')
    },
    oldrecordResult (id, type) {
      /*
      let combinationId // get combination ID from click event
      // // console.log(event.target.id)
      // console.log(`Record result. Event target ->`)
      // console.log(event.currentTarget)
      if (event.currentTarget.className === 'school') {
        // let combinationParagraphNode = event.target.closest('.diceIcon')
        let combinationParagraphNode = event.target.parentNode
        // console.log(event.target)
        // // console.log(`combination paragraph`)
        // // console.log(combinationParagraphNode)
        if (combinationParagraphNode) {
          combinationId = combinationParagraphNode.id
        }
      }
      if (event.target.className === 'result blink') {
        // // console.log(event.target.parentNode)
        // let parent = event.target
        // let neededParagraph = clickedItem.closest('.label')
        // // console.log(`Paragraph is ${neededParagraph}`)
        let combinationParagraphNode = event.target.parentNode.firstChild
        // // console.log(`Combination paragraph node: ${combinationParagraphNode}`)
        // // console.log(combinationParagraphNode)
        if (combinationParagraphNode) {
          combinationId = combinationParagraphNode.id
        }
      }
      if (event.target.className === 'label') {
        // // console.log(event.target.className)
        // let combinationParagraphNode = event.target.firstChild
        // combinationId = combinationParagraphNode.id
        combinationId = event.target.id
      }
      // // console.log(`Hi, am inside record result! combination id is: ${combinationId}`)
      */
      let combinationId = id
      let scoreType = type
      // console.log(`Score type is ${scoreType}`)
      // let idType = id.type
      // // console.log(`id.name is: ${id.name}`)
      // // console.log(`id type is ${id.type}`)
      if (combinationId && !store.state.turnCompleted) { // check if we get some combination ID from user click
        // if its not undefined get the index of ID in results array
        const combinationIndexInArray = store.state.scoreArray.map(dice => dice.id).indexOf(combinationId)
        if (store.state.scoreArray[combinationIndexInArray].value !== '' && !store.state.scoreArray[combinationIndexInArray].final) {
          // it is not empty and we can record some school result on click
          if (!store.state.schoolCompleted && scoreType === 'school') { // record school result
            // set the final flag to true to record current value
            store.state.scoreArray[combinationIndexInArray].final = true
            store.state.schoolScoreTotal += store.state.scoreArray[combinationIndexInArray].value
            store.state.rollButtonDisabled = true
            store.state.nextTurnButtonDisabled = false
            store.state.turnCompleted = true
            let resultParagraph = document.getElementById(combinationId)
            // console.log(`Result paragraph -->`)
            // console.dir(resultParagraph)
            resultParagraph.nextElementSibling.classList.remove('blink')
            resultParagraph.nextElementSibling.classList.add('saved')
            if (store.state.gameTurns === 6) {
              store.state.schoolCompleted = true
            }
          } else if (store.state.scoreArray[combinationIndexInArray].displayValues.length < 4 && !store.state.turnCompleted && scoreType === 'gameCombination') {
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
        } else if (store.state.scoreArray[combinationIndexInArray].value === '' && store.state.schoolCompleted && !store.state.gameLocked) {
          // console.log(`Trying to save zero.`)
          // if there is no combination to record user can mark one field per turn as cancelled
          // and it won't be used to calculate score
          // combinationId = event.target.id
          store.state.nextTurnButtonDisabled = false
          store.state.rollButtonDisabled = true
          store.state.turnCompleted = true
          if (store.state.scoreArray[combinationIndexInArray].displayValues.length < 3) {
            store.state.scoreArray[combinationIndexInArray].displayValues.push(0)
            // console.log(`Saving zero`)
          }
          // check if it is full of zeroes
          if (store.state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
            store.state.scoreArray[combinationIndexInArray].final = true
          }
        } else {
          // console.log(`Click harder! Combination ID is ${combinationId}.`)
        }
        if (store.state.gameTurns === store.state.maxGameTurns && store.state.turnCompleted) {
          let score = store.state.schoolScoreTotal + store.state.gameTotal
          store.state.nextTurnButtonDisabled = true
          store.state.endGameMenu = true
          let highestScore = localStorage.getItem('highestScore')
          if (!highestScore) {
            // console.log(`Highest score not set, setting it for the first time`)
            localStorage.setItem('highestScore', score)
          } else if (score > highestScore) {
            // console.dir(`You got a record! ${score}`)
            localStorage.setItem('highestScore', score)
          } else {
            console.log(`Your score is not so high ${score}`)
          }
        }
        // clear results onscreen
        // this.clearResultBox()
        // this.debugMode()
      }
      // not needed?
      /*
      function getAllBlinkinSiblings (element, parent) {
        const children = [...parent.children]
        return children.filter(child => child.classList.contains('blink'))
      } */
    }, // end of record result method
    restartGame (state) {
      // deselect all dice (remove this)
      for (let dice in store.state.diceArray) {
        if (store.state.diceArray[dice].chosen) {
          store.state.diceArray[dice].chosen = false
        }
      }
      store.commit('resetState')
      this.clearResultBox()
      store.state.startMenu = false
      this.userName = localStorage.getItem('userName')
      this.highestScore = localStorage.getItem('highestScore')
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
  justify-content: center;
  align-items: center;
  // border: 1px solid magenta;
  height: 2.3em;
  margin-bottom: .3em;
}
.diceBox, .resultBox {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding-top: .125em;
  // height: 2.5em;
  // border: 1px solid magenta;
}

.border {
    border-left: .2em solid orange;
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
  // position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  // height: 20em;
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

.game-name {
  color: $color-primary-0;
  font-family: $game-name-font;
  font-size: 3.5em;
  // margin-top: 1.5em;
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

.register-form {
  display: flex;
  //align-content: center;
  justify-content: center;
  width: 100%;
  // border: 1px solid red;
  color: $color-primary-0;
  // height: 4em;
}

.new-user {
  display: flex;
  align-content: center;
  justify-content: center;
  padding-right: .7em;
}

.new-user > input {
  // height: 1em;
  color: $color-primary-0;
  font-size: 1.6em;
  padding: .2em;
  width: 100%;
  border-radius: .2em;
  border: 1px solid $color-primary-2;
  box-shadow: 0px 0px 10px 1px $color-primary-1;
}

.greeting {
  color: $color-primary-0;
  font-size: 2em;
}

.closeButton {
  display: flex;
  align-items: center;
  cursor: pointer;
}

@media only screen and (max-width: 500px) , screen and (max-height: 300px) {
    #gameView {
      padding-bottom: .2em;
    }
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
