<template>
  <div id="endGame">
    <!--div class="endGameMenu" v-if="$store.state.endGameMenu === true"-->
    <div class="endGameMenu">
      <p>Game Over, {{ userName }}!<br/> Your score is {{ $store.state.schoolScoreTotal + $store.state.gameTotal }}</p>
      <p v-if="highestScore">Highest score is {{ highestScore }}</p>
      <div class="button-box">
        <button class="button" v-on:click="restartGame">New game</button>
        <!--button class="menuButton" v-on:click="saveOrRegister">Save Result</button-->
      </div>
    </div>
  </div>
</template>

<script>
// import router from 'vue-router'

export default {
  data () {
    return {
      greeting: 'Hi,',
      userName: '',
      formValueName: '',
      highestScore: '',
      saveButtonText: 'SAVE'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      console.log(`Home view mounted`)
      this.userName = localStorage.getItem('userName')
      this.highestScore = localStorage.getItem('highestScore')
      if (this.userName !== 'Anonymous') {
        console.log(`User name set`)
      } else {
        console.log(`User Anonymous`)
      }
    })
  },
  methods: {
    saveUserName () {
      localStorage.setItem('userName', this.formValueName)
      this.userName = this.formValueName
      this.$router.push({path: '/game'})
    },
    restartGame () {
      console.log(`Restarting game`)
      this.$store.commit('resetState')
      this.$router.push({path: '/game'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/index.scss";
@import "../assets/scss/vars/colors.scss";

.endGameMenu {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100vh;
  background-color: $color-primary-transparent;
  color: $color-primary-0;
  p {
    color: white;
    font-size: 1.4em;
    text-align: center;
    line-height: 1.6em;
  }
  .button-box {
    display: inherit;
    flex-direction: row;
  }
  .button {
  background: $color-light;
  border: none;
  border-radius: .25em;
  font-size: 1.2em;
  color: $color-primary-0;
  padding: .3em;
  width: 6em;
  text-align: center;
    a {
      color: white;
      text-decoration: none;
    }
  }
}
</style>
