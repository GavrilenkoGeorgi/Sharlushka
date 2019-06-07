import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueOffline from 'vue-offline'
import fireBaseAuthPlugin from './services/firebaseAuthPlugin'

Vue.config.productionTip = true
Vue.config.errorHandler = (err, vm, info) => {
  console.log(`Error: ${err.toString()}\nInfo: ${info}`)
}

Vue.use(fireBaseAuthPlugin)
Vue.use(Vuetify)
Vue.use(VueOffline)
Vue.use(require(`vue-chartist`))

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
