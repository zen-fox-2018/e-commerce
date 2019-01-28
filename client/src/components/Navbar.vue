<template>
    <div>
        <b-navbar class="border-bottom fixed-top" style="background-color: #fff;" id="navbar" toggleable>
            <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
                <b-navbar-brand to="/"> <img src="../assets/brand.png" class="nav-image"> </b-navbar-brand>
                <b-collapse is-nav id="nav_dropdown_collapse">
                    <b-navbar-nav class="navbar-nav ml-auto">
                        <b-nav-item href="#" active>T-SHIRT</b-nav-item>
                        <b-nav-item href="#" active>HODIE</b-nav-item>
                        <b-nav-item href="#" active>SHOES</b-nav-item>
                        <b-nav-item href="#" active>STICKER</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-dropdown right variant="link" size="lg" no-caret>
                            <template slot="button-content">
                                <i class="fas fa-cart-plus nav-icon"></i><span class="sr-only">Cart</span>
                            </template>
                            <div class="cart-nav">
                                <h5>
                                    <b> Daftar Belanjaan Bray! </b>
                                </h5>
                                <div style="overflow:auto; max-height: 18em;">
                                    <md-card>
                                        <md-card-header>
                                            <md-card-header-text>
                                                <div class="md-subhead">
                                                    Nama Produk <br>
                                                    Price : Harga <br>
                                                    Qty : Jumlah <br>
                                                    <span style="cursor : pointer;"> <u> remove </u> </span>
                                                </div>
                                            </md-card-header-text>

                                            <md-card-media>
                                                <img src="https://vuematerial.io/assets/examples/avatar-2.jpg" alt="People">
                                            </md-card-media>
                                        </md-card-header>
                                    </md-card>
                                    <md-card>
                                        <md-card-header>
                                            <md-card-header-text>
                                                <div class="md-subhead">
                                                    Nama Produk <br>
                                                    Price : Harga <br>
                                                    Qty : Jumlah <br>
                                                    <span style="cursor : pointer;"> <u> remove </u> </span>
                                                </div>
                                            </md-card-header-text>

                                            <md-card-media>
                                                <img src="https://vuematerial.io/assets/examples/avatar-2.jpg" alt="People">
                                            </md-card-media>
                                        </md-card-header>
                                    </md-card>
                                    <md-card>
                                        <md-card-header>
                                            <md-card-header-text>
                                                <div class="md-subhead">
                                                    Nama Produk <br>
                                                    Price : Harga <br>
                                                    Qty : Jumlah <br>
                                                    <span style="cursor : pointer;"> <u> remove </u> </span>
                                                </div>
                                            </md-card-header-text>

                                            <md-card-media>
                                                <img src="https://vuematerial.io/assets/examples/avatar-2.jpg" alt="People">
                                            </md-card-media>
                                        </md-card-header>
                                    </md-card>  
                                </div>
                            </div>
                        </b-dropdown>
                        <b-dropdown right variant="link" size="lg" no-caret>
                            <template slot="button-content">
                            <i class="fas fa-user nav-icon"></i><span class="sr-only">Search</span>
                            </template>
                            <b-dropdown-item v-b-modal.loginModal href="#">Login </b-dropdown-item>
                            <b-dropdown-item v-b-modal.registerModal href="#">Register</b-dropdown-item>
                        </b-dropdown>
                    </b-navbar-nav>
                </b-collapse>
        </b-navbar>
        <b-modal id="loginModal"
                    ref="loginModal"
                    title="Hi! Login yuk"
                    @shown="clearForm">
            <form @submit.prevent="handleLogin" id="loginForm">
                <b-form-input class="my-2"
                            type="email"
                            placeholder="Enter your email"
                            v-model="login.email"
                            required></b-form-input>
                <b-form-input class="my-2"
                            type="password"
                            placeholder="Enter your password"
                            v-model="login.password"
                            required></b-form-input>
            </form>
            <div slot="modal-footer" class="w-100">
                <b-btn class="float-right" variant="primary" @submit.prevent="handleLogin" type="submit" form="loginForm">
                    Login
                </b-btn>
            </div>
        </b-modal>
        <b-modal id="registerModal"
                    ref="registerModal"
                    title="Hi! Daftar yuk"
                    @shown="clearForm">
            <form @submit.prevent="handleRegister" id="registerForm">
                <b-form-input class="my-2"
                            type="email"
                            placeholder="Enter your email"
                            v-model="register.email"
                            required></b-form-input>
                <b-form-input class="my-2"
                            type="password"
                            placeholder="Enter your password"
                            v-model="register.password"
                            required></b-form-input>
                <b-form-input class="my-2"
                            type="text"
                            placeholder="Enter your first name"
                            v-model="register.firstName"
                            required></b-form-input>
                <b-form-input class="my-2"
                            type="text"
                            placeholder="Enter your last name"
                            v-model="register.lastName"
                            ></b-form-input>
            </form>
            <div slot="modal-footer" class="w-100">
                <b-btn class="float-right" variant="primary" @submit.prevent="handleRegister" type="submit" form="registerForm">
                    Register
                </b-btn>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from '@/scripts/axios.js'
export default {
  name: 'navbar',
  data () {
    return {
        login: {
            email: '',
            password: ''
        },
        register: {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }
  },
  methods: {
    clearForm () {
      this.login.email = ''
      this.login.password = ''
    },
    handleLogin () {
        axios.post('/login', this.login)
        .then(({data}) => {
            console.log(data,"===========")
            this.clearForm()
            this.$refs.loginModal.hide()
        })
        .catch(({response :{data}}) => {
            console.log(data.message)
        })
    },
    handleRegister () {
        axios.post('/register', this.register)
        .then(({data}) => {
            console.log(data,"===========")
            this.clearForm()
            this.$refs.registerModal.hide()
        })
        .catch(({response :{data}}) => {
            console.log(data.message)
        })
    }
  }
}
</script>

<style>
.nav-icon {
    color:rgb(34, 38, 41);
} 
.nav-image {
    max-width: 150px;
}
.navbar-nav {
    font-family: 'Acme', sans-serif;
    color:rgb(34, 38, 41);
}
.cart-nav {
    padding: 15px; width: 300px;
    font-family: 'Source Sans Pro', sans-serif;
}
</style>
