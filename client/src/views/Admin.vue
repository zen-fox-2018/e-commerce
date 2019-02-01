<template>
  <div class="">
    <v-container grid-list-md text-xs>
      <center>
      <div>
        <v-btn @click="addProductPage">Add Product</v-btn>
        <v-btn @click="allProducts">All Products</v-btn>
        <v-btn @click="pendingTransactions">Pending Transactions</v-btn>
        <v-btn @click="onprocessTransactions">On Process Transactions</v-btn>
        <v-btn @click="transactionsDone">Transactions Done</v-btn>
      </div>
     </center>
      <br>
      <div v-if="page == 'addproduct'">
        <center><h1>Add New Product</h1></center>
        <br>
        <v-form
        ref="form"
        >

        <h2>Product Image</h2><br>
        <input type="file" ref="file" v-on:change="handleFileUpload()">
        <br>

        <v-text-field
        v-model="productName"
        label="Product Name"
        required
        ></v-text-field>

        <v-text-field
        v-model="productPrice"
        type="number"
        label="Price"
        required
        ></v-text-field>

        <v-select
        :items="categories"
        v-model="productCategory"
        label="Category"
        data-vv-name="productCategory"
        required
        ></v-select>

        <v-textarea
        v-model="productDescription"
        label="Description"
        required
        ></v-textarea>

        <v-btn
        color="success"
        @click="addProduct"
        >
        Add Product
        </v-btn>

        </v-form>
      </div>

      <div v-if="page == 'allproducts'">
        <v-card v-for="product in products">
          <v-container
            fluid
            grid-list-lg
          >
          <v-layout row wrap>
            <v-flex xs4>
              <v-img
              :src="product.image"
              contain
              max-height="200"
              max-width="200"
              ></v-img>
            </v-flex>
            <v-flex xs4>
              <v-card-title><h3>{{product.name}}</h3></v-card-title>
              <v-card-text>
                <p>Price: IDR {{product.price.toLocaleString()}}</p>
                <p>{{product.description}}</p>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-btn dark color="blue" @click="toEditProduct(product._id)">Edit Product</v-btn><br>
              <v-btn dark color="red" @click="deleteProduct(product._id)">Delete Product</v-btn><br>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </div>

      <div v-if="page == 'pendingtransactions'">
        <v-card v-for="transaction in pendingTrans">
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
                <p>To: {{transaction.name}}</p>
                <p>Address: {{transaction.shippedto}}</p>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-btn v-if="transaction.status == 'Payment Sent'" dark color="blue" @click="confirmSentItem(transaction._id)">Confirm Sending Item</v-btn><br>
              <v-btn v-if="transaction.status == 'Done'" dark color="red" @click="deleteTransaction(transaction._id)">Confirm Item Received</v-btn><br>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </div>

      <div v-if="page == 'onprocesstransactions'">
        <v-card v-for="transaction in onprocessTrans">
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
                <p>To: {{transaction.name}}</p>
                <p>Address: {{transaction.shippedto}}</p>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-btn v-if="transaction.status == 'Payment Sent'" dark color="blue" @click="confirmSentItem(transaction._id)">Confirm Sending Item</v-btn><br>
              <v-btn v-if="transaction.status == 'Done'" dark color="red" @click="deleteTransaction(transaction._id)">Delete Transaction</v-btn><br>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </div>

      <div v-if="page == 'transactionsdone'">
        <v-card v-for="transaction in doneTrans">
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
                <p>To: {{transaction.name}}</p>
                <p>Address: {{transaction.shippedto}}</p>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-btn v-if="transaction.status == 'Payment Sent'" dark color="blue" @click="confirmSentItem(transaction._id)">Confirm Sending Item</v-btn><br>
              <v-btn v-if="transaction.status == 'Done'" dark color="red" @click="deleteTransaction(transaction._id)">Delete Transaction</v-btn><br>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card>
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
        page: 'addproduct',
        products: [],
        pendingTrans: [],
        onprocessTrans:[],
        doneTrans: [],
        categories: [
        'Playing Cards',
        'Close Up Magic',
        'Mentalism',
        'Money & Coin',
        'Video & Book'
        ],
        productName: "",
        productPrice: "",
        productDescription: "",
        productCategory: "",
      }
    },
    props: ['url'],
    methods: {
      confirmSentItem(id) {
        axios.patch(`${this.url}/transactions/${id}`, {status: "Item Has Been Sent"})
          .then((response) => {
            this.getTransactions()
          })
          .catch((error) => {
            console.log(error.message);
          })
      },
      deleteTransaction(id) {
        axios.delete(`${this.url}/transactions/${id}`)
          .then((response) => {
            this.getTransactions()
          })
          .catch((error) => {
            console.log(error.message);
          })
      },
      handleFileUpload() {
        this.file = this.$refs.file.files[0];
      },
      addProductPage() {
        this.page = 'addproduct'
      },
      toEditProduct(id) {
        this.$router.push(`/edit/${id}`)
      },
      allProducts() {
        this.page = 'allproducts'
      },

      pendingTransactions() {
        this.page = 'pendingtransactions'
      },

      onprocessTransactions() {
        this.page = 'onprocesstransactions'
      },

      transactionsDone() {
        this.page = 'transactionsdone'
      },

      getProducts() {
        axios.get(`${this.url}/items/`)
          .then((response) => {
            this.products = response.data
          })
          .catch((error) => {
            console.log(error.message);
          })
      },

      getTransactions() {
        this.products = []
        this.pendingTrans = []
        this.onprocessTrans = []
        this.doneTrans = []

        axios.get(`${this.url}/transactions/`)
          .then((response) => {
            response.data.forEach((trans) => {
              if (trans.status == "Payment Sent") {
                this.pendingTrans.push(trans)
              }
              else if (trans.status == "Item Has Been Sent") {
                this.onprocessTrans.push(trans)
              }
              else if (trans.status == "Done") {
                this.doneTrans.push(trans)
              }
            })
          })
          .catch((error) => {
            console.log(error.message);
          })
      },

      deleteProduct(id) {
        axios.delete(`${this.url}/items/${id}`)
          .then((response) => {
            console.log('berhasil delete produk');
            this.getProducts()
          })
          .catch((error) => {
            console.log(error);
            console.log(error.message);
          })
      },

      addProduct() {
      let formData = new FormData();
      formData.append('image', this.file);
      formData.append('name', this.productName);
      formData.append('description', this.productDescription);
      formData.append('price', this.productPrice);
      formData.append('category', this.productCategory);

      axios.post(`${this.url}/items`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then((response) => {
          console.log('Berhasil tambah produk');
          this.file = ""
          this.productName = ""
          this.productDescription = ""
          this.productPrice = ""
          this.productCategory = ""
          this.getProducts()
        })
        .catch((error) => {
          console.log(error.message);
        })
      }
    },
    created() {
      this.getProducts()
      this.getTransactions()
    },
    mounted() {
      if (localStorage.getItem('token')) {
        axios.post(`${this.url}/users/admincheck`, {token: localStorage.getItem('token')})
        .then((response) => {
          if (response.data.admin == false) {
            console.log('you are not admin');
            this.$router.push('/products')
          }
        })
        .catch((error) => {
          console.log(error.message);
        })
      }
      else {
        this.$router.push('/products')
      }
    }
  }
</script>
