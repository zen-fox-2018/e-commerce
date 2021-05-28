<template>
  <div class="shopping-cart">             
    <h3>Your package which have not arrived</h3>                     
    <div class="column-labels" >
      <label class="product-image">Image</label>
      <label class="product-details">Product</label>
      <label class="product-price">Price</label>
      <label class="product-quantity">Quantity</label>
      <label class="product-removal">Remove</label>
      <label class="product-line-price">SubTotal</label>
    </div>  
    <div v-for="history in historyList" :key="history._id">    
      <div> Transaction ID - {{history._id}}</div>
      <div class="product" v-for="cartItem in history.cartItems" :key="cartItem._id">
        <div class="product-image">
          <img v-bind:src="cartItem._id.imageUrl" >
        </div>
        <div class="product-details">
          <div class="product-title">{{ cartItem._id.name }}</div>
          <p class="product-description">{{ cartItem._id.description }}</p>
        </div>
        <div class="product-price">{{ cartItem._id.price }}</div>
        <div class="product-quantity">{{cartItem.quantity}}</div>
        <div class="product-line-price">{{ cartItem.subTotal }}</div>
      </div>                                    
      <div class="totals">
        <div class="totals-item totals-item-total">
          <label>Grand Total</label>
          <div class="totals-value" id="cart-total">{{ history.totalPrice }}</div>
        </div>
      </div>
      <button type="button" class="btn btn-primary" id="buttonCheckout" @click.prevent="delivered(history._id)">Delivered</button>
    </div> 
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'history',
  props:['host', 'historyList'],
  data() {
    return {
      
    }
  },
  methods: {
    delivered(id) {
      axios({
        method: "PUT",
        url: `${this.host}/carts/arrived/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })   
        .then(response => {
          swal('You have confirmed that your package has arrived')
          this.$emit("history")
        })
        .catch(err => {
          console.log(err.response)
        }) 
    },
  },
}
</script>

<style>

</style>
