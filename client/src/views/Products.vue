<template>
  <div class="">
    <v-container grid-list-md text-xs-center>
      <div>
        <v-btn @click="getAllProduct">All Products</v-btn>
        <v-btn @click="getPlayingCards">Playing Cards</v-btn>
        <v-btn @click="getCloseUp">Close Up Magic</v-btn>
        <v-btn @click="getMentalism">Mentalism</v-btn>
        <v-btn @click="getMoneyCoin">Money & Coin</v-btn>
        <v-btn @click="getVideoBook">Video & Book</v-btn>

      </div>
      <br>
      <v-layout row wrap>
        <v-flex xs3 sm3 pa-1 v-for="product in products">
          <v-card>
            <v-img
              :src="product.image"
              contain
              max-height="250"
              max-width="250"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h2>{{product.name}}</h2>
                <h3>Price: {{product.price.toLocaleString()}}</h3>
              </div>
            </v-card-title>
            <v-layout row justify-center>

              <v-card-actions>
                <v-btn v-if="isLogin" @click="showAddToCart(product._id)" color="black" dark>Add to Cart</v-btn>
                <v-btn @click="showDetail(product._id)" color="white" light>Show Details</v-btn>

              </v-card-actions>

            </v-layout>
            <br>
          </v-card>
        </v-flex>

      </v-layout>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-text>
              <center>
                <h1>{{product.name}}</h1>
                <br>
                <v-img
                :src="product.image"
                contain
                max-height="250"
                max-width="250"
                ></v-img>
                <br>
                <h1>Price: IDR {{product.price.toLocaleString()}}</h1>
                <br>
                <h2>{{product.description}}</h2>
              </center>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-layout row justify-center>
        <v-dialog return-value v-model="dialogCart" max-width="600px">
          <v-card>
            <v-card-text>
              <center>
                <h3>You will add {{product.name}} to your cart</h3>
                <br>
                <h3>Enter the amount you want to buy</h3>
                <v-text-field
                v-model="quantity"
                type="number"
                label="Amount"
                required
                ></v-text-field>
              </center>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue" dark @click="addToCart(product._id)">Add And Continue Shopping</v-btn>
              <v-btn color="red" dark @click="dialogCart = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
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
        dialog: false,
        dialogCart: false,
        quantity: 1,
        products: [],
        product: {
          _id: "id",
          price: "price",
          name: "name",
          description: "description",
          image: "image"
        },
        allproducts: [],
        playingcards: [],
        closeup: [],
        mentalism: [],
        moneycoin: [],
        videobook: []
      }
    },
    props: ['url', 'isLogin'],
    methods: {
      getAllProduct() {
        this.products = this.allproducts
      },
      getPlayingCards() {
        this.products = this.playingcards
      },
      getCloseUp() {
        this.products = this.closeup
      },
      getMentalism() {
        this.products = this.mentalism
      },
      getMoneyCoin() {
        this.products = this.moneycoin
      },
      getVideoBook() {
        this.products = this.videobook
      },
      showAddToCart(id) {
        axios.get(`${this.url}/items/${id}`)
          .then((response) => {
            this.product = response.data
            this.dialogCart = true
          })
          .catch((error) => {
            console.log(error);
          })
      },
      showDetail(id) {
        axios.get(`${this.url}/items/${id}`)
          .then((response) => {
            this.product = response.data
            this.dialog = true
          })
          .catch((error) => {
            console.log(error);
          })
      },
      getProducts() {
        axios.get(`${this.url}/items/`)
          .then((response) => {
            response.data.forEach((product) => {
              if (product.category == 'Playing Cards') {
                this.allproducts.push(product)
                this.playingcards.push(product)
              }
              else if (product.category == 'Close Up Magic') {
                this.allproducts.push(product)
                this.closeup.push(product)
              }
              else if (product.category == 'Mentalism') {
                this.allproducts.push(product)
                this.mentalism.push(product)
              }
              else if (product.category == 'Money & Coin') {
                this.allproducts.push(product)
                this.moneycoin.push(product)
              }
              else if (product.category == 'Video & Book') {
                this.allproducts.push(product)
                this.videobook.push(product)
              }
            })
          })
          .catch((error) => {
            console.log(error.message);
          })
      },

      addToCart(productId, name) {
        console.log(productId, name);
        let obj = {
          buyer: localStorage.getItem('id'),
          item: productId,
          quantity: this.quantity
        }
        axios.post(`${this.url}/carts`, obj)
          .then((cart) => {
            console.log('berhasil menambah produk ke cart');
            this.quantity = 1
            this.dialogCart = false
          })
          .catch((error) => {
            console.log(error.message);
          })
      }
    },
    created() {
      this.getProducts()
      this.products = this.allproducts
    }
  }
</script>
