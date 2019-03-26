<template>
  <v-app>
    <!-- Navigation bar -->
    <navBar />
    <v-content>
      <!-- Router view -->
      <v-container
        ma-0
        pa-0
        fill-height
      >
        <transition
          name="custom-classes-transition"
          mode="out-in"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOutDown fast"
        >
          <router-view />
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import navBar from './components/Navbar.vue'

export default {
  name: `App`,
  components: {
    navBar
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`App started.`)
    })
  }
}
</script>

<style src='vuetify/dist/vuetify.min.css'>
</style>
<style src='../node_modules/chartist/dist/chartist.min.css'>
</style>
<style lang="scss">
@import './assets/scss/index.scss';
@import './assets/scss/animations.scss';

#app {
  background: #ffffff;
}

@media only screen and (max-width: 959px) {
  .v-toolbar__content, .v-toolbar__extension {
    padding: 0 0px;
  }
}
</style>
