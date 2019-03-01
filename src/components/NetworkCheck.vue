<template>
  <v-dialog
    v-if="!networkStatus"
    v-model="offlineMessage"
    width="20em"
  >
    <v-btn
      slot="activator"
      small
      icon
      fab
      dark
    >
      <v-icon
        medium
        class="blink"
        color="orange"
      >
        cloud_off
      </v-icon>
    </v-btn>
    <v-card class="offline-message">
      <v-card-text class="offline-message-text">
        Check your connection to save results.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="orange"
          flat
          outline
          ripple
          @click="offlineMessage = false"
        >
          <v-icon
            large
            color="orange"
          >
            done
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: `NetworkCheck`,
  data: () => ({
    offlineMessage: false
  }),
  computed: {
    networkStatus() {
      return this.isOnline ? `ok` : null
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/fonts/fonts.scss';
@import '../assets/scss/vars/colors.scss';

.offline-message {
  border: 1px solid $color-primary-0;
}

.offline-message-text {
  font-size: 1.5em;
  font-family: $text-font;
  color: $color-primary-3;
}
</style>
