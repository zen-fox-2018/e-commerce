<template>
   <div class="shopping-cart">                                
      <div class="column-labels" >
        <label class="product-image">Image</label>
        <label class="product-details">Product</label>
        <label class="product-price">Price</label>
        <label class="product-quantity">Quantity</label>
        <label class="product-removal">Remove</label>
        <label class="product-line-price">SubTotal</label>
      </div>
      <div class="product" v-for="cartItem in cartList.cartItems" :key="cartItem._id">
        <div class="product-image">
          <img v-bind:src="cartItem._id.imageUrl" >
        </div>
        <div class="product-details">
          <div class="product-title">{{ cartItem._id.name }}</div>
          <p class="product-description">{{ cartItem._id.description }}</p>
        </div>
        <div class="product-price">{{ cartItem._id.price }}</div>
        <div class="product-quantity">
          <input type="number" :value="cartItem.quantity" @input="cartItem.quantity = $event.target.value" @change="updateCart(cartItem)" min="1">
        </div>
        <div class="product-removal">
          <button class="remove-product" @click="deleteCartItem(cartItem)">
            Delete
          </button>
        </div>
        <div class="product-line-price">{{ (cartItem._id.price * cartItem.quantity) }}</div>
      </div>
      
      <div class="totals">
        <div class="totals-item totals-item-total">
          <label>Grand Total</label>
          <div class="totals-value" id="cart-total">{{grandTotal}}</div>
        </div>
      </div>
      <button type="button" class="btn btn-primary" id="buttonCheckout" @click.prevent="checkOut()">Checkout</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'cart',
  props:['host', 'cartList', 'grandTotal'],
  data() {
    return {
      
    }
  },
  methods: {
    updateCart(param) {
      axios({
        method: "PUT",
        url: `${this.host}/carts/${localStorage.getItem("cartId")}`,
        data: {
          itemId: param._id._id,
          quantity: Number(param.quantity),
          subTotal: ( Number(param.quantity) * Number(param._id.price) )
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          this.$emit("getCarts")
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteCartItem(param) {
      axios({
        method: "DELETE",
        url: `${this.host}/carts/del/${localStorage.getItem("cartId")}`,
        data: {
          itemId: param._id._id
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then((response) => {
          this.$emit("getCarts")
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    checkOut() {
      axios({
        method: "PUT",
        url: `${this.host}/carts/checkout/${localStorage.getItem("cartId")}`,
        data: {
          grandTotal: this.grandTotal
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          localStorage.removeItem("cartId")
          axios({
            method: "POST",
            url: `${this.host}` +`/carts`,
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(({data}) => {
              console.log(data)
              localStorage.setItem("cartId", data._id)
              window.location.reload()
            })
            .catch((error) => {
              console.log(error.response);
            });
        })
        .catch(err => {
          console.log(err.response)
        })
    },
  },
  created() {
  }
}
</script>

<style>

</style>
