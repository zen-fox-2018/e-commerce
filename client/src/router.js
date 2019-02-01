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
          path: '',
          component: () => import(/* webpackChunkName: "listproduct" */ '@/components/Listproduct.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ '@/components/LoginForm.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import(/* webpackChunkName: "register" */ '@/components/RegisterForm.vue')
        },
        {
          path: '/admin',
          name: 'Admin',
          component: () => import(/* webpackChunkName: "admin" */ '@/components/Admin.vue')
        },
        {
          path: 'transaction',
          name: 'History',
          component: () => import(/* webpackChunkName: "history" */ '@/components/History.vue'),
        },
        {
          path: 'wishlist',
          name: 'wishlist',
          component: () => import(/* webpackChunkName: "wishlist" */ '@/components/WishList.vue'),
        },
        {
          path: '/:id',
          name: 'cartdetail',
          component: () => import(/* webpackChunkName: "cartdetail" */ '@/components/CartDetail.vue'),
        }
      ]
    }
  ]
})
