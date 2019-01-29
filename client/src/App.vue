<template>
  <v-app>
    <Toolbar @action-login="actionLogin" :token="token" :cart="cart" @checkout="checkout"></Toolbar>
    <router-view :token="token" :cart="cart" @add-to-cart="addToCart" @action-login="actionLogin" @checkout="checkout"></router-view>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'

export default {
  name: 'App',
  components: {
    Toolbar
  },
  data () {
    return {
      token: '',
      cart: {}
    }
  },
  methods: {
    actionLogin (action) {
      if (action) {
        this.token = ''
        localStorage.removeItem('token')
        this.$router.replace('/')
      } else {
        this.$router.replace('/products')
        this.token = localStorage.token
        this.getCart()
      }
    },
    getCart () {
        this.$http
        .get("/cart", {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          this.token = localStorage.token
          this.cart = data
        })
        .catch(({ response }) => {
          localStorage.removeItem('token')
        })
    },
    addToCart (status) {
      if (status == 400) {
        this.$router.replace('/login')
      } else {
        this.getCart()
      }
    },
    checkout() {
      this.getCart()
    }
  },
  mounted () {
    if (localStorage.token) {
      this.getCart()
    }
  }
}
</script>
