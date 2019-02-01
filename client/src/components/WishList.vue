<template>
  <v-container>
    <v-layout>
      <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :top="y"
      :color="color"
      >
      <v-icon>
      {{icon}}
      </v-icon>
      {{ message }}
      <v-btn
          color="white"
          flat
          @click="snackbar = false"
      >
          Close
      </v-btn>
    </v-snackbar>
      <v-flex>
        <h3>Your wishlist products</h3>
        <v-card dark v-for="(product, i) in user.wishlist" :key="i">
          <v-list three-line>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-img :src="product.image"></v-img>
              </v-list-tile-avatar>
               <v-list-tile-content>
                <v-list-tile-sub-title>{{product.name}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Description: {{product.description.slice(0,51)}}...</v-list-tile-sub-title>
                <v-list-tile-sub-title>Price: {{product.price}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
               
          </v-list>
          <v-card-actions>
            <v-btn small @click.prevent="removeWishList(product._id)">
              <v-icon>
                delete_forever
              </v-icon>
              Remove From Wishlist
            </v-btn>
            <v-btn small @click.prevent="addToCarts(product._id)">
              <v-icon>
                shopping_cart
              </v-icon>
              Add to carts now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'WishList',
  props: ['user'],
  data () {
    return {
      snackbar: '',
      color: '',
      message: '',
      icon: ''
    }
  },
  methods: {
    removeWishList: function (product) {
      this.$axios({
        method: `PUT`,
        url: `/users/remove/${product}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(() => {
        this.snackbar = true
        this.color = 'green'
        this.message = `Succesffully remove product from your wishlist`
        this.icon = 'check_circle'
        this.$emit('delete-wishlist')
      })
      .catch(err => {
        console.log(err)
      })
    },
    addToCarts: function (product) {
      this.$axios({
        method: `POST`,
        url: `/carts/${product}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(( {data} ) => {
        this.snackbar = true
        this.color = 'green'
        this.message = `Success added to carts!`
        this.icon = 'check_circle'
        this.$emit('get-item', {
          item: data,
          notification: {...this}
        })
        this.$emit('trigger-get')
      })
      .catch(err => {
        this.snackbar = true
        this.color = 'red'
        this.message = err.response.data.msg
        this.icon = 'error'
        this.$emit('get-item', {
          notification: {...this}
        })
      })
    },
  }
}
</script>

<style>

</style>
