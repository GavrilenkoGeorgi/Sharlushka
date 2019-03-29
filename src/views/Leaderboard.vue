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
          {{ title }}
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
        v-else-if="noLeaderboardMessage"
        xs12
        pt-2
      >
        <p class="error-message">
          You got: {{ errorMessage }}
        </p>
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
          v-for="(user, index) in leaderboard"
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
import {mapGetters} from 'vuex'
import db from '../firebase/firebaseInit'

export default {
  name: `Leaderboard`,
  components: {
    listIcon
  },
  data: () => ({
    title: `leaderboard`,
    userName: null,
    leaderboard: [],
    userDataFromDB: [],
    noLeaderboardMessage: null,
    errorMessage: null,
    leaderboardLoading: false
  }),
  computed: {
    ...mapGetters([
      `getDefaultUserName`,
      `getUserData`,
      `getMaxPossibleScore`
    ])
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`Leaderboard mounted.`)
      // console.log(`Getting leaderboard data from db...`)
      this.leaderboardLoading = true
      this.getDataForLeaderboard()
      this.userName = localStorage.getItem(`userName`)
    })
  },
  methods: {
    getDataForLeaderboard() {
      const usersDataRef = db.collection(`users`)
      usersDataRef.orderBy(`hiScore`).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const userData = {
              id: doc.id,
              userName: doc.data().name,
              hiScore: doc.data().hiScore,
              resultsArray: doc.data().resultsArray
            }
            this.userDataFromDB.push(userData)
          })
        })
        .then(() => {
          for (const user of this.userDataFromDB) {
            // prepare data for leaderboard display
            const arraySum = (accumulator, currentValue) =>
              accumulator + currentValue
            const userResultsArray = user.resultsArray.split(`,`).map(Number)
            const averageScore = parseInt(userResultsArray.reduce(arraySum) /
                userResultsArray.length)
            const percent = Math.floor(averageScore /
                this.getMaxPossibleScore * 100)
            const leaderBoardUserData = {
              id: user.id,
              userName: user.userName,
              hiScore: parseInt(user.hiScore),
              averageScore: averageScore,
              percentFromMax: percent,
              gamesPlayed: userResultsArray.length
            }
            this.leaderboard.push(leaderBoardUserData)
          }
          this.leaderboard.reverse()
          this.leaderboardLoading = false
        })
        .catch(error => {
          this.noLeaderboardMessage = `${this.userName}!
          Please register to view more sensitive anonymous data.`
          this.errorMessage = error.message
          this.leaderboardLoading = false
          console.log(`Error getting documents: `, error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss"; // is this really neccesary?

#leaderboard {
  font-family: $text-font;
}

.leaderboard-title {
  font-size: 2em;
}

.leaderboard-legend {
  font-weight: 700;
  color: $color-primary-3;
  background-color: $color-pale-primary;
}

.no-leaderboard-message {
  margin: 1em 0em 1em 0em;
  color: $color-primary-2;
  font-size: 1.6em;
}

.error-message {
  font-size: 1.3em;
  color: $color-error-message-red-text;
}

.leaderboard {
  font-size: 1.2em;
  font-weight: 700;
  color: $color-primary-2;
}

.leaderboard-item:hover {
  background-color: $color-pale-primary;
}

.v-progress-circular {
  margin: 1rem
}

</style>
