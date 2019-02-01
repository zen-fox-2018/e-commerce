import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          name: 'product',
          path: 'product/:id',
          component: () => import('./components/product.vue'),
        }
      ]
    },
   
    {
      path: '/profile/:userId',
      name: 'profile',
      component: () => import('./views/profile.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/registerForm.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/signIn.vue')
    },
    {
      path: '/sell',
      name: 'sell',
      component: () => import('./components/addProduct.vue')
    },
    {
      path: '/cart/:userId',
      name: 'cart',
      component: () => import('./components/cart.vue')
    }
  ]
})
