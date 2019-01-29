<template>
  <div class="container" style="margin-top: 130px;">
    <div class="row">
      <div class="col-9" v-if="!checkout">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col"> </th>
                <th scope="col">Product</th>
                <th scope="col">Available</th>
                <th scope="col" class="text-center">Quantity</th>
                <th scope="col" class="text-left">Price</th>
                <th> </th>
              </tr>
            </thead>
            <tbody v-for="cart in carts" :key="cart._id">
              <detail-cart :cart="cart" @getCarts="getCarts" />
            </tbody>
          </table>
          <div class="row">
            <div class="col-sm-12  col-md-6">
              <router-link to="/"><button class="btn btn-block btn-light">Continue Shopping</button></router-link>
            </div>
            <div class="col-sm-12 col-md-6 text-right">
              <router-link to="/cart/checkout"><button  @click="closeCart" class="btn btn-block btn-success">Checkout</button></router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-9" v-else>
        <router-view :carts="carts" @getCarts="getCarts" @showCart="showCart" ></router-view>
      </div>
      <div class="col-3">
        <div class="card">
          <div class="card-body text-justify">
            <h5><Strong>Cart Total</Strong></h5>
            <hr>
            <p><strong>Total :  </strong><span class="text-right">Rp. {{total}} </span></p>
          </div>
        </div>
      </div>
      <div class="col mb-2">
        
      </div>
    </div>
    <div class="row">
      
    </div>
  </div>
</template>

<script>
import DetailCart from "@/components/DetailCart.vue";

export default {
  name: 'Cart',
  props: ['carts'],
  components: {
    DetailCart,
  },
  data() {
    return {
      total: 0,
      checkout: false
    }
  },
  methods: {
    getCarts() {
      this.$emit('getCarts')
    },
    closeCart() {
      this.checkout = true
    },
    getTransaction() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/transactions',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(transactions => {
          console.log(transactions)
        })
        .catch(err => {
          swal(err.response.data.msg)
        })
    },
    showCart() {
      this.checkout = false
    }
  },
  mounted() {
    this.carts.forEach(element => {
      let subtotal = element.product.price * element.amount
      this.total += subtotal
    });
    this.getTransaction()
  },
  watch: {
    carts(v) {
      this.total = 0
      v.forEach(element => {
        let subtotal = element.product.price * element.amount
        this.total += subtotal
      });
    }
  }
}
</script>

