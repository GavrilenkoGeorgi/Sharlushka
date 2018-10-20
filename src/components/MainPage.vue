<template>
  <v-container xs12 sm8 md6 fill-height id="startPageContent">
    <v-layout column align-center>
      <v-flex d-flex align-end>
        <h1 class="game-name">{{ gameName }}</h1>
      </v-flex>
      <v-flex d-flex align-center>
        <!-- img class="startPageDice" src="../assets/icons/startPageDice.svg" alt="Start page dice"-->
        <v-img :src="require('@/assets/icons/startPageDice.svg')" height="10em" width="10em"></v-img>
      </v-flex>
      <v-flex d-flex align-center>
        <h2 class="greeting">Hi, {{ userName }}.</h2>
    </v-flex>
    <v-flex d-flex align-end class="buttons">
        <!-- v-btn :color="{'green': $store.state.gameTurns === 1}" dark to="/game"-->
        <v-btn large color="purple" dark to="/game" v-bind:class="{orange:$store.state.gameTurns > 1}">
          <v-img :src="require('@/assets/icons/baseline-done-24px.svg')" contain height="2em"></v-img>
        </v-btn>
        <v-btn large color="purple" dark to="/register">
          <v-img :src="require('@/assets/icons/baseline-build-24px.svg')" contain height="1.6em"></v-img>
        </v-btn>
    </v-flex>
    <v-flex d-flex align-end class="icon-license">
      <span>
      Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
      </span>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      userName: 'Anonymous',
      gameName: 'Sharlushka',
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
      let name = localStorage.getItem('userName')
      if (name) {
        console.log(name)
        // localStorage.setItem('userName')
        // localStorage.setItem('userName', this.userName)
        this.userName = name
      }
      // else {
      // console.log(`User name is: ${this.userName}`)
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

<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";
.game-name {
  font-size: 3em;
  color: $color-primary-0;
}
.buttons {
  width: 100%;
}
.icon-license {
  font-size: .55em;
  color: gray;
}
</style>
