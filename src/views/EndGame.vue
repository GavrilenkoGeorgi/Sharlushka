<template>
  <v-container
    id="endGame"
    fill-height
    pa-0
    mp-0
  >
    <v-layout
      column
    >
      <!-- Messages -->
      <v-flex
        class="user-name-game-end text-xs-center"
        align-center
        d-flex
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
        <h2>{{ messageText }} <span class="highlighted">{{ getTotalScore }}</span></h2>
      </v-flex>
      <!-- Buttons -->
      <v-layout
        row
        align-center
        justify-space-around
      >
        <v-flex
          d-flex
          xs6
          lg2
          class="text-xs-center"
        >
          <v-btn
            ripple
            outline
            color="orange"
            class="button"
            @click="restartGame()"
          >
            <restartIcon class="highlighted button-icon-margin" />
            restart
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
    <!-- Offline save dialog -->
    <v-dialog
      v-model="networkProblemDialog"
      width="20em"
    >
      <v-card class="text-xs-center offline-dialog">
        <v-flex class="network-check-background pt-1">
          <NetworkCheck />
        </v-flex>
        <v-card-text
          class="text-xs-left offline-dialog-message"
        >
          {{ offlineSaveUserMessage }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="orange"
            outline
            :loading="tryAgainBtnLoading"
            class="button"
            @click="syncScoreWithFirestore"
          >
            <restartIcon class="highlighted" />
            Try again
          </v-btn>
          <v-btn
            outline
            ripple
            color="purple darken-2"
            class="button"
            @click="networkProblemDialog = false"
          >
            <cancelIcon class="default-icon-color" />
            Cancel
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '../store/store' // $this.store?
import db from '../firebase/firebaseInit'
import NetworkCheck from '../components/NetworkCheck.vue'
import restartIcon from '../assets/icons/baseline-replay-24px.svg'
import cancelIcon from '../assets/icons/baseline-cancel-24px.svg'

export default {
  components: {
    NetworkCheck,
    restartIcon,
    cancelIcon
  },
  data() {
    return {
      message: `Game over,`,
      messageText: `Your score is`,
      graduationMessage: `You can't even finish the school.`,
      schoolScoreMessage: `Your score is`,
      userName: ``,
      highestScore: null,
      networkProblemDialog: false,
      tryAgainBtnLoading: false,
      offlineSaveUserMessage: `You are offline,
        connect to the internet to save results.
        If you choose to cancel, results are saved
        in local storage and will be saved to DB
        next time you finish the game.`,
      // hiscoreGreeting: `Your highest score is`,
      exclamation: `!`, // some over-engeneering
      lastScores: ``,
      schoolScores: ``,
      combinationsFavs: ``,
      dbUsersCollRef: `users`
    }
  },
  computed: {
    ...mapGetters([
      `getTotalScore`,
      `getSchoolScore`,
      `getCurrentGameState`,
      `getDefaultUserName`,
      `getUserData`,
      `isGameEnded`,
      `getCurrentNonZeroCombinations`
    ])
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`Game over view mounted.`)
      // check user auth status
      if (this.getUserData.isAuthenticated) {
        this.userName = localStorage.getItem(`userName`)
      } else {
        this.userName = this.getDefaultUserName
      }
      if (this.isGameEnded) {
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
          this.combinationsFavs = localStorage.getItem(`combinationsFavs`)
          // just add it already
          this.addScoreToDatabase()
        }
        this.$store.dispatch(`setLastSave`, true).then(() => {
          // don't show dice box after saving results
          // till reset
          console.log(`This was the last save until reset.`)
        })
        this.$store.dispatch(`resetGameOver`, false).then(() => {
          // set to default state so repeating visits
          // to this page won't fill our array with zeroes
          console.log(`Resetting game over.`)
        })
      } else {
        console.log(`Nothing to record, play the game.`)
      }
    })
  },
  methods: {
    ...mapActions([
      `resetGameOver`,
      `setLastSave`
    ]),
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
      if (this.combinationsFavs === ``) {
        this.combinationsFavs = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      } else {
        this.combinationsFavs = this.combinationsFavs.split(`,`).map(Number)
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
        // and update game combinations favs
        // get current non zero combinations
        // console.log(`Current non zero combinations is endgame -->`)
        const currentGameCombinationsFavs = this.getCurrentNonZeroCombinations
        // console.log(currentGameCombinationsFavs)
        for (let index in this.combinationsFavs) {
          this.combinationsFavs[index] += currentGameCombinationsFavs[index]
        }
        localStorage.setItem(`combinationsFavs`, this.combinationsFavs)
      } else {
        // game ended in school,
        // so we have only school result to save
        this.schoolScores.push(this.getSchoolScore)
        localStorage.setItem(`schoolScores`, this.schoolScores)
      }
      // save updated dice stats to local storage
      localStorage.setItem(`diceValuesFavs`, this.$store.state.user.diceValuesFavs)
      //
      // finally check if user is registered
      //
      if (!this.getUserData.isAuthenticated) {
        console.log(`Anonymous! To save results please register.`)
      } else if (this.getUserData.isAuthenticated && this.isOnline) {
        console.log(`User is authenticated and network is online. Syncing with firestore.`)
        this.syncScoreWithFirestore()
      } else if (this.getUserData.isAuthenticated && !this.isOnline &&
        this.isGameEnded) {
        console.log(`User is authenticated but network is offline.`)
        // this.networkProblemDialog = true
        this.toggleNetworkProblemDialog()
      } else {
        console.log(`Something went wrong in the piping system.`)
      }
    },
    // if user exists add score to the account
    syncScoreWithFirestore() {
      this.tryAgainBtnLoading = !this.tryAgainBtnLoading
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
          const diceValuesFavs = this.$store.state.user.diceValuesFavs
          const combinationsFavs = localStorage.getItem(`combinationsFavs`)
          docRef.update({
            resultsArray: resultsArrayToUpdate,
            schoolResultsArray: schoolScoresToUpdate,
            hiScore: highestScoreToUpdate,
            diceValuesFavs: diceValuesFavs,
            combinationsFavs: combinationsFavs
          })
          console.log(`...updating user stats`)
          this.tryAgainBtnLoading = !this.tryAgainBtnLoading
          this.networkProblemDialog = false
          // this.networkProblemDialog = !this.networkProblemDialog
          // this.toggleNetworkProblemDialog()
          return true
        })
        .catch(error => {
          this.tryAgainBtnLoading = !this.tryAgainBtnLoading
          console.log(`Error getting documents: `, error)
        })
    },
    toggleNetworkProblemDialog () {
      this.networkProblemDialog = !this.networkProblemDialog
    }
  }
}
</script>
<style lang="sass" scoped>

.user-name-game-end
  span
    color: $color-chosen

.message-school
  line-height: 1.5

.network-check-background
  height: 3em

.offline-dialog
  border-radius: .3em
  border: .1em solid $color-primary-0

.offline-dialog-message
  padding-top: 0em
  font-size: 1.2em
  color: $color-primary-3

</style>
