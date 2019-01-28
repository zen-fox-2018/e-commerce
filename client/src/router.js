import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import adminPage from './views/adminPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      component: Home,
      children: [{
        path: 'cart',
        component: () => import('./views/Cart.vue'),
      }, {
        path: 'store',
        component: () => import('./views/allItems.vue'),
      }]
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'adminPage',
      component: adminPage
    },
    {
      path: '/item/:itemId',
      name: 'item',
      component: () => import('./views/Item.vue'),
      props: true
    }
  ]
})
