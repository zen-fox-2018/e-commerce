import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/login-page')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/admin')
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import(/* webpackChunkName: "mypage" */ './views/mypage')
    }
  ]
})