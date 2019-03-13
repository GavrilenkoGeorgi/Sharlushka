<template>
  <!-- Toolbar -->
  <nav v-if="!['MainPage'].includes($route.name)">
    <v-toolbar
      app
      height="40"
      color="purple darken-2"
      class="text-xs-center"
    >
      <span
        class="score pl-3"
      >
        {{ getTotalScore }}
      </span>
      <v-spacer />
      <v-toolbar-title
        class="game-name"
      >
        <router-link :to="{ path: '/' }">
          {{ gameName }}
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <NetworkCheck />
      <v-toolbar-items>
        <v-spacer />
        <v-btn
          icon
          aria-label="settings"
          @click="manipulateDrawer"
        >
          <settingsIcon
            class="settings-icon"
          />
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- Navigation drawer -->
    <v-navigation-drawer
      v-model="navDrawer"
      app
      right
      class="navigation-drawer"
    >
      <v-list>
        <v-list-tile
          class="pb-3"
          @click="manipulateDrawer"
        >
          <v-list-tile-action>
            <v-layout justify-center>
              <backIcon class="highlighted" />
            </v-layout>
          </v-list-tile-action>
          <v-list-tile-title class="drawer-menu-item">
            Back
          </v-list-tile-title>
        </v-list-tile>
        <!-- Greeting -->
        <v-list-tile>
          <v-list-tile-action>
            <v-flex class="text-xs-center">
              <NetworkCheck />
            </v-flex>
          </v-list-tile-action>
          <v-list-tile-content class="drawer-menu-item pa-0 user-name">
            Hi,&nbsp;{{ currentUserName }}.
          </v-list-tile-content>
        </v-list-tile>
        <!-- Nav drawer links -->
        <v-list-tile
          v-for="link in navDrawerLinks"
          :key="link.path"
          :to="{ path: link.path }"
          active-class="active-link"
          :class="link.path === $route.path ? 'active-link' : ''"
          @click="navDrawer = false"
        >
          <v-list-tile-action>
            <v-layout justify-center>
              <component
                :is="link.icon"
                active-class="active-link"
                :class="link.path === $route.path ? 'active-link' : ''"
                class="nav-drawer-link-icon"
              />
            </v-layout>
          </v-list-tile-action>
          <v-list-tile-title class="drawer-menu-item subheading">
            {{ link.text }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

import NetworkCheck from '../components/NetworkCheck.vue'
import settingsIcon from '../assets/icons/baseline-menu-24px.svg'
import userStatsIcon from '../assets/icons/baseline-equalizer-24px.svg'
import leaderBoardIcon from '../assets/icons/baseline-import_export-24px.svg'
import logInOutIcon from '../assets/icons/baseline-exit_to_app-24px.svg'
import backIcon from '../assets/icons/baseline-keyboard_backspace-24px.svg'
import playIcon from '../assets/icons/baseline-play_arrow-24px.svg'
import helpIcon from '../assets/icons/baseline-help_outline-24px.svg'

export default {
  name: `Navbar`,
  components: {
    NetworkCheck,
    settingsIcon,
    helpIcon,
    userStatsIcon,
    leaderBoardIcon,
    logInOutIcon,
    backIcon,
    playIcon
  },
  data: () => ({
    navDrawer: false,
    navDrawerLinks: [
      {
        path: `/game`,
        icon: `playIcon`,
        text: `Play`
      },
      {
        path: `/userstats`,
        icon: `userStatsIcon`,
        text: `User stats`
      },
      {
        path: `/leaderboard`,
        icon: `leaderBoardIcon`,
        text: `Leaderboard`
      },
      {
        path: `/help`,
        icon: `helpIcon`,
        text: `Help`
      },
      {
        path: `/login`,
        icon: `logInOutIcon`,
        text: `Log in/out`
      }
    ]
  }),
  computed: {
    ...mapGetters([
      `getDefaultUserName`,
      `getTotalScore`
    ]),
    gameName() {
      return `Sharlushka`
    },
    currentUserName() {
      if (localStorage.hasOwnProperty(`userName`)) {
        return localStorage.getItem(`userName`)
      } else {
        return this.getDefaultUserName
      }
    }
  },
  methods: {
    manipulateDrawer() {
      this.navDrawer = !this.navDrawer
    }
  }
}
</script>

<style lang="scss" scoped>

@import "../assets/fonts/fonts.scss";
@import "../assets/scss/vars/colors.scss";

.game-name {
  a {
    color: $color-pale-primary-lightest;
    font-size: 1.1em;
    font-family: $text-font;
    text-transform: capitalize;
    text-decoration: none;
  }
}

.settings-icon {
  fill: $color-white;
}

.navigation-drawer {
  font-family: $text-font;
  border-left: 2px solid $color-primary-0;
}

.drawer-menu-item {
  font-family: $text-font;
  font-weight: 700;
  font-size: 1.4em;
  color: $color-primary-3;
}
.user-name {
  color: $color-primary-0;
  font-size: 2em;
}

.score {
  color: $color-white;
  font-size: 2em;
  font-family: $text-font;
  text-align: center;
}

.nav-drawer-link-icon {
  fill: $color-primary-0;
}

.active-link {
  color: $color-chosen;
  svg {
    fill: $color-chosen;
  }
}

</style>