<template>
  <v-app>
    <v-toolbar dark color='black'>
      <h1 @click="toHome">51Kards</h1>
      <v-btn flat @click="toHome">Home</v-btn>
      <v-btn flat @click="toAbout">About</v-btn>
      <v-btn v-if="isAdmin" flat @click="toAdmin">Admin Panel</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="isLogin == false" flat @click="toLogin">Log-in</v-btn>
        <v-btn v-if="isLogin" flat @click="logOut">Log-out</v-btn>
        <v-btn v-if="isLogin == false" flat @click="toRegister">Register</v-btn>
        <v-btn flat @click="toProducts">All Products</v-btn>
        <v-btn v-if="isLogin" flat @click="toCart">Cart</v-btn>
        <v-btn v-if="isLogin" flat @click="toTransaction">Transaction</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view :isLogin="isLogin" :url="url" @user-login="userLogin" @admin-login="adminLogin"></router-view>
    </v-content>
    <v-footer
      dark
      height="auto"
    >
      <v-card
        flat
        tile
        class="lighten-1 white--text text-xs-center"
        color='black'
      >
        <v-card-text>
          <h1>51Kards</h1>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          We manufacture many of our own magic supplies, tricks, effects, and custom playing cards. We strive to create the very best magical products the world has ever seen. We work with the United States Playing Card co and have produced 14 lines of playing card decks that are repeatedly acclaimed by top industry pros and magic enthusiasts all over the world.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          &copy;2018 — <strong>51Kards</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      isLogin: false,
      isAdmin: false,
      url: 'https://51kards-server.patriagani.site',
    }
  },
  methods: {
    adminLogin() {
      axios.post(`${this.url}/users/admincheck`, {token: localStorage.getItem('token')})
        .then((response) => {
          if (response.data.admin) {
            this.isAdmin = true
          }
        })
        .catch((error) => {
          console.log(error.message);
        })
    },
    toHome() {
      this.$router.push('/')
    },
    toCart() {
      this.$router.push('/cart')
    },
    toTransaction() {
      this.$router.push('/transactions')
    },
    toAdmin() {
      this.$router.push('/admin')
    },
    toAbout() {
      this.$router.push('/about')
    },
    toProducts() {
      this.$router.push('/products')
    },
    userLogin() {
      this.isLogin = true
    },
    toLogin() {
      this.$router.push(`/login`)
    },
    toRegister() {
      this.$router.push(`/register`)
    },
    logOut() {
      localStorage.clear()
      this.isLogin = false
      this.isAdmin = false
      this.$router.push(`/`)
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    }
    axios.post(`${this.url}/users/admincheck`, {token: localStorage.getItem('token')})
      .then((response) => {
        if (response.data.admin) {
          this.isAdmin = true
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
  }
}
</script>
