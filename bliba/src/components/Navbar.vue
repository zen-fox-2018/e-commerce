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

        <router-link to="/products">
          <v-btn flat>
            Product
          </v-btn>
        </router-link>

        <router-link to="/checkout">
          <v-btn flat>
            Checkout
          </v-btn>
        </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <login/>
        <register/>
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
}
</script>

<style>

</style>
