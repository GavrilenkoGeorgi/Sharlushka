<template>
    <div id="diceControls" v-bind:class="{ hidden:$store.state.diceBoxHidden }">
    <div class="result-box" v-on:click="selectDice">
    </div>
    <div class="dice-box">
      <!--div v-for="dice in this.getDiceArray"
        :key="dice.id"
        v-bind:id="dice.id"
        v-on:click="selectDice">
        <svg class="dice-icon" fill="none">
          <use v-bind="{'xlink:href':'#' + dice.currentIcon}"
            class="default animated fadeInUp" x="0" y="0"
            v-bind:class="{ chosen:dice.chosen, fadeInUp:$store.diceRolled }"></use>
        </svg>
      </div-->
      <svg class="dice-icon" v-for="dice in this.getDiceArray"
        :key="dice.id"
        v-bind:id="dice.id"
        v-on:click="selectDice"
        fill="none">
          <use v-bind="{'xlink:href':'#' + dice.currentIcon}"
            class="default animated fadeInUp" x="0" y="0"
            v-bind:class="{ chosen:dice.chosen, fadeInUp:$store.diceRolled }"></use>
        </svg>
      </div>
    </div>
<!-- fill="none" stroke-width=".7em" in case of flyiq4415-->
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import store from '../store/store'

export default {
  name: 'DiceBox',
  data () {
    return {
      state: true
    }
  },
  computed: {
    ...mapGetters([
      'getDiceArray'
    ])
  },
  methods: {
    handleDiceClick (element) {
      while (element) {
        if (element.classList.contains('dice-icon')) {
          return element
        } else {
          element = element.parentElement
          if (element) {
            this.handleDiceClick(element)
          } else {
            return false
          }
        }
      }
    },
    selectDice (event) {
      this.clicked = true
      let elementToAdd = event.currentTarget
      let diceBox = document.querySelector('.dice-box')
      let resultBox = document.querySelector('.result-box')
      if (elementToAdd.parentElement === diceBox && !store.state.turnCompleted) {
        diceBox.removeChild(elementToAdd) // dice-container
        resultBox.appendChild(elementToAdd)
        store.commit('setDiceChosenState', elementToAdd.id)
        store.commit('computeScore')
      } else if (elementToAdd.parentElement === resultBox) {
        resultBox.removeChild(elementToAdd)
        diceBox.appendChild(elementToAdd) // dice-container
        store.commit('setDiceChosenState', elementToAdd.id)
        store.commit('computeScore')
      }
    },
    deSelectDice (event) {
      let elementToRemove = this.handleDiceClick(event.target)
      let diceBox = document.querySelector('.dice-box')
      let resultBox = document.querySelector('.result-box')
      if (elementToRemove && !store.state.turnCompleted) {
        // dice-container
        resultBox.removeChild(elementToRemove)
        diceBox.appendChild(elementToRemove)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
// @import "../../node_modules/animate.css/animate.css";

#diceControls {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  // flex-basis: 1;
  // width: 70%;
}
.dice-box, .result-box {
  // display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  // flex-grow: 1;
  // flex-basis: 0;
  align-content: center;
  align-items: center;
  // justify-items: center;
  // border: 1px solid green;
  // height: 3em;
  padding-top: .25em; // wtf
  // border: 1px solid red;
}

.result-box {
  // border: 1px solid blue;
}

svg {
  width: 2em;
  // padding-bottom: -100%;
  height: 2em;
  // overflow: hidden;
  // flex-grow: 1;
}
.dice-icon {
  // object-fit: cover;
  // flex-grow: 1;
  // border: 1px solid green;
  // width: 2em;
  // height: 2.5em;
  // padding-bottom: 100%;
  // height: 1px;
  // overflow: visible
  // padding-bottom: -100%;
}
.hidden {
  visibility: hidden;
  // display: none;
  // width: 0em;
  // opacity: 0;
}

/*
@media screen and (-webkit-min-device-pixel-ratio: 1.4) and (min-width: 250px) { // fly iq4415 iphone5Se
  // defaults above
}
*/

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 320px) {
   svg {
    width: 2.6em;
    height: 2.6em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (min-width: 360px) { // nokia5
  svg {
    width: 3em;
    height: 3em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) and (min-width: 414px) { // iphone678
  svg {
    width: 3.5em;
    height: 3.5em;
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) {
  svg {
    width: 6em;
    height: 6em;
  }
}
@media screen and (max-resolution: 96dpi) and (min-width: 768px) { // desktop
  svg {
    width: 5em;
    height: 5em;
  }
}
</style>
