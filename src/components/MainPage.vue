<template>
  <v-container fill-height id="startPageContent">
    <v-layout align-space-around column>
      <v-flex d-flex align-center class="text-xs-center">
        <h1 class="game-name">{{ gameName }}</h1>
      </v-flex>
      <v-flex d-flex xs4>
        <v-img :src="require('@/assets/icons/startPageDice.svg')" contain></v-img>
      </v-flex>
      <v-flex d-flex align-center class="text-xs-center">
        <h2 class="user-name">{{ greeting }} {{ this.userName }}{{ exclamation }}</h2>
    </v-flex>
    <v-layout row align-center justify-space-around>
        <v-flex xs4 lg2 class="text-xs-center">
          <v-btn to="/game" ripple block class="ui-button"
            large color="purple darken-1"
            aria-label="Start game"
            v-bind:class="{orange:$store.state.currentGameTurn > 1}">
            <v-img :src="require('@/assets/icons/baseline-done-24px.svg')"
              contain height="2em"></v-img>
          </v-btn>
        </v-flex>
        <v-flex xs4 lg2 class="text-xs-center">
          <v-btn to="/login" ripple block class="ui-button"
            large color="purple darken-1"
            aria-label="Register or change name">
            <v-img :src="require('@/assets/icons/baseline-how_to_reg-24px.svg')"
              contain height="2em"></v-img>
          </v-btn>
        </v-flex>
      </v-layout>
      <span class="copyrights text-xs-center">
        Icons made by
        <a href="https://www.flaticon.com/authors/smashicons"
          title="Smashicons">
          Smashicons
        </a>
        from
        <a href="https://www.flaticon.com/"
          title="Flaticon">
          www.flaticon.com
        </a>
        is licensed by
        <a href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0" target="_blank" rel="noopener">
          CC 3.0 BY
        </a>
      </span>
    </v-layout>
  </v-container>
</template>

<script>
import db from './firebaseInit'
import { mapGetters, mapActions } from 'vuex'
// import firebase from 'firebase/app'
// import 'firebase/auth'
// import store from '../store/store'

export default {
  name: 'Main',
  data () {
    return {
      gameName: 'Sharlushka',
      userName: '1',
      greeting: 'Hi,',
      exclamation: '.'
    }
  },
  computed: {
    ...mapGetters([
      // 'getUserName', // remove this
      // 'getUserAuthState',
      'getUserData',
      'getDefaultUserName'
    ]),
    userNameChanged: function () {
      return this.getUserData.name
    }
  },
  watch: {
    userNameChanged: {
      immediate: true,
      handler () { // some spaghetti code
        this.userName = this.getUserData.name
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      console.log('Main page mounted')
      if (this.getUserData.isAuthenticated) {
        console.log(`Setting user score from db...`)
        this.setUserScoreDataFromDB(this.getUserData.uid)
      } else {
        this.userName = this.getDefaultUserName
        if (localStorage.getItem('schoolScores') === null) {
          localStorage.setItem('schoolScores', '')
          localStorage.setItem('lastScoresArray', '')
          localStorage.setItem('highestScore', '')
        }
      }
    })
  },
  methods: {
    ...mapActions([
      'newGame'
    ]),
    startNewGame (event) {
      window.location.replace('/game')
    },
    setUserScoreDataFromDB (uid) {
      console.log(`Getting user scores for uid ${uid}`)
      db.collection('users').where('uid', '==', uid)
        .get()
        .then(function (querySnapshot) {
          let userScores = {}
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().uid === uid) {
              userScores = {
                hiScore: doc.data().hiScore,
                resultsArray: doc.data().resultsArray,
                schoolResultsArray: doc.data().schoolResultsArray
              }
            }
          })
          return userScores
        })
        .then((userScores) => {
          localStorage.setItem('highestScore', userScores.hiScore)
          localStorage.setItem('lastScoresArray', userScores.resultsArray)
          localStorage.setItem('schoolScores', userScores.schoolResultsArray)
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
.game-name, .user-name, .copyrights {
  font-family: $text-font;
}
.game-name {
  font-size: 3em;
  color: $color-primary-0;
}
.user-name {
  font-size: 2em;
}
.copyrights {
  font-size: .9em;
  color: rgb(83, 83, 83);
}

@media screen and (orientation: landscape) {
  .game-name {
    font-size: 2.8em;
  }
}

@media screen and (max-resolution: 96dpi) and (min-width: 500px) { // desktop
  .game-name {
    font-size: 5em;
  }
  .user-name {
    font-size: 4em;
  }
}
</style>
