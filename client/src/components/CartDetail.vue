<template>
  <v-container>
    <v-stepper v-model="el" dark>
      <v-stepper-header>
        <v-stepper-step :complete="el > 1" step="1">Edit your shopping carts</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="el > 2" step="2">Checkout</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Payment</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>

        <v-stepper-content step="1">
          <v-layout row>
            <v-flex xs12 sm12 md8 lg8 class="pr-2">
              <h3>Your Shopping Cart Lists</h3>
              <v-divider></v-divider>
              <v-card dark v-for="(product, i) in cartDetail" :key="i">
                <v-divider></v-divider>
                <v-list three-line>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img :src="product.products.image">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{product.products.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{convertCurrency(product.products.price)}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-layout row wrap>
                  <v-flex xs1 sm1 md1 lg1 class="pr-8">
                    <v-btn color="red" fab @click.prevent="decrement(product.products._id)">
                      <v-icon>
                        remove
                      </v-icon>
                    </v-btn>
                  </v-flex>
              
                  <v-flex xs1 sm1 md1 lg1 class="pr-8">
                    <v-btn light fab>
                      {{product.qty}}
                    </v-btn>
                  </v-flex>
                  <v-flex xs1 sm1 md1 lg1 class="pr-8">
                    <v-btn color="green" fab @click.prevent="increment(product.products._id)">
                      <v-icon>
                        add
                      </v-icon>
                    </v-btn>
                  </v-flex>

                  </v-layout>
                </v-card-actions>
            </v-card>
            <v-btn small dark @click.prevent="deleteCart"><v-icon>delete_forever</v-icon>Delete Carts</v-btn>
            </v-flex>
            
            <v-flex xs12 sm12 md4 lg4>
              <h3>Checkout Process</h3>
              <v-card dark height= 10rem>
              <v-card-title>
                <div>
                  <span>Total Price {{convertCurrency(totalPrice)}}</span>
                  <v-divider></v-divider>
                  <span>Total Product {{total}}</span>
                </div>
              </v-card-title>
              <v-divider></v-divider>
                <v-btn color="orange" @click.prevent="el = 2" v-on:click.prevent="checkout">Checkout</v-btn>
            </v-card>
            </v-flex>
          </v-layout>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-layout row>
            <v-flex xs12 sm12 md8 lg8 class="pr-2">
              <h3>Verify For Checkout</h3>
              <v-divider></v-divider>
              <v-card dark v-for="(val, i) in transactions" :key="i">
                <v-divider></v-divider>
                <v-list three-line>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img :src="val.carts.products.image">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{val.carts.products.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{convertCurrency(val.carts.products.price)}}</v-list-tile-sub-title>
                      <v-list-tile-sub-title>{{convertDate(val.createdAt)}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
                <v-divider></v-divider>
            </v-card>
            </v-flex>
            
            <v-flex xs12 sm12 md4 lg4>
              <h3>Your Shopping Cart Details</h3>
              <v-card dark height= 10rem>
              <v-card-title>
                <div>
                  <span>Total Price {{convertCurrency(totalPrice)}}</span>
                  <v-divider></v-divider>
                  <span>Total Product {{total}}</span>
                </div>
              </v-card-title>
              <v-divider></v-divider>
                <v-btn color="orange" @click.prevent="el = 3" v-on:click.prevent="deleteCart">Pay Now!</v-btn>
            </v-card>
            </v-flex>
          </v-layout>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-layout row>
            <v-flex xs12 sm12 md8 lg8 class="pr-2">
              <h3>Verified Payment</h3>
              <v-divider></v-divider>
              <v-card dark height= 10rem>
              <v-card-title>
                <v-container>
               
                  <v-btn :to="'/transaction'">
                    <v-icon>
                      history
                    </v-icon>
                    Go To My Transactions History
                  </v-btn>
                

                </v-container>
              </v-card-title>
            </v-card>
            </v-flex>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <History></History>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      el: 0,
      transactions: []
    }
  },
  mounted () {
    this.findTransactions()
  },
  name: 'CartDetail',
  props: ['cartDetail', 'total', 'totalPrice', 'username'],
  methods: {
    convertCurrency: function (price) {
      return price.toLocaleString('us-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    increment: function (product) {
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
        this.$emit('increment-item', {
          item: data,
          notification: {...this}
        })
        this.$emit('trigger-inc')
      })
      .catch(err => {
        this.snackbar = true
        this.color = 'red'
        this.message = err.response.data.msg
        this.icon = 'error'
        this.$emit('increment-item', {
          notification: {...this}
        })
      })
    },
    decrement: function (product) {
      this.$axios({
        method: `PUT`,
        url: `/carts/${product}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.$emit('decrement-item', data)
        this.$emit('trigger-dec')
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteCart: function () {
      this.$axios({
        method: `DELETE`,
        url: `/carts`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(() => {
        this.snackbar = true
        this.color = 'green'
        this.message = `Success deleted this carts!`
        this.icon = 'check_circle'
        this.$emit('delete-carts', {
          notification: {...this}
        })
        this.$emit('trigger-delete')
        this.$router.replace('/')
      })
      .catch(err => {
        console.log(err)
      })
    },
    findTransactions: function () {
      this.$axios({
        method: `GET`,
        url: `/transactions`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.transactions = data
      })
      .catch(err => {
        console.log(err)
      })
    },
    checkout: function () {
      this.$axios({
        method: `POST`,
        url: `/transactions`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.transactions.concat(data)
        this.findTransactions()
       
      })
      .catch(err => {
        console.log(err)
      })
    },
    convertDate: function (input) {
      return moment(input).format('DD MMMM, YYYY hh:mm A')
    },
    deleteCart: function () {
      this.$axios({
        method: `DELETE`,
        url: `/carts`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(() => {
        this.snackbar = true
        this.color = 'green'
        this.message = `Payment completed, check your history!`
        this.icon = 'check_circle'
        this.$emit('delete-carts', {
          notification: {...this}
        })
        this.$emit('trigger-delete')
      })
      .catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style>

</style>
