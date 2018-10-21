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
      exclamation: '!' // some over-engeneering
    }
  },
  mounted () {
    this.highestScore = localStorage.getItem('highestScore')
    this.userName = localStorage.getItem('userName')
  },
  computed: {
    ...mapGetters([
      'getTotalScore'
    ])
  },
  methods: {
    restartGame (state) {
      console.log(`Restarting`)
      store.commit('resetState')
      this.$router.push('/game')
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
