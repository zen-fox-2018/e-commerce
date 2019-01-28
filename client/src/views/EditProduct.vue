<template>
  <div class="">
    <v-container grid-list-md text-xs>
      <br>
      <center><h1>Edit: {{product.name}}</h1></center>
      <br>
      <v-form
      ref="form"
      >

      <center>
      <v-img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxk1-7GnsMbnBqW_Mwm77Z44Thq8_-IQD09czW0wzzrAheHGrd"
      contain
      max-height="200"
      max-width="200"
      ></v-img>
      </center>

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
      @click="updateProduct"
      >
      Update Product
      </v-btn>

      </v-form>
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
        product: {},
        productName: "",
        productPrice: "",
        productDescription: "",
        productCategory: "",
        categories: [
        'Playing Cards',
        'Close Up Magic',
        'Mentalism',
        'Money & Coin',
        'Video & Book'
      ],
      }
    },
    props: ['url'],
    methods: {
      getProduct() {
        axios.get(`${this.url}/items/${this.$route.params.productId}`)
          .then((response) => {
            this.product = response.data
          })
          .catch((error) => {
            console.log(error.message);
          })
      },

      updateProduct() {
        let obj = {
          name: this.productName,
          price: this.productPrice,
          description: this.productDescription,
          category: this.productCategory
        }
        axios.patch(`${this.url}/items/${this.$route.params.productId}`, obj)
          .then((response) => {
            console.log('berhasil update produk');
            this.$router.push('/admin')
          })
          .catch((error) => {
            console.log(error.message);
          })
      }
    },
    created() {
      this.getProduct()
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
    },
    watch: {
      product: function(value) {
         this.productName = value.name
         this.productDescription = value.description
         this.productPrice = value.price
         this.productCategory = value.category
      }
    }
  }
</script>
