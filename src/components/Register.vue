<template>
  <v-layout column id="register" pa-2 pt-3>
    <v-spacer></v-spacer>
    <closeButton></closeButton>
    <v-alert
      :value="errorMessage"
      dismissible
      outline
      type="error">
      {{ errorMessage }}
    </v-alert>
    <v-flex class="register-title text-xs-center">
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
    <v-layout justify-center class="register-form">
      <v-flex xs8>
      <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        :counter="10"
        label="Name"
        autocomplete="username">
      </v-text-field>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        autocomplete="email"
        required>
      </v-text-field>
      <v-text-field
        v-model="password"
        :type="'password'"
        :rules="passwordRules"
        label="Password"
        autocomplete="current-password"
        required>
      </v-text-field>
      <v-text-field
        v-model="confirmPassword"
        :rules="[comparePasswords]"
        :type="'password'"
        label="Confirm password"
        autocomplete="off"
        required>
      </v-text-field>
    <!--v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select-->
    <!--v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="New user?"
      required
    ></v-checkbox-->
  </v-form>
      </v-flex>
  </v-layout>
    <v-layout justify-center class="buttons text-xs-center">
      <v-flex xs5 d-flex>
        <v-btn :disabled="!valid"
          @click.prevent="signUp"
          class="white--text"
          color="orange">
          register
        </v-btn>
      </v-flex>
      <v-flex xs5 d-flex>
        <v-btn @click="clear"
          class="button white--text"
          color="purple darken-1">
          clear
        </v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
// import db from './firebaseInit'
import firebaseConfig from './firebaseConfig'
import firebase from 'firebase/app'
import 'firebase/auth'
import closeButton from '../components/CloseBtn'
// import Navigation from '../components/Navigation'

export default {
  name: 'register',
  data: () => ({
    users: [],
    errorMessage: '',
    pageTitle: 'Register',
    valid: true,
    name: '',
    nameRules: [
      v => (!v || v.length <= 10) || 'Name must be less than 10 characters'
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
    confirmPassword: '',
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: false
  }),
  components: {
    closeButton
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : true
    }
  },
  methods: {
    signUp () {
      this.errorMessage = ''
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(response => {
          const newUser = {
            isAuthenticated: true,
            uid: response.user.uid
          }
          this.$store.commit('setUser', newUser)
          console.log(`User added ${response.user.uid}`)
        })
        .catch(err => {
          console.log(err.message)
          this.errorMessage = err.message
        })
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  created () {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    console.log(`Register page created`)
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
@import '../assets/scss/index.scss';

.register-title, .register-form, .buttons {
  font-family: $text-font;
}

</style>
