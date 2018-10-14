<template>
<div id="tempDice">
  <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="diceTemp" viewBox="-10 -10 220 220" preserveAspectRatio="xMidYMid meet">
        <circle fill="currentColor" cx="100" cy="100" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
    </svg>
  <!--v-container>
    <v-layout fluid>
      <v-flex>
        <svg class="temp-icon">
          <use xlink:href="#diceTemp"></use>
        </svg>
      </v-flex>
      <v-flex>
        <svg class="temp-icon">
          <use xlink:href="#diceTemp"></use>
        </svg>
      </v-flex>
      <v-flex>
        <svg class="temp-icon">
          <use xlink:href="#diceTemp"></use>
        </svg>
      </v-flex>
      <v-flex>
        <svg class="temp-icon">
          <use xlink:href="#diceTemp"></use>
        </svg>
      </v-flex>
      <v-flex>
        <svg class="temp-icon">
          <use xlink:href="#diceTemp"></use>
        </svg>
      </v-flex>
    </v-layout>
  </v-container-->
  <div class="box-dice">
    <svg class="temp-icon">
      <use xlink:href="#diceTemp"></use>
    </svg>
    <svg class="temp-icon">
      <use xlink:href="#diceTemp"></use>
    </svg>
    <svg class="temp-icon">
      <use xlink:href="#diceTemp"></use>
    </svg>
    <svg class="temp-icon">
      <use xlink:href="#diceTemp"></use>
    </svg>
    <svg class="temp-icon">
      <use xlink:href="#diceTemp"></use>
    </svg>
  </div>
</div>
</template>

<script>
// import router from 'vue-router'

export default {
  data () {
    return {
      greeting: 'Hi,'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";

.temp-icon {
  color: pink;
  stroke: pink;
  // width: 2em;
  // overflow: hidden;
  width: 4em;
  height: 4em;
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
