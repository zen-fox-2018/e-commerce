<template>
    <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <router-link to="/"><b-navbar-brand>GNDMSTR</b-navbar-brand></router-link>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <!-- <b-nav-item href="#">Shop Now</b-nav-item> -->
                <div class="text-center">
                    <cart v-if="token" :url="url" :userId="userId"></cart>
                </div>
                <div style="display:none">
                    <router-link to="/addproduct">Add Product</router-link>
                </div>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-form>
                    <b-form-input v-model="keyword" size="sm" class="mr-sm-2" type="text" placeholder="Search" style="width: 400px;"/>
                    <b-button @click="search" size="sm" class="my-2 my-sm-0 mr-2" type="submit">Search</b-button>
                </b-nav-form>
                <b-nav-item right v-if="!token">
                    <router-link to="/login" style="color:white">Log In</router-link>
                </b-nav-item>
                <b-nav-item right v-if="!token">
                    <router-link to="/register" style="color:white">Register</router-link>
                </b-nav-item>
                <b-nav-item right v-if="token">
                    <router-link to="/" style="color:white"><button @click="logout">Log Out</button></router-link>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import Cart from '@/components/Cart.vue'

export default {
  name: 'home',
  components: {
    Cart
  },
  props: ['url', 'userId'],
  data() {
      return {
          keyword: '',
          token: localStorage.token
      }
  },
  methods: {
      search() {
          this.$emit('keyword', this.keyword)
      },
      logout() {
          localStorage.clear()
      }
  }
}
</script>

