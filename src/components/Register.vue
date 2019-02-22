<template>
  <v-container fluid id="register">
    <v-layout column>
      <closeButton></closeButton>
      <v-alert
        :value="errorMessage"
        dismissible
        outline
        type="error">
        {{ errorMessage }}
      </v-alert>
      <v-flex class="register-title text-xs-center py-4">
        <h1>{{ pageTitle }}</h1>
      </v-flex>
      <v-layout justify-center class="register-form pb-4">
        <v-flex xs9>
        <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="10"
          label="Name"
          autocomplete="username"
          color="purple accent-4">
        </v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          autocomplete="email"
          color="purple accent-4"
          required>
        </v-text-field>
        <v-text-field
          v-model="password"
          :type="'password'"
          :rules="passwordRules"
          label="Password"
          autocomplete="current-password"
          color="purple accent-4"
          required>
        </v-text-field>
        <v-text-field
          v-model="confirmPassword"
          :rules="[comparePasswords]"
          :type="'password'"
          label="Confirm password"
          autocomplete="off"
          color="purple accent-4"
          required>
        </v-text-field>
    </v-form>
        </v-flex>
    </v-layout>
      <v-layout justify-center class="buttons text-xs-center">
        <v-flex xs5 d-flex>
          <v-btn :disabled="!valid"
            @click.prevent="signUp"
            :loading="registering"
            class="white--text"
            large
            color="orange">
            register
          </v-btn>
        </v-flex>
        <v-flex xs5 d-flex>
          <v-btn @click="clear"
            :disabled="valid"
            class="button white--text"
            large
            color="purple darken-1">
            clear
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import db from './firebaseInit'
import firebaseConfig from './firebaseConfig'
import firebase from 'firebase/app'
import 'firebase/auth'
import closeButton from './CloseBtn.vue'

export default {
  name: 'register',
  data: () => ({
    registering: false,
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
      this.errorMessage = '' // clear error message?
      if (this.email && this.password) {
        this.registering = true
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(response => {
            // set current user in store
            const newUser = {
              isAuthenticated: true,
              uid: response.user.uid
            }
            this.$store.commit('setUser', newUser)
            // add new user data to db
            if (this.name === '') { // it is optional, privacy meh
              this.name = 'Anonymous' // get default name??
            }

            let hiScoreToSet = localStorage.getItem('highestScore')
            let scoresArrayToSet
            let schoolResultsToSet
            if (hiScoreToSet) {
              scoresArrayToSet = localStorage.getItem('lastScoresArray')
              schoolResultsToSet = localStorage.getItem('schoolScores') // !do something about naming here
            } else {
              hiScoreToSet = ''
              scoresArrayToSet = ''
              schoolResultsToSet = ''
            }

            const newUserData = {
              name: this.name, // or maybe Anonymous
              uid: response.user.uid,
              email: response.user.email,
              // resultsArray: [123, 432, 554], // or not
              // hiScore: 478 // if he played more than one game
              hiScore: hiScoreToSet,
              resultsArray: scoresArrayToSet,
              schoolResultsArray: schoolResultsToSet
            }
            this.addNewUser(newUserData)
            // localStorage.setItem('userName', this.name)
            this.$store.state.user.name = this.name
            // this.addNewUser(response.user.email, response.user.uid, this.name)
            console.log(`User added ${response.user.email}`)
            this.verifyUserEmail()
            this.$router.push('/')
            /*
            firebase
              .auth()
              .signInWithEmailAndPassword(this.email, this.password)
              .then(
                response => {
                  console.log(`Login in after registration`)
                  console.log(response.user.email)
                  this.$router.push('/')
                },
                err => {
                  console.dir(err)
                  this.errorMessage = err.message
                })
              */
          })
          .catch(err => {
            console.log(err.message)
            this.errorMessage = err.message
          })
      }
    },
    addNewUser (userData) {
      console.log(`Adding user`)
      // Add a new document with a generated id.
      const newUserRef = db.collection('users').doc()
      /*
      let newUserData = {
        name: 'Anonymous',
        userEmail: 'hank@aol.com',
        userUid: 'fgdfgDFGDFGvsdf3',
        // dateExample: new Date('December 10, 1815'),
        userResults: [234, 432, 543]
      }
      */
      // later...
      // console.dir(this.$store.state.user.uid)
      // userData.ownerId = newUserRef.id
      newUserRef.set(userData)
      console.log('Document successfully written!')
    }, // end of user adding
    verifyUserEmail () {
      let user = firebase.auth().currentUser
      user.sendEmailVerification().then(function () {
        console.log('Email sent')
      }).catch(function (error) {
        console.log(`Error! ${error}`)
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

#register {
  height: 100%;
}

.register-title, .register-form, .buttons {
  font-family: $text-font;
}

</style>
