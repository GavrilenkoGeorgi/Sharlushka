<template>
  <div class="startPageContent">
    <p class="gameName">Sharlushka</p>
    <img class="startPageDice" src="../assets/icons/startPageDice.svg" alt="Start page dice">
    <h2 class="greeting">Hi, {{ userName }}.</h2>
    <div class="buttonBox">
      <div class="button">
        <router-link to="/game">Play</router-link>
      </div>
      <div class="button">
        <router-link to="/register">{{ registerButtonText }}</router-link>
      </div>
    </div>
    <div class="iconLicense">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      userName: 'Anonymous',
      userExists: false,
      registerButtonText: 'New User'
    }
  },
  computed: mapGetters([
    'evenOrOdd'
  ]),
  mounted: function () {
    this.$nextTick(function () {
      console.log(`Home view mounted`)
      this.userName = localStorage.getItem('userName')
      if (this.userName !== 'Anonymous') {
        console.log(`User name set`)
      } else {
        console.log(`User Anonymous`)
      }
    })
  },
  methods: {
    ...mapActions([
      'newGame'
    ]),
    startNewGame (event) {
      window.location.replace('/game')
      // this.router.push('/game')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/index.scss";
@import "../assets/scss/vars/colors.scss";
@import "../assets/scss/vars/fonts.scss";

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
  color: $color-primary-0;
  font-family: $game-name-font;
  font-size: 3.5em;
  // margin-top: 1.5em;
}
.startPageDice {
  height: 30vh;
}
.buttonBox {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.button {
  background: $color-primary-0;
  border: none;
  border-radius: .25em;
  font-size: 1.2em;
  // color: white;
  padding: .3em;
  width: 6em;
  text-align: center;
  a {
    color: white;
    text-decoration: none;
  }
}
.startPageButton:hover{
  box-shadow: 0px 0px 6px $color-primary-0;
}
.iconLicense {
  color: $color-gray;
  font-size: .5em;
  margin-bottom: 1em;
}
.iconLicense > a {
  color: $color-gray;
}
.iconLicense > a:hover {
  color: $color-orange;
}
</style>
