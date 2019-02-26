<template>
  <v-container
    id="login"
    fluid
    class="text-xs-center"
  >
    <!-- Close button -->
    <closeBtn />
    <!-- Error message -->
    <v-layout column>
      <v-flex d-flex>
        <v-alert
          :value="errorMessage"
          dismissible
          outline
          relative
          type="error"
        >
          {{ errorMessage }}
        </v-alert>
      </v-flex>
      <!-- Page title -->
      <v-flex
        d-flex
        class="page-title py-4"
      >
        <h1>{{ pageTitle }}</h1>
      </v-flex>
      <!-- Input form -->
      <v-layout
        justify-center
        class="login-form py-4"
      >
        <v-flex
          xs9
          d-flex
          align-center
          py-4
        >
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              :type="'email'"
              autocomplete="off"
              required
              color="purple accent-4"
            />
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :type="'password'"
              label="Password"
              autocomplete="off"
              required
              color="purple accent-4"
            />
          </v-form>
        </v-flex>
      </v-layout>
      <!-- Buttons layout -->
      <v-layout
        row
        wrap
        justify-center
      >
        <v-flex
          d-flex
          xs5
        >
          <v-btn
            :disabled="logginIn"
            :type="'submit'"
            :loading="logginIn"
            large
            ripple
            class="button white--text"
            color="orange"
            @click.prevent="login"
          >
            login
          </v-btn>
        </v-flex>

        <v-flex
          d-flex
          xs5
        >
          <v-btn
            :disabled="valid"
            large
            ripple
            class="button white--text"
            color="purple darken-1"
            @click="clear"
          >
            clear
          </v-btn>
        </v-flex>

        <v-flex
          xs12
          py-4
          align-center
          class="info-text"
        >
          <v-divider />
        </v-flex>

        <v-flex
          d-flex
          xs5
        >
          <v-btn
            :loading="loggingOut"
            :disabled="!getUserAuthState"
            large
            ripple
            class="button white--text"
            color="purple darken-1"
            @click="signOut"
          >
            log out
          </v-btn>
        </v-flex>

        <v-flex
          d-flex
          xs5
        >
          <v-btn
            to="/register"
            large
            ripple
            class="button white--text"
            color="purple darken-1"
          >
            {{ newUserBtnText }}
          </v-btn>
        </v-flex>
      </v-layout>
      <!-- End of buttons layout -->
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import db from '../components/firebaseInit'
import firebase from 'firebase/app'
import 'firebase/auth'
import store from '../store/store'
import closeBtn from '../components/CloseBtn.vue'

export default {
  name: 'Login',
  components: {
    closeBtn
  },
  data: () => ({
    // loader: null,
    logginIn: false,
    loggingOut: false,
    users: [],
    errorMessage: undefined,
    newUserBtnText: 'Add user',
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
  computed: {
    ...mapGetters([
      'getError',
      'getUserAuthState',
      'getUserName'
    ]),
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : true
    }
    /*
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
    } */
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
    setLoginLoadingState () {
      this.logginIn = !this.logginIn
      return true
    },
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
        this.setLoginLoadingState()
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
              this.setLoginLoadingState()
            })
        return true
      }
    },
    signOut () {
      this.loggingOut = !this.loggingOut
      firebase.auth().signOut().then(() => {
        console.log('Signed Out')
        localStorage.removeItem('highestScore')
        localStorage.removeItem('lastScoresArray')
        localStorage.removeItem('schoolScores')
        store.commit('setAuthState', false)
        store.commit('setUserName', 'Anonymous')
        this.loggingOut = !this.loggingOut
        this.$router.push('/')
      }).catch(error => {
        console.error('Sign Out Error', error)
        this.loggingOut = !this.loggingOut
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
  }
}
</script>

<style lang="scss">
@import '../assets/scss/index.scss';

#login {
  height: 100%;
}

.login-form, .page-title, .info-text, .button {
  font-family: $text-font;
  // font-family: 'Courier New', Courier, monospace;
  // font-weight: 700;
}
.info-text {
  color: $color-primary-0;
  font-size: 1.4em;
  font-weight: 700;
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
