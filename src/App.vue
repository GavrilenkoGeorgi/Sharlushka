<template>
  <v-app>
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
export default {
  name: 'App',
  mounted () {
    this.$nextTick(function () {
      console.log('App started')
    })
  }
}
</script>

<style src='vuetify/dist/vuetify.min.css'>
</style>
<style lang="scss">
@import '../node_modules/chartist/dist/chartist.min.css';

#app {
  height: 100vh;
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

@keyframes shake {
  from,
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-.1em, 0px, 0px);
    opacity: .6
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(.1em, 0px, 0px);
    opacity: .8;
  }
}

.shake {
  animation-name: shake;
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
  stroke-width: .25em;
}
.ct-series-a .ct-line {
  stroke: #E1BEE7;
  stroke-width: .075em;
}

.ct-series-a .ct-bar {
  stroke: #AA00FF;
  stroke-width: .2em;
}
.ct-nodata {
  visibility: hidden;
  height: 1em;
}

</style>
