<template>
  <v-container fill-height id="registerPage">
    <!-- icon definition -->
    <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="registerClose" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <path class="close-icon-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z"/>
      </symbol>
    </svg>
    <v-layout column>
      <v-flex xs2>
        <v-layout column align-end>
          <svg class="ui-icon" @click="$router.go(-1)">
            <use xlink:href="#registerClose"></use>
          </svg>
        </v-layout>
      </v-flex>
      <v-layout column align-center>
        <v-flex d-flex align-end>
          <h1 class="greeting">{{ greeting }}{{ punctMarkOne }} {{ userName }}{{ punctMarkTwo }}</h1>
        </v-flex>
        <v-flex d-flex align-end>
          <v-form v-model="valid">
            <v-text-field v-model="name" :rules="nameRules"
              :counter="10" label="Name" required>
            </v-text-field>
            <!--v-text-field v-model="email" :rules="emailRules"
              label="E-mail" required>
            </v-text-field-->
          </v-form>
        </v-flex>
        <v-flex>
          <v-btn ripple block large color="purple" to="/register" class="my-4 disabled" @click="saveUserName" :disabled="!this.valid">
            <v-img :src="require('@/assets/icons/baseline-done_all-24px.svg')" contain height="2em"></v-img>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    greeting: 'Hi',
    punctMarkOne: ',',
    userName: '',
    punctMarkTwo: '.'
  }),
  mounted: function () {
    this.$nextTick(function () {
      this.userName = localStorage.getItem('userName')
      console.log(`Username is ${this.userName}`)
      if (!this.userName) {
        this.punctMarkOne = '?'
        this.punctMarkTwo = ''
      }
    })
  },
  methods: {
    saveUserName () {
      if (this.valid) {
        localStorage.setItem('userName', this.name)
        this.userName = this.name
        this.$router.push({path: '/game'})
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/vars/colors.scss";

.greeting {
  font-size: 1.8em;
}
.close-icon-path {
  fill: $color-primary-1;
}
</style>
