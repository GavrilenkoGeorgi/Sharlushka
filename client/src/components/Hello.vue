<template>
  <div class="container">
    <div class="row text-center">
        <H2>Hello</h2>
        <h3>Clicked: {{ $store.state.count }} times, counter is {{ evenOrOdd }}</h3>
        <button class="btn btn-success" v-on:click="increment">+</button>
        <button class="btn btn-danger" v-on:click="decrement">-</button>

        <button class="btn" v-on:click="incrementIfOdd">Increment if odd</button>
        <button class="btn" v-on:click="incrementAsync">Increment Async</button>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Hello',
  computed: mapGetters([
    'evenOrOdd'
  ]),
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
