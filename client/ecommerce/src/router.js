import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ProductList from './components/ProductList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // children:[{
      //   path: '/',
      //   component: () => import(/* webpackChunkName: "about" */ './components/ProductList.vue')
      // }]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './components/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './components/Login.vue')
    },
    {
      path: '/transaction',
      name: 'transaction',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Transaction.vue'),
      children:[{
        path: '/cart',
        name:'cart',
        component: () => import(/* webpackChunkName: "about" */ './views/Cart.vue'),
      }]
    },
    {
      path: '/history',
      name: 'history',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/History.vue')
    },
    {
      path: '/allhistory',
      name: 'allhistory',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/AllHistory.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
