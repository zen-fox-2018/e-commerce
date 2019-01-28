<template>
  <v-toolbar dark color="#C7374A">
    <v-toolbar-title>
      <router-link to="/" class="white--text font-weight-bold display-1 mr-4">
        PakMan
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <MenuCategories></MenuCategories>
    </v-toolbar-items>
    <v-toolbar-items>
      <MenuSearch></MenuSearch>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <MenuCart  v-if="token" :cart="cart" :token="token" @checkout="checkout"></MenuCart>
      <v-btn flat to="/register" class="white--text font-weight-bold" v-if="!token">
        Register
      </v-btn>
      <v-btn flat class="white--text font-weight-bold" v-if="token" @click="logoutSuccess">
        logout
      </v-btn>
      <MenuLogin v-if="!token" @login-success="loginSuccess"></MenuLogin>
    </v-toolbar-items>
  </v-toolbar>
</template>

<style>
a {
  text-decoration: none;
}

.v-btn__content {
  color: white;
}
</style>

<script>
import MenuLogin from '@/components/MenuLogin.vue'
import MenuCart from '@/components/MenuCart.vue'
import MenuCategories from '@/components/MenuCategories.vue'
import MenuSearch from '@/components/MenuSearch.vue'

export default {
  props: ['token', 'cart'],
  components: {
    MenuLogin,
    MenuCart,
    MenuCategories,
    MenuSearch
  },
  data () {
    return {
    }
  },
  methods: {
    loginSuccess() {
      this.$emit('action-login')
    },
    logoutSuccess() {
      this.$emit('action-login', 'logout')
    },
    checkout () {
      this.$emit('checkout')
    }
  }
}
</script>
