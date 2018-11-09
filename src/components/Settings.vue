<template>
  <v-container fill-height id="gameSettings">
    <v-layout align-space-around column>
      <v-layout justify-end row>
        <v-flex xs2 class="text-xs-center">
          <v-btn class="icon-close" outline small fab round color="white" @click="$router.go(-1)">
            <v-img :src="require('@/assets/icons/baseline-clear-24px.svg')" contain height="4em"></v-img>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-flex class="text-xs-center">
        <h1 class="help-title">{{ helpTitle }}</h1>
      </v-flex>
      <v-flex class="text-xs-center">
        <h2 class="user-name">{{ userName }}!</h2>
        <h3 class="hi-score" v-if="highestScore">{{ hiscoreGreeting }} {{ highestScore }}{{ exclamation }}</h3>
      </v-flex>
      <v-flex d-flex align-center class="text-xs-center">
        <h3>{{ lastScoresHeading }}</h3>
      </v-flex>
      <v-flex>
        <v-layout align-center column>
          <v-flex xs12 mb-4 class="hi-score-display">
            <v-layout row wrap justify-space-around>
              <v-flex xs3 my-2 v-for="(value, index) in lastTwelveScores" :key="index">
                {{ value }}
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex class="stats-display" v-for="item in stats" :key="item.msg">
            {{ item.msg }}&nbsp;{{ item.value }}
          </v-flex>
        </v-layout>
      </v-flex>
      <v-layout mb-4 row align-center justify-space-around>
        <v-flex xs4 class="text-xs-center">
          <v-btn ripple block class="ui-button" large color="orange" v-on:click="restartGame">
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
      // console.log(`Restarting`)
      store.commit('resetState')
      this.$router.push('/')
    },
    computeAverageScore () {
      // should be local storage item
      // let lastTwelveScores = [333, 125, 256, 368, -12, 234, 623, 546, 345, 324, 34, 342]
      let newArray = []
      const scoreSum = (accumulator, currentValue) => accumulator + currentValue
      for (let value of this.lastTwelveScores) {
        newArray.push(parseInt(value))
      }
      if (newArray.length > 0) {
        return parseInt(newArray.reduce(scoreSum) / newArray.length)
      } else {
        return 0
      }
    },
    computePercentFromMax () {
      let maxScore = 879
      this.stats[0].value = maxScore
      let percent = Math.floor(this.stats[1].value / maxScore * 100)
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
  color: $color-orange;
  font-size: 1.7em;
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
  font-size: 2em;
  text-align: center;
}

.stats-display {
  color: $color-primary-3;
  font-size: 1.2em;
  font-weight: 700;
  line-height: 1.4;
}
.icon-close {
  color: red;
}
</style>
