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
                                <Cart> </Cart>
                                <md-button class="md-primary float-right">Checkout <md-icon> payment </md-icon></md-button>
                            </div>
                        </b-dropdown>
                        <b-dropdown right variant="link" size="lg" no-caret>
                            <template slot="button-content">
                            <i class="fas fa-user nav-icon"></i><span class="sr-only">Search</span>
                            </template>
                            <span v-if="isLogin">
                                <b-dropdown-item href="#">Profile </b-dropdown-item>
                                <b-dropdown-item @click.prevent="handleLogout"  href="#">Logout </b-dropdown-item>
                            </span>
                            <span v-else>
                                <b-dropdown-item @click.prevent="showLoginModal" v-b-modal.loginModal href="#">Login </b-dropdown-item>
                                <b-dropdown-item @click.prevent="showRegisterModal" v-b-modal.registerModal href="#">Register</b-dropdown-item>
                            </span>
                        </b-dropdown>
                    </b-navbar-nav>
                </b-collapse>
        </b-navbar>
        <LoginModal @showModalRegister="showRegisterModal" ref="loginModal"> </LoginModal>
        <RegisterModal ref="registerModal"> </RegisterModal>
        <Snackbar> </Snackbar>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from '@/scripts/axios.js'
import Cart from '@/components/CartNav.vue'
import LoginModal from '@/components/LoginModal.vue'
import RegisterModal from '@/components/RegisterModal.vue'
import Snackbar from '@/components/RegisterSnackbar.vue'

export default {
  name: 'navbar',
  mounted() {
      this.checkToken()
  },
  components: {
    LoginModal,
    RegisterModal,
    Snackbar,
    Cart
  },
  data () {
    return {
        snackbar: false,
    }
  },
  computed: {
    ...mapState([
        'isLogin'
    ])
  },
  methods: {
      ...mapActions([
        'checkToken',
        'doLogout',
        'showRegisterModal',
        'showLoginModal'
      ]),
      handleLogout(){
          this.doLogout()
      },
      showRegisterModal () {
          this.$refs.registerModal.show()
      }
  },
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
