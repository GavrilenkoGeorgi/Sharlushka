<template>
  <v-layout column id="leaderboard">
    <v-flex>
<!-- Close button -->
      <closeBtn></closeBtn>
    </v-flex>
<!-- Title -->
    <v-flex class="text-xs-center py-4">
      <h1 class="leaderboard-title text-capitalize">
        {{ title }}
      </h1>
    </v-flex>
<!-- Users leaderboard legend -->
    <v-flex class="leaderboard-legend text-xs-center pl-1 py-2">
      <v-layout align-center>
        <v-flex xs1>
          <v-icon color="purple darken-2">import_export</v-icon>
        </v-flex>
        <v-flex xs3 class="text-xs-left">
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
<!-- No leaderboard message -->
    <v-flex class="leader-board-message text-xs-center" py-4
      v-if="noLeaderboardMessage">
      {{ noLeaderboardMessage }}
    </v-flex>
<!-- Users leaderboard layout -->
    <v-flex class="leaderboard text-xs-center"
      v-if="noLeaderboardMessage === null">
      <v-layout v-for="(user, index) in leaderboard" :key="index"
        class="leaderboard-item"
        v-bind:class="{ 'orange--text': getUserData.name === user.userName }" py-2>
        <v-flex xs1 class="text-xs-center">
          {{ index + 1 }}
        </v-flex>
        <v-flex xs3 class="text-xs-left">
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
</template>

<script>
import closeBtn from '../components/CloseBtn'
import { mapGetters } from 'vuex'
import db from '../components/firebaseInit'

export default {
  name: 'Leaderboard',
  data: () => ({
    title: 'leaderboard',
    userName: null,
    leaderboard: [],
    userDataFromDB: [],
    noLeaderboardMessage: null
  }),
  components: {
    closeBtn
  },
  mounted () {
    this.$nextTick(() => {
      console.log('Leaderboard mounted')
      if (this.getUserData.isAuthenticated) {
        console.log(`Getting leaderboard data from db...`)
        this.getDataForLeaderboard()
      } else {
        this.userName = this.getDefaultUserName
        this.noLeaderboardMessage = `Hi, ${this.userName}, log in to view the leaderboard.`
      }
    })
  },
  computed: {
    ...mapGetters([
      'getDefaultUserName',
      'getUserData',
      'getMaxPossibleScore'
    ])
  },
  methods: {
    getDataForLeaderboard () {
      let usersDataRef = db.collection('users')
      usersDataRef.orderBy('hiScore').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let userData = {
              id: doc.id,
              userName: doc.data().name,
              hiScore: doc.data().hiScore,
              resultsArray: doc.data().resultsArray
            }
            this.userDataFromDB.push(userData)
          })
        })
        .then(() => {
          for (let user of this.userDataFromDB) {
            // prepare data for leaderboard display
            const arraySum = (accumulator, currentValue) => accumulator + currentValue
            let userResultsArray = user.resultsArray.split(',').map(Number)
            let averageScore = parseInt(userResultsArray.reduce(arraySum) / userResultsArray.length)
            let percent = Math.floor(averageScore / this.getMaxPossibleScore * 100)
            let leaderBoardUserData = {
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
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
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

.leader-board-message {
  color: $color-primary-3;
  font-size: 1.4em;
}

.leaderboard {
  font-size: 1.2em;
  font-weight: 700;
  color: $color-primary-2;
}

.leaderboard-item:hover {
  background-color: $color-pale-primary;
}

.curret-user {
  color: red;
}
</style>
