import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueOffline from 'vue-offline'
import fireBaseAuthPlugin from './services/firebaseAuthPlugin'

Vue.config.productionTip = true

Vue.use(fireBaseAuthPlugin)
Vue.use(Vuetify)
Vue.use(VueOffline)
Vue.use(require(`vue-chartist`))

/*
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(`User is logged in: ${user.email}.`)
    // Data is already in localstorage after logging in
    store.commit(`setUserIsLoggedIn`, true)
    // set dice favs from local storage to state
    if (localStorage.getItem(`diceValuesFavs`) !== ``) {
      let userStatsToSet = localStorage.getItem(`diceValuesFavs`).split(`,`).map(Number)
      store.dispatch(`setUserFavStats`, userStatsToSet)
    }
  } else {
    console.log(`User is not logged in. Hi, Anonymous.`)
    // set default local storage values
    // and gather data until user regs or logs in
    if (!localStorage.hasOwnProperty(`userName`)) {
      // seems like it is the first run
      localStorage.setItem(`userName`, `Anonymous`)
      localStorage.setItem(`userUid`, ``)
      localStorage.setItem(`highestScore`, ``)
      localStorage.setItem(`lastScoresArray`, ``)
      localStorage.setItem(`schoolScores`, ``)
      localStorage.setItem(`diceValuesFavs`, ``)
      localStorage.setItem(`combinationsFavs`, ``)
    }
  }
})
*/
if (`serviceWorker` in navigator) {
  window.addEventListener(`load`, function() {
    navigator.serviceWorker.register(`/service-worker.js`).then(function(registration) {
      console.log(`ServiceWorker registration successful with scope: `, registration.scope)
    }, function(err) {
      console.log(`ServiceWorker registration failed: `, err)
    })
  })
}

/* eslint-disable no-new */
new Vue({
  el: `#app`,
  store,
  router,
  components: {
    AsyncComponent: () => import(`./App.vue`)
  },
  render: (h) => h(App)
})
