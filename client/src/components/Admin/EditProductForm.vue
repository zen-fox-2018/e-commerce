<template>
  <div class="container details">
    <b-form>
      <div class="form-group">
        <label for="recipient-name" class="col-form-label">Name: </label>
        <input type="email" class="form-control" :value='product.name'>
        <label for="message-text" class="col-form-label">Price:</label>
        <input type="text" class="form-control" :value='product.price'>
        <label for="message-text" class="col-form-label">Stock:</label>
        <input type="text" class="form-control" :value='product.stock'>
        <label for="message-text" class="col-form-label">Category:</label>
        <div>
          <b-form-select v-model="product.category" :options="options" class="mb-3" />
        </div>
        <label for="message-text" class="col-form-label">Description:</label>
        <input type="text" class="form-control" :value='product.description'>
        <label for="message-text" class="col-form-label">Image: </label>
        <input class="form-control" type="file" name="file" @change='imagefile'>
      </div>
      <b-button type="b-button" class="btn btn-primary" v-on:click.prevent='editProduct'>
        Update Product </b-button>
    </b-form>
  </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name: 'productform',
  props: ['options'],
  data(){
    return {
      product: {
        name: "",
        price: 0,
        stock: 0,
        description: "",
        imageUrl: "",
        category: "",
        file: ""
      },
    }
  },
  methods: {
    getProductDetails(){
      console.log("sekarang ada di",this.$route.params.productId)
      api({
        url: `/products/${this.$route.params.productId}`,
      })
      .then( ({data}) => {
        console.log(data)
        this.product = data
      })
      .catch( error => {
        console.log(error.response.data)
      })
    },

    imagefile(file) {
      console.log(file);
      this.item.file = file.target.files[0];
    },

    editProduct() {
      let editproduct = {
        name: this.product.name,
        price: this.product.price,
        stock: this.product.stock,
        category: this.product.category,
        description: this.product.description
      };

      const formData = new FormData();
      formData.append("file", this.product.file);
      formData.append("data", JSON.stringify(editproduct));

      api({
        url: `/products/${this.$route.params.productId}`,
        method: "PUT",
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(product => {
          console.log("success edit product");
          this.$router.push('/admin/products')
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
  },
  created(){
    this.getProductDetails()
  },
  watch: {
    $route(){
      this.getProductDetails()
    }
  }

}
</script>

<style>
.details{
  margin-top: 8%;
  text-align: left;
}
</style>
