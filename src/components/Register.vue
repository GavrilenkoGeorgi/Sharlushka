<template>
  <div id="registerPage">
    <!-- icon definition -->
    <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <symbol id="registerClose" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <path class="close-icon-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z"/>
      </symbol>
    </svg>
      <svg class="ui-icon" @click="$router.go(-1)">
      <use xlink:href="#registerClose"></use>
    </svg>
    <v-layout flex column align-center justify-center>
    <span class="greeting py-4">{{ greeting }} {{ userName }}</span>
      <v-form v-model="valid" class="py-4">
        <v-text-field v-model="name" :rules="nameRules"
          :counter="10" label="Name" required>
        </v-text-field>
        <!--v-text-field v-model="email" :rules="emailRules"
          label="E-mail" required>
        </v-text-field-->
      </v-form>
        <!--form>
          <input v-model="formValueName" type="text" id="userName" name="newUserName" placeholder="Name">
        </form-->
      <!--div class="save-button" @click="saveUserName">{{ saveButtonText }}</div-->
      <v-btn color="purple" dark to="/register" class="my-4 disabled" @click="saveUserName" :disabled="!this.valid">
        <v-img :src="require('@/assets/icons/baseline-done_all-24px.svg')" contain height="2em"></v-img>
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    greeting: 'Hi,',
    userName: ''
  }),
  mounted: function () {
    this.$nextTick(function () {
      this.userName = localStorage.getItem('userName')
      if (this.userName !== 'Anonymous') {
        console.log(`User name set`)
      } else {
        console.log(`User Anonymous`)
      }
    })
  },
  methods: {
    saveUserName () {
      if (this.valid) {
        localStorage.setItem('userName', this.name)
        this.userName = this.name
        this.$router.push({path: '/game'})
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/index.scss";

#registerPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.greeting {
  font-size: 1.8em;
}
.close-button {
  position: fixed;
  top: .5em;
  right: .5em;
  align-items: center;
  cursor: pointer;
  // border: 1px solid green;
}
.save-button {
  background: $color-primary-0;
  border: none;
  border-radius: .25em;
  font-size: 1.1em;
  // color: white;
  padding: .3em;
  width: 6em;
  // height: 1.95em;
  text-align: center;
  color: white;
  a {
    color: white;
    text-decoration: none;
  }
}
.save-button:hover {
  box-shadow: 0px 0px 10px 1px $color-primary-1;
}
.ui-icon {
  object-fit: cover;
  height: 2.3em;
  width: 2.3em;
  align-self: flex-end;
  margin: 1em;
}
.close-icon-path {
  fill: $color-primary-1;
}
</style>
