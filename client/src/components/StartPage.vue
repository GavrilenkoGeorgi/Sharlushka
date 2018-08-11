<template>
<div class="startPageContent">
  <p class="gameName">Sharlushka</p>
  <img class="startPageDice" src="../assets/icons/startPageDice.svg" alt="Start page dice">
  <div class="buttonBox">
    <button class="startPageButton" v-on:click="startNewGame">Play</button>
    <button class="startPageButton">Login</button>
  </div>
  <div class="iconLicense">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'StartPage',
  computed: mapGetters([
    'evenOrOdd'
  ]),
  methods: {
    ...mapActions([
      'newGame'
    ]),
    startNewGame (event) {
      window.location.replace('/#/game')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Fredericka+the+Great');

$color-gray: hsl(0, 0%, 85%);
$color-orange: hsl(36, 100%, 50%);
$color-green: hsl(167, 100%, 30%);
$color-white: hsl(0, 0%, 100%);

.startPageContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.gameName {
  color: $color-green;
  font-family: 'Fredericka the Great', cursive;
  font-size: 3.5em;
  margin-top: 1.5em;
}
.startPageDice {
  height: 13em;
}
.buttonBox {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.startPageButton {
  background: $color-green;
  border: none;
  border-radius: .25em;
  font-size: 1.2em;
  color: $color-white;
  padding: .3em;
  width: 6em;
}
.startPageButton:hover{
  box-shadow: 0px 0px 6px $color-green;
}
.iconLicense {
  color: $color-gray;
  font-size: .6em;
  margin-bottom: 1em;
}
.iconLicense > a {
  color: $color-gray;
}
.iconLicense > a:hover {
  color: $color-orange;
}
</style>
