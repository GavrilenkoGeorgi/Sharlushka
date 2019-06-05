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
          Game over,<br>
          <span>{{ userName }}!</span>
        </h1>
      </v-flex>
      <!-- School message -->
      <v-flex
        v-if="!getCurrentGameState.schoolCompleted"
        class="message-school text-xs-center"
      >
        <h3>You can't even finish the school.</h3>
        <h2>Your score is <span class="highlighted">{{ getTotalScore }}</span></h2>
      </v-flex>
      <!-- Game message v-else actually -->
      <v-flex
        v-if="getCurrentGameState.schoolCompleted"
        class="message-game text-xs-center"
      >
        <h2>Your score is <span class="highlighted">{{ getTotalScore }}</span></h2>
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
          You are offline,
          connect to the internet to save results.
          If you choose to cancel, results are saved
          in local storage and will be saved to DB
          next time you finish the game.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="orange"
            outline
            :loading="tryAgainBtnLoading"
            class="button"
            @click="console.log(`saving`)"
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
import NetworkCheck from '../components/NetworkCheck.vue'
import restartIcon from '../assets/icons/baseline-replay-24px.svg'
import cancelIcon from '../assets/icons/baseline-cancel-24px.svg'
import { appendToStorage, sumTwoArrays, gatherDataFromLocalStorage } from '../services/LocalStorageHandler'
import { connectToDb } from '../services/api'

export default {
  components: {
    NetworkCheck,
    restartIcon,
    cancelIcon
  },
  data() {
    return {
      userName: ``,
      networkProblemDialog: false,
      tryAgainBtnLoading: false
    }
  },
  computed: {
    ...mapGetters([
      `getTotalScore`,
      `getSchoolScore`,
      `getCurrentGameState`,
      `getUserData`,
      `getUserStats`,
      `getCurrentNonZeroCombinations`
    ])
  },
  mounted() {
    this.$nextTick(() => {
      this.userName = localStorage.getItem(`userName`)
      if (this.getCurrentGameState.gameOver) {
        // append current score
        if (this.getCurrentGameState.schoolCompleted) {
          // handle dice values favs data
          let currentFavs = localStorage.getItem(`diceValuesFavs`).split(`,`).map(Number)
          let favsToAdd = this.getUserStats.diceValuesFavs
          let updatedFavs = sumTwoArrays(currentFavs, favsToAdd)
          // set new dice value favs to localStorage
          localStorage.setItem(`diceValuesFavs`, updatedFavs)
          // save game and school results
          appendToStorage(`lastScoresArray`, `${this.getTotalScore}`)
          appendToStorage(`schoolScores`, `${this.getSchoolScore}`)
          // and non zero combinations stats
          let currentCombinationsFavs = localStorage.getItem(`combinationsFavs`).split(`,`).map(Number)
          let newCombinationsFavs = this.getCurrentNonZeroCombinations
          let updatedNonZeroCombinations = sumTwoArrays(currentCombinationsFavs, newCombinationsFavs)
          localStorage.setItem(`combinationsFavs`, updatedNonZeroCombinations)
        } else {
          // school not finished
          // save only school result
          appendToStorage(`schoolScores`, `${this.getSchoolScore},`)
        }
        // this really could be one action
        this.resetDiceValueFavs()
        this.setLastSave(true)
        this.resetGameOver(false)
        // and save to db if user is authenticated and we are online
        if (this.getUserData.isAuthenticated) {
          console.log(`User auth is ${this.getUserData.isAuthenticated}`)
          gatherDataFromLocalStorage().then((data) => {
            const db = new connectToDb(this.getUserData.uid, data)
            db.sync()
          })
        } else {
          console.log(`User auth is ${this.getUserData.isAuthenticated}, no need to update firestore`)
        }
      } else {
        console.log(`User is reloading the page, so we aren't saving anything.`)
      }
    })
  },
  methods: {
    ...mapActions([
      `resetGameOver`,
      `setLastSave`,
      `resetDiceValueFavs`,
      `resetGameState`
    ]),
    restartGame() {
      console.log(`Restarting game.`)
      this.resetGameState()
      this.$router.push(`/game`)
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
