<template>
  <v-container
    id="register"
    fluid
    pt-4
  >
    <v-layout
      justify-center
      wrap
    >
      <!-- Page title -->
      <v-flex
        xs12
        class="register-title text-xs-center py-4"
      >
        <h1>Register</h1>
      </v-flex>
      <v-flex
        xs10
        sm8
        md7
      >
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
            color="purple accent-4"
            autocomplete="off"
          />
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            autocomplete="email"
            color="purple accent-4"
            required
          />
          <v-layout>
            <v-flex xs11>
              <v-text-field
                v-model="password"
                :type="showPass ? 'text' : 'password'"
                :rules="passwordRules"
                label="Password"
                autocomplete="new-password"
                color="purple accent-4"
                required
                hint="At least 6 characters"
                @keyup.enter="signUpNewUser"
              />
            </v-flex>
            <v-flex
              d-flex
              xs1
              align-center
              align-content-center
              justify-center
              class="text-xs-center"
              @click="showPass = !showPass"
            >
              <showPassIcon
                class="input-icon"
                :class="{ showPass: showPass }"
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-text-field
                v-model="confirmPassword"
                :type="showConfPass ? 'text' : 'password'"
                :rules="[comparePasswords]"
                label="Confirm password"
                autocomplete="off"
                color="purple accent-4"
                required
                @keyup.enter="signUpNewUser"
              />
            </v-flex>
            <v-flex
              d-flex
              xs1
              align-center
              align-content-center
              justify-center
              class="text-xs-center"
              @click="showConfPass = !showConfPass"
            >
              <showPassIcon
                class="input-icon"
                :class="{ showConfPass: showConfPass }"
              />
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
      <v-flex
        xs10
        sm8
        md7
      >
        <v-layout
          justify-center
          class="buttons text-xs-center py-4"
        >
          <v-flex
            xs6
            d-flex
          >
            <v-btn
              :disabled="!valid || !email"
              :loading="registering"
              class="white--text button"
              outline
              color="orange"
              @click.prevent="signUpNewUser"
            >
              register
            </v-btn>
          </v-flex>
          <v-flex
            xs6
            d-flex
          >
            <v-btn
              class="button white--text"
              outline
              color="purple darken-1"
              @click="clear"
            >
              clear
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import showPassIcon from '../assets/icons/baseline-remove_red_eye-24px.svg'
import { firestoreConnection } from '../services/api'
import { gatherDataFromLocalStorage } from '../services/localStorageHelper'
import { mapActions } from 'vuex'

export default {
  name: `Register`,
  components: {
    showPassIcon
  },
  data: () => ({
    registering: false,
    valid: true,
    userNameFormValue: undefined,
    nameRules: [
      (v) => (!v || v.length <= 10) || `Name must be less than 10 characters`
    ],
    email: undefined,
    emailRules: [
      (v) => !!v || `E-mail is required`,
      (v) => /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/.test(v) || `E-mail must be valid`
    ],
    password: undefined,
    showPass: false,
    passwordRules: [
      (v) => !!v || `Password is required`,
      (v) => (v && v.length <= 12) || `Password must be less than 12 characters`
    ],
    confirmPassword: undefined,
    showConfPass: false
  }),
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword ? `Passwords do not match` : true
    }
  },
  methods: {
    ...mapActions([
      `setErrorMessage`
    ]),
    signUpNewUser() {
      if (this.valid && this.email) {
        this.registering = true
        let db = new firestoreConnection()
        db.signUp(this.email, this.password).then(response => {
          if (response instanceof Error) {
            this.setErrorMessage(response.message)
          } else {
            let userUid = {
              uid: response.user.uid,
              name: !this.userNameFormValue ? localStorage.getItem(`userName`) : this.userNameFormValue
            }
            gatherDataFromLocalStorage().then(newUserData => {
              Object.assign(newUserData, userUid)
              db.addNewUserData(newUserData)
              db.verifyUserEmail()
            })
          }
        }).catch(error => console.error(error))
          .finally(() => this.registering = !this.registering)
      }
    },
    clear() {
      this.$refs.form.reset()
      this.showPass = false
      this.showConfPass = false
    }
  }
}
</script>

<style lang="sass" scoped>

#register
  height: 100%

.button
  line-height: 2em

.showPass, .showConfPass
  color: $color-primary-0

</style>
