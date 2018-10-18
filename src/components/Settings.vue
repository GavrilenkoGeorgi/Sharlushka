<template>
  <v-container fill-height id="gameSettings">
<!-- icon definition -->
    <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="settingsClose" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <path class="close-icon-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z"/>
      </symbol>
    </svg>
<!-- Icons defs end -->
    <v-layout column>
      <v-layout align-end justify-space-between column mb-4>
        <v-flex>
          <svg class="ui-icon" @click="$router.go(-1)" height="3em" width="3em">
            <use xlink:href="#settingsClose"></use>
          </svg>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-space-around column fill-height mt-4>
        <v-flex>
          <h1 class="user-name">{{ userName }}</h1>
        </v-flex>
        <v-flex>
          <h2 class="hi-score" v-if="highestScore">{{ hiscoreGreeting }} {{ highestScore }}{{ exclamation }}</h2>
        </v-flex>
        <v-flex>
          <v-btn class="ui-button" large color="red accent-4" dark v-on:click="restartGame">
            <v-img :src="require('@/assets/icons/baseline-replay-24px.svg')" contain height="2em"></v-img>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import store from '../store/store'

export default {
  name: 'Settings',
  data () {
    return {
      userName: '',
      highestScore: '',
      hiscoreGreeting: 'Your highest score is',
      exclamation: '!' // some over-engeneering
    }
  },
  mounted () {
    this.highestScore = localStorage.getItem('highestScore')
    this.userName = localStorage.getItem('userName')
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/index.scss";

.ui-icon {
  object-fit: cover;
}
.close-icon-path {
  fill: $color-primary-1;
}
</style>
