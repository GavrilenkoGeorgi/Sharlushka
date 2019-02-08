<template>
  <v-app>
<!-- Toolbar -->
    <v-toolbar app dense color="purple darken-2" class="text-xs-center"
      v-if="['Game'].includes($route.name)">
      <span class="score pl-3">
        {{ getTotalScore }}
      </span>
      <v-spacer></v-spacer>
      <v-toolbar-title
        class="game-name ml-0">
        <router-link :to="{ path: '/' }">
        {{ gameName }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <NetworkCheck></NetworkCheck>
      <v-toolbar-items>
        <v-spacer></v-spacer>
        <v-btn fab dark small flat @click="manipulateDrawer"><v-icon large>more_vert</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
<!-- Navigation drawer -->
    <v-navigation-drawer temporary width="295" v-model="navDrawer"
      fixed right app class="navigation-drawer">
      <v-list>
        <v-list-tile class="pb-3" @click="manipulateDrawer">
          <v-list-tile-action>
            <v-flex class="text-xs-center">
              <v-icon large color="orange">keyboard_backspace</v-icon>
            </v-flex>
          </v-list-tile-action>
          <v-list-tile-title class="drawer-menu-item">Back</v-list-tile-title>
        </v-list-tile>
<!-- Greeting -->
        <v-list-tile>
          <v-list-tile-action>
            <v-flex class="text-xs-center">
              <NetworkCheck></NetworkCheck>
            </v-flex>
          </v-list-tile-action>
          <v-list-tile-content class="drawer-menu-item pa-0 user-name">Hi,&nbsp;{{ currentUserName }}.</v-list-tile-content>
        </v-list-tile>
<!-- Nav drawer links -->
        <v-list-tile v-for="link in navDrawerLinks"
          :key="link.path"
          :to="{ path: link.path }">
          <v-list-tile-action>
            <v-flex class="text-xs-center">
              <v-icon color="purple darken-2">
                {{ link.icon }}
              </v-icon>
            </v-flex>
          </v-list-tile-action>
          <v-list-tile-title class="drawer-menu-item subheading">
            {{ link.text }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height ma-0 pa-0 id="app">
<!-- Router view -->
        <transition name="custom-classes-transition"
                    mode="out-in"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOutLeft">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NetworkCheck from '@/components/NetworkCheck.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data: () => ({
    // offlineMessage: false,
    navDrawer: false,
    userName: 'Anonymous',
    navDrawerLinks: [
      {
        path: '/help',
        icon: 'trending_up',
        text: 'School results & help'
      },
      {
        path: '/settings',
        icon: 'equalizer',
        text: 'User stats'
      },
      {
        path: '/login',
        icon: 'exit_to_app',
        text: 'Log in/out'
      }
    ]
  }),
  components: {
    NetworkCheck
  },
  computed: {
    ...mapGetters([
      'getTotalScore',
      'getUserName'
    ]),
    gameName () {
      return 'Sharlushka'
    },
    currentUserName () {
      if (this.getUserName === '') {
        return 'Anonymous'
      } else {
        return this.getUserName
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(`App started.`)
    })
  },
  methods: {
    manipulateDrawer () {
      this.navDrawer = !this.navDrawer
    },
    updateOnlineStatus () {
      if (navigator.onLine) {
        console.log('online')
        // document.documentElement.classList.remove('is-offline');
        // document.querySelector('.connection-status').innerHTML = 'Online';
      } else {
        console.log('offline')
        // document.documentElement.classList.add('is-offline');
        // document.querySelector('.connection-status').innerHTML = 'Offline';
      }
    }
  }
}
</script>

<style src='vuetify/dist/vuetify.min.css'>
</style>
<style lang="scss">
@import '../node_modules/chartist/dist/chartist.min.css';
@import '@/assets/scss/index.scss';

#app {
  background: #ffffff;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
.fadeIn {
  animation-name: fadeIn;
}

@keyframes fadeOutLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
.fadeOutLeft {
  animation-name: fadeOutLeft;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

.zoomIn {
  animation-name: zoomIn;
}

.animated {
  animation-duration: .7s;
  animation-fill-mode: both;
}
.animated.delay-s {
  animation-delay: .5s;
}

@media (prefers-reduced-motion) {
  .animated {
    animation: unset !important;
    transition: none !important;
  }
}

.ct-series-a .ct-point {
  stroke: #AA00FF;
  stroke-width: .2em;
}
.ct-series-a .ct-line {
  stroke: #E1BEE7;
  stroke-width: .06em;
}

.ct-series-a .ct-bar {
  stroke: #AA00FF;
  stroke-width: .25em;
}
.ct-nodata {
  visibility: hidden;
  height: 0em;
}

@media only screen and (max-width: 959px) {
  .v-toolbar__content, .v-toolbar__extension {
    padding: 0 0px;
  }
}

.navigation-drawer {
  font-family: $text-font;
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
  // line-height: 1;
}
.score {
  color: white;
  font-size: 2em;
  font-family: $text-font;
  text-align: center;
}

.game-name {
  // font-weight: 700;
  a {
    color: white;
    font-size: 1.5em;
    font-family: $text-font;
    text-transform: capitalize;
    text-decoration: none;
  }
}

.blink {
  color: $color-primary-1;
  font-weight: 700;
  animation: blinker 3s ease-out infinite;
}
.blink:hover {
  color: $color-chosen;
  animation: none;
}
@keyframes blinker {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>
