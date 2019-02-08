<template>
  <v-layout align-center row id="gameNavigation">
    <!--v-toolbar dark color="purple darken-3 navbar">
    <v-flex xs2 v-if="!this.networkStatus">
      <v-dialog
        v-model="offlineMessage"
        width="20em">
        <v-btn small icon
          slot="activator"
          fab
          dark
        ><v-icon
        size="2em"
        class="blink"
        color="orange">cloud_off</v-icon>
        </v-btn>
        <v-card>
          <v-card-text class="text-xs-center offline-message-text">
            Check your connection to save results.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              small icon
              flat
              @click="offlineMessage = false"
            >
              <v-icon size="2em" color="orange">done</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex-->
      <!--v-btn fab flat icon>
        <v-icon>more_vert</v-icon>
      </v-btn-->
    <!--/v-toolbar-->
  </v-layout>
</template>

<script>
import store from '../store/store' // ??

export default {
  name: 'Navigation',
  data: () => ({
    title: 'Sharlushka',
    offlineMessage: false,
    navDrawer: true,
    admins: [
      ['Management', 'people_outline'],
      ['Settings', 'settings']
    ],
    cruds: [
      ['Create', 'add'],
      ['Read', 'insert_drive_file'],
      ['Update', 'update'],
      ['Delete', 'delete']
    ]
  }),
  computed: {
    networkStatus () {
      return this.isOnline ? 'ok' : null
    },
    computedGameScore: function () {
      return store.state.schoolScoreTotal + store.state.gameTotal
    },
    rollsLeft: function () {
      return store.state.rollCount
    }
  }
}
</script>

<style lang="scss" scoped>
/*
// @import "../assets/scss/vars/fonts.scss";
// @import "../assets/scss/vars/colors.scss";
@import "../assets/scss/index.scss";

#gameNavigation {
  // border: 1px solid pink;
  // position: fixed;
  // top: 0;
  background-color: $color-primary-0;
  height: 1.7em;
  width: 100%;
  font-size: 1.2em;
  // padding-left: .6em;
  box-shadow: 0 .1em .05em -.05em rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}
a {
  margin: 0em;
}

i {
  display: flex;
}

.score, .game-name {
  // font-family: $text-font;
}
.score {
  // border: 1px solid red;
  color: white;
  // font-family: $text-font;
  font-size: 1.1em;
  padding-left: .6em;
}
.game-name {
  a {
    color: white;
    // font-family: $text-font;
    text-decoration: none;
  }
}
.settings-icon {
  a {
    margin: 0em;
  }
}

.blink {
  animation: blinker 5s ease-out infinite;
}

.offline-message-text {
  // font-family: $text-font;
  font-weight: 700;
  // color: $color-primary-0;
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

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 320px) { // iphone5
  #gameNavigation {
    font-size: 1.5em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (min-width: 360px) { // nokia5
  #gameNavigation {
    font-size: 1.8em;
    // border: 1px solid lime;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) { // ipad
  #gameNavigation {
    font-size: 2.4em;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1024px) { // ipadPro
  #gameNavigation {
    font-size: 3.2em;
    padding-right: .3em;
  }
}
/*
@media screen and (-webkit-min-device-pixel-ratio: 3) and (min-width: 414px) { // iphone678plus
  #gameNavigation {
    // font-size: 2.8em;
  }
}
*/
/*
// landscape
@media screen and (orientation: landscape) {
  #gameNavigation {
    font-size: 1.5em;
    padding-left: .5em;
    // height: 1.5em;
    // border: 1px solid red;
  }
}

@media screen and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 3) {
  #gameNavigation {
    font-size: 1.8em;
    // height: 1.3em;
    // border: 1px solid red;
  }
}
@media screen and (max-resolution: 96dpi) and (max-width: 480px) { // fly iq4415 aka desktop
  #gameNavigation {
    font-size: 2em;
    // border: 1px solid red;
  }
}

@media screen and (max-resolution: 96dpi) and (min-width: 481px) { // fly iq4415
  #gameNavigation {
    font-size: 3em;
    // border: 1px solid red;
  }
}

/*
@media screen and (max-resolution: 96dpi) and (min-width: 768px) { // desktop
  #gameNavigation {
    font-size: 2.3em;
  }
}
*/
/*
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 768px) {
}
@media screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1024px) { // iPadPro
}
@media screen and (max-resolution: 96dpi) and (min-width: 768px) { // desktop
}
*/

</style>
