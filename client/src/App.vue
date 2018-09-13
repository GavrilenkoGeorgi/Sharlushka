<template>
  <div id="app">
    <!--Navigation/-->
    <!--Game/-->
    <router-view/>
  </div>
</template>

<script>
// import Hello from './components/Hello'
// import Game from './components/Game'
// import Navigation from './components/Navigation'
// import Register from './components/Register'
export default {
  name: 'App' // ,
  // components: {
  /* Game, */
  /* Navigation, */
  /* Register */
  // }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:700');
@import "./assets/scss/index.scss";
@import "./assets/scss/vars/hamburgers-settings";
@import "../node_modules/hamburgers/_sass/hamburgers/hamburgers.scss";

$color-green: hsl(167, 100%, 30%);
$color-orange: hsl(36, 100%, 50%);
$color-gray: hsl(0, 0%, 85%);
$color-lightGray: hsl(0, 0%, 95%);
$color-darkGray: hsl(0, 0%, 50%);
$color-white: hsl(0, 0%, 100%);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  // display: flex;
  // justify-content: center;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1em;
}
#app {
  display: flex;
  // flex-direction: column;
  // justify-content: flex-end;
  // align-content: flex-end;
  // align-items: flex-end;
  // text-align: center;
  // border: 0.063em solid hsl(167, 100%, 30%);
  // width: 360px;
  height: 100vh; //640 px
}
</style>
