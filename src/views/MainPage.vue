<template>
  <v-container
    id="startPageContent"
    pb-2
    fill-height
  >
    <v-layout
      align-space-around
      column
      class="text-xs-center"
      pb-1
    >
      <v-flex
        d-flex
        align-end
      >
        <h1 class="game-name">
          {{ gameName }}
        </h1>
      </v-flex>
      <v-layout
        justify-center
        align-center
      >
        <v-flex
          xs8
          sm3
        >
          <SharlushkaLogo />
        </v-flex>
      </v-layout>
      <v-flex
        d-flex
        align-center
      >
        <h2 class="user-name-main-page">
          {{ greeting }} {{ userName }}{{ exclamation }}
        </h2>
      </v-flex>
      <v-layout
        row
        align-center
        justify-center
      >
        <v-flex
          d-flex
          xs6
          sm4
          lg3
        >
          <v-btn
            to="/game"
            ripple
            outline
            color="purple darken-2"
            aria-label="Start game"
            class="button"
            :class="{ playing:isGameInProgress }"
          >
            <doneIcon
              class="button-icon-margin"
            />
            <span>
              play
            </span>
          </v-btn>
        </v-flex>
        <v-flex
          d-flex
          xs6
          sm4
          lg3
        >
          <v-btn
            to="/login"
            outline
            ripple
            color="purple darken-1"
            aria-label="Register or change name"
            class="button"
          >
            <regIcon class="button-icon-margin" />
            login
          </v-btn>
        </v-flex>
      </v-layout>
      <span class="copyrights">
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
      `isGameInProgress`
    ])
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
@import "../assets/scss/vars/colors.scss";

.game-name {
  font-size: 3em;
  color: $color-primary-0;
}

.user-name-main-page {
  font-size: 2.3em;
  color: $color-primary-3;
}

.playing {
  color: $color-chosen !important;
}

.copyrights {
  font-size: .9em;
  color: $color-copyrights;
}

// desktop
@media screen and (max-resolution: 96dpi) and (min-width: 500px) {
  .game-name {
    font-size: 5em;
  }
  .user-name-main-page {
    font-size: 4.3em;
  }
}
</style>
