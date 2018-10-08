<template>
  <v-container id="registerPage">
    <v-layout flex column align-center justify-center>
    <!--router-link to="/">
    <div class="close-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </div>
    </router-link-->
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
      <v-btn color="purple" dark to="/register" class="my-4" @click="saveUserName">
        <v-icon dark>done_all</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
// import router from 'vue-router'

export default {
  /*
  data () {
    return {
      greeting: 'Hi,',
      userName: '',
      formValueName: '',
      saveButtonText: 'SAVE'
    }
  },
  */
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
    userName: '',
    formValueName: '',
    saveButtonText: 'SAVE'
  }),
  mounted: function () {
    this.$nextTick(function () {
      console.log(`Home view mounted`)
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
      localStorage.setItem('userName', this.name)
      this.userName = this.name
      this.$router.push({path: '/game'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/index.scss";
@import "../assets/scss/vars/colors.scss";

#registerPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100vh;
}
.greeting {
  font-size: 2.3em;
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
</style>
