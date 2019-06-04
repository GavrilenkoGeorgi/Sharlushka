<template>
  <v-layout
    column
    pt-2
    class="text-xs-center"
  >
    <!-- Title and user name -->
    <h2 class="user-name">
      {{ userName }}!
    </h2>
    <v-layout
      v-if="unknownUser"
      column
      align-center
      pt-2
    >
      <!-- Unregistered anonymous user info -->
      <v-flex>
        <h3
          class="message-to-anonymous"
        >
          Please, play at least one game to calculate stats.
        </h3>
      </v-flex>
    </v-layout>
    <v-layout
      v-else
      column
      pt-2
    >
      <!-- Known user stats -->
      <v-flex>
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
          md8
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
          v-for="item in gameStats"
          :key="item.msg"
          xs12
          class="stats-display pb-1"
        >
          {{ item.msg }}&nbsp;{{ item.value }}
        </v-flex>
      </v-layout>
      <!-- Game results chart -->
      <v-layout
        wrap
        justify-center
        py-2
      >
        <v-flex
          d-flex
          xs12
          sm10
          md8
          align-center
          pr-3
        >
          <chartist
            ratio="ct-major-twelfth"
            type="Line"
            class="game-results-chart"
            :data="gameChartData"
            :options="gameChartOptions"
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
          xs12
          sm10
          md8
        >
          <!-- Recent results layout -->
          <v-layout wrap>
            <v-flex
              v-for="(value, index) in lastScoresToDisplay"
              :key="index"
              xs3
              class="hi-score-display py-1"
            >
              {{ value }}
            </v-flex>
          </v-layout>
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
          md8
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
          md8
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
import { mapGetters, mapState } from 'vuex'
import { gatherDataFromLocalStorage } from '../services/LocalStorageHandler'

export default {
  name: `UserStats`,
  data() {
    return {
      userName: `Anonymous`,
      unknownUser: false,
      messageToAnonymous: null,
      highestScore: ``,
      lastScoresToDisplay: ``,
      chartResultsToShow: -16, // minus sign cause of array slicing
      gameChartData: {
        labels: [],
        series: []
      },
      gameChartOptions: {
        fullWidth: true,
        lineSmooth: true,
        showArea: true,
        axisX: {
          // We can disable the grid for this axis
          showGrid: true,
          // and also don't show the label
          showLabel: true
        }
      },
      diceValuesFavsChartData: {
        labels: [`one`, `two`, `three`, `four`, `five`, `six`],
        series: []
      },
      diceValuesFavsChartOptions: {
        axisX: {
          showGrid: true,
          showLabel: true
        }
      },
      gameStats: {
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
        series: [[10, 10, 10, 10, 10, 5, 10, 10, 10]]
      },
      combinationsFavsChartOptions: {
        reverseData: true,
        horizontalBars: true,
        axisY: {
          offset: 85
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      `getMaxPossibleScore`,
      `getUserStats`,
      `getUserData`
    ]),
    ...mapState([`userData`, `userStats`])
  },
  mounted() {
    this.$nextTick(() => {
      gatherDataFromLocalStorage().then(stats => {
        this.displayStats(stats)
      })
    })
  },
  methods: {
    /*
    /* @param {object} User stats from store or localStorage
    */
    displayStats(stats) {
      if (stats.schoolResultsArray !== ``) {
        // user played at least one game
        // setting numeric stats
        this.setGameStats(stats.resultsArray)
        this.highestScore = this.getHighestScore(stats.resultsArray)
        // setting graphs
        this.schoolChartData.series = [ this.getResultsForChart(stats.schoolResultsArray, this.chartResultsToShow) ]
        this.schoolChartData.labels = this.prepareLabelsForChart(16)
        this.gameChartData.series = [ this.getResultsForChart(stats.resultsArray, this.chartResultsToShow) ]
        this.gameChartData.labels = this.prepareLabelsForChart(16)
        this.diceValuesFavsChartData.series = [this.convertValuesToPercent(stats.diceValuesFavs)]
        // should be array by now
        let combinationsFavs = stats.combinationsFavs.split(`,`).map(Number)
        this.combinationsFavsChartData.series = [this.convertValuesToPercent(combinationsFavs)]
      } else {
        // stats are empty
        console.log(`'Play the game! Harding!.. Play the game!'`)
        this.unknownUser = !this.unknownUser
      }
    },
    /*
    /* @param {string} scores String with scores from
    /*                        store or localStorage
    /* @return {integer}      Highest user score
    */
    getHighestScore (scores) {
      let scoresArray = scores.split(`,`).map(Number)
      return Math.max(...scoresArray)
    },
    /*
    /* @param {string} scores     Scores string
    /* @param {integer} quantity  How many results to show
    /* @return {array}            Scores to display on chart
    */
    getResultsForChart (scores, quantity) {
      let scoresForChart = scores.split(`,`).slice(quantity)
      // console.log(scoresForChart)
      return scoresForChart
    },
    /*
    /* @param {string} gameResults Scores string
    */
    setGameStats(gameResults) {
      let results = gameResults.split(`,`).map(Number)
      this.lastScoresToDisplay = results.slice(-16) // this
      this.gameStats.gamesPlayed.value = results.length
      this.gameStats.averageScore.value = this.computeAverageScore(results)
      this.gameStats.percentFromMax.value = // bear with me )
        this.computePercentFromMax(this.gameStats.averageScore.value,
          this.getMaxPossibleScore)
    },
    /*
    /* @param {Array}  Values array
    /* @return {Array} Of percentages for chart
    */
    convertValuesToPercent(values) {
      let percentages = []
      let highestValue = Math.max(...values)
      for (let value of values) {
        if (value === highestValue) {
          percentages.push((value/value) * 100)
          continue
        } else {
          percentages.push(Math.floor((value / highestValue) * 100))
        }
      }
      return percentages
    },
    /*
    /* @param {Integer} Length of results array
    /* @return {Array} Labels to display on chart
    */
    prepareLabelsForChart(numOfLabels) {
      // this one is glitchy
      const resultsToDisplay = Math.abs(this.chartResultsToShow)
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
    /*
    /* @param {array} scores Array of integers
    /* @return {integer}     Average user score
    */
    computeAverageScore(scores) {
      const arrayToReduce = []
      const scoreSum = (accumulator, currentValue) => accumulator + currentValue
      for (const value of scores) {
        arrayToReduce.push(value)
      }
      if (arrayToReduce.length > 0) {
        return parseInt(arrayToReduce.reduce(scoreSum) / arrayToReduce.length)
      } else {
        return 0
      }
    },
    /*
    /* @param {integer} averageScore     Average user score
    /* @param {integer} maxPossibleScore Max possible score in game
    /* @return {integer}                 User percent from max
    /*                                   possible score
    */
    computePercentFromMax(averageScore, maxPossibleScore) {
      let result = Math.floor(averageScore / maxPossibleScore * 100)
      if (result) {
        return result + `%`
      } else {
        return ``
      }
    }
  }
}
</script>

<style lang="sass">

.user-name
  color: $color-orange
  font-size: 1.7em
  +desktop(96dpi, 600px)
    font-size: 3em
  +handheld(2, 1024px)
    font-size: 2.7em

.hi-score
  line-height: 1

.hi-score-display
  color: $color-primary-1
  font-size: 1.7em
  text-align: center
  +desktop(96dpi, 600px)
    font-size: 2em
  +handheld(2, 1024px)
    font-size: 2.7em

.stats-display
  color: $color-primary-3
  font-size: 1.1em
  font-weight: 700
  line-height: 1.3
  +desktop(96dpi, 600px)
    font-size: 1.5em
  +handheld(2, 1024px)
    font-size: 2.2em

.ct-label
  color: $color-primary-3

.game-results-chart
  .ct-end
    font-size: .6em

.ct-series-a .ct-point
  stroke: $color-primary-1
  stroke-width: .2em
  +handheld(2, 1024px)
    stroke-width: .4em

.ct-series-a .ct-line
  stroke: #E1BEE7
  stroke-width: .12em
  +handheld(2, 1024px)
    stroke-width: .24em

.ct-series-a .ct-bar
  stroke: $color-primary-1
  +handheld(2, 1024px)
    stroke-width: 1em

.ct-nodata
  visibility: hidden
  height: 0em

.game-results-chart
  .ct-series-a .ct-bar
  stroke: $color-primary-1
  stroke-width: .25em
  +handheld(2, 1024px)
    stroke-width: .5em

.dice-favs-chart
  .ct-series-a .ct-bar
    stroke-width: .6em
    +handheld(2, 1024px)
      stroke-width: 1em

  .ct-end
    font-size: 1em
    color: $color-primary-1
    +handheld(2, 1024px)
      font-size: 1.6em

.combinations-favs-chart
  .ct-start
    font-size: .9em
    color: $color-primary-1
    +handheld(2, 1024px)
      font-size: 1.6em

  .ct-end
   font-size: .7em

  .ct-series-a .ct-bar
    stroke-width: .6em
    +handheld(2, 1024px)
      stroke-width: 1em

.message-to-anonymous
  padding: 2em 0em 2em 0em

@media screen and (orientation: landscape)
  .hi-score-display
    font-size: 1.8em

</style>
