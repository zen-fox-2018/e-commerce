<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" :productList="productList" @getCarts="getCarts">Home</router-link> |
      <router-link to="/register" v-if="!token"> Register | </router-link> 
      <router-link to="/login" @resettoken="token = $event" v-if="!token"> Login | </router-link> 
      <a href="#" @click.prevent="logout()" v-if="token">Logout |</a>     

      <router-link to="/cart" v-if="token">Cart |</router-link> 
      <router-link to="/history" v-if="token"> History |</router-link> 
    </div>
    <router-view :productList="productList" :cartList="cartList" :historyList="historyList" :host="host" @getCarts="getCarts" @history="history"/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Main',
  data () {
    return {
      host: "http://localhost:3000",
      shownError: "",
      token: localStorage.getItem("token"),
      productList: [],
      cartList: [],
      grandTotal: 0,
      historyList: [],
    }
  },
  components: {
  },
  methods: {
    logout() {
      localStorage.clear()
      this.token = "" 
    },
    getAllProduct () {
      axios({
        method: 'get',
        url: this.host + '/products'
      })
        .then(({ data }) => {
          this.productList = data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCarts() {
      axios({
        method: "GET",
        url: `${this.host}/carts/undone`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then((response) => {
          this.cartList = response.data[0]
          var grandTotal = 0
          response.data[0].cartItems.forEach(item => {
            grandTotal += item.subTotal
          })
          this.grandTotal = grandTotal
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    history(){
      axios({
        method: "GET",
        url: `${this.host}/carts/undelivered`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((response) => {
        this.historyList = response.data
      })
      .catch((error) => {
        console.log(error.response);
      });
    },
  },
  mounted () {
    this.getAllProduct()
    if(localStorage.getItem('token')) {
      this.getCarts()
      this.history()
    }
  },
}
</script>

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
