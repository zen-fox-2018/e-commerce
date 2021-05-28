<template>
  <div class="home">
    <Cart v-if="this.$route.fullPath == '/transaction'" :cartList="cartList" :host="host" @getCarts="getCarts"></Cart>
    <router-link to="/cart" v-if="token"> Cart |</router-link> 
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Cart from '@/views/Cart.vue'
import History from '@/views/History.vue'

export default {
  name: 'home',
  props:['host', 'historyList', 'cartList', 'host', 'token'],
  data() {
    return {

    }
  },
  methods: {
    history() {
      this.$emit("history")
    },
    getCarts() {
      this.$emit("getCarts")
    }
  },
  components: {
    Cart,
    History
  }
}
</script>
