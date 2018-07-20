<template>
  <div class="diceComponent">
 <div class="dice">
     {{ numbah }}
     </div>
     <br/>
     <button
      @click="rollDice">Roll it</button>
  </div>
</template>

<script>
let numbah = 0
module.exports = {
  name: 'dice',
  data: function () {
    return {
      numbah
    }
  },
  methods: {
    rollDice () {
      // numbah = Math.floor((Math.random() * 6) + 1)
      // console.log(Math.floor((Math.random() * 6) + 1))
      this.numbah = Math.floor((Math.random() * 6) + 1)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dice {
  line-height: 2em;
  background-color: coral;
  font-size: 1.5em;
  width:2em;
  height:2em;
}
.diceComponent {
  display: flex;
  justify-content: center;
}
.button {
  display: block;
}
</style>
