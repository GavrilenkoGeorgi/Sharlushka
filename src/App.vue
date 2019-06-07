<template>
  <v-app>
    <!-- Navigation bar -->
    <transition
      name="custom-classes-transition"
      mode="out-in"
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow"
    >
      <navBar />
    </transition>
    <v-content>
      <!-- Router view -->
      <v-container
        ma-0
        pa-0
        fill-height
        fluid
      >
        <transition
          name="custom-classes-transition"
          mode="out-in"
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOutDown slow"
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
  }
}
</script>

<style src='vuetify/dist/vuetify.min.css'>
</style>
<style src='../node_modules/chartist/dist/chartist.min.css'>
</style>
<style lang="sass">
@import "/assets/sass/animations.sass"
@import "/assets/sass/index.sass"

#app
  background: #ffffff
  font-family: $text-font

// nav bar links padding
.v-list__tile
  padding: 0em

@media only screen and (max-width: 959px)
  .v-toolbar__content, .v-toolbar__extension
    padding: 0 0px

</style>
