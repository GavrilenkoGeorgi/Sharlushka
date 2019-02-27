<template>
  <v-container
    id="tempDice"
    fluid
    fill-height
  >
    <DiceBox />
    <svg
      style="display: none;"
      xmlns="http://www.w3.org/2000/svg"
    >
      <symbol
        id="diceTemp"
        viewBox="-10 -10 220 220"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          fill="currentColor"
          cx="100"
          cy="100"
          r="18"
        />
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z" />
      </symbol>
    </svg>
    <v-layout
      justify-space-around
      column
      fill-height
    >
      <div class="box-dice">
        <svg class="temp-icon">
          <use xlink:href="#diceTemp" />
        </svg>
        <svg class="temp-icon">
          <use xlink:href="#diceTemp" />
        </svg>
        <svg class="temp-icon">
          <use xlink:href="#diceTemp" />
        </svg>
        <svg class="temp-icon">
          <use xlink:href="#diceTemp" />
        </svg>
        <svg class="temp-icon">
          <use xlink:href="#diceTemp" />
        </svg>
      </div>
      <div class="box-dice">
        <svg class="temp-icon">
          <use xlink:href="#diceTemp" />
        </svg>
        <svg class="temp-icon">
          <use xlink:href="#diceTemp" />
        </svg>
        <svg class="temp-icon">
          <use xlink:href="#diceTemp" />
        </svg>
        <svg class="temp-icon">
          <use xlink:href="#diceTemp" />
        </svg>
        <svg class="temp-icon">
          <use xlink:href="#diceTemp" />
        </svg>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
// import router from 'vue-router'
import DiceBox from '../components/DiceBox'

export default {
  components: {
    DiceBox
  },
  data() {
    return {
      greeting: `Hi,`
    }
  },
  methods: {
    updateMainButtonState() {
      const button = document.querySelector(`.main-button`)
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
        button.classList.add(`bounce`)
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/index.scss";

.temp-icon {
  color: pink;
  stroke: pink;
  // display: flex;
  // border: 1px solid blue;
  // width: 2em;
  // overflow: hidden;
  // width: 4em;
  // height: 4em;
}
.box-dice {
  // width: 2em;
  display: flex;
  // width: 100ch;
  // flex-direction: row;
  // overflow: hidden;
  border: 1px solid green;
}

</style>
