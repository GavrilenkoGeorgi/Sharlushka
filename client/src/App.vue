<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
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
@import "./assets/scss/index.scss";
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
