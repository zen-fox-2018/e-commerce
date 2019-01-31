<template>
  <v-app>
    <Navbar @checkLogin="checkLogin" :isLogin="status.isLogin" :isNotLogin="status.isNotLogin" />

    <v-content>
      <router-view :isLogin="status.isLogin" :isNotLogin="status.isNotLogin" />
    </v-content>

    <Footer/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
       status: {
          isLogin : false,
          isNotLogin: true
        }
    }
  },
  methods: {
    checkLogin() {
      let token = localStorage.getItem('token')
      if(token) {
        this.status.isLogin = true,
        this.status.isNotLogin = false
      } else {
        this.status.isLogin = false,
        this.status.isNotLogin = true
      }
    }
  },
  created() {
    this.checkLogin()
  },
}
</script>
