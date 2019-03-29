<template>
  <v-layout
    row
    wrap
    justify-center
    pb-2
  >
    <v-flex
      xs12
      sm9
      md7
      pt-2
    >
      <h1 class="text-xs-center rules-heading">
        {{ rulesHeading }}
      </h1>
      <p class="rules-text">
        {{ overall }}
      </p>
      <p class="rules-text-eng">
        {{ overallEng }}
      </p>
    </v-flex>
    <!-- Combination descriptions -->
    <v-flex
      xs12
      sm9
      md7
    >
      <v-layout
        wrap
        justify-center
      >
        <v-flex
          xs12
        >
          <v-flex
            v-for="(combination, index) in combinationsDescrMk3"
            :key="index"
            class="combination-descr"
            px-3
          >
            <v-layout
              align-center
              py-1
            >
              <v-flex class="text-xs-left">
                {{ combination.title }}
              </v-flex>
              <!-- Layout for icons in each combination -->
              <v-layout justify-end>
                <v-flex
                  v-for="(icon, value) of combination.quantity"
                  :key="value"
                  pa-1
                  d-flex
                  shrink
                >
                  <!-- The tricky part with dice ids,
                    there are six ids and five dices -->
                  <component
                    :is="getDiceIds[icon - 1]"
                    class="help-section-dice-icon"
                  />
                </v-flex>
              </v-layout>
              <v-flex
                xs1
                class="score-value text-xs-right"
              >
                {{ combination.scoreValue }}
              </v-flex>
            </v-layout>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import diceOnes from '../assets/icons/diceOnes.svg'
import diceTwos from '../assets/icons/diceTwos.svg'
import diceThrees from '../assets/icons/diceThrees.svg'
import diceFours from '../assets/icons/diceFours.svg'
import diceFives from '../assets/icons/diceFives.svg'
import diceSixes from '../assets/icons/diceSixes.svg'

export default {
  name: `Help`,
  components: {
    diceOnes,
    diceTwos,
    diceThrees,
    diceFours,
    diceFives,
    diceSixes
  },
  data() {
    return {
      overall: `Три броска, для того чтобы собрать комбинацию. Первый раз бросаются все пять кубиков.
        Дополнительно два раза можно перебрасывать часть кубиков, оставляя нужные,
        или перебросить всё заново. Можно остановиться на первом или втором результате и
        сразу его записать.`,
      schoolDescr: `Школа на примере единиц: требуется выбросить как можно больше едниниц.
        Очки считаются так:`,
      overallEng: `Each turn consists of a maximum of three rolls — the first roll to be made with
        all five dice. If the player elects to roll a second and third time, he may pick up and use any
        number of dice, providing a score is taken on the last roll. It is the skillful use of these
        two optional rolls of the dice that can turn an unlucky first or second roll into a high
        scoring turn.`,
      rulesHeading: `Help`,
      //
      // Combinations display
      //
      // by changing the numbers in `quantity` array
      // we can choose how many dice with which id to display
      // e.g. quantity: [6, 6, 6] is three dice with ids -->
      // `diceSixes, diceSixes, diceSixes`
      // quantity: [2, 6, 1, 3, 4] is five dices -->
      // `diceTwos, diceSixes, diceOnes, diceThrees, diceFours`
      // ids are in the store
      combinationsDescrMk3: [
        {title: `Single dice with ace`, quantity: [1], scoreValue: `-2`},
        {title: `Two aces`, quantity: [1, 1], scoreValue: `-1`},
        {title: `Three`, quantity: [1, 1, 1], scoreValue: `0`},
        {title: `Four`, quantity: [1, 1, 1, 1], scoreValue: `+1`},
        {title: `Five`, quantity: [1, 1, 1, 1, 1], scoreValue: `+2`},
        {title: `One six`, quantity: [6], scoreValue: `-12`},
        {title: `Three sixes`, quantity: [6, 6, 6], scoreValue: `0`},
        {title: `Five sixes in school`, quantity: [6, 6, 6, 6, 6], scoreValue: `+12`},
        {title: `Pair`, quantity: [4, 4], scoreValue: `8`},
        {title: `Two pairs`, quantity: [5, 5, 3, 3], scoreValue: `16`},
        {title: `Three of a kind`, quantity: [2, 2, 2], scoreValue: `6`},
        {title: `Full`, quantity: [3, 3, 3, 5, 5], scoreValue: `19`},
        {title: `Quads`, quantity: [6, 6, 6, 6], scoreValue: `24`},
        {title: `Poker`, quantity: [4, 4, 4, 4, 4], scoreValue: `100`},
        {title: `Small`, quantity: [1, 2, 3, 4, 5], scoreValue: `15`},
        {title: `Large`, quantity: [2, 3, 4, 5, 6], scoreValue: `20`},
        {title: `Chance`, quantity: [2, 3, 1, 6, 4], scoreValue: `16`},
        {title: `Another chance`, quantity: [4, 1, 6, 1, 5], scoreValue: `17`},
        {title: `Yet another chance`, quantity: [1, 6, 2, 1, 3], scoreValue: `13`}
      ]
    }
  },
  computed: {
    ...mapGetters([
      `getDiceIds`
    ])
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`Help page mounted.`)
    })
  }
}
</script>
<style lang="scss" scoped>

@import "../assets/scss/index.scss";

.rules-text {
  padding: 0em 1em 0em 1em;
  line-height: 1.4em;
  font-size: 1.25em;
  text-indent: 1em;
  font-family: $cyrillic-font;
}
.rules-text-eng {
  padding: 0em 1em 0em 1em;
  text-indent: 1em;
  font-size: 1.4em;
}

.score-value {
  font-weight: 500;
  color: $color-chosen;
}

.combination-descr {
  font-size: 1.1em;
  font-weight: 500;
  transition: background-color 500ms ease-in-out;
}
.combination-descr:hover {
  background-color: $color-pale-primary;
  .dice-icon {
    color: $color-chosen;
  }
}

.help-section-dice-icon {
  height: 1.4em;
}

.dice-icon {
  color: $color-primary-0;
  transition: color 500ms ease-in-out;
}

@media screen and (orientation: landscape) {
  .combination-descr {
    font-size: 1.7em;
  }
}
</style>
