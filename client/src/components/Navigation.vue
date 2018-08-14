<template>
<div class="navigation"><div class="userName">{{ msg }}</div>
<button class="hamburger hamburger--collapse" type="button" v-on:click="openMenu">
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
    </button>
</div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      msg: 'Anonymous'
    }
  },
  methods: {
    openMenu (event) {
      event.currentTarget.classList.toggle('is-active')
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
  height: 2.8em;
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
button {
  margin: 0em .6em 0em .2em;
  padding: .2em 0em 0em 0em;
}
</style>
