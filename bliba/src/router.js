import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'products/:id',
          name: 'product-detail',
          component: () => import('./components/ProductPage.vue')
        },
      ]
    },
    {
      path: '/products',
      name: 'products',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Product.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('./views/Checkout.vue')
    }
  ]
})
