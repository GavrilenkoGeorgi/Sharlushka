
<template>

<div><h1>Message is: {{ greeting }}</h1></div>

</template>

<script>

module.exports = {
  data: function () {
    return {
      greeting: 'Hello'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
