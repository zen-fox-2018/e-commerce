<template>
  <div class="home">
    <router-view @login="login"></router-view>
    <div v-if="!showForm">
      <Navbar :cart="cart" :statusLogin="statusLogin" @gohome="gohome" @search="search" @logout="logout" @login="login"></Navbar>
      <Carousel></Carousel>
      <!-- <TopSelling></TopSelling> -->
      <div class="row mt-5 mr-0">
        <div class="col-3">
          <Sidebar></Sidebar>
        </div>
        <div class="col-9">
          <Filtering @search="search"></Filtering>
          <hr>
          <ProductList :products="products" @addcart="addcart"></ProductList>
        </div>
      </div>
      <hr>
      <Footer></Footer>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api/api.js";

import Navbar from "@/components/Navbar.vue";
import Carousel from "@/components/Carousel.vue";
import ProductList from "@/components/ProductList.vue";
import Sidebar from "@/components/Sidebar.vue";
import TopSelling from "@/components/TopSelling.vue";
import Filtering from "@/components/Filter.vue";
import Footer from '@/components/Footer.vue'

export default {
  name: "home",
  props:['statusLogin'],
  components: {
    Carousel, Navbar, ProductList, Sidebar, TopSelling, Filtering, Footer
  },
  data() {
    return {
      products: [
        {
          price: 0
        }
      ],
      cart: [],
      showForm: false,
      categories: null
    };
  },
  methods: {
    getAllProduct() {
      api
        .get("/products", {
          headers: {
            token:
              localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          console.log("ini get data produknya");
          console.log(data);
          this.products = data;
          console.log("get products");
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    getMyCart() {
      api
        .get("/cart", {
          headers: {
            token:
              localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.cart = data;
          console.log("get cart");
          console.log(this.cart)
          // console.log(this.cart)
        })
        .catch(error => {
          console.log(error.response);
          this.cart = []
        });
    },
    addcart(data) {
      console.log("in home.vue", data.cart);
      this.cart.push(data.cart);
    },
    gohome() {
      this.getAllProduct();
    },
    search() {
      console.log('masuk search FUNCTION')
      let url = `products/search?`

      if(this.$route.query.sort){
        url += `sort=${this.$route.query.sort}&`
      }
      if(this.$route.query.name){
        url += `name=${this.$route.query.name}&`
      }
      if(this.$route.query.pmin){
        url += `pmin=${this.$route.query.pmin}&`
      }
      if(this.$route.query.pmax){
        url += `pmax=${this.$route.query.pmax}`
      }
      if(this.$route.query.category){
        url += `category=${this.$route.query.category}`
      }

      api({
        url: url,
        method: "GET"
      })
        .then(({ data }) => {
          this.products = data;
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    checkStatusForm() {
      let routes = this.$route.params.state;
      if ((routes === "login")||(routes === "register")) {
        console.log('lagi isi form nih')
        this.showForm = true;
      } else {
        this.showForm = false;
      }
    },
    logout(){
      console.log('logout...')
      localStorage.clear()
      this.getMyCart()
      this.$emit('logout')
    },

    login(){
      this.$emit('login')
      this.getAllProduct()
      this.getMyCart()
    }
  },
  watch: {
    $route() {
      console.log("change route",this.$route)
      if(Object.keys(this.$route.query).length > 0){
        this.search()
      }
      console.log(this.$route.params)
      this.checkStatusForm();
    },
    statusLogin(val){
      console.log('login...')
      this.getAllProduct()
      this.getMyCart()
    }
  },
  created() {
    
    this.getMyCart();
    this.checkStatusForm()
    if(Object.keys(this.$route.query).length > 0){
      this.search()
    } else {
      this.getAllProduct();
    }
  }
};
</script>

