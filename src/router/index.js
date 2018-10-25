import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Register from '@/components/Register'
import Settings from '@/components/Settings'
import Game from '@/components/Game'
import EndGame from '@/components/EndGame'
import Help from '@/components/Help'
import DiceTemp from '@/components/DiceTemp'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
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
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/dicetemp',
      name: 'DiceTemp',
      component: DiceTemp
    }
  ]
})
