import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import(/* webpackChunkName: "about" */ './views/Cart.vue'),
      children: [{
        path: 'checkout',
        name: 'Checkout',
        component: () => import(/* webpackChunkName: "about" */ './views/Checkout.vue')
      }]
    },
    {
      path: '/my-transaction',
      name: 'MyTransaction',
      // route level code-splitting
      // this generates a separate chunk (my-transaction.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "my-transaction" */ './views/MyTransaction.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import(/* webpackChunkName: "about" */ './views/Admin.vue'),
      children:
        [{
          path: 'transaction',
          name: 'Transaction',
          component: () => import(/* webpackChunkName: "about" */ './views/Transaction.vue')
        }]
    }
  ]
})
