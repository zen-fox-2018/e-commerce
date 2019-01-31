<template>
  <div>
    <Navbar @logout="logout"></Navbar>
    <ListProduct v-if="this.$route.name === 'admin'" :products="products"></ListProduct>
    <router-view :products="products" :options="options" :categories="categories"></router-view>
  </div>
</template>

<script>
import api from "@/api/api.js";
import Navbar from "@/components/Admin/Navbar.vue";
import ListProduct from '@/components/Admin/ListProduct';

export default {
  name: "admin",
  components: {
    Navbar,ListProduct
  },
  data() {
    return {
      page: "showItem",
      productname: "",
      category: {
        name: ""
      },
      item: {
        name: "",
        price: 0,
        stock: 0,
        description: "",
        imageUrl: "",
        category: null,
        file: ""
      },
      options: [],
      products: [],
      categories: []
    };
  },
  created() {
    this.showCategory()
    this.showProducts()
    console.log('params', this.$route)
  },
  methods: {
    showProducts(){
      api({
        url: '/products'
      })
      .then( ({data}) => {
        this.products = data
      })
      .catch( error => {
        console.log(error.response.data)
      })
    },

    showCategory() {
      this.options = [{ value: null, text: "Please select an option" }];

      api({
        url: "/categories",
        headers: {
          token: localStorage.token
        }
      })
        
        .then(({data}) => {
          this.categories = data;
          data.forEach(e => {
            console.log(e._id)
            this.options.push({ value: e._id, text: e.name });
          });
        })
        .catch(error => {
          console.log(error.response);
        });
    },

    logout() {
      localStorage.clear();
      this.$emit('logout')
    },

    clearFormItem() {
      this.item.name = "";
      this.item.price = "";
      this.item.stock = "";
      this.item.category = "";
      this.item.description = "";
      this.item.link = "";
    },

    clearFormCategory() {
      this.category.name = "";
    }
  },
  watch:{
    $route(){
      this.showCategory();
      this.showProducts()
    }
  }
};
</script>

<style>
.router-link{
  display: block;
  color: rgb(255, 255, 255);
}
.router-link:hover{
  display: block;
  text-decoration:none;
  color: rgb(255, 255, 255);
  font-weight: bold;
}

</style>
