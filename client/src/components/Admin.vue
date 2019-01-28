<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm12 md12 lg12>
        <h3>All Received Transactions</h3>
        <v-card dark>
          <v-list three-line v-for="(product, i) in transactions" :key="i">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-img :src="product.products.image"></v-img>
              </v-list-tile-avatar>
               <v-list-tile-content>
                <v-list-tile-sub-title>Transaction Id: {{product._id}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{product.products.name}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Quantity: {{product.qty}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Customer Name: {{product.userId.name}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{convertDate(product.createdAt)}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{product.status}}</v-list-tile-sub-title>
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
  name: 'Admin',
  data () {
    return {
      transactions: []
    }
  },
  mounted () {
    this.getAllConfirmed()
  },
  methods: {
    getAllConfirmed: function () {
      this.$axios({
        method: `GET`,
        url: `/transactions/admin`,
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
    convertDate: function (input) {
      return moment(input).format('DD MMMM, YYYY hh:mm A')
    }
  }
}
</script>

<style>

</style>
