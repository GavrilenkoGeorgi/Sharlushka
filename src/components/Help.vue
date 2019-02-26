<template>
  <v-container fill-height>
    <v-layout
      row
      wrap
    >
      <closeBtn />
      <v-flex xs12>
        <h1 class="text-xs-center mb-2 rules-heading">
          {{ rulesHeading }}
        </h1>
        <h4
          v-if="schoolScores !== ''"
          class="text-xs-center mb-2 rules-heading"
        >
          Your recent school results
        </h4>
        <!-- Chart -->
        <v-flex
          d-flex
          align-center
          my-2
        >
          <chartist
            ratio="ct-major-twelfth"
            type="Line"
            :data="chartData"
            :options="chartOptions"
          />
        </v-flex>
        <p class="rules-text">
          {{ overall }}
        </p>
        <p class="rules-text-eng">
          {{ overallEng }}
        </p>
      </v-flex>
      <!-- Combination descriptions -->
      <v-flex xs12>
        <v-flex
          v-for="(combination, index) in combinationsDescrMk3"
          :key="index"
          class="combination-descr"
        >
          <v-layout align-center>
            <p>
              {{ combination.title }}
            </p>
            <v-layout justify-end>
              <svg
                v-for="(icon, value) of combination.quantity"
                :key="value"
                class="help-dice-icon"
              >
                <use v-bind="{'xlink:href':'#' + getDiceIds[icon - 1]}" />
              </svg>
            </v-layout>
            <p class="score-value">
              {{ combination.scoreValue }}
            </p>
          </v-layout>
        </v-flex>
      </v-flex>
      <!-- Icon definitions remove this -->
      <svg
        version="1.1"
        style="display: none;"
        xmlns="http://www.w3.org/2000/svg"
      >
        <symbol
          id="diceOnes"
          viewBox="0 0 200 200"
        >
          <circle
            fill="currentColor"
            cx="100"
            cy="100"
            r="18"
          />
          <path
            stroke-width=".4em"
            d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"
          />
        </symbol>
        <symbol
          id="diceTwos"
          viewBox="0 0 200 200"
        >
          <circle
            fill="currentColor"
            cx="50"
            cy="150"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="150"
            cy="50"
            r="18"
          />
          <path
            stroke-width=".4em"
            d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"
          />
        </symbol>
        <symbol
          id="diceThrees"
          class="dice"
          viewBox="0 0 200 200"
        >
          <circle
            fill="currentColor"
            cx="50"
            cy="150"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="100"
            cy="100"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="150"
            cy="50"
            r="18"
          />
          <path
            stroke-width=".4em"
            d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"
          />
        </symbol>
        <symbol
          id="diceFours"
          class="dice"
          viewBox="0 0 200 200"
        >
          <circle
            fill="currentColor"
            cx="150"
            cy="50"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="150"
            cy="150"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="50"
            cy="150"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="50"
            cy="50"
            r="18"
          />
          <path
            stroke-width=".4em"
            d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"
          />
        </symbol>
        <symbol
          id="diceFives"
          class="dice"
          viewBox="0 0 200 200"
        >
          <circle
            fill="currentColor"
            cx="100"
            cy="100"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="150"
            cy="50"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="150"
            cy="150"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="50"
            cy="150"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="50"
            cy="50"
            r="18"
          />
          <path
            stroke-width=".4em"
            d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"
          />
        </symbol>
        <symbol
          id="diceSixes"
          class="dice"
          viewBox="0 0 200 200"
        >
          <circle
            fill="currentColor"
            cx="150"
            cy="100"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="150"
            cy="50"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="150"
            cy="150"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="50"
            cy="150"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="50"
            cy="100"
            r="18"
          />
          <circle
            fill="currentColor"
            cx="50"
            cy="50"
            r="18"
          />
          <path
            stroke-width=".4em"
            d="M20,5H180a15,15,0,0,1,15,15V180a15,15,0,0,1-15,15H20A15,15,0,0,1,5,180V20A15,15,0,0,1,20,5Z"
          />
        </symbol>
      </svg>
    </v-layout>
  </v-container>
</template>

<script>
import store from '../store/store'
import { mapGetters } from 'vuex'
import closeBtn from '../components/CloseBtn.vue'

export default {
  name: 'Help',
  components: {
    closeBtn
  },
  data () {
    return {
      schoolScores: '',
      chartData: {
        labels: [],
        series: []
        // labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        // series: [[12, 14, 36, 34, 23, 12, -24, 14, 36, 44, 23, -12, 12, 14, 36, -24, 23]]
      },
      chartOptions: {
        fullWidth: true,
        // lineSmooth: false,
        // lineSmooth: Chartist.Interpolation.simple(),
        showArea: true,
        axisX: {
          // We can disable the grid for this axis
          showGrid: true,
          // and also don't show the label
          showLabel: true
        }
      },
      overall: `Три броска, для того чтобы собрать комбинацию. Первый раз бросаются все пять кубиков.
        Дополнительно два раза можно перебрасывать часть кубиков, оставляя нужные,
        или перебросить всё заново. Можно остановиться на первом или втором результате и
        сразу его записать.`,
      schoolDescr: `Школа на примере единиц: требуется выбросить как можно больше едниниц.
        Очки считаются так:`,
      overallEng: `Each turn consists of a maximum of three rolls — the first roll to be made with
        all five dice. If the player elects to roll a second and third time, he may pick up and use any
        number of dice, providing a score is taken on the last roll. It is the skillful use of these
        two optional rolls of the dice that can turn an unlucky first or second roll into a high
        scoring turn.`,
      userName: '',
      highestScore: '',
      hiscoreGreeting: 'Your highest score is',
      exclamation: '!', // some over-engeneering
      helpMenuHidden: true,
      rulesHeading: 'Help',
      /*
      combinationsDescr: [
        { text: 'Один кубик с единицей', iconId: 'diceOnes', quantity: 1, scoreValue: '-2' },
        { text: 'Два кубика', iconId: 'diceOnes', quantity: 2, scoreValue: '-1' },
        { text: 'Три', iconId: 'diceOnes', quantity: 3, scoreValue: '0' },
        { text: 'Четыре', iconId: 'diceOnes', quantity: 4, scoreValue: '+1' },
        { text: 'Пять', iconId: 'diceOnes', quantity: 5, scoreValue: '+2' },
        { text: 'Одна шестёрка', iconId: 'diceSixes', quantity: 1, scoreValue: '-12' },
        { text: 'Три шестёрки', iconId: 'diceSixes', quantity: 3, scoreValue: '0' },
        { text: 'Пять', iconId: 'diceSixes', quantity: 5, scoreValue: '+12' },
        { text: 'Пара', iconId: 'diceFives', quantity: 2, scoreValue: '10' },
        { text: 'Три одинаковых', iconId: 'diceFours', quantity: 3, scoreValue: '12' },
        { text: 'Каре', iconId: 'diceTwos', quantity: 4, scoreValue: '8' },
        { text: 'Покер', iconId: 'diceFours', quantity: 5, scoreValue: '100' }
      ],
      combinationsDescrMk2: [
        { text: 'Фулл', iconTypeOne: 'diceOnes', iconTypeTwo: 'diceSixes', quantity: [3, 2], scoreValue: '19' },
        { text: 'Сложная комбинация', iconTypeOne: 'diceOnes', iconTypeTwo: 'diceSixes', quantity: [3, 2], scoreValue: '19' }
      ], */
      combinationsDescrMk3: [
        { title: 'Single dice with ace', quantity: [1], scoreValue: '-2' },
        { title: 'Two aces', quantity: [1, 1], scoreValue: '-1' },
        { title: 'Three', quantity: [1, 1, 1], scoreValue: '0' },
        { title: 'Four', quantity: [1, 1, 1, 1], scoreValue: '+1' },
        { title: 'Five', quantity: [1, 1, 1, 1, 1], scoreValue: '+2' },
        { title: 'One six', quantity: [6], scoreValue: '-12' },
        { title: 'Three sixes', quantity: [6, 6, 6], scoreValue: '0' },
        { title: 'Five sixes in school', quantity: [6, 6, 6, 6, 6], scoreValue: '+12' },
        { title: 'Pair', quantity: [4, 4], scoreValue: '8' },
        { title: 'Two pairs', quantity: [5, 5, 3, 3], scoreValue: '16' },
        { title: 'Three of a kind', quantity: [2, 2, 2], scoreValue: '6' },
        { title: 'Full', quantity: [3, 3, 3, 5, 5], scoreValue: '19' },
        { title: 'Quads', quantity: [6, 6, 6, 6], scoreValue: '24' },
        { title: 'Poker', quantity: [4, 4, 4, 4, 4], scoreValue: '100' },
        { title: 'Small', quantity: [1, 2, 3, 4, 5], scoreValue: '15' },
        { title: 'Large', quantity: [2, 3, 4, 5, 6], scoreValue: '20' },
        { title: 'Chance', quantity: [2, 6, 1, 3, 4], scoreValue: '16' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getDiceIds',
      'getUserData'
    ]),
    computedGameScore: function () {
      return store.state.schoolScoreTotal + store.state.gameTotal
    },
    rollsLeft: function () { // ???
      return store.state.rollCount
    }
  },
  mounted () {
    this.$nextTick(function () {
      console.log(`Rules page mounted ${this.schoolScores}`)
      this.highestScore = localStorage.getItem('highestScore')
      this.schoolScores = localStorage.getItem('schoolScores')
      this.userName = this.getUserData.name
      // this.chartData.labels = this.prepareLabelsForChart(this.schoolScores.split(',').length)
      if (this.schoolScores) {
        let arrayToDisplay = this.schoolScores.split(',')
        let slicedArray = arrayToDisplay.slice(-12)
        console.log(`Sliced array is ${slicedArray}`)
        this.chartData.series = [slicedArray]
      }
      // console.log(`Scores are split ${this.schoolScores.split(',').length}`)
      // this.chartData.series = this.schoolScores
      // this.schoolScores = [12, 14, 36, 34, 23, 12, -24, 14, 36, 44, 23, -12, 12, 14, 36, -24, 23]
      // this.schoolScores = '12, 14, 36, 34, 23, 12, -24, 14, 36, 44, 23, -12, 12, 14, 36, -24, 23'
      /*
      if (this.schoolScores !== '') {
        this.chartData.labels = this.prepareLabelsForChart(this.schoolScores.length)
        if (this.schoolScores.length >= 1) {
          // this.userScoresArray = lastScoresString.split(',')
          this.chartData.series = this.schoolScores.split(',')
        }
      }
      */
    })
  },
  methods: {
    prepareLabelsForChart (numOfLabels) {
      // console.log(`Preparing labels ${typeof numOfLabels}`)
      // let resultsToDisplay = numOfLabels // More than twelve
      console.log(`Results to display ${numOfLabels}`)
      // let lastLabelToDisplay = numOfLabels - resultsToDisplay
      let labelsArray = []
      while (numOfLabels !== 1) {
        labelsArray.push(numOfLabels)
        numOfLabels--
      }
      return labelsArray.reverse()
      /*
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
          console.log('Scaaary..')
        }
        return labelsArray.reverse()
      } */
    },
    openHelpMenu () {
      console.log(`Help menu!`)
      if (this.helpMenuHidden) {
        this.helpMenuHidden = false
      } else {
        this.helpMenuHidden = true
      }
    },
    restartGame () {
      console.log(`Restarting`)
      store.commit('resetState')
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>

@import "../assets/scss/index.scss";

.rules-heading {
  font-family: $text-font;
}
.rules-text {
  line-height: 1.4em;
  font-size: 1.25em;
  text-indent: 1em;
  font-family: $cyrillic-font;
}
.rules-text-eng {
  text-indent: 1em;
  font-family: $text-font;
  font-size: 1.4em;
}
.help-dice-icon {
  display: block;
  fill: none;
  width: 100%;
  height: 1.25em;
  width: 1.25em;
  color: $color-primary-0;
  // stroke-width: 1em;
  margin: 0em .15em 0em .15em;
  stroke: $color-primary-0;
}
.score-value {
  // border: 1px solid green;
  width: 2em;
  text-align: right;
  font-weight: 500;
  color: $color-chosen;
}

.combination-descr {
  font-size: 1.2em;
  // font-weight: 700;
  // color: red;
  font-family: $text-font;
  padding: .2em;
  p {
    margin: 0;
  }
  transition: background-color 500ms;
}
.combination-descr:hover {
  background-color: $color-pale-primary;
}

@media screen and (orientation: landscape) {
  .combination-descr {
  font-size: 2em;
  }
}

</style>
