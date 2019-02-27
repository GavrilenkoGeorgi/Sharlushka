<template>
  <v-container id="userStats">
    <!-- Close button -->
    <closeBtn />
    <v-layout
      align-space-around
      column
    >
      <!-- Title and user name -->
      <v-flex class="text-xs-center">
        <v-layout column>
          <h1 class="help-title">
            {{ helpTitle }}
          </h1>
          <h2 class="user-name">
            {{ userName }}!
          </h2>
          <!--h3
            v-if="anonymousUser"
            class="message-to-anonymous"
          >
            {{ messageToAnonymous }}
          </h3-->
          <h3
            v-if="highestScore"
            class="hi-score"
          >
            {{ hiscoreGreeting }} {{ highestScore }}{{ exclamation }}
          </h3><!-- Safari ??? -->
        </v-layout>
      </v-flex>
      <!-- Chart -->
      <v-flex
        d-flex
        align-center
      >
        <chartist
          ratio="ct-major-twelfth"
          type="Bar"
          :data="chartData"
          :options="chartOptions"
        />
      </v-flex>
      <!-- Last scores heading and table-->
      <v-flex
        v-if="lastScoresToDisplay"
        d-flex
        align-end
        class="last-scores-heading text-xs-center"
      >
        <h3
          v-if="lastScoresToDisplay"
        >
          {{ lastScoresHeading }}
        </h3>
      </v-flex>
      <v-flex>
        <v-layout
          align-space-around
          column
          mb-1
        >
          <v-flex
            d-flex
            class="hi-score-display"
          >
            <v-layout
              row
              wrap
              justify-space-around
            >
              <v-flex
                v-for="(value, index) in lastScoresToDisplay"
                :key="index"
                xs4
                sm1
                ma-0
              >
                {{ value }}
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- Stats display v-if="item.value" -->
          <v-flex
            v-for="item in newStats"
            :key="item.msg"
            class="stats-display text-xs-center"
          >
            {{ item.msg }}&nbsp;{{ item.value }}
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- Buttons -->
      <v-layout
        py-3
        row
        align-center
        justify-space-around
      >
        <v-flex
          class="text-xs-center"
        >
          <v-btn
            ripple
            large
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
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
// import store from '../store/store' // for reset state button
import { mapGetters } from 'vuex'
import closeBtn from '../components/CloseBtn.vue'
import db from '../components/firebaseInit'

export default {
  name: `UserStats`,
  components: {
    closeBtn
  }, // change to statss
  data() {
    return {
      userName: ``,
      anonymousUser: false,
      messageToAnonymous: null,
      helpTitle: `About`,
      helpButtonText: `Help!`,
      highestScore: ``,
      hiscoreGreeting: `Your highest score is`,
      exclamation: `.`, // some over-engineering
      lastScoresHeading: `Most recent scores are`,
      userScoresArray: ``,
      lastScoresToDisplay: ``,
      userGamesPlayed: ``,
      chartData: {
        labels: [],
        series: []
        // labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        // series: [[333, 125, 256, 368, 129, 234, 623, 546, 345, 324, 34, 342]]
      },
      chartOptions: {
        fullWidth: true,
        lineSmooth: false,
        axisX: {
          // We can disable the grid for this axis
          showGrid: false,
          // and also don't show the label
          showLabel: true
        }
      },
      newStats: {
        gamesPlayed: {
          msg: `Games played`,
          value: ``
        },
        maxPossibleScore: {
          msg: `Max possible score is`,
          value: ``
        },
        percentFromMax: {
          msg: `Percent from max score ~`,
          value: ``
        },
        averageScore: {
          msg: `Your average score equals`,
          value: ``
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      `getDefaultUserName`,
      `getUserData`,
      `getMaxPossibleScore`
    ])
  },
  mounted() {
    console.log(`User stats page mounted.`)
    // console.log(`User is ${localStorage.getItem(`userName`)}`)
    let userUid = null
    if (localStorage.hasOwnProperty(`userUid`)) {
      console.log(`User has uid: ${localStorage.getItem(`userUid`)}`)
      userUid = localStorage.getItem(`userUid`)
      this.userName = localStorage.getItem(`userName`)
      this.highestScore = localStorage.getItem(`highestScore`)
      this.userScoresArray = this.assembleLastScoresArray()
      this.lastScoresToDisplay = this.userScoresArray.slice(0).slice(-12)
    }
    if (userUid === ``) { // unknown anonymous user
      console.log(`You are Anonymous!`)
      this.anonymousUser = true
      this.messageToAnonymous = `You have to finish at least one game to
        calculate stats, school results are in rules section.`
    }
    /*
    if (!this.getUserData.isAuthenticated) {
      console.log(`You are anonymous!`)
      this.userName = this.getDefaultUserName
      this.highestScore = localStorage.getItem(`highestScore`)
      this.userScoresArray = this.assembleLastScoresArray()
    } else {
      console.log(`You are existing user!`)
      this.highestScore = localStorage.getItem(`highestScore`)
      this.userName = this.getUserData.name
      const lastScoresString = localStorage.getItem(`lastScoresArray`)
      // if one played at least one full game then there is an array
      // with the last score, which is the highest and
      // it is in the local storage after visiting the 'endGame' page
      if (lastScoresString) {
        this.userScoresArray = lastScoresString.split(`,`)
      }
    }
    if (this.userScoresArray) {
      this.lastScoresToDisplay = this.userScoresArray.slice(0).slice(-12)
    }
    this.newStats.gamesPlayed.value = this.userScoresArray.length
    this.newStats.maxPossibleScore.value = this.getMaxPossibleScore
    this.newStats.averageScore.value = this.computeAverageScore()
    this.newStats.percentFromMax.value = this.computePercentFromMax()
    if (this.userScoresArray.length) {
      this.chartData.labels = this.prepareLabelsForChart(this.userScoresArray.length)
      this.chartData.series = [this.lastScoresToDisplay]
    } */
  },
  methods: {
    assembleLastScoresArray() {
      console.log(`Preparing last scores array.`)
      if (localStorage.hasOwnProperty(`lastScoresArray`)) {
        let lastScoresString = localStorage.getItem(`lastScoresArray`)
        return lastScoresString.split(`,`)
      } else {
        console.log(`You have to finish at least one game to
        calculate stats, school results are in rules section.`)
      }
    },
    restartGame() {
      console.log(`Restarting.`)
      this.$store.commit(`resetState`)
      this.$router.push(`/game`)
    },
    prepareLabelsForChart(numOfLabels) {
      // console.log(`Preparing labels ${typeof numOfLabels}`)
      const resultsToDisplay = 12 // Twelve results for now
      const lastLabelToDisplay = numOfLabels - resultsToDisplay
      const labelsArray = []
      if (numOfLabels >= resultsToDisplay) {
        while (numOfLabels !== lastLabelToDisplay) {
          labelsArray.push(numOfLabels)
          numOfLabels--
        }
        return labelsArray.reverse()
      } else {
        while (numOfLabels !== 0) {
          labelsArray.push(numOfLabels)
          numOfLabels--
          console.log(`Scaaary..`)
        }
        return labelsArray.reverse()
      }
    },
    setUserScoreDataFromDB(uid) {
      console.log(`Getting user scores for uid ${uid}`)
      db.collection(`users`).where(`uid`, `==`, uid)
        .get()
        .then(function(querySnapshot) {
          let scoreArray

          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().uid === uid) {
              scoreArray = doc.data().resultsArray
            }
          })
          return scoreArray
        })
        .then((scoreArray) => {
          localStorage.setItem(`lastScoresArray`, scoreArray)
          console.log(`Setting users score array to local storage ${scoreArray}`)
        })
        .catch(function(error) {
          console.log(`Error getting documents: `, error)
        })
    },
    computeAverageScore() {
      if (this.userScoresArray) {
        const arrayToReduce = []
        const scoreSum = (accumulator, currentValue) => accumulator + currentValue
        for (const value of this.userScoresArray) {
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
    computePercentFromMax() {
      const result = Math.floor(this.newStats.averageScore.value / this.getMaxPossibleScore * 100)
      if (result) {
        return result + `%`
      } else {
        return ``
      }
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
  font-size: 2em;
}
.user-name {
  color: $color-orange;
  font-size: 1.4em;
}
.hi-score {
  line-height: 1;
}
.hi-score-display {
  color: $color-primary-1;
  font-size: 1.9em;
  text-align: center;
}
.stats-display {
  color: $color-primary-3;
  font-size: 1.1em;
  font-weight: 700;
  line-height: 1.3;
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

#userStats {
  height: 100%;
}

</style>
