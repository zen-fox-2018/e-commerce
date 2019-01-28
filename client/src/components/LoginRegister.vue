<template>
  <div class="formuser container">
    <div class="row">
      <div class="col-5 mt-5">
        <img src="../../public/bw.png" alt="Logo Bukawarung">
        <h4>Jual Beli Nyaman dan Menyenangkan</h4>
        <h6>Hanya di Bukawarung</h6>
      </div>
      <div class="col-7">
        <form class="form-signin text-center">
          <img src="" alt="" width="72" height="72">
          <h1 v-if="formLogin" class="login h3 mb-3 font-weight-normal">Login</h1>
          <h1 v-if="!formLogin" class="register h3 mb-3 font-weight-normal">Register for free</h1>
          <input v-if="!formLogin" v-model="name" type="text" id="inputName" class="form-control" placeholder="Name" autofocus>
          <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" autofocus>
          <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password">
          <button v-if="!formLogin" class="btn btn-lg btn-primary btn-block" @click.prevent='register'>Register</button><br>
          <button v-if="formLogin" class="btn btn-lg btn-primary btn-block" @click.prevent='login'>Login</button><br>
          <p>Continue with </p>
          <center>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
          </center>
          <br><br>
          <div v-if="!formLogin" class="register">
            <router-link to="/login">
              <p>Have an Account? <button>Login here</button></p>
            </router-link>
          </div>
          <div v-if="formLogin" class="login">
            <router-link to="/register">
              <p>Don't Have an Account? <button>Register here</button></p>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name:'login-register-form',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      formLogin: false //login or register
    }
  },
  methods: {
    login(){
      let user = {
        email: this.email,
        password: this.password
      }
      api({
        url: '/login',
        method: "POST",
        data: user
      })
        .then( user => {
          console.log(user)
          let token = user.data.token
          localStorage.setItem('token', token)
          localStorage.setItem('role', user.data.role)
          swal({
            title: user.data.message,
            icon: "success",
            timer: 2000
          });
          this.$emit('login')
          this.$router.push('/')
        })
        .catch( error => {
          swal({
            title: error.response.data.message,
            icon: "error",
          });
        })
    },
    register(){
      let self = this
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      api({
        url: '/register',
        method: "POST",
        data: newUser
      })
        .then( user => {
          this.name = '',
          this.email = '',
          this.password = ''
          swal({
            title: user.data.message,
            icon: "success",
            timer: 3000,
          });
        })
        .catch( error => {
          console.log(error.response.data)
          swal({
            title: error.response.data.message,
            icon: "error",
            timer: 3000
          });
        })
    },
    checkStatusForm(){
      let routes = this.$route.params.state
      if(routes === 'login'){
        console.log('lagi login nih')
        // this.$router.push('/login')
        this.formLogin = true
      } else if(routes === 'register'){
        console.log('lagi register nih')
        // this.$router.push('/register')
        this.formLogin = false
      }
    }
  },
  watch: {
    $route(){
      console.log('cek route lagi dong')
      this.checkStatusForm()
    }
  },
  created(){
    this.checkStatusForm()
  }

}
</script>

<style>
.formuser{
  margin-top: 10%;
}
</style>
