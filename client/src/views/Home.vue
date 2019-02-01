<template>
  <div class="home bg-light" style="height: 100vh">
    <router-view :user="user"/>
    <productList :user="user" :products="productList"/>
  </div>
</template>

<script>
var socket = io.connect('http://localhost:3000')

import productList from '@/components/productList.vue'

export default {
  name: 'home',
  components: {
    productList,
  },
  data () {
    return {
      productList: [],
      product: {},
    }
  },
  props: {
    query: String,
    user: Object
  },
  methods: {
    getAllProducts () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/products'
      })
      .then(resp => {
        this.productList = []
        this.productList = resp.data.data
        this.$emit('allProduct', resp.data.data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    filter (query) {
      let q = new RegExp(query.toLowerCase())
      this.productList = this.productList.filter(function (el) {
          return el.name.toLowerCase().match(q)
      })
    }
  },
  created () {
    this.getAllProducts()
    socket.on('new-product', data => {
      if (data) {
        // console.log('masuk socket new peoduct')
        this.productList.unshift(data)
      }
    })
  },
  watch: {
    query (val) {
      if (val) {
        this.filter(val)
      } else {
        this.getAllProducts()
      }
    }
  }
}
</script>
