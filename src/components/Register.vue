<template>
  <v-container fill-height id="registerPage">
    <v-layout justify-space-between column fill-height>
        <v-flex class="text-xs-right">
          <v-btn class="icon-close" outline small fab
            round color="white"
            @click="$router.go(-1)">
            <v-img :src="require('@/assets/icons/baseline-clear-24px.svg')"
              contain height="4em"></v-img>
          </v-btn>
        </v-flex>
<!-- Greeting -->
        <v-flex class="text-xs-center">
          <h1 class="greeting">{{ greeting }}{{ punctMarkOne }} {{ userName }}{{ punctMarkTwo }}</h1>
        </v-flex>
<!-- Register form -->
        <v-flex>
          <v-layout justify-center>
            <v-flex xs8 sm4>
              <v-form v-model="valid">
                <v-text-field v-model="name"
                  :rules="nameRules"
                  :counter="10" label="Name"
                  required>
                </v-text-field>
                <!--v-text-field v-model="email" :rules="emailRules"
                  label="E-mail" required>
                </v-text-field-->
              </v-form>
            </v-flex>
          </v-layout>
        </v-flex>
<!-- Button -->
        <v-flex>
          <v-layout justify-center>
            <v-flex xs4>
              <v-btn ripple block large color="purple"
                to="/register" class="my-4 disabled"
                @click="saveUserName"
                :disabled="!this.valid">
                <v-img :src="require('@/assets/icons/baseline-done_all-24px.svg')"
                  contain height="2em"></v-img>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
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
        console.log('User name set')
        this.$router.push({path: '/game'})
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/index.scss";

.greeting {
  font-size: 1.8em;
}
.close-icon-path {
  fill: $color-primary-1;
}
</style>
