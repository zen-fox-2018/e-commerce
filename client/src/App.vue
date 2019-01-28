<template>
  <div id="app">
    <!-- <div id="nav"> -->
      <!-- <Navbar></Navbar> -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <!-- </div> -->
    <router-view :statusLogin="statusLogin" @logout="logout" @login="login" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: 'app',
  components: {
    Navbar
  },
  data(){
    return {
      statusLogin: false
    }
  },
  methods: {
    //notes
    //checkLoginnya ganti !!!, request ke server, pastikan token valid
    checkLogin(){
      if(localStorage.getItem('token')){
        this.statusLogin = true
      } else {
        this.statusLogin = false
      }
    },
    login(){
      this.checkLogin()
    },
    logout(){
      localStorage.clear()
      this.checkLogin()
    }
  },
  created(){
    this.checkLogin()
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
