<template>
  <v-container fill-height id="gameSettings">
<!-- Icon definition -->
    <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="settingsClose" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <path class="close-icon-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z"/>
      </symbol>
    </svg>
<!-- Icon defs end -->
    <v-layout column>
      <v-flex xs2>
        <v-layout column align-end> <!-- button needed -->
          <svg class="ui-icon" @click="$router.go(-1)">
            <use xlink:href="#settingsClose"></use>
          </svg>
        </v-layout>
      </v-flex>
      <v-layout column align-center>
        <v-flex>
          <h1 class="help-title">{{ helpTitle }}</h1>
        </v-flex>
        <v-flex class="user-info">
          <h2 class="user-name">{{ userName }}</h2>
          <h3 class="hi-score" v-if="highestScore">{{ hiscoreGreeting }} {{ highestScore }}{{ exclamation }}</h3>
        </v-flex>
        <v-flex>
          <h3>{{ lastScoresHeading }}</h3>
        </v-flex>
        <v-flex>
          <v-layout align-center column>
            <v-flex xs12 class="hi-score-display mb-3">
              <v-layout row wrap justify-space-around>
              <v-flex xs3 my-2 v-for="(value, index) in lastTwelveScores" :key="index">
                {{ value }}
              </v-flex>
              </v-layout>
            </v-flex>
            <v-flex class="stats-display" xs12 v-for="item in stats" :key="item.msg">
              {{ item.msg }} {{ item.value }}
            </v-flex>
          </v-layout>
        </v-flex>
        <!--v-flex>
          <h3 class="hi-score" v-if="highestScore">{{ hiscoreGreeting }} {{ highestScore }}{{ exclamation }}</h3>
        </v-flex-->
        <v-container ma-0 pa-0 fluid>
        <v-layout row align-center>
          <v-flex d-flex class="text-xs-center">
            <v-btn class="ui-button" color="red accent-4" dark v-on:click="restartGame">
              <v-img :src="require('@/assets/icons/baseline-replay-24px.svg')" contain height="2em"></v-img>
            </v-btn>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <!--v-btn class="ui-button" large color="red accent-4" dark v-on:click="restartGame">
              <v-img :src="require('@/assets/icons/baseline-replay-24px.svg')" contain height="2em"></v-img>
            </v-btn-->
            <h2 role="button" class="help-link animated bounce" @click="$router.push('/help')">{{ helpButtonText }}</h2>
          </v-flex>
        </v-layout>
        </v-container>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import store from '../store/store'
// import MenuIcon from 'vue-material-design-icons/Menu.vue'

export default {
  name: 'Settings',
  /*
  components: {
    MenuIcon
  },
  */
  data () {
    return {
      userName: '',
      helpTitle: 'About',
      helpButtonText: 'Help!',
      highestScore: '',
      hiscoreGreeting: 'Your highest score is',
      exclamation: '.', // some over-engeneering
      // lastTwelveScores: [333, 125, 256, 368, -12, 234, 623, 546, 345, 324, 34, 342],
      lastTwelveScores: '',
      lastScoresHeading: 'Your recent scores are',
      stats: [
        { msg: 'Max possible score is', value: '879' },
        { msg: 'Your average score', value: '' },
        { msg: 'Percent from max score ~', value: '' }
      ]
    }
  },
  mounted () {
    this.highestScore = localStorage.getItem('highestScore')
    this.userName = localStorage.getItem('userName')
    let lastScoresString = localStorage.getItem('lastScoresArray')
    if (lastScoresString) {
      this.lastTwelveScores = lastScoresString.split(',')
    }
    // this.stats[0].value = this.highestScore
    this.stats[1].value = this.computeAverageScore()
    this.stats[2].value = this.computePercentFromMax()
  },
  computed: {
    computedGameScore: function () {
      return store.state.schoolScoreTotal + store.state.gameTotal
    },
    rollsLeft: function () {
      return store.state.rollCount
    }
  },
  methods: {
    restartGame (state) {
      console.log(`Restarting`)
      store.commit('resetState')
      this.$router.push('/')
    },
    computeAverageScore () {
      // should be local storage item
      // let lastTwelveScores = [333, 125, 256, 368, -12, 234, 623, 546, 345, 324, 34, 342]
      // const scoreSum = (accumulator, currentValue) => accumulator + currentValue
      // console.log(lastTwelveScores.reduce(scoreSum))
      // let temp = this.lastTwelveScores
      // return this.lastTwelveScores.reduce(scoreSum)
      let newArray = []
      const scoreSum = (accumulator, currentValue) => accumulator + currentValue
      for (let value of this.lastTwelveScores) {
        // console.log(value)
        newArray.push(parseInt(value))
      }
      return parseInt(newArray.reduce(scoreSum) / newArray.length)
    },
    computePercentFromMax () {
      let maxScore = 879
      this.stats[0].value = maxScore
      let percent = Math.floor(this.stats[1].value / maxScore * 100)
      // let temp = Math.floor(percent)
      console.log(`typeof ${typeof percent}`)
      /// let output = parseInt(percent)
      return percent + '%'
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";
@import "../assets/scss/vars/fonts.scss"; // meh...

.close-icon-path {
  fill: $color-primary-1;
}
.user-name {
  color: $color-primary-0;
  font-size: 2em;
}
.user-info {
  text-align: center;
}
.help-link {
  color: $color-primary-0;
  transition: color 600ms;
  // text-decoration: underline;
}
.help-link:hover {
  color: $color-chosen;
  text-decoration: underline
}
.hi-score {
  padding-top: .3em;
}

.hi-score-display {
  color: $color-primary-1;
  // font-weight: 700;
  font-size: 2.2em;
  text-align: center;
}

.stats-display {
  color: $color-primary-3;
  font-size: 1.5em;
  line-height: 1.4;
}
</style>
