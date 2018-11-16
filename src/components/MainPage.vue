<template>
  <v-container fill-height id="startPageContent">
    <v-layout align-space-around column>
      <v-flex d-flex align-center class="text-xs-center">
        <h1 class="game-name">{{ gameName }}</h1>
      </v-flex>
      <v-flex d-flex xs4>
        <v-img :src="require('@/assets/icons/startPageDice.svg')" contain></v-img>
      </v-flex>
      <v-flex d-flex align-center class="text-xs-center">
        <h2 class="user-name">{{ greeting }} {{ userName }}{{ exclamation }}</h2>
    </v-flex>
    <v-layout row align-center justify-space-around>
        <v-flex xs4 class="text-xs-center">
          <v-btn to="/game" ripple block class="ui-button" large color="purple darken-1"
            aria-label="Start game"
            v-bind:class="{orange:$store.state.currentGameTurn > 1}">
            <v-img :src="require('@/assets/icons/baseline-done-24px.svg')" contain height="2em"></v-img>
          </v-btn>
        </v-flex>
        <v-flex xs4 class="text-xs-center">
          <v-btn to="/register" ripple block class="ui-button" large color="purple darken-1"
            aria-label="Register or change name">
            <v-img :src="require('@/assets/icons/baseline-how_to_reg-24px.svg')" contain height="2em"></v-img>
          </v-btn>
        </v-flex>
      </v-layout>
      <span class="copyrights">
        Icons made by
        <a href="https://www.flaticon.com/authors/smashicons"
          title="Smashicons">
          Smashicons
        </a>
        from
        <a href="https://www.flaticon.com/"
          title="Flaticon">
          www.flaticon.com
        </a>
        is licensed by
        <a href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0" target="_blank" rel="noopener">
          CC 3.0 BY
        </a>
      </span>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      gameName: 'Sharlushka', // nicht gut
      userName: '',
      greeting: 'Hi,',
      exclamation: '.'
    }
  },
  computed: mapGetters([
    'getDefaultUserName'
  ]),
  mounted: function () {
    this.$nextTick(function () {
      // console.log(`Main page mounted`)
      this.userName = localStorage.getItem('userName')
      if (!this.userName || this.userName === '') {
        this.userName = this.getDefaultUserName
      }
    })
  },
  methods: {
    ...mapActions([
      'newGame'
    ]),
    startNewGame (event) {
      window.location.replace('/game')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";

.game-name {
  font-size: 3em;
  color: $color-primary-0;
}
.user-name {
  font-size: 2em;
}
.greeting {
  text-align: center;
}
.copyrights {
  text-align: center;
  font-size: .9em;
  color: rgb(83, 83, 83);
}

@media screen and (orientation: landscape) {
  .game-name {
    font-size: 2.8em;
  }
}
</style>
