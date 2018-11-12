<template>
  <v-container fluid fill-height ma-0 pa-0 id="app">
<!-- SVG icons defs -->
  <!-- Default icons -->
      <svg version='1.1' style="display: none;" xmlns="http://www.w3.org/2000/svg">
        <symbol id="diceOnes" viewBox="0 0 200 200">
          <circle fill="currentColor" cx="100" cy="100" r="18"/>
          <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
        </symbol>
        <symbol id="diceTwos" viewBox="0 0 200 200">
          <circle fill="currentColor" cx="50" cy="150" r="18"/>
          <circle fill="currentColor" cx="150" cy="50" r="18"/>
          <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
        </symbol>
        <symbol id="diceThrees" class="dice" viewBox="0 0 200 200">
          <circle fill="currentColor" cx="50" cy="150" r="18"/>
          <circle fill="currentColor" cx="100" cy="100" r="18"/>
          <circle fill="currentColor" cx="150" cy="50" r="18"/>
          <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
        </symbol>
        <symbol id="diceFours" class="dice" viewBox="0 0 200 200">
          <circle fill="currentColor" cx="150" cy="50" r="18"/>
          <circle fill="currentColor" cx="150" cy="150" r="18"/>
          <circle fill="currentColor" cx="50" cy="150" r="18"/>
          <circle fill="currentColor" cx="50" cy="50" r="18"/>
          <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
        </symbol>
        <symbol id="diceFives" class="dice" viewBox="0 0 200 200">
          <circle fill="currentColor" cx="100" cy="100" r="18"/>
          <circle fill="currentColor" cx="150" cy="50" r="18"/>
          <circle fill="currentColor" cx="150" cy="150" r="18"/>
          <circle fill="currentColor" cx="50" cy="150" r="18"/>
          <circle fill="currentColor" cx="50" cy="50" r="18"/>
          <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
        </symbol>
        <symbol id="diceSixes" class="dice" viewBox="0 0 200 200">
          <circle fill="currentColor" cx="150" cy="100" r="18"/>
          <circle fill="currentColor" cx="150" cy="50" r="18"/>
          <circle fill="currentColor" cx="150" cy="150" r="18"/>
          <circle fill="currentColor" cx="50" cy="150" r="18"/>
          <circle fill="currentColor" cx="50" cy="100" r="18"/>
          <circle fill="currentColor" cx="50" cy="50" r="18"/>
          <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
        </symbol>
        <symbol id="appClose" viewBox="0 0 24 24">
          <path class="close-icon-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z"/>
        </symbol>
      </svg>
<!-- SVG icons end -->
      <transition name="custom-classes-transition"
                  mode="out-in"
                  enter-active-class="animated fadeInRight"
                  leave-active-class="animated fadeOutLeft">
        <router-view />
      </transition>
  </v-container>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      status: false
    }
  },
  methods: {
    init: function () {
      this.status = true
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/index.scss";
@import "../node_modules/animate.css/animate.css";
#app {
  font-family: $text-font;
  height: 100vh;
}

.border {
  // border: 1px solid red;
}
</style>
