<template>
  <div>
    <Navbar :cart="cart" :statusLogin="statusLogin" @gohome="gohome" @search="search" @logout="logout" @login="login"></Navbar>
    <router-view @addcart="addcart" @deletefromcart="deletefromcart" @changequantity="changequantity"></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import api from '@/api/api.js'

export default {
  name: 'views-details',
  props:['statusLogin'],
  components: {
    Navbar
  },
  data(){
    return {
      cart: []
    }
  },
  methods: {
    getMyCart(){
      api
        .get('/cart', {
          headers: {
            token : localStorage.getItem('token')
          }
        })
        .then( ({data}) => {
          console.log('data di details.vue', data)
          this.cart = data
          console.log(this.cart)
        })
        .catch( error => {
          console.log(error)
        })
    },
    addcart(product){
      this.getMyCart()
      // this.cart.push(product)
    },
    deletefromcart(index){
      this.cart.splice(index,1)
    },
    changequantity(){
      this.getMyCart()
    },
    gohome(){
      this.$router.push('/')
    },
    search(data) {
      this.$router.push(`/?name=${data.name}`)
    },
    logout(){
      localStorage.clear()
      this.getMyCart()
      this.$emit('logout')
      this.$router.push('/')
    },

    login(){
      this.$emit('login')
      this.$router.push('/')
    }
  },
  created(){
    this.getMyCart()
  }
}
</script>
