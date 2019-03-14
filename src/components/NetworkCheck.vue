<template>
  <v-dialog
    v-if="!networkStatus"
    v-model="offlineMessage"
    width="20em"
  >
    <v-btn
      slot="activator"
      icon
      aria-label="network check"
    >
      <cloudOffIcon class="cloud-icon blink" />
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
          <doneIcon class="highlighted" />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import cloudOffIcon from '../assets/icons/baseline-cloud_off-24px.svg'
import doneIcon from '../assets/icons/baseline-done-24px.svg'

export default {
  name: `NetworkCheck`,
  components: {
    cloudOffIcon,
    doneIcon
  },
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

.cloud-icon {
  fill: $color-orange;
}

.offline-message {
  border: 1px solid $color-primary-0;
}

.offline-message-text {
  font-size: 1.2em;
  font-family: $text-font;
  color: $color-primary-3;
}
</style>
