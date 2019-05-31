import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: `hash`,
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: `/`,
      name: `MainPage`,
      component: () => import(/* webpackChunkName: "mainpage" */ `../views/MainPage.vue`)
    }, /*
    {
      path: `/register`,
      name: `Register`,
      component: () => import( */ /* webpackChunkName: "register" */ /* `../views/Register.vue`)
    }, */
    {
      path: `/userstats`,
      name: `UserStats`,
      component: () => import(/* webpackChunkName: "settings" */ `../views/UserStats.vue`)
    },
    {
      path: `/game`,
      name: `Game`,
      component: () => import(/* webpackChunkName: "game" */ `../views/Game.vue`)
    }, /*
    {
      path: `/endgame`,
      name: `EndGame`,
      component: () => import( */ /* webpackChunkName: "endgame" */ /* `../views/EndGame.vue`)
    }, */
    {
      path: `/help`,
      name: `Help`,
      component: () => import(/* webpackChunkName: "help" */ `../views/Help.vue`)
    },
    {
      path: `/settings`,
      name: `Settings`,
      component: () => import(/* webpackChunkName: "settings" */ `../views/Settings.vue`)
    },
    {
      path: `/login`,
      name: `Login`,
      component: () => import(/* webpackChunkName: "login" */ `../views/Login.vue`)
    }
    /* {
      path: `/leaderboard`,
      name: `LeaderBoard`,
      component: () => import( */ /* webpackChunkName: "leaderboard" */ /* `../views/Leaderboard.vue`)
    } */
  ]
})
