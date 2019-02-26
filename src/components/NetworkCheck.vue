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
        size="2em"
        class="blink"
        color="orange"
      >
        cloud_off
      </v-icon>
    </v-btn>
    <v-card>
      <v-card-text class="text-xs-center offline-message-text">
        Check your connection to save results.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          small
          icon
          flat
          @click="offlineMessage = false"
        >
          <v-icon
            size="2em"
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
  name: 'NetworkCheck',
  data: () => ({
    offlineMessage: false
  }),
  computed: {
    networkStatus () {
      return this.isOnline ? 'ok' : null
    }
  }
}
</script>
