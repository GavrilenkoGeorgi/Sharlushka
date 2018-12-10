<template>
  <v-container fill-height id="endGame">
    <v-layout align-space-around column>
      <v-spacer></v-spacer>
<!-- Close icon -->
      <closeBtn></closeBtn>
<!-- Message -->
      <v-flex d-flex class="user-name text-xs-center">
        <h1>{{ message }}<br />
          <span>{{ userName }}{{ exclamation }}</span>
        </h1>
      </v-flex>
      <v-flex class="message-school text-xs-center"
        v-if="!this.getCurrentGameState.schoolCompleted">
        <h3>{{ graduationMessage }}</h3>
        <h2>{{ schoolScoreMessage }} {{ getTotalScore }}</h2>
      </v-flex>
      <v-flex class="message-game text-xs-center"
        v-if="this.getCurrentGameState.schoolCompleted">
        <h2>{{ messageText }} {{ getTotalScore }}</h2>
      </v-flex>
<!-- Button -->
      <v-layout mb-4 row align-center justify-space-around>
        <v-flex xs4>
          <v-btn ripple
            large color="orange"
            @click="restartGame">
            <v-icon medium color="white">replay</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store/store'
import closeBtn from '../components/CloseBtn'

export default {
  data () {
    return {
      message: 'Game over,',
      messageText: 'Your score is',
      graduationMessage: 'You can\'t even finish the school.',
      schoolScoreMessage: 'Your score is',
      userName: '',
      highestScore: '',
      hiscoreGreeting: 'Your highest score is',
      exclamation: '!', // some over-engeneering
      lastScoresArray: ''
    }
  },
  components: {
    closeBtn
  },
  mounted () {
    this.$nextTick(function () {
      console.log(`Game over`)
      this.highestScore = localStorage.getItem('highestScore')
      if (localStorage.getItem('userName')) {
        this.userName = localStorage.getItem('userName')
      } else {
        this.userName = this.getDefaultUserName
      }
      this.lastScoresArray = localStorage.getItem('lastScoresArray')
      if (!this.lastScoresArray) {
        console.log(`No local storage score array yet, creating one`)
        // let lastTwelveScores = [333, 125, 256, 368, -12, 234, 623, 546, 345, 324, 34, 342]
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
      'getTotalScore',
      'getCurrentGameState',
      'getDefaultUserName'
    ])
  },
  methods: {
    restartGame () {
      console.log(`Restarting game`)
      store.commit('resetState')
      this.$router.push('/game')
    },
    addScoreToDatabase () {
      console.log(`Adding score`)
      if (typeof this.lastScoresArray === 'string') {
        this.lastScoresArray = this.lastScoresArray.split(',')
      }
      if (this.lastScoresArray.length <= 11) {
        this.lastScoresArray.push(this.getTotalScore)
      } else if (this.lastScoresArray.length >= 12) {
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
@import "../assets/scss/index.scss";

.user-name, .message-school, .message-game {
  font-family: $text-font;
}
.user-name {
  span {
    color: $color-chosen;
  }
}
.message-school {
  line-height: 1.5;
}
</style>
