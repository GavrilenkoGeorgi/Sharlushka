<template>
  <div id="app">
    <!-- router-view/ -->
    <Navigation/>
    <div class="content">
    <Game/>
    </div>
  </div>
</template>

<script>
// import Hello from './components/Hello'
import Game from './components/Game'
import Navigation from './components/Navigation'
export default {
  name: 'App',
  components: {
    Game,
    Navigation
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono');
body{
  display: flex;
  justify-content: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1em;
}
#app {
  text-align: center;
  border: 1px solid hsl(167, 100%, 30%);
  width: 360px;
  height: 640px;
}
.content {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // justify-content: flex-end;
  padding: 0em 1em 0em 1em;
}
</style>
