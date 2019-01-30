<template>
  <div id="app">
    <Navbar :url="url" :userId="userId" @keyword="keyword"></Navbar>
    <router-view :url="url" :userId="userId" :keyword="keyword"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import jwt from 'jsonwebtoken'

export default {
  data() {
    return {
      url: 'http://localhost:3000',
      userId: '',
      searchKey: ''
    }
  },
  components : {
    Navbar,
  },
  methods: {
    keyword(value) {
      this.searchKey = value
    }
  },
  created() {
    this.userId = jwt.decode(localStorage.token).id
  },
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #000000;
}

#nav a {
  font-weight: bold;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
