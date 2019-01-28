<template>
  <v-card>
    <v-layout row>
      <v-flex lg4>
        <v-img
          :src="product.image_url"
          aspect-ratio="1"
          max-height="500px"
          max-width="500px"
          class="mx-auto"
        ></v-img>
      </v-flex>
      <v-flex lg8>
        <v-card-title class="pb-0">
          <div class="title font-weight-bold">{{ product.name }}</div>
          <v-rating
            size="24px"
            :value="4.5"
            background-color="yellow lighten-3"
            color="yellow darken-2"
            half-increments
            readonly
            class="ml-3"
            dense
          ></v-rating>
        </v-card-title>
        <v-card-text
          class="pt-0 red--text text--darken-2 subheading font-weight-bold"
          v-if="product.price"
          full-height
        >Rp. {{ product.price.toLocaleString('id') }},00</v-card-text>
        <v-card-actions>
          <v-flex lg4>
            <v-btn block color="green" @click="addToCart">
              <v-icon>shopping_cart</v-icon>
              <span class="ml-2">add to cart</span>
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      product: {}
    }
  },
  methods: {
    addToCart() {
      this.$http
        .put(
          "/cart/add",
          {
            productId: this.product._id
          },
          {
            headers: {
              token: localStorage.token
            }
          }
        )
        .then(({ data }) => {
          this.$emit("add-to-cart")
          Swal.fire('Success', `${this.product.name} added to cart`, 'success')
        })
        .catch(({ response }) => {
          this.$emit("add-to-cart", response.status)
          Swal.fire('Failed', `${this.product.name} failed add to cart`, 'success')
        });
    }
  },
  mounted() {
    this.$http
      .get(`/products/${this.$route.params.id}`)
      .then(({ data }) => {
        this.product = data;
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  watch: {
    $route(to, from) {
      this.$http
        .get(`/products/${this.$route.params.id}`)
        .then(({ data }) => {
          this.product = data;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  }
};
</script>