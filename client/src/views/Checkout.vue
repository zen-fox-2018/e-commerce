<template>
  <div class="">
    <v-container grid-list-md text-xs>
      <center>
      <h1>Checkout Order</h1>
      </center>
      <br>
      <div>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout v-for="item in itemsBought" row wrap>
              <v-flex xs4>
                <v-card-title>
                  <h3>{{item.name}} X {{item.quantity}}</h3>
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
        name: "",
        address: "",
        carts: [],
        totalPrice: 30000,
        itemsBought: []
      }
    },
    props: ['url'],
    methods: {
      placeOrder() {
        let obj = {
          carts: this.carts,
          buyer: localStorage.getItem('id'),
          name: this.name,
          shippedto: this.address,
          courier: "JNE",
          totalprice: this.totalPrice
        }
        axios.post(`${this.url}/transactions`, obj)
          .then((response) => {
            this.name = ""
            this.address = ""
            this.carts = []
            this.totalPrice = 30000
            this.itemsBought = []
            this.clearCart()
            this.$router.push('/transactions')
            console.log('berhasil place order');
          })
          .catch((error) => {
            console.log(error);
          })
      },

      toCheckout() {
        this.$router.push('/checkout')
      },

      clearCart(){
        axios.delete(`${this.url}/carts/user/${localStorage.getItem('id')}`)
        .then((response) => {
          console.log('berhasil delete carts');
        })
        .catch((error) => {
          console.log(error.message);
        })
      },

      getCarts() {
        axios.get(`${this.url}/carts/buyer/${localStorage.getItem('id')}`)
          .then((response) => {
            this.carts = response.data
            response.data.forEach((item) => {
              let obj = item.item
              obj.quantity = item.quantity
              this.itemsBought.push(obj)
              this.totalPrice = this.totalPrice + (obj.price * obj.quantity)
            })
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
