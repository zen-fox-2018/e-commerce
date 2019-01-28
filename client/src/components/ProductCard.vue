<template>
  <v-card tile height="100%">
    <v-img :src="product.image_url" height="200px" width="200px" class="mx-auto"></v-img>
    <router-link :to="{ name: 'detail_product', params: {id: product._id}}">
      <v-card-title primary-title>{{ product.name }}</v-card-title>
    </router-link>
    <v-card-text min-height="100%">
      <div
        class="red--text text--darken-2 font-weight-black d-flex"
      >Rp {{ product.price.toLocaleString('id') }}</div>
      <div class="d-flex">
        <v-rating
          size="14"
          :value="4.5"
          background-color="yellow lighten-3"
          color="yellow darken-2"
          half-increments
          dense
          readonly
        ></v-rating>
        <v-spacer></v-spacer>
        <div class="grey--text text--darken-2 mr-0 px-0">
          <span class="caption">(1500)</span>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="green" @click="addToCart">
        <v-icon>shopping_cart</v-icon>
        <span class="ml-2">add to cart</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ['product'],
  methods: {
    addToCart() {
      this.$http
        .put(
          '/cart/add',
          {
            productId: this.product._id
          },
          {
            headers: {
              token: localStorage.token
            }
          }
        )
        .then(({ data }) => {
          this.$emit('add-to-cart')
          Swal.fire('Success', `${this.product.name} added to cart`, 'success')
        })
        .catch(({ response }) => {
          this.$emit('add-to-cart', response.status)
        })
    }
  }
}
</script>
