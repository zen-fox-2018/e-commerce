<template>
  <div class="">
    <v-container grid-list-md text-xs>
      <center>
      <h1>Transactions</h1>
      </center>
      <br>
      <div>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-card v-for="transaction in transactions">
              <v-container
                fluid
                grid-list-lg
              >
              <v-layout row wrap>
                <v-flex xs4>
                  <h3 v-for="cart in transaction.carts">{{cart.item.name}} X {{cart.item.quantity}}</h3><br>
                  <h2>Status: {{transaction.status}}</h2>
                </v-flex>
                <v-flex xs4>
                  <v-card-title><h3>Order Date {{new Date(transaction.date_order).toLocaleString()}}</h3></v-card-title>
                  <v-card-text>
                    <p>Total Price: IDR {{transaction.totalprice.toLocaleString()}}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-btn v-if="transaction.status == 'Waiting For Payment'" dark color="blue" @click="confirmPayment(transaction._id)">Confirm Payment</v-btn><br>
                  <v-btn v-if="transaction.status == 'Item Has Been Sent'" dark color="indigo" @click="confirmReceived(transaction._id)">Confirm Item Received</v-btn><br>
                </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-container>
        </v-card>
        <br>
        <br><br>
      </div>
    </v-container>
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    components: {
      // HelloWorld
    },
    data: () => {
      return {
        transactions: [],
      }
    },
    props: ['url'],
    methods: {
      getTransactions() {
        axios.get(`${this.url}/transactions/buyer/${localStorage.getItem('id')}`)
          .then((response) => {
            this.transactions = response.data
          })
          .catch((error) => {
            console.log(error.message);
          })
      },

      confirmPayment(id) {
        axios.patch(`${this.url}/transactions/${id}`, {status: "Payment Sent"})
          .then((response) => {
            this.getTransactions()
          })
          .catch((error) => {
            console.log(error.message);
          })
      },

      confirmReceived(id) {
        axios.patch(`${this.url}/transactions/${id}`, {status: "Done"})
          .then((response) => {
            this.getTransactions()
          })
          .catch((error) => {
            console.log(error.message);
          })
      },
    },
    created() {
      this.getTransactions()
    },
    mounted() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/products')
      }
    }
  }
</script>
