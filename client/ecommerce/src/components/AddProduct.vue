<template>
    <div class="container">
    <h3>Add Product</h3>
      <div class="form-group">
        <input v-model="name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product Name">
      </div>
      <div class="form-group">
        <input v-model="desc" type="text" class="form-control" id="exampleInputPassword1" placeholder="Description">
      </div>
      <div class="form-group">
        <input v-model="category" type="text" class="form-control" id="exampleInputPassword1" placeholder="Category">
      </div>
      <div class="form-group">
        <input v-model="price" type="number" class="form-control" id="exampleInputPassword1" placeholder="Price">
      </div>
      <div class="form-group">
        <input v-model="stock" type="number" class="form-control" id="exampleInputPassword1" placeholder="Stock">
      </div>
      <div class="form-group">
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload"/>
      </div>
      <div class="form-group form-check">
      </div>
      <button @click="addProduct" type="submit" class="btn btn-primary">Submit</button>
  </div>
</template>

<script>
export default {
    data () {
      return {
        name: '',
        desc: '',
        category: '',
        price: 0,
        stock: 0,
        img: ''
      }
    },
    methods: {
      addProduct() {
        let formData = new FormData()
            formData.append('name', this.name)
            formData.append('description', this.desc)
            formData.append('category', this.category)
            formData.append('price', this.price)
            formData.append('stock', this.stock)
            formData.append('image', this.file)
        axios
          .post('http://localhost:3000/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          })
          .then((result) => {
            console.log(result.data)  
          }).catch((err) => {
            console.log(err)
          });
      },
      handleFileUpload(event){
            // this.register.file = event.target.file[0]
            this.file = this.$refs.file.files[0];
        },
  }
};
</script>

<style>
</style>
