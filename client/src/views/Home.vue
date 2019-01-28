<template>
  <div class="home">
    <v-layout row>
      <v-flex xs12 sm12 md12 lg12>
        <NavbarLogout v-if="!isLogin"></NavbarLogout>
        <NavbarAdmin v-if="isLogin && user.role === 'Admin'" @check-logout-admin="checkLogout"></NavbarAdmin>
        <Navbar v-if="isLogin && user.role === 'Customer'" @check-logout="checkLogout" :carts="carts" @remove-item="getUpdatedCart" @trigger-cart="getCart" :total="total" @trigger-remove="getCart" :user="user"></Navbar>
      </v-flex>
    </v-layout>

    <Carousel></Carousel>
    <v-snackbar
      v-model="get.snackbar"
      :timeout="timeout"
      :top="y"
      :color="get.color"
      >
      <v-icon>
      {{get.icon}}
      </v-icon>
      {{ get.message }}
      <v-btn
          color="white"
          flat
          @click="get.snackbar = false"
      >
          Close
      </v-btn>
    </v-snackbar>

    <v-snackbar
      v-model="itemNotif.snackbar"
      :timeout="timeout"
      :top="y"
      :color="itemNotif.color"
      >
      <v-icon>
      {{itemNotif.icon}}
      </v-icon>
      {{ itemNotif.message }}
      <v-btn
          color="white"
          flat
          @click="itemNotif.snackbar = false"
      >
          Close
      </v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="regis.snackbar"
      :timeout="timeout"
      :top="y"
      :color="regis.color"
      >
      <v-icon>
      {{regis.icon}}
      </v-icon>
      {{ regis.message }}
      <v-btn
          color="white"
          flat
          @click="regis.snackbar = false"
      >
          Close
      </v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="deleteNotif.snackbar"
      :timeout="timeout"
      :top="y"
      :color="deleteNotif.color"
      >
      <v-icon>
      {{deleteNotif.icon}}
      </v-icon>
      {{ deleteNotif.message }}
      <v-btn
          color="white"
          flat
          @click="deleteNotif.snackbar = false"
      >
          Close
      </v-btn>
    </v-snackbar>
 
 <v-parallax
    dark
    src="https://d23x6d9cx8qezf.cloudfront.net/wp-content/uploads/2018/04/Gronefeld-Parallax-tremblage-0675.jpg"
  >
   
      <router-view @check-login="checkLogin" @is-login="checkUser" :products="products" :timing="timing" :fetched="fetched" @get-item="getItems" :cartDetail="carts" @is-register="checkRegister" @trigger-get="getCart" :total="total" @increment-item="getIncrement" @trigger-inc="getCart" :totalPrice="totalPrice" @decrement-item="getDecrement" @trigger-dec="getCart" @delete-carts="getDeleted" @trigger-delete="getCart" :username="user.name"></router-view>
  </v-parallax>
    
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import LoginPage from '@/components/LoginForm.vue'
import RegisterPage from '@/components/RegisterForm.vue'
import Carousel from '@/components/Carousel.vue'
import ListProduct from '@/components/Listproduct.vue'
import NavbarLogout from '@/components/NavbarLogout.vue'
import NavbarAdmin from '@/components/NavbarAdmin.vue'
import Footer from '@/components/Footer.vue'
import CartDetail from '@/components/CartDetail.vue'
import History from '@/components/History.vue'
import Admin from '@/components/Admin.vue'

export default {
  name: 'home',
  data () {
    return {
      isLogin: false,
      user: {},
      y: 'top',
      timeout: 5000,
      get: {},
      products: [],
      interval: {},
      timing: 0,
      fetched: false,
      itemNotif: {},
      deleteNotif: {},
      carts: [],
      regis: {},
      status: false,
      total: 0,
      totalPrice: 0
    }
  },
  beforeDestroy () {
      clearInterval(this.interval)
  },
  watch: {
    isLogin: function(val) {
        this.checkUser()
    },
    status: function (val) {
        this.checkUser()
    }
  },
  created () {
    this.getCart()
    this.getItems()
  },
  mounted () {
    this.getProducts()
    this.getCart()
    this.getItems()
    if(localStorage.getItem('token')) {
      this.checkUser()
    }
  },
  computed: {
    count () {
      this.getItems()
      this.total
    }
  },
  components: {
    Navbar,
    LoginPage,
    RegisterPage,
    Carousel,
    ListProduct,
    NavbarLogout,
    Footer,
    CartDetail,
    History,
    Admin,
    NavbarAdmin
  },
  methods: {
    checkLogin: function (val) {
      this.isLogin = val.status
      this.get = {...val}
    },
    checkRegister: function (val) {
      this.regis = {...val}
    },
    checkUser: function () {
      this.$axios({
        method: `GET`,
        url: `${url}/users`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        if(data._id) {
          this.isLogin = true
          this.user = data
          this.getCart()
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    checkLogout: function () {
      this.isLogin = false
      this.user = {}
      this.checkUser()
    },
    getProducts: function () {
      this.$axios({
        method: `GET`,
        url: `${url}/products`
      })
      .then(({ data }) => {
        this.loading(data)
        this.products = data
      })
      .catch(err => {
        console.log(err)
      })
    },
    getCart: function () {
      this.$axios({
        method: `GET`,
        url: `${url}/carts`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        let totalQty = 0
        let priceTotal = 0
        this.carts.forEach(val => {
          totalQty+= val.qty
          priceTotal+= val.totalPrice
        })
        this.total = totalQty
        this.totalPrice = priceTotal
        this.carts = data
      })
      .catch(err => {
        console.log(err)
      })
    },
    loading: function (products) {
      this.interval = setInterval(() => {
        if (this.timing === 100) {
          this.fetched = true
          this.timing = 0
        }
        this.timing += 10
      }, 1500)
    },
    getItems: function (val) {
      if (val) {
        this.carts = val.item
        this.itemNotif = val.notification
      }
    },
    getIncrement: function (val) {
      if (val) {
        this.carts = val.item
        this.itemNotif = val.notification
      }
    },
    getDecrement: function (val) {
      if (val) {
        this.carts = val
      }
    },
    getDeleted: function (val) {
      if (val) {
        this.deleteNotif = val.notification
        this.getCart()
      }
    },
    getUpdatedCart: function (val) {
      console.log(val)
      if(val) {
        this.carts = val
      }
    },
  }
}
</script>
