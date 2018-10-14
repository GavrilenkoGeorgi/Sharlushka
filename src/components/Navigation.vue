<template>
  <div id="game-navigation">
    <!-- icon definition -->
    <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="settings" viewBox="0 0 507.45 507.45" preserveAspectRatio="xMidYMid meet">
        <path d="M440.813,280.5c0-7.65,2.55-15.3,2.55-25.5s0-17.85-2.55-25.5l53.55-43.35c5.1-5.1,5.1-10.2,2.55-15.3l-51-89.25c-2.55-2.55-7.649-5.1-15.3-2.55l-63.75,25.5c-12.75-10.2-28.05-17.85-43.35-25.5l-10.2-66.3C315.863,5.1,308.212,0,303.113,0h-102c-5.101,0-12.75,5.1-12.75,10.2l-10.2,68.85c-15.3,5.1-28.05,15.3-43.35,25.5l-61.2-25.5c-7.65-2.55-12.75,0-17.851,5.1 l-51,89.25c-2.55,2.55,0,10.2,5.1,15.3l53.55,40.8c0,7.65-2.55,15.3-2.55,25.5s0,17.85,2.55,25.5l-53.55,43.35    c-5.1,5.101-5.1,10.2-2.55,15.301l51,89.25c2.55,2.55,7.649,5.1,15.3,2.55l63.75-25.5c12.75,10.2,28.05,17.85,43.35,25.5    l10.2,66.3c0,5.1,5.1,10.2,12.75,10.2h102c5.101,0,12.75-5.101,12.75-10.2l10.2-66.3c15.3-7.65,30.6-15.3,43.35-25.5l63.75,25.5    c5.101,2.55,12.75,0,15.301-5.101l51-89.25c2.55-5.1,2.55-12.75-2.551-15.3L440.813,280.5z M252.113,344.25    c-48.45,0-89.25-40.8-89.25-89.25s40.8-89.25,89.25-89.25s89.25,40.8,89.25,89.25S300.563,344.25,252.113,344.25z" />
      </symbol>
    </svg>
    <div class="toolbar">
      <div class="score-display">
        <div class="score">{{ computedGameScore }}</div>
        <div class="game-name"><router-link to="/">{{ title }}</router-link></div>
      </div>
      <router-link class="settings-button" to="/settings">
        <svg class="settings-icon">
          <use xlink:href="#settings"></use>
        </svg>
      </router-link>
    </div>
  </div>
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

svg path {
  fill: white;
}
.toolbar {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  background-color: $color-primary-0;
  box-shadow: 0px 0px 3px 0px $color-primary-0;
  color: $color-light;
  line-height: 1.8em;
  padding: 0em .4em 0em .4em;
  margin-bottom: .2em;
  a {
    display: inherit;
  }
}
.score-display {
  display: flex;
  width: 100%;
}
.game-name {
  text-align: center;
  flex-grow: 2;
  a {
    color: white;
    text-decoration: none;
  }
}
.settings-icon {
  object-fit: cover;
  height: 1em;
  width: 1em;
}

/*
@media screen and (-webkit-min-device-pixel-ratio: 1.4) and (min-width: 250px) { // fly iq4415 iphone5Se
  // defaults above
}
*/
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 320px) {
  .toolbar {
    font-size: 1.5em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (min-width: 360px) { // nokia5
  .toolbar {
    font-size: 1.5em;
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) {
  .toolbar {
    font-size: 2.5em;
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1024px) { // iPadPro
  .toolbar {
    font-size: 3.5em;
  }
}
@media screen and (max-resolution: 96dpi) and (min-width: 768px) { // desktop
  .toolbar {
    font-size: 2em;
  }
}
</style>
