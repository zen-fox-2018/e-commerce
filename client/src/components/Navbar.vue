<template>
  <nav class="navbar navbar-expand-lg bg-light fixed-top">
    <a class="navbar-brand" href="#">HackSummer</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="user">
      <ul class="navbar-nav mr-auto d-flex justify-content-center text-center">
        <li class="nav-item active">
          <router-link to="/" class="nav-link cart font" href="#">Home</router-link>
        </li>
        <li class="nav-item-active" v-if="user.role != 'admin'">
          <router-link to="/cart" class="nav-link cart font" href="#">Cart<span class="w3-badge w3-right w3-small w3-green"> {{carts.length}} </span></router-link>
        </li>
        <li class="nav-item-active" v-if="user.role != 'admin'">
          <router-link to="/my-transaction" class="nav-link cart font" href="#">Transaction</router-link>
        </li>
        <li class="nav-item-active" v-if="user.role == 'admin'">
          <router-link to="/admin" class="nav-link cart font" href="#">Admin</router-link>
        </li>
      </ul>
    </div>
    <button v-if="!user" @click="showFormLogin" class="w3-button w3-green w3-large">Log In</button>
    <button v-else @click="logout" class="w3-button w3-green w3-large">Log Out</button>
    <form-register :showFormRegister="display.register" @showFormLogin="showFormLogin" />
    <form-login :showFormLogin="display.login" @showFormRegister="showFormRegister" @cekLogin="cekLogin" />
  </nav>
</template>

<script>
import FormRegister from '@/components/FormRegister.vue'
import FormLogin from '@/components/FormLogin.vue'

export default {
  name: 'Navbar',
  props: ['carts', 'user'],
  components: {
    FormRegister,
    FormLogin
  },
  data() {
    return {
      display: {
        login: false,
        register: false
      }
    }
  },
  methods: {
    showFormLogin() {
      let set = this.display.login ? false : true
      this.display.login = set
    },
    showFormRegister() {
      let set = this.display.register ? false : true
      this.display.register = set
    },
    cekLogin() {
      this.$emit('cekLogin')
    },
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      this.cekLogin()
    }
  },
  mounted() {
    console.log(this.user)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Dancing+Script:400,700|Great+Vibes|Pacifico');
  .font {
    font-family: 'Dancing Script', cursive;
    color: hsl(110, 97%, 13%);
    padding: 5px;
    /* background-color: aliceblue; */
  }
  .font:hover {
    color: #92f18a;
  }
  .navbar-brand {
    color: hsl(169, 90%, 42%);
    font-size: 35px;
    font-weight: 400;
    font-family: 'Pacifico', cursive;
  }
  .navbar-nav {
    font-size: 27px;
    font-weight: 900;
    justify-content: space-around;
  }
  nav {
    background-image: url('../assets/image/bg-nav3.jpg');
    width: 100%;
    display: inline-block;
    text-align: center;
    padding: 0;
    list-style: none;
    background-color: #f2f2f2;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc; 
    margin-left: 0px; 
  }
  nav li {
    display: inline-block;
    text-align:center; 
  }
  .cart {
    padding: 5px;
  }
  
</style>


