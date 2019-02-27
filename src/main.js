import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'

import VueOffline from 'vue-offline'

import firebaseConfig from './components/firebaseConfig'
import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(`User logged in: ${user.email}.`)
    // Data is already in localstorage
  } else {
    console.log(`User logged out.`)
    // set default local storage values
    localStorage.setItem(`userName`, `Anonymous`)
    localStorage.setItem(`userUid`, ``)
    localStorage.setItem(`highestScore`, ``)
    localStorage.setItem(`lastScoresArray`, ``)
    localStorage.setItem(`schoolScores`, ``)
  }
})

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: `md` // 'md' || 'mdi' || 'fa' || 'fa4'
})

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
  // template: '<App/>',
  render: (h) => h(App)
})
