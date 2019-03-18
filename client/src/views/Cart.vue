<template>
  <div class="">
    <v-container grid-list-md text-xs>
      <center>
      <h1>Your Shopping Cart</h1>
      </center>
      <br>
      <div>
        <v-card v-for="cart in carts">
          <v-container
            fluid
            grid-list-lg
          >
          <v-layout row wrap>
            <v-flex xs4>
              <v-img
              :src="cart.item.image"
              contain
              max-height="200"
              max-width="200"
              ></v-img>
            </v-flex>
            <v-flex xs4>
              <v-card-title><h3>{{cart.item.name}}</h3></v-card-title>
              <v-card-text>
                <h3>Amount: {{cart.quantity}}</h3>
                <h3>Total Price: IDR {{(cart.item.price * cart.quantity).toLocaleString()}}</h3>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-btn dark color="red" @click="deleteCart(cart._id)">Delete Cart</v-btn><br>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <br><br>
        <center>
        <v-btn dark color="black" @click="toCheckout">Proceed to Checkout</v-btn><br>
        </center>
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
        carts: [],
      }
    },
    props: ['url'],
    methods: {
      toCheckout() {
        this.$router.push('/checkout')
      },

      getCarts() {
        axios.get(`${this.url}/carts/buyer/${localStorage.getItem('id')}`)
          .then((response) => {
            this.carts = response.data
          })
          .catch((error) => {
            console.log(error.message);
          })
      },

      deleteCart(id) {
        axios.delete(`${this.url}/carts/${id}`)
          .then((response) => {
            console.log('berhasil delete cart');
            this.getCarts()
          })
          .catch((error) => {
            console.log(error);
            console.log(error.message);
          })
      },
    },
    created() {
      this.getCarts()
    },
    mounted() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/products')
      }
    }
  }
</script>
