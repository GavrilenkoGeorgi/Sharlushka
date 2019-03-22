<template>
  <v-layout
    column
    py-2
    pb-4
  >
    <!-- Title and user name -->
    <v-flex class="text-xs-center">
      <v-layout column>
        <h1 class="help-title py-1">
          {{ helpTitle }}
        </h1>
        <h2 class="user-name">
          {{ userName }}!
        </h2>
        <h3
          v-if="anonymousUserNoGames"
          class="message-to-anonymous"
        >
          {{ messageToAnonymous }}
        </h3>
        <h3
          v-if="highestScore"
          class="hi-score"
        >
          {{ hiscoreGreeting }}
          <span
            class=" highlighted"
          >
            {{ highestScore }}
          </span>
          {{ exclamation }}
        </h3>
      </v-layout>
    </v-flex>
    <!-- Chart -->
    <v-flex
      v-if="highestScore"
      d-flex
      align-center
      py-1
      pr-3
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
      v-if="highestScore"
      d-flex
      align-center
      class="last-scores-heading text-xs-center"
    >
      <h3
        v-if="highestScore"
      >
        {{ lastScoresHeading }}
      </h3>
    </v-flex>
    <v-layout
      v-if="highestScore"
      align-space-around
      column
    >
      <v-flex
        d-flex
        class="hi-score-display"
        pb-4
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
      <v-flex
        v-for="item in newStats"
        :key="item.msg"
        class="stats-display text-xs-center"
      >
        {{ item.msg }}&nbsp;{{ item.value }}
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: `UserStats`,
  data() {
    return {
      userName: ``,
      anonymousUserNoGames: false, // really need this?
      messageToAnonymous: null,
      helpTitle: `About`,
      // if user played at least one game, we have a 'high score'
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
          showGrid: true,
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
      `getMaxPossibleScore`,
      `getUserAuthState`
    ])
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`User stats page mounted.`)
      if (localStorage.hasOwnProperty(`userName`)) {
        // init everything
        this.userName = localStorage.getItem(`userName`)
        this.highestScore = localStorage.getItem(`highestScore`)
        this.userScoresArray = this.assembleLastScoresArray()
        this.lastScoresToDisplay = this.userScoresArray.slice(0).slice(-12)
        this.newStats.gamesPlayed.value = this.userScoresArray.length
        this.newStats.maxPossibleScore.value = this.getMaxPossibleScore
        this.newStats.averageScore.value = this.computeAverageScore()
        this.newStats.percentFromMax.value = this.computePercentFromMax()
        if (this.userScoresArray.length) {
          this.chartData.labels = this.prepareLabelsForChart(this.userScoresArray.length)
          this.chartData.series = [this.lastScoresToDisplay]
        }
        if (localStorage.getItem(`highestScore`) == ``) {
          console.log(`You are truly an Anonymous!`)
          this.userName = `Anonymous`
          this.anonymousUserNoGames = true
          this.messageToAnonymous = `You have to finish at least one game to
          calculate stats, school results are in rules section.`
        }
      }
    })
  },
  methods: {
    restartGame() {
      console.log(`Restarting.`)
      this.$store.commit(`resetState`)
      this.$router.push(`/game`)
    },
    assembleLastScoresArray() {
      let lastScoresString = localStorage.getItem(`lastScoresArray`)
      return lastScoresString.split(`,`)
    },
    prepareLabelsForChart(numOfLabels) {
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
          // console.log(`Scaaary..`)
        }
        return labelsArray.reverse()
      }
    },
    computeAverageScore() {
      if (this.userScoresArray) {
        const arrayToReduce = []
        const scoreSum = (accumulator, currentValue) => accumulator + currentValue
        for (const value of this.userScoresArray) {
          arrayToReduce.push(parseInt(value))
        }
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

.help-title {
  font-size: 2.3em;
}
.user-name {
  color: $color-orange;
  font-size: 1.7em;
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

.message-to-anonymous {
  font-family: $text-font;
  padding: 2em 0em 2em 0em;
}

.highlighted {
  fill: $color-orange;
}
</style>
