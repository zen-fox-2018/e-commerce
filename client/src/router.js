import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "about" */ './views/Admin.vue'),
      children: [
      {
        path: 'products',
        name: 'adminlistproduct',
        component: () => import(/* webpackChunkName: "about" */ './components/Admin/ListProduct.vue')
      },{
        path: 'categories',
        name: 'adminlistcategories',
        component: () => import(/* webpackChunkName: "about" */ './components/Admin/ListCategories.vue')
      },{
        path: 'addproduct',
        name: 'addproductform',
        component: () => import(/* webpackChunkName: "about" */ './components/Admin/AddProductForm.vue')
      },{
        path: 'list-transactions',
        name: 'adminlisttransactions',
        component: () => import(/* webpackChunkName: "about" */ './components/Admin/ListTransactions.vue')
      },{
        path: ':productId',
        name: 'editproductform',
        component: () => import(/* webpackChunkName: "about" */ './components/Admin/EditProductForm.vue')
      }]
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: ':state',
        name: 'form',
        component: () => import(/* webpackChunkName: "about" */ './components/LoginRegister.vue')
      }]
    },
    {
      path: '/details',
      name: 'details',
      component: () => import(/* webpackChunkName: "about" */ './views/Details.vue'),
      children: [{
        path: 'order-list',
        name: 'order-list',
        component: () => import(/* webpackChunkName: "about" */ './components/UserTransaction.vue')
      },{
        path: 'cart',
        name: 'cartdetails',
        component: () => import(/* webpackChunkName: "about" */ './components/DetailCart.vue')
      },{
        path: 'payment',
        name: 'paymentdetails',
        component: () => import(/* webpackChunkName: "about" */ './components/DetailPayment.vue')
      },{
        path: ':productId',
        name: 'productdetails',
        component: () => import(/* webpackChunkName: "about" */ './components/DetailProduct.vue')
      }]
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
