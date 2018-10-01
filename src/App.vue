<template>
  <div id="app">
            <!-- SVG icons defs -->
    <!-- Default icons -->
    <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="diceOnes" viewBox="-10 -10 220 220">
        <circle fill="currentColor" cx="100" cy="100" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceTwos" viewBox="-10 -10 220 220">
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceThrees" class="dice" viewBox="-10 -10 220 220">
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="100" cy="100" r="18"/>
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceFours" class="dice" viewBox="-10 -10 220 220">
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <circle fill="currentColor" cx="150" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceFives" class="dice" viewBox="-10 -10 220 220">
        <circle fill="currentColor" cx="100" cy="100" r="18"/>
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <circle fill="currentColor" cx="150" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceSixes" class="dice" viewBox="-10 -10 220 220">
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
    <transition name="custom-classes-transition" mode="out-in" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">
      <router-view/>
    </transition>
  </div>
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
// document.addEventListener('deviceready', this.init)
</script>

<style lang="scss">
@import "./assets/scss/index.scss";
@import "../node_modules/animate.css/animate.css";
@import "../node_modules/hamburgers/_sass/hamburgers/hamburgers.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: $text-font;
  font-size: 16px;
}

#app {
  display: flex;
  height: 100vh;
}
</style>
