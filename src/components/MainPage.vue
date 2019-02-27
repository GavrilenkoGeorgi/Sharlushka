<template>
  <v-container
    id="startPageContent"
    pb-2
    fill-height
  >
    <v-layout
      align-space-around
      column
    >
      <v-flex
        d-flex
        align-end
        class="text-xs-center"
      >
        <h1 class="game-name">
          {{ gameName }}
        </h1>
      </v-flex>
      <v-flex
        justify-center
        style="padding: 0em 4em 0em 4em"
      >
        <!--v-img max-width="12em" :src="require('./startPageDice.svg')" contain></v-img-->
        <!--span v-html="require(`../assets/icons/startPageDice.svg`)" /-->
        <!--div v-html="require(`./startPageDice.svg`)"></div-->
      </v-flex>
      <v-flex
        d-flex
        align-center
        class="text-xs-center"
      >
        <h2 class="user-name-main-page">
          {{ greeting }} {{ userName }}{{ exclamation }}
        </h2>
      </v-flex>
      <v-layout
        row
        align-center
        justify-space-around
      >
        <v-flex
          xs4
          lg2
          class="text-xs-center"
        >
          <v-btn
            to="/game"
            ripple
            color="purple darken-1"
            aria-label="Start game"
            :class="{orange:$store.state.currentGameTurn > 1}"
          >
            <v-icon color="white">
              done
            </v-icon>
          </v-btn>
        </v-flex>
        <v-flex
          xs4
          lg2
          class="text-xs-center"
        >
          <v-btn
            to="/login"
            ripple
            color="purple darken-1"
            aria-label="Register or change name"
          >
            <v-icon color="white">
              how_to_reg
            </v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <span class="copyrights text-xs-center">
        Icons made by
        <a
          href="https://www.flaticon.com/authors/smashicons"
          title="Smashicons"
        >
          Smashicons
        </a>
        from
        <a
          href="https://www.flaticon.com/"
          title="Flaticon"
        >
          www.flaticon.com
        </a>
        is licensed by
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
          rel="noopener"
        >
          CC 3.0 BY
        </a>
      </span>
    </v-layout>
  </v-container>
</template>

<script>
import db from './firebaseInit'
// import firebase from 'firebase/app'
// import 'firebase/auth'
import {mapGetters, mapActions} from 'vuex'
// import firebaseConfig from './firebaseConfig'

export default {
  name: `Main`,
  data() {
    return {
      gameName: `Sharlushka`,
      userName: `empty string`,
      greeting: `Hi,`,
      exclamation: `.`,
    }
  },
  computed: {
    ...mapGetters([
      `getUserData`,
      `getDefaultUserName`,
    ]),
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`Main page mounted.`)
      //
      // Here
      //
      /*
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
        console.log(`Init firebase`)
      } else {
        console.log(`No firebase init`)
        // firebase.firestore().settings({timestampsInSnapshots: true})
      } */
      /*
      const initializeAuth = new Promise(resolve => {
        // this adds a hook for the initial auth-change event
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            authService.setUser(user)
            resolve(user)
          } else {
            console.log(`No user!`)
          }
        })
      })
      const authService = {
        userUid: null,
        authenticated () {
          return initializeAuth.then(user => {
            return user && !user.isAnonymous
          })
        },
        setUser (user) {
          this.userUid = user.uid
          console.log(`User set ${user.email}`)
        }
      } */
      /*
      if (true) {
        authService.authenticated().then((result) => {
          // this.userName = authService.userUid
          // console.log(`Setting uid ${authService.userUid}`)
          let nameToSet = getUserNameFromDB(authService.userUid)
          if (result) {
            let currentUserData = {
              isAuthenticated: true,
              uid: authService.userUid,
              name: nameToSet
            }
            store.commit(`setUser`, currentUserData)
          }
        }).catch((error) => {
          console.log(`Error ${error}`)
        })
      }
      */
      /*
      if (this.getUserData.isAuthenticated) {
        console.log(`Setting user score from db...`)
        this.setUserScoreDataFromDB(this.getUserData.uid)
      } else {
        this.userName = this.getDefaultUserName
        if (localStorage.getItem(`schoolScores`) === null) {
          localStorage.setItem(`schoolScores`, ``)
          localStorage.setItem(`lastScoresArray`, ``)
          localStorage.setItem(`highestScore`, ``)
        }
      } */
    })
  },
  methods: {
    ...mapActions([
      `newGame`,
    ]),
    startNewGame() {
      // window.location.replace('/game')
      this.$router.push(`/`)
    },
    setUserScoreDataFromDB(uid) {
      console.log(`Getting user scores for uid ${uid}`)
      db.collection(`users`).where(`uid`, `==`, uid)
        .get()
        .then(function(querySnapshot) {
          let userScores = {}
          querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
            if (doc.data().uid === uid) {
              userScores = {
                hiScore: doc.data().hiScore,
                resultsArray: doc.data().resultsArray,
                schoolResultsArray: doc.data().schoolResultsArray,
              }
            }
          })
          return userScores
        })
        .then((userScores) => {
          localStorage.setItem(`highestScore`, userScores.hiScore)
          localStorage.setItem(`lastScoresArray`, userScores.resultsArray)
          localStorage.setItem(`schoolScores`, userScores.schoolResultsArray)
        })
        .catch(function(error) {
          console.log(`Error getting documents: `, error)
        })
    },
  },
}
</script>

<style lang="scss" scoped>

@import "../assets/scss/index.scss";
.game-name, .user-name, .user-name-main-page, .copyrights {
  font-family: $text-font;
}
.game-name {
  font-size: 3em;
  color: $color-primary-0;
}
.user-name {
  font-size: 2em;
}
.user-name-main-page {
  font-size: 2.3em;
  color: $color-primary-3;
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
