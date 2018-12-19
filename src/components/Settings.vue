<template>
  <v-container fill-height id="gameSettings">
    <v-layout align-space-around column>
<!-- Close button -->
      <v-spacer></v-spacer>
      <closeBtn></closeBtn>
<!-- Title and user name -->
      <v-flex class="text-xs-center">
        <v-layout column>
        <h1 class="help-title">{{ helpTitle }}</h1>
        <h2 class="user-name pt-2">{{ userName }}!</h2>
        <h3 class="hi-score" v-if="highestScore">{{ hiscoreGreeting }} {{ highestScore }}{{ exclamation }}</h3>
        </v-layout>
      </v-flex>
<!-- Last scores heading and table-->
      <v-flex d-flex align-end v-if="lastScoresToDisplay" class="last-scores-heading text-xs-center">
        <!--h3>{{ lastScoresHeadingPartOne }} {{ this.lastScoresToDisplay.length }} {{ lastScoresHeadingPartTwo }}</h3-->
        <h3>{{ lastScoresHeadingPartOne }} {{ lastScoresHeadingPartTwo }}</h3>
      </v-flex>
      <v-flex>
        <v-layout align-space-around column>
          <v-flex d-flex class="hi-score-display">
            <v-layout row wrap justify-space-around py-2>
              <v-flex xs4 sm1 ma-0 py-1 v-for="(value, index) in lastScoresToDisplay" :key="index">
                {{ value }}
              </v-flex>
            </v-layout>
          </v-flex>
<!-- Stats display -->
          <!--v-flex class="stats-display text-xs-center"
            v-for="item in stats"
            v-if="item.value"
            :key="item.msg">
            {{ item.msg }}&nbsp;{{ item.value }}
          </v-flex-->
          <v-flex class="stats-display text-xs-center"
            v-for="item in newStats"
            v-if="item.value"
            :key="item.msg">
            {{ item.msg }}&nbsp;{{ item.value }}
          </v-flex>
        </v-layout>
      </v-flex>
      <v-layout row align-center justify-space-around>
        <v-flex xs4 lg2 class="text-xs-center">
          <v-btn ripple block class="ui-button" large color="orange"
            @click="restartGame">
            <v-icon medium color="white">replay</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs4 lg2 class="text-xs-center">
          <v-btn ripple block class="ui-button" large color="purple darken-1" to="/help">
            <v-icon medium color="white">help_outline</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import store from '../store/store' // for reset state button
import { mapGetters } from 'vuex'
import closeBtn from '../components/CloseBtn'
import db from './firebaseInit'

export default {
  name: 'Settings', // change to statss
  data () {
    return {
      userName: '',
      helpTitle: 'About',
      helpButtonText: 'Help!',
      highestScore: '',
      hiscoreGreeting: 'Your highest score is',
      exclamation: '.', // some over-engineering
      lastScoresHeadingPartOne: 'Most recent',
      lastScoresHeadingPartTwo: 'scores are',
      userScoresArray: '',
      lastScoresToDisplay: '',
      userGamesPlayed: '',
      newStats: {
        gamesPlayed: {
          msg: 'Games played',
          value: '1'
        },
        maxPossibleScore: {
          msg: 'Max possible score is',
          value: '2'
        },
        percentFromMax: {
          msg: 'Percent from max score ~',
          value: '3'
        },
        averageScore: {
          msg: 'Your average score equals',
          value: '4'
        }
      },
      stats: [
        { msg: 'Games played', value: '' }, // do something with this
        { msg: 'Max possible score is', value: '879' },
        { msg: 'Percent from max score ~', value: '' },
        { msg: 'Your average score equals', value: '' }
      ]
    }
  },
  components: {
    closeBtn
  },
  computed: {
    ...mapGetters([
      'getDefaultUserName',
      'getUserData',
      'getMaxPossibleScore'
    ])
  },
  mounted () {
    console.log(`Settings mounted`) // change to about
    // check if user is authenticated
    // let assembledArray
    // this.lastScores = [512, 345, 534]
    if (!this.getUserData.isAuthenticated) {
      console.log(`You are anonymous!`)
      this.userName = this.getDefaultUserName
      this.highestScore = localStorage.getItem('highestScore')
      this.userScoresArray = this.assembleLastScoresArray()
    } else {
      console.log(`You are existing user!`)
      // this.setUserScoreDataFromDB(this.getUserData.uid)
      this.highestScore = localStorage.getItem('highestScore')
      this.userName = this.getUserData.name
      /*
      if (!this.userName || this.userName === '') {
        this.userName = this.getDefaultUserName
      }
      */
      let lastScoresString = localStorage.getItem('lastScoresArray')
      // if one played at least one full game then there is an array
      // with the last score, which is the highest and
      // it is in the local storage after visiting the 'endGame' page
      if (lastScoresString) {
        this.userScoresArray = lastScoresString.split(',')
      }
    }
    if (this.userScoresArray) {
      this.lastScoresToDisplay = this.userScoresArray.slice(0).slice(-12)
    }
    this.newStats.gamesPlayed.value = this.userScoresArray.length
    this.newStats.maxPossibleScore.value = this.getMaxPossibleScore
    this.newStats.percentFromMax.value = this.computePercentFromMax()
    this.newStats.averageScore.value = this.computeAverageScore()

    // this.stats[3].value = this.computeAverageScore() // what is this?
    // this.stats[2].value = this.computePercentFromMax()
    // this.stats[0].value = this.userScoresArray.length
    // generate last twelve score array to display
    // this.stats[1].value = this.computeAverageScore()
    // this.stats[2].value = this.computePercentFromMax()
  },
  methods: {
    restartGame (state) {
      console.log(`Restarting.`)
      store.commit('resetState')
      this.$router.push('/game')
    },
    assembleLastScoresArray () {
      console.log(`Preparing array`)
      // this.lastScores = localStorage.getItem('lastScoresArray')
      let lastScoresString = localStorage.getItem('lastScoresArray')
      if (!lastScoresString) {
        console.log(`You have to play at least one game to calculate stats`)
        return false
      } else {
        return lastScoresString.split(',')
      }
    },
    setUserScoreDataFromDB (uid) {
      console.log(`Getting user scores for uid ${uid}`)
      db.collection('users').where('uid', '==', uid)
        .get()
        .then(function (querySnapshot) {
          let scoreArray

          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().uid === uid) {
              scoreArray = doc.data().resultsArray
            }
          })
          return scoreArray
        })
        .then((scoreArray) => {
          localStorage.setItem('lastScoresArray', scoreArray)
          console.log(`Setting users score array to local storage ${scoreArray}`)
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    },
    computeAverageScore () {
      // let lastScores = [333, 125, 256, 368, -12, 234, 623, 546, 345, 324, 34, 342]
      if (this.userScoresArray) {
        let arrayToReduce = []
        const scoreSum = (accumulator, currentValue) => accumulator + currentValue
        for (let value of this.userScoresArray) {
          arrayToReduce.push(parseInt(value))
        }
        console.log(`User scores array: ${this.userScoresArray}`)
        if (arrayToReduce.length > 0) {
          return parseInt(arrayToReduce.reduce(scoreSum) / arrayToReduce.length)
        } else {
          return 0
        }
      }
    },
    computePercentFromMax () {
      let result = Math.floor(this.newStats.averageScore.value / this.getMaxPossibleScore * 100)
      this.newStats.percentFromMax.value = result + '%'
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/index.scss';

.help-title,
.user-name,
.hi-score,
.last-scores-heading,
.hi-score-display,
.stats-display {
  font-family: $text-font;
}

.help-title {
  font-size: 2.7em;
}
.user-name {
  color: $color-orange;
  font-size: 1.8em;
}
.hi-score {
  line-height: 1.8;
}
.hi-score-display {
  color: $color-primary-1;
  font-size: 2.1em;
  text-align: center;
}
.stats-display {
  color: $color-primary-3;
  font-size: 1.2em;
  font-weight: 700;
  line-height: 1.6;
}

@media screen and (orientation: landscape) {
  .hi-score-display {
    font-size: 1.3em;
    font-weight: 700;
  }
}

@media screen and (max-resolution: 96dpi) and (min-width: 500px) { // desktop
  .help-title {
    font-size: 4em;
  }
  .user-name {
    font-size: 3em;
  }
  .hi-score-display {
    font-size: 2em;
  }
  .stats-display {
    font-size: 1.5em;
  }
}
</style>
