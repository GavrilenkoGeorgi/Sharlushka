<template>
  <div id="app">
  <!-- SVG icons defs -->
    <!-- Default icons -->
    <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="diceOnes" viewBox="-10 -10 220 220" preserveAspectRatio="xMidYMid slice">
        <circle fill="currentColor" cx="100" cy="100" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceTwos" viewBox="-10 -10 220 220" preserveAspectRatio="xMidYMid slice">
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceThrees" class="dice" viewBox="-10 -10 220 220" preserveAspectRatio="xMidYMid slice">
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="100" cy="100" r="18"/>
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceFours" class="dice" viewBox="-10 -10 220 220" preserveAspectRatio="xMidYMid slice">
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <circle fill="currentColor" cx="150" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceFives" class="dice" viewBox="-10 -10 220 220" preserveAspectRatio="xMidYMid slice">
        <circle fill="currentColor" cx="100" cy="100" r="18"/>
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <circle fill="currentColor" cx="150" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="diceSixes" class="dice" viewBox="-10 -10 220 220" preserveAspectRatio="xMidYMid slice">
        <circle fill="currentColor" cx="150" cy="100" r="18"/>
        <circle fill="currentColor" cx="150" cy="50" r="18"/>
        <circle fill="currentColor" cx="150" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="150" r="18"/>
        <circle fill="currentColor" cx="50" cy="100" r="18"/>
        <circle fill="currentColor" cx="50" cy="50" r="18"/>
        <path d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"/>
      </symbol>
      <symbol id="appClose" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <path class="close-icon-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z"/>
      </symbol>
    </svg>
    <!-- SVG icons end -->
    <transition name="custom-classes-transition" mode="out-in" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">
      <router-view />
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
</script>

<style lang="scss">
@import "./assets/scss/index.scss";
@import "../node_modules/animate.css/animate.css";
// @import '../node_modules/material-icons/css/material-icons.min.css';
// @import "../node_modules/hamburgers/_sass/hamburgers/hamburgers.scss";
// @import '~material-icons/css/material-icons.scss';
// @import 'material-design-icons-iconfont/dist/material-design-icons.css';

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
  // transition: all 1s;
}
</style>
