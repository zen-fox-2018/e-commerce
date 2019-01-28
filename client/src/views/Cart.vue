<template>
  <div class="about">
    <NavBar @changeView="changeView"></NavBar>
    <div class="container-fluid">
      <warningModal  id="warningModal"></warningModal>
      <checkoutModal id="checkoutModal"></checkoutModal>
      <history v-if="viewhistory"></history>
      <div v-if="viewcart" class="row">
        <div class="detail-checkout col-12 col-lg-8 mb-4" >
          <div class="mt-5">
            <h2>My Cart</h2>
            <div v-if="cartHasItems">
              <h5><em>cart_id: {{cart._id}}</em></h5>
            </div>
            <hr>
            <div class="checkout-table mt-4">
              <table class="table-cart" >
                <template v-if='cartHasItems'>
                  <thead class="thead-dark">
                    <tr>
                      <th class="col-2">product_image</th>
                      <th class="col-2">item</th>
                      <th class="col-2">item price</th>
                      <th class="col-2">Quantity</th>
                      <th class="col-2">Price</th>
                    </tr>
                  </thead>
                  <tbody  v-for="item in cart.items">
                    <tr class="individual-item">
                      <td id="item-img" >
                        <img :src="item.item.thumbUrl" />
                      </td>
                      <td id="item-name">
                          <h5>{{item.item.name}}</h5>
                      </td>
                      <td id="item-price">
                        <span>{{item.item.price}}</span>
                      </td>
                      <td id="item-quantity">
                        <span>{{item.quantity}}</span>
                      </td>
                      <td id="price">
                        <span>{{item.quantity * item.item.price}}</span>
                      </td>
                    </tr>
                  </tbody>
                </template>
                <template v-else>
                      <tr >
                        <td rowspan="4">Cart is empty.</td>
                      </tr>
                </template> 
              </table>
            </div>
          </div> 
        </div>
        <div class="summary-checkout col-12 col-lg-4 mt-5">
        <template v-if='cartHasItems'>
          <h2>Cart Total</h2>
          <hr>
          <div id="summary-table">
            <h3 id="Subtotal">Subtotal: Rp. {{cart.subtotal}}</h3>
            <hr>
            <button @click="checkOut" class="pointer btn-primary btn w-100 mt-4">Checkout</button>
            <button data-toggle="modal" data-target="#warningModal" class="pointer btn-danger w-100 mt-3" >delete Cart</button>
          </div>
        </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import warningModal from '@/components/modal_warning.vue'
import checkoutModal from '@/components/checkoutModal.vue';
import NavBar from '@/components/NavBar_Cart.vue'; 
import history from '@/components/cart_purchase_history.vue';
export default {
  data() {
    return {
      items: {
        all : [],
        showing : []
      }, 
      viewhistory: false,
      viewcart: true
    }
  },
  components: {
    checkoutModal, NavBar, warningModal , history
  },
  computed: {
    cart() {
      return JSON.parse(localStorage.getItem('cart'));
    },
    cartHasItems(){
      return !(this.cart == null);
    },
  },
  methods: {
    changeView(target) {
      if(target == 'My Purchase History') {
        this.viewhistory = true;
        this.viewcart = false;
      } else {
        this.viewhistory = false;
        this.viewcart = true;
      }
    },
    checkOut() {
      let options = {
        method: 'GET',
        url: 'http://localhost:3000/cart/checkout',
        headers: {
          authorization: localStorage.getItem('token')
        }
      }
      axios(options)
      .then(res => {
        localStorage.setItem('cart', null);
        $('#checkoutModal').modal();
      })
    }
  },
  mounted() {
    // console.log(this.cart)
  }
}
</script>
<style scoped>
  img {
    height:100px;
    width:auto;
    margin-right: 50px;
  }
  td span{
    margin-right: 40px;
  }
</style>
