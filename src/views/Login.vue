<template>
  <v-container
    id="login"
    fluid
    class="text-xs-center"
  >
    <v-layout column>
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
          xs10
          sm6
          md4
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
            <v-layout>
              <v-flex xs11>
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :type="showPass ? 'text' : 'password'"
                  label="Password"
                  autocomplete="off"
                  required
                  color="purple accent-4"
                  @keyup.enter="login"
                />
              </v-flex>
              <v-flex
                d-flex
                xs1
                align-center
                align-content-center
                justify-center
                @click="showPass = !showPass"
              >
                <showPassIcon
                  class="input-icon"
                  :class="{ showPass: showPass }"
                />
              </v-flex>
            </v-layout>
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
          sm4
          md2
        >
          <v-btn
            :type="'submit'"
            :loading="loggingIn"
            :disabled="getUserData.isAuthenticated || !email || !password"
            outline
            ripple
            class="white--text button"
            color="orange"
            @click.prevent="login"
          >
            <span>
              login
            </span>
          </v-btn>
        </v-flex>

        <v-flex
          d-flex
          xs5
          sm4
          md2
        >
          <v-btn
            outline
            ripple
            class="white--text button"
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
        >
          <v-divider />
        </v-flex>

        <v-flex
          d-flex
          xs5
          sm4
          md2
        >
          <v-btn
            :loading="loggingOut"
            :disabled="!getUserData.isAuthenticated"
            outline
            ripple
            class="white--text button"
            color="purple darken-1"
            @click="logout"
          >
            log out
          </v-btn>
        </v-flex>

        <v-flex
          d-flex
          xs5
          sm4
          md2
        >
          <v-btn
            to="/register"
            outline
            ripple
            class="white--text button"
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
// import errorMessage from '../components/error-message.vue'
import showPassIcon from '../assets/icons/baseline-remove_red_eye-24px.svg'
import { mapGetters, mapActions } from 'vuex'
import { setLocalStorageDefaults } from '../services/localStorageHelper'

export default {
  name: `Login`,
  components: {
    showPassIcon
  },
  data: () => ({
    loggingIn: false,
    loggingOut: false,
    newUserBtnText: `Register`,
    pageTitle: `Log In`,
    valid: true,
    email: undefined,
    emailRules: [
      (v) => !!v || `E-mail is required`,
      (v) => /.+@.+/.test(v) || `E-mail must be valid`
    ],
    password: undefined,
    showPass: false,
    passwordRules: [
      (v) => !!v || `Password is required`
    ],
    usersCollRef: `users`
  }),
  computed: {
    ...mapGetters([
      `getUserData`
    ])
  },
  methods: {
    ...mapActions([
      `clearUserStats`
    ]),
    async login () {
      this.loggingIn = !this.loggingIn
      await this.$auth.login(this.email, this.password)
        .then(() => {
          // console.log(response.user.uid)
          this.clearForm()
        }).catch(error => {
          console.error(error)
        }).finally(() => {
          this.loggingIn = !this.loggingIn
        })
    },
    async logout () {
      this.loggingOut = !this.loggingOut
      await this.$auth.logout()
        .then(() => {
          this.clearUserStats()
          setLocalStorageDefaults()
          // clear user stats from localStorage
          // and reset state
        }).catch(error => {
          console.error(error)
        }).finally(() => {
          this.loggingOut = !this.loggingOut
        })
    },
    clearForm() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../assets/sass/index.sass"

.showPass
  color: $color-primary-0

.button
  line-height: 2em

</style>

