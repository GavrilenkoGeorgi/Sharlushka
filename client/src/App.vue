<template>
  <div id="app">
    <!-- router-view/ -->
    <Navigation/>
    <div class="content">
      <div class="info">Anonymous:  {{ $store.state.rollCount }} rolls left.</div>
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
body{
  display: flex;
  justify-content: center;
}
#app {
  text-align: center;
  color: #2c3e50;
  border: 1px solid hsl(167, 100%, 30%);
  width: 360px;
  height: 640px;
}
.content {
  flex-direction: column;
  justify-content: flex-end;
  padding: 0em 1em 0em 1em;
}
.info {
  color: hsl(36, 100%, 50%);
  font-weight: 500;
  font-size: 1.2em;
  vertical-align: middle;
  margin: .2em 0em .3em 0em;
}
</style>
