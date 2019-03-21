<template>
  <v-layout>
    <v-flex
      xs12
      class="text-xs-center"
    >
      <h1>{{ title }}</h1>
    </v-flex>
    <v-flex>
      <v-switch
        value
        input-value="true"
      />
      <h4>Setting</h4>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: `Settings`,
  data: () => ({
    title: `Settings`,
    settingsList: [
      {
        settingName: `Debug`,
        settingIcon: `mdi-eye`
      },
      {
        settingName: `Debug2`,
        settingIcon: `mdi-eye`
      }
    ]
  })
}
</script>

