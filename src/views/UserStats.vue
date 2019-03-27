<template>
  <v-layout
    column
    pt-2
    class="text-xs-center"
  >
    <!-- Title and user name -->
    <v-layout
      column
      align-center
      pt-2
    >
      <h2 class="user-name">
        {{ userName }}!
      </h2>
      <!-- Unregistered anonymous user info -->
      <v-flex
        v-if="anonymousUserNoGames"
      >
        <h3
          class="message-to-anonymous"
        >
          {{ messageToAnonymous }}
        </h3>
      </v-flex>
      <!-- Registered user info -->
      <v-flex
        v-else
      >
        <h3
          class="hi-score pb-2"
        >
          Your highest score
          <span
            class="highlighted"
          >
            {{ highestScore }}
          </span>
        </h3>
        <h3
          class="hi-score pb-2"
        >
          Max possible score {{ getMaxPossibleScore }}
        </h3>
      </v-flex>
    </v-layout>
    <!-- Charts -->
    <v-layout
      v-if="!anonymousUserNoGames"
      column
    >
      <!-- School chart-->
      <v-layout
        row
        wrap
        justify-center
        pt-4
      >
        <v-flex
          xs12
        >
          <h2>
            School results
          </h2>
        </v-flex>
        <v-flex
          xs12
          sm10
          d-flex
          align-center
          pr-3
        >
          <chartist
            ratio="ct-major-twelfth"
            type="Line"
            :data="schoolChartData"
            :options="schoolChartOptions"
          />
        </v-flex>
      </v-layout>
      <!-- Game results -->
      <v-layout
        wrap
        justify-center
      >
        <v-flex
          xs12
          pb-2
        >
          <h2>
            Game results
          </h2>
        </v-flex>
        <v-flex
          v-for="item in newStats"
          :key="item.msg"
          xs12
          class="stats-display pb-1"
        >
          {{ item.msg }}&nbsp;{{ item.value }}
        </v-flex>
      </v-layout>
      <!-- Game results chart style="border: 1px solid pink" -->
      <v-layout
        wrap
        justify-center
        py-2
      >
        <v-flex
          d-flex
          xs12
          sm10
          align-center
          pr-3
        >
          <chartist
            ratio="ct-major-twelfth"
            type="Line"
            class="game-results-chart"
            :data="chartData"
            :options="chartOptions"
          />
        </v-flex>
      </v-layout>
      <!-- Most recent scores layout -->
      <v-layout
        row
        wrap
        justify-center
        px-2
      >
        <v-flex
          v-if="highestScore"
          xs12
        >
          <h2>
            Most recent scores are
          </h2>
        </v-flex>
        <v-flex
          v-for="(value, index) in lastScoresToDisplay"
          :key="index"
          xs3
          class="hi-score-display py-1"
        >
          {{ value }}
        </v-flex>
      </v-layout>
      <!-- Dice values favorites layout -->
      <v-layout
        wrap
        justify-center
        pt-4
      >
        <v-flex
          xs12
        >
          <h2>
            Your favorite values
          </h2>
        </v-flex>
        <v-flex
          xs12
          sm10
          align-center
          pr-3
        >
          <chartist
            ratio="ct-major-twelfth"
            type="Bar"
            class="dice-favs-chart"
            :data="diceValuesFavsChartData"
            :options="diceValuesFavsChartOptions"
          />
        </v-flex>
      </v-layout>
      <!-- Combinations favorites layout -->
      <v-layout
        wrap
        justify-center
        py-4
      >
        <v-flex
          xs12
        >
          <h2>
            Your favorite combinations
          </h2>
        </v-flex>
        <v-flex
          xs12
          sm10
          align-center
          pr-3
        >
          <chartist
            ratio="ct-square"
            type="Bar"
            class="combinations-favs-chart"
            :data="combinationsFavsChartData"
            :options="combinationsFavsChartOptions"
          />
        </v-flex>
      </v-layout>
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
      // if user played at least one game, we have a 'high score'
      highestScore: ``,
      userScoresArray: ``,
      lastScoresToDisplay: ``,
      userGamesPlayed: ``,
      chartResultsToShow: -16, // minus sign cause of array slicing
      chartData: {
        labels: [],
        series: []
      },
      chartOptions: {
        fullWidth: true,
        lineSmooth: true,
        showArea: true,
        axisX: {
          // We can disable the grid for this axis
          showGrid: true,
          // and also don't show the label
          showLabel: true
        },
        axisY: {
          // high: 879
        }
      },
      diceValuesFavsChartData: {
        labels: [`one`, `two`, `three`, `four`, `five`, `six`],
        series: []
      },
      diceValuesFavsChartOptions: {
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
        averageScore: {
          msg: `Your average score is`,
          value: ``
        },
        percentFromMax: {
          msg: `Percent from max score ~`,
          value: ``
        }
      },
      schoolScores: ``,
      schoolChartData: {
        labels: [],
        series: []
      },
      schoolChartOptions: {
        fullWidth: true,
        // distributeSeries: true,
        // lineSmooth: false,
        // lineSmooth: Chartist.Interpolation.simple(),
        showArea: true,
        axisX: {
          // We can disable the grid for this axis
          showGrid: true,
          // position: `start`,
          // and also don't show the label
          showLabel: true
        },
        axisY: {
          scaleMinSpace: 10
        }
      },
      // Combination favs chart data
      combinationsFavsChartData: {
        labels: [`Pair`, `Two pairs`, `Three O.A.K`, `Full`, `Quads`, `Poker`, `Small`, `Large`, `Chance`],
        series: [[18, 14, 6, 4, 5, 1, 10, 5, 19]]
      },
      combinationsFavsChartOptions: {
        reverseData: true,
        horizontalBars: true,
        axisY: {
          offset: 85
        }
        // fullWidth: true,
        // distributeSeries: true,
        // lineSmooth: false,
        // lineSmooth: Chartist.Interpolation.simple(),
        // showArea: true,
        /*
        axisX: {
          // We can disable the grid for this axis
          showGrid: true,
          // and also don't show the label
          showLabel: true
        }
        */
      }
    }
  },
  computed: {
    ...mapGetters([
      `getMaxPossibleScore`,
      `getUserAuthState`,
      `getDiceValuesFavs`
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
        // school results array for chart display
        this.assembleSchoolScoresArray()
        this.setDiceFavsValuesChartSeries()
        this.setCombinationsFavsChartSeries()
        // +1 cause of something with the chart, last result not showing
        this.lastScoresToDisplay = this.userScoresArray.slice(0).slice(this.chartResultsToShow + 1)
        this.newStats.gamesPlayed.value = this.userScoresArray.length
        // this.newStats.maxPossibleScore.value = this.getMaxPossibleScore
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
          calculate stats.`
        } else if (localStorage.getItem(`lastScoresArray`) == ``) {
          // still no games played
          this.anonymousUserNoGames = true
          this.messageToAnonymous = `You have to finish at least one game to
          calculate stats.`
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
    assembleSchoolScoresArray() {
      this.schoolScores = localStorage.getItem(`schoolScores`)
      if (this.schoolScores) {
        const arrayToDisplay = this.schoolScores.split(`,`)
        const slicedArray = arrayToDisplay.slice(this.chartResultsToShow)
        this.schoolChartData.series = [slicedArray]
      }
    },
    //
    // values array
    //
    convertValuesToPercent(values) {
      let percentages = []
      let highestValue = Math.max(...values)
      for (let value of values) {
        if (value === highestValue) {
          continue
        } else {
          percentages.push(Math.floor((value / highestValue) * 100))
        }
      }
      return percentages
    },
    setDiceFavsValuesChartSeries() {
      let values = localStorage.getItem(`diceValuesFavs`).split(`,`)
      let percentages = this.convertValuesToPercent(values)
      this.diceValuesFavsChartData.series = [percentages]
    },
    setCombinationsFavsChartSeries() {
      let values = localStorage.getItem(`combinationsFavs`).split(`,`)
      let percentages = this.convertValuesToPercent(values)
      this.combinationsFavsChartData.series = [percentages]
    },
    prepareLabelsForChart(numOfLabels) {
      const resultsToDisplay = 15 // Fifteen results for now
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

<style lang="scss">

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
  font-size: 1.7em;
  text-align: center;
}
.stats-display {
  color: $color-primary-3;
  font-size: 1.1em;
  font-weight: 700;
  line-height: 1.3;
}

.ct-series-a .ct-point {
  stroke: $color-primary-1;
  stroke-width: .1em;
}
.ct-series-a .ct-line {
  stroke: #E1BEE7;
  stroke-width: .06em;
}
.ct-series-a .ct-bar {
  stroke: $color-primary-1;
  stroke-width: .25em;
}
.ct-nodata {
  visibility: hidden;
  height: 0em;
}

.game-results-chart {
  .ct-series-a .ct-bar {
  stroke: $color-primary-1;
  stroke-width: .25em;
  }
}

.dice-favs-chart {
  .ct-series-a .ct-bar {
    // stroke: #AA00FF;
    // stroke: red;
    stroke-width: .3em;
  }
  .ct-end {
    font-size: 1em;
    color: $color-primary-1;
  }
}

.combinations-favs-chart {
  .ct-start {
    font-size: .9em;
    color: $color-primary-1;
  }
  .ct-series-a .ct-bar {
    // stroke: pink;
    stroke-width: .3em;
  }
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

</style>
