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
  border: 0.063em solid hsl(167, 100%, 30%);
  // width: 360px;
  height: 40em; //640 px
}
</style>
