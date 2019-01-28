<template>
  <div id="topselling" class="row ml-auto mr-0">
    <p>Top Selling Product</p>
    <div class="col-2" v-for="product in topselling" :key="product._id">
      <p>product</p>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: "topselling",
  data() {
    return {
      topselling: []
    };
  },
  methods: {
    //get products sort by transaction. ambil 4
  },
  created(){
    api
      .get('/products')


  }
};
</script>

<style>
#topselling {
  margin-right: 0px;
  background-color: rgb(197, 206, 206);
}
</style>
