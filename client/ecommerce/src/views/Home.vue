<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ProductList :productList="productList"></ProductList>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ProductList from '@/components/ProductList.vue'

export default {
  name: 'home',
  props:['productList'],
  data() {
    return {

    }
  },
  components: {
    HelloWorld,
    ProductList
  }
}
</script>
