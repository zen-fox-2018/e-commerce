<template>
  <v-app>
    <navbar :isLogin="isLogin" :cart="cart" @checkCart="setCart" @logout="logout" />
    <router-view style="min-height:86vh;" @loggedin="checkUser" :cart="cart" @addCart="setCart" />
    <fooder />
  </v-app>
</template>

<script>
import server from '@/server/server'
import navbar from '@/components/navbar'
import fooder from '@/components/footer-view'

export default {
  name: 'App',
  components: {
    navbar,
    fooder
  },
  data () {
    return {
      isLogin: false,
      products: [],
      cart: {
        items: []
      }
    }
  },
  methods: {
    checkUser: function () {
      let token = localStorage.getItem('token')
      if (token) {
        this.isLogin = true
        this.setCart()
      }
    },
    setCart: async function () {
      try {
        let { data } = await server.get('/cart', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        if (data) {
          this.cart = data
        } else {
          this.cart = {
            items: []
          }
        }
      } catch ({ response }) {
        console.log(response)
      }
    },
    logout: async function () {
      localStorage.clear()
      this.isLogin = false
    }
  },
  mounted () {
    this.checkUser()
  }
}
</script>
