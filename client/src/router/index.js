import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Game from '@/components/Game'
import Dice from '@/components/Dice'

Vue.use(Router)

export default new Router({
  routes: [
    /* {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, */
    {
      path: '/',
      name: 'game',
      component: Game
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dice',
      name: 'Dice',
      component: Dice
    }
  ]
})
