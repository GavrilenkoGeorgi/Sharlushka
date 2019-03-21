<template>
  <!-- Error message -->
  <v-layout
    v-if="error"
    class="error-message"
    align-center
  >
    <v-flex
      xs10
      d-flex
      class="text-xs-left"
    >
      {{ error.message }}
    </v-flex>
    <v-flex
      xs2
      d-flex
      justify-center
    >
      <v-btn
        flat
        icon
        @click="closeErrorMessage"
      >
        <closeIcon
          class="error-close-icon"
        />
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import closeIcon from '../assets/icons/baseline-close-24px.svg'

export default {
  name: `ErrorMessage`,
  components: {
    closeIcon
  },
  computed: {
    ...mapGetters([
      `error`
    ])
  },
  methods: {
    ...mapActions([
      `setErrorMessage`
    ]),
    closeErrorMessage() {
      // just close it
      this.$store.dispatch(`setErrorMessage`, false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars/colors.scss';

.error-message {
  position: fixed;
  top: 3.5em;
  margin: 0em 1em 0em 1em;
  right: 0;
  left: 0;
  border: .066em solid $color-error-message-red;
  color: $color-error-message-red-text;
  padding-left: .5em;
  border-radius: .2em;
  font-size: 1em;
}
.error-close-icon {
  fill: $color-error-message-red;
}
</style>

