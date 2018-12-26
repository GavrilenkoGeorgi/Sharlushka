<template>
    <v-flex class="text-xs-right">
      <v-btn @click="$router.go(-1)"
        small icon
        fab dark>
        <v-icon size="3em"
          color="#79008f">close</v-icon>
      </v-btn>
    </v-flex>
</template>

<script>
export default {
  name: 'CloseBtn'
}
</script>
