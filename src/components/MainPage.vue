<template>
  <v-container id="startPageContent">
    <v-layout row wrap justify-center fill-height>
      <v-flex xs12 class="game-name">
        <v-layout align-center justify-end column fill-height>
        <h1>{{ gameName }}</h1>
        </v-layout>
      </v-flex>
      <v-flex xs8 sm2>
        <!-- img class="startPageDice" src="../assets/icons/startPageDice.svg" alt="Start page dice"-->
        <v-img :src="require('@/assets/icons/startPageDice.svg')" contain></v-img>
      </v-flex>
      <v-flex xs12 class="greeting">
        <h2>Hi, {{ userName }}.</h2>
    </v-flex>
    <v-flex xs12 class="buttons">
        <!-- v-btn :color="{'green': $store.state.gameTurns === 1}" dark to="/game"-->
        <v-layout justify-space-around row>
          <v-flex xs5 sm4 md2 d-flex>
            <v-btn large color="purple" dark to="/game" v-bind:class="{orange:$store.state.gameTurns > 1}">
              <v-img :src="require('@/assets/icons/baseline-done-24px.svg')" contain height="2em"></v-img>
            </v-btn>
          </v-flex>

          <v-flex xs5 sm4 md2 d-flex>
          <v-btn large color="purple" dark to="/register">
            <v-img :src="require('@/assets/icons/baseline-build-24px.svg')" contain height="1.6em"></v-img>
          </v-btn>
          </v-flex>
        </v-layout>
    </v-flex>
    <v-flex class="icon-license">
      <v-layout align-center justify-end column fill-height>
        <span>
      Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        </span>
      </v-layout>
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
      // console.log(`Start page mounted`)
      let name = localStorage.getItem('userName')
      if (name) {
        // console.log(name)
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
  // font-size: 2em;
  text-align: center;
  color: $color-primary-0;
}
.greeting {
  text-align: center;
}
.buttons {
  width: 100%;
}
.icon-license {
  text-align: center;
  font-size: .55em;
  color: gray;
}
.border {
  border: 1px solid pink;
}
</style>
