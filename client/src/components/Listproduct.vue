<template>
  <v-item-group>
    <v-container grid-list-md>
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
                  </div>
                </v-card-title>
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
          <v-card>
             <div class="text-xs-center">
            <v-rating v-model="rating"
             background-color="orange lighten-3"
              color="orange">
            </v-rating>
          </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  name: 'ListProduct',
  props: ['products', 'timing', 'fetched'],
  data () {
    return {
      snackbar: false,
      color: '',
      message: '',
      icon: ''
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
        url: `${url}/carts/${product}`,
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
    }
  }
}
</script>

<style>

</style>
