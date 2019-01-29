<template>
  <v-container fluid grid-list-lg>
    <v-layout>
      <v-flex xs12 sm12 md12 lg12 mx-auto>
        <v-card>
          <v-container fluid>
            <v-layout row justify-center>
              <v-flex lg10 md10 sm12 xs12>
                <router-view  @add-to-cart="addToCart"></router-view>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container grid-list-sm fluid>
              <span class="headline font-weight-bold mb-5">All Products</span>
            <v-layout row wrap>
              <v-flex v-for="(product, n) in products" :key="n" xs12 lg2 md2 sm6>
                <ProductCard :product="product" @add-to-cart="addToCart"></ProductCard>
              </v-flex>
            </v-layout>
          </v-container>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ProductCard from '@/components/ProductCard.vue'
export default {
  components: {
    ProductCard
  },
  data: () => ({
    products: []
  }),
  methods: {
    getAllData() {
      this.$http
        .get("products")
        .then(({ data }) => {
          this.products = data;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    addToCart(status) {
      this.$emit('add-to-cart', status)
    }
  },
  mounted() {
    this.getAllData();
  }
};
</script>
