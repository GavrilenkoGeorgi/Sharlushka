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
import firebase from 'firebase/app'
import 'firebase/auth'
// import store from '../store/store'

export default {
  name: 'Main',
  data () {
    return {
      gameName: 'Sharlushka',
      userName: '',
      greeting: 'Hi,',
      exclamation: '.',
      loginOrRegister: 'login'
    }
  },
  computed: mapGetters([
    'getDefaultUserName',
    'getUserName',
    'getUserAuthState'
  ]),
  mounted () {
    this.$nextTick(function () {
      console.log('Main page mounted')
      if (this.getUserAuthState) {
        const initializeAuth = new Promise((resolve, reject) => {
        // this adds a hook for the initial auth-change event
          firebase.auth().onAuthStateChanged(user => {
            const currentUser = firebase.auth().currentUser
            console.log(`Current user is ${currentUser.uid}`)
            db.collection('users').where('uid', '==', currentUser.uid)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.data().uid)
                  let payload = {
                    isAuthenticated: true,
                    // uid: doc.data().uid,
                    name: doc.data().name
                  }
                  /*
                  if (doc.data().uid) {
                    store.commit('setUser', payload)
                  }
                  */
                  // store.state.user.name = doc.data().email // make it a mutation
                  // store.state.user.isAuthenticated = true
                  // store.state.user.uid = currentUser.uid
                  console.log(`This user name is ${payload}`)
                })
              })
              .catch(function (error) {
                console.log('Error getting documents: ', error)
              })
          })
        })
        initializeAuth.then(function (value) {
          console.log(`From promise ${value}`)
        }).catch(
          (error) => {
            console.log(`Something happened ${error}`)
          }
        )
      }
      // this.userName = localStorage.getItem('userName')
      this.userName = this.getUserName
      // console.log(`This user name is ${this.userName}`)
      if (!this.userName || this.userName === '') {
        this.userName = this.getDefaultUserName
        console.log(`No user name ${this.userName}`)
      }
    })
  },
  created () {
    console.log(`Main page created`)
    // console.log(`After promise`)
    /*
    let check = true
    if (check) {
      console.log('User authenticated')
      const initializeAuth = new Promise((resolve, reject) => {
      // this adds a hook for the initial auth-change event
        firebase.auth().onAuthStateChanged(user => {
          const currentUser = firebase.auth().currentUser
          console.log(`Current user is ${currentUser.uid}`)
        })
      })
      initializeAuth.then((userState) => {
        console.log(`From promise ${userState}`)
      })
      // const currentUser = firebase.auth().currentUser
      // console.log(`Current user is ${currentUser.email}`)
    } else {
      console.log('No, user is not authentificated')
    } */
  },
  methods: {
    ...mapActions([
      'newGame'
    ]),
    startNewGame (event) {
      window.location.replace('/game')
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
