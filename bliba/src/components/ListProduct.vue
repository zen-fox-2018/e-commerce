<template>

 <v-layout>
    <v-flex xs12>
      <v-card>
        <router-link :to="{name: 'product-detail', params: {id: `${product._id}`} }">
          <v-img
            class="warning--text"
            height="200px"
            :src="product.img_url"
          >
          </v-img>
        </router-link>
        <v-card-title>
          <div>
            <router-link :to="{name: 'product-detail', params: {id: `${product._id}`} }">
              <span class="grey--text">{{product.name}}</span><br>
            </router-link>
            <span>Price : Rp. {{product.price.toLocaleString('id')}}</span><br>
            <span>Stock : {{product.stock}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" @click.prevent="addToCart()" >Add to cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
export default {
    props : ['product'],
    methods: {
      addToCart() {
        let token = localStorage.getItem('token')
        console.log(this.product._id)
        this.axios({
          method: 'put',
          url: `http://localhost:3000/cart/add`,
          data: {productId: this.product._id},
          headers: {
              token,
              'Content-Type': 'application/json'
          }
        })
        .then(({data}) => {
          console.log(data)
          this.$swal('Success Add to Cart', '', 'success')
        })
      }
    },
}
</script>

<style>

</style>
