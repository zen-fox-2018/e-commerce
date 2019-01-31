<template>
  <div>
    <b-dropdown variant="danger" size="md" no-caret>
      <template slot="button-content">
        <i class="fas fa-cart-plus"></i>
        <b-badge class="ml-1" variant="light">{{listcartlength}}</b-badge>
      </template>
      <b-dropdown-item v-for="(item, index) in listcart" :key="index">
        <b-card style="width: 20rem; height: 5rem;">
          <div class="card-text">
            <div class="row">
              <div class="col-4">
                <img src="https://static.myfigurecollection.net/pics/figure/big/706583.jpg" width="50" height="40" alt="">
              </div>
              <div class="col-6">
                <div class="row"><small>{{item.productId.name}}</small></div>
                <div class="row"><small>Rp.{{item.productId.price}}</small></div>
              </div>
              <div class="col-2">
                <div class="row mb-1"><i @click="deleted(index, item._id)" class="fas fa-trash-alt"></i></div>
                <div class="row"><small>{{item.quantity}} buah</small></div>
              </div>
            </div>
          </div>
        </b-card>
      </b-dropdown-item>
      <div id="cart">
        <div ><p>Total: {{listcartlength}} product</p></div>
        <div>
          <router-link to="/details/cart">Lihat Semua</router-link>
          </div>
      </div>
    </b-dropdown>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: "cart",
  props: ["cart"],
  data() {
    return {
      listcart: [{
        productId:{
          name: ''
        }
      }],
      listcartlength: 0
    };
  },
  methods: {
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
        this.listcart.splice(idx,1)
      })
      .catch( error => {
        console.log(error.response)
      })
    }
  },
  watch: {
    cart(val){
      this.listcart = val
      this.listcartlength = this.listcart.length
    }
  },
  created() {
    this.listcart = this.cart
  }
};
</script>

<style>
#cart{
  display: flex;
  text-align: center;
  justify-content: space-around;
}
</style>
