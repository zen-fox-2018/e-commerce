<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ProductList :products="productList" :host="host" @getCarts="getCarts"></ProductList>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ProductList from '@/components/ProductList.vue'

export default {
  name: 'home',
  props:['productList', 'host'],
  data() {
    return {

    }
  },
  methods: {
    getCarts() {
      this.$emit("getCarts")
    }
  },
  components: {
    HelloWorld,
    ProductList
  }
}
</script>
