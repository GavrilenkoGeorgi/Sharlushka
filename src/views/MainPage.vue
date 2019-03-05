<template>
  <v-container
    id="startPageContent"
    pb-2
    fill-height
  >
    <v-layout
      align-space-around
      column
    >
      <v-flex
        d-flex
        align-end
        class="text-xs-center"
      >
        <h1 class="game-name">
          {{ gameName }}
        </h1>
      </v-flex>
      <v-layout
        justify-center
        align-center
      >
        <!--v-flex-->
        <SharlushkaLogo
          class="logo"
        />
        <!--/v-flex-->
      </v-layout>
      <v-flex
        d-flex
        align-center
        class="text-xs-center"
      >
        <h2 class="user-name-main-page">
          {{ greeting }} {{ userName }}{{ exclamation }}
        </h2>
      </v-flex>
      <v-layout
        row
        align-center
        justify-space-around
      >
        <v-flex
          d-flex
          xs5
          lg2
          class="text-xs-center"
        >
          <v-btn
            to="/game"
            ripple
            outline
            color="purple darken-2"
            aria-label="Start game"
            :class="{ orange:isGameInProgress }"
          >
            <doneIcon
              class="main-page-button"
              :class="{ highlighted:isGameInProgress }"
            />
            <span :class="{ highlighted:isGameInProgress }">
              play
            </span>
          </v-btn>
        </v-flex>
        <v-flex
          d-flex
          xs5
          lg2
          class="text-xs-center"
        >
          <v-btn
            to="/login"
            outline
            ripple
            color="purple darken-1"
            aria-label="Register or change name"
          >
            <regIcon
              class="main-page-button"
            />
            login
          </v-btn>
        </v-flex>
      </v-layout>
      <span class="copyrights text-xs-center">
        Icons made by
        <a
          href="https://www.flaticon.com/authors/smashicons"
          title="Smashicons"
        >
          Smashicons
        </a>
        from
        <a
          href="https://www.flaticon.com/"
          title="Flaticon"
        >
          www.flaticon.com
        </a>
        is licensed by
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
          rel="noopener"
        >
          CC 3.0 BY
        </a>
      </span>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import SharlushkaLogo from '../assets/images/sharlushkaLogo.svg'
import doneIcon from '../assets/icons/baseline-done-24px.svg'
import regIcon from '../assets/icons/baseline-how_to_reg-24px.svg'

export default {
  name: `Main`,
  components: {
    SharlushkaLogo,
    doneIcon,
    regIcon
  },
  data() {
    return {
      gameName: `Sharlushka`,
      userName: `Anonymous`,
      greeting: `Hi,`,
      exclamation: `.`
    }
  },
  computed: {
    ...mapGetters([
      `getCurrentGameState`
    ]),
    isGameInProgress () {
      return this.getCurrentGameState.gameInProgress ? true : false
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`Main page mounted.`)
      if (localStorage.hasOwnProperty(`userName`)) {
        this.userName = localStorage.getItem(`userName`)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/fonts/fonts.scss";
@import "../assets/scss/vars/colors.scss";

.game-name, .user-name, .user-name-main-page, .copyrights {
  font-family: $text-font;
}
.game-name {
  font-size: 3em;
  color: $color-primary-0;
}
.logo {
  height: 12em;
}
.user-name {
  font-size: 2em;
}
.user-name-main-page {
  font-size: 2.3em;
  color: $color-primary-3;
}
.copyrights {
  font-size: .9em;
  color: rgb(83, 83, 83); //?
}

@media screen and (orientation: landscape) {
  .game-name {
    font-size: 2.8em;
  }
  .logo {
    height: 10em;
  }
}

@media screen and (max-resolution: 96dpi) and (min-width: 500px) { // desktop
  .game-name {
    font-size: 5em;
  }
  .user-name {
    font-size: 4em;
  }
}

.main-page-button {
  fill: $color-primary-0;
}

.highlighted {
  fill: $color-orange;
  color: $color-orange;
}
</style>
