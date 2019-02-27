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
import {mapGetters} from 'vuex'
import firebase from 'firebase/app'
import db from '../components/firebaseInit'
import 'firebase/auth'
// import store from '../store/store'
import closeBtn from '../components/CloseBtn.vue'

export default {
  name: `Login`,
  components: {
    closeBtn
  },
  data: () => ({
    // loader: null,
    logginIn: false,
    loggingOut: false,
    users: [],
    errorMessage: undefined,
    newUserBtnText: `Add user`,
    pageTitle: `Log In`,
    valid: true,
    name: ``,
    nameRules: [
      (v) => !!v || `Name is required`,
      (v) => v && v.length <= 10 || `Name must be less than 10 characters`
    ],
    email: ``,
    emailRules: [
      (v) => !!v || `E-mail is required`,
      (v) => /.+@.+/.test(v) || `E-mail must be valid`
    ],
    password: ``,
    passwordRules: [
      (v) => !!v || `Password is required`,
      (v) => v && v.length <= 12 || `Password must be less than 12 characters`
    ],
    confirmPassword: ``,
    usersCollRef: `users`
  }),
  computed: {
    ...mapGetters([
      `getError`,
      `getUserAuthState`,
      `getUserName`
    ]),
    comparePasswords() {
      return this.password !== this.confirmPassword ? `Passwords do not match` : true
    }
  },

  mounted() {
    console.log(`Login page mounted`)
    for (let i in 100) {
      console.log(i)
    }
  },
  methods: {
    toggleButtonLoadingState(button) {
      console.log(`Button to toggle ${button}`)
      if (button === `login`) {
        this.logginIn = !this.logginIn
        return true
      } else {
        console.log(`Nothing to toggle, button is ${typeof button}`)
        return false
      }
    },
    getUserDataFromDB(uid) {
      // console.log(`Getting user name for uid ${uid}`)
      db.collection(this.usersCollRef).where(`uid`, `==`, uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().uid === uid) {
              // to local storage
              localStorage.setItem(`userName`, doc.data().name)
              localStorage.setItem(`userUid`, doc.data().uid)
              localStorage.setItem(`highestScore`, doc.data().hiScore)
              localStorage.setItem(`lastScoresArray`, doc.data().resultsArray)
              localStorage.setItem(`schoolScores`, doc.data().schoolResultsArray)
            }
          })
        })
        .catch(error => {
          console.log(`Error getting documents: `, error)
        })
    },
    login() {
      this.errorMessage = undefined // null
      if (this.email && this.password) { // need some proper validation
        this.toggleButtonLoadingState(`login`)

        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(response => {
            console.log(`Loggin in user with id ${response.user.uid}`)
            // console.log(response.user)
            this.getUserDataFromDB(response.user.uid)
            // console.log(`response from get user data is ${temp}`)
          }).then(() => {
            this.toggleButtonLoadingState(`login`)
            this.$router.push(`/`)
          }).catch(err => {
            console.log(err.message)
            this.errorMessage = err.message
            this.toggleButtonLoadingState(`login`)
            return false
          })
        return true
      }
    },
    signOut() {
      this.loggingOut = !this.loggingOut
      firebase.auth().signOut().then(() => {
        console.log(`Signing user out`)
        // localStorage.removeItem(`highestScore`)
        // localStorage.removeItem(`lastScoresArray`)
        // localStorage.removeItem(`schoolScores`)
        // store.commit(`setAuthState`, false)
        // store.commit(`setUserName`, `Anonymous`)
        this.loggingOut = !this.loggingOut
        // this.$router.push(`/`)
      }).catch((error) => {
        console.error(`Sign Out Error`, error)
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
    clear() {
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
