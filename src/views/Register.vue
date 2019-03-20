<template>
  <v-container
    id="register"
    fluid
    pt-4
  >
    <v-layout column>
      <v-alert
        :value="errorMessage"
        dismissible
        outline
        type="error"
      >
        {{ errorMessage }}
      </v-alert>
      <v-flex class="register-title text-xs-center py-4">
        <h1>{{ pageTitle }}</h1>
      </v-flex>
      <v-layout
        justify-center
        class="register-form py-4"
      >
        <v-flex xs9>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="userNameFormValue"
              :rules="nameRules"
              :counter="10"
              label="Name"
              autocomplete="username"
              color="purple accent-4"
            />
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              autocomplete="email"
              color="purple accent-4"
              required
            />
            <v-text-field
              v-model="password"
              :type="'password'"
              :rules="passwordRules"
              label="Password"
              autocomplete="current-password"
              color="purple accent-4"
              required
            />
            <v-text-field
              v-model="confirmPassword"
              :rules="[comparePasswords]"
              :type="'password'"
              label="Confirm password"
              autocomplete="off"
              color="purple accent-4"
              required
            />
          </v-form>
        </v-flex>
      </v-layout>
      <v-layout
        justify-center
        class="buttons text-xs-center py-4"
      >
        <v-flex
          xs5
          d-flex
        >
          <v-btn
            :disabled="!valid"
            :loading="registering"
            class="white--text"
            outline
            color="orange"
            @click.prevent="signUp"
          >
            register
          </v-btn>
        </v-flex>
        <v-flex
          xs5
          d-flex
        >
          <v-btn
            :disabled="valid"
            class="button white--text"
            outline
            color="purple darken-1"
            @click="clear"
          >
            clear
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import db from '../firebase/firebaseInit'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: `Register`,
  data: () => ({
    pageTitle: `Register`,
    registering: false,
    errorMessage: ``,
    valid: true,
    usersCollRef: `users`,
    userNameFormValue: ``,
    nameRules: [
      (v) => (!v || v.length <= 10) || `Name must be less than 10 characters`
    ],
    email: ``,
    emailRules: [
      (v) => !!v || `E-mail is required`,
      (v) => /.+@.+/.test(v) || `E-mail must be valid`
    ],
    password: ``,
    passwordRules: [
      (v) => !!v || `Password is required`,
      (v) => (v && v.length <= 12) || `Password must be less than 12 characters`
    ],
    confirmPassword: ``
  }),
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword ? `Passwords do not match` : true
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`Register page mounted.`)
    })
  },
  methods: {
    signUp() {
      this.errorMessage = `` // clear error message?
      if (this.email && this.password) {
        this.registering = true
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(response => {
            // add new user data to db
            if (this.userNameFormValue === ``) { // it is optional, privacy meh
              this.userNameFormValue = `Anonymous` // get default name??
            }
            localStorage.setItem(`userUid`, response.user.uid)
            localStorage.setItem(`userName`, this.userNameFormValue)
            const newUserData = {
              name: localStorage.getItem(`userName`),
              uid: response.user.uid,
              email: response.user.email,
              hiScore: localStorage.getItem(`highestScore`),
              resultsArray: localStorage.getItem(`lastScoresArray`),
              schoolResultsArray: localStorage.getItem(`schoolScores`)
            }
            this.addNewUser(newUserData)
            console.log(`User added ${response.user.email}`)
            this.verifyUserEmail()
            // some message with button to the game view needed
            this.$router.push(`/game`)
          })
          .catch(err => {
            console.log(err.message)
            this.errorMessage = err.message
            this.registering = false
          })
      }
    },
    addNewUser(userData) {
      console.log(`Adding user`)
      // Add a new document with a generated id.
      const newUserRef = db.collection(this.usersCollRef).doc()
      newUserRef.set(userData)
      console.log(`Document successfully written!`)
    }, // end of user adding
    verifyUserEmail() {
      const user = firebase.auth().currentUser
      user.sendEmailVerification().then(() => {
        console.log(`Email sent`)
      }).catch(function(error) {
        console.log(`Error! ${error}`)
      })
    },
    clear() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../assets/scss/index.scss';

#register {
  height: 100%;
}

.register-title, .register-form, .buttons {
  font-family: $text-font;
}

</style>
