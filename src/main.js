import '@babel/polyfill'
/**
 * Import Global Style (.css/.scss)
 */
// import 'element-ui/lib/theme-default/index.css' // Theme UI
// import './assets/scss/index.scss' // Customize UI <---
// import './assets/scss/index.scss'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
// import Vuetify from 'vuetify'
import './plugins/vuetify'
import App from './App'
import router from './router'
import store from './store/store'

// import 'roboto-fontface/css/roboto/roboto-fontface.css'
// import '../node_modules/material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

// Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
