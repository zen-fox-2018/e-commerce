<template>
  <div id="app">
    <navbar @cekLogin="cekLogin" :carts="carts" :user="user" />
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view v-if="user" class="content" :dataUser="user" @carts="getCarts" :carts="carts" @getCarts="trGetCarts" @getProducts="getProducts" :products="products" />  
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { setTimeout } from 'timers';

export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
    return {
      user: {},
      carts: [],
      callGetCarts: false,
      products: []
    }
  },
  methods: {
    cekLogin() {
      this.user = JSON.parse(localStorage.getItem('user'))
    },
    getCarts(dataCarts) {
      this.carts = dataCarts
    },
    trGetCarts() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          this.carts = data
        })
        .catch(err => {
          swal(err)
        })
    },
    getProducts(products) {
      this.products = products
    }
  },
  mounted() {
    this.cekLogin()
    this.trGetCarts()
  }
}
</script>


<style>
  .content {
    margin-top: 80px;
  }
</style>
