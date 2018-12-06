<template>
  <v-layout column id="login" pa-2>
    <v-layout justify-end row>
        <v-flex xs2 class="text-xs-right">
          <v-btn outline small fab round color="white" @click="$router.go(-1)">
            <v-img :src="require('@/assets/icons/baseline-clear-24px.svg')" contain height="4em"></v-img>
          </v-btn>
        </v-flex>
      </v-layout>
    <v-flex class="text-xs-center">
      <h1>{{ pageTitle }}</h1>
    </v-flex>
    <!--v-flex d-flex align-center class="text-xs-center">
      <h2>Form is {{ valid }}</h2>
    </v-flex-->
    <!--v-flex d-flex class="text-xs-center"
        v-for="user in users"
        :key="user.id">
        <span>{{ user.name }}</span>
      </v-flex-->
      <!--v-flex d-flex class="text-xs-center">
        <span>{{ name }}</span>
      </v-flex-->
    <v-layout justify-center>
    <v-form ref="form" v-model="valid" lazy-validation>
    <!--v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="10"
      label="Name"
      required
    ></v-text-field-->
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      autocomplete="username"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :type="'password'"
      :rules="passwordRules"
      label="Password"
      autocomplete="current-password"
      required
    ></v-text-field>
    <!--v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select>
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox-->

    <v-btn :disabled="!valid"
      @click.prevent="login">
      login
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </v-form>
    </v-layout>
  </v-layout>
</template>

<script>
// import db from './firebaseInit'
import firebaseConfig from './firebaseConfig'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'login',
  data: () => ({
    users: [],
    pageTitle: 'Login',
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length <= 12) || 'Password must be less than 12 characters'
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: false
  }),
  methods: {
    login: function () {
      if (this.valid) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(
            response => {
              console.log(`You are logged in as ${response}`)
              console.dir(response)
              console.log(response.user.email)
              console.log(response.user.uid)
            },
            err => {
              console.log(err.message)
            })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  created () {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    console.log(`Login page created`)
    /*
    db.collection('users').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.id)
        const data = {
          'id': doc.id,
          'name': doc.data().name,
          'type': doc.data().type
        }
        console.log(data)
        this.users.push(data)
      })
    }) */
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";

* {
  font-family: $text-font;
}

.dashBtn {
  font-weight: 700;
}

</style>
