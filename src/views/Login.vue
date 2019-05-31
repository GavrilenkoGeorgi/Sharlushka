<template>
  <v-container
    id="login"
    fluid
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
            :disabled="userData.isAuthenticated"
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
            :loading="signingOut"
            :disabled="!userData.isAuthenticated"
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
import errorMessageDialog from '../components/ErrorMessage.vue'
import showPassIcon from '../assets/icons/baseline-remove_red_eye-24px.svg'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: `Login`,
  components: {
    errorMessageDialog,
    showPassIcon
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
    showPass: false,
    passwordRules: [
      (v) => !!v || `Password is required`
      // (v) => v && (v.length >= 6 && v.length <= 12) || `Password must be greater than 6 and less than 12.`
    ],
    usersCollRef: `users`
  }),
  computed: {
    ...mapGetters([
      `userData`
    ])
  },
  watch: {
    userData (userData) {
      console.log(`User auth state changed to ${userData.isAuthenticated}!`)
    }
  },
  methods: {
    ...mapActions([
      `setUserAuthState`
    ]),
    async login () {
      this.loggingIn = !this.loggingIn
      await this.$auth.login(this.email, this.password)
        .then(() => {
          this.clearForm()
          this.loggingIn = !this.loggingIn
        })
    },
    async logout () {
      this.signingOut = !this.signingOut
      await this.$auth.logout()
        .then(() => {
          this.signingOut = !this.signingOut
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

