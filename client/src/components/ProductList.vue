<template>
  <div id class="row mr-0">
    <div class="col-3 mr-0" v-for="product in products" :key="product._id">
      <div>
        <router-link :to="`/details/${product._id}`" class="removeunderline">
        <b-card
          :title="product.name"
          :img-src="product.imageUrl"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 15rem;"
          class="mb-2 removeunderline"
        >
          <div class="card-text description">
            <small>Price: Rp.{{formatPrice(product.price)}}</small>
            <br>
            <small>Stock: {{product.stock}}</small>
            <br>
          </div>
          <br>
          <!-- <router-link :to="`/details/${product._id}`">
            <b-button size="sm" variant="outline-primary" class="mb-2">Details</b-button><br>
          </router-link> -->
          <!-- <b-button variant="primary" @click.prevent="addToCart(product._id)">Add to Cart</b-button> -->
        </b-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: "product-list",
  props: ["products"],
  data() {
    return {};
  },
  methods: {
    formatPrice(price){
      return price.toLocaleString(['ban', 'id']);
    },
    addToCart(productId) {
      console.log("add", productId);
      api({
        url: '/cart',
        method: "POST",
        data: { productId, quantity: 1 },
        headers: {
          token:
            localStorage.getItem('token')
        }
      })
      .then( ({data}) => {
        console.log(data)
        swal({
          title: data.message,
            icon: "success",
            timer: 2000,
          });
        this.$emit('addcart', data)
      })
      .catch( error => {
        console.log(error.response.data.message)
        swal({
            title: error.response.data.message,
            icon: "warning",
            timer: 2000
          });
      })
    }
  }
};
</script>

<style>
.description {
  text-align: left;
}

.removeunderline{
  text-decoration: none;
}
</style>


