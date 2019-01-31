<template>
    <v-toolbar app color="warning" clipped-left>
      <v-toolbar-title class="headline text-uppercase">
        <span>BliBa</span>
        <span class="font-weight-light">Easy Shop</span>
      </v-toolbar-title>

       <router-link to="/">
          <v-btn flat>
            Home
          </v-btn>
        </router-link>

        <router-link to="/products" v-if="isLogin">
          <v-btn flat>
            Product
          </v-btn>
        </router-link>


      <v-spacer></v-spacer>
      <v-toolbar-items>
        <login v-if="isNotLogin" @checkLogin="checkLogin" />
        <register v-if="isNotLogin"/>

          <v-btn flat to="/checkout" v-if="isLogin">
            Checkout
          </v-btn>

        <v-btn
        flat
        color="brown"
        dark
        @click.prevent="logout"
        v-if="isLogin"
        >
            Log Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
    name: 'navbar',
    components: {
        Login,
        Register
    },
    props: ['isLogin', 'isNotLogin'],
    methods: {
      checkLogin () {
        this.$emit('checkLogin')
      },
      logout () {
        localStorage.removeItem('token')
        this.$emit('checkLogin')
      }
    },
}
</script>

<style>

</style>
