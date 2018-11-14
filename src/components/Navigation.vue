<template>
  <v-layout align-center justify-space-around row id="gameNavigation">
    <v-flex class="score text-xs-left">
      {{ computedGameScore }}
    </v-flex>
    <v-flex class="game-name text-xs-center" role="button" aria-label="Go to main page">
      <router-link to="/">{{ title }}</router-link>
    </v-flex>
    <v-flex class="settings-icon text-xs-right">
      <v-btn to="/settings" fab flat ripple color="#79008f"
        aria-label="Go to settings">
        <v-img :src="require('@/assets/icons/baseline-menu-24px.svg')" contain height="3em"></v-img>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import store from '../store/store'

export default {
  name: 'Navigation',
  data () {
    return {
      userName: '',
      highestScore: '',
      title: 'Sharlushka'
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
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";

#gameNavigation {
  // border: 1px solid pink;
  position: fixed;
  top: 0;
  background-color: $color-primary-0;
  height: 1.9em;
  width: 100%;
  font-size: 1.2em;
  padding-left: .3em;
  // box-shadow: 0 .1em .05em -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}
.score {
  // border: 1px solid red;
  color: white;
  font-family: $text-font;
  // padding-left: .3em;
}
.game-name {
  a {
    color: white;
    font-family: $text-font;
    text-decoration: none;
  }
}
.settings-icon {
  a {
    margin: 0em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 320px) { // iphone5
  #gameNavigation {
    font-size: 2em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (min-width: 360px) { // nokia5
  #gameNavigation {
    font-size: 1.7em;
    // border: 1px solid lime;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) { // ipad
  #gameNavigation {
    font-size: 2.4em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1024px) { // ipadPro
  #gameNavigation {
    font-size: 3.2em;
    padding-right: .3em;
  }
}
/*
@media screen and (-webkit-min-device-pixel-ratio: 3) and (min-width: 414px) { // iphone678plus
  #gameNavigation {
    // font-size: 2.8em;
  }
}
*/

// landscape
@media screen and (orientation: landscape) {
  #gameNavigation {
    font-size: 1.5em;
    padding-left: .5em;
    // height: 1.5em;
    // border: 1px solid red;
  }
}

@media screen and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 3) {
  #gameNavigation {
    font-size: 1.8em;
    // height: 1.3em;
    // border: 1px solid red;
  }
}

@media screen and (max-resolution: 96dpi) and (min-width: 500px) { // desktop
  #gameNavigation {
    font-size: 2.6em;
  }
}

/*
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) {
}
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1024px) { // iPadPro
}
@media screen and (max-resolution: 96dpi) and (min-width: 768px) { // desktop
}
*/
</style>
