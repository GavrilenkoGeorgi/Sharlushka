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
        <div class="game-name">{{ title }}</div>
      </div>
      <router-link class="settings-button" to="/settings">
        <svg class="settings-icon">
          <use xlink:href="#settings"></use>
        </svg>
      </router-link>
      <!--div class="ham-button">
        <div class="hamburger hamburger--collapse" v-on:click="toggleBurger" contain height="1.5em">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </div>
      </div>
    </div-->
    <!-- End of toolbar -->
      <!--h2 v-if="highestScore">Your highest score is: {{ highestScore }}</h2>
      <h3 class="menuItem" v-on:click="openMenuItem">Rules</h3>
      <p class="menuItemText">Lorem ipsum dolor sit amet,</p>
      <h3 class="menuItem" v-on:click="openMenuItem">Settings</h3>
      <p class="menuItemText">Lorem ipsum dolor sit amet,</p-->
      <!--button class="menuButton" v-on:click="restartGame">Restart</button-->
      <!--v-btn v-on:click="restartGame" color="purple" dark class="my-4">
          <v-icon dark>replay</v-icon>
      </v-btn-->
      <!--div class="debug-info">
        This is debug!
      </div-->
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
  /*
  methods: {
    toggleBurger () {
      // console.log(this.test)
      if (this.settingsHidden) {
        this.settingsHidden = false
      } else {
        this.settingsHidden = true
      }
      /*
      let hamburger = document.querySelector('.hamburger')
      if (hamburger.classList.contains('is-active')) {
        hamburger.classList.remove('is-active')
        document.getElementById('sidenav').style.width = '0'
      } else {
        hamburger.classList.add('is-active')
        document.getElementById('sidenav').style.width = '100%'
      }
    },
    openMenuItem (event) {
      if (event.target.nextElementSibling.style.maxHeight === '20em') {
        event.target.nextElementSibling.style.maxHeight = '0em'
      } else {
        event.target.nextElementSibling.style.maxHeight = '20em'
      } */
  /* },
    restartGame (state) { // remove this
      store.commit('resetState')
      this.toggleBurger()
      // hard reset
      this.$router.push('/')
    }
  } */
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
  margin-bottom: .4em;
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
}
.settings-icon {
  object-fit: cover;
  height: 1em;
  width: 1em;
}
</style>
