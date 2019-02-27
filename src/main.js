// import '@babel/polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
// import css from './main.css'
import App from './App.vue'
import router from './router'
import store from './store/store'

// import './registerServiceWorker'
// import VueOffline from 'vue-offline'

// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebaseConfig from './components/firebaseConfig'
// import db from './components/firebaseInit'
import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(`User logged in: ${user.email}.`)
  } else {
    console.log(`User logged out.`)
  }
})

// const auth = firebase.auth()
// console.log(auth)

/*
firebase.firestore().settings({timestampsInSnapshots: true})

const initializeAuth = new Promise(resolve => {
  // this adds a hook for the initial auth-change event
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      authService.setUser(user)
      resolve(user)
    } else {
      console.log(`No user!`)
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
} */
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
/*
function getUserNameFromDB (uid) {
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
      // console.log(`Setting user name: ${userName}`)
      return userName
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error)
    })
}
*/
/*
if (!this.getUserAuthState || this.getUserData.name === '') {
  authService.authenticated().then((result) => {
    // this.userName = authService.userUid
    // console.log(`Setting uid ${authService.userUid}`)
    let nameToSet = getUserNameFromDB(authService.userUid)
    if (result) {
      let currentUserData = {
        isAuthenticated: true,
        uid: authService.userUid,
        name: nameToSet
      }
      store.commit('setUser', currentUserData)
    }
  }).catch((error) => {
    console.log(`Error ${error}`)
  })
}
*/
Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: `md`, // 'md' || 'mdi' || 'fa' || 'fa4'
})

// Vue.use(VueOffline)

Vue.use(require(`vue-chartist`))
/* eslint-disable no-new */
new Vue({
  el: `#app`,
  store,
  router,
  components: {
    AsyncComponent: () => import(`./App.vue`),
  },
  // components: { App },
  // template: '<App/>',
  render: (h) => h(App),
})
