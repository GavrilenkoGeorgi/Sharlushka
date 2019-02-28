<template>
  <v-container
    id="endGame"
    fill-height
  >
    <!-- Close button -->
    <v-layout
      column
    >
      <closeBtn />
      <!-- Messages -->
      <v-flex
        class="user-name-game-end text-xs-center"
      >
        <h1>
          {{ message }}<br>
          <span>{{ userName }}{{ exclamation }}</span>
        </h1>
      </v-flex>
      <!-- School message -->
      <v-flex
        v-if="!getCurrentGameState.schoolCompleted"
        class="message-school text-xs-center"
      >
        <h3>{{ graduationMessage }}</h3>
        <h2>{{ schoolScoreMessage }} {{ getTotalScore }}</h2>
      </v-flex>
      <!-- Game message -->
      <v-flex
        v-if="getCurrentGameState.schoolCompleted"
        class="message-game text-xs-center"
      >
        <h2>{{ messageText }} {{ getTotalScore }}</h2>
      </v-flex>
      <!-- Buttons -->
      <v-layout
        row
        align-center
        justify-space-around
      >
        <v-flex
          d-flex
          xs5
          lg2
          class="text-xs-center"
        >
          <v-btn
            ripple
            outline
            color="orange"
            @click="restartGame"
          >
            <v-icon
              medium
              color="orange"
            >
              replay
            </v-icon>
            restart
          </v-btn>
        </v-flex>
        <v-flex
          d-flex
          xs5
          lg2
          class="text-xs-center"
        >
          <v-btn
            ripple
            outline
            color="purple darken-1"
            :to="'/userstats'"
          >
            <v-icon
              medium
              color="purple darken-1"
            >
              trending_up
            </v-icon>
            stats
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import store from '../store/store'
import closeBtn from '../components/CloseBtn.vue'
import db from './firebaseInit'

export default {
  components: {
    closeBtn
  },
  data() {
    return {
      message: `Game over,`,
      messageText: `Your score is`,
      graduationMessage: `You can't even finish the school.`,
      schoolScoreMessage: `Your score is`,
      userName: ``,
      highestScore: null,
      hiscoreGreeting: `Your highest score is`,
      exclamation: `!`, // some over-engeneering
      lastScores: ``,
      schoolScores: ``,
      dbUsersCollRef: `users`
    }
  },
  computed: {
    ...mapGetters([
      `getTotalScore`,
      `getSchoolScore`,
      `getCurrentGameState`,
      `getDefaultUserName`,
      `getUserData`
    ])
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`Game over`)
      // check user auth status
      if (this.getUserData.isAuthenticated) {
        this.userName = localStorage.getItem(`userName`)
      } else {
        this.userName = this.getDefaultUserName
      }
      if (this.getCurrentGameState.gameInProgress) {
        // collect them when game finished
        // i.e. user played the game till the end
        // and not actually reloading the page
        if (localStorage.getItem(`highestScore`) === ``) {
          // check if user ever played a game
          console.log(`No local storage score array exist yet, creating one`)
          this.highestScore = this.getTotalScore // first run
          localStorage.setItem(`highestScore`, this.getTotalScore)
          // and
          this.addScoreToDatabase()
        } else {
          this.lastScores = localStorage.getItem(`lastScoresArray`)
          this.schoolScores = localStorage.getItem(`schoolScores`)
          this.highestScore = localStorage.getItem(`highestScore`)
          // just add it already
          this.addScoreToDatabase()
        }
        // set to default state so repeating visits
        // to this page won't fill our array with zeroes
        // store.state.gameInProgress = false // mutation?
        store.commit(`stopGame`)
      } else {
        console.log(`Nothing to record, play the game.`)
      }
    })
  },
  methods: {
    restartGame() {
      console.log(`Restarting game.`)
      store.commit(`resetState`)
      this.$router.push(`/game`)
    },
    // add anonymous score to local storage
    addScoreToDatabase() {
      console.log(`Adding score.`)
      // one function?
      if (this.lastScores === ``) {
        this.lastScores = [] // first run
      } else {
        this.lastScores = this.lastScores.split(`,`)
      }
      if (this.schoolScores === ``) {
        this.schoolScores = []
      } else {
        this.schoolScores = this.schoolScores.split(`,`)
      }
      // check for new highest score
      if (this.getTotalScore > this.highestScore) {
        this.highestScore = this.getTotalScore
        localStorage.setItem(`highestScore`, this.getTotalScore)
      } else {
        console.log(`Your score is not so high: ${this.getTotalScore}`)
      }

      if (this.getCurrentGameState.schoolCompleted) {
        // record game result if school completed
        this.lastScores.push(this.getTotalScore)
        localStorage.setItem(`lastScoresArray`, this.lastScores)
        // and school result for stats
        this.schoolScores.push(this.getSchoolScore)
        localStorage.setItem(`schoolScores`, this.schoolScores)
      } else {
        // game ended in school,
        // so we have only school result to save
        this.schoolScores.push(this.getSchoolScore)
        localStorage.setItem(`schoolScores`, this.schoolScores)
      }
      // finally if user is registered
      if (this.getUserData.isAuthenticated) {
        this.syncScoreInFirebase()
      } else {
        console.log(`Anonymous! To save results please register.`)
      }
    },
    // if user exists add score to the account
    syncScoreInFirebase() {
      console.log(`Syncing score for user ${localStorage.getItem(`userName`)}`)
      const uid = localStorage.getItem(`userUid`)
      db.collection(this.dbUsersCollRef).where(`uid`, `==`, uid)
        .get()
        .then(querySnapshot => {
          let docToUpdateId
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().uid === uid) {
              docToUpdateId = doc.id
            }
          })
          return docToUpdateId
        })
        .then(docToUpdateId => {
          const docRef = db.collection(this.dbUsersCollRef).doc(docToUpdateId)
          const resultsArrayToUpdate = localStorage.getItem(`lastScoresArray`)
          const highestScoreToUpdate = localStorage.getItem(`highestScore`)
          const schoolScoresToUpdate = localStorage.getItem(`schoolScores`)
          const updateDocRef = docRef.update({
            resultsArray: resultsArrayToUpdate,
            schoolResultsArray: schoolScoresToUpdate,
            hiScore: highestScoreToUpdate
          })
          console.log(`...updating user stats`)
          return updateDocRef // ? true
        })
        .catch(error => {
          console.log(`Error getting documents: `, error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/index.scss";

.user-name-game-end, .message-school, .message-game {
  font-family: $text-font;
}
.user-name-game-end {
  span {
    color: $color-chosen;
  }
}
.message-school {
  line-height: 1.5;
}

</style>
