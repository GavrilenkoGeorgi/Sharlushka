<template>
  <v-container fill-height id="gameHelp">
<!-- Icon definition -->
    <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="settingsClose" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <path class="close-icon-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z"/>
      </symbol>
    </svg>
<!-- Icon defs end -->
    <v-layout column>
      <v-flex xs2>
        <v-layout column align-end>
          <svg class="ui-icon" @click="$router.go(-1)">
            <use xlink:href="#settingsClose"></use>
          </svg>
        </v-layout>
      </v-flex>
      <v-layout column align-center>
        <v-flex>
          <h1>Rules</h1>
          <br />
          <p class="rules-text">
            {{ overall }}
          </p>
          <p class="rules-text">
            {{ compinationDescr }}
          </p>
          <div class="combination-descr">
            <p>Один кубик с единицей</p>
            <svg class="help-dice-icon">
              <use xlink:href="#diceOnes"></use>
            </svg>
            <p>
              -2
            </p>
          </div>
          <div class="combination-descr">
            <p>Два кубика </p>
            <div class="icon-box">
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
            </div>
            <p>
              -1
            </p>
          </div>
          <div class="combination-descr">
            <p>Три</p>
            <div class="icon-box">
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
            </div>
            <p>
              0
            </p>
          </div>
          <div class="combination-descr">
            <p>Четыре</p>
            <div class="icon-box">
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
            </div>
            <p>
              +1
            </p>
          </div>
          <div class="combination-descr">
            <p>Пять</p>
            <div class="icon-box">
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
              <svg class="help-dice-icon">
                <use xlink:href="#diceOnes"></use>
              </svg>
            </div>
            <p>
              +2
            </p>
          </div>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import store from '../store/store'

export default {
  name: 'Help',
  data () {
    return {
      overall: `Три броска, для того чтобы собрать комбинацию. Первый раз бросаются все пять кубиков.
        Дополнительно два раза можно перебрасывать часть кубиков, оставляя нужные,
        или перебросить всё заново. Три броска, для того чтобы собрать комбинацию.
        Первый раз бросаются все пять кубиков. Дополнительно два раза можно
        перебрасывать часть кубиков, оставляя нужные, или перебросить всё заново.
        Можно остановиться на первом или втором результате и сразу его записать.`,
      compinationDescr: `Школа на примере единиц: требуется выбросить как можно больше едниниц.
        Очки считаются так:`,
      temp: `один кубик с единицей -2 очка;
        два кубика -1;
        три 0;
        четыре +1;
        пять +2.
        один кубик с шестёркой -12 очков;
        пять +12;
        Пара - суммируются очки 6+6=12;
        Две пары - (5+5)+(6+6)= 24;
        Три одинаковых - (6+6+6) = 18;
        Фулл (5+5+5)+(3+3) = 21;
        Каре (4+4+4+4);
        Шанс - если не получилось выбрость хоть какую-то комбинацию,
        записывается сумма значений всех выбраных кубиков.`,
      userName: '',
      highestScore: '',
      hiscoreGreeting: 'Your highest score is',
      exclamation: '!', // some over-engeneering
      helpMenuHidden: true
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
    openHelpMenu () {
      console.log(`Help menu!`)
      if (this.helpMenuHidden) {
        this.helpMenuHidden = false
      } else {
        this.helpMenuHidden = true
      }
    },
    restartGame (state) {
      console.log(`Restarting`)
      store.commit('resetState')
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";

.close-icon-path {
  fill: $color-primary-1;
}
.rules-text {
  line-height: 1.4em;
}
.help-dice-icon {
  display: block;
  width: 100%;
  height: 1.4em;
  width: 1.4em;
  color: $color-primary-0;
  // stroke-width: 1em;
  margin: 0em .2em 0em .2em;
  stroke: $color-primary-0;
}
.combination-descr {
  display: flex;
  padding: .2em;
  // justify-content: space-around;
  // align-items: center;
  // border: 1px solid red;
  p {
    font-size: 1.1em;
    margin: 0;
    padding: 0em .3em 0em .3em;
  }
}
.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
