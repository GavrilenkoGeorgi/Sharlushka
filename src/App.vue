<template>
  <div id="app">
    <router-view/>
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
