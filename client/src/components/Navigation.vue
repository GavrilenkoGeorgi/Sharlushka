<template>
<div id="navigation">
  <div class="toolbar">
    <div class="hamButton">
      <button class="hamburger hamburger--collapse" type="button" v-on:click="openMenu">
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
    <div class="blur"></div>
    <h3 class="menuItem" v-on:click="openMenuItem">Rules</h3>
    <p class="menuItemText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere ornare accumsan.
    Proin tristique purus quis imperdiet pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus.
    Nulla facilisi. Nulla facilisi. Aliquam non mi eget mauris sagittis tincidunt. Mauris aliquam nulla a massa
    vulputate, ac faucibus dui tincidunt. Sed ornare euismod pretium. Mauris vel consectetur lacus. Duis tristique,
    quam sit amet ultrices luctus, eros risus pharetra ante, facilisis dapibus lorem dui at nulla. Aliquam orci dolor,
    lacinia sit amet tristique sed, sodales eget libero. Fusce scelerisque nisi elit.</p>
    <h3 class="menuItem" v-on:click="openMenuItem">Settings</h3>
    <p class="menuItemText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere ornare accumsan.
    Proin tristique purus quis imperdiet pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus.
    Nulla facilisi. Nulla facilisi. Aliquam non mi eget mauris sagittis tincidunt. Mauris aliquam nulla a massa
    vulputate, ac faucibus dui tincidunt. Sed ornare euismod pretium. Mauris vel consectetur lacus. Duis tristique,
    quam sit amet ultrices luctus, eros risus pharetra ante, facilisis dapibus lorem dui at nulla. Aliquam orci dolor,
    lacinia sit amet tristique sed, sodales eget libero. Fusce scelerisque nisi elit.</p>
  </div>
</div>
</template>

<script>
import store from '../store/store'

export default {
  name: 'Navigation',
  data () {
    return {
      msg: 'Anonymous'
    }
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
    openMenu (event) {
      let check = event.currentTarget.classList.toggle('is-active')
      if (check) {
        document.getElementById('sidenav').style.width = '100%'
      } else {
        document.getElementById('sidenav').style.width = '0'
      }
    },
    openMenuItem (event) {
      // console.log(`Opening menu item`)
      // console.log(event.target.nextElementSibling.style.maxHeight)
      if (event.target.nextElementSibling.style.maxHeight === '20em') {
        event.target.nextElementSibling.style.maxHeight = '0em'
      } else {
        event.target.nextElementSibling.style.maxHeight = '20em'
      }
      // console.log(event.target.nextElementSibling.style.maxHeight)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/index.scss";

$color-green: hsl(167, 100%, 30%);

$color-gray: hsl(0, 0%, 85%);
$color-lightGray: hsl(0, 0%, 95%);
$color-darkGray: hsl(0, 0%, 50%);
$color-white: hsl(0, 0%, 100%);

#navigation {
  background-color: $color-primary-0;
  box-shadow: 0px 10px 45px -11px rgba(0,0,0,0.75);
  color: white;
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
    // top: 2.9em;
    left: 0;
    // opacity: 1;
    // background-color: $color-pale-primary;
    overflow-x: hidden; /* Disable horizontal scroll */
    // box-shadow: inset 0px 10px 45px -11px rgba(0,0,0,0.75);
    // padding-top: 60px;
    transition: 0.5s;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.blur {
  position: absolute;
  background-color: $color-primary-transparent;
  width: 100%;
  height: inherit;
  z-index: -1;
}

.menuItem {
  margin-top: 1em;
}

.menuItem:hover {
  color: $color-orange;
  cursor: pointer;
}
.menuItemText {
  font-size: .8em;
  // padding: 1em 2em 1em 2em;
  text-align: left;
  // display: block;
  transition: 1s;
  overflow: hidden;
  max-height: 0em;
}
</style>
