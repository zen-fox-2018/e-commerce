<template>
  <div class="container is-fluid" style="margin-top: 25px">
    <router-view/>
    <div class="columns is-touch is-multiline" style="margin-top: 25px">
      <div class="column is-3" v-for="product in products" :key="product._id">
        <Card :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Card from "@/components/Card.vue"

export default {
  name: 'home',
  components: {
    HelloWorld,
    Card
  },
  data() {
    return {
      products: []
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      axios
        .get('http://localhost:3000/products')
        .then(({data}) => {
          // console.log(data);
          this.products = data

        })
        .catch(err => {
          console.log(err);

        })
    }
  }
}
</script>
