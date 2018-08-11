import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/StartPage'
import Register from '@/components/Register'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
