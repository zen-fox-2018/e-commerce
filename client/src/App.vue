<template>
  <div id="app" class="bg-light">
      <navbar :user="user" @search="sendQuery" :total="totalProducts" :cartList="cartList"/>
      <router-view :user="user" @login="setUser" :query="query" :cartList="cartList" @allProduct="products" :allProducts="allProducts"/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>

var socket = io.connect('http://localhost:3000')
import navbar from '@/components/navbar.vue'
import jwt from 'jsonwebtoken'

export default {
  name: 'all',
  components: {
    navbar,
  },
  data () {
    return {
      user: {},
      cartList: [],
      totalProducts: 0,
      allProducts: [],
      query: '',
      isLogin: false
    }
  },
  methods: {
    getCart () {
      let userId = jwt.decode(localStorage.token).id
      // console.log(userId, 'ini userid')
       axios({
            method: 'get',
            url: `http://localhost:3000/carts/${userId}`
        })
        .then(resp => {
          console.log('masuk  get cart socket')
            this.cartList = resp.data.data
            this.totalProducts = 0
            this.cartList.forEach(element => {
              this.totalProducts += Number(element.qty)
            });
        })
        .catch(err => {
            console.log(err.response)
        })
    },
    products (productList) {
      this.allProducts = []
      this.allProducts = productList
    },
    sendQuery (q) {
      this.query = q
    },
    setUser (user) {
      this.user = user
    },
    getUser () {
      let userId = jwt.decode(localStorage.token).id
      axios({
        method: 'get',
        url: `http://localhost:3000/users/${userId}`
      }) 
      .then(resp => {
        this.user = resp.data.data
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  },
  created () {
    if (localStorage.token) {
      this.getUser()
    } else {
      this.user = {}
    }
  },
  watch: {
    user (val) {
      if (val) {
        this.getCart()
        socket.on('cart-change', () => {
          this.cart = []
          this.getCart()
        })
      }
    },
    query (val) {
      if (val) {
        return val
      }
    }
  }
}
</script>
