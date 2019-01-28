<template>
  <div class="home">
    <Nav :key="navkey" @checkout="checkout"></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'

export default {
  name: 'home',
  components: {
    Nav
  },
  data() {
    return {
      navkey : this.$route.path
    }
  },
  mounted (){

  },
  methods: {
    checkout() {
      this.$router.push('/home/cart');
    },
  }
  
}
</script>
