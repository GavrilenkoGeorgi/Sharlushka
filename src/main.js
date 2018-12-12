import '@babel/polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import './plugins/vuetify'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import '../node_modules/vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './components/firebaseConfig'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
firebase.firestore().settings({timestampsInSnapshots: true})

Vue.config.productionTip = false
// Vue.use(Vuetify)

Vue.use(Vuetify, {
  iconfont: 'md' // 'md' || 'mdi' || 'fa' || 'fa4'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
