<template>
  <productList :products="products" :cart="cart" @addCart="addCart" />
</template>

<script>
import server from '@/server/server'
import productList from '@/components/product-list'

export default {
  name: 'home',
  props: ['cart'],
  components: {
    productList
  },
  data () {
    return {
      products: []
    }
  },
  methods: {
    setProduct: async function () {
      try {
        let { data } = await server.get('/products', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        this.products = data
      } catch ({ response }) {
        console.error(response)
      }
    },
    addCart: function (cart) {
      this.$emit('addCart', cart)
    }
  },
  mounted () {
    this.setProduct()
  }
}
</script>
