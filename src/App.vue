<template>
  <v-app>
    <v-content>
      <!-- Router view -->
      <transition
        name="custom-classes-transition"
        mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOutLeft"
      >
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    userName: 'Anonymous'
  }),
  mounted () {
    /*
    this.$nextTick(() => {
      console.log(`App started.`)
    })
    */
  }
}
</script>

<style src='vuetify/dist/vuetify.min.css'>
</style>
<style lang="scss">
@import '../node_modules/chartist/dist/chartist.min.css';
@import './assets/scss/index.scss';

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
