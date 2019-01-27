<template>
  <v-container>
    <v-layout>
      <v-flex xs4 my-3 mx-3 v-for="(product, i) in products" :key="i">
        <v-card color="orange" class="white--text">
          <v-layout>
            <v-flex xs4 ma-2>
              <v-img
                :src="product.image"
                height="120px"
                contain
              ></v-img>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ product.title }}</div>
                  <div>Author: <strong> {{ product.author }} </strong></div>
                  <div>Publisher: <strong> {{ product.publisher }} </strong></div>
                  <div>Category: <strong> {{ product.tag }} </strong></div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <v-card-actions class="pa-3">
            <strong>  $ {{ product.price }} </strong>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon color="white" @click="addCart(product._id)">add_shopping_cart</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import server from '@/server/server'

export default {
  name: 'product-list',
  props: ['products', 'cart'],
  data () {
    return {
      //
    }
  },
  methods: {
    addCart: async function (id) {
      try {
        let check = true
        this.cart.items.forEach(e => {
          if (String(e.product._id) === String(id)) {
            check = false
          } 
        });
        if (!check) {
          swal('Invalid', 'This product already in your cart', 'error')
        } else {
          if (!this.cart._id) {
            var { data } = await server.post('/cart', {
              items: {
                product: id,
                total: 1
              }
            }, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
          } else {
            var { data } = await server.put(`/cart/product/${this.cart._id}`, {
              items: {
                product: id,
                total: 1
              }
            }, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
          }
          this.$emit('addCart', data)
          swal('Added to cart!', 'you can check itu on cart icon', 'success')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
