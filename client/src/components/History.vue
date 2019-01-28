<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm12 md12 lg12>
        <h3>Your transactions lists</h3>
        <v-card dark>
          <v-list three-line v-for="(product, i) in transactions" :key="i">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-img :src="product.products.image"></v-img>
              </v-list-tile-avatar>
               <v-list-tile-content>
                <v-list-tile-sub-title>{{product.products.name}}</v-list-tile-sub-title>
                <v-list-tile-action-text>Quantity: {{product.qty}}</v-list-tile-action-text>
                <v-list-tile-action-text>Total Price: {{convertCurrency(product.totalPrice)}}</v-list-tile-action-text>
                <v-list-tile-action-text>{{convertDate(product.createdAt)}}
                  <v-chip text-color="white" v-show="product.status === 'Received'" color="green">
                    <v-avatar>
                      <v-icon>check_circle</v-icon>
                    </v-avatar>
                    {{product.status}}
                  </v-chip>
                  <v-chip text-color="white" v-show="product.status === 'Shipping'" color="red">
                    <v-avatar>
                      <v-icon>local_shipping</v-icon>
                    </v-avatar>
                    {{product.status}}
                  </v-chip>
                  <v-btn small @click.prevent="confirmStatus(product._id)" v-show="product.status === 'Shipping'"><v-icon>check_box</v-icon>Received</v-btn>
                  </v-list-tile-action-text>                
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import moment from 'moment'
export default {
  name: 'History',
  data () {
    return {
      transactions: [],
      status: false
    }
  },
  mounted () {
    this.getMyTransaction()
  },
  methods: {
    convertCurrency: function (price) {
      return price.toLocaleString('us-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    getMyTransaction: function () {
      this.$axios({
        method: `GET`,
        url: `/transactions/mine/lists`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(( { data } ) => {
        this.status = data.status
        this.transactions = data
      })
      .catch(err => {
        console.log(err)
      })
    },
    confirmStatus: function (id) {
      this.$axios({
        method: `PUT`,
        url: `/transactions/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.getMyTransaction()
      })
      .catch(err => {
        console.log(err)
      })
    },
    convertDate: function (input) {
      return moment(input).format('DD MMMM, YYYY hh:mm A')
    },
  }
}
</script>

<style>

</style>
