<template>
  <div class="mynavbar">
    <b-navbar toggleable="md" type="dark" variant="danger" class="fixed-top">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <router-link to="/">
        <b-navbar-brand @click="gohome"> BukaWarung </b-navbar-brand>
      </router-link>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-dropdown variant="danger" size="md" no-caret>
            <template slot="button-content">
              <i class="fas fa-list-ul"> Category</i>
            </template>
            <b-dropdown-item v-for="category in categories" :key="category._id" @click.prevent="byCategory(category._id)">{{category.name}}</b-dropdown-item>
          </b-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="mr-5" @submit.prevent="search">
            <b-form-input v-model="name" size="sm" class="mr-sm-2 searchbar" type="text" placeholder="Search Produk"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <Cart class="mr-5" :cart="cart"></Cart>
          <div v-if="!statusLogin">
            <b-btn @click="modalLogin = !modalLogin" size="sm" variant="secondary" class="mr-2">SignIn</b-btn>
            <router-link to="/register">
              <b-button size="sm" variant="primary">Register</b-button>
            </router-link>
          </div>
          <div>
            <b-nav-item-dropdown right v-if="statusLogin">
              <template slot="button-content">
                <i class="fas fa-user"> User</i>
              </template>
              <b-dropdown-item href="#" v-if="isAdmin">
                <router-link :to="'/admin'">
                  Admin
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item href="#">
                <router-link :to="'/details/order-list'">
                  Profile
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item href="#" @click="logout">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
        </b-navbar-nav>
      </b-collapse>
      <b-modal v-model="modalLogin" hide-footer title="Login">
        <b-form @submit.prevent='login' class="form">
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Email:</label>
            <input type="email" class="form-control" v-model='loginForm.email'>
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Password:</label>
            <input type="password" class="form-control" v-model='loginForm.password'>
          </div>
          <b-button type="b-button" class="btn btn-primary">Login</b-button>
        </b-form>
      </b-modal>
    </b-navbar>
  </div>
</template>

<script>
import Cart from '@/components/Cart.vue'
import api from '@/api/api.js'

export default {
  name: 'navbar',
  props: ['cart', 'statusLogin'],
  components: {
    Cart
  },
  data(){
    return {
      loginForm: {
        email: '',
        password: ''
      },
      listcart: [],
      name: '',
      modalLogin: false,
      categories: [],
      isAdmin: false
    }
  },
  methods:{
    gohome(){
      this.$emit('gohome')
    },
    search(){
      this.$router.push(`/?name=${this.name}`)
      this.name = ''
    },
    login(){
      let user = {
        email: this.loginForm.email,
        password: this.loginForm.password
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
          this.checkRole()
          this.loginForm = { name:"", password: "" }
        })
        .catch( error => {
          swal({
            title: error.response.data.message,
            icon: "error",
          });
        })
    },

    logout(){
      localStorage.clear()
      this.$emit('logout')
      this.checkRole()
    },

    showCategory() {
      api({
        url: "/categories",
        headers: {
          token: localStorage.token
        }
      })        
        .then(({data}) => {
          this.categories = data;
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    checkRole(){
      if(localStorage.getItem('role') === 'Admin'){
        this.isAdmin = true
      } else {
        this.isAdmin = false
      }
    },

    byCategory(categoryId){
      this.$router.push(`/?category=${categoryId}`)
    }
  },
  created(){
    this.showCategory()
    this.checkRole()
  }
}
</script>

<style>
.searchbar {
  /* width: 50%; */
  /* padding-right: 100px; */
  text-align: left;
}

.form{
  text-align: left;
}

.mynavbar{
  margin-bottom: 6%;
}
</style>
