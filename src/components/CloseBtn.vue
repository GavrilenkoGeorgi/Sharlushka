<template>
  <v-btn @click="$router.go(-1)"
    small icon
    absolute right
    fab dark>
    <v-icon size="3.2em"
      color="#79008f">close</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'CloseBtn'
}
</script>
