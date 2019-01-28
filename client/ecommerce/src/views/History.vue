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
    </div> 
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
