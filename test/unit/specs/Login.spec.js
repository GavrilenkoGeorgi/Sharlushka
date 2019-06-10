import { mount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vue from 'vue'

// import firebase from 'firebase/app'
// import db from '../firebase/firebaseInit'
// import 'firebase/auth'

const localVue = createLocalVue()
localVue.use(Vuex)
Vue.use(Vuetify)

describe(`Login.vue`, () => {
  test(`calls login() when Login button is clicked`, () => {
    const login = jest.fn()
    const wrapper = mount(Login, {
      localVue,
      propsData: {
        login
      }
    })
    wrapper.find(`#loginButton`).trigger(`click`)
  })
})
