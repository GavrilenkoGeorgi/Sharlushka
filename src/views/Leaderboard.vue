<template>
  <v-container fill-height>
    <v-layout
      id="leaderboard"
      align-space-around
      justify-start
      column
      fill-height
      class="text-xs-center"
    >
      <!-- Title -->
      <v-flex py-3>
        <h1 class="leaderboard-title text-capitalize">
          Leaderboard
        </h1>
      </v-flex>
      <!-- Users leaderboard legend -->
      <v-flex
        d-flex
        class="leaderboard-legend text-xs-center pl-1"
      >
        <v-layout
          align-center
        >
          <v-flex
            xs1
          >
            <v-layout justify-center>
              <listIcon class="default-icon-color" />
            </v-layout>
          </v-flex>
          <v-flex
            xs3
          >
            Name
          </v-flex>
          <v-flex xs2>
            HiScore
          </v-flex>
          <v-flex xs2>
            Average
          </v-flex>
          <v-flex xs2>
            % Max
          </v-flex>
          <v-flex xs2>
            Games
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- Loading indicator -->
      <v-flex
        v-if="leaderboardLoading"
        xs12
      >
        <v-progress-circular
          indeterminate
          color="purple darken-2"
        />
      </v-flex>
      <!-- No leaderboard message -->
      <v-flex
        v-if="noLeaderboardMessage"
        xs12
        pt-2
      >
        <p class="no-leaderboard-message">
          {{ noLeaderboardMessage }}
        </p>
      </v-flex>
      <!-- Users leaderboard layout -->
      <v-flex
        v-else
        xs12
        class="leaderboard"
      >
        <v-layout
          v-for="(user, index) in userDataFromDB"
          :key="index"
          class="leaderboard-item"
          :class="{ 'orange--text': user.userName === userName }"
          py-2
        >
          <v-flex
            xs1
            class="text-xs-center"
          >
            {{ index + 1 }}
          </v-flex>
          <v-flex
            xs3
            class="text-xs-left"
          >
            {{ user.userName }}
          </v-flex>
          <v-flex xs2>
            {{ user.hiScore }}
          </v-flex>
          <v-flex xs2>
            {{ user.averageScore }}
          </v-flex>
          <v-flex xs2>
            {{ user.percentFromMax }}
          </v-flex>
          <v-flex xs2>
            {{ user.gamesPlayed }}
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import listIcon from '../assets/icons/baseline-import_export-24px.svg'
import { mapGetters, mapActions, mapState } from 'vuex'
import { computeAverageScore, computePercentFromMax } from '../services/statsHelpers'
import { firestoreConnection } from '../services/api'

export default {
  name: `Leaderboard`,
  components: {
    listIcon
  },
  data: () => ({
    userName: null,
    userDataFromDB: [],
    noLeaderboardMessage: false,
    errorMessage: null,
    leaderboardLoading: true
  }),
  computed: {
    ...mapGetters([
      `getMaxPossibleScore`
    ]),
    ...mapState([
      `leaderboardStats`,
      `userData`
    ])
  },
  watch: {
    leaderboardStats(data) {
      // preparing stats
      for (let user of data) {
        let scores = user.resultsArray.split(`,`).map(Number)
        let average = computeAverageScore(scores)
        let userData = {
          userName: user.userName,
          hiScore: Math.max(...scores),
          averageScore: average,
          percentFromMax: computePercentFromMax(average, this.getMaxPossibleScore),
          gamesPlayed: scores.length
        }
        this.userDataFromDB.push(userData)
      }
      this.userDataFromDB.sort((a,b) => (a.hiScore > b.hiScore) ? 1 : ((b.hiScore > a.hiScore) ? -1 : 0))
      this.userDataFromDB.reverse()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.userName = localStorage.getItem(`userName`)
      new firestoreConnection()
        .getLeaderboardStats()
        .then(stats => this.setLeaderboardStats(stats))
        .catch(error => this.setErrorMessage(error))
        .finally(() => this.leaderboardLoading = !this.leaderboardLoading)
    })
  },
  methods: {
    ...mapActions([
      `setLeaderboardStats`,
      `setErrorMessage`
    ])
  }
}
</script>

<style lang="sass" scoped>
@import "../assets/sass/fonts.sass"

#leaderboard
  font-family: $text-font

.leaderboard-title
  font-size: 2em

.leaderboard-legend
  font-weight: 700
  color: $color-primary-3
  background-color: $color-pale-primary

.no-leaderboard-message
  margin: 1em 0em 1em 0em
  color: $color-primary-2
  font-size: 1.6em

.error-message
  font-size: 1.3em
  color: $color-error-message-red-text

.leaderboard
  font-size: 1.2em
  font-weight: 700
  color: $color-primary-2

.leaderboard-item:hover
  background-color: $color-pale-primary

.v-progress-circular
  margin: 1rem

</style>
