<template>
  <v-container fill-height id="endGame">
    <v-layout align-space-around column>
      <v-layout justify-end row>
<!-- Close icon -->
        <v-flex xs2 class="text-xs-center">
          <v-btn class="icon-close" outline small fab round color="white" @click="$router.go(-1)">
            <v-img :src="require('@/assets/icons/baseline-clear-24px.svg')" contain height="4em"></v-img>
          </v-btn>
        </v-flex>
      </v-layout>
<!-- Message -->
      <v-flex class="text-xs-center">
        <h1 class="message">{{ message }}<br /><span class="user-name animated fadeIn">{{ userName }}{{ exclamation }}</span></h1>
      </v-flex>
      <v-flex class="text-xs-center">
        <h2 class="hi-score" v-if="highestScore">{{ messageText }} {{ getTotalScore }}</h2>
      </v-flex>
<!-- Button -->
      <v-layout mb-4 row align-center justify-space-around>
        <v-flex xs4 class="text-xs-center">
          <v-btn ripple block class="ui-button" large color="orange" v-on:click="restartGame">
            <v-img :src="require('@/assets/icons/baseline-replay-24px.svg')" contain height="2em"></v-img>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store/store'

export default {
  data () {
    return {
      message: 'Game over,',
      messageText: 'Your score is',
      userName: '',
      highestScore: '',
      hiscoreGreeting: 'Your highest score is',
      exclamation: '!', // some over-engeneering
      lastScoresArray: ''
    }
  },
  mounted () {
    this.$nextTick(function () {
      // console.log(`End game mounted`)
      this.highestScore = localStorage.getItem('highestScore')
      this.userName = localStorage.getItem('userName')
      this.lastScoresArray = localStorage.getItem('lastScoresArray')
      if (!this.lastScoresArray) {
        // console.log(`No local storage score array yet`)
        this.lastScoresArray = [this.getTotalScore]
        localStorage.setItem('lastScoresArray', this.lastScoresArray)
      } else {
        // console.log(`local storage score array exists`)
        this.addScoreToDatabase()
      }
    })
  },
  computed: {
    ...mapGetters([
      'getTotalScore'
    ])
  },
  methods: {
    restartGame () {
      // console.log(`Restarting`)
      store.commit('resetState')
      this.$router.push('/game')
    },
    addScoreToDatabase () {
      // console.log(`Adding score`)
      if (typeof this.lastScoresArray === 'string') {
        this.lastScoresArray = this.lastScoresArray.split(',')
      }
      if (this.lastScoresArray.length < 11) {
        this.lastScoresArray.push(this.getTotalScore)
      } else if (this.lastScoresArray.length >= 11) {
        // console.log(`Slicing`)
        this.lastScoresArray = this.lastScoresArray.slice(1)
        this.lastScoresArray.push(this.getTotalScore)
      }
      // ! add check if game is completed
      localStorage.setItem('lastScoresArray', this.lastScoresArray)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";
.message {
  font-size: 1.7em;
  font-weight: 700;
  text-align: center;
  line-height: 1.4;
}

.user-name {
  color: $color-chosen;
}

</style>
