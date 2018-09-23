<template>
<div id="navigation">
  <div class="toolbar">
    <div class="hamButton">
      <button class="hamburger hamburger--collapse" type="button" v-on:click="toggleBurger">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
    <!--div class="userName">{{ msg }}</div-->
    <div class="scoreDisplay">
      <div>Score: {{computedGameScore}}</div>
      <div>Rolls left: {{rollsLeft}}</div>
    </div>
  </div>
  <div id="sidenav">
    <!--div class="background"></div-->
    <h1 class="user-name">{{ userName }}</h1>
    <h2 v-if="highestScore">Your highest score is: {{ highestScore }}</h2>
    <h3 class="menuItem" v-on:click="openMenuItem">Rules</h3>
    <p class="menuItemText">Lorem ipsum dolor sit amet,</p>
    <h3 class="menuItem" v-on:click="openMenuItem">Settings</h3>
    <p class="menuItemText">Lorem ipsum dolor sit amet,</p>
    <button class="menuButton" v-on:click="restartGame">Restart</button>
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
      highestScore: ''
    }
  },
  mounted () {
    // this.userName = localStorage.getItem('userName')
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
    restartGame (state) {
      // deselect all dice (remove this)
      for (let dice in store.state.diceArray) {
        if (store.state.diceArray[dice].chosen) {
          store.state.diceArray[dice].chosen = false
        }
      }
      store.commit('resetState')
      this.clearResultBox()
      store.state.startMenu = false
      this.userName = localStorage.getItem('userName')
      this.highestScore = localStorage.getItem('highestScore')
      this.toggleBurger()
    },
    clearResultBox () {
      let diceBox = document.querySelector('.diceBox')
      let resultBox = document.querySelector('.resultBox')
      while (resultBox.childNodes.length) {
        diceBox.appendChild(resultBox.firstChild)
      }
      // and clear all temp results in store
      for (let key in store.state.scoreArray) {
        if (!store.state.scoreArray[key].final) {
          store.state.scoreArray[key].value = ''
        }
      }
      // deselect all dice
      for (let key in store.state.diceArray) {
        if (store.state.diceArray[key].chosen) {
          store.state.diceArray[key].chosen = false
        }
      }
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
  box-shadow: 0px 10px 45px -11px $color-primary-2;
  color: $color-light;
  margin: 0em 0em 1em 0em;
}

.toolbar {
  display: flex;
  padding: .5em 0em .5em 0em;
}

.hamButton {
  display: flex;
  align-content: center;
}

.scoreDisplay {
  width: 100%;
  font-size: 1.8em;
  display: flex;
  justify-content: space-around;
}
.settings-icon {
  height: 1.2em;
}
button {
  margin: 0em .6em 0em .6em;
  padding: .2em 0em 0em 0em;
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

@media only screen and (max-width: 500px) , screen and (max-height: 300px) {
  #navigation {
    margin-bottom: .3em;
  }
}

</style>
