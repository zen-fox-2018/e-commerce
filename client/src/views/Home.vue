<template>
  <transition name="fade">
    <div>
      <Toolbar
        v-bind:cart="cart"
        v-bind:cartcount="cartCount"
        v-on:toggle="toggleNavbar"
        v-on:changestate="changeState"
      ></Toolbar>
      <Navbar v-bind:navbar="navbarStatus"/>

      <v-container v-if="state == 'home'" grid-list-xl color="primary">
        <v-layout row wrap>
          <v-flex xs2>
            <v-card>
              <v-container grid-list-xs>
                <v-layout column wrap align-center>
                  <h2 class="categorytext" style="margin-bottom: 10%; margin-top: 10%" @click="showByCategory()">Category</h2>
                  <v-btn
                    flat
                    class="category"
                    v-for="(item, index) in categories"
                    :key="index"
                    @click="showByCategory(item)"
                  >{{item}}</v-btn>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs10>
            <v-layout row wrap>
              <v-flex xs3 v-for="(item, index) in allProducts" :key="index">
                <Product v-on:addcart="addCart" :item="item"/>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container v-else-if="state == 'cart'" grid-list-xl>
        <cart v-bind:cartitem="cart" v-on:deleteitem="deleteItem"/>
      </v-container>

      <v-snackbar v-model="snackbar" :top="true">
        {{ snackbarText }}
        <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
  </transition>
</template>

<script>
import a from "../helpers/helpers.js";

import Toolbar from "../components/Toolbar";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Cart from "../components/Cart";

export default {
  components: {
    Toolbar,
    Navbar,
    Product,
    Cart
  },
  data() {
    return {
      snackbarText: "",
      snackbar: false,
      navbarStatus: false,
      state: "",
      categories: [],
      products: [],
      cart: [],
      allProducts: [],
      cartCount: 0
    };
  },
  methods: {
    showByCategory(value) {
      if (value) {
        this.allProducts = [];
        this.products.forEach(element => {
          if (element.category == value) {
            this.allProducts.push(element);
          }
        });
      } else {
        this.allProducts = this.products
      }
    },
    toggleNavbar(status) {
      this.navbarStatus = status;
    },
    addCart(data) {
      console.log(data);
      this.snackbar = false;
      var newItem = true;
      this.cart.forEach((element, index) => {
        if (element._id == data._id) {
          this.cart[index] = data;
          newItem = false;
        }
      });
      if (newItem) {
        this.cart.push(data);
      }

      this.cartCount++;
      this.snackbarText = "Success add to cart";
      this.snackbar = true;
    },
    changeState(state) {
      this.state = state;
    },
    deleteItem(obj) {
      console.log(obj);
      this.cartCount -= obj.qty;
    }
  },
  watch: {
    $route(to, from) {
      console.log(from);
    }
  },
  created() {
    this.state = "home";
  },
  beforeCreate() {
    a.get("/products", {
      headers: {
        token: localStorage.token
      }
    })
      .then(result => {
        this.products = result.data;
        this.allProducts = result.data;
        result.data.forEach(element => {
          this.categories.indexOf(element.category) == -1 &&
            this.categories.push(element.category);
        });
      })
      .catch(err => {});

    a.get(`/users/cart/${localStorage.id}`, {
      headers: {
        token: localStorage.token
      }
    })
      .then(result => {
        if (result.data.length != 0) {
          this.cart = result.data;
          result.data.forEach(element => {
            this.cartCount += element.qty;
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.category {
  margin: 6%;
}
.categorytext:hover {
  cursor: pointer;
}
</style>

