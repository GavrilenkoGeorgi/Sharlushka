<template>
  <v-container fluid id="login">
<!-- Close button -->
    <closeBtn></closeBtn>
    <v-layout column>
      <v-flex d-flex>
        <v-alert
          :value="errorMessage"
          dismissible
          outline
          type="error">
          {{ errorMessage }}
        </v-alert>
      </v-flex>
      <v-flex d-flex class="page-title text-xs-center py-4">
        <h1>{{ pageTitle }}</h1>
      </v-flex>
      <v-layout justify-center class="login-form py-4">
        <v-flex xs8 d-flex align-center py-4>
        <v-form ref="form" v-model="valid"
          lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          :type="'email'"
          autocomplete="off"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :type="'password'"
          label="Password"
          autocomplete="off"
          required
        ></v-text-field>
      </v-form>
        </v-flex>
      </v-layout>
      <v-layout justify-center class="text-xs-center">
        <v-flex xs5 d-flex align-end>
          <v-btn :disabled="!valid"
            :type="'submit'"
            @click.prevent="login"
            large
            class="button white--text"
            color="orange">
            login
          </v-btn>
        </v-flex>
        <v-flex xs5 d-flex align-end>
          <v-btn @click="clear"
          dark
          large
          class="button"
          color="purple darken-1">
          clear</v-btn>
        </v-flex>
      </v-layout>
      <v-layout wrap class="text-xs-center">
        <v-flex d-flex align-center class="info-text">
        <span>or</span>
        </v-flex>
      <v-flex xs12>
          <v-btn to='/register'
            dark
            large
            class="button"
            color="purple darken-1">
            {{ newUserBtnText }}
          </v-btn>
          <v-btn @click="signOut"
          v-if="this.logInOrSignOut"
          dark
          large
          class="button"
          color="purple darken-1">
          sign out</v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import db from '../components/firebaseInit'
import firebase from 'firebase/app'
import 'firebase/auth'
import store from '../store/store'
import closeBtn from '../components/CloseBtn'

export default {
  name: 'login',
  data: () => ({
    users: [],
    errorMessage: undefined,
    newUserBtnText: 'Create new user',
    pageTitle: 'Log In',
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
    closeBtn
  },
  computed: {
    ...mapGetters([
      'getError',
      'getUserAuthState',
      'getUserName'
    ]),
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : true
    },
    logInOrSignOut () {
      let answer
      if (this.getUserAuthState) {
        console.log('User exists')
        answer = true
      } else {
        // console.log('No user yet')
        answer = false
      }
      return answer
    }
  },
  methods: {
    /*
    getUsersList () {
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
      })
    },
    */
    getUserNameFromDB (uid) {
      // console.log(`Getting user name for uid ${uid}`)
      db.collection('users').where('uid', '==', uid)
        .get()
        .then(function (querySnapshot) {
          let userName
          querySnapshot.forEach(function (doc) {
            if (doc.data().uid === uid) {
              userName = doc.data().name
            }
          })
          store.commit('setUserName', userName)
          console.log(`Setting user name: ${userName}`)
          return userName
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    },
    login: function () {
      this.errorMessage = undefined
      if (this.email && this.password) { // need some proper validation
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(
            response => {
              console.log(`You are logged in as`)
              console.log(response.user.email)
              console.log(response.user.uid)
              let tempName = this.getUserNameFromDB(response.user.uid)
              const newUser = {
                isAuthenticated: true,
                uid: response.user.uid,
                name: tempName
              }
              this.$store.commit('setUser', newUser)
              this.$router.push('/')
            },
            err => {
              console.log(err.message)
              this.errorMessage = err.message
            })
        return true
      }
    },
    signOut: () => {
      firebase.auth().signOut().then(function () {
        console.log('Signed Out')
        localStorage.removeItem('highestScore')
        localStorage.removeItem('lastScoresArray')
        localStorage.removeItem('schoolScores')
        store.commit('setAuthState', false)
      }, function (error) {
        console.error('Sign Out Error', error)
      })
    },
    /*
    addNewUser () {
      db.collection('users').add({
        name: this.name
        // type: this.email
      })
        .then(docRef => console.log(`User added`))
        .catch(error => console.log(error))
    }, */
    clear () {
      this.$refs.form.reset()
    }
  },
  mounted () {
    console.log(`Login page mounted`)
    /*
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    */
    /*
    let check = true
    if (check) {
      console.log('User authenticated')
      const initializeAuth = new Promise(resolve => {
      // this adds a hook for the initial auth-change event
        firebase.auth().onAuthStateChanged(user => {
          const currentUser = firebase.auth().currentUser
          console.log(`Current user is ${currentUser.uid}`)
        })
      })
      initializeAuth.then(function (user) {
        console.log(`Current user is ${user}`)
      }).catch((reason) => {
        console.log(`Something went wrong ${reason}`)
      })
    } else {
      console.log('No, user is not authentificated')
    } */
    /*
    const initializeAuth = new Promise(resolve => {
    // this adds a hook for the initial auth-change event
      firebase.auth().onAuthStateChanged(user => {
        const currentUser = firebase.auth().currentUser
        console.log(`Current user is ${currentUser.uid}`)
      })
    })
    initializeAuth.then(function () {
      const currentUser = firebase.auth().currentUser
      console.log(`Current user is ${currentUser.email}`)
    }) */
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

#login {
  height: 100%;
}

.login-form, .page-title, .info-text, .button {
  font-family: $text-font;
  // font-weight: 700;
}
.info-text {
  color: $color-primary-0;
  font-size: 1.4em;
  font-weight: 700;
}
</style>
