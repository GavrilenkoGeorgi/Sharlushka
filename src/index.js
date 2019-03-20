import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueOffline from 'vue-offline'

import firebaseConfig from './firebase/firebaseConfig.js'
import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(`User is logged in: ${user.email}.`)
    // Data is already in localstorage after logging in
    let userData = {
      isAuthenticated: true
    }
    store.commit(`setUserIsLoggedIn`, userData)
  } else {
    console.log(`User is not logged in. Hi, Anonymous.`)
    // set default local storage values
    // and gather data until user regs or logs in
    if (!localStorage.hasOwnProperty(`userName`)) {
      // seems like it the first run
      localStorage.setItem(`userName`, `Anonymous`)
      localStorage.setItem(`userUid`, ``)
      localStorage.setItem(`highestScore`, ``)
      localStorage.setItem(`lastScoresArray`, ``)
      localStorage.setItem(`schoolScores`, ``)
    }
  }
})

if (`serviceWorker` in navigator) {
  window.addEventListener(`load`, function() {
    navigator.serviceWorker.register(`/service-worker.js`).then(function(registration) {
      console.log(`ServiceWorker registration successful with scope: `, registration.scope)
    }, function(err) {
      console.log(`ServiceWorker registration failed: `, err)
    })
  })
}

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueOffline)

Vue.use(require(`vue-chartist`))
/* eslint-disable no-new */
new Vue({
  el: `#app`,
  store,
  router,
  components: {
    AsyncComponent: () => import(`./App.vue`)
  },
  // components: { App },
  // template: `<App/>`,
  render: (h) => h(App)
})
