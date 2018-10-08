<template>
<div id="navigation">
  <div class="toolbar">
    <div class="ham-button">
      <div class="hamburger hamburger--collapse" v-on:click="toggleBurger">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </div>
    </div>
    <div class="score-display">
      <div class="game-name">{{ title }}</div>
      <div class="score">{{ computedGameScore }}</div>
    </div>
  </div>
  <div id="sidenav">
    <h1 class="user-name">{{ userName }}</h1>
    <h2 v-if="highestScore">Your highest score is: {{ highestScore }}</h2>
    <h3 class="menuItem" v-on:click="openMenuItem">Rules</h3>
    <p class="menuItemText">Lorem ipsum dolor sit amet,</p>
    <h3 class="menuItem" v-on:click="openMenuItem">Settings</h3>
    <p class="menuItemText">Lorem ipsum dolor sit amet,</p>
    <!--button class="menuButton" v-on:click="restartGame">Restart</button-->
    <v-btn v-on:click="restartGame" color="purple" dark class="my-4">
        <v-icon dark>replay</v-icon>
    </v-btn>
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
  },
  methods: {
    toggleBurger () {
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
      }
    },
    restartGame (state) { // remove this
      // store.commit('resetState')
      this.toggleBurger()
      // hard reset
      this.$router.go({path: '/game'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/index.scss";
@import "../assets/scss/vars/colors.scss";

#navigation {
  background-color: $color-primary-0;
  // box-shadow: 0px 10px 45px -11px $color-primary-2;
  box-shadow: 0px 1px 5px 0px $color-primary-0;
  color: $color-light;
  overflow-x: hidden;
  // margin: 0em 0em 1em 0em;
  z-index: 3;
}

.toolbar {
  display: flex;
  padding: .2em 0em .2em 0em;
}

.ham-button {
  display: flex;
  align-content: center;
  // margin: 0em .6em 0em .6em;
  // padding: .2em 0em 0em 0em;
  // height: 2em;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.score-display {
  display: flex;
  width: 100%;
  font-size: 1.5em;
  padding-right: .3em;
}
.game-name {
  text-align: center;
  flex-grow: 2;
}
.score {
  margin-left: auto;
}
.settings-icon {
  height: 1.2em;
}

#sidenav {
    height: 100vh;
    width: 0%;
    position: fixed;
    z-index: 1;
    left: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    transition: 0.5s;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $color-primary-transparent;
    padding-top: 2em;
}
/*
.background {
  position: absolute;
  background-color: $color-primary-transparent;
  width: 100%;
  height: inherit;
  z-index: -1;
  padding-top: 1em;
}
*/
.menuItem {
  margin-top: 1em;
}

.menuItem:hover {
  color: $color-orange;
  cursor: pointer;
}
.menuItemText {
  font-size: .8em;
  text-align: left;
  transition: 1s;
  overflow: hidden;
  max-height: 0em;
}
.menuButton {
  background: $color-primary-0;
  border: none;
  cursor: pointer;
  border-radius: .25em;
  font-size: 1.5em;
  color: $color-light;
  padding: .3em;
  width: 6em;
}
.menuButton {
  margin: 3em .3em 0em .3em;
}
.menuButton:hover {
  box-shadow: 0px 0px 6px $color-primary-0;
}

.debug-info {
  border: 1px solid $color-primary-1;
  width: 100%;
}

@media screen and (max-width: 40em) {
  .score-display {
    font-size: 2em;
    // border: 1px solid pink;
  }
  .toolbar {
    display: flex;
    padding: .4em .1em .4em .1em;
  }
}

@media screen and (max-width: 20em) { // fly iq4415
  .score-display {
    font-size: 1.5em;
  }
}
</style>
