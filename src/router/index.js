import Vue from 'vue'
import Router from 'vue-router'
// import MainPage from '@/components/MainPage'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      // component: MainPage
      component: () => import(/* webpackChunkName: "mainpage" */ '@/components/MainPage.vue')
    },
    {
      path: '/register',
      name: 'Register',
      // component: Register
      component: () => import(/* webpackChunkName: "register" */ '@/components/Register.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      // component: Settings
      component: () => import(/* webpackChunkName: "settings" */ '@/components/Settings.vue')
    },
    {
      path: '/game',
      name: 'Game',
      // component: Game
      component: () => import(/* webpackChunkName: "game" */ '@/components/Game.vue')
    },
    {
      path: '/endgame',
      name: 'EndGame',
      // component: EndGame
      component: () => import(/* webpackChunkName: "endgame" */ '@/components/EndGame.vue')
    },
    {
      path: '/help',
      name: 'Help',
      // component: Help
      component: () => import(/* webpackChunkName: "help" */ '@/components/Help.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "Login" */ '@/components/Login.vue')
    }
  ]
})
