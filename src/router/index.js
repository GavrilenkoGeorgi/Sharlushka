import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Settings from '@/components/Settings'
import Game from '@/components/Game'
import EndGame from '@/components/EndGame'

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
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/endgame',
      name: 'EndGame',
      component: EndGame
    }
  ]
})
