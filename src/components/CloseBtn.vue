<template>
  <v-flex class="text-xs-right">
    <v-btn
      small
      icon
      fab
      dark
      @click="$router.go(-1)"
    >
      <closeIcon class="close-btn" />
    </v-btn>
  </v-flex>
</template>

<script>
import closeIcon from '../assets/icons/baseline-close-24px.svg'

export default {
  name: `CloseBtn`,
  components: {
    closeIcon
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";

.close-btn {
  fill: $color-primary-0;
}
</style>
