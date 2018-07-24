<template>
<div class="navigation"> {{ msg }} <img class="settings-icon" src="../assets/icons/settings-icon.svg" alt="Settings">
</div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      msg: 'Name of the game'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .5em;
  background-color: hsl(167, 100%, 30%);
  color: white;
  width: 100%;
  height: 2.5em;
}
.settings-icon {
  height: 1.2em;
}
</style>
