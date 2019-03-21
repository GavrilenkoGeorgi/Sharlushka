<template>
  <v-container
    id="login"
    fluid
    py-2
    px-4
    class="text-xs-center"
  >
    <v-layout column>
      <!-- Error message if any -->
      <errorMessageDialog />
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
            :loading="loggingIn"
            :disabled="getUserAuthState"
            outline
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
            outline
            ripple
            class="button white--text"
            color="purple darken-1"
            @click="clearForm"
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
            :loading="signingOut"
            :disabled="!getUserAuthState"
            outline
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
            outline
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
import errorMessageDialog from '../components/ErrorMessage.vue'
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'
import db from '../firebase/firebaseInit'
import 'firebase/auth'

export default {
  name: `Login`,
  components: {
    errorMessageDialog
  },
  data: () => ({
    loggingIn: false,
    signingOut: false,
    newUserBtnText: `Register`,
    pageTitle: `Log In`,
    valid: true,
    email: ``,
    emailRules: [
      (v) => !!v || `E-mail is required`,
      (v) => /.+@.+/.test(v) || `E-mail must be valid`
    ],
    password: ``,
    passwordRules: [
      (v) => !!v || `Password is required`,
      (v) => v && (v.length >= 6 && v.length <= 12) || `Password must be greater than 6 and less than 12.`
    ],
    usersCollRef: `users`
  }),
  computed: {
    ...mapGetters([
      `getUserAuthState`
    ])
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`Login page mounted.`)
    })
  },
  methods: {
    login() {
      console.log(`Signing user in.`)
      if (this.email && this.password) { // need some proper validation
        this.toggleButtonLoadingState(`login`)
        firebase.auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(response => {
            this.getUserDataFromDB(response.user.uid)
          }).then(() => {
            this.toggleButtonLoadingState(`login`)
            // this.$router.push(`/game`)
          }).catch(err => {
            this.$store.dispatch(`setErrorMessage`, err)
            this.toggleButtonLoadingState(`login`)
            return false
          })
        return true
      }
    },
    signOut() {
      console.log(`Signing user out.`)
      this.toggleButtonLoadingState(`signout`)
      firebase.auth().signOut().then(() => {
        this.$store.commit(`setUserIsLoggedIn`, false)
        localStorage.clear()
        this.toggleButtonLoadingState(`signout`)
        // this.$router.push(`/`)
      }).catch((err) => {
        this.$store.dispatch(`setErrorMessage`, err)
        this.toggleButtonLoadingState(`signout`)
      })
    },
    getUserDataFromDB(uid) {
      db.collection(this.usersCollRef).where(`uid`, `==`, uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().uid === uid) {
              // save to local storage
              localStorage.setItem(`userName`, doc.data().name)
              localStorage.setItem(`userUid`, doc.data().uid)
              localStorage.setItem(`highestScore`, doc.data().hiScore)
              localStorage.setItem(`lastScoresArray`, doc.data().resultsArray)
              localStorage.setItem(`schoolScores`, doc.data().schoolResultsArray)
            }
          })
        })
        .catch(err => {
          this.$store.dispatch(`setErrorMessage`, err)
          console.log(`Error getting documents: `, err)
        })
    },
    toggleButtonLoadingState(btn) {
      // console.log(`Button to toggle ${btn}`)
      if (btn === `login`) {
        this.loggingIn = !this.loggingIn
        return true
      } else if (btn === `signout`) {
        this.signingOut = !this.signingOut
        return true
      } else {
        console.log(`Nothing to toggle, button is ${typeof button}`)
        return false
      }
    },
    clearForm() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/index.scss';

.login-form, .page-title, .info-text, .button {
  font-family: $text-font;
}
.info-text {
  color: $color-primary-0;
  font-size: 1.4em;
  font-weight: 700;
}
</style>
