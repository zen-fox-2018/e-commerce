<template>
  <v-item-group>
    <v-container grid-list-md>
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
      <v-layout wrap>
        <v-flex
        v-for="(product, i) in products"
        :key="i"
        xs12
        md4
        >
          <v-item>
            <v-card
            slot-scope="{ active, toggle }"
            :color="active ? 'primary' : ''"
            class="d-flex align-center"
            dark
            height="400"
            @click="toggle"
            >
              <v-btn
              absolute
              dark
              fab
              top
              small
              right
              v-show="isLogin"
              @click.prevent="addToCarts(product._id)">
                  <v-icon>
                      add_shopping_cart
                  </v-icon>
              </v-btn>
              <v-img 
              :src="product.image"
              aspect-ratio="0.8"
              v-if="fetched">
              </v-img>
              <div class="text-xs-center" v-else>
                <v-progress-circular
                  :rotate="360"
                  :size="100"
                  :width="15"
                  :value="timing"
                  color="red" 
                >
                  {{ timing }}
                </v-progress-circular>  
              </div>
              <v-scroll-y-transition>
              <div
              v-if="active"
              >
                <v-card-title>
                  <div>
                      <span class="grey--text">{{product.name}}</span><br>
                      <span>{{product.description}}</span><br><br>
                      <span>Price {{convertCurrency(product.price)}}</span><br>
                      <span>Stock {{product.stock}}</span>
                      <span>
                        <v-btn small  @click.prevent="addWishList(product._id)" v-show="isLogin">
                          <v-icon>favorite</v-icon>
                          Add to wishlist
                        </v-btn>
                      </span>
                  </div>
                </v-card-title>
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
          <v-card dark>
             <v-card-actions class="pa-3">
                <v-btn small fab @click.prevent="rateProduct(product._id)" v-show="isLogin">
                  <v-icon>grade</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <span class="grey--text text--lighten-2 caption mr-2" v-show="isLogin">
                  ({{ product.ratingPoint }})
                </span>
           
                <v-rating
                  v-model="product.ratingPoint"
                  background-color="white"
                  color="yellow accent-4"
                  dense
                  hover
                  size="18"
                  light
                  v-show="statusRate && isLogin"
                ></v-rating>
                
                <v-rating
                  v-model="rating"
                  background-color="white"
                  color="yellow accent-4"
                  dense
                  hover
                  size="18"
                  light
                  v-show="!statusRate && isLogin"
                ></v-rating>
                 
              </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>
     
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  name: 'ListProduct',
  props: ['products', 'timing', 'fetched', 'isLogin'],
  data () {
    return {
      snackbar: false,
      color: '',
      message: '',
      icon: '',
      ratingPoint: 0,
      rating: 0,
      statusRate: false
    }
  },
  methods: {
    convertCurrency: function (price) {
      return price.toLocaleString('us-US', {
        style: 'currency',
        currency: 'USD'
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
    rateProduct: function (product) {
      this.$axios({
        method: `POST`,
        url: `/users/${product}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ratingPoint: this.rating
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.snackbar = true
        this.color = 'green'
        this.message = `Thanks for rating our product!`
        this.icon = 'check_circle'
        this.ratingPoint = data.ratingPoint
        this.$emit('rate-product')
        this.rating = 0
        this.statusRate = true
      })
      .catch(err => {
        this.snackbar = true
        this.color = 'red'
        this.message = err.response.data.message
        this.icon = 'error'
        
      })
    },
    addWishList: function (product) {
      this.$axios({
        method: `PUT`,
        url: `/users/${product}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.snackbar = true
        this.color = 'green'
        this.message = `Succesfully adding to your wishlist!`
        this.icon = 'check_circle'
        this.$emit('add-wishlist')
      })
      .catch(err => {
        this.snackbar = true
        this.color = 'red'
        this.message = err.response.data.message
        this.icon = 'error'
      })
    }
  }
}
</script>

<style>

</style>
