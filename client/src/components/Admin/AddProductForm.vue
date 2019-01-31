<template>
  <div class="container form">
    <b-form>
      <div class="form-group">
        <label for="recipient-name" class="col-form-label">Name: </label>
        <input type="email" class="form-control" v-model='products.name'>
        <label for="message-text" class="col-form-label">Price:</label>
        <input type="text" class="form-control" v-model='products.price'>
        <label for="message-text" class="col-form-label">Stock:</label>
        <input type="text" class="form-control" v-model='products.stock'>
        <label for="message-text" class="col-form-label">Category:</label>
        <div>
          <b-form-select v-model="products.category" :options="options" class="mb-3" />
        </div>
        <label for="message-text" class="col-form-label">Description:</label>
        <input type="text" class="form-control" v-model='products.description'>
        <label for="message-text" class="col-form-label">Image: </label>
        <input class="form-control" type="file" name="file" @change='imagefile'>
      </div>
    </b-form>
    <b-button type="b-button" class="btn btn-primary" v-on:click.prevent='addProduct'>
      Add Product 
    </b-button>
  </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name: 'productform',
  props: ['options'],
  data(){
    return {
      products: {
        name: "",
        price: 0,
        stock: 0,
        description: "",
        link: "",
        category: null,
        file: ""
      },
      options: [],
    }
  },
  methods: {
    imagefile(file) {
      console.log(file);
      this.products.file = file.target.files[0];
    },

    addProduct() {
      let newproducts = {
        name: this.products.name,
        price: this.products.price,
        stock: this.products.stock,
        category: this.products.category,
        description: this.products.description
      };

      const formData = new FormData();
      formData.append("file", this.products.file);
      formData.append("data", JSON.stringify(newproducts));
      console.log(formData)
      api({
        url: '/products',
        method: "POST",
        data: formData,
        headers: {
          // token: localStorage.getItem("token")
          token: localStorage.getItem('token')
        }
      })
        .then(products => {
          // this.productss.push(products.data);
          this.$router.push('/admin/products')
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
  }

}
</script>

<style>
.form{
  margin-top: 8%;
}
</style>
