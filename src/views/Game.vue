<template>
  <v-container
    id="gameView"
    fill-height
    fluid
    ma-0
    pa-0
  >
    <!-- Toolbar -->
    <v-toolbar
      absolute
      dense
      height="40"
      color="purple darken-2"
      class="text-xs-center"
    >
      <span class="score pl-3">
        {{ getTotalScore }}
      </span>
      <v-spacer />
      <v-toolbar-title
        class="game-name"
      >
        <router-link :to="{ path: '/' }">
          {{ gameName }}
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <NetworkCheck />
      <v-toolbar-items>
        <v-spacer />
        <v-btn
          icon
          aria-label="settings"
          @click="manipulateDrawer"
        >
          <settingsIcon
            class="settings-icon"
          />
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- Navigation drawer -->
    <v-navigation-drawer
      v-model="navDrawer"
      temporary
      width="295"
      fixed
      right
      class="navigation-drawer"
    >
      <v-list>
        <v-list-tile
          class="pb-3"
          @click="manipulateDrawer"
        >
          <v-list-tile-action>
            <v-layout justify-center>
              <backIcon class="highlighted" />
            </v-layout>
          </v-list-tile-action>
          <v-list-tile-title class="drawer-menu-item">
            Back
          </v-list-tile-title>
        </v-list-tile>
        <!-- Greeting -->
        <v-list-tile>
          <v-list-tile-action>
            <v-flex class="text-xs-center">
              <NetworkCheck />
            </v-flex>
          </v-list-tile-action>
          <v-list-tile-content class="drawer-menu-item pa-0 user-name">
            Hi,&nbsp;{{ currentUserName }}.
          </v-list-tile-content>
        </v-list-tile>
        <!-- Nav drawer links -->
        <v-list-tile
          v-for="link in navDrawerLinks"
          :key="link.path"
          :to="{ path: link.path }"
          @click="navDrawer = false"
        >
          <v-list-tile-action>
            <v-layout justify-center>
              <component
                :is="link.icon"
                class="nav-drawer-link-icon"
              />
            </v-layout>
          </v-list-tile-action>
          <v-list-tile-title class="drawer-menu-item subheading">
            {{ link.text }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <svg
      version="1.1"
      style="display: none;"
      xmlns="http://www.w3.org/2000/svg"
    >
      <symbol
        id="diceOnes"
        viewBox="0 0 200 200"
      >
        <circle
          fill="currentColor"
          cx="100"
          cy="100"
          r="18"
        />
        <path
          stroke-width=".4em"
          d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"
        />
      </symbol>
      <symbol
        id="diceTwos"
        viewBox="0 0 200 200"
      >
        <circle
          fill="currentColor"
          cx="50"
          cy="150"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="150"
          cy="50"
          r="18"
        />
        <path
          stroke-width=".4em"
          d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"
        />
      </symbol>
      <symbol
        id="diceThrees"
        class="dice"
        viewBox="0 0 200 200"
      >
        <circle
          fill="currentColor"
          cx="50"
          cy="150"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="100"
          cy="100"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="150"
          cy="50"
          r="18"
        />
        <path
          stroke-width=".4em"
          d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"
        />
      </symbol>
      <symbol
        id="diceFours"
        class="dice"
        viewBox="0 0 200 200"
      >
        <circle
          fill="currentColor"
          cx="150"
          cy="50"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="150"
          cy="150"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="50"
          cy="150"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="50"
          cy="50"
          r="18"
        />
        <path
          stroke-width=".4em"
          d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"
        />
      </symbol>
      <symbol
        id="diceFives"
        class="dice"
        viewBox="0 0 200 200"
      >
        <circle
          fill="currentColor"
          cx="100"
          cy="100"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="150"
          cy="50"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="150"
          cy="150"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="50"
          cy="150"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="50"
          cy="50"
          r="18"
        />
        <path
          stroke-width=".4em"
          d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"
        />
      </symbol>
      <symbol
        id="diceSixes"
        class="dice"
        viewBox="0 0 200 200"
      >
        <circle
          fill="currentColor"
          cx="150"
          cy="100"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="150"
          cy="50"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="150"
          cy="150"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="50"
          cy="150"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="50"
          cy="100"
          r="18"
        />
        <circle
          fill="currentColor"
          cx="50"
          cy="50"
          r="18"
        />
        <path
          stroke-width=".4em"
          d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"
        />
      </symbol>
    </svg>
    <v-layout
      column
      class="game-layout"
      :class="{ 'game-ended': getCurrentGameState.gameEnded }"
    >
      <!-- School dice display -->
      <v-layout row>
        <v-flex
          d-flex
          align-center
          class="school-dice-container"
        >
          <svg
            v-for="dice in getSchoolArray"
            :id="dice.id"
            :key="dice.id"
            class="school-dice-icon default"
            :class="{ chosen:dice.final }"
            fill="none"
            @click="handleBoardClick"
          >
            <use v-bind="{'xlink:href':'#' + dice.icon}" />
          </svg>
        </v-flex>
      </v-layout>
      <!-- School results display -->
      <v-layout
        row
        class="school-results-layout"
        align-center
      >
        <v-flex
          v-for="result in getSchoolArray"
          :key="result.id"
          d-flex
          xs2
          align-center
          justify-center
          class="school-result"
          :class="{ saved:result.final, blink:!result.final }"
          @click="handleBoardClick"
        >
          <span :resultId="result.id">{{ result.value }}</span>
        </v-flex>
      </v-layout>
      <!-- Game combinations display -->
      <v-layout
        column
        justify-center
        class="game-combinations-layout"
      >
        <v-flex
          v-for="combination in getCombinationArray"
          :id="combination.id"
          :key="combination.id"
          d-flex
          align-center
          class="game-combination"
          :class="{ set:combination.final }"
          @click="handleBoardClick"
        >
          <v-layout
            class="background-transition"
            :class="{ accented:!combination.final && combination.value }"
          >
            <v-flex
              xs6
              pl-2
            >
              {{ combination.fullName }}
            </v-flex>
            <v-flex
              v-for="(value, index) in combination.displayValues"
              :key="index"
              xs2
              class="text-xs-center"
            >
              {{ value }}
            </v-flex>
            <v-flex
              v-if="combination.value"
              xs2
              class="blink text-xs-center"
            >
              {{ combination.value }}
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <!-- Dice controls -->
      <DiceBox :turn-completed="turnCompleted" />
    </v-layout>
    <div class="progress-bar" />
  </v-container>
</template>

<script>
import NetworkCheck from '../components/NetworkCheck.vue'
import { mapGetters, mapActions } from 'vuex'
import store from '../store/store'
import DiceBox from '../components/DiceBox.vue'
import settingsIcon from '../assets/icons/baseline-menu-24px.svg'
import helpIcon from '../assets/icons/baseline-trending_up-24px.svg'
import userStatsIcon from '../assets/icons/baseline-equalizer-24px.svg'
import leaderBoardIcon from '../assets/icons/baseline-import_export-24px.svg'
import logInOutIcon from '../assets/icons/baseline-exit_to_app-24px.svg'
import backIcon from '../assets/icons/baseline-keyboard_backspace-24px.svg'

export default {
  name: `Game`,
  components: {
    DiceBox,
    NetworkCheck,
    settingsIcon,
    helpIcon,
    userStatsIcon,
    leaderBoardIcon,
    logInOutIcon,
    backIcon
  },
  data: () => ({
    title: `Sharlushka`,
    icon:`settingsIcon`,
    highestScore: 0,
    turnCompleted: false,
    progressBarLength: 3,
    navDrawer: false,
    navDrawerLinks: [
      {
        path: `/help`,
        icon: `helpIcon`,
        text: `School results & help`
      },
      {
        path: `/userstats`,
        icon: `userStatsIcon`,
        text: `User stats`
      },
      {
        path: `/leaderboard`,
        icon: `leaderBoardIcon`,
        text: `Leaderboard`
      },
      {
        path: `/login`,
        icon: `logInOutIcon`,
        text: `Log in/out`
      }
    ]
  }),
  computed: {
    ...mapGetters([
      `getSchoolArray`,
      `getCombinationArray`,
      `getCurrentGameState`,
      `getTotalScore`,
      `getDefaultUserName`
    ]),
    gameName() {
      return `Sharlushka`
    },
    turnState: function() { // wtf???
      return store.state.newTurn
    },
    progressBarState: function() {
      return store.state.rollCount
    },
    currentUserName() {
      if (localStorage.hasOwnProperty(`userName`)) {
        return localStorage.getItem(`userName`)
      } else {
        return this.getDefaultUserName
      }
    }
  },
  watch: {
    turnState: {
      immediate: true,
      handler() { // some spaghetti code
        this.turnCompleted = !this.turnState
      }
    },
    progressBarState: {
      immediate: true,
      handler() {
        if (document.querySelector(`.progress-bar`)) { // content onload?
          this.updateProgressBar()
        } else {
          return false
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const highestScore = localStorage.getItem(`highestScore`)
      if (highestScore) {
        this.highestScore = highestScore
      }
    })
  },
  methods: {
    ...mapActions([
      `nextTurn`,
      // 'newGame',
      `computeScore`
      // 'setDiceChosenState',
      // 'incrementAsync'
    ]),
    manipulateDrawer() {
      this.navDrawer = !this.navDrawer
    },
    /*
    updateOnlineStatus() {
      if (navigator.onLine) {
        console.log(`online`)
        // document.documentElement.classList.remove('is-offline');
        // document.querySelector('.connection-status').innerHTML = 'Online';
      } else {
        console.log(`offline`)
        // document.documentElement.classList.add('is-offline');
        // document.querySelector('.connection-status').innerHTML = 'Offline';
      }
    },
    */
    updateProgressBar() {
      const progressBar = document.querySelector(`.progress-bar`)
      if (store.state.rollCount === 2) {
        progressBar.style.width = `33%`
      } else if (store.state.rollCount === 1) {
        progressBar.style.width = `66%`
      } else if (store.state.rollCount === 0) {
        progressBar.style.width = `100%`
        progressBar.classList.add(`full`)
      } else if (store.state.rollCount === 3) {
        progressBar.style.width = `0%`
        progressBar.classList.remove(`full`)
      }
    },
    handleBoardClick(event) {
      let idFound = false
      let scoreId = null
      let elementToCheck = event.target
      while (!idFound && elementToCheck) {
        if (elementToCheck.classList.contains(`school-dice-icon`) ||
          elementToCheck.classList.contains(`dice-icon`) ||
          elementToCheck.classList.contains(`game-combination`)) {
          scoreId = elementToCheck.id
          idFound = true
        } else if (elementToCheck.getAttribute(`resultId`)) {
          scoreId = elementToCheck.getAttribute(`resultId`)
          idFound = true
        } else {
          elementToCheck = elementToCheck.parentElement
        }
      }
      if (scoreId) {
        this.recordResult(scoreId)
      } else {
        console.log(`Nothing to record Id is: ${scoreId}`)
      }
    },
    clearResultBox() {
      // clear all temp results in store
      for (const key in store.state.scoreArray) {
        if (!store.state.scoreArray[key].final) {
          store.state.scoreArray[key].value = ``
        }
      }
      // deselect all dice
      for (const key in store.state.diceArray) {
        if (store.state.diceArray[key].chosen) {
          store.state.diceArray[key].chosen = false
        }
      }
    },
    debugMode() {
      store.state.debug = true
    },
    recordResult(id) {
      console.log(`Recording result..`)
      store.state.gameInProgress = true // should be just ones
      // this.turnCompleted = true
      const combinationId = id // ?
      const combinationIndexInArray = store.state.scoreArray.map((dice) => dice.id).indexOf(combinationId)
      if (!store.state.schoolCompleted &&
          store.state.scoreArray[combinationIndexInArray].value !== `` &&
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
      } else if (store.state.scoreArray[combinationIndexInArray].value !== `` &&
                  store.state.scoreArray[combinationIndexInArray].displayValues &&
                  store.state.scoreArray[combinationIndexInArray].displayValues.length < 3 &&
                  !store.state.turnCompleted) {
        store.state.turnCompleted = true // another turn completed in store?
        // push result into display values array
        store.state.scoreArray[combinationIndexInArray].displayValues.push(store.state.scoreArray[combinationIndexInArray].value)
        store.state.gameTotal += store.state.scoreArray[combinationIndexInArray].value
        if (store.state.scoreArray[combinationIndexInArray].displayValues.length === 3) {
          store.state.scoreArray[combinationIndexInArray].final = true
          store.state.scoreArray[combinationIndexInArray].value = ``
        }
        // this.clearResultInStore()
        this.clearResultBox()
        // this.removeCurrentHighlight()
      } else if (!store.state.turnCompleted && // this really should be a single check
        store.state.scoreArray[combinationIndexInArray].value === `` &&
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
        console.log(`Game Over!`)
        store.state.gameEnded = true
        // this.$router.push('/endgame')
        setTimeout(() => {
          // console.log(`Not so fast.. let the user appreciate the results )`)
          this.$router.push(`/endgame`)
        }, 1000)
      } else {
        this.turnCompleted = true
        store.commit(`nextTurn`)
        this.updateProgressBar()
      }
      this.turnCompleted = true
      console.log(`Turn completed`)
    } // end of record result method
  } // end of methods
}
</script>

<style lang="scss" scoped>
@import "../assets/fonts/fonts.scss";
@import "../assets/scss/vars/colors.scss";

.game-layout {
  padding-top: 3.3em;
  // height: 100vh;
  font-family: $text-font;
  // background: $color-pale-primary;
  // padding-bottom: .2em;
  // border: 1px solid green;
  transition: background-color 1s ease-in;
  // transition-duration: 1s;
  // transition-timing-function: ease-in;
}

.set {
  // background-color: $color-pale-primary;
  color: $color-chosen;
}
.game-ended {
  background: $color-pale-primary;
  /*
  .set {
    transition: background-color 1s ease-out;
    background-color: inherit;
  }*/
}
.school-results-layout {
  // border: 1px solid pink;
  height: 2em;
}
.school-result {
  // height: .8em;
  text-align: center;
}
.saved {
  color: $color-orange;
}
.game-combinations-layout {
  color: $color-primary-0;
}
.game-combination {
  padding: .15em 0em .15em 0em;
}
.blink {
  color: $color-primary-1;
  font-weight: 700;
  animation: blinker 3s ease-out infinite;
}
.blink:hover {
  color: $color-chosen;
  animation: none;
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
.progress-bar {
  background-color: $color-primary-0;
  box-shadow: 0px 1px 10px 0px $color-primary-4;
  height: .2em;
  position: fixed;
  bottom: 0;
  width: 0%;
  transition: width 1.75s cubic-bezier(.27,.13,.46,.96);
}
.full { // progress bar state
  background-color: #AA3838;
  box-shadow: 0em .2em .8em 0em red;
}

.navigation-drawer {
  font-family: $text-font;
  border-left: 2px solid $color-primary-0;
}
.drawer-menu-item {
  font-family: $text-font;
  font-weight: 700;
  font-size: 1.4em;
  color: $color-primary-3;
}
.user-name {
  color: $color-primary-0;
  font-size: 2em;
  // line-height: 1;
}
.score {
  color: $color-white;
  font-size: 2em;
  font-family: $text-font;
  text-align: center;
}

.game-name {
  // font-weight: 700;
  a {
    color: $color-pale-primary-lightest;
    font-size: 1.1em;
    font-family: $text-font;
    text-transform: capitalize;
    text-decoration: none;
  }
}

// Landscape mode
@media screen and (orientation: landscape) {
  #gameView {
    display: flex;
    height: 100vh;
  }
  .game-layout {
    flex-direction: row;
    // padding-top: 3em;
    // border: 1px solid red;
    // padding-bottom: .4em;
  }
  .school-dice-container {
    flex-direction: column;
  }
  .school-dice-icon {
    // height: 1em;
    margin: .2em 0em .2em 0em;
  }
  .school-results-layout {
    width: 15em;
    flex-direction: column;
    height: 100%;
  }
  .game-combinations-layout {
    width: 100em;
    padding: 0em;
    font-size: .81em;
  }
  .game-combination {
    padding: 0px;
    margin: 0px;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 320px) { // iphone5
  .school-dice-icon {
    // margin: .2em 0em .2em 0em;
    height: 3em;
  }
  .school-result, .game-combination {
    // font-size: 1.8em;
    font-size: 1.5em;
    // color: red;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 360px) { // nokia5
  .school-dice-icon {
    height: 3.7em;
  }
  .school-result, .game-combination {
    font-size: 1.85em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) and (min-width: 375px) { // iphoneX
.school-dice-icon {
    // margin: .2em 0em .2em 0em;
    height: 4em;
  }
  .school-result, .game-combination {
    // border: 1px solid pink;
    font-size: 2.2em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) and (min-width: 414px) { // iphone678plus
  .game-combination {
    font-size: 2.3em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) { // ipad
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
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1024px) { // ipadPro

.school-dice-icon {
   height: 8em;
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

@media screen and (max-resolution: 96dpi) and (max-width: 480px) { // fly iq4415
  .school-dice-icon {
    // background-color: yellow;
    height: 4.6em;
  }
  .game-combinations-layout {
    padding-bottom: .3em;
  }
  .school-result, .game-combination {
    // border: 1px solid pink;
    font-size: 2.7em;
    // font-weight: 700;
    // color: green;
  }
}
@media screen and (max-resolution: 96dpi) and (min-width: 481px) { // fly iq4415
  .school-dice-icon {
    height: 6em;
  }
  .game-combinations-layout {
    padding-bottom: .3em;
  }
  .school-result, .game-combination {
    // border: 1px solid pink;
    font-size: 2.4em;
    // font-weight: 700;
    // color: green;
  }
}

@media screen and (max-resolution: 96dpi) and (min-width: 768px) { // fly iq4415
  .game-combinations-layout {
    padding-bottom: .3em;
  }
}

@media screen and (max-resolution: 96dpi) and (orientation: landscape) { // desktop default window proportions
  .game-layout {
    // padding-top: 6em;
    padding-bottom: .6em;
  }
  .school-result, .game-combination {
    // color: red;
    font-size: 4em;
  }
}

.settings-icon {
  fill: $color-white;
}

.accented {
  background-color: $color-combination-hightlight;
}

.nav-drawer-link-icon {
  fill: $color-primary-0;
}

.background-transition {
  transition: background-color .6s ease-in;
}
</style>
