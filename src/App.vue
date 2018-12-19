<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height ma-0 pa-0 id="app">
<!-- Router view -->
        <transition name="custom-classes-transition"
                    mode="out-in"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOutLeft">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import db from './components/firebaseInit'
// import { mapGetters, mapActions } from 'vuex'
// import firebase from 'firebase/app'
// import 'firebase/auth'

export default {
  name: 'App',
  created () {
    console.log(`Main page created`)
    /*
    const initializeAuth = new Promise(resolve => {
      // this adds a hook for the initial auth-change event
      firebase.auth().onAuthStateChanged(user => {
        // console.log(`Type of user ${typeof user}`)
        // console.dir(user)
        if (user) {
          authService.setUser(user)
          resolve(user)
        } else {
          console.log(`No user!`)
          this.userName = this.getDefaultUserName
        }
      })
    })
    */
    /*
    const authService = {
      userUid: null,
      authenticated () {
        return initializeAuth.then(user => {
          return user && !user.isAnonymous
        })
      },
      setUser (user) {
        this.userUid = user.uid
        console.log(`User set ${user.email}`)
      }
      /*
      login (email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
      },
      logout () {
        firebase.auth().signOut().then(() => {
          console.log('logout done')
        })
      }
      */
    /* }
    if (!this.getUserAuthState || this.getUserData.name === '') {
      authService.authenticated().then((user) => {
        // this.userName = authService.userUid
        // console.log(`Setting uid ${authService.userUid}`)
        this.getUserNameFromDB(authService.userUid)
        let currentUserData = {
          isAuthenticated: true,
          uid: authService.userUid
        }
        this.$store.commit('setUser', currentUserData)
      }).catch((error) => {
        console.log(`Error ${error}`)
      })
    } */
  },
  mounted () {
    this.$nextTick(function () {
      console.log('App started')
    })
  } /*,
  methods: {
    getUserNameFromDB (uid) {
      console.log(`Getting user name for uid ${uid}`)
      db.collection('users').where('uid', '==', uid)
        .get()
        .then(function (querySnapshot) {
          let userName
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().uid === uid) {
              userName = doc.data().name
            }
          })
          return userName
        })
        .then((userName) => {
          this.userName = userName
          this.$store.commit('setUserName', userName)
          console.log(`Setting user name ${userName}`)
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    }
  } */
}
</script>

<!--style src='vuetify/dist/vuetify.min.css'>
</style-->
<style lang="scss">
// @import "./assets/fonts/fonts.scss";

#app {
  height: 100vh;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
.fadeIn {
  animation-name: fadeIn;
}

@keyframes fadeOutLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
.fadeOutLeft {
  animation-name: fadeOutLeft;
}

.animated {
  animation-duration: 900ms;
  animation-fill-mode: both;
}
.animated.delay-s { // change this
  animation-delay: 500ms;
}

@media (prefers-reduced-motion) {
  .animated {
    animation: unset !important;
    transition: none !important;
  }
}

</style>
