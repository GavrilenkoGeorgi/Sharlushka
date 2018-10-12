<template>
  <div id="startPageContent">
    <span class="game-name">Sharlushka</span>
    <img class="startPageDice" src="../assets/icons/startPageDice.svg" alt="Start page dice">
    <span class="greeting">Hi, {{ userName }}.</span>
    <div class="buttonBox">
      <!-- v-btn :color="{'green': $store.state.gameTurns === 1}" dark to="/game"-->
      <v-btn color="purple" dark to="/game" v-bind:class="{orange:$store.state.gameTurns > 1}">
        <v-img :src="require('@/assets/icons/baseline-done-24px.svg')" contain height="2em"></v-img>
      </v-btn>
      <v-btn color="purple" dark to="/register">
        <v-img :src="require('@/assets/icons/baseline-build-24px.svg')" contain height="1.6em"></v-img>
      </v-btn>
    </div>
    <div class="icon-license">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
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
      buttons: {
        playBtn: {
          text: 'Play'
        },
        newUserBtn: {
          text: 'Change'
        }
      },
      userExists: false,
      registerButtonText: 'New User'
    }
  },
  computed: mapGetters([
    'evenOrOdd'
  ]),
  mounted: function () {
    this.$nextTick(function () {
      console.log(`Start page mounted`)
      this.userName = localStorage.getItem('userName')
      if (this.userName === 'Anonymous') {
        console.log(`User Anonymous`)
      } else {
        console.log(`User name is: ${this.userName}`)
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

#startPageContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 3em 0em .5em .0em;
}

.game-name {
  color: $color-primary-0;
  font-family: $game-name-font;
  font-size: 2.5em;
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
.greeting {
  font-size: 1.9em;
}
.icon-license {
  color: $color-primary-0;
  font-size: .4em;
  margin-bottom: 1em;
}
.icon-license > a {
  color: $color-primary-1;
}
.icon-license > a:hover {
  color: $color-orange;
}
</style>
