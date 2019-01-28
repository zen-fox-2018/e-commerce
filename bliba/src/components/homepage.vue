<template>
  <v-layout>
    <v-flex xs12 >
      <v-card>

        <v-container v-bind="{ 'grid-list-lg': true }" fluid>
          <v-layout row wrap>
            <v-flex
              v-for="(product,n) in products"
              :key="n"
              lg4
            >
                <listproduct :product="product" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import listproduct from "@/components/listproduct.vue";
  export default {
    data: () => ({
      products: []
    }),
    components : {
        listproduct
    },
    methods : {
        getProductList() {
            this.axios({
                method: 'get',
                url: 'http://localhost:3000/products/',
            })
            .then(({data}) => {
                console.log(data)
                this.products = data
            })
        }
    },
    created(){
        this.getProductList()
    }
  }
</script>

<style>

</style>
