<template>
<div class="navigation"><div class="userName">{{ msg }}</div><!--img class="settings-icon" src="../assets/icons/settings-icon.svg" alt="Settings"-->
</div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      msg: 'Anonymous'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color-green: hsl(167, 100%, 30%);

.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $color-green;
  color: white;
  width: 100%;
  height: 2.4em;
  text-align: center;
  // padding: 0em .4em 0em .4em;
}
.userName {
  width: 100%;
  font-size: 1.3em;
}
.settings-icon {
  height: 1.2em;
}
</style>
