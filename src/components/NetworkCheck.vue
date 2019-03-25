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
      aria-label="network check"
    >
      <cloudOffIcon class="highlighted blink" />
    </v-btn>
    <v-card class="dialog">
      <v-card-text class="default-text-color">
        Check your connection before saving results.
      </v-card-text>
      <v-card-actions>
        <v-layout
          justify-center
        >
          <v-btn
            color="purple darken-2"
            flat
            outline
            ripple
            class="button"
            @click="offlineMessage = false"
          >
            <doneIcon />
          </v-btn>
        </v-layout>
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
