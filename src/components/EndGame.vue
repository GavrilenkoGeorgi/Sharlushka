<template>
  <v-container fill-height id="gameSettings">
<!-- Icon definition -->
    <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="gameEndClose" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <path class="close-icon-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z"/>
      </symbol>
    </svg>
<!-- Icon defs end -->
    <v-layout column>
      <v-flex xs2>
        <v-layout column align-end>
          <svg class="ui-icon" @click="$router.go(-1)">
            <use xlink:href="#gameEndClose"></use>
          </svg>
        </v-layout>
      </v-flex>
      <v-layout column align-center>
        <v-flex>
          <h1 class="user-name">{{ message }}<br />{{ userName }}{{ exclamation }}</h1>
        </v-flex>
        <v-flex d-flex align-start>
          <h2 class="hi-score" v-if="highestScore">Your score is {{ getTotalScore }}</h2>
        </v-flex>
        <v-flex>
          <v-btn class="ui-button" large color="purple" dark v-on:click="restartGame">
            <v-img :src="require('@/assets/icons/baseline-replay-24px.svg')" contain height="2em"></v-img>
          </v-btn>
          <!--v-btn class="ui-button" large color="green" dark v-on:click="addScoreToDatabase">
            <v-img :src="require('@/assets/icons/baseline-replay-24px.svg')" contain height="2em"></v-img>
          </v-btn-->
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store/store'

export default {
  name: 'Settings',
  data () {
    return {
      message: 'Game over,',
      userName: '',
      highestScore: '',
      hiscoreGreeting: 'Your highest score is',
      exclamation: '!', // some over-engeneering
      computedAverageScore: '',
      lastScoresArray: ''
    }
  },
  mounted () {
    this.$nextTick(function () {
      console.log(`End game mounted`)
      this.highestScore = localStorage.getItem('highestScore')
      this.userName = localStorage.getItem('userName')
      this.computedAverageScore = this.computeAverageScore() // !computed vs compute
      this.lastScoresArray = localStorage.getItem('lastScoresArray')
      console.log(`The beginning ${this.lastScoresArray}`)
      if (!this.lastScoresArray) {
        console.log(`No local storage score array yet`)
        this.lastScoresArray = [this.getTotalScore]
        localStorage.setItem('lastScoresArray', this.lastScoresArray)
        console.log(localStorage.getItem('lastScoresArray'))
      } else {
        console.log(`local storage score array exists`)
        this.addScoreToDatabase()
        // this.lastScoresArray = localStorage.getItem('lastScoresArray')
        // this.addScoreToDatabase()
      }
      // this.addScoreToDatabase()
      /*
      if (this.lastScoresArray.length === 0) {
        // console.log(`local storage lastScoreArray is empty making it an array`)
        console.log(`Type of ${typeof this.lastScoresArray}`)
        console.log(`Length of ${this.lastScoresArray.length}`)
        this.lastScoresArray = []
        // this.addScoreToDatabase()
      } else {
        this.lastScoresArray = this.lastScoresArray.split(',')
        // console.log(`Adding score to database`)
        console.log(`Type of ${typeof this.lastScoresArray}`)
        // this.addScoreToDatabase()
      }
      this.addScoreToDatabase()
      */
    })
  },
  computed: {
    ...mapGetters([
      'getTotalScore'
    ])
  },
  methods: {
    restartGame () {
      console.log(`Restarting`)
      store.commit('resetState')
      this.$router.push('/game')
    },
    computeAverageScore () {
      // should be local storage item
      let lastTwelveScores = [333, 125, 256, 368, -12, 234, 623, 546, 345, 324, 34, 342]
      const scoreSum = (accumulator, currentValue) => accumulator + currentValue
      // console.log(lastTwelveScores.reduce(scoreSum))
      return lastTwelveScores.reduce(scoreSum)
    },
    addScoreToDatabase () {
      console.log(`Adding score`)
      console.dir(this.lastScoresArray)
      console.log(`Type of ${typeof this.lastScoresArray}`)
      if (typeof this.lastScoresArray === 'string') {
        this.lastScoresArray = this.lastScoresArray.split(',')
      }
      // console.dir(this.lastScoresArray)
      if (this.lastScoresArray.length < 11) {
        console.log(`Smaller that 11`)
        console.log(`Type of ${typeof this.lastScoresArray}`)
        this.lastScoresArray.push(this.getTotalScore)
        console.log(`this.lastScoresArray ${this.lastScoresArray}`)
      } else if (this.lastScoresArray.length >= 12) {
        console.log(`Slicing`)
        this.lastScoresArray = this.lastScoresArray.slice(1)
        this.lastScoresArray.push(this.getTotalScore)
        console.log(`this.lastScoresArray ${this.lastScoresArray}`)
      }
      // ! add check if game is completed
      localStorage.setItem('lastScoresArray', this.lastScoresArray)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";
.user-name {
  font-size: 1.7em;
  font-weight: 700;
  text-align: center;
}
.close-icon-path {
  fill: $color-primary-1;
}

</style>
