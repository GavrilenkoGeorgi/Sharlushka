<template>
  <div id="app">
    <router-view/>
    <dice/>
  </div>
</template>

<script>
import Dice from './components/Dice'
export default {
  name: 'App',
  components: {
    Dice
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
}
</style>
