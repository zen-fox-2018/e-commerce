<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <navbar :token="token" :host="host" @resettoken="token = $event"></navbar>
       <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" v-if="!token">
            <a class="nav-link" href="#" data-toggle="modal" data-target="#registermodal">Sign Up</a>
          </li>
          <li class="nav-item active" v-if="!token">
            <a class="nav-link" href="#" data-toggle="modal" data-target="#loginmodal">Login</a>
          </li>
          <li class="nav-item active" v-if="token">
            <a href="#">Logout</a>
          </li>
        </ul>
      </div>
      <Register :host="host"></Register>
      <Login @resettoken="token = $event" :host="host"></Login>

      <router-link to="/cart">Cart</router-link> |
      <router-link to="/history">History</router-link> |
      <!-- <router-link to="/cart">Cart</router-link> -->
    </div>
    <router-view :productList="productList" />
  </div>
</template>

<script>
import axios from 'axios'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'Main',
  data () {
    return {
      host: "http://localhost:3000",
      shownError: "",
      localStorageToken: localStorage.getItem("token"),
      productList: []
    }
  },
  components: {
    Register,
    Login
  },
  methods: {
    removeToken() {
      localStorage.clear()
      this.localStorageToken = ""
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
    addCart(param){
      if(!localStorage.getItem("cartId")){
          axios({
            method: "POST",
            url: `${this.host}/carts`,
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(response => {
            localStorage.setItem("cartId", response.data._id)
          })
          .then(() => {
            this.updateInc(param)
          })
          .catch(err => {
            console.log(err.response);
          })
      } else {
        this.updateInc(param)
      }
    },
    updateInc(param) {
      axios({
        method: "PUT",
        url: `${this.host}/carts/inc/${localStorage.getItem("cartId")}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          itemId: param._id,
          increasePrice: param.price
        }
      })
        .then(result => {
          this.getCarts()
        })
        .catch(err => {
          console.log(err.response)
        })
    },
  updateCart(param) {
    axios({
      method: "PUT",
      url: `${this.host}/carts/${localStorage.getItem("cartId")}`,
      data: {
        itemId: param._id._id,
        quantity: Number(param.quantity),
        subTotal: ( Number(param.quantity) * Number(param._id.price) )
      },
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(result => {
        this.getCarts()
      })
      .catch(err => {
        console.log(err.response)
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
  deleteCartItem(param) {
    axios({
      method: "PUT",
      url: `${this.host}/carts/del/${localStorage.getItem("cartId")}`,
      data: {
        itemId: param._id._id
      },
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then((response) => {
        this.getCarts()
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  checkOut() {
      axios({
        method: "PUT",
        url: `${this.host}/carts/checkout/${localStorage.getItem("cartId")}`,
        data: {
          grandTotal: this.grandTotal
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(result => {
        localStorage.removeItem("cartId")
        axios({
          method: "POST",
          url: `${this.host}/carts`,
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(response => {
          localStorage.setItem("cartId", response.data._id)
          this.getCarts()
          this.history()
        })
        .catch(err => {
          console.log(err.response)
        })
      })
      .catch(err => {
        console.log(err.response)
      })
  },
  history(){
      axios({
        method: "GET",
        url: `${this.host}/carts/done`,
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
  }
  },
  mounted () {
    this.getAllProduct()
    if(localStorage.getItem("token")) {
      this.getCarts()
      this.history()
    }
  }
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
