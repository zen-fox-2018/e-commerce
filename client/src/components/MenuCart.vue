<template>
  <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="50" offset-y left>
    <v-btn slot="activator" icon>
      <v-icon>add_shopping_cart</v-icon>
    </v-btn>
    <v-card light>
      <v-card-title primary-title>
        <span
          class="font-weight-bold headline"
        >Total: {{ cart.products ? totalProducts : '' }} items</span>
      </v-card-title>
      <v-list two-line v-if="cart.products">
        <template v-for="(product, index) in cart.products.slice(0,2)">
          <v-divider :inset="true" :key="'a'+index"></v-divider>

          <v-list-tile avatar :key="'b'+index">
            <v-list-tile-avatar>
              <img :src="product.productId.image_url">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>
                <span class="text-truncate">{{ product.productId.name }}</span>
              </v-list-tile-title>
              <v-list-tile-sub-title>{{ product.quantity }} items</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <v-card-actions>
        <v-layout column>
          <v-flex v-if="totalProducts">
            <v-btn block color="red" @click="checkoutCart">Checkout Cart</v-btn>
          </v-flex>
          <v-flex class="mt-1">
            <v-btn block color="green" @click="showCart">Show All Cart</v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  props: ["cart", "token"],
  data: () => ({
    menu: false
  }),
  methods: {
    showCart() {
      this.$router.replace("/cart");
      this.menu = false;
    },
    checkoutCart() {
      Swal.fire({
        title: "Are you sure?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          this.$http
            .put(
              "/cart/checkout",
              {
                cart: this.cart
              },
              {
                headers: {
                  token: this.token
                }
              }
            )
            .then(({ data }) => {
              Swal.fire(
                "Thanks!",
                "Successfully checkout your cart",
                "success"
              );
              this.menu = false;
              this.$emit("checkout");
            })
            .catch(({ response }) => {
              console.log(response);
            });
        }
      });
    }
  },
  computed: {
    totalProducts() {
      if (this.cart.products && this.cart.products.length) {
        return this.cart.products.reduce((a, b) => {
          return { quantity: a.quantity + b.quantity };
        }).quantity;
      }
    }
  }
};
</script>
