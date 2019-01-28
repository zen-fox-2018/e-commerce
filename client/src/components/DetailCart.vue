<template>
    <div class="container detailcart">
      <div class="row">
        <div class="col-8">
            <b-card style="width: 40rem; height: 10rem;" v-for="(item, index) in cart" :key="item._id">
              <div class="card-text">
                <div class="row">
                  <div class="col-4">
                    <img src="https://static.myfigurecollection.net/pics/figure/big/706583.jpg" width="80" height="80" alt="">
                  </div>
                  <div class="col-5">
                    <router-link :to="`/details/${item.productId._id}`">
                      <div class="row"><p>{{item.productId.name}}</p></div>
                    </router-link>
                    <div class="row"><p>Rp {{formatPrice(item.productId.price)}}</p></div>
                  </div>
                  <div class="col-3">
                    <a href="#" class="row mr-auto float-right">
                      <i @click="deleted(index, item._id)" class="fas fa-trash-alt"></i>
                    </a>
                    <div class="row mt-5">
                      <a href="#" @click.prevent="decrease(item._id)"><i class="fas fa-minus-circle fa-2x"></i></a>
                      <h3 class="mr-3 ml-3"> {{item.quantity}} </h3>
                      <a href="#" @click.prevent="increase(item._id)"><i class="fas fa-plus-circle fa-2x"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </b-card>
        </div>
        <div class="col-4">
          <b-card title="Ringkasan Belanja" style="width: 20rem">
            <hr>
            <p class="card-text float-left"> Total Harga </p>
            <p class="float-right"> {{total}} </p>
            <br><br>
            <hr>
            <b-button variant="warning" @click.prevent="checkout">Checkout</b-button>
          </b-card>
        </div>
      </div>    
    </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name: 'detailcart',
  data(){
    return {
      cart: [{
        productId: {
          price: 0,
          quantity: 1
        }
      }],
      quantity: 1
    }
  },
  methods: {
    getDetailsCart(){
      api({
        url: `/cart`,
        method: "GET",
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then( ({data}) => {
        console.log(data)
        this.cart = data
      })
      .catch( error => {
        console.log(error.response)
      })
    },
    formatPrice(price){
      return price.toLocaleString(['ban', 'id']);
    },
    increase(cartId){
      api({
        url: `/cart/${cartId}/plus`,
        method: "PUT",
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.$emit('changequantity')
        this.getDetailsCart()
      })
      .catch( error => {
        console.log(error.response)
      })
    },
    decrease(cartId){
      api({
        url: `/cart/${cartId}/minus`,
        method: "PUT",
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.$emit('changequantity')
        this.getDetailsCart()
      })
      .catch( error => {
        console.log(error.response)
      })
    },
    deleted(idx, cartId){
      console.log(idx, cartId)
      api({
        url: `/cart/${cartId}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then( data => {
        this.$emit('deletefromcart', idx)
        this.getDetailsCart()
      })
      .catch( error => {
        console.log(error.response)
      })
    },
    checkout(){
      console.log('checkout gan')
      this.$router.push('/details/payment')
      // let productId = this.cart.map(function(e){
      //   return e.productId._id
      // })
      // api({
      //   url: `/transcations`,
      //   method: "POST",
      //   data: productId,
      //   headers: {
      //     token: localStorage.getItem('token')   
      //   }
      // })
      // .then(({data}) => {
      //   console.log(data)
      //   this.getDetailsCart()
      // })
      // .catch( error => {
      //   console.log(error.response)
      // })
    }
  },
  created() {
    this.getDetailsCart()
  },
  computed:{
    total(){
      let sum = 0
      this.cart.forEach(e => {
        sum += (e.quantity * e.productId.price)
      });
      return sum
    }
  }
}
</script>

<style>

.detailcart{
  margin-top: 8%;
}
</style>
