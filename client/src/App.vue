<template>
  <div id="app">
    <!-- router-view/ -->
    <game/>
  </div>
</template>

<script>
// import Hello from './components/Hello'
import Game from './components/Game'
export default {
  name: 'App',
  components: {
    Game
  }
}
</script>

<style>
body{
  display: flex;
  justify-content: center;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border: 2px solid rgb(48, 48, 48);
  margin: 2px;
  width: 360px;
  height: 640px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2em;
}
</style>
