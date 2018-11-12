<template>
  <v-container id="gameHelp">
<!-- Icon definition remove this -->
    <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="settingsClose" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <path class="close-icon-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z"/>
      </symbol>
    </svg>
<!-- Icon defs end -->
    <v-layout column>
      <v-flex>
        <v-layout column align-end>
          <svg class="ui-icon" @click="$router.go(-1)">
            <use xlink:href="#settingsClose"></use>
          </svg>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout fill-height justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-layout justify-space-around column>
        <!--v-flex-->
            <h1 class="text-xs-right mb-2 rules-heading">{{ rulesHeading }}</h1>
        <!--/v-flex-->
        <!--v-flex-->
          <!--v-layout column-->
            <p class="rules-text">
              {{ overall }}
            </p>
            <p class="rules-text">
              {{ schoolDescr }}
            </p>
          </v-layout>
  <!-- Combination descriptions -->
            <v-flex class="combination-descr"
                    v-for="(combination, index) in combinationsDescr"
                    :key="index">
              <v-layout>
                <p>
                  {{ combination.text }}
                </p>
                <v-layout justify-end>
                  <svg class="help-dice-icon"
                      v-for="index in combination.quantity" :key="index">
                  <use v-bind="{'xlink:href':'#' + combination.iconId}"></use>
                </svg>
                  <p class="score-value">
                    {{ combination.scoreValue }}
                  </p>
                </v-layout>
              </v-layout>
            </v-flex>
          <!--/v-layout-->
        </v-flex>
      <!--/v-flex-->
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
        или перебросить всё заново. Можно остановиться на первом или втором результате и
        сразу его записать.`,
      schoolDescr: `Школа на примере единиц: требуется выбросить как можно больше едниниц.
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
      helpMenuHidden: true,
      rulesHeading: 'Правила',
      combinationsDescr: [
        { text: 'Один кубик с единицей', iconId: 'diceOnes', quantity: 1, scoreValue: '-2' },
        { text: 'Два кубика', iconId: 'diceOnes', quantity: 2, scoreValue: '-1' },
        { text: 'Три', iconId: 'diceOnes', quantity: 3, scoreValue: '0' },
        { text: 'Четыре', iconId: 'diceOnes', quantity: 4, scoreValue: '+1' },
        { text: 'Пять', iconId: 'diceOnes', quantity: 5, scoreValue: '+2' },
        { text: 'Одна шестёрка', iconId: 'diceSixes', quantity: 1, scoreValue: '-12' },
        { text: 'Три шестёрки', iconId: 'diceSixes', quantity: 3, scoreValue: '0' },
        { text: 'Пять', iconId: 'diceSixes', quantity: 5, scoreValue: '+12' },
        { text: 'Пара', iconId: 'diceFives', quantity: 2, scoreValue: '10' },
        { text: 'Три одинаковых', iconId: 'diceFours', quantity: 3, scoreValue: '12' },
        { text: 'Каре', iconId: 'diceTwos', quantity: 4, scoreValue: '8' }
      ]
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
<style lang="scss" scoped> // no need for this
@import "../assets/scss/vars/colors.scss";
@import "../assets/scss/vars/fonts.scss";

.close-icon-path {
  fill: $color-primary-1;
}

.rules-heading {
  font-family: $cyrillic-font;
}

.rules-text {
  line-height: 1.4em;
  font-size: 1.1em;
  text-indent: 1em;
  font-family: $cyrillic-font;
}

.help-dice-icon {
  display: block;
  width: 100%;
  height: 1.25em;
  width: 1.25em;
  color: $color-primary-0;
  // stroke-width: 1em;
  margin: 0em .15em 0em .15em;
  stroke: $color-primary-0;
}

.score-value {
  // border: 1px solid green;
  width: 2em;
  text-align: right;
  font-weight: 500;
  color: $color-chosen;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.border {
  border: 1px solid pink;
}

.combination-descr {
  font-size: 1.18em;
  font-family: $cyrillic-font;
  padding: .2em;
  p {
    margin: 0;
  }
  transition: background-color 500ms;
}

.combination-descr:hover {
  background-color: $color-pale-primary;
}
</style>
