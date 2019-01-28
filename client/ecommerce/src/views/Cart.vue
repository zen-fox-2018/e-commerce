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
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartList: []
    }
  }
}
</script>

<style>

</style>
