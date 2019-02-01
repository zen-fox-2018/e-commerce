import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/detail/:name',
      name: 'product-detail',
      component: () => import('./views/ProductDetail.vue'),
      children: [
        {
          path: '',
          component: () => import('./components/useless.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'authentication',
      component: () => import('./views/Auth.vue'),
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('./views/Cart.vue'),
    },
    {
      path: '/history',
      name: 'History',
      component: () => import('./views/History.vue'),
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('./views/Admin.vue')
    },
    {
      path: '/items',
      name: 'Items',
      component: () => import('./views/Items.vue')
    }
  ],
});
