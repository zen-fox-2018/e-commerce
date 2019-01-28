<template>
  <div class="">
    <v-container grid-list-md text-xs>
      <center>
      <h1>Transaction</h1>
      </center>
      <br>
      <div>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout v-for="trans in transaction" row wrap>
              <v-flex xs4>
                <v-card-title>
                  <h3 v-for="item in trans.carts">{{item.name}} X {{item.quantity}}</h3>
                </v-card-title>
              </v-flex>
              <v-flex xs4>
                <v-card-title>
                  <h3>X {{item.quantity}}</h3>
                </v-card-title>
              </v-flex>
              <v-flex xs4>
                <v-card-title>
                  <h3>IDR {{(item.price * item.quantity).toLocaleString()}}</h3>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4>
                <v-card-title>
                  <h3>Shipping Fee: </h3>
                </v-card-title>
              </v-flex>
              <v-flex xs4>
              </v-flex>
              <v-flex xs4>
                <v-card-title>
                  <h3>IDR {{(30000).toLocaleString()}}</h3>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4>
                <v-card-title>
                  <h3>Total Price: </h3>
                </v-card-title>
              </v-flex>
              <v-flex xs4>
              </v-flex>
              <v-flex xs4>
                <v-card-title>
                  <h3>IDR {{totalPrice.toLocaleString()}}</h3>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <br>
        <br><br>
        <center>
        <h1>Shipping Address</h1>
        <br>
          <v-form
          ref="form"
          >

          <v-text-field
          v-model="name"
          label="Receiver Name"
          required
          ></v-text-field>

          <v-textarea
          v-model="address"
          label="Address"
          required
          ></v-textarea>

          <v-btn dark color="black" @click="placeOrder">Place Order</v-btn><br

          </v-form>
        </center>
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
        transactions: []
      }
    },
    props: ['url'],
    methods: {
      getTransactions() {
        axios.post(`${this.url}/transactions/buyer/${localStorage.getItem('Id')}`, obj)
          .then((response) => {
            this.transactions = response.data
          })
          .catch((error) => {
            console.log(error);
          })
      },
    },
    mounted() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login')
      }
      else {
        this.getTransactions()
      }
    }
  }
</script>
