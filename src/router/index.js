import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    /*
    {
      path: '#/game',
      name: 'Game',
      component: Game
    },
    */
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
