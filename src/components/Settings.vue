<template>
  <v-container fill-height id="gameSettings">
    <v-layout align-space-around column>
<!-- Close button -->
      <v-layout justify-end row>
        <v-flex xs2 class="text-xs-center">
          <v-btn class="icon-close" outline small fab round color="white" @click="$router.go(-1)">
            <v-img :src="require('@/assets/icons/baseline-clear-24px.svg')" contain height="4em"></v-img>
          </v-btn>
        </v-flex>
      </v-layout>
<!-- Title and user name -->
      <v-flex class="text-xs-center">
        <h1 class="help-title">{{ helpTitle }}</h1>
      </v-flex>
      <v-flex class="text-xs-center">
        <h2 class="user-name">{{ userName }}!</h2>
        <h3 class="hi-score" v-if="highestScore">{{ hiscoreGreeting }} {{ highestScore }}{{ exclamation }}</h3>
      </v-flex>
<!-- Last scores heading and table-->
      <v-flex d-flex align-center class="text-xs-center">
        <h3>{{ lastScoresHeading }}</h3>
      </v-flex>
      <v-flex>
        <v-layout align-space-around column>
          <v-flex d-flex class="hi-score-display">
            <v-layout row wrap justify-space-around>
              <v-flex xs4 sm1 ma-0 py-1 v-for="value in lastTwelveScores" :key="value">
                {{value}}
              </v-flex>
            </v-layout>
          </v-flex>
<!-- Stats display -->
          <v-flex class="stats-display text-xs-center"
            v-for="item in stats"
            :key="item.msg">
            {{ item.msg }}&nbsp;{{ item.value }}
          </v-flex>
        </v-layout>
      </v-flex>
      <v-layout row align-center justify-space-around>
        <v-flex xs4 class="text-xs-center">
          <v-btn ripple block class="ui-button" large color="orange"
            @click="restartGame">
            <v-img :src="require('@/assets/icons/baseline-replay-24px.svg')" contain height="2em"></v-img>
          </v-btn>
        </v-flex>
        <v-flex xs4 class="text-xs-center">
          <v-btn ripple block class="ui-button" large color="purple darken-1" to="/help">
            <v-img :src="require('@/assets/icons/baseline-help_outline-24px.svg')" contain height="2em"></v-img>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import store from '../store/store' // reset state button
import { mapGetters } from 'vuex'

export default {
  name: 'Settings',
  data () {
    return {
      userName: '',
      helpTitle: 'About',
      helpButtonText: 'Help!',
      highestScore: '',
      hiscoreGreeting: 'Your highest score is',
      exclamation: '.', // some over-engeneering
      lastTwelveScores: '',
      lastScoresHeading: 'Recent scores are',
      stats: [
        { msg: 'Max possible score is', value: '879' },
        { msg: 'Your average score equals', value: '' },
        { msg: 'Percent from max score ~', value: '' }
      ]
    }
  },
  mounted () {
    // console.log(`Settings mounted`)
    this.highestScore = localStorage.getItem('highestScore')
    this.userName = localStorage.getItem('userName')
    if (!this.userName || this.userName === '') {
      this.userName = this.getDefaultUserName
    }
    let lastScoresString = localStorage.getItem('lastScoresArray')
    if (lastScoresString) {
      this.lastTwelveScores = lastScoresString.split(',')
    }
    this.stats[1].value = this.computeAverageScore()
    this.stats[2].value = this.computePercentFromMax()
  },
  computed: {
    ...mapGetters([
      'getDefaultUserName'
    ])
  },
  methods: {
    restartGame (state) {
      // console.log(`Restarting`)
      store.commit('resetState')
      this.$router.push('/game')
    },
    computeAverageScore () {
      // let lastTwelveScores = [333, 125, 256, 368, -12, 234, 623, 546, 345, 324, 34, 342]
      let arrayToReduce = []
      const scoreSum = (accumulator, currentValue) => accumulator + currentValue
      for (let value of this.lastTwelveScores) {
        arrayToReduce.push(parseInt(value))
      }
      if (arrayToReduce.length > 0) {
        return parseInt(arrayToReduce.reduce(scoreSum) / arrayToReduce.length)
      } else {
        return 0
      }
    },
    computePercentFromMax () {
      let maxScore = 879 // move to store
      this.stats[0].value = maxScore
      let percent = Math.floor(this.stats[1].value / maxScore * 100)
      return percent + '%'
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";

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
</style>
