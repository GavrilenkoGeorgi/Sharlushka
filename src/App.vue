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

<!--style src='vuetify/dist/vuetify.min.css'>
</style-->
<style lang="scss">
// @import "./assets/fonts/fonts.scss";

#app {
  height: 100vh;
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

.animated {
  animation-duration: 900ms;
  animation-fill-mode: both;
}
.animated.delay-s { // change this
  animation-delay: 500ms;
}

@media (prefers-reduced-motion) {
  .animated {
    animation: unset !important;
    transition: none !important;
  }
}

</style>
